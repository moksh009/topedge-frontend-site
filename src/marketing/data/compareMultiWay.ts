import {
  FOUR_WAY_FEATURE_MATRIX,
  THREE_WAY_FEATURE_MATRIX,
} from './compareFeatureMatrix';
import type { MultiWayConfig } from '../pages/CompareMultiWayPage';

const LOGO_WATI = '/marketing/compare/compare-logo-wati.png';
const LOGO_AISENSY = '/marketing/compare/compare-logo-aisensy.png';
const LOGO_INTERAKT = '/marketing/compare/compare-logo-interakt.png';

export const THREE_WAY_PATH = '/compare/topedge-vs-wati-vs-aisensy';
export const FOUR_WAY_PATH = '/compare/topedge-vs-wati-vs-interakt-vs-aisensy';

const THREE_WAY_FAQS = [
  {
    question: 'How does TopEdge differ from WATI and AiSensy on Meta markup?',
    answer:
      'TopEdge publishes 0% platform markup on Meta pass-through, billed by Meta to your own Business Account, so you pay ₹0.8631 per marketing template and ₹0.1150 per utility template at Meta’s India card. AiSensy publishes ₹0.145 per service message after 1,000 free a month, which is 26.1% above Meta’s ₹0.1150. WATI and AiSensy are compared on the same board for template markup, AI cost and plan limits. Open the pairwise pages for the sourced numbers.',
  },
  {
    question: 'Who should pick TopEdge in this three-way shortlist?',
    answer:
      'Shopify India teams that want flat INR plans, native COD to prepaid, unified identity and unlimited flows without a Meta markup layer.',
  },
  {
    question: 'When do WATI or AiSensy still fit?',
    answer:
      'When you need a broad WhatsApp BSP or campaign suite and can accept usage fees, credits or flow caps. Use the pairwise boards before you decide.',
  },
  {
    question: 'Where does Interakt sit against these three?',
    answer:
      'Interakt is the fourth name on most Indian shortlists, so it has its own column on the four-way board at /compare/topedge-vs-wati-vs-interakt-vs-aisensy. Every cell there is the same one published on the pairwise Interakt page.',
  },
];

const FOUR_WAY_FAQS = [
  {
    question: 'Which of WATI, Interakt and AiSensy charges a markup over Meta?',
    answer:
      'All three apply platform charges on top of Meta conversation rates on the plans compared here, which is the row at the top of the board. Two publish an exact figure. AiSensy charges ₹0.145 per service message after 1,000 free a month, against Meta’s own published India rate of ₹0.1150, a 26.1% markup on that line. Interakt sells WhatsApp AI Agents as a ₹3,000 add-on with 100 free AI messages, then ₹0.50 per AI message. TopEdge passes Meta through at 0% and bills the platform separately in INR. Both competitor figures were read off their own pricing pages on 21 October 2026; read your own rate card in Meta Business Manager before you take any vendor number, including ours.',
  },
  {
    question: 'What does Meta itself charge in India in 2026?',
    answer:
      'On Meta’s published India rate card: ₹0.8631 per delivered marketing template and ₹0.1150 per delivered utility or authentication template, before 18% GST. Effective 1 October 2026 every business phone number also gets 1,000 free service messages a month, after which replies cost ₹0.1150 each. That bill is identical whichever of these four platforms sends the message, which is why the only pricing question that matters is what each one adds on top.',
  },
  {
    question: 'What is the cheapest way into WhatsApp automation for a Shopify India store?',
    answer:
      'Entry price is only half the answer, because the Meta messaging bill sits on top of whatever the platform charges. Compare the plan fee, the per-message markup and whether COD to prepaid is gated, then model your real monthly order volume. The Subscription Model row on each pairwise board carries the published entry price.',
  },
  {
    question: 'Do I lose my approved templates if I move between these platforms?',
    answer:
      'No. Approved templates belong to your WhatsApp Business Account, not to the platform that submitted them. As long as the new tool binds the same WABA, the library follows you. Keep the Meta Business Account in your own name so this stays true.',
  },
  {
    question: 'Which one is actually best for a COD-heavy store?',
    answer:
      'Judge it on the COD rows rather than the feature count. A COD-heavy store needs confirmation before dispatch, a warehouse hold that operations will respect, and a prepaid conversion path. On TopEdge, COD confirmation is on every plan and automated COD to prepaid is on Growth and Scale.',
  },
  {
    question: 'Why does this board compare four platforms instead of two?',
    answer:
      'Because that is how the shortlist actually looks in India. Merchants search for WATI against Interakt against AiSensy, not one at a time. Every competitor cell on this board is the same verbatim cell published on that vendor pairwise page, so nothing here is written twice.',
  },
];

export function threeWayConfig(modifiedIso: string): MultiWayConfig<'wati' | 'aisensy'> {
  return {
    path: THREE_WAY_PATH,
    title: 'TopEdge AI vs WATI vs AiSensy (2026): Shopify India',
    description:
      '3-way Shopify India WhatsApp comparison: TopEdge AI vs WATI vs AiSensy on Meta template markup, BYOK AI cost, COD to prepaid funnels and chatflow limits.',
    keywords:
      'TopEdge vs WATI vs AiSensy, wati vs aisensy, WhatsApp automation comparison India, WhatsApp template markup, COD prepaid WhatsApp comparison',
    ways: '3-way',
    shortName: 'TopEdge vs WATI vs AiSensy',
    peers: [
      { key: 'wati', name: 'WATI', logo: LOGO_WATI, href: '/compare/wati' },
      { key: 'aisensy', name: 'AiSensy', logo: LOGO_AISENSY, href: '/compare/aisensy' },
    ],
    rows: THREE_WAY_FEATURE_MATRIX,
    faqs: THREE_WAY_FAQS,
    modifiedIso,
    alsoSee: [{ label: 'Add Interakt (4-way board)', href: FOUR_WAY_PATH }],
  };
}

export function fourWayConfig(
  modifiedIso: string,
): MultiWayConfig<'wati' | 'interakt' | 'aisensy'> {
  return {
    path: FOUR_WAY_PATH,
    title: 'WATI vs Interakt vs AiSensy vs TopEdge AI (2026)',
    description:
      'WATI vs Interakt vs AiSensy for Shopify India, with TopEdge AI on the same board: Meta template markup, AI message cost, COD to prepaid gating and flow limits.',
    keywords:
      'wati vs aisensy vs interakt, wati vs interakt, interakt vs aisensy, WhatsApp automation comparison Shopify India, WhatsApp API platform comparison India, best WhatsApp platform India',
    ways: '4-way',
    shortName: 'TopEdge vs WATI vs Interakt vs AiSensy',
    peers: [
      { key: 'wati', name: 'WATI', logo: LOGO_WATI, href: '/compare/wati' },
      { key: 'interakt', name: 'Interakt', logo: LOGO_INTERAKT, href: '/compare/interakt' },
      { key: 'aisensy', name: 'AiSensy', logo: LOGO_AISENSY, href: '/compare/aisensy' },
    ],
    rows: FOUR_WAY_FEATURE_MATRIX,
    faqs: FOUR_WAY_FAQS,
    modifiedIso,
    alsoSee: [{ label: '3-way board (no Interakt)', href: THREE_WAY_PATH }],
  };
}
