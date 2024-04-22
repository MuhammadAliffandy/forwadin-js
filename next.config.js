/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
    env:{
        BASE_URL:process.env.BASE_URL,
        BASE_URL_DEV:process.env.BASE_URL_DEV
    },
    productionBrowserSourceMaps:false
}

module.exports = nextConfig
