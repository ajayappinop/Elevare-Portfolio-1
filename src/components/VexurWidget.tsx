import { useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { loadVexurScript, resetVexurWidgetMount } from "./vexur-loader";

declare global {
  interface Window {
    VexurWidgetLoader?: {
      refresh?: () => void;
    };
  }
}

type VexurWidgetProps = {
  params: Record<string, string>;
  className?: string;
};

export function VexurWidget({ params, className }: VexurWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    resetVexurWidgetMount(element);

    let cancelled = false;

    void loadVexurScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        window.VexurWidgetLoader?.refresh?.();
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
      resetVexurWidgetMount(element);
    };
  }, [params]);

  return <div ref={containerRef} className={cn("vexur-widget", className)} {...params} />;
}
