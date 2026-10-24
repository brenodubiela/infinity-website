import { notFound } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceBody } from "@/components/sections/servicos";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { companyData } from "@/data/legal-texts";
import { finalCta, servicesTeaser } from "@/data/home";
import { serviceImages } from "@/data/images";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const instant = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} | Infinity`,
    absolute: true,
    description: metaDescription(service.tagline),
    path: `/servicos/${service.slug}`,
  });
}

// Resultado de busca mostra ~160 caracteres: usa frases inteiras da tagline quando passam de 110,
// senão corta na última palavra que cabe.
function metaDescription(text, max = 160) {
  if (text.length <= max) return text;
  let result = "";
  for (const sentence of text.match(/[^.!?]+[.!?]+/g) ?? []) {
    if ((result + sentence).trim().length > max) break;
    result += sentence;
  }
  if (result.trim().length >= 110) return result.trim();
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:]$/, "")}…`;
}

export default async function ServicoPage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = String(services.indexOf(service) + 1).padStart(2, "0");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.tagline,
    serviceType: service.name,
    areaServed: { "@type": "Country", name: "Brasil" },
    provider: { "@id": `${companyData.url}/#organizacao` },
    url: `${companyData.url}/servicos/${service.slug}`,
  };

  return (
    <PageTransition>
      <JsonLd data={schema} />
      <PageHero
        breadcrumbs={[
          { label: "Serviços", href: "/servicos" },
          { label: service.name, href: `/servicos/${service.slug}` },
        ]}
        eyebrow={`SERVIÇO ${index}`}
        title={service.name}
        lead={service.tagline}
        actions={
          <Button href="/contato#formulario">
            {service.cta}
          </Button>
        }
        image={serviceImages[service.slug]}
      />
      <ServiceBody service={service} index={index} />
      <ServicesGrid
        eyebrow={servicesTeaser.eyebrow}
        title={servicesTeaser.title}
        cta={servicesTeaser.cta}
        exclude={service.slug}
      />
      <CtaBand title={finalCta.title} tagline={finalCta.tagline} cta={finalCta.cta} />
    </PageTransition>
  );
}
