import Image from "next/image";
import { Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutTeaser } from "@/data/home";
import { images } from "@/data/images";

export function AboutTeaser({ index = "06" }) {
  return (
    <Section tone="muted">
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
        <Reveal className="lg:col-span-6">
          <figure className="group/about relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/3]">
              <Image
                src={images.homeTeam.src}
                alt={images.homeTeam.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover/about:scale-105"
              />
            </div>
          </figure>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading index={index} eyebrow={aboutTeaser.eyebrow} title={aboutTeaser.title} lead={aboutTeaser.tagline} />
          <Reveal delay={0.24} className="mt-5">
            <Button href={aboutTeaser.cta.href}>
              {aboutTeaser.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
