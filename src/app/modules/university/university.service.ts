import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  IUniversityBulkUpdateItem,
  IUniversityCreatePayload,
  IUniversityDelete,
  IUniversityFilters,
  IUniversityListQuery,
  IUniversityUpdateManyPayload,
  IUniversityUpdatePayload,
} from './university.interface';
import {
  universitySearchableFields,
  universitySortableFields,
} from './university.const';

const normalizeBoolean = (value: unknown) => {
  if (typeof value !== 'string') return value;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return value;
};

const buildWhereConditions = (
  filters: IUniversityFilters
): Prisma.UniversityWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.UniversityWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: universitySearchableFields.map((field) => ({
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
      [key]: {
        equals: key === 'featured' ? normalizeBoolean(value) : value,
      },
    }));

  if (exactFilters.length) {
    andConditions.push({ AND: exactFilters });
  }

  return andConditions.length ? { AND: andConditions } : {};
};

const getListOptions = (query: IUniversityListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-') ? 'desc' : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = universitySortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return { limit, skip, sortBy, sortOrder };
};

const listUniversities = async (
  filters: IUniversityFilters,
  query: IUniversityListQuery
) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.university.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.UniversityOrderByWithRelationInput,
  });

  const total = await prisma.university.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: { page, limit, total },
    data,
  };
};

const getUniversityById = async (id: string) => {
  const record = await prisma.university.findUnique({ where: { id } });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'University not found');
  }

  return record;
};

const createUniversity = async (payload: IUniversityCreatePayload) => {
  return prisma.university.create({
    data: payload as Prisma.UniversityUncheckedCreateInput,
  });
};

const bulkCreateUniversities = async (payload: IUniversityCreatePayload[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.university.createManyAndReturn({
    data: payload as Prisma.UniversityUncheckedCreateInput[],
  });
};

const updateUniversityById = async (
  id: string,
  payload: IUniversityUpdatePayload
) => {
  const existing = await prisma.university.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'University not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update University'
    );
  }

  return prisma.university.update({
    where: { id },
    data: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.country ? { country: payload.country } : {}),
      ...(payload.city ? { city: payload.city } : {}),
      ...(payload.logoUrl ? { logoUrl: payload.logoUrl } : {}),
      ...(payload.description ? { description: payload.description } : {}),
      ...(payload.worldRank ? { worldRank: payload.worldRank } : {}),
      ...(payload.majors ? { majors: payload.majors } : {}),
      ...(payload.programs ? { programs: payload.programs } : {}),
      ...(payload.tuitionFee ? { tuitionFee: payload.tuitionFee } : {}),
      ...(payload.hostelFee ? { hostelFee: payload.hostelFee } : {}),
      ...(payload.scholarshipType ? { scholarshipType: payload.scholarshipType } : {}),
      ...(payload.intake ? { intake: payload.intake } : {}),
      ...(payload.deadline ? { deadline: payload.deadline } : {}),
      ...(payload.documentsRequired ? { documentsRequired: payload.documentsRequired } : {}),
      ...(payload.website ? { website: payload.website } : {}),
      ...(payload.featured !== undefined ? { featured: payload.featured } : {}),
      ...(payload.createdById ? { createdById: payload.createdById } : {}),
    },
  });
};

const bulkUpdateUniversities = async (payload: IUniversityBulkUpdateItem[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update University'
        );
      }

      return prisma.university.update({
        where: { id },
        data: data as Prisma.UniversityUncheckedUpdateInput,
      });
    })
  );
};

const updateManyUniversities = async (payload: IUniversityUpdateManyPayload) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update University'
    );
  }

  return prisma.university.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.UniversityUncheckedUpdateManyInput,
  });
};

const deleteUniversityById = async (id: string) => {
  const existing = await prisma.university.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'University not found');
  }

  return prisma.university.delete({ where: { id } });
};

const deleteManyUniversities = async (filters: IUniversityDelete) => {
  return prisma.university.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreUniversityById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'University restore is not supported by the current schema.'
  );
};

export const UniversityServices = {
  listUniversities,
  getUniversityById,
  createUniversity,
  bulkCreateUniversities,
  bulkUpdateUniversities,
  updateManyUniversities,
  updateUniversityById,
  deleteManyUniversities,
  deleteUniversityById,
  restoreUniversityById,
};
