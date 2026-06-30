/** Vexur embed loader — shared by calendar and chatbot widgets */
export const VEXUR_LOADER = {
  src: "https://embed.vexur.com.au/v1.1.6/loader.js",
  integrity:
    "sha384-VpFV0diwUp4nmy9HQ621vA+Lq66YUi6gcMEShp/o0WVEUebsXh8Vk5u3yh24kvSw",
} as const;

export const VEXUR_AGENT_ID =
  import.meta.env.VITE_VEXUR_AGENT_ID?.trim() || "7ccf0d2e-fb28-41a8-b5bb-5dd60bc0c0d7";

export const VEXUR_CALENDAR_PARAMS = {
  "data-widget": "calendar",
  "data-agent": VEXUR_AGENT_ID,
  "data-loader": "v2",
  "data-theme": "light",
  "data-primary-color": "#0b1f3a",
  "data-show-branding": "true",
  "data-consent": "pending",
  "data-vx-no-fallback": "true",
  "data-vx-param-calendar-widget-build-id": "calendar-cd3750f0",
  "data-vx-param-renderer": "calendar-render-v2",
  "data-vx-param-v": "2026-06-16T03:05:58.028352+00:00",
} as const;

export const VEXUR_CHATBOT_PARAMS = {
  "data-widget": "chatbot",
  "data-agent": VEXUR_AGENT_ID,
  "data-loader": "v2",
  "data-theme": "auto",
  "data-primary-color": "#0f6f3f",
  "data-show-branding": "true",
  "data-consent": "pending",
  "data-vx-no-fallback": "true",
  "data-vx-param-widget-id": "32fea886-9a8c-48ee-a687-8a01e63dec9c",
} as const;
