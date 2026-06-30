import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';

import { BlogServices } from './blog.service';
import catchAsync from '../../../lib/catchAsync';
import sendResponse from '../../../lib/sendResponse';
import pick from '../../../lib/pick';
import { blogFilterableFields } from './blog.const';
import type {
  IBlogBulkUpdateItem,
  IBlogCreatePayload,
  IBlogUpdateManyPayload,
  IBlogUpdatePayload,
} from './blog.interface';

const listBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const filters = pick(query, blogFilterableFields);

  const result = await BlogServices.listBlogs(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog posts fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getBlogById(req.params['id'] as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post fetched successfully!',
    data: result,
  });
});

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.createBlog(req.body as IBlogCreatePayload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog post created successfully!',
    data: result,
  });
});

const bulkCreateBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.bulkCreateBlogs(
    req.body as IBlogCreatePayload[]
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog posts created successfully!',
    data: result,
  });
});

const updateBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.updateBlogById(
    req.params['id'] as string,
    req.body as IBlogUpdatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post updated successfully!',
    data: result,
  });
});

const bulkUpdateBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.bulkUpdateBlogs(
    req.body as IBlogBulkUpdateItem[]
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog posts updated successfully!',
    data: result,
  });
});

const updateManyBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.updateManyBlogs(
    req.body as IBlogUpdateManyPayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog posts updated successfully!',
    data: result,
  });
});

const deleteBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteBlogById(req.params['id'] as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post deleted successfully!',
    data: result,
  });
});

const deleteManyBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteManyBlogs(
    req.body as Record<string, unknown>
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog posts deleted successfully!',
    data: result,
  });
});

const restoreBlogById = catchAsync(async (req: Request) => {
  await BlogServices.restoreBlogById(req.params['id'] as string);
});

export const BlogController = {
  listBlogs,
  getBlogById,
  createBlog,
  bulkCreateBlogs,
  bulkUpdateBlogs,
  updateManyBlogs,
  updateBlogById,
  deleteManyBlogs,
  deleteBlogById,
  restoreBlogById,
};
