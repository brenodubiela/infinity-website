import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "hero", "label"] }],
      "bg-image": [{ bg: ["grid", "grid-dark"] }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
