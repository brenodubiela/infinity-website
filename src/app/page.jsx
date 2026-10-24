import { PageTransition } from "@/components/ui/page-transition";
import { HomeHero } from "@/components/sections/home-hero";
import { Forensic } from "@/components/sections/forensic";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TechnologyTeaser } from "@/components/sections/technology-teaser";
import { Credentials } from "@/components/sections/credentials";
import { Clients } from "@/components/sections/clients";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { CoverageTeaser } from "@/components/sections/coverage";
import { CtaBand } from "@/components/sections/cta-band";
import { finalCta, servicesTeaser } from "@/data/home";
import { seo } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: seo.home.title,
  description: seo.home.description,
  path: "/",
  absolute: true,
});

export default function HomePage() {
  return (
    <PageTransition>
      <HomeHero />
      <Forensic index="01" />
      <ServicesGrid
        index="02"
        eyebrow={servicesTeaser.eyebrow}
        title={servicesTeaser.title}
        lead={servicesTeaser.tagline}
        cta={servicesTeaser.cta}
      />
      <TechnologyTeaser index="03" />
      <Credentials index="04" />
      <Clients index="05" />
      <AboutTeaser index="06" />
      <CoverageTeaser index="07" />
      <CtaBand title={finalCta.title} tagline={finalCta.tagline} cta={finalCta.cta} />
    </PageTransition>
  );
}
