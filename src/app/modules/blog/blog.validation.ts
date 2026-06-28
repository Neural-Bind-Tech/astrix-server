import { z } from 'zod';

const blogCategorySchema = z.union([
  z.enum([
    'Study Abroad Guides',
    'Visa Tips',
    'Scholarship Updates',
    'Country Comparison',
    'Admission Advice',
    'Student Life',
    'Document Preparation',
    'Success Stories',
    'Career Guidance',
  ]),
  z.enum([
    'STUDY_ABROAD_GUIDES',
    'VISA_TIPS',
    'SCHOLARSHIP_UPDATES',
    'COUNTRY_COMPARISON',
    'ADMISSION_ADVICE',
    'STUDENT_LIFE',
    'DOCUMENT_PREPARATION',
    'SUCCESS_STORIES',
    'CAREER_GUIDANCE',
  ]),
]);

const blogBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().nullish(),
  excerpt: z.string().nullish(),
  content: z.string().min(1, 'Content is required'),
  category: blogCategorySchema,
  featuredImage: z.string().nullish(),
  author: z.string().nullish(),
  isFeatured: z.boolean().optional(),
  published: z.boolean().optional(),
  createdById: z.string().nullish(),
});

const createBlogSchema = z.object({
  body: blogBodySchema,
});

const updateBlogSchema = z.object({
  body: blogBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateBlogSchema = z.object({
  body: z.array(blogBodySchema),
});

const bulkUpdateBlogSchema = z.object({
  body: z.array(
    blogBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'BlogPost id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyBlogSchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: blogBodySchema.partial(),
  }),
});

const listBlogSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const blogIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'BlogPost id is required'),
  }),
});

const deleteManyBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema,
  bulkCreateBlogSchema,
  bulkUpdateBlogSchema,
  updateManyBlogSchema,
  listBlogSchema,
  blogIdParamsSchema,
  deleteManyBlogSchema,
};
