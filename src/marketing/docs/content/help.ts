import type { DocArticle } from '../types';

/** Help — symptom-first index. Every entry is something a merchant literally sees. */
export const HELP_ARTICLES: DocArticle[] = [
  {
    slug: 'troubleshooting',
    group: 'help',
    navLabel: 'Troubleshooting',
    title: 'Troubleshooting WhatsApp automation',
    description:
      'Find your symptom and its fix — messages not sending, empty inbox, templates rejected, carts without phone numbers, broadcasts blocked and connection errors.',
    h1: 'Troubleshooting',
    lead:
      'Organised by what you can see, not by which part of the product is responsible. Find the symptom, work the fixes in order — they are listed most likely first.',
    keywords: [
      'WhatsApp automation not sending',
      'WhatsApp inbox empty',
      'template rejected fix',
      'abandoned cart no phone number',
      'WhatsApp disconnected Shopify',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/settings?tab=connections', label: 'Check connections' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Most problems are one of four things: a journey left in Draft, a template that is not Approved at send time, the **messages** webhook field not subscribed, or storefront tracking not capturing a phone number. Check those four before anything else — and read the skip reason on the affected order, which usually names the cause outright.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Start with the skip reason',
        body:
          'If a customer did not get a message about an order, open that order in [Orders](/docs/reference/orders). The activity list records what was attempted and why it was skipped, which is faster than any checklist.',
      },
      { kind: 'h2', id: 'nothing-sending', text: 'Nothing is sending' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'A journey is live but customers get no messages',
            fixes: [
              'Confirm the journey shows **Published**, not Draft. Saving is not publishing.',
              'Confirm every template it uses shows **Approved** right now — Meta can pause an approved template later.',
              'Check trigger filters are not excluding the customer. Rules combine with AND.',
              'Confirm the order or cart carries a phone number in international format.',
              'Read the skip reason on the order — see [Orders](/docs/reference/orders#activity).',
            ],
          },
          {
            symptom: 'Order confirmations never fire',
            fixes: [
              'The journey must use the **order placed** trigger. There is no "order confirmed" trigger.',
              'Republish after changing a trigger — a live journey keeps the trigger it was published with.',
              'See [Order status updates](/docs/guides/order-status-updates#triggers).',
            ],
          },
          {
            symptom: 'Shipped and delivered never fire, but confirmations work',
            fixes: [
              'Fulfilment permissions are missing on the Shopify connection.',
              'Settings → Shopify → **Reconnect** and approve the full permission list.',
              'See [Connect Shopify](/docs/connect-shopify#permissions).',
            ],
          },
          {
            symptom: 'Messages stopped part-way through a campaign',
            fixes: [
              'Check your cycle send allowance in Settings → Billing.',
              'Check your Meta messaging limit in Meta Business Manager.',
              'See [limits and quotas](/docs/platform/limits-and-quotas#what-it-looks-like).',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'inbox', text: 'The inbox is wrong' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Inbox is completely empty',
            fixes: [
              'The **messages** webhook field is not subscribed. This is the single most common cause.',
              'Message from a personal phone — a business number cannot message itself.',
              'Confirm a flow is **Published** in Flow Builder.',
              'See [Connect WhatsApp](/docs/connect-whatsapp#troubleshooting).',
            ],
          },
          {
            symptom: 'Send button is greyed out or says the session expired',
            fixes: [
              'The 24-hour window has closed. Pick an approved template — see [the service window](/docs/platform/whatsapp-service-window).',
              'WhatsApp may be disconnected. Reconnect in Settings.',
              'A Marketing template to an opted-out contact is blocked by design.',
            ],
          },
          {
            symptom: 'The bot replies while an agent is typing',
            fixes: [
              'Press **Take control** on the thread — that is what pauses automation.',
              'See [inbox and handover](/docs/guides/shared-inbox-handover#daily-work).',
            ],
          },
          {
            symptom: 'The bot never replies again on one thread',
            fixes: [
              'The thread is still taken over. Press **Release to bot**.',
              'Resolving a ticket does not release it — they are separate actions.',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'templates', text: 'Template problems' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Template is stuck Pending',
            fixes: [
              'Approval is usually minutes but can take up to 24 hours on a first submission.',
              'Use **Sync from Meta** in Meta Manager if the status looks stale.',
            ],
          },
          {
            symptom: 'Template was rejected',
            fixes: [
              'Read Meta’s reason on the template row.',
              'Utility templates must contain no promotional words — sale, discount, offer, % off, free gift.',
              'Do not start or end the body with a variable, and give realistic sample values.',
              'See [message templates](/docs/platform/message-templates#rejection-reasons).',
            ],
          },
          {
            symptom: 'Template library is empty',
            fixes: [
              'You are connected to a different WhatsApp Business Account than the one holding your templates.',
              'Check which account the connection names, then reconnect to the right one.',
              'Run **Sync from Meta** afterwards.',
            ],
          },
          {
            symptom: 'A message arrived with blank values',
            fixes: [
              'Variables are unmapped on the journey node. Open it and map each one.',
              'Or the field is genuinely empty on that record — a tracking number before dispatch, for example.',
              'Preview against a real order rather than sample data.',
            ],
          },
          {
            symptom: 'A template that used to work has stopped',
            fixes: [
              'Meta can pause an approved template if its quality drops.',
              'Check template quality in Meta Business Manager and the skip reason on an affected order.',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'cart-recovery', text: 'Cart recovery problems' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Abandoned carts list is empty',
            fixes: [
              'All three layers on Store growth → Website tracking must be green.',
              'Enable the TopEdge app embed on the **live** theme, not a preview.',
              'Test in incognito with ad blockers off.',
              'On a third-party checkout, configure the partner webhook.',
              'See [store growth](/docs/reference/store-growth#tracking).',
            ],
          },
          {
            symptom: 'Carts appear but the phone column is blank',
            fixes: [
              'The customer left before a step that collects a phone number — normal for browse abandonment.',
              'On a custom phone or OTP page, add `data-topedge-phone="true"` to the input.',
              'See [abandoned cart recovery](/docs/guides/abandoned-cart-recovery#capture).',
            ],
          },
          {
            symptom: 'Carts have phone numbers but no reminder sends',
            fixes: [
              'The cart journey is in Draft. Publish it.',
              'All three cart templates should be Approved — one pending template stops the ladder part-way.',
              'A minimum cart value filter may be excluding the cart.',
            ],
          },
          {
            symptom: 'Recovered revenue stays at zero',
            fixes: [
              'Nobody has completed a checkout after receiving a reminder yet.',
              'Attribution is last touch within seven days — later orders fall outside it.',
              'Confirm your test order used the same phone number as the cart.',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'broadcasts', text: 'Broadcast problems' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Launch blocked — too many contacts opted out',
            fixes: [
              'Filter Audience by consent to see who is excluded.',
              'Remove any purchased or scraped list — there is no safe way to send to one.',
              'Narrow to a consented segment and send to that.',
              'See [send a broadcast](/docs/guides/whatsapp-broadcast#troubleshooting).',
            ],
          },
          {
            symptom: 'The template you want is not in the picker',
            fixes: [
              'Broadcasts need the **Marketing** category. Utility templates are not offered.',
              'It may still be pending approval.',
            ],
          },
          {
            symptom: 'Delivered is far below sent',
            fixes: [
              'Invalid numbers or numbers not on WhatsApp — clean the list.',
              'Some recipients have blocked your business number.',
              'If it is widespread, check your quality rating in Meta Business Manager.',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'connections', text: 'Connection problems' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Amber "WhatsApp disconnected" bar on every page',
            fixes: [
              'Reconnect in Settings → Connections → WhatsApp.',
              'If you use manual credentials, paste a fresh permanent System User token — a channel that dies after a day was on a 24-hour test token.',
              'Confirm the number has not been migrated or disconnected inside Meta Business Manager.',
            ],
          },
          {
            symptom: 'Shopify shows Reconnect',
            fixes: [
              'Approve the full permission list again. Until you do, features relying on new permissions silently do nothing.',
              'Then open Orders → **Sync**.',
            ],
          },
          {
            symptom: 'Embedded signup says the phone number is already in use',
            fixes: [
              'The number is registered in the WhatsApp Business app. Delete that account or enable coexistence.',
              'Check for another Cloud API app claiming the number in Meta Business Manager.',
            ],
          },
          {
            symptom: 'Everything is connected but hubs are empty',
            fixes: [
              'Press **Sync** on Orders — the first load is a backfill, not a webhook.',
              'Reload the dashboard; connection state is cached briefly.',
              'Confirm the connected store is the one you are looking at in Shopify admin.',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'opt-in', text: 'Opt-in tool problems' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Popup or widget never shows',
            fixes: [
              'Status must be **Published**, not Draft.',
              'Enable the TopEdge Opt-In app embed on the **live** theme and Save.',
              'Test in incognito with ad blockers disabled, and hard-refresh.',
              'Loosen the display rules — a strict URL or device rule may exclude your test page.',
              'See [collect opt-in](/docs/guides/website-opt-in#troubleshooting).',
            ],
          },
          {
            symptom: 'Submission works but the contact is not in Audience',
            fixes: [
              'Search by the exact number, with and without the country code.',
              'Wait a minute or two and refresh.',
              'Confirm the tool is Published — a draft can preview without recording anything.',
            ],
          },
        ],
      },
      { kind: 'h2', id: 'still-stuck', text: 'Still stuck' },
      {
        kind: 'p',
        text:
          'Get in touch through [the contact page](/contact). To get a useful answer first time, include your **store domain**, what you expected to happen, what happened instead, a screenshot of any banner or error, and — if it concerns a specific order or cart — the order number.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Go-live checklist',
            href: '/docs/go-live-checklist',
            note: 'Catch these before launch.',
          },
          {
            label: 'Limits and quotas',
            href: '/docs/platform/limits-and-quotas',
            note: 'When a cap is the cause.',
          },
          {
            label: 'The 24-hour window',
            href: '/docs/platform/whatsapp-service-window',
            note: 'Behind most send refusals.',
          },
          { label: 'Contact support', href: '/contact', note: 'When the list runs out.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my WhatsApp automation not sending messages?',
        answer:
          'In order of likelihood: the journey is still in Draft rather than Published, the template it uses is not Approved at send time, trigger filters are excluding the customer, or the order has no phone number. The activity list on the affected order records a skip reason naming the actual cause.',
      },
      {
        question: 'Why is my WhatsApp inbox empty?',
        answer:
          'Almost always because the messages webhook field is not subscribed on your Meta app. Sending works without it but nothing inbound arrives. Check the Webhook tab in WhatsApp settings, and test by messaging your business number from a personal phone.',
      },
      {
        question: 'Who do I contact for help with TopEdge?',
        answer:
          'Use the contact page on this site. Include your store domain, what you expected, what actually happened, a screenshot of any banner, and the order number if it relates to a specific order — that combination usually gets a resolution in one reply.',
      },
    ],
  },
];
