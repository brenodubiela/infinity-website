export function Reveal({ as: Tag = "div", delay = 0, y = 16, className, style, children, ...props }) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
