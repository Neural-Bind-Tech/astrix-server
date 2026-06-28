import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';

import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { eventFilterableFields } from './event.const';
import type {
  IEventBulkUpdateItem,
  IEventCreatePayload,
  IEventListQuery,
  IEventUpdateManyPayload,
  IEventUpdatePayload,
} from './event.interface';
import { EventServices } from './event.service';

const listEvents = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as unknown as IEventListQuery;
  const filters = pick(query, eventFilterableFields) as Record<string, unknown>;

  if (query.q && typeof query.q === 'string') {
    try {
      Object.assign(filters, JSON.parse(query.q));
    } catch {
      filters.searchTerm = query.q;
    }
  } else if (query.q && typeof query.q === 'object') {
    Object.assign(filters, query.q);
  }

  const result = await EventServices.listEvents(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getEventById = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.getEventById(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event fetched successfully!',
    data: result,
  });
});

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.createEvent(
    req.body as IEventCreatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully!',
    data: result,
  });
});

const bulkCreateEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.bulkCreateEvents(
    req.body as IEventCreatePayload[]
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Events created successfully!',
    data: result,
  });
});

const updateEventById = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.updateEventById(
    req.params.id as string,
    req.body as IEventUpdatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully!',
    data: result,
  });
});

const bulkUpdateEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.bulkUpdateEvents(
    req.body as IEventBulkUpdateItem[]
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events updated successfully!',
    data: result,
  });
});

const updateManyEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.updateManyEvents(
    req.body as IEventUpdateManyPayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events updated successfully!',
    data: result,
  });
});

const deleteEventById = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.deleteEventById(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully!',
    data: result,
  });
});

const deleteManyEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventServices.deleteManyEvents(
    req.body as Record<string, unknown>
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events deleted successfully!',
    data: result,
  });
});

const restoreEventById = catchAsync(async (req: Request) => {
  await EventServices.restoreEventById(req.params.id as string);
});

export const EventController = {
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
