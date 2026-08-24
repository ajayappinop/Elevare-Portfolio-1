import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { VEXUR_CHATBOT_PARAMS } from "@/lib/vexur";
import {
  collectEmbedRoots,
  hookVexurIframeLoads,
  installVexurEmbedPatches,
  observeNewVexurShadowRoots,
  sanitizeVexurEmbed,
  VEXUR_UI_OVERRIDE_ID,
  VEXUR_UI_WHITE_CSS,
} from "@/lib/vexur-embed-overrides";

import { loadVexurScript } from "./vexur-loader";

const VEXUR_LAUNCHER_COLOR_PATTERN =
  /(\.vw-chat-button[^{]*\{[^}]*?)color:\s*[^;]+;?/gi;
const VEXUR_HEADER_COLOR_PATTERN =
  /(\.vw-chat-header[^{]*\{[^}]*?)color:\s*[^;]+;?/gi;

installVexurEmbedPatches();

function getChatRoot(widget: HTMLElement) {
  return widget.querySelector<HTMLElement>('[data-vx-widget="chatbot"]') ?? widget;
}

function injectVexurUiOverrideStyle(root: Document | ShadowRoot) {
  if (root.querySelector(`#${VEXUR_UI_OVERRIDE_ID}`)) {
    return;
  }

  const style = document.createElement("style");
  style.id = VEXUR_UI_OVERRIDE_ID;
  style.textContent = VEXUR_UI_WHITE_CSS;

  if (root instanceof Document) {
    (root.head ?? root.documentElement).appendChild(style);
    return;
  }

  root.appendChild(style);
}

function styleVexurUi(widget: HTMLElement) {
  for (const root of collectEmbedRoots(widget)) {
    if (root instanceof Document || root instanceof ShadowRoot) {
      injectVexurUiOverrideStyle(root);
    }

    if (!("querySelectorAll" in root)) {
      continue;
    }

    for (const style of root.querySelectorAll("style")) {
      const css = style.textContent;
      if (!css) {
        continue;
      }

      let nextCss = css;
      if (css.includes(".vw-chat-button")) {
        nextCss = nextCss.replace(VEXUR_LAUNCHER_COLOR_PATTERN, "$1color:#ffffff;");
      }
      if (css.includes(".vw-chat-header")) {
        nextCss = nextCss.replace(VEXUR_HEADER_COLOR_PATTERN, "$1color:#ffffff;");
      }

      if (nextCss !== css) {
        style.textContent = nextCss;
      }
    }

    for (const button of root.querySelectorAll<HTMLElement>(".vw-chat-button")) {
      button.style.setProperty("color", "#ffffff", "important");

      for (const text of button.querySelectorAll<HTMLElement>(".vw-chat-button-text")) {
        text.style.setProperty("color", "#ffffff", "important");
      }

      for (const icon of button.querySelectorAll<SVGElement>("svg")) {
        icon.style.setProperty("color", "#ffffff", "important");
        icon.style.setProperty("stroke", "#ffffff", "important");
      }
    }

    for (const header of root.querySelectorAll<HTMLElement>(
      ".vw-chat-header, .vw-chat-name, .vw-chat-status, .vw-chat-close",
    )) {
      header.style.setProperty("color", "#ffffff", "important");
    }

    for (const icon of root.querySelectorAll<SVGElement>(
      ".vw-chat-close svg, .vw-chat-avatar svg",
    )) {
      icon.style.setProperty("color", "#ffffff", "important");
      icon.style.setProperty("stroke", "#ffffff", "important");
    }
  }
}

export function VexurChatbot() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    void loadVexurScript().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) {
      return;
    }

    const syncLayout = () => {
      sanitizeVexurEmbed(widget);
      styleVexurUi(widget);
    };

    const sanitizeSoon = () => {
      syncLayout();
      queueMicrotask(syncLayout);
      requestAnimationFrame(syncLayout);
    };

    const watchedShadowRoots = new Set<ShadowRoot>();
    const shadowObservers: MutationObserver[] = [];

    const attachShadowObservers = () => {
      shadowObservers.push(
        ...observeNewVexurShadowRoots(widget, sanitizeSoon, watchedShadowRoots),
      );
    };

    const onUpdate = () => {
      sanitizeSoon();
      attachShadowObservers();
      hookVexurIframeLoads(widget, sanitizeSoon);
    };

    onUpdate();

    const mutationObserver = new MutationObserver(onUpdate);
    mutationObserver.observe(widget, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-vx-runtime-mounted"],
    });

    return () => {
      mutationObserver.disconnect();
      for (const observer of shadowObservers) {
        observer.disconnect();
      }
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="vexur-chatbot-host" aria-label="Chat support">
      <div ref={widgetRef} className="vexur-widget" {...VEXUR_CHATBOT_PARAMS} />
    </div>,
    document.body,
  );
}
