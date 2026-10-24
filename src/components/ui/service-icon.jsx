import { CarFront, Cog, DraftingCompass, Factory, Flame, GraduationCap, Route, Scale } from "lucide-react";
import { cn } from "@/utils/cn";

const icons = {
  crash: Route,
  fire: Flame,
  car: CarFront,
  factory: Factory,
  drafting: DraftingCompass,
  scale: Scale,
  cog: Cog,
  training: GraduationCap,
};

export function ServiceIcon({ name, label, className }) {
  const Icon = icons[name] ?? Cog;

  return (
    <Icon
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      strokeWidth={1.5}
      className={cn("size-4", className)}
    />
  );
}
