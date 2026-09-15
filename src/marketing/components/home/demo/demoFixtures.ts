export const demoLiveChatThreads = [
  {
    id: 't1',
    name: 'Ananya R.',
    phone: '+91 98765 43210',
    preview: 'Can I change my address?',
    time: '2m',
    unread: 1,
    channel: 'whatsapp' as const,
    tag: 'Address change',
    messages: [
      { id: 'm1', from: 'customer' as const, text: 'Hi — I need to update delivery address', time: '9:40' },
      { id: 'm2', from: 'bot' as const, text: 'Sure. Share the new address and PIN.', time: '9:40' },
      { id: 'm3', from: 'customer' as const, text: '12 Park Street, 400001', time: '9:41' },
      { id: 'm4', from: 'agent' as const, text: 'Updated on Shopify. Tracking stays the same.', time: '9:42' },
    ],
  },
  {
    id: 't2',
    name: 'Rahul M.',
    phone: '+91 99887 76655',
    preview: 'Want to pay online instead of COD',
    time: '18m',
    unread: 0,
    channel: 'whatsapp' as const,
    tag: 'COD → prepaid',
    messages: [
      { id: 'm1', from: 'bot' as const, text: 'Your COD order #4821 is confirmed. Prefer prepaid?', time: '9:20' },
      { id: 'm2', from: 'customer' as const, text: 'Yes — send UPI link', time: '9:21' },
      {
        id: 'm3',
        from: 'bot' as const,
        text: 'Payment link sent. Pay in 30 mins to keep the same slot.',
        time: '9:21',
      },
    ],
  },
  {
    id: 't3',
    name: 'Priya S.',
    phone: '+91 98111 22334',
    preview: 'Still have my cart?',
    time: '1h',
    unread: 2,
    channel: 'whatsapp' as const,
    tag: 'Cart recovery',
    messages: [
      {
        id: 'm1',
        from: 'bot' as const,
        text: 'You left Vitamin C Serum in cart — ₹1,299. Complete checkout?',
        time: '8:50',
      },
      { id: 'm2', from: 'customer' as const, text: 'Yes, is 10% still valid?', time: '8:55' },
      { id: 'm3', from: 'bot' as const, text: 'Code SAVE10 applied. Tap below to checkout.', time: '8:56' },
    ],
  },
  {
    id: 't4',
    name: 'Vikram D.',
    phone: '+91 90000 11122',
    preview: 'Where is my order?',
    time: '3h',
    unread: 0,
    channel: 'whatsapp' as const,
    tag: 'Tracking',
    messages: [
      { id: 'm1', from: 'customer' as const, text: 'Where is order #TE-1099?', time: '6:10' },
      { id: 'm2', from: 'bot' as const, text: 'Out for delivery today · AWB BLUEDART9921', time: '6:11' },
    ],
  },
];

export const demoDashboard = {
  tab: 'store' as const,
  kpis: [
    { label: 'Total sales', value: '₹4.2L', delta: '+18%' },
    { label: 'Orders', value: '1,284', delta: '+9%' },
    { label: 'Recovered', value: '₹3.8L', delta: '+24%' },
    { label: 'Reply rate', value: '41%', delta: '+3%' },
  ],
  chart: [42, 48, 45, 62, 58, 71, 68, 80, 76, 88, 92, 85],
  products: [
    { name: 'Vitamin C Serum', sold: 312, revenue: '₹4.0L' },
    { name: 'Night Cream', sold: 198, revenue: '₹1.8L' },
    { name: 'Glow Kit', sold: 146, revenue: '₹3.6L' },
  ],
  recentOrders: [
    { id: '#TE-1102', customer: 'Neha K.', total: '₹2,499', status: 'Paid' },
    { id: '#TE-1101', customer: 'Arjun P.', total: '₹1,299', status: 'COD' },
    { id: '#TE-1100', customer: 'Sana A.', total: '₹899', status: 'Fulfilled' },
  ],
};

export const demoJourneys = [
  {
    id: 'j1',
    name: 'COD → Prepaid nudge',
    status: 'Live' as const,
    steps: ['Order placed', 'WhatsApp nudge', 'Pay link', 'Marked paid'],
    enrolled: 842,
    recoveredLabel: '₹2.4L · 7d',
  },
  {
    id: 'j2',
    name: 'Abandoned cart recovery',
    status: 'Live' as const,
    steps: ['Cart abandoned', 'Msg 1', 'Msg 2', 'Checkout'],
    enrolled: 1204,
    recoveredLabel: '₹1.1L · 7d',
  },
  {
    id: 'j3',
    name: 'Delivered + review ask',
    status: 'Draft' as const,
    steps: ['Delivered', 'Wait 24h', 'Review template'],
    enrolled: 0,
    recoveredLabel: 'Not live',
  },
];

export const demoFlows = [
  { id: 'f1', name: 'Welcome + catalog', status: 'Published', triggers: 'Keyword · hi', updated: '2h ago' },
  { id: 'f2', name: 'Order status bot', status: 'Published', triggers: 'Keyword · track', updated: 'Yesterday' },
  { id: 'f3', name: 'FAQ fallback', status: 'Draft', triggers: 'Default', updated: '5d ago' },
];

export const demoAbandonedCarts = [
  { id: 'c1', customer: 'Neha K.', valueInr: 2499, age: '32m', product: 'Glow Kit · 3 items', channel: 'WhatsApp' },
  { id: 'c2', customer: 'Arjun P.', valueInr: 1299, age: '2h', product: 'Vitamin C Serum', channel: 'WhatsApp' },
  { id: 'c3', customer: 'Sana A.', valueInr: 899, age: '5h', product: 'Night Cream', channel: 'Email' },
  { id: 'c4', customer: 'Vikram D.', valueInr: 3499, age: '1d', product: 'Routine Bundle', channel: 'WhatsApp' },
  { id: 'c5', customer: 'Meera L.', valueInr: 1599, age: '1d', product: 'SPF 50', channel: 'WhatsApp' },
];

export const demoCartMetrics = [
  { label: 'Active carts', value: '186' },
  { label: 'Recoverable', value: '₹6.4L' },
  { label: 'Recovered 7d', value: '₹1.1L' },
  { label: 'Recovery rate', value: '24%' },
];

export const demoOrders = [
  { id: '#TE-1102', customer: 'Neha K.', items: 3, total: '₹2,499', status: 'Paid', channel: 'WhatsApp' },
  { id: '#TE-1101', customer: 'Arjun P.', items: 1, total: '₹1,299', status: 'COD', channel: 'WhatsApp' },
  { id: '#TE-1100', customer: 'Sana A.', items: 1, total: '₹899', status: 'Fulfilled', channel: 'Web' },
  { id: '#TE-1099', customer: 'Vikram D.', items: 2, total: '₹3,499', status: 'Shipped', channel: 'WhatsApp' },
  { id: '#TE-1098', customer: 'Meera L.', items: 1, total: '₹1,599', status: 'Paid', channel: 'WhatsApp' },
];

export const demoAnalyticsByRange = {
  '7d': {
    kpis: [
      { label: 'Recovered revenue', value: '₹3.8L' },
      { label: 'Cart recovery rate', value: '24%' },
      { label: 'WhatsApp replies', value: '1,842' },
      { label: 'COD → prepaid', value: '312' },
    ],
    bars: [
      { label: 'Carts', pct: 72 },
      { label: 'COD confirm', pct: 58 },
      { label: 'Live Chat', pct: 44 },
      { label: 'Broadcasts', pct: 31 },
    ],
  },
  '30d': {
    kpis: [
      { label: 'Recovered revenue', value: '₹14.2L' },
      { label: 'Cart recovery rate', value: '27%' },
      { label: 'WhatsApp replies', value: '7,205' },
      { label: 'COD → prepaid', value: '1,104' },
    ],
    bars: [
      { label: 'Carts', pct: 81 },
      { label: 'COD confirm', pct: 66 },
      { label: 'Live Chat', pct: 52 },
      { label: 'Broadcasts', pct: 40 },
    ],
  },
} as const;

export const demoIgAutomations = [];

export const demoWarranties = [
  { id: 'w1', product: 'Vitamin C Serum', term: '12 months', claims: 4, status: 'Active' },
  { id: 'w2', product: 'Night Cream', term: '6 months', claims: 1, status: 'Active' },
  { id: 'w3', product: 'Glow Kit', term: '12 months', claims: 0, status: 'Draft' },
];
