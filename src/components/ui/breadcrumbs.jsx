import Link from "next/link";
import { companyData } from "@/data/legal-texts";
import { JsonLd } from "@/components/ui/json-ld";
import { cn } from "@/utils/cn";

export function Breadcrumbs({ items, tone = "dark", className }) {
  const trail = [{ label: "Início", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${companyData.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <nav aria-label="Trilha de navegação" className={className}>
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1 font-mono text-label uppercase">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className={tone === "dark" ? "text-on-dark" : "text-ink"}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-4 transition-colors hover:underline",
                    tone === "dark" ? "text-on-dark-muted hover:text-on-dark" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className={tone === "dark" ? "text-primary-on-dark" : "text-primary"}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
