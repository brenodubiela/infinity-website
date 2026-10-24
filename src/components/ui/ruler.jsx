import { cn } from "@/utils/cn";

export function Ruler({ tone = "dark", className }) {
  const color = tone === "dark" ? "rgb(255 255 255 / 0.18)" : "var(--color-signature-line)";
  const major = tone === "dark" ? "rgb(255 255 255 / 0.35)" : "var(--color-graphic)";

  return (
    <div
      aria-hidden="true"
      className={cn("h-2 w-full", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${major} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
        backgroundSize: "64px 16px, 8px 8px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 100%, 0 100%",
      }}
    />
  );
}
