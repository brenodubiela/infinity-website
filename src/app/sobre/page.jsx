import { PageTransition } from "@/components/ui/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Innovation, International, OriginBody, Specialist } from "@/components/sections/sobre";
import { images } from "@/data/images";
import { origin, structure } from "@/data/sobre";
import { seo } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: seo.sobre.title,
  description: seo.sobre.description,
  path: "/sobre",
  absolute: true,
});

export default function SobrePage() {
  return (
    <PageTransition>
      <PageHero
        breadcrumbs={[{ label: "Sobre", href: "/sobre" }]}
        eyebrow={origin.eyebrow}
        title={origin.title}
        image={images.sobreHero}
      />
      <OriginBody />
      <Specialist index="02" />
      <International index="03" />
      <Innovation index="04" />
      <CtaBand
        id="estrutura"
        index="05"
        eyebrow={structure.eyebrow}
        title={structure.title}
        tagline={structure.text}
        cta={structure.cta}
      />
    </PageTransition>
  );
}
