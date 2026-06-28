import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  ITestimonialBulkUpdateItem,
  ITestimonialCreatePayload,
  ITestimonialDelete,
  ITestimonialFilters,
  ITestimonialListQuery,
  ITestimonialUpdateManyPayload,
  ITestimonialUpdatePayload,
} from './testimonial.interface';
import {
  testimonialSearchableFields,
  testimonialSortableFields,
} from './testimonial.const';

const buildWhereConditions = (
  filters: ITestimonialFilters
): Prisma.TestimonialWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.TestimonialWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: testimonialSearchableFields.map((field) => ({
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
      [key]: { equals: key === 'rating' ? Number(value) : value },
    }));

  if (exactFilters.length) {
    andConditions.push({ AND: exactFilters });
  }

  return andConditions.length ? { AND: andConditions } : {};
};

const getListOptions = (query: ITestimonialListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-') ? 'desc' : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = testimonialSortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return { limit, skip, sortBy, sortOrder };
};

const listTestimonials = async (
  filters: ITestimonialFilters,
  query: ITestimonialListQuery
) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.testimonial.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.TestimonialOrderByWithRelationInput,
  });

  const total = await prisma.testimonial.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: { page, limit, total },
    data,
  };
};

const getTestimonialById = async (id: string) => {
  const record = await prisma.testimonial.findUnique({ where: { id } });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }

  return record;
};

const createTestimonial = async (payload: ITestimonialCreatePayload) => {
  return prisma.testimonial.create({
    data: payload as Prisma.TestimonialUncheckedCreateInput,
  });
};

const bulkCreateTestimonials = async (payload: ITestimonialCreatePayload[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.testimonial.createManyAndReturn({
    data: payload as Prisma.TestimonialUncheckedCreateInput[],
  });
};

const updateTestimonialById = async (
  id: string,
  payload: ITestimonialUpdatePayload
) => {
  const existing = await prisma.testimonial.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update Testimonial'
    );
  }

  return prisma.testimonial.update({
    where: { id },
    data: payload as Prisma.TestimonialUncheckedUpdateInput,
  });
};

const bulkUpdateTestimonials = async (
  payload: ITestimonialBulkUpdateItem[]
) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update Testimonial'
        );
      }

      return prisma.testimonial.update({
        where: { id },
        data: data as Prisma.TestimonialUncheckedUpdateInput,
      });
    })
  );
};

const updateManyTestimonials = async (
  payload: ITestimonialUpdateManyPayload
) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update Testimonial'
    );
  }

  return prisma.testimonial.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.TestimonialUncheckedUpdateManyInput,
  });
};

const deleteTestimonialById = async (id: string) => {
  const existing = await prisma.testimonial.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }

  return prisma.testimonial.delete({ where: { id } });
};

const deleteManyTestimonials = async (filters: ITestimonialDelete) => {
  return prisma.testimonial.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreTestimonialById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'Testimonial restore is not supported by the current schema.'
  );
};

export const TestimonialServices = {
  listTestimonials,
  getTestimonialById,
  createTestimonial,
  bulkCreateTestimonials,
  bulkUpdateTestimonials,
  updateManyTestimonials,
  updateTestimonialById,
  deleteManyTestimonials,
  deleteTestimonialById,
  restoreTestimonialById,
};
