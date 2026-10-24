import { cn } from "@/utils/cn";

export function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-site px-2 sm:px-3 lg:px-4", className)} {...props}>
      {children}
    </Tag>
  );
}

const tones = {
  light: "bg-canvas text-ink",
  muted: "bg-surface-muted text-ink",
  dark: "bg-surface-dark text-on-dark",
  deep: "bg-surface-deep text-on-dark",
};

export function Section({ tone = "light", className, containerClassName, children, ...props }) {
  return (
    <section
      data-tone={tone === "dark" || tone === "deep" ? "dark" : "light"}
      className={cn("relative py-10 lg:py-16", tones[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
