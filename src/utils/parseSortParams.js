import { SORT_ORDER } from '../constans/index.js';

const parseSortOrder = (value) => {
  if (Object.values(SORT_ORDER).includes(value)) {
    return value;
  }

  return SORT_ORDER.ASC;
};

const parseSortBy = (value) => {
  const keys = ['name'];

  if (keys.includes(value)) {
    return value;
  }

  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
