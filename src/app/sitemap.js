import { companyData } from "@/data/legal-texts";
import { services } from "@/data/services";

const lastModified = "2026-10-24";

export default function sitemap() {
  const pages = [
    { path: "", priority: 1 },
    { path: "/sobre", priority: 0.8 },
    { path: "/servicos", priority: 0.9 },
    { path: "/tecnologia", priority: 0.9 },
    { path: "/contato", priority: 0.8 },
    { path: "/politica-de-privacidade", priority: 0.3 },
  ];

  return [
    ...pages.map((page) => ({
      url: `${companyData.url}${page.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: page.priority,
    })),
    ...services.map((service) => ({
      url: `${companyData.url}/servicos/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
