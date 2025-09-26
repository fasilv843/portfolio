/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fasilv.in", // ✅ your domain (without trailing slash)
  generateRobotsTxt: true,       // ✅ generates robots.txt
  sitemapSize: 7000,             // split if you have many URLs
  changefreq: "weekly",          // optional
  priority: 0.7,                 // optional
  exclude: ["/404"],             // paths to exclude
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/404"] },
    ],
  },
};
