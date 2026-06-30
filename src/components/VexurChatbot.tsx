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
import { cn } from "@/lib/utils";

import { loadVexurScript } from "./vexur-loader";

const LAUNCHER_HEIGHT_PX = 56;
const DEFAULT_LAUNCHER_WIDTH_PX = 184;
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

function queryInWidget(widget: HTMLElement, selector: string) {
  const inner = getChatRoot(widget);
  const roots: Array<Document | ShadowRoot | Element> = [inner];

  if (inner.shadowRoot) {
    roots.push(inner.shadowRoot);
  }

  for (const root of roots) {
    const match = root.querySelector<HTMLElement>(selector);
    if (match) {
      return match;
    }
  }

  return null;
}

function measureLauncherWidth(widget: HTMLElement) {
  const launcher = queryInWidget(
    widget,
    '[data-vx-launcher], [data-vx-widget-launcher], button, [role="button"]',
  );

  if (!launcher) {
    return DEFAULT_LAUNCHER_WIDTH_PX;
  }

  const width = Math.ceil(launcher.getBoundingClientRect().width);
  if (width > 48) {
    return Math.min(width, 280);
  }

  return DEFAULT_LAUNCHER_WIDTH_PX;
}

function syncLauncherLayout(shell: HTMLElement, widget: HTMLElement, open: boolean) {
  if (open) {
    shell.style.removeProperty("--vexur-launcher-width");
    return;
  }

  shell.style.setProperty("--vexur-launcher-width", `${measureLauncherWidth(widget)}px`);
}

function isWidgetReady(widget: HTMLElement) {
  const inner = getChatRoot(widget);
  if (inner.getAttribute("data-vx-runtime-mounted") === "true") {
    return true;
  }

  return Boolean(
    queryInWidget(widget, '[data-vx-launcher], [data-vx-widget-launcher], button, [role="button"]'),
  );
}

function hasChatInput(widget: HTMLElement) {
  const roots: Array<Document | ShadowRoot | Element> = [widget];
  const inner = getChatRoot(widget);

  if (inner !== widget) {
    roots.push(inner);
    if (inner.shadowRoot) {
      roots.push(inner.shadowRoot);
    }
  }

  for (const root of roots) {
    if (
      root.querySelector(
        'textarea, input[type="text"], input:not([type]), [contenteditable="true"]',
      )
    ) {
      return true;
    }
  }

  return false;
}

export function VexurChatbot() {
  const shellRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatOpenRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  const setChatOpenState = (open: boolean) => {
    chatOpenRef.current = open;
    setChatOpen(open);

    const shell = shellRef.current;
    const widget = widgetRef.current;
    if (shell && widget) {
      syncLauncherLayout(shell, widget, open);
    }
  };

  useEffect(() => {
    setMounted(true);
    void loadVexurScript().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const widget = widgetRef.current;
    if (!shell || !widget) {
      return;
    }

    const onShellClick = () => {
      if (!chatOpenRef.current) {
        sanitizeVexurEmbed(widget);
        setChatOpenState(true);
        sanitizeVexurEmbed(widget);
      }
    };

    const syncLayout = () => {
      sanitizeVexurEmbed(widget);
      styleVexurUi(widget);
      syncLauncherLayout(shell, widget, chatOpenRef.current);
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

    const checkClosed = () => {
      if (isWidgetReady(widget)) {
        setWidgetReady(true);
      }

      sanitizeSoon();
      attachShadowObservers();
      hookVexurIframeLoads(widget, sanitizeSoon);

      if (!chatOpenRef.current) {
        return;
      }

      const inner = getChatRoot(widget);
      const collapsed = inner.getBoundingClientRect().height <= LAUNCHER_HEIGHT_PX + 24;

      if (!hasChatInput(widget) && collapsed) {
        setChatOpenState(false);
      }
    };

    shell.addEventListener("click", onShellClick, true);
    checkClosed();

    const resizeObserver = new ResizeObserver(checkClosed);
    resizeObserver.observe(widget);

    const mutationObserver = new MutationObserver(checkClosed);
    mutationObserver.observe(widget, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-vx-runtime-mounted"],
    });

    const bodyObserver = new MutationObserver(checkClosed);
    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      shell.removeEventListener("click", onShellClick, true);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      bodyObserver.disconnect();
      for (const observer of shadowObservers) {
        observer.disconnect();
      }
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      ref={shellRef}
      className={cn(
        "vexur-chatbot-host",
        chatOpen && "vexur-chatbot-host--open",
        widgetReady && "vexur-chatbot-host--ready",
      )}
      aria-label="Chat support"
    >
      <div ref={widgetRef} className="vexur-widget" {...VEXUR_CHATBOT_PARAMS} />
    </div>,
    document.body,
  );
}
