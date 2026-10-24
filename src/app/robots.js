import { companyData } from "@/data/legal-texts";

export default function robots() {
  return {
    // /design-system não entra no Disallow: o rastreador precisa ler o noindex (meta e X-Robots-Tag).
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${companyData.url}/sitemap.xml`,
    host: companyData.url,
  };
}
