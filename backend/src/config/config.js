export const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY_JWT,
  NODE_ENV,
} = process.env;

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
