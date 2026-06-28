export type IApplicationFilters = {
  searchTerm?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  countryOfInterest?: string;
  programPreference?: string;
  academicBackground?: string;
  budgetRange?: string;
  preferredIntake?: string;
  message?: string;
  documentsUrl?: string;
  status?: string;
  createdById?: string;
};

export type IApplicationCreatePayload = {
  fullName: string;
  email: string;
  phone: string;
  countryOfInterest: string;
  programPreference?: string;
  academicBackground?: string;
  budgetRange?: string;
  preferredIntake?: string;
  message?: string;
  documentsUrl?: string;
  status?: string;
  createdById?: string;
};

export type IApplicationDelete = {
  fullName?: string;
  email?: string;
  phone?: string;
};

export type IApplicationUpdatePayload = Partial<IApplicationCreatePayload>;

export type IApplicationBulkUpdateItem = {
  id: string;
} & IApplicationUpdatePayload;

export type IApplicationUpdateManyPayload = {
  filter?: IApplicationFilters;
  q?: IApplicationFilters;
  data: IApplicationUpdatePayload;
};
