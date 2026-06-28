export type ITestimonialFilters = {
  searchTerm?: string;
  studentName?: string;
  country?: string;
  program?: string;
  university?: string;
  rating?: number | string;
  createdById?: string;
};

export type ITestimonialCreatePayload = {
  studentName: string;
  country?: string;
  program?: string;
  university?: string;
  review: string;
  photoUrl?: string;
  rating?: number;
  createdById?: string;
};

export type ITestimonialDelete = {
  studentName?: string;
  country?: string;
  university?: string;
};

export type ITestimonialUpdatePayload = Partial<ITestimonialCreatePayload>;

export type ITestimonialBulkUpdateItem = {
  id: string;
} & ITestimonialUpdatePayload;

export type ITestimonialUpdateManyPayload = {
  filter?: ITestimonialFilters;
  q?: ITestimonialFilters;
  data: ITestimonialUpdatePayload;
};

export type ITestimonialListQuery = {
  q?: string | ITestimonialFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
