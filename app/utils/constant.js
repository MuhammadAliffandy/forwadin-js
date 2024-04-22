export const BASE_URL= process.env.NODE_ENV === 'development' ? process.env.BASE_URL_DEV : process.env.BASE_URL ;
console.log(process.env.NODE_ENV)
console.log(BASE_URL)
export const PAGINATION_BATCH = 10