import CostCalculator from '../../components/CostCalculator';
import ToolPageLayout from '../../components/tools/ToolPageLayout';
import type { TopicBlock } from '../../components/topic/TopicBlocks';

const FAQS = [
  {
    question: 'How many abandoned carts can WhatsApp recover?',
    answer:
      'It varies a lot by store, product and price, and we do not know of an independent Indian benchmark worth quoting. That is why the calculator asks for your own estimate. Start with a conservative figure, run the sequence for a month, then put in your real number.',
  },
  {
    question: 'What does a WhatsApp cart reminder cost?',
    answer:
      'Cart reminders are marketing messages, which Meta charges at ₹0.8631 each in India. Three reminders to one cart cost at most about ₹2.59. On TopEdge, Meta bills that to your own account with no markup.',
  },
  {
    question: 'How many reminders should I send?',
    answer:
      'Three over about 72 hours is the usual sequence: one within the hour, one the next day offering help, and a last reminder. Beyond three, extra messages tend to hurt your WhatsApp quality rating more than they help.',
  },
  {
    question: 'Where do I find my abandoned checkouts?',
    answer:
      'In your Shopify admin, under Orders, then Abandoned checkouts. Shopify counts a checkout as abandoned once it has been left incomplete for more than ten minutes after the customer gave their contact details.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'figures',
    id: 'numbers',
    h2: 'Where these numbers come from',
    accent: 'numbers come from',
    figures: [
      {
        value: '70.22%',
        label: 'Average share of online shopping carts abandoned without a purchase, across 50 studies.',
        source: 'baymardCart',
      },
      {
        value: '₹0.8631',
        label: 'What Meta charges per WhatsApp marketing message in India. Every cart reminder is a marketing message.',
        source: 'metaPricing',
      },
      {
        value: '10 minutes',
        label: 'How long a checkout has to sit incomplete before Shopify counts it as abandoned.',
        source: 'shopifyAbandoned',
      },
    ],
  },
  {
    kind: 'checklist',
    id: 'practice',
    h2: 'What makes a cart reminder work',
    accent: 'cart reminder work',
    doLabel: 'Do this',
    dontLabel: 'Avoid this',
    doItems: [
      'Send the first reminder within an hour',
      'Show the product photo and the price',
      'Add a button straight back to the same checkout',
      'Stop the reminders the moment they buy or reply',
    ],
    dontItems: [
      'More than three reminders',
      'A discount in the very first message',
      'Messaging numbers that never opted in',
      'Judging success by opens instead of orders',
    ],
  },
  {
    kind: 'callout',
    id: 'journey',
    tone: 'note',
    title: 'See the full cart recovery journey',
    body: 'The three reminders, word for word, with their timing and what each one costs.',
    link: { label: 'Open the journey', href: '/whatsapp-journey-examples/abandoned-cart-recovery' },
  },
];

export default function CartRecoveryCalculatorPage() {
  return (
    <ToolPageLayout
      slug="cart-recovery-calculator"
      path="/tools/cart-recovery-calculator"
      seoTitle="Cart Recovery Calculator for Shopify | Free Tool | TopEdge AI"
      description="Free cart recovery calculator for Shopify stores in India: estimate the revenue WhatsApp reminders win back from abandoned carts, and what the messages cost."
      keywords="cart recovery calculator, abandoned cart calculator, abandoned cart revenue Shopify, WhatsApp cart recovery cost, cart recovery ROI India"
      name="Cart recovery revenue calculator"
      h1="Cart recovery revenue calculator"
      accent="Cart recovery"
      subtitle="See how much revenue WhatsApp reminders could win back, and what the messages would cost."
      privacy="Runs in your browser. Nothing you type is saved or sent anywhere."
      blocks={BLOCKS}
      faqs={FAQS}
      cta={{
        title: 'Start recovering carts on WhatsApp',
        subtitle: 'Switch on the ready-made cart recovery journey on your Shopify store. Free for 14 days.',
      }}
    >
      <CostCalculator calc="cart-recovery">
        <p>
          At 1,000 abandoned checkouts a month, a ₹1,500 order value and 10% recovered, three
          reminders bring back about ₹1,50,000 a month for at most ₹2,589 in Meta message fees.
        </p>
      </CostCalculator>
    </ToolPageLayout>
  );
}
