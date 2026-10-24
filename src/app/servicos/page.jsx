import { PageTransition } from "@/components/ui/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ServicesOverview } from "@/components/sections/servicos";
import { images } from "@/data/images";
import { finalCta } from "@/data/home";
import { servicesPage } from "@/data/services";
import { seo } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: seo.servicos.title,
  description: seo.servicos.description,
  path: "/servicos",
  absolute: true,
});

export default function ServicosPage() {
  return (
    <PageTransition>
      <PageHero
        breadcrumbs={[{ label: "Serviços", href: "/servicos" }]}
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        lead={servicesPage.tagline}
        image={images.servicosHero}
      />
      <ServicesOverview />
      <CtaBand title={finalCta.title} tagline={finalCta.tagline} cta={finalCta.cta} />
    </PageTransition>
  );
}
