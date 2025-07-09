import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name) {
  const value = process.env[name];

  if (typeof value === 'undefined') {
    throw new Error(`Cannot read variable ${name} from process.env`);
  }

  return value;
}
