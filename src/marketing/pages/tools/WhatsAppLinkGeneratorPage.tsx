import ToolPageLayout from '../../components/tools/ToolPageLayout';
import WhatsAppLinkGenerator from '../../components/tools/WhatsAppLinkGenerator';
import type { TopicBlock } from '../../components/topic/TopicBlocks';

const FAQS = [
  {
    question: 'What is a WhatsApp click-to-chat link?',
    answer:
      'A link in the form wa.me/ followed by your number. Anyone who taps it opens a WhatsApp chat with you, without saving your number first. Add a pre-filled message and it is already typed in the chat box for them.',
  },
  {
    question: 'Is this WhatsApp link generator free?',
    answer:
      'Yes, completely. There is no sign-up, and it runs in your browser, so the number and message you type are never sent to us.',
  },
  {
    question: 'Where should a Shopify store use the link?',
    answer:
      'On product pages, in the footer, on order confirmation emails, in your Instagram bio, and as a QR code on packaging or invoices. Every place a customer might have a question before or after buying.',
  },
  {
    question: 'Does the chat button slow down my Shopify store?',
    answer:
      'No. The button is a few lines of HTML with an inline icon. It loads no script and no external file, so it has no measurable effect on page speed.',
  },
  {
    question: 'Can I reply to these chats from a shared inbox?',
    answer:
      'Yes, if the number is connected to a WhatsApp Business Platform tool. On TopEdge the chat lands in a shared inbox with the customer’s Shopify order shown beside it.',
  },
];

const BLOCKS: TopicBlock[] = [
  {
    kind: 'steps',
    id: 'where',
    h2: 'Five places to use your WhatsApp link',
    steps: [
      { title: 'Product pages', body: 'A “Questions? Chat with us” link next to the Add to cart button answers doubts before they turn into an abandoned cart.' },
      { title: 'Order confirmation emails', body: 'One link for “where is my order” and address changes, so customers do not have to find your number.' },
      { title: 'Packaging and invoices', body: 'Print the QR code. Scanning it opens a chat for reorders, reviews and support.' },
      { title: 'Instagram bio and ads', body: 'Click-to-chat turns profile visits and ad clicks into conversations you can follow up.' },
      { title: 'Your store’s chat button', body: 'Paste the button code above into your theme so it sits on every page.' },
    ],
  },
  {
    kind: 'callout',
    id: 'automation',
    tone: 'note',
    title: 'Getting more chats than you can answer?',
    body: 'Connect your number to TopEdge and every chat lands in one shared inbox with the customer’s Shopify order beside it, plus ready-made replies for order status.',
    link: { label: 'See the Shopify WhatsApp integration', href: '/shopify-whatsapp-integration' },
  },
];

export default function WhatsAppLinkGeneratorPage() {
  return (
    <ToolPageLayout
      slug="whatsapp-link-generator"
      path="/tools/whatsapp-link-generator"
      seoTitle="Free WhatsApp Link & QR Code Generator for Shopify | TopEdge AI"
      description="Free WhatsApp link generator: create a wa.me click-to-chat link and QR code with a pre-filled message, and a chat button for your Shopify store. No sign-up."
      keywords="WhatsApp link generator, wa.me link generator, WhatsApp QR code generator, click to chat link, WhatsApp button for Shopify, WhatsApp chat link India"
      name="WhatsApp link generator"
      h1="WhatsApp link and QR code generator"
      accent="WhatsApp link"
      subtitle="Create a click-to-chat link and QR code with a pre-filled message, then add a WhatsApp chat button to your Shopify store. Free, no sign-up."
      privacy="Runs entirely in your browser. Your number and message are never sent to us."
      blocks={BLOCKS}
      faqs={FAQS}
      cta={{
        title: 'Turn those chats into sales',
        subtitle: 'Answer every WhatsApp chat from one inbox, with the Shopify order beside it. Free for 14 days.',
      }}
    >
      <WhatsAppLinkGenerator />
    </ToolPageLayout>
  );
}
