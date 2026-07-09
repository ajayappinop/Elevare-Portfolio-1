import { useEffect, useRef } from "react";

import { VEXUR_CALENDAR_PARAMS, VEXUR_LOADER } from "@/lib/vexur";

declare global {
  interface Window {
    VexurWidgetLoader?: {
      refresh?: () => void;
    };
  }
}

/** Mounts the Vexur calendar embed exactly as provided by Marketing Lab. */
export function BookingCalendarEmbed() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    host.replaceChildren();

    const widget = document.createElement("div");
    widget.className = "vexur-widget booking-vexur-embed";

    for (const [attribute, value] of Object.entries(VEXUR_CALENDAR_PARAMS)) {
      widget.setAttribute(attribute, value);
    }

    host.appendChild(widget);

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${VEXUR_LOADER.src}"]`,
    );

    const mountWidget = () => {
      window.VexurWidgetLoader?.refresh?.();
    };

    if (existingScript) {
      if (existingScript.dataset.vexurLoaded === "true") {
        mountWidget();
      } else {
        existingScript.addEventListener("load", mountWidget, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.src = VEXUR_LOADER.src;
      script.integrity = VEXUR_LOADER.integrity;
      script.crossOrigin = "anonymous";
      script.async = true;
      script.addEventListener(
        "load",
        () => {
          script.dataset.vexurLoaded = "true";
          mountWidget();
        },
        { once: true },
      );
      script.addEventListener("error", () => {
        console.error("Failed to load Vexur embed script");
      });
      document.body.appendChild(script);
    }

    return () => {
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className="w-full min-w-0 min-h-[640px]" />;
}
