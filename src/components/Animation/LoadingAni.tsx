import type { ReactNode } from "react";

export default function LoadingAni({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-1/2 w-full translate-y-[-50%] text-center">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-3 w-3 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
          <div className="bg-primary h-3 w-3 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
          <div className="bg-primary h-3 w-3 animate-bounce rounded-full"></div>
        </div>
        {children}
      </div>
    </div>
  );
}
