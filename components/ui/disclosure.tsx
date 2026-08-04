import type { ReactNode } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export function Disclosure({
  id,
  summary,
  children,
  defaultOpen,
}: {
  id?: string;
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details id={id} className="group py-6" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md [&::-webkit-details-marker]:hidden">
        {summary}
        <Plus
          size={20}
          weight="bold"
          aria-hidden
          className="shrink-0 text-text-muted transition-[transform,color] duration-300 group-open:rotate-45 group-open:text-accent"
        />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
