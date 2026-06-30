import { useEffect } from "react";

import { cn } from "@/lib/utils";

import { loadVexurScript } from "./vexur-loader";

type VexurWidgetProps = {
  params: Record<string, string>;
  className?: string;
};

export function VexurWidget({ params, className }: VexurWidgetProps) {
  useEffect(() => {
    void loadVexurScript().catch((error) => {
      console.error(error);
    });
  }, []);

  return <div className={cn("vexur-widget", className)} {...params} />;
}
