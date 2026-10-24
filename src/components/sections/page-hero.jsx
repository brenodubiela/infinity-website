import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Ruler } from "@/components/ui/ruler";
import { cn } from "@/utils/cn";

function enter(delay) {
  return { style: { animationDelay: `${delay}ms` } };
}

export function HeroBackdrop({ image, position = "object-[70%_center]" }) {
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className={cn("animate-[hero-zoom_1600ms_var(--ease-out-expo)_both] object-cover", position)}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-surface-dark/80 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgb(27_36_48/0.96)_0%,rgb(27_36_48/0.88)_38%,rgb(27_36_48/0.45)_72%,rgb(27_36_48/0.2)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,rgb(27_36_48/0.9),transparent)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-60" />
    </>
  );
}

export function PageHero({ breadcrumbs, eyebrow, index, title, lead, actions, visual, image, size = "md", className }) {
  const withImage = Boolean(image);

  return (
    <section
      data-tone="dark"
      className={cn(
        "relative isolate overflow-hidden bg-surface-dark text-on-dark",
        withImage && "flex min-h-[640px] flex-col justify-end lg:min-h-[720px] [@media(max-height:520px)]:min-h-0",
        className,
      )}
    >
      {withImage ? (
        <HeroBackdrop image={image} />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-grid-dark [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      )}
      <Container className="relative grid gap-6 pt-[152px] pb-8 [@media(max-height:520px)]:pt-[112px] lg:grid-cols-12 lg:items-center lg:gap-4 lg:pt-[184px] lg:pb-12">
        <div className={cn(visual ? "lg:col-span-7" : withImage ? "lg:col-span-8 xl:col-span-7" : "lg:col-span-10")}>
          {breadcrumbs && (
            <div {...enter(0)} className="animate-fade-up">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {eyebrow && (
            <div {...enter(80)} className="animate-fade-up mt-4">
              <Eyebrow index={index} tone="dark">
                {eyebrow}
              </Eyebrow>
            </div>
          )}
          <h1
            {...enter(0)}
            className={cn(
              "animate-rise mt-2 font-semibold text-on-dark",
              size === "lg" ? "text-3xl md:text-4xl lg:text-hero" : "text-3xl lg:text-4xl",
            )}
          >
            {title}
          </h1>
          {lead && (
            <p {...enter(60)} className="animate-rise mt-3 max-w-text text-base text-on-dark-muted md:text-lg">
              {lead}
            </p>
          )}
          {actions && (
            <div {...enter(360)} className="animate-fade-up mt-5 flex flex-wrap gap-1.5">
              {actions}
            </div>
          )}
        </div>
        {visual && (
          <div {...enter(300)} className="animate-fade-in relative lg:col-span-5">
            {visual}
          </div>
        )}
      </Container>
      <Container className="relative">
        <Ruler />
      </Container>
    </section>
  );
}
