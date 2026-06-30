export const VEXUR_UI_OVERRIDE_ID = "elevare-vexur-ui-overrides";

export const VEXUR_UI_WHITE_CSS = `
.vw-chat-button,
.vw-chat-button-text {
  color: #ffffff !important;
}

.vw-chat-button svg {
  color: #ffffff !important;
  stroke: #ffffff !important;
}

.vw-chat-header,
.vw-chat-name,
.vw-chat-status,
.vw-chat-close {
  color: #ffffff !important;
}

.vw-chat-close svg,
.vw-chat-avatar svg {
  color: #ffffff !important;
  stroke: #ffffff !important;
}
`;

export const VEXUR_BACKDROP_OVERRIDE_ID = "elevare-vexur-backdrop-overrides";

export const VEXUR_BACKDROP_OVERRIDE_CSS = `
.vw-backdrop,
.vw-backdrop.open {
  background: none !important;
  background-color: transparent !important;
  background-image: none !important;
  opacity: 0 !important;
  transition: none !important;
}
`;

const VEXUR_FRAME_BACKGROUND_PATTERN =
  /border-radius:\s*12px;\s*background:\s*#fff;?|background:\s*#fff;?/gi;

const VEXUR_BACKDROP_BACKGROUND_PATTERNS: RegExp[] = [
  /(\.vw-backdrop[^{]*\{[^}]*?)background:\s*[^;]+;?\s*/gi,
  /(\.vw-backdrop\.open[^{]*\{[^}]*?)background:\s*[^;]+;?\s*/gi,
  /(\.vw-backdrop\.open[^{]*\{[^}]*?)opacity:\s*[^;]+;?\s*/gi,
  /(\.vw-backdrop[^{]*\{[^}]*?)transition:\s*[^;]+;?\s*/gi,
];

const VEXUR_IFRAME_BOOTSTRAP_ID = "elevare-vexur-iframe-patch";

/** Runs inside the Vexur iframe before chatbot-widget.js executes. */
export const VEXUR_IFRAME_PATCH_SCRIPT = `(function(){
  var ID="${VEXUR_BACKDROP_OVERRIDE_ID}";
  var CSS=${JSON.stringify(VEXUR_BACKDROP_OVERRIDE_CSS)};
  var UI_ID=${JSON.stringify(VEXUR_UI_OVERRIDE_ID)};
  var UI_CSS=${JSON.stringify(VEXUR_UI_WHITE_CSS)};
  var bgPatterns=${JSON.stringify(
    VEXUR_BACKDROP_BACKGROUND_PATTERNS.map((pattern) => pattern.source),
  )};
  function patchHtml(html){
    if(typeof html!=="string")return html;
    var next=html;
    if(html.indexOf(".vw-backdrop")>=0){
      for(var i=0;i<bgPatterns.length;i++){
        next=next.replace(new RegExp(bgPatterns[i],"gi"),"$1");
      }
      if(next.indexOf(ID)<0)next+='<style id="'+ID+'">'+CSS+"</style>";
    }
    if(html.indexOf(".vw-chat-header")>=0&&next.indexOf(UI_ID)<0){
      next+='<style id="'+UI_ID+'">'+UI_CSS+"</style>";
    }
    return next;
  }
  function stripBackdrop(root){
    if(!root||!root.querySelectorAll)return;
    var styles=root.querySelectorAll("style");
    for(var i=0;i<styles.length;i++){
      if(styles[i].id===ID)continue;
      var css=styles[i].textContent;
      if(!css||css.indexOf(".vw-backdrop")<0)continue;
      var next=css;
      for(var j=0;j<bgPatterns.length;j++){
        next=next.replace(new RegExp(bgPatterns[j],"gi"),"$1");
      }
      if(next!==css)styles[i].textContent=next;
    }
    var nodes=root.querySelectorAll(".vw-backdrop");
    for(var k=0;k<nodes.length;k++){
      nodes[k].style.setProperty("background","none","important");
      nodes[k].style.setProperty("background-color","transparent","important");
      nodes[k].style.setProperty("opacity","0","important");
      nodes[k].style.setProperty("transition","none","important");
    }
    var existing=root.querySelector("#"+ID);
    if(!existing){
      var style=document.createElement("style");
      style.id=ID;
      style.textContent=CSS;
      root.appendChild(style);
    }
  }
  if(window.__elevareVexurPatched)return;
  window.__elevareVexurPatched=true;
  var attach=Element.prototype.attachShadow;
  Element.prototype.attachShadow=function(init){
    var root=attach.call(this,init);
    stripBackdrop(root);
    return root;
  };
  var desc=Object.getOwnPropertyDescriptor(ShadowRoot.prototype,"innerHTML");
  if(desc&&desc.set){
    Object.defineProperty(ShadowRoot.prototype,"innerHTML",{
      configurable:true,
      enumerable:desc.enumerable,
      get:function(){return desc.get.call(this);},
      set:function(value){
        var patched=typeof value==="string"?patchHtml(value):value;
        desc.set.call(this,patched);
        stripBackdrop(this);
      }
    });
  }
})();`;

let embedPatchesInstalled = false;

function patchVexurMarkup(html: string) {
  let next = html;

  if (html.includes(".vw-backdrop")) {
    for (const pattern of VEXUR_BACKDROP_BACKGROUND_PATTERNS) {
      next = next.replace(pattern, "$1");
    }

    if (!next.includes(VEXUR_BACKDROP_OVERRIDE_ID)) {
      next += `<style id="${VEXUR_BACKDROP_OVERRIDE_ID}">${VEXUR_BACKDROP_OVERRIDE_CSS}</style>`;
    }
  }

  if (html.includes(".vw-chat-header") && !next.includes(VEXUR_UI_OVERRIDE_ID)) {
    next += `<style id="${VEXUR_UI_OVERRIDE_ID}">${VEXUR_UI_WHITE_CSS}</style>`;
  }

  return next;
}

function injectIframeBootstrap(srcdoc: string) {
  if (!srcdoc.includes("vexur-chatbot") || srcdoc.includes(VEXUR_IFRAME_BOOTSTRAP_ID)) {
    return srcdoc;
  }

  const bootstrap = `<script id="${VEXUR_IFRAME_BOOTSTRAP_ID}">${VEXUR_IFRAME_PATCH_SCRIPT}<\/script>`;

  if (srcdoc.includes("<head>")) {
    return srcdoc.replace("<head>", `<head>${bootstrap}`);
  }

  if (srcdoc.includes("<body>")) {
    return srcdoc.replace("<body>", `<body>${bootstrap}`);
  }

  return `${bootstrap}${srcdoc}`;
}

function patchSrcdocValue(value: string) {
  if (!value.includes("vexur-chatbot")) {
    return value;
  }

  return injectIframeBootstrap(value);
}

function sanitizeShadowRoot(root: ShadowRoot) {
  injectOverrideStyle(root, VEXUR_BACKDROP_OVERRIDE_ID, VEXUR_BACKDROP_OVERRIDE_CSS);
  patchInjectedBackdropStyles(root);
  stripBackdropElements(root);
}

function installIframeSrcdocPatch() {
  const srcdocDescriptor = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "srcdoc");
  if (srcdocDescriptor?.set && srcdocDescriptor.get) {
    Object.defineProperty(HTMLIFrameElement.prototype, "srcdoc", {
      configurable: true,
      enumerable: srcdocDescriptor.enumerable,
      get() {
        return srcdocDescriptor.get?.call(this);
      },
      set(value: string) {
        const patched = typeof value === "string" ? patchSrcdocValue(value) : value;
        srcdocDescriptor.set?.call(this, patched);
      },
    });
  }

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function setAttributePatched(
    this: Element,
    name: string,
    value: string,
  ) {
    if (this instanceof HTMLIFrameElement && name === "srcdoc" && typeof value === "string") {
      return originalSetAttribute.call(this, name, patchSrcdocValue(value));
    }

    return originalSetAttribute.call(this, name, value);
  };
}

export function injectPatchScript(doc: Document) {
  if (doc.documentElement?.dataset.elevareVexurPatched === "true") {
    return;
  }

  if (doc.getElementById(VEXUR_IFRAME_BOOTSTRAP_ID)) {
    return;
  }

  const script = doc.createElement("script");
  script.id = VEXUR_IFRAME_BOOTSTRAP_ID;
  script.textContent = VEXUR_IFRAME_PATCH_SCRIPT;
  (doc.head ?? doc.documentElement).appendChild(script);
  doc.documentElement.dataset.elevareVexurPatched = "true";
}

/** Install synchronous hooks so Vexur never paints the backdrop background. */
export function installVexurEmbedPatches() {
  if (embedPatchesInstalled || typeof window === "undefined") {
    return;
  }

  embedPatchesInstalled = true;
  installIframeSrcdocPatch();

  const originalAttachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function attachShadowPatched(
    this: Element,
    init: ShadowRootInit,
  ) {
    const root = originalAttachShadow.call(this, init);
    injectOverrideStyle(root, VEXUR_BACKDROP_OVERRIDE_ID, VEXUR_BACKDROP_OVERRIDE_CSS);
    return root;
  };

  const innerHTMLDescriptor = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, "innerHTML");
  if (innerHTMLDescriptor?.set && innerHTMLDescriptor.get) {
    Object.defineProperty(ShadowRoot.prototype, "innerHTML", {
      configurable: true,
      enumerable: innerHTMLDescriptor.enumerable,
      get() {
        return innerHTMLDescriptor.get?.call(this);
      },
      set(value: string) {
        const patched = typeof value === "string" ? patchVexurMarkup(value) : value;
        innerHTMLDescriptor.set?.call(this, patched);
        sanitizeShadowRoot(this);
      },
    });
  }
}

function walkElementTree(element: Element, roots: Array<Document | ShadowRoot | Element>) {
  const stack: Element[] = [element];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    roots.push(current);

    if (current.shadowRoot) {
      roots.push(current.shadowRoot);
      stack.push(...Array.from(current.shadowRoot.querySelectorAll("*")));
    }

    for (const child of Array.from(current.children)) {
      stack.push(child);
    }
  }
}

export function collectEmbedRoots(widget: HTMLElement) {
  const roots: Array<Document | ShadowRoot | Element> = [widget];
  walkElementTree(widget, roots);

  for (const chatbot of document.querySelectorAll("vexur-chatbot")) {
    walkElementTree(chatbot, roots);
  }

  for (const root of [...roots]) {
    if (!("querySelectorAll" in root)) {
      continue;
    }

    for (const frame of root.querySelectorAll<HTMLIFrameElement>("iframe.vx-frame, iframe")) {
      try {
        const frameDocument = frame.contentDocument;
        if (!frameDocument) {
          continue;
        }

        injectPatchScript(frameDocument);
        roots.push(frameDocument);

        for (const chatbot of frameDocument.querySelectorAll("vexur-chatbot")) {
          walkElementTree(chatbot, roots);
        }
      } catch {
        // Cross-origin iframe — cannot patch from parent page.
      }
    }
  }

  return roots;
}

function injectOverrideStyle(root: Document | ShadowRoot, id: string, css: string) {
  let style = root.querySelector<HTMLStyleElement>(`#${id}`);

  if (!style) {
    style = document.createElement("style");
    style.id = id;
    if (root instanceof Document) {
      (root.head ?? root.documentElement).appendChild(style);
    } else {
      root.appendChild(style);
    }
  }

  if (style.textContent !== css) {
    style.textContent = css;
  }
}

function patchInjectedBackdropStyles(root: Document | ShadowRoot | Element) {
  if (!("querySelectorAll" in root)) {
    return;
  }

  for (const style of root.querySelectorAll("style")) {
    if (style.id === VEXUR_BACKDROP_OVERRIDE_ID) {
      continue;
    }

    const css = style.textContent;
    if (!css || !css.includes(".vw-backdrop")) {
      continue;
    }

    let nextCss = css;
    for (const pattern of VEXUR_BACKDROP_BACKGROUND_PATTERNS) {
      nextCss = nextCss.replace(pattern, "$1");
    }

    if (nextCss !== css) {
      style.textContent = nextCss;
    }
  }
}

function stripBackdropElements(root: Document | ShadowRoot | Element) {
  if (!("querySelectorAll" in root)) {
    return;
  }

  for (const backdrop of root.querySelectorAll<HTMLElement>(".vw-backdrop")) {
    backdrop.style.setProperty("background", "none", "important");
    backdrop.style.setProperty("background-color", "transparent", "important");
    backdrop.style.setProperty("background-image", "none", "important");
    backdrop.style.setProperty("opacity", "0", "important");
    backdrop.style.setProperty("transition", "none", "important");
  }
}

function stripVexurFrameBackgrounds(root: Document | ShadowRoot | Element) {
  if (!("querySelectorAll" in root)) {
    return;
  }

  for (const style of root.querySelectorAll("style")) {
    const css = style.textContent;
    if (!css || !css.includes(".vx-frame")) {
      continue;
    }

    const nextCss = css.replace(VEXUR_FRAME_BACKGROUND_PATTERN, "background:transparent;");
    if (nextCss !== css) {
      style.textContent = nextCss;
    }
  }

  for (const frame of root.querySelectorAll<HTMLElement>(".vx-frame, .vx-frame-wrap")) {
    frame.style.background = "transparent";
  }
}

/** Strip `.vw-backdrop` background from Vexur's injected shadow-DOM styles. */
export function sanitizeVexurEmbed(widget: HTMLElement) {
  for (const root of collectEmbedRoots(widget)) {
    if (root instanceof Document || root instanceof ShadowRoot) {
      injectOverrideStyle(root, VEXUR_BACKDROP_OVERRIDE_ID, VEXUR_BACKDROP_OVERRIDE_CSS);
    }

    patchInjectedBackdropStyles(root);
    stripBackdropElements(root);
    stripVexurFrameBackgrounds(root);
  }
}

/** Attach iframe load hooks and inject patch script into loaded Vexur frames. */
export function hookVexurIframeLoads(widget: HTMLElement, onLoad: () => void) {
  const hookedFrames = new WeakSet<HTMLIFrameElement>();

  for (const root of collectEmbedRoots(widget)) {
    if (!("querySelectorAll" in root)) {
      continue;
    }

    for (const frame of root.querySelectorAll<HTMLIFrameElement>("iframe.vx-frame, iframe")) {
      if (hookedFrames.has(frame)) {
        continue;
      }

      hookedFrames.add(frame);
      frame.addEventListener("load", onLoad);

      try {
        if (frame.contentDocument) {
          injectPatchScript(frame.contentDocument);
        }
      } catch {
        // Ignore cross-origin frame access errors.
      }
    }
  }
}

export function observeNewVexurShadowRoots(
  widget: HTMLElement,
  onChange: () => void,
  watched: Set<ShadowRoot>,
): MutationObserver[] {
  const observers: MutationObserver[] = [];

  for (const root of collectEmbedRoots(widget)) {
    if (!(root instanceof ShadowRoot) || watched.has(root)) {
      continue;
    }

    watched.add(root);
    const observer = new MutationObserver(onChange);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
      characterData: true,
    });
    observers.push(observer);
  }

  return observers;
}

if (typeof document !== "undefined") {
  installVexurEmbedPatches();
}
