import { siteName } from "@/data/site";

export function pageMetadata({ title, description, path, absolute = false }) {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName,
      title: absolute ? title : `${title} | ${siteName}`,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
    },
  };
}
