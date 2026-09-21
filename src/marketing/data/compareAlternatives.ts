/**
 * Fair one-line index for /compare/alternatives — factual positioning, not a pitch.
 * Keep in sync with COMPARE_COMPETITORS slugs.
 */
export type AlternativeEntry = {
  slug: string;
  name: string;
  href: string;
  logo: string;
  logoAlt: string;
  oneLiner: string;
};

export const COMPARE_ALTERNATIVES: AlternativeEntry[] = [
  {
    slug: 'wati',
    name: 'WATI',
    href: '/compare/wati',
    logo: '/marketing/compare/compare-logo-wati.png',
    logoAlt: 'WATI logo',
    oneLiner: 'Broad WhatsApp BSP with usage charges and chatflow trigger caps.',
  },
  {
    slug: 'aisensy',
    name: 'AiSensy',
    href: '/compare/aisensy',
    logo: '/marketing/compare/compare-logo-aisensy.png',
    logoAlt: 'AiSensy logo',
    oneLiner: 'India WhatsApp marketing platform with credit / conversation-based plans.',
  },
  {
    slug: 'interakt',
    name: 'Interakt',
    href: '/compare/interakt',
    logo: '/marketing/compare/compare-logo-interakt.png',
    logoAlt: 'Interakt logo',
    oneLiner: 'Shopify WhatsApp marketing with plan meters and optional AI add-ons.',
  },
  {
    slug: 'bitespeed',
    name: 'Bitespeed',
    href: '/compare/bitespeed',
    logo: '/marketing/compare/compare-logo-bitespeed.png',
    logoAlt: 'Bitespeed logo',
    oneLiner: 'Omnichannel AI marketing OS with a USD floor and paid AI add-ons.',
  },
  {
    slug: 'zoko',
    name: 'Zoko',
    href: '/compare/zoko',
    logo: '/marketing/compare/compare-logo-zoko.svg',
    logoAlt: 'Zoko logo',
    oneLiner: 'India-native WhatsApp commerce with base fee plus per-conversation metering.',
  },
  {
    slug: 'getgabs',
    name: 'Getgabs',
    href: '/compare/getgabs',
    logo: '/marketing/compare/compare-logo-getgabs.svg',
    logoAlt: 'Getgabs logo',
    oneLiner: 'Low-cost WhatsApp entry (free to install; paid from ~$11–$15/mo) — check tier gates for depth.',
  },
  {
    slug: 'kanal',
    name: 'Kanal',
    href: '/compare/kanal',
    logo: '/marketing/compare/compare-logo-kanal.svg',
    logoAlt: 'Kanal logo',
    oneLiner: 'Global WhatsApp marketing from €89/mo with native Klaviyo integration.',
  },
  {
    slug: 'dondy',
    name: 'Dondy',
    href: '/compare/dondy',
    logo: '/marketing/compare/compare-logo-dondy.svg',
    logoAlt: 'Dondy logo',
    oneLiner:
      'Broad Shopify WhatsApp app (widget through Elite AI) whose published rate table sits about 60% above Meta marketing rates.',
  },
];
