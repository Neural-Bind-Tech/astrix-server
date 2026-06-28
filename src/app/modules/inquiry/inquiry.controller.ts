import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';
import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { inquiryFilterableFields } from './inquiry.const';
import type {
  IInquiryBulkUpdateItem,
  IInquiryCreatePayload,
  IInquiryUpdateManyPayload,
  IInquiryUpdatePayload,
} from './inquiry.interface';
import { InquiryServices } from './inquiry.service';

const listInquiries = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const filters = pick(query, inquiryFilterableFields);

  const result = await InquiryServices.listInquiries(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiries fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getInquiryById = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.getInquiryById(
    req.params['id'] as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiry fetched successfully!',
    data: result,
  });
});

const createInquiry = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.createInquiry(
    req.body as IInquiryCreatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Inquiry created successfully!',
    data: result,
  });
});

const bulkCreateInquiries = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.bulkCreateInquiries(
    req.body as IInquiryCreatePayload[]
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Inquiries created successfully!',
    data: result,
  });
});

const updateInquiryById = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.updateInquiryById(
    req.params['id'] as string,
    req.body as IInquiryUpdatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiry updated successfully!',
    data: result,
  });
});

const bulkUpdateInquiries = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.bulkUpdateInquiries(
    req.body as IInquiryBulkUpdateItem[]
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiries updated successfully!',
    data: result,
  });
});

const updateManyInquiries = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.updateManyInquiries(
    req.body as IInquiryUpdateManyPayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiries updated successfully!',
    data: result,
  });
});

const deleteInquiryById = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.deleteInquiryById(
    req.params['id'] as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiry deleted successfully!',
    data: result,
  });
});

const deleteManyInquiries = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryServices.deleteManyInquiries(
    req.body as Record<string, unknown>
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inquiries deleted successfully!',
    data: result,
  });
});

const restoreInquiryById = catchAsync(async (req: Request) => {
  await InquiryServices.restoreInquiryById(req.params['id'] as string);
});

export const InquiryController = {
  listInquiries,
  getInquiryById,
  createInquiry,
  bulkCreateInquiries,
  bulkUpdateInquiries,
  updateManyInquiries,
  updateInquiryById,
  deleteManyInquiries,
  deleteInquiryById,
  restoreInquiryById,
};
