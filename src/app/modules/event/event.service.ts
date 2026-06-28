import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  IEventBulkUpdateItem,
  IEventCreatePayload,
  IEventDelete,
  IEventFilters,
  IEventListQuery,
  IEventUpdateManyPayload,
  IEventUpdatePayload,
} from './event.interface';
import { eventSearchableFields, eventSortableFields } from './event.const';

const normalizeBoolean = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  return value;
};

const buildWhereConditions = (
  filters: IEventFilters
): Prisma.EventWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.EventWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: eventSearchableFields.map((field) => ({
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
        equals:
          key === 'isOnline' || key === 'isPast'
            ? normalizeBoolean(value)
            : value,
      },
    }));

  if (exactFilters.length) {
    andConditions.push({ AND: exactFilters });
  }

  return andConditions.length ? { AND: andConditions } : {};
};

const getListOptions = (query: IEventListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-')
    ? 'desc'
    : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = eventSortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return {
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

const listEvents = async (filters: IEventFilters, query: IEventListQuery) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.event.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.EventOrderByWithRelationInput,
  });

  const total = await prisma.event.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

const getEventById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return event;
};

const createEvent = async (payload: IEventCreatePayload) => {
  return prisma.event.create({
    data: payload as Prisma.EventUncheckedCreateInput,
  });
};

const bulkCreateEvents = async (payload: IEventCreatePayload[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.event.createManyAndReturn({
    data: payload as Prisma.EventUncheckedCreateInput[],
  });
};

const updateEventById = async (id: string, payload: IEventUpdatePayload) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id },
  });

  if (!existingEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update event'
    );
  }

  return prisma.event.update({
    where: { id },
    data: payload as Prisma.EventUncheckedUpdateInput,
  });
};

const bulkUpdateEvents = async (payload: IEventBulkUpdateItem[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update event'
        );
      }

      return prisma.event.update({
        where: { id },
        data: data as Prisma.EventUncheckedUpdateInput,
      });
    })
  );
};

const updateManyEvents = async (payload: IEventUpdateManyPayload) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update event'
    );
  }

  return prisma.event.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.EventUncheckedUpdateManyInput,
  });
};

const deleteEventById = async (id: string) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id },
  });

  if (!existingEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return prisma.event.delete({
    where: { id },
  });
};

const deleteManyEvents = async (filters: IEventDelete) => {
  return prisma.event.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreEventById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'Event restore is not supported by the current schema.'
  );
};

export const EventServices = {
  listEvents,
  getEventById,
  createEvent,
  bulkCreateEvents,
  bulkUpdateEvents,
  updateManyEvents,
  updateEventById,
  deleteManyEvents,
  deleteEventById,
  restoreEventById,
};
