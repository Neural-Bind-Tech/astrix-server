import { z } from 'zod';

const universityCountryEnum = z.enum([
  'USA',
  'CHINA',
  'MALAYSIA',
  'SOUTH_KOREA',
  'THAILAND',
  'UK',
  'CANADA',
  'AUSTRALIA',
  'OTHER',
]);

const universityBodySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  country: universityCountryEnum,
  city: z.string().min(1, 'City is required'),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  worldRank: z.string().optional(),
  majors: z.array(z.string()).optional(),
  programs: z.array(z.string()).optional(),
  tuitionFee: z.string().optional(),
  hostelFee: z.string().optional(),
  scholarshipType: z.string().optional(),
  intake: z.string().optional(),
  deadline: z.string().optional(),
  documentsRequired: z.array(z.string()).optional(),
  website: z.string().optional(),
  featured: z.boolean().optional(),
  createdById: z.string().nullish(),
});

const createUniversitySchema = z.object({
  body: universityBodySchema,
});

const updateUniversitySchema = z.object({
  body: universityBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const bulkCreateUniversitySchema = z.object({
  body: z.array(universityBodySchema),
});

const bulkUpdateUniversitySchema = z.object({
  body: z.array(
    universityBodySchema
      .partial()
      .extend({
        id: z.string().min(1, 'University id is required'),
      })
      .refine((data) => Object.keys(data).some((key) => key !== 'id'), {
        message: 'At least one field is required',
      })
  ),
});

const updateManyUniversitySchema = z.object({
  body: z.object({
    filter: z.record(z.string(), z.unknown()).optional(),
    q: z.record(z.string(), z.unknown()).optional(),
    data: universityBodySchema.partial(),
  }),
});

const listUniversitySchema = z.object({
  query: z.object({
    q: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    sort_by: z.string().optional(),
  }),
});

const universityIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'University id is required'),
  }),
});

const deleteManyUniversitySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    country: universityCountryEnum.optional(),
    city: z.string().optional(),
  }),
});

export const UniversityValidation = {
  createUniversitySchema,
  updateUniversitySchema,
  bulkCreateUniversitySchema,
  bulkUpdateUniversitySchema,
  updateManyUniversitySchema,
  listUniversitySchema,
  universityIdParamsSchema,
  deleteManyUniversitySchema,
};
