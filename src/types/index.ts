export type IPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type IFilterOption = {
  search?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  category?: string | undefined;
};
