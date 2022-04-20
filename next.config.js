/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"], // hostname of the img url
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
}
