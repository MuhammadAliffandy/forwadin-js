export const BASE_URL= process.env.NODE_ENV === 'development' ? process.env.BASE_URL_DEV || '' : process.env.BACKEND_URL || '';
export const PAGINATION_BATCH = 10