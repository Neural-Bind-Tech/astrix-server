import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  IUserCreatePayload,
  IUserFilters,
  IUserListQuery,
  IUserUpdatePayload,
} from './user.interface';
import { userSearchableFields, userSortableFields } from './user.constant';
import { bcryptUtils } from '../../../helpers/bcrypt';

const buildWhereConditions = (
  filters: IUserFilters
): Prisma.UserWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as const,
        },
      })),
    });
  }

  const exactFilters = Object.entries(rest)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => ({
      [key]: { equals: value },
    }));

  if (exactFilters.length) {
    andConditions.push({ AND: exactFilters });
  }

  return andConditions.length ? { AND: andConditions } : {};
};

const getListOptions = (query: IUserListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-') ? 'desc' : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = userSortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return { limit, skip, sortBy, sortOrder };
};

const listUsers = async (filters: IUserFilters, query: IUserListQuery) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.UserOrderByWithRelationInput,
  });

  const total = await prisma.user.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: { page, limit, total },
    data,
  };
};

const getUserById = async (id: string) => {
  const record = await prisma.user.findUnique({ where: { id } });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return record;
};

const createUser = async (payload: IUserCreatePayload) => {
  const existing = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existing) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'A user with this email already exists'
    );
  }

  if (payload.password) {
    payload.password = await bcryptUtils.hashedPassword(payload.password);
  }

  return prisma.user.create({
    data: payload as Prisma.UserUncheckedCreateInput,
  });
};

const updateUserById = async (id: string, payload: IUserUpdatePayload) => {
  const existing = await prisma.user.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update User'
    );
  }

  if (payload.password) {
    payload.password = await bcryptUtils.hashedPassword(payload.password);
  }

  return prisma.user.update({
    where: { id },
    data: payload as Prisma.UserUncheckedUpdateInput,
  });
};

const deleteUserById = async (id: string) => {
  const existing = await prisma.user.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return prisma.user.delete({ where: { id } });
};

export const UserServices = {
  listUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
