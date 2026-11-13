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

const CHAT_FRAME_STYLE_ID = "elevare-vexur-chat-fit";
const CHAT_LAUNCHER_WIDTH = 220;
const CHAT_LAUNCHER_HEIGHT = 88;

const CHAT_FRAME_FIT_CSS = `
.vw-chat-button.with-text {
  width: max-content !important;
  max-width: calc(100vw - 24px) !important;
  height: auto !important;
  min-height: 52px;
  padding: 10px 16px !important;
  box-sizing: border-box !important;
}
.vw-chat-button-text {
  white-space: nowrap;
}
.vw-chat-window {
  max-width: calc(100% - 16px) !important;
  box-sizing: border-box !important;
}
.vw-chat-messages,
.vw-chat-input-wrapper,
.vw-message {
  min-width: 0;
  max-width: 100%;
}
.vw-chat-header {
  max-width: 100%;
}
.vw-chat-header-info {
  flex: 1;
  min-width: 0;
  max-width: calc(100% - 44px);
}
.vw-chat-close {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  pointer-events: auto;
}
.vw-chat-name,
.vw-chat-status {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vw-message-bubble,
.vw-handoff-notice,
.vw-lead-form,
.vw-lead-form-subtitle,
.vw-quick-reply {
  overflow-wrap: anywhere;
  word-break: break-word;
  max-width: 100%;
}
`;

function findChatFrame(root: ParentNode): HTMLIFrameElement | null {
  const stack: ParentNode[] = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    if (current instanceof HTMLIFrameElement && current.classList.contains("vx-frame")) {
      return current;
    }

    if (current instanceof Element && current.shadowRoot) {
      stack.push(current.shadowRoot);
    }

    if ("children" in current) {
      stack.push(...Array.from(current.children));
    }
  }

  return null;
}

function isChatOpen(frame: HTMLIFrameElement) {
  try {
    return Boolean(
      frame.contentDocument
        ?.querySelector("vexur-chatbot")
        ?.shadowRoot?.querySelector(".vw-chat-window.open"),
    );
  } catch {
    return false;
  }
}

function fitChatFrame(frame: HTMLIFrameElement) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const open = isChatOpen(frame);
  const narrow = viewportWidth < 720;
  const width = open
    ? narrow
      ? viewportWidth
      : Math.min(440, viewportWidth)
    : Math.min(CHAT_LAUNCHER_WIDTH, Math.max(160, viewportWidth - 12));
  const height = open ? (narrow ? viewportHeight : Math.min(viewportHeight, 760)) : CHAT_LAUNCHER_HEIGHT;
  const nextWidth = `${width}px`;
  const nextHeight = `${height}px`;

  if (frame.style.width !== nextWidth) {
    frame.style.width = nextWidth;
  }
  if (frame.style.height !== nextHeight) {
    frame.style.height = nextHeight;
  }
  frame.style.maxWidth = "100vw";
  frame.style.maxHeight = "100dvh";

  try {
    const shadow = frame.contentDocument?.querySelector("vexur-chatbot")?.shadowRoot;
    if (shadow && !shadow.getElementById(CHAT_FRAME_STYLE_ID)) {
      const style = frame.contentDocument!.createElement("style");
      style.id = CHAT_FRAME_STYLE_ID;
      style.textContent = CHAT_FRAME_FIT_CSS;
      shadow.appendChild(style);
    }
  } catch {
    // Cross-origin frame.
  }
}

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
      const frame = findChatFrame(widget);
      if (frame) {
        fitChatFrame(frame);
      }
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

    const onChatLayout = (event: MessageEvent) => {
      if (event.data?.type !== "vexur:chatbot-layout") {
        return;
      }
      requestAnimationFrame(syncLayout);
    };

    window.addEventListener("message", onChatLayout);
    window.addEventListener("resize", syncLayout);

    const mutationObserver = new MutationObserver(onUpdate);
    mutationObserver.observe(widget, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-vx-runtime-mounted"],
    });

    return () => {
      window.removeEventListener("message", onChatLayout);
      window.removeEventListener("resize", syncLayout);
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
