import type { BlogCategory, Prisma } from '../../../generated/prisma/client';
import { blogSearchableFields } from './blog.const';
import type { IBlogFilters } from './blog.interface';

const blogCategoryMap: Record<string, BlogCategory> = {
  'Study Abroad Guides': 'STUDY_ABROAD_GUIDES',
  STUDY_ABROAD_GUIDES: 'STUDY_ABROAD_GUIDES',
  'Visa Tips': 'VISA_TIPS',
  VISA_TIPS: 'VISA_TIPS',
  'Scholarship Updates': 'SCHOLARSHIP_UPDATES',
  SCHOLARSHIP_UPDATES: 'SCHOLARSHIP_UPDATES',
  'Country Comparison': 'COUNTRY_COMPARISON',
  COUNTRY_COMPARISON: 'COUNTRY_COMPARISON',
  'Admission Advice': 'ADMISSION_ADVICE',
  ADMISSION_ADVICE: 'ADMISSION_ADVICE',
  'Student Life': 'STUDENT_LIFE',
  STUDENT_LIFE: 'STUDENT_LIFE',
  'Document Preparation': 'DOCUMENT_PREPARATION',
  DOCUMENT_PREPARATION: 'DOCUMENT_PREPARATION',
  'Success Stories': 'SUCCESS_STORIES',
  SUCCESS_STORIES: 'SUCCESS_STORIES',
  'Career Guidance': 'CAREER_GUIDANCE',
  CAREER_GUIDANCE: 'CAREER_GUIDANCE',
};

export const normalizeBlogCategory = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  return blogCategoryMap[value] ?? blogCategoryMap[value.trim()] ?? value;
};

export const buildWhereConditions = (
  filters: IBlogFilters
): Prisma.BlogPostWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.BlogPostWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as const,
        },
      })),
    });
  }

  const exactFilters = Object.entries(rest)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => ({
      [key]: {
        equals: key === 'category' ? normalizeBlogCategory(value) : value,
      },
    }));

  if (exactFilters.length) {
    andConditions.push({ AND: exactFilters });
  }

  return andConditions.length ? { AND: andConditions } : {};
};
