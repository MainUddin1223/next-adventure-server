export const pagination = (data: any) => {
  const {
    page = 1,
    size = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = data;
  const sortOption = {
    [sortBy]: sortOrder,
  };
  const options = {
    ['skip']: (Number(page) - 1) * Number(size),
    ['take']: Number(size),
    ['orderBy']: sortOption,
    ['page']: Number(page),
  };
  return options;
};
