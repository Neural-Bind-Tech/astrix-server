import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';

import { ApplicationServices } from './application.service';
import catchAsync from '../../../lib/catchAsync';
import sendResponse from '../../../lib/sendResponse';
import pick from '../../../lib/pick';
import { applicationFilterableFields } from './application.const';
import type {
  IApplicationBulkUpdateItem,
  IApplicationCreatePayload,
  IApplicationListQuery,
  IApplicationUpdateManyPayload,
  IApplicationUpdatePayload,
} from './application.interface';

const listApplications = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as unknown as IApplicationListQuery;
  const filters = pick(query, applicationFilterableFields) as Record<
    string,
    unknown
  >;

  if (query.q && typeof query.q === 'string') {
    try {
      Object.assign(filters, JSON.parse(query.q));
    } catch {
      filters.searchTerm = query.q;
    }
  } else if (query.q && typeof query.q === 'object') {
    Object.assign(filters, query.q);
  }

  const result = await ApplicationServices.listApplications(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applications fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getApplicationById = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationServices.getApplicationById(
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application fetched successfully!',
    data: result,
  });
});

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationServices.createApplication(
    req.body as IApplicationCreatePayload,
    req
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Application created successfully!',
    data: result,
  });
});

const bulkCreateApplications = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ApplicationServices.bulkCreateApplications(
      req.body as IApplicationCreatePayload[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Applications created successfully!',
      data: result,
    });
  }
);

const updateApplicationById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ApplicationServices.updateApplicationById(
      req.params.id as string,
      req.body as IApplicationUpdatePayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Application updated successfully!',
      data: result,
    });
  }
);

const bulkUpdateApplications = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ApplicationServices.bulkUpdateApplications(
      req.body as IApplicationBulkUpdateItem[]
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Applications updated successfully!',
      data: result,
    });
  }
);

const updateManyApplications = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ApplicationServices.updateManyApplications(
      req.body as IApplicationUpdateManyPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Applications updated successfully!',
      data: result,
    });
  }
);

const deleteApplicationById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ApplicationServices.deleteApplicationById(
      req.params.id as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Application deleted successfully!',
      data: result,
    });
  }
);

const deleteManyApplications = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ApplicationServices.deleteManyApplications(
      req.body as Record<string, unknown>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Applications deleted successfully!',
      data: result,
    });
  }
);

const restoreApplicationById = catchAsync(async (req: Request) => {
  await ApplicationServices.restoreApplicationById(req.params.id as string);
});

export const ApplicationController = {
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
