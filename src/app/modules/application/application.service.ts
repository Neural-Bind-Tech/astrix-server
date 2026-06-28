import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type { IPaginationOptions } from '../../../interface/common';
import type {
  IApplicationBulkUpdateItem,
  IApplicationCreatePayload,
  IApplicationDelete,
  IApplicationFilters,
  IApplicationUpdateManyPayload,
  IApplicationUpdatePayload,
} from './application.interface';
import { applicationSortableFields } from './application.const';
import { buildWhereConditions } from './application.utils';

const listApplications = async (
  filters: IApplicationFilters,
  query: IPaginationOptions
) => {
  const pagination = paginationHelpers.calculatePagination(query);
  const whereConditions = buildWhereConditions(filters);
  const sortBy = applicationSortableFields.includes(pagination.sortBy)
    ? pagination.sortBy
    : 'createdAt';

  const data = await prisma.application.findMany({
    where: whereConditions,
    skip: pagination.skip,
    take: pagination.limit,
    orderBy: {
      [sortBy]: pagination.sortOrder,
    } as Prisma.ApplicationOrderByWithRelationInput,
  });

  const total = await prisma.application.count({ where: whereConditions });
  const page = Math.floor(pagination.skip / pagination.limit) + 1;

  return {
    meta: {
      page,
      limit: pagination.limit,
      total,
    },
    data,
  };
};

const getApplicationById = async (id: string) => {
  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  return application;
};

const createApplication = async (payload: IApplicationCreatePayload) => {
  return prisma.application.create({
    data: payload as Prisma.ApplicationUncheckedCreateInput,
  });
};

const bulkCreateApplications = async (payload: IApplicationCreatePayload[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.application.createManyAndReturn({
    data: payload as Prisma.ApplicationUncheckedCreateInput[],
  });
};

const updateApplicationById = async (
  id: string,
  payload: IApplicationUpdatePayload
) => {
  const existingApplication = await prisma.application.findUnique({
    where: { id },
  });

  if (!existingApplication) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update application'
    );
  }

  return prisma.application.update({
    where: { id },
    data: payload as Prisma.ApplicationUncheckedUpdateInput,
  });
};

const bulkUpdateApplications = async (
  payload: IApplicationBulkUpdateItem[]
) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update application'
        );
      }

      return prisma.application.update({
        where: { id },
        data: data as Prisma.ApplicationUncheckedUpdateInput,
      });
    })
  );
};

const updateManyApplications = async (
  payload: IApplicationUpdateManyPayload
) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update application'
    );
  }

  return prisma.application.updateMany({
    where: whereConditions,
    data: payload.data as Prisma.ApplicationUncheckedUpdateManyInput,
  });
};

const deleteApplicationById = async (id: string) => {
  const existingApplication = await prisma.application.findUnique({
    where: { id },
  });

  if (!existingApplication) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  return prisma.application.delete({
    where: { id },
  });
};

const deleteManyApplications = async (filters: IApplicationDelete) => {
  return prisma.application.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreApplicationById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'Application restore is not supported by the current schema.'
  );
};

export const ApplicationServices = {
  listApplications,
  getApplicationById,
  createApplication,
  bulkCreateApplications,
  bulkUpdateApplications,
  updateManyApplications,
  updateApplicationById,
  deleteManyApplications,
  deleteApplicationById,
  restoreApplicationById,
};
