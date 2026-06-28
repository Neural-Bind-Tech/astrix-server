export type VisaCountry =
  | 'USA'
  | 'CHINA'
  | 'MALAYSIA'
  | 'THAILAND'
  | 'UK'
  | 'CANADA'
  | 'AUSTRALIA'
  | 'SCHENGEN'
  | 'OTHER';

export type VisaPurpose =
  | 'STUDY'
  | 'TOURIST'
  | 'BUSINESS'
  | 'FAMILY_VISIT'
  | 'OTHER';

export type VisaAppointmentStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'SCHEDULED'
  | 'COMPLETED';

export type IVisaAppointmentFilters = {
  searchTerm?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  country?: VisaCountry | string;
  visaType?: string;
  purpose?: VisaPurpose | string;
  status?: VisaAppointmentStatus | string;
  createdById?: string;
};

export type IVisaAppointmentCreatePayload = {
  fullName: string;
  email: string;
  phone: string;
  country: VisaCountry;
  visaType?: string;
  purpose?: VisaPurpose;
  preferredDate?: Date | string;
  message?: string;
  status?: VisaAppointmentStatus;
  createdById?: string;
};

export type IVisaAppointmentDelete = {
  fullName?: string;
  email?: string;
  phone?: string;
};

export type IVisaAppointmentUpdatePayload =
  Partial<IVisaAppointmentCreatePayload>;

export type IVisaAppointmentBulkUpdateItem = {
  id: string;
} & IVisaAppointmentUpdatePayload;

export type IVisaAppointmentUpdateManyPayload = {
  filter?: IVisaAppointmentFilters;
  q?: IVisaAppointmentFilters;
  data: IVisaAppointmentUpdatePayload;
};

export type IVisaAppointmentListQuery = {
  q?: string | IVisaAppointmentFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
