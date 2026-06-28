import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';
import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { eventRegistrationFilterableFields } from './eventregistration.const';
import type {
  IEventRegistrationBulkUpdateItem,
  IEventRegistrationCreatePayload,
  IEventRegistrationUpdateManyPayload,
  IEventRegistrationUpdatePayload,
} from './eventregistration.interface';
import { EventRegistrationServices } from './eventregistration.service';

const listEventRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    
    const query = req.query
    const filters = pick(query,eventRegistrationFilterableFields);

    const result = await EventRegistrationServices.listEventRegistrations(
      filters,
      query
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistrations fetched successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getEventRegistrationById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.getEventRegistrationById(
      req.params['id'] as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistration fetched successfully!',
      data: result,
    });
  }
);

const createEventRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.createEventRegistration(
      req.body as IEventRegistrationCreatePayload
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'EventRegistration created successfully!',
      data: result,
    });
  }
);

const bulkCreateEventRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.bulkCreateEventRegistrations(
      req.body as IEventRegistrationCreatePayload[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'EventRegistrations created successfully!',
      data: result,
    });
  }
);

const updateEventRegistrationById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.updateEventRegistrationById(
      req.params['id'] as string,
      req.body as IEventRegistrationUpdatePayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistration updated successfully!',
      data: result,
    });
  }
);

const bulkUpdateEventRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.bulkUpdateEventRegistrations(
      req.body as IEventRegistrationBulkUpdateItem[]
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistrations updated successfully!',
      data: result,
    });
  }
);

const updateManyEventRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.updateManyEventRegistrations(
      req.body as IEventRegistrationUpdateManyPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistrations updated successfully!',
      data: result,
    });
  }
);

const deleteEventRegistrationById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.deleteEventRegistrationById(
      req.params['id'] as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistration deleted successfully!',
      data: result,
    });
  }
);

const deleteManyEventRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventRegistrationServices.deleteManyEventRegistrations(
      req.body as Record<string, unknown>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'EventRegistrations deleted successfully!',
      data: result,
    });
  }
);

const restoreEventRegistrationById = catchAsync(async (req: Request) => {
  await EventRegistrationServices.restoreEventRegistrationById(
    req.params['id'] as string
  );
});

export const EventRegistrationController = {
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
