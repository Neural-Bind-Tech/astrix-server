import httpStatus from '../../../const/httpStatus';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import type { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type { IPaginationOptions } from '../../../interface/common';
import type {
  IBlogBulkUpdateItem,
  IBlogCreatePayload,
  IBlogDelete,
  IBlogFilters,
  IBlogUpdateManyPayload,
  IBlogUpdatePayload,
} from './blog.interface';
import { blogSortableFields } from './blog.const';
import { buildWhereConditions, normalizeBlogCategory } from './blog.utils';

const normalizeBlogPayload = <T extends Record<string, unknown>>(
  payload: T
) => {
  if (!Object.prototype.hasOwnProperty.call(payload, 'category')) {
    return payload;
  }

  return {
    ...payload,
    category: normalizeBlogCategory(payload['category']),
  };
};

const listBlogs = async (filters: IBlogFilters, query: IPaginationOptions) => {
  const pagination = paginationHelpers.calculatePagination(query);
  const whereConditions = buildWhereConditions(filters);
  const sortBy = blogSortableFields.includes(pagination.sortBy)
    ? pagination.sortBy
    : 'createdAt';

  const data = await prisma.blogPost.findMany({
    where: whereConditions,
    skip: pagination.skip,
    take: pagination.limit,
    orderBy: {
      [sortBy]: pagination.sortOrder,
    } as Prisma.BlogPostOrderByWithRelationInput,
  });

  const total = await prisma.blogPost.count({ where: whereConditions });
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

const getBlogById = async (id: string) => {
  const blog = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog post not found');
  }

  return blog;
};

const createBlog = async (payload: IBlogCreatePayload) => {
  const data = normalizeBlogPayload(
    payload
  ) as Prisma.BlogPostUncheckedCreateInput;

  return prisma.blogPost.create({
    data,
  });
};

const bulkCreateBlogs = async (payload: IBlogCreatePayload[]) => {
  if (!payload.length) {
    return [];
  }

  const data = payload.map(
    (record) =>
      normalizeBlogPayload(record) as Prisma.BlogPostUncheckedCreateInput
  );

  return prisma.blogPost.createManyAndReturn({
    data,
  });
};

const updateBlogById = async (id: string, payload: IBlogUpdatePayload) => {
  const existingBlog = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog post not found');
  }

  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update blog post'
    );
  }

  return prisma.blogPost.update({
    where: { id },
    data: {
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.slug ? { slug: payload.slug } : {}),
      ...(payload.excerpt ? { excerpt: payload.excerpt } : {}),
      ...(payload.content ? { content: payload.content } : {}),
      ...(payload.category ? { category: normalizeBlogCategory(payload.category) } : {}),
      ...(payload.featuredImage ? { featuredImage: payload.featuredImage } : {}),
      ...(payload.author ? { author: payload.author } : {}),
      ...(payload.isFeatured !== undefined ? { isFeatured: payload.isFeatured } : {}),
      ...(payload.published !== undefined ? { published: payload.published } : {}),
      ...(payload.createdById ? { createdById: payload.createdById } : {}),
    } as Prisma.BlogPostUncheckedUpdateInput,
  });
};

const bulkUpdateBlogs = async (payload: IBlogBulkUpdateItem[]) => {
  if (!payload.length) {
    return [];
  }

  return prisma.$transaction(
    payload.map(({ id, ...data }) => {
      if (!Object.keys(data).length) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'At least one field is required to update blog post'
        );
      }

      return prisma.blogPost.update({
        where: { id },
        data: normalizeBlogPayload(data) as Prisma.BlogPostUncheckedUpdateInput,
      });
    })
  );
};

const updateManyBlogs = async (payload: IBlogUpdateManyPayload) => {
  const normalizedFilters = payload.filter ?? payload.q ?? {};
  const whereConditions = buildWhereConditions(normalizedFilters);

  if (!Object.keys(payload.data).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required to update blog post'
    );
  }

  return prisma.blogPost.updateMany({
    where: whereConditions,
    data: normalizeBlogPayload(
      payload.data
    ) as Prisma.BlogPostUpdateManyMutationInput,
  });
};

const deleteBlogById = async (id: string) => {
  const existingBlog = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog post not found');
  }

  return prisma.blogPost.delete({
    where: { id },
  });
};

const deleteManyBlogs = async (filters: IBlogDelete) => {
  return prisma.blogPost.deleteMany({
    where: buildWhereConditions(filters),
  });
};

const restoreBlogById = async (_id: string) => {
  throw new ApiError(
    httpStatus.NOT_IMPLEMENTED,
    'Blog post restore is not supported by the current schema.'
  );
};

export const BlogServices = {
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
