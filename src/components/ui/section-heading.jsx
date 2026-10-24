import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/utils/cn";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  size = "md",
  className,
  titleClassName,
  children,
}) {
  const dark = tone === "dark";

  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-[880px]", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow index={index} tone={tone} className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Heading
          className={cn(
            "mt-2 font-semibold",
            size === "lg"
              ? "text-2xl md:text-3xl lg:text-4xl"
              : size === "sm"
                ? "text-xl md:text-2xl"
                : "text-2xl lg:text-3xl",
            dark ? "text-on-dark" : "text-ink",
            !eyebrow && "mt-0",
            titleClassName,
          )}
        >
          {title}
        </Heading>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-3 max-w-text text-base md:text-lg",
              align === "center" && "mx-auto",
              dark ? "text-on-dark-muted" : "text-muted",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
