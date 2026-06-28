import type { Prisma } from '../../../generated/prisma/client';
import { applicationSearchableFields } from './application.const';
import type { IApplicationFilters } from './application.interface';

export const buildWhereConditions = (
  filters: IApplicationFilters
): Prisma.ApplicationWhereInput => {
  const { searchTerm, ...rest } = filters;
  const andConditions: Prisma.ApplicationWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: applicationSearchableFields.map((field) => ({
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
        equals: value,
      },
    }));

  if (exactFilters.length) {
    andConditions.push({ AND: exactFilters });
  }

  return andConditions.length ? { AND: andConditions } : {};
};
