import CostCalculator from '../../components/CostCalculator';
import ToolPageLayout from '../../components/tools/ToolPageLayout';
import type { TopicBlock } from '../../components/topic/TopicBlocks';

const FAQS = [
  {
    question: 'How much does one RTO parcel cost in India?',
    answer:
      'About ₹180 to ₹240 in direct logistics: the forward shipment, the return leg, repackaging and inventory held in transit. Count the ad spend that brought in a customer who then refused the parcel and it rises to roughly ₹450 to ₹900.',
  },
  {
    question: 'What is a normal RTO rate for COD orders?',
    answer:
      'COD orders come back far more often than prepaid ones: published Indian data puts COD RTO near 26% against under 2% for prepaid. Fashion and apparel run highest, and festive months spike, so use your own courier reports where you can.',
  },
  {
    question: 'How does WhatsApp COD confirmation reduce RTO?',
    answer:
      'It asks every COD customer to confirm the order before you pack it. Orders the customer cancels, or never confirms, are held instead of shipped, so you stop paying shipping both ways on parcels that were never going to be accepted.',
  },
  {
    question: 'What does a WhatsApp confirmation message cost?',
    answer:
      'A COD confirmation is a utility message, which Meta charges at ₹0.1150 in India. On TopEdge that is billed by Meta to your own account with no markup.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'figures',
    id: 'numbers',
    h2: 'Where these numbers come from',
    figures: [
      {
        value: '₹180 to ₹240',
        label: 'Direct logistics cost of one returned parcel: both shipping legs, repackaging and holding.',
        source: 'amazonShippingRto',
      },
      {
        value: '26% vs under 2%',
        label: 'Return-to-origin rate for COD orders against prepaid ones in India.',
        source: 'firstResortReturns',
      },
      {
        value: '₹0.1150',
        label: 'What Meta charges for one WhatsApp utility message, like a COD confirmation, in India.',
        source: 'metaPricing',
      },
    ],
  },
  {
    kind: 'steps',
    id: 'cut-rto',
    h2: 'Three ways to cut RTO this month',
    steps: [
      {
        title: 'Confirm every COD order before you pack it',
        body: 'A WhatsApp message with Confirm and Cancel buttons, sent minutes after checkout. Hold anything that is not confirmed.',
      },
      {
        title: 'Offer a reason to pay online',
        body: 'Once an order is confirmed, offer free shipping for paying by UPI. Prepaid orders rarely come back.',
      },
      {
        title: 'Ship confirmed orders fast',
        body: 'Orders first attempted within one to two days had 22% RTO in published Indian data, against 35% for ones attempted after five days or more.',
      },
    ],
  },
  {
    kind: 'callout',
    id: 'journey',
    tone: 'note',
    title: 'See the full COD confirmation journey',
    body: 'Every message, the timing, what happens on each reply, and what it costs per order.',
    link: { label: 'Open the journey', href: '/whatsapp-journey-examples/cod-confirmation' },
  },
];

export default function RtoCalculatorPage() {
  return (
    <ToolPageLayout
      slug="rto-cost-calculator"
      path="/tools/rto-cost-calculator"
      seoTitle="RTO Cost Calculator for Shopify India | Free Tool | TopEdge AI"
      description="Free RTO cost calculator for Indian Shopify stores: see what returned COD parcels cost you each month, and what WhatsApp COD confirmation costs instead."
      keywords="RTO cost calculator, RTO calculator India, COD RTO cost, return to origin cost Shopify, reduce RTO India, COD confirmation cost"
      name="RTO cost calculator"
      h1="RTO cost calculator for Shopify stores"
      accent="RTO cost calculator"
      subtitle="See what returned COD parcels cost you each month, and what confirming them on WhatsApp would cost instead."
      privacy="Runs in your browser. Nothing you type is saved or sent anywhere."
      blocks={BLOCKS}
      faqs={FAQS}
      cta={{
        title: 'Stop shipping orders that come back',
        subtitle: 'Switch on WhatsApp COD confirmation on your Shopify store today. Free for 14 days.',
      }}
    >
      <CostCalculator calc="rto-cost">
        <p>
          At 1,000 orders a month, 60% of them COD and a 26% RTO rate on COD, about 156 parcels come
          back. That is ₹28,080 to ₹37,440 a month in direct logistics, while confirming all 600 COD
          orders on WhatsApp costs about ₹69.
        </p>
      </CostCalculator>
    </ToolPageLayout>
  );
}
