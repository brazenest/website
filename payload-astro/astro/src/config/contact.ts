/**
 * Public contact-form config. Both values are safe to ship to the browser:
 * the Turnstile sitekey is public by design, and the Worker URL is a public
 * endpoint gated server-side by Turnstile + origin checks. The Turnstile
 * SECRET lives only as an encrypted Worker secret — never here.
 *
 * Categories must stay in sync with CATEGORY_LABELS in contact-worker/src/index.ts.
 */
export const CONTACT_ENDPOINT = 'https://aldengillespy-contact.radiantllc.workers.dev';
export const TURNSTILE_SITEKEY = '0x4AAAAAAD6u1Kzm9xmsqvfR';

export const CONTACT_CATEGORIES = [
  { value: 'engineering', label: 'Engineering / product work' },
  { value: 'film', label: 'Film & photography commission' },
  { value: 'hiring', label: 'Full-time role / hiring' },
  { value: 'general', label: 'Collaboration, press, or general' },
] as const;
