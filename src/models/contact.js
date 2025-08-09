import { Schema } from 'mongoose';
import mongoose from 'mongoose';

import { CONTENT_TYPE } from '../constans/index.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },

    contactType: {
      type: String,
      required: true,
      enum: Object.values(CONTENT_TYPE),
      default: 'personal',
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },

    photo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Contacts = mongoose.model('Contact', contactsSchema, 'contacts');
