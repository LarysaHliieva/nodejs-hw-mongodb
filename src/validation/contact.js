import Joi from 'joi';

import { CONTENT_TYPE } from '../constans/index.js';

const contactTypeValues = Object.values(CONTENT_TYPE);

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeValues)
    .required(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2 }).min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeValues),
});
