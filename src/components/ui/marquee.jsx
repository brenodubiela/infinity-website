import { cn } from "@/utils/cn";

export function Marquee({ items, label, className, itemClassName, getKey = (item) => item, getLabel = (item) => item, renderItem }) {
  return (
    <div className={cn("group/marquee relative overflow-hidden", className)}>
      <ul aria-label={label} className="sr-only">
        {items.map((item) => (
          <li key={getKey(item)}>{getLabel(item)}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={cn(
              "flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center",
              copy === 1 && "motion-reduce:hidden",
            )}
          >
            {items.map((item) => (
              <li key={`${copy}-${getKey(item)}`} className={cn("flex items-center", itemClassName)}>
                {renderItem ? renderItem(item) : item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
