import { CONTENT_TYPE } from '../constans/index.js';

const parsType = (value) => {
  if (typeof value !== 'string') {
    return;
  }
  if (Object.values(CONTENT_TYPE).includes(value)) {
    return value;
  }
};

const parsIsFavourite = (value) => {
  if (typeof value !== 'string') {
    return;
  }

  if (value === 'true') return true;
  if (value === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parsType(type);
  const parsedIsFavourite = parsIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
