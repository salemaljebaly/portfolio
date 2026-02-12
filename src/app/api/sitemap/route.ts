import { NextResponse } from "next/server";

const baseUrl = "https://docker.com.ly";

const pages = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/case-study", changefreq: "monthly", priority: 0.9 },
  { url: "/projects", changefreq: "weekly", priority: 0.9 },
  { url: "/certifications", changefreq: "monthly", priority: 0.7 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar${
      page.url === "/" ? "" : page.url
    }"/>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/ar${page.url === "/" ? "" : page.url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar${
      page.url === "/" ? "" : page.url
    }"/>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`,
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
