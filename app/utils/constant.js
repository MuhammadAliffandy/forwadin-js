export const BASE_URL= process.env.NODE_ENV === 'development' ? process.env.BACKEND_URL : process.env.BACKEND_URL ;
console.log('============BASE URL =======')
console.log(BASE_URL)
console.log('============BASE URL =======')
export const PAGINATION_BATCH = 10