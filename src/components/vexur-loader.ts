import { VEXUR_LOADER } from "@/lib/vexur";
import { installVexurEmbedPatches } from "@/lib/vexur-embed-overrides";

installVexurEmbedPatches();

let loaderPromise: Promise<void> | null = null;

export function loadVexurScript() {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if (loaderPromise) {
    return loaderPromise;
  }

  loaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${VEXUR_LOADER.src}"]`,
    );
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = VEXUR_LOADER.src;
    script.integrity = VEXUR_LOADER.integrity;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Vexur embed script"));
    document.body.appendChild(script);
  });

  return loaderPromise;
}
