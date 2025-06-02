import clsx from "clsx";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalWrapper({ children }: { children: ReactNode }) {
  return createPortal(
    <div
      className={clsx(
        "bg-secondary fixed inset-0 z-50 flex items-center justify-center"
      )}
    >
      {children}
    </div>,
    document.body
  );
}
