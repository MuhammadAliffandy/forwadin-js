/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
    env:{
        BASE_URL:process.env.BACKEND_URL,
        BASE_URL_DEV:process.env.BASE_URL_DEV
    },
}

module.exports = nextConfig
