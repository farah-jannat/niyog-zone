export const config = {
  NODE_ENV: process.env.NODE_ENV || "",
  JWT_TOKEN: process.env.JWT_TOKEN || "",
  GATEWAY_JWT_TOKEN: process.env.GATEWAY_JWT_TOKEN || "",
  RABBITMQ_ENDPOINT: process.env.RABBITMQ_ENDPOINT || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || "",
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || "",
  API_GATEWAY_URL: process.env.API_GATEWAY_URL || "",
  CLIENT_URL: process.env.CLIENT_URL || "",
  SECRET_KEY_ONE: process.env.SECRET_KEY_ONE || "",
};
