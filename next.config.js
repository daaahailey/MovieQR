/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"], // hostname of the img url
  },

  // test
  // async redirects() {
  //   return [
  //     {
  //       source:"/contact",
  //       destination:"/form",
  //       permanent: false,
  //     },
  //   ]
  // },

  async rewrites() {
    return [
      {
        source: "/api/popular-movies",
        destination: `https://api.themoviedb.org/3/movie/popular?${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      {
        source: "/api/search-movies/:path*",
        destination: `https://api.themoviedb.org/3/search/movie?${process.env.NEXT_PUBLIC_API_KEY}:path*`,
      },
      {
        source: "/api/trailer/:path*",
        destination: `https://api.themoviedb.org/3/movie/:path*?${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    ]
  }
}