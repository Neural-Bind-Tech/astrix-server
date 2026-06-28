import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';
import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { universityFilterableFields } from './university.const';
import type {
  IUniversityBulkUpdateItem,
  IUniversityCreatePayload,
  IUniversityUpdateManyPayload,
  IUniversityUpdatePayload,
} from './university.interface';
import { UniversityServices } from './university.service';

const listUniversities = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const filters = pick(query, universityFilterableFields);

  const result = await UniversityServices.listUniversities(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Universities fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getUniversityById = catchAsync(async (req: Request, res: Response) => {
  const result = await UniversityServices.getUniversityById(
    req.params['id'] as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'University fetched successfully!',
    data: result,
  });
});

const createUniversity = catchAsync(async (req: Request, res: Response) => {
  const result = await UniversityServices.createUniversity(
    req.body as IUniversityCreatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'University created successfully!',
    data: result,
  });
});

const bulkCreateUniversities = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UniversityServices.bulkCreateUniversities(
      req.body as IUniversityCreatePayload[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Universities created successfully!',
      data: result,
    });
  }
);

const updateUniversityById = catchAsync(async (req: Request, res: Response) => {
  const result = await UniversityServices.updateUniversityById(
    req.params['id'] as string,
    req.body as IUniversityUpdatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'University updated successfully!',
    data: result,
  });
});

const bulkUpdateUniversities = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UniversityServices.bulkUpdateUniversities(
      req.body as IUniversityBulkUpdateItem[]
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Universities updated successfully!',
      data: result,
    });
  }
);

const updateManyUniversities = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UniversityServices.updateManyUniversities(
      req.body as IUniversityUpdateManyPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Universities updated successfully!',
      data: result,
    });
  }
);

const deleteUniversityById = catchAsync(async (req: Request, res: Response) => {
  const result = await UniversityServices.deleteUniversityById(
    req.params['id'] as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'University deleted successfully!',
    data: result,
  });
});

const deleteManyUniversities = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UniversityServices.deleteManyUniversities(
      req.body as Record<string, unknown>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Universities deleted successfully!',
      data: result,
    });
  }
);

const restoreUniversityById = catchAsync(async (req: Request) => {
  await UniversityServices.restoreUniversityById(req.params['id'] as string);
});

export const UniversityController = {
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
