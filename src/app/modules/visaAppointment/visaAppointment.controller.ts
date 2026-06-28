import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';
import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { visaAppointmentFilterableFields } from './visaAppointment.const';
import type {
  IVisaAppointmentBulkUpdateItem,
  IVisaAppointmentCreatePayload,
  IVisaAppointmentUpdateManyPayload,
  IVisaAppointmentUpdatePayload,
} from './visaAppointment.interface';
import { VisaAppointmentServices } from './visaAppointment.service';

const listVisaAppointments = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const filters = pick(query, visaAppointmentFilterableFields);

  const result = await VisaAppointmentServices.listVisaAppointments(
    filters,
    query
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'VisaAppointments fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getVisaAppointmentById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.getVisaAppointmentById(
      req.params['id'] as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VisaAppointment fetched successfully!',
      data: result,
    });
  }
);

const createVisaAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.createVisaAppointment(
      req.body as IVisaAppointmentCreatePayload
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'VisaAppointment created successfully!',
      data: result,
    });
  }
);

const bulkCreateVisaAppointments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.bulkCreateVisaAppointments(
      req.body as IVisaAppointmentCreatePayload[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'VisaAppointments created successfully!',
      data: result,
    });
  }
);

const updateVisaAppointmentById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.updateVisaAppointmentById(
      req.params['id'] as string,
      req.body as IVisaAppointmentUpdatePayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VisaAppointment updated successfully!',
      data: result,
    });
  }
);

const bulkUpdateVisaAppointments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.bulkUpdateVisaAppointments(
      req.body as IVisaAppointmentBulkUpdateItem[]
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VisaAppointments updated successfully!',
      data: result,
    });
  }
);

const updateManyVisaAppointments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.updateManyVisaAppointments(
      req.body as IVisaAppointmentUpdateManyPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VisaAppointments updated successfully!',
      data: result,
    });
  }
);

const deleteVisaAppointmentById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.deleteVisaAppointmentById(
      req.params['id'] as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VisaAppointment deleted successfully!',
      data: result,
    });
  }
);

const deleteManyVisaAppointments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VisaAppointmentServices.deleteManyVisaAppointments(
      req.body as Record<string, unknown>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'VisaAppointments deleted successfully!',
      data: result,
    });
  }
);

const restoreVisaAppointmentById = catchAsync(async (req: Request) => {
  await VisaAppointmentServices.restoreVisaAppointmentById(
    req.params['id'] as string
  );
});

export const VisaAppointmentController = {
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
