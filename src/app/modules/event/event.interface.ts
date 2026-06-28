export type IEventFilters = {
  searchTerm?: string;
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  isOnline?: boolean | string;
  imageUrl?: string;
  registrationLink?: string;
  isPast?: boolean | string;
  createdById?: string;
};

export type IEventCreatePayload = {
  title: string;
  description?: string;
  date: Date | string;
  time?: string;
  location?: string;
  isOnline?: boolean;
  imageUrl?: string;
  registrationLink?: string;
  isPast?: boolean;
  createdById?: string;
};

export type IEventDelete = {
  title?: string;
  date?: string;
  location?: string;
};

export type IEventUpdatePayload = Partial<IEventCreatePayload>;

export type IEventBulkUpdateItem = {
  id: string;
} & IEventUpdatePayload;

export type IEventUpdateManyPayload = {
  filter?: IEventFilters;
  q?: IEventFilters;
  data: IEventUpdatePayload;
};

export type IEventListQuery = {
  q?: string | IEventFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
