import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Symbol } from "@/components/ui/logo";
import { Eyebrow } from "@/components/ui/eyebrow";

export function CtaBand({ eyebrow, index, title, tagline, cta, secondary, id }) {
  return (
    <section id={id} data-tone="dark" className="relative overflow-hidden bg-surface-dark text-on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark" />
      <Symbol
        tone="light"
        className="pointer-events-none absolute top-1/2 -right-12 w-[720px] -translate-y-1/2 opacity-[0.06] max-lg:hidden"
      />
      <Container className="relative py-12 lg:py-16">
        <div className="max-w-[920px]">
          <Reveal>
            {eyebrow ? (
              <Eyebrow index={index} tone="dark">
                {eyebrow}
              </Eyebrow>
            ) : (
              <span aria-hidden="true" className="block h-[2px] w-8 bg-primary-on-dark" />
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-2xl font-semibold text-on-dark md:text-3xl lg:text-4xl">{title}</h2>
          </Reveal>
          {tagline && (
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-text text-base text-on-dark-muted md:text-lg">{tagline}</p>
            </Reveal>
          )}
          <Reveal delay={0.24} className="mt-5 flex flex-wrap gap-1.5">
            <Button href={cta.href}>
              {cta.label}
            </Button>
            {secondary}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
