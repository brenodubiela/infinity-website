import { PageTransition } from "@/components/ui/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { Methodology, TechDetail, TechIntro } from "@/components/sections/tecnologia";
import { images } from "@/data/images";
import { intro, technologies } from "@/data/tecnologia";
import { seo } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: seo.tecnologia.title,
  description: seo.tecnologia.description,
  path: "/tecnologia",
  absolute: true,
});

const navItems = [
  ...technologies.map((tech) => ({ id: tech.id, label: tech.nav })),
  { id: "metodologia", label: "Metodologia" },
];

const tones = ["light", "muted", "light", "muted"];

export default function TecnologiaPage() {
  return (
    <PageTransition>
      <PageHero
        breadcrumbs={[{ label: "Tecnologia", href: "/tecnologia" }]}
        eyebrow={intro.eyebrow}
        title={intro.title}
        lead={intro.tagline}
        size="lg"
        image={images.tecnologiaHero}
      />
      <SectionNav items={navItems} label="Seções da página Tecnologia" />
      <TechIntro />
      {technologies.map((tech, i) => (
        <TechDetail
          key={tech.id}
          tech={tech}
          index={String(i + 1).padStart(2, "0")}
          reverse={i % 2 === 1}
          tone={tones[i]}
        />
      ))}
      <Methodology index={String(technologies.length + 1).padStart(2, "0")} />
    </PageTransition>
  );
}
