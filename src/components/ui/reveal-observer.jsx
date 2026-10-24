"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          intersection.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );

    const observeAll = () => {
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((element) => intersection.observe(element));
    };

    observeAll();
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
