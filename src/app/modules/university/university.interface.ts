export type UniversityCountry =
  | 'USA'
  | 'CHINA'
  | 'MALAYSIA'
  | 'SOUTH_KOREA'
  | 'THAILAND'
  | 'UK'
  | 'CANADA'
  | 'AUSTRALIA'
  | 'OTHER';

export type IUniversityFilters = {
  searchTerm?: string;
  name?: string;
  country?: UniversityCountry | string;
  city?: string;
  worldRank?: string;
  scholarshipType?: string;
  intake?: string;
  featured?: boolean | string;
  createdById?: string;
};

export type IUniversityCreatePayload = {
  name: string;
  country: UniversityCountry;
  city: string;
  logoUrl?: string;
  description?: string;
  worldRank?: string;
  majors?: string[];
  programs?: string[];
  tuitionFee?: string;
  hostelFee?: string;
  scholarshipType?: string;
  intake?: string;
  deadline?: string;
  documentsRequired?: string[];
  website?: string;
  featured?: boolean;
  createdById?: string;
};

export type IUniversityDelete = {
  name?: string;
  country?: string;
  city?: string;
};

export type IUniversityUpdatePayload = Partial<IUniversityCreatePayload>;

export type IUniversityBulkUpdateItem = {
  id: string;
} & IUniversityUpdatePayload;

export type IUniversityUpdateManyPayload = {
  filter?: IUniversityFilters;
  q?: IUniversityFilters;
  data: IUniversityUpdatePayload;
};

export type IUniversityListQuery = {
  q?: string | IUniversityFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
