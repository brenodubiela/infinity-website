import { Section } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { InView } from "@/components/ui/in-view";
import { EdrChart } from "@/components/illustrations/edr-chart";
import { MonteCarloChart } from "@/components/illustrations/montecarlo-chart";
import { ReconstructionScene } from "@/components/illustrations/reconstruction-scene";
import { technologyTeaser } from "@/data/home";
import { images } from "@/data/images";

const photos = {
  edr: images.techCdr,
  reconstruction: images.techVirtualCrash,
  montecarlo: images.techEcrash,
};

const charts = {
  edr: <EdrChart tone="dark" compact />,
  reconstruction: <ReconstructionScene tone="dark" motionPath={false} />,
  montecarlo: <MonteCarloChart tone="dark" compact />,
};

export function TechnologyTeaser({ index = "03" }) {
  return (
    <Section tone="dark">
      <div className="grid gap-4 lg:grid-cols-12">
        <SectionHeading
          index={index}
          eyebrow={technologyTeaser.eyebrow}
          title={technologyTeaser.title}
          lead={technologyTeaser.tagline}
          tone="dark"
          size="sm"
          className="lg:col-span-9"
        />
      </div>

      <Reveal delay={0.2} className="mt-5">
        <ul aria-label="Tecnologias" className="flex flex-wrap gap-1">
          {technologyTeaser.tools.map((tool) => (
            <li
              key={tool}
              className="inline-flex h-5 items-center rounded-sm border border-border-dark px-1.5 font-mono text-sm text-on-dark"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="mt-6 grid gap-2 lg:mt-8 lg:grid-cols-3">
        {technologyTeaser.cards.map((card, i) => (
          <Reveal as="li" key={card.name} delay={i * 0.1}>
            <article className="group/tech flex h-full flex-col rounded-md border border-border-dark bg-surface-deep/40 transition-colors duration-300 hover:border-white/30">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-md border-b border-border-dark">
                <Image
                  src={photos[card.visual].src}
                  alt={photos[card.visual].alt}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover/tech:scale-105"
                />
                <InView className="absolute inset-x-1.5 bottom-1.5 flex h-[48%] items-center justify-center rounded-sm border border-white/10 bg-surface-deep/85 p-1 backdrop-blur-sm data-[inview=false]:[--play:paused] [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full">
                  {charts[card.visual]}
                </InView>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="font-mono text-label text-primary-on-dark uppercase">{card.name}</h3>
                <p className="mt-1.5 text-xl font-semibold text-on-dark">{card.title}</p>
                <p className="mt-1.5 text-sm text-on-dark-muted">{card.text}</p>
                <ArrowLink href={card.href} tone="dark" className="mt-auto pt-3" aria-label={`${technologyTeaser.linkLabel}: ${card.name}`}>
                  {technologyTeaser.linkLabel}
                </ArrowLink>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-6 lg:mt-8">
        <Button href={technologyTeaser.cta.href}>
          {technologyTeaser.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
