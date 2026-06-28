export type InquiryStatus = 'NEW' | 'REPLIED' | 'CLOSED';

export type IInquiryFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  status?: InquiryStatus | string;
  createdById?: string;
};

export type IInquiryCreatePayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: InquiryStatus;
  createdById?: string;
};

export type IInquiryDelete = {
  name?: string;
  email?: string;
  phone?: string;
};

export type IInquiryUpdatePayload = Partial<IInquiryCreatePayload>;

export type IInquiryBulkUpdateItem = {
  id: string;
} & IInquiryUpdatePayload;

export type IInquiryUpdateManyPayload = {
  filter?: IInquiryFilters;
  q?: IInquiryFilters;
  data: IInquiryUpdatePayload;
};

export type IInquiryListQuery = {
  q?: string | IInquiryFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
