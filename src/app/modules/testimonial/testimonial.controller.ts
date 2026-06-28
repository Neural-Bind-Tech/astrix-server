import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';
import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { testimonialFilterableFields } from './testimonial.const';
import type {
  ITestimonialBulkUpdateItem,
  ITestimonialCreatePayload,
  ITestimonialUpdateManyPayload,
  ITestimonialUpdatePayload,
} from './testimonial.interface';
import { TestimonialServices } from './testimonial.service';

const listTestimonials = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const filters = pick(query, testimonialFilterableFields);

  const result = await TestimonialServices.listTestimonials(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonials fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getTestimonialById = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialServices.getTestimonialById(
    req.params['id'] as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial fetched successfully!',
    data: result,
  });
});

const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialServices.createTestimonial(
    req.body as ITestimonialCreatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Testimonial created successfully!',
    data: result,
  });
});

const bulkCreateTestimonials = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialServices.bulkCreateTestimonials(
      req.body as ITestimonialCreatePayload[]
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Testimonials created successfully!',
      data: result,
    });
  }
);

const updateTestimonialById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialServices.updateTestimonialById(
      req.params['id'] as string,
      req.body as ITestimonialUpdatePayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial updated successfully!',
      data: result,
    });
  }
);

const bulkUpdateTestimonials = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialServices.bulkUpdateTestimonials(
      req.body as ITestimonialBulkUpdateItem[]
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials updated successfully!',
      data: result,
    });
  }
);

const updateManyTestimonials = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialServices.updateManyTestimonials(
      req.body as ITestimonialUpdateManyPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials updated successfully!',
      data: result,
    });
  }
);

const deleteTestimonialById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialServices.deleteTestimonialById(
      req.params['id'] as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial deleted successfully!',
      data: result,
    });
  }
);

const deleteManyTestimonials = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialServices.deleteManyTestimonials(
      req.body as Record<string, unknown>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials deleted successfully!',
      data: result,
    });
  }
);

const restoreTestimonialById = catchAsync(async (req: Request) => {
  await TestimonialServices.restoreTestimonialById(req.params['id'] as string);
});

export const TestimonialController = {
  listTestimonials,
  getTestimonialById,
  createTestimonial,
  bulkCreateTestimonials,
  bulkUpdateTestimonials,
  updateManyTestimonials,
  updateTestimonialById,
  deleteManyTestimonials,
  deleteTestimonialById,
  restoreTestimonialById,
};
