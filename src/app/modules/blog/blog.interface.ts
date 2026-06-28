export type IBlogFilters = {
  searchTerm?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  featuredImage?: string;
  author?: string;
  isFeatured?: boolean | string;
  published?: boolean | string;
  createdById?: string;
};

export type IBlogCreatePayload = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  category: string;
  featuredImage?: string;
  author?: string;
  isFeatured?: boolean;
  published?: boolean;
  createdById?: string;
};

export type IBlogDelete = {
  title?: string;
  slug?: string;
  author?: string;
};

export type IBlogUpdatePayload = Partial<IBlogCreatePayload>;

export type IBlogBulkUpdateItem = {
  id: string;
} & IBlogUpdatePayload;

export type IBlogUpdateManyPayload = {
  filter?: IBlogFilters;
  q?: IBlogFilters;
  data: IBlogUpdatePayload;
};

export type IBlogListQuery = {
  q?: string | IBlogFilters;
  limit?: string | number;
  skip?: string | number;
  sort_by?: string;
};
