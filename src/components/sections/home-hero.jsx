import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Ruler } from "@/components/ui/ruler";
import { HeroBackdrop } from "@/components/sections/page-hero";
import { hero, technologyTeaser } from "@/data/home";
import { images } from "@/data/images";

function enter(delay) {
  return { style: { animationDelay: `${delay}ms` } };
}

export function HomeHero() {
  const words = hero.title.split(" ");
  const tail = words.slice(-3).join(" ");
  const head = words.slice(0, -3).join(" ");

  return (
    <section data-tone="dark" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-surface-dark text-on-dark">
      <HeroBackdrop image={images.homeHero} position="object-[72%_center]" />
      <Container className="relative flex flex-1 items-center pt-[136px] pb-8 lg:pt-[160px]">
        <div className="max-w-[680px]">
          <p {...enter(0)} className="animate-fade-up flex items-center gap-1 font-mono text-label text-silver uppercase">
            <span aria-hidden="true" className="size-1 rounded-full bg-primary-on-dark" />
            Infinity Engenharia e Perícias
          </p>
          <h1 {...enter(0)} className="animate-rise mt-3 text-2xl font-semibold text-on-dark sm:text-4xl xl:text-hero">
            {head}{" "}
            <span className="relative inline-block">
              {tail}
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-1.5 w-full overflow-visible"
              >
                <path
                  d="M2 8 C 80 2, 200 2, 298 6"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  className="draw-path animate-draw stroke-primary-on-dark"
                  style={{ animationDelay: "900ms", animationDuration: "1400ms" }}
                />
              </svg>
            </span>
          </h1>
          <p {...enter(60)} className="animate-rise mt-4 max-w-[600px] text-base text-on-dark-muted md:text-lg">
            {hero.tagline}
          </p>
          <div {...enter(340)} className="animate-fade-up mt-5 flex flex-wrap gap-1.5">
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="outline-light" arrow={false}>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      <Container className="relative">
        <div
          {...enter(500)}
          className="animate-fade-in flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/15 py-2 pr-16 font-mono text-xs text-on-dark-muted"
        >
          {technologyTeaser.tools.map((tool) => (
            <span key={tool} className="flex items-center gap-1">
              <span aria-hidden="true" className="h-px w-2 bg-primary-on-dark" />
              {tool}
            </span>
          ))}
        </div>
        <Ruler />
      </Container>
    </section>
  );
}
