import dotenv from 'dotenv';

dotenv.config();

export const PROXY_OKAPI_URL = process.env.PROXY_OKAPI_URL || 'http://localhost:9130';
export const OKAPI_TENANT = process.env.OKAPI_TENANT || 'testing-tenant';
export const OKAPI_TOKEN = process.env.OKAPI_TOKEN || 'abc123';
