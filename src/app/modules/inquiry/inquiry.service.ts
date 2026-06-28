import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  IInquiryBulkUpdateItem,
  IInquiryCreatePayload,
  IInquiryDelete,
  IInquiryFilters,
  IInquiryListQuery,
  IInquiryUpdateManyPayload,
  IInquiryUpdatePayload,
} from './inquiry.interface';
import { inquirySearchableFields, inquirySortableFields } from './inquiry.const';

const buildWhereConditions = (
  filters: IInquiryFilters
): Prisma.InquiryWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.InquiryWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: inquirySearchableFields.map((field) => ({
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

const getListOptions = (query: IInquiryListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-') ? 'desc' : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = inquirySortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return { limit, skip, sortBy, sortOrder };
};

const listInquiries = async (
  filters: IInquiryFilters,
  query: IInquiryListQuery
) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.inquiry.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.InquiryOrderByWithRelationInput,
  });

  const total = await prisma.inquiry.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: { page, limit, total },
    data,
  };
};

const getInquiryById = async (id: string) => {
  const record = await prisma.inquiry.findUnique({ where: { id } });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }

  return record;
};

const createInquiry = async (payload: IInquiryCreatePayload) => {
  return prisma.inquiry.create({
    data: payload as Prisma.InquiryUncheckedCreateInput,
  });
};

const bulkCreateInquiries = async (payload: IInquiryCreatePayload[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.inquiry.createManyAndReturn({
    data: payload as Prisma.InquiryUncheckedCreateInput[],
  });
};

const updateInquiryById = async (
  id: string,
  payload: IInquiryUpdatePayload
) => {
  const existing = await prisma.inquiry.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update Inquiry'
    );
  }

  return prisma.inquiry.update({
    where: { id },
    data: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.email ? { email: payload.email } : {}),
      ...(payload.phone ? { phone: payload.phone } : {}),
      ...(payload.subject ? { subject: payload.subject } : {}),
      ...(payload.message ? { message: payload.message } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.createdById ? { createdById: payload.createdById } : {}),
    },
  });
};

const bulkUpdateInquiries = async (payload: IInquiryBulkUpdateItem[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update Inquiry'
        );
      }

      return prisma.inquiry.update({
        where: { id },
        data: data as Prisma.InquiryUncheckedUpdateInput,
      });
    })
  );
};

const updateManyInquiries = async (payload: IInquiryUpdateManyPayload) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update Inquiry'
    );
  }

  return prisma.inquiry.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.InquiryUncheckedUpdateManyInput,
  });
};

const deleteInquiryById = async (id: string) => {
  const existing = await prisma.inquiry.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }

  return prisma.inquiry.delete({ where: { id } });
};

const deleteManyInquiries = async (filters: IInquiryDelete) => {
  return prisma.inquiry.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreInquiryById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'Inquiry restore is not supported by the current schema.'
  );
};

export const InquiryServices = {
  listInquiries,
  getInquiryById,
  createInquiry,
  bulkCreateInquiries,
  bulkUpdateInquiries,
  updateManyInquiries,
  updateInquiryById,
  deleteManyInquiries,
  deleteInquiryById,
  restoreInquiryById,
};
