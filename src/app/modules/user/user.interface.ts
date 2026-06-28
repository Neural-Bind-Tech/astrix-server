import type { UserRole, UserStatus } from '../../../generated/prisma/enums';

export type IUserFilters = {
  searchTerm?: string;
  fullName?: string;
  email?: string;
  role?: UserRole | string;
  status?: UserStatus | string;
  createdById?: string;
};

export type IUserCreatePayload = {
  email: string;
  fullName: string;
  role?: UserRole;
  password?: string;
  phone?: string;
  status?: UserStatus;
  createdById?: string;
};

export type IUserUpdatePayload = Partial<IUserCreatePayload>;

export type IUserListQuery = {
  q?: string | IUserFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
