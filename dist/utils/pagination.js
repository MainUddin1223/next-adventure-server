'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.pagination = void 0;
const pagination = data => {
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
    ['skip']: (Number(page) - 1) * Number(limit),
    ['take']: Number(limit),
    ['orderBy']: sortOption,
    ['page']: Number(page),
  };
  return options;
};
exports.pagination = pagination;
