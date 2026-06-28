import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  IEventRegistrationBulkUpdateItem,
  IEventRegistrationCreatePayload,
  IEventRegistrationDelete,
  IEventRegistrationFilters,
  IEventRegistrationListQuery,
  IEventRegistrationUpdateManyPayload,
  IEventRegistrationUpdatePayload,
} from './eventregistration.interface';
import {
  eventRegistrationSearchableFields,
  eventRegistrationSortableFields,
} from './eventregistration.const';

const buildWhereConditions = (
  filters: IEventRegistrationFilters
): Prisma.EventRegistrationWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.EventRegistrationWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: eventRegistrationSearchableFields.map((field) => ({
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

const getListOptions = (query: IEventRegistrationListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-') ? 'desc' : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = eventRegistrationSortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return { limit, skip, sortBy, sortOrder };
};

const listEventRegistrations = async (
  filters: IEventRegistrationFilters,
  query: IEventRegistrationListQuery
) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.eventRegistration.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.EventRegistrationOrderByWithRelationInput,
  });

  const total = await prisma.eventRegistration.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: { page, limit, total },
    data,
  };
};

const getEventRegistrationById = async (id: string) => {
  const record = await prisma.eventRegistration.findUnique({ where: { id } });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'EventRegistration not found');
  }

  return record;
};

const createEventRegistration = async (
  payload: IEventRegistrationCreatePayload
) => {
  return prisma.eventRegistration.create({
    data: payload as Prisma.EventRegistrationUncheckedCreateInput,
  });
};

const bulkCreateEventRegistrations = async (
  payload: IEventRegistrationCreatePayload[]
) => {
  if (!payload.length) {
    return [];
  }

  return prisma.eventRegistration.createManyAndReturn({
    data: payload as Prisma.EventRegistrationUncheckedCreateInput[],
  });
};

const updateEventRegistrationById = async (
  id: string,
  payload: IEventRegistrationUpdatePayload
) => {
  const existing = await prisma.eventRegistration.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'EventRegistration not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update EventRegistration'
    );
  }

  return prisma.eventRegistration.update({
    where: { id },
    data: {
      ...(payload.eventId ? { eventId: payload.eventId } : {}),
      ...(payload.fullName ? { fullName: payload.fullName } : {}),
      ...(payload.email ? { email: payload.email } : {}),
      ...(payload.phone ? { phone: payload.phone } : {}),
      ...(payload.createdById ? { createdById: payload.createdById } : {}),
    },
  });
};

const bulkUpdateEventRegistrations = async (
  payload: IEventRegistrationBulkUpdateItem[]
) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update EventRegistration'
        );
      }

      return prisma.eventRegistration.update({
        where: { id },
        data: data as Prisma.EventRegistrationUncheckedUpdateInput,
      });
    })
  );
};

const updateManyEventRegistrations = async (
  payload: IEventRegistrationUpdateManyPayload
) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update EventRegistration'
    );
  }

  return prisma.eventRegistration.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.EventRegistrationUncheckedUpdateManyInput,
  });
};

const deleteEventRegistrationById = async (id: string) => {
  const existing = await prisma.eventRegistration.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'EventRegistration not found');
  }

  return prisma.eventRegistration.delete({ where: { id } });
};

const deleteManyEventRegistrations = async (
  filters: IEventRegistrationDelete
) => {
  return prisma.eventRegistration.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreEventRegistrationById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'EventRegistration restore is not supported by the current schema.'
  );
};

export const EventRegistrationServices = {
  listEventRegistrations,
  getEventRegistrationById,
  createEventRegistration,
  bulkCreateEventRegistrations,
  bulkUpdateEventRegistrations,
  updateManyEventRegistrations,
  updateEventRegistrationById,
  deleteManyEventRegistrations,
  deleteEventRegistrationById,
  restoreEventRegistrationById,
};
