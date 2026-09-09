/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.fasilv.in", // ✅ always use your final canonical domain
  generateRobotsTxt: true, // ✅ generates robots.txt automatically
  sitemapSize: 5000, // optional, splits if you have many URLs
  changefreq: "weekly", // how often pages are expected to change
  priority: 0.7, // default priority
  trailingSlash: false, // keep URLs clean (no / at the end)
  exclude: ["/404"], // optional, pages you don’t want indexed
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/404"] },
    ],
  },
};
