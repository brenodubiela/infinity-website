import { ViewTransition } from "react";

export function PageTransition({ children }) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      {children}
    </ViewTransition>
  );
}
