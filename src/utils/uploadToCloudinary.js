import cloudinary from 'cloudinary';

import { getEnvVar } from '../utils/getEnvVar.js';

import { CLOUDINARY } from '../constans/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUDINARY_CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUDINARY_API_SECRET),
});

export const uploadToCloudinary = (filePath) => {
  return cloudinary.v2.uploader.upload(filePath);
};
