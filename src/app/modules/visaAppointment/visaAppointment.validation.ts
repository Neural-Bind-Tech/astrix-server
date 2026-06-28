import { z } from 'zod';

const visaCountryEnum = z.enum([
  'USA',
  'CHINA',
  'MALAYSIA',
  'THAILAND',
  'UK',
  'CANADA',
  'AUSTRALIA',
  'SCHENGEN',
  'OTHER',
]);

const visaPurposeEnum = z.enum([
  'STUDY',
  'TOURIST',
  'BUSINESS',
  'FAMILY_VISIT',
  'OTHER',
]);

const visaAppointmentStatusEnum = z.enum([
  'NEW',
  'CONTACTED',
  'SCHEDULED',
  'COMPLETED',
]);

const visaAppointmentBodySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  country: visaCountryEnum,
  visaType: z.string().optional(),
  purpose: visaPurposeEnum.optional(),
  preferredDate: z.coerce.date().optional(),
  message: z.string().optional(),
  status: visaAppointmentStatusEnum.optional(),
  createdById: z.string().nullish(),
});

const createVisaAppointmentSchema = z.object({
  body: visaAppointmentBodySchema,
});

const updateVisaAppointmentSchema = z.object({
  body: visaAppointmentBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateVisaAppointmentSchema = z.object({
  body: z.array(visaAppointmentBodySchema),
});

const bulkUpdateVisaAppointmentSchema = z.object({
  body: z.array(
    visaAppointmentBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'VisaAppointment id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyVisaAppointmentSchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: visaAppointmentBodySchema.partial(),
  }),
});

const listVisaAppointmentSchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const visaAppointmentIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'VisaAppointment id is required'),
  }),
});

const deleteManyVisaAppointmentSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const VisaAppointmentValidation = {
  createVisaAppointmentSchema,
  updateVisaAppointmentSchema,
  bulkCreateVisaAppointmentSchema,
  bulkUpdateVisaAppointmentSchema,
  updateManyVisaAppointmentSchema,
  listVisaAppointmentSchema,
  visaAppointmentIdParamsSchema,
  deleteManyVisaAppointmentSchema,
};
