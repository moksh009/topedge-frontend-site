const FAQS = [
  {
    q: 'How does GST work?',
    a: 'Plan prices on this page are exclusive of tax. +18% GST. SAC 998314. GST invoices are included on every plan.',
  },
  {
    q: 'What is included in the trial?',
    a: '14 days, 20 orders, and 200 successful campaign + email sends. Journey Branch and COD → prepaid follow Launch limits. No credit card on the marketing site. You’ll pick Launch, Growth, or Scale after signup.',
  },
  {
    q: 'Are WhatsApp / Meta fees included?',
    a: 'No. Meta Cloud API fees are pass-through (marketing ~₹0.88 / msg, utility ~₹0.125, service free). We never bill per conversation.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. Cancel in the dashboard at period end. You keep access until the cycle finishes. Manage billing after signup at dash.topedgeai.com/settings?tab=billing.',
  },
  {
    q: 'Do I pay on this website?',
    a: 'No. Checkout only opens after you are logged into the dashboard. Start free sends you to signup, not Razorpay from this page.',
  },
];

export default function PricingFaq() {
  return (
    <div className="mkt-pfq">
      {FAQS.map((item) => (
        <details key={item.q} className="mkt-pfq__item">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
