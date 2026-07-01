import { type ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1024px] px-[clamp(20px,5vw,40px)] ${className}`}
    >
      {children}
    </div>
  );
}
