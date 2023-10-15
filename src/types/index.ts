export type IPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type IFilterOption = {
  search?: string | undefined;
  min_price?: number | undefined;
  max_price?: number | undefined;
};
