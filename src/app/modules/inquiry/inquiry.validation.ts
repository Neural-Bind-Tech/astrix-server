import { z } from 'zod';

const inquiryStatusEnum = z.enum(['NEW', 'REPLIED', 'CLOSED']);

const inquiryBodySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  status: inquiryStatusEnum.optional(),
  createdById: z.string().nullish(),
});

const createInquirySchema = z.object({
  body: inquiryBodySchema,
});

const updateInquirySchema = z.object({
  body: inquiryBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateInquirySchema = z.object({
  body: z.array(inquiryBodySchema),
});

const bulkUpdateInquirySchema = z.object({
  body: z.array(
    inquiryBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'Inquiry id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyInquirySchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: inquiryBodySchema.partial(),
  }),
});

const listInquirySchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const inquiryIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Inquiry id is required'),
  }),
});

const deleteManyInquirySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const InquiryValidation = {
  createInquirySchema,
  updateInquirySchema,
  bulkCreateInquirySchema,
  bulkUpdateInquirySchema,
  updateManyInquirySchema,
  listInquirySchema,
  inquiryIdParamsSchema,
  deleteManyInquirySchema,
};
