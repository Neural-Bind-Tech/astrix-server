import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type {
  IVisaAppointmentBulkUpdateItem,
  IVisaAppointmentCreatePayload,
  IVisaAppointmentDelete,
  IVisaAppointmentFilters,
  IVisaAppointmentListQuery,
  IVisaAppointmentUpdateManyPayload,
  IVisaAppointmentUpdatePayload,
} from './visaAppointment.interface';
import {
  visaAppointmentSearchableFields,
  visaAppointmentSortableFields,
} from './visaAppointment.const';

const buildWhereConditions = (
  filters: IVisaAppointmentFilters
): Prisma.VisaAppointmentWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.VisaAppointmentWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: visaAppointmentSearchableFields.map((field) => ({
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

const getListOptions = (query: IVisaAppointmentListQuery) => {
  const parsedLimit = Number(query.limit ?? 10);
  const parsedSkip = Number(query.skip ?? 0);

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 10;
  const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

  const rawSortBy = query.sort_by?.trim() ?? '-createdAt';
  const sortOrder: Prisma.SortOrder = rawSortBy.startsWith('-') ? 'desc' : 'asc';
  const candidateSortBy = rawSortBy.replace(/^-/, '');
  const sortBy = visaAppointmentSortableFields.includes(candidateSortBy)
    ? candidateSortBy
    : 'createdAt';

  return { limit, skip, sortBy, sortOrder };
};

const listVisaAppointments = async (
  filters: IVisaAppointmentFilters,
  query: IVisaAppointmentListQuery
) => {
  const whereConditions = buildWhereConditions(filters);
  const { limit, skip, sortBy, sortOrder } = getListOptions(query);

  const data = await prisma.visaAppointment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    } as Prisma.VisaAppointmentOrderByWithRelationInput,
  });

  const total = await prisma.visaAppointment.count({ where: whereConditions });
  const page = Math.floor(skip / limit) + 1;

  return {
    meta: { page, limit, total },
    data,
  };
};

const getVisaAppointmentById = async (id: string) => {
  const record = await prisma.visaAppointment.findUnique({ where: { id } });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'VisaAppointment not found');
  }

  return record;
};

const createVisaAppointment = async (
  payload: IVisaAppointmentCreatePayload
) => {
  return prisma.visaAppointment.create({
    data: payload as Prisma.VisaAppointmentUncheckedCreateInput,
  });
};

const bulkCreateVisaAppointments = async (
  payload: IVisaAppointmentCreatePayload[]
) => {
  if (!payload.length) {
    return [];
  }

  return prisma.visaAppointment.createManyAndReturn({
    data: payload as Prisma.VisaAppointmentUncheckedCreateInput[],
  });
};

const updateVisaAppointmentById = async (
  id: string,
  payload: IVisaAppointmentUpdatePayload
) => {
  const existing = await prisma.visaAppointment.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'VisaAppointment not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update VisaAppointment'
    );
  }

  return prisma.visaAppointment.update({
    where: { id },
    data: {
      ...(payload.fullName ? { fullName: payload.fullName } : {}),
      ...(payload.email ? { email: payload.email } : {}),
      ...(payload.phone ? { phone: payload.phone } : {}),
      ...(payload.country ? { country: payload.country } : {}),
      ...(payload.visaType ? { visaType: payload.visaType } : {}),
      ...(payload.purpose ? { purpose: payload.purpose } : {}),
      ...(payload.preferredDate ? { preferredDate: payload.preferredDate } : {}),
      ...(payload.message ? { message: payload.message } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.createdById ? { createdById: payload.createdById } : {}),
    },
  });
};

const bulkUpdateVisaAppointments = async (
  payload: IVisaAppointmentBulkUpdateItem[]
) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update VisaAppointment'
        );
      }

      return prisma.visaAppointment.update({
        where: { id },
        data: data as Prisma.VisaAppointmentUncheckedUpdateInput,
      });
    })
  );
};

const updateManyVisaAppointments = async (
  payload: IVisaAppointmentUpdateManyPayload
) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update VisaAppointment'
    );
  }

  return prisma.visaAppointment.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.VisaAppointmentUncheckedUpdateManyInput,
  });
};

const deleteVisaAppointmentById = async (id: string) => {
  const existing = await prisma.visaAppointment.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'VisaAppointment not found');
  }

  return prisma.visaAppointment.delete({ where: { id } });
};

const deleteManyVisaAppointments = async (filters: IVisaAppointmentDelete) => {
  return prisma.visaAppointment.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreVisaAppointmentById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'VisaAppointment restore is not supported by the current schema.'
  );
};

export const VisaAppointmentServices = {
  listVisaAppointments,
  getVisaAppointmentById,
  createVisaAppointment,
  bulkCreateVisaAppointments,
  bulkUpdateVisaAppointments,
  updateManyVisaAppointments,
  updateVisaAppointmentById,
  deleteManyVisaAppointments,
  deleteVisaAppointmentById,
  restoreVisaAppointmentById,
};
