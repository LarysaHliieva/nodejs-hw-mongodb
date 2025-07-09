import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const USER = getEnvVar('MONGODB_USER');
    const PWD = getEnvVar('MONGODB_PASSWORD');
    const URL = getEnvVar('MONGODB_URL');
    const DB = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${USER}:${PWD}@${URL}/${DB}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log('Error while setting up mongo connection', err);
    throw err;
  }
};
