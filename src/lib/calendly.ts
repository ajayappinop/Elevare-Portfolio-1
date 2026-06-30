/** Fallback contact — set VITE_CONTACT_EMAIL in .env.local */
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "hello@elevareportfolio.com.au";
