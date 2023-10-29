export const pagination = (data: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = data;
  const sortOption = {
    [sortBy]: sortOrder,
  };
  const options = {
    ['skip']: Number(page) == 0 ? 0 : (Number(page) - 1) * Number(limit),
    ['take']: Number(limit),
    ['orderBy']: sortOption,
    ['page']: Number(page),
  };
  return options;
};
