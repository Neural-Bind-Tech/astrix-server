export type IEventRegistrationFilters = {
  searchTerm?: string;
  eventId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  createdById?: string;
};

export type IEventRegistrationCreatePayload = {
  eventId: string;
  fullName: string;
  email: string;
  phone?: string;
  createdById?: string;
};

export type IEventRegistrationDelete = {
  eventId?: string;
  email?: string;
  phone?: string;
};

export type IEventRegistrationUpdatePayload =
  Partial<IEventRegistrationCreatePayload>;

export type IEventRegistrationBulkUpdateItem = {
  id: string;
} & IEventRegistrationUpdatePayload;

export type IEventRegistrationUpdateManyPayload = {
  filter?: IEventRegistrationFilters;
  q?: IEventRegistrationFilters;
  data: IEventRegistrationUpdatePayload;
};

export type IEventRegistrationListQuery = {
  q?: string | IEventRegistrationFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
