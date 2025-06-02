import type { ReactNode } from "react";
import "./index.css";

export default function GlobalStyles({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
