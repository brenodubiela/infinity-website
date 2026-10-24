"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

export function InView({ as: Tag = "div", amount = 0.35, className, children, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <Tag ref={ref} data-inview={inView ? "true" : "false"} className={className} {...props}>
      {children}
    </Tag>
  );
}
