import FaqAccordion from '../topic/FaqAccordion';

export const PRICING_FAQS = [
  {
    q: 'Is GST included?',
    a: 'No, prices are exclusive. +18% GST (SAC 998314). Invoices included on every plan.',
  },
  {
    q: 'What’s in the free trial?',
    a: '14 days, 20 orders, 200 campaign + email sends. No card on this site. Pick Launch, Growth, or Scale after signup.',
  },
  {
    q: 'Why can’t I pay here?',
    a: 'Checkout needs a dashboard account first. Start free → signup → confirm & pay in billing (Razorpay).',
  },
  {
    q: 'Are Meta fees included?',
    a: 'No. Meta Cloud API messaging is pass-through only, at Meta’s published per-message rates, passed through at 0% markup. We don’t markup conversations.',
  },
  {
    q: 'What does Meta charge per message in India?',
    a: 'On Meta’s published India rate card: ₹0.8631 per delivered marketing template and ₹0.1150 per delivered utility or authentication template, before 18% GST. Since 1 October 2026 each business phone number also gets 1,000 free service messages a month, then ₹0.1150 per reply. Meta bills that to your own Business Account and we add nothing to it.',
  },
  {
    q: 'What does 0% markup save me in rupees?',
    a: 'It depends on your send volume, which is the point. On 10,000 marketing messages a month, Meta’s card is ₹8,631. A platform charging Dondy’s published $0.01888 India rate bills about ₹13,810 for the same sends, so ₹5,179 more. On service replies, AiSensy publishes ₹0.145 against Meta’s ₹0.1150, which is ₹3,000 extra on 100,000 replies. Our margin is in the subscription instead, so your message bill does not grow when a campaign works.',
  },
  {
    q: 'Do I need to migrate my WhatsApp account to INR billing?',
    a: 'If your WhatsApp Business Account is still billed in a currency other than INR, yes. Meta requires every eligible Indian WABA to be on INR billing by 31 December 2026 and stops delivering messages on non-INR accounts from 1 January 2027. An existing USD account cannot be flipped in place, so it needs a new WABA created with INR billing. Check your billing currency in Meta Business Manager now rather than in December.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel in the dashboard at period end. Access continues until the cycle finishes.',
  },
  {
    q: 'Which plans include Journey Branch?',
    a: 'Journey Branch, which routes a WhatsApp journey down a different path based on a condition, is available on Growth and Scale only. Launch does not include it.',
  },
];

/** Answers stay in the DOM for crawlers (same pattern as CompareFaq). */
export default function PricingFaq() {
  return <FaqAccordion items={PRICING_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />;
}
