import type { DocArticle } from '../types';

/** Platform & policy — the WhatsApp rules and TopEdge limits that shape everything else. */
export const PLATFORM_ARTICLES: DocArticle[] = [
  {
    slug: 'platform/whatsapp-service-window',
    group: 'platform',
    navLabel: '24-hour window',
    title: 'The WhatsApp 24-hour service window',
    description:
      'What the WhatsApp 24-hour customer service window is, when you can send free-form messages, when a template is required, and how the window reopens.',
    h1: 'The 24-hour service window',
    lead:
      'The single rule that explains most "why can I not send this" questions on WhatsApp. It is set by the WhatsApp Business Platform, not by TopEdge, and it applies to every provider equally.',
    keywords: [
      'WhatsApp 24 hour window',
      'WhatsApp customer service window',
      'WhatsApp free form message rule',
      'WhatsApp template required',
      'WhatsApp session message',
    ],
    updated: '2026-10-04',
    blocks: [
      {
        kind: 'answer',
        text:
          'When a customer messages your business, a 24-hour service window opens in which you can reply with anything — free text, images, documents. Once 24 hours pass without a new inbound message, the window closes and only pre-approved message templates will send. Any new message from the customer reopens it for another 24 hours.',
      },
      {
        kind: 'diagram',
        name: 'service-window',
        title: 'The decision in one picture',
        caption: 'Every inbound message resets the clock, including a one-word reply.',
      },
      { kind: 'h2', id: 'inside-the-window', text: 'Inside the window' },
      {
        kind: 'p',
        text:
          'You can send whatever the conversation needs: free text, photos of a product, a PDF invoice, a voice note. This is the mode your [Flow Builder](/docs/reference/flow-builder) menus and your agents in [Live Chat](/docs/reference/live-chat) operate in, which is why neither needs a template for ordinary replies.',
      },
      { kind: 'h2', id: 'outside-the-window', text: 'Outside the window' },
      {
        kind: 'p',
        text:
          'Only an approved template will send. This is not a restriction TopEdge can lift — the Cloud API rejects anything else. In the dashboard this shows up as a composer that asks you to pick a template rather than letting you type.',
      },
      {
        kind: 'table',
        columns: ['What you are doing', 'What is required'],
        rows: [
          ['Replying to a customer who just messaged', 'Nothing — free text works.'],
          ['Answering a question from three days ago', 'An approved template, which reopens the conversation.'],
          ['Sending an order confirmation', 'An approved **Utility** template. No consent needed.'],
          ['Sending a promotion', 'An approved **Marketing** template **and** recorded consent.'],
          ['Chasing an abandoned cart', 'An approved template — the customer never messaged you.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Why automation uses templates everywhere',
        body:
          'Journeys message customers who have not just written to you — an order was placed, a cart was left. From WhatsApp’s point of view that is always outside the window, which is why every journey step needs an approved template.',
      },
      { kind: 'h2', id: 'reopening', text: 'Reopening the window' },
      {
        kind: 'p',
        text:
          'A customer replying to anything — including a template you sent — opens a fresh 24-hour window. This is why a template with a quick-reply button converts so well operationally: one tap puts you back into free-form conversation.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Design for the reply, not the send',
        body:
          'A template that invites a response is worth more than one that only informs, because the response is what lets you talk normally again. Add a button or a question wherever it makes sense.',
      },
      { kind: 'h2', id: 'common-confusions', text: 'Common confusions' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'It is 24 hours from **their** last message, not yours',
            definition:
              'Sending a template does not extend the window. Only an inbound message from the customer does.',
          },
          {
            term: 'Opt-out does not close the window',
            definition:
              'A customer who opted out of marketing can still be sent Utility templates and can still be replied to inside the window. Consent and the window are separate rules.',
          },
          {
            term: 'The window is per customer',
            definition: 'It has nothing to do with your business hours or your other conversations.',
          },
          {
            term: 'Agents hit the same rule',
            definition:
              'A human replying three days later needs a template exactly as automation does. It is a platform rule, not a permissions setting.',
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Message templates',
            href: '/docs/platform/message-templates',
            note: 'Categories and approval.',
          },
          {
            label: 'Conversation pricing',
            href: '/docs/platform/conversation-pricing',
            note: 'How conversations are billed.',
          },
          {
            label: 'Live Chat',
            href: '/docs/reference/live-chat',
            note: 'Where the rule shows up daily.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the WhatsApp 24-hour rule?',
        answer:
          'When a customer messages your business, you get a 24-hour window in which you can reply with any kind of message. After 24 hours without a new message from them, only pre-approved templates will send. Their next message reopens the window for another 24 hours.',
      },
      {
        question: 'Does sending a template extend the 24-hour window?',
        answer:
          'No. Only an inbound message from the customer resets the clock. A template you send does not extend it — but if the customer replies to that template, including by tapping a quick-reply button, a fresh 24-hour window opens.',
      },
      {
        question: 'Can I send a photo to a customer after 24 hours?',
        answer:
          'Not as a free-form message. Outside the window only approved templates send, and a template can carry an image header. Once the customer replies you are back inside the window and can send media freely.',
      },
    ],
  },

  {
    slug: 'platform/message-templates',
    group: 'platform',
    navLabel: 'Message templates',
    title: 'WhatsApp message template categories and rules',
    description:
      'How WhatsApp message templates work — Utility, Marketing and Authentication categories, variables, buttons, approval, and the most common rejection reasons.',
    h1: 'Message templates',
    lead:
      'A template is a message Meta has reviewed in advance. Every automated WhatsApp message your store sends is one, which makes template category the most consequential dropdown in the product.',
    keywords: [
      'WhatsApp template categories',
      'utility vs marketing template',
      'WhatsApp template rejected',
      'WhatsApp template variables',
      'Meta template approval rules',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/meta-manager/library', label: 'Open Meta Manager' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Templates come in three categories. **Utility** is for transactional updates about something the customer did and needs no marketing consent. **Marketing** is for anything promotional and requires consent. **Authentication** is for one-time passcodes only. Meta assigns the real category at review, so promotional wording in a Utility template is rejected.',
      },
      {
        kind: 'diagram',
        name: 'template-approval',
        title: 'Draft to live',
        caption: 'A template can also be paused by Meta after approval if quality drops.',
      },
      { kind: 'h2', id: 'categories', text: 'The three categories' },
      {
        kind: 'table',
        columns: ['Category', 'Use it for', 'Consent needed'],
        rows: [
          [
            '**Utility**',
            'Order confirmed, shipped, out for delivery, delivered, COD confirmation, appointment reminders.',
            'No',
          ],
          [
            '**Marketing**',
            'Promotions, launches, restocks, discount offers, anything inviting a purchase.',
            'Yes',
          ],
          ['**Authentication**', 'One-time passcodes only.', 'No'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Meta decides the category, not you',
        body:
          'You pick a category when submitting, but review can reclassify. A "shipping update" that mentions a sale is a Marketing template as far as Meta is concerned, and submitting it as Utility gets it rejected.',
      },
      { kind: 'h3', id: 'rejection-reasons', text: 'Why templates get rejected' },
      {
        kind: 'table',
        columns: ['Reason', 'What to change'],
        rows: [
          [
            'Promotional language in a Utility template',
            'Remove sale, discount, offer, % off, free gift, limited time. Rewrite it as a pure status update.',
          ],
          [
            'Variable at the very start or end of the body',
            'Put words around it. A body that begins with a placeholder reads as spam to review.',
          ],
          ['Too many variables, too little text', 'Add real sentences. A template that is mostly placeholders is rejected.'],
          ['Placeholder sample content', 'Provide realistic sample values, not `xxx` or `test`.'],
          ['Vague or generic body', 'Say what the message is actually about. "Update regarding your request" is not enough.'],
          ['Policy-restricted content', 'Some categories cannot be messaged at all. Check WhatsApp commerce policy.'],
        ],
      },
      { kind: 'h2', id: 'anatomy', text: 'Anatomy of a template' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Name',
            definition: '`lowercase_with_underscores`, no spaces. Internal only — customers never see it.',
          },
          {
            term: 'Header',
            definition:
              'Optional. Text, image, video or document. For cart and order templates, a **live product** image is picked from the cart or order at send time.',
          },
          {
            term: 'Body',
            definition:
              'The message. Variables are written as named fields like `{{first_name}}` and converted to Meta’s numbered placeholders on submission.',
          },
          {
            term: 'Footer',
            definition: 'Optional small print. A good place for an opt-out line on Marketing templates.',
          },
          {
            term: 'Buttons',
            definition:
              'Either quick replies (up to three, the customer taps and you receive the answer) or URL buttons (opens a link). COD confirmation needs quick replies; order tracking needs a URL button.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Every variable must be mapped',
        body:
          'An unmapped variable sends blank or fails. In journeys, each variable is mapped to an order or cart field — check the preview against a real order before you publish.',
      },
      { kind: 'h2', id: 'quality', text: 'Template quality after approval' },
      {
        kind: 'p',
        text:
          'Approval is not permanent. Meta tracks how customers react to each template, and one that collects blocks or reports can be paused or disabled. A journey that worked for weeks can start skipping sends with no change on your side, which the skip reason on the order will say.',
      },
      {
        kind: 'list',
        items: [
          'Send Marketing templates only to contacts who genuinely opted in.',
          'Keep Utility templates strictly transactional — customers do not block order updates.',
          'Watch template quality in Meta Business Manager as part of your routine, not after a problem.',
          'Retire a template that is accumulating complaints rather than waiting for Meta to act.',
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Meta Manager',
            href: '/docs/reference/meta-manager',
            note: 'Creating and submitting templates.',
          },
          {
            label: 'The 24-hour window',
            href: '/docs/platform/whatsapp-service-window',
            note: 'When a template is required.',
          },
          {
            label: 'Template copy guide',
            href: '/blog/meta-whatsapp-cloud-api-shopify-templates',
            note: 'Wording that passes review.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a Utility and a Marketing WhatsApp template?',
        answer:
          'Utility templates are transactional updates about something the customer already did, such as an order confirmation, and need no marketing consent. Marketing templates are promotional and require recorded consent. Meta assigns the final category at review, so promotional wording in a Utility template is rejected.',
      },
      {
        question: 'Why does Meta keep rejecting my WhatsApp template?',
        answer:
          'The most common cause is promotional language in a template submitted as Utility. After that: a variable placed at the very start or end of the body, a body that is mostly placeholders with too little real text, or unrealistic sample values. The rejection reason is shown on the template row.',
      },
      {
        question: 'Can an approved WhatsApp template stop working?',
        answer:
          'Yes. Meta monitors how customers react and can pause or disable a template whose quality drops, which makes previously working journeys start skipping sends. Check the skip reason on an affected order and your template quality in Meta Business Manager.',
      },
    ],
  },

  {
    slug: 'platform/conversation-pricing',
    group: 'platform',
    navLabel: 'Conversation pricing',
    title: 'What WhatsApp automation actually costs',
    description:
      'The two bills behind WhatsApp automation — your TopEdge subscription and Meta conversation fees — plus what drives volume and how to keep messaging costs down.',
    h1: 'What it costs',
    lead:
      'There are two bills, from two companies, and confusing them is the most common billing surprise. Your TopEdge plan is one. Meta’s per-conversation charges are the other, and they go to Meta.',
    keywords: [
      'WhatsApp Business API pricing India',
      'WhatsApp conversation fees',
      'WhatsApp automation cost Shopify',
      'Meta conversation pricing',
      'WhatsApp marketing cost',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/settings?tab=billing', label: 'Open billing' },
    blocks: [
      {
        kind: 'answer',
        text:
          'You pay TopEdge a subscription in INR for the platform, with order and send allowances per billing cycle. Separately, Meta charges per conversation at its own published per-message rates — TopEdge passes those through at 0% markup, so that part of the cost is identical whichever provider you use.',
      },
      { kind: 'h2', id: 'two-bills', text: 'The two bills' },
      {
        kind: 'table',
        columns: ['Charged by', 'For', 'Billed'],
        rows: [
          [
            'TopEdge',
            'The platform — journeys, inbox, CRM, templates, analytics — with order and send caps per cycle.',
            'Your subscription in INR, exclusive of GST, on [the pricing page](/pricing).',
          ],
          [
            'Meta',
            'WhatsApp conversations, at Meta’s published per-message rates by category and country.',
            'Directly by Meta, passed through at 0% markup.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Why we do not quote Meta’s rates here',
        body:
          'Meta changes them, and by country and category. A number written into a documentation page is wrong the moment it moves. Check Meta’s current published rates for your country, and treat the pass-through as exactly that — no markup is added.',
      },
      { kind: 'h2', id: 'what-drives-cost', text: 'What actually drives your Meta bill' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Category',
            definition:
              'Marketing conversations cost materially more than Utility ones. The cheapest way to reduce spend is to move messages that do not need to be promotional into Utility templates.',
          },
          {
            term: 'Conversations, not messages',
            definition:
              'Charges are per conversation window, not per message. Several messages inside one window are cheaper than the same messages spread across days.',
          },
          {
            term: 'Audience size',
            definition:
              'A broadcast to everyone costs the same per head as one to your best customers and converts far worse. Segment before you send.',
          },
          {
            term: 'Ladder length',
            definition:
              'A fourth cart reminder costs the same as the first and recovers a fraction as much. Three is the usual ceiling.',
          },
        ],
      },
      { kind: 'h2', id: 'keeping-it-down', text: 'Keeping the bill sensible' },
      {
        kind: 'list',
        items: [
          '**Start with Utility automations.** Order updates are cheap, expected, and need no consent — and they cut support volume, which is a saving too.',
          '**Segment every broadcast.** [Segments](/docs/guides/segment-your-customers) are the highest-leverage cost control you have.',
          '**Filter low-value carts.** A minimum cart value on the [cart journey](/docs/guides/abandoned-cart-recovery) stops you paying to chase a ₹200 cart.',
          '**Keep reply-cancellation on.** A customer who already answered should not receive the rest of the ladder.',
          '**Use email where it fits.** [Email](/docs/reference/email) has no per-conversation fee and handles rich layouts better.',
          '**Watch delivered, not sent.** Paying to send to invalid numbers is pure waste — clean the list.',
        ],
      },
      { kind: 'h2', id: 'topedge-caps', text: 'Your TopEdge allowances' },
      { kind: 'planLimits' },
      {
        kind: 'p',
        text:
          'Caps reset each billing cycle. You are warned as you approach one and blocked at it, so a cap is never a surprise charge — it is a stop. Details in [limits and quotas](/docs/platform/limits-and-quotas).',
      },
      {
        kind: 'related',
        links: [
          { label: 'Plan limits and quotas', href: '/docs/platform/limits-and-quotas', note: 'What happens at a cap.' },
          { label: 'Settings and billing', href: '/docs/reference/settings-billing', note: 'Plans, cycles and invoices.' },
          {
            label: 'WhatsApp API pricing in India',
            href: '/blog/whatsapp-business-api-pricing-india',
            note: 'How the model works in detail.',
          },
          { label: 'Pricing', href: '/pricing', note: 'Current plan prices.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does TopEdge mark up WhatsApp conversation fees?',
        answer:
          'No. Meta’s conversation charges are passed through at 0% markup, so that portion of your cost is the same whichever provider you use. What differs between providers is the platform subscription and what it includes.',
      },
      {
        question: 'Why am I getting two bills for WhatsApp automation?',
        answer:
          'Because two companies are involved. TopEdge bills you for the platform in INR with order and send allowances. Meta bills for WhatsApp conversations at its own published rates. They are separate and arrive separately.',
      },
      {
        question: 'What is the cheapest way to reduce WhatsApp messaging costs?',
        answer:
          'Move anything that does not have to be promotional into Utility templates, which cost materially less than Marketing conversations, and segment every broadcast instead of sending to your whole list. Both reduce spend without reducing revenue.',
      },
    ],
  },

  {
    slug: 'platform/limits-and-quotas',
    group: 'platform',
    navLabel: 'Limits and quotas',
    title: 'Plan limits, send caps and messaging tiers',
    description:
      'The limits that apply to WhatsApp automation — TopEdge order and send caps per cycle, plan-gated features, Meta messaging tiers and quality rating.',
    h1: 'Limits and quotas',
    lead:
      'Two separate ceilings, from two different places. Your TopEdge plan caps orders and sends per cycle. Meta caps how many customers you may start conversations with in 24 hours. A launch broadcast usually finds both at once.',
    keywords: [
      'WhatsApp messaging limits',
      'WhatsApp messaging tier',
      'WhatsApp quality rating',
      'plan send caps',
      'WhatsApp business verification limit',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/settings?tab=billing', label: 'Check your usage' },
    blocks: [
      {
        kind: 'answer',
        text:
          'TopEdge caps orders ingested and campaign plus email sends per billing cycle, with warnings as you approach and a block at the limit. Meta separately caps how many unique customers you can start conversations with per 24 hours, based on your business verification and quality rating. Hitting either looks like "messages stopped sending".',
      },
      { kind: 'h2', id: 'topedge-limits', text: 'TopEdge plan limits' },
      { kind: 'planLimits' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Orders per cycle',
            definition:
              'Orders ingested from Shopify. Cancelling does not refund the count. A COD order converted to prepaid counts once, not twice.',
          },
          {
            term: 'Campaign and email sends per cycle',
            definition:
              'Broadcast and email volume. Journey sends triggered by Shopify events are metered separately from this broadcast allowance.',
          },
          {
            term: 'Usage alerts',
            definition:
              'A warning as you approach the cap, and a block at it. Alert contacts in Settings decide who hears about it.',
          },
          {
            term: 'Plan-gated features',
            definition:
              'Journey branching and the COD → prepaid node need Growth or above. Published journeys using them keep running after a downgrade — you just cannot create or edit them.',
          },
          {
            term: 'Customer profiles',
            definition: 'Effectively unlimited. Contact count is not what you are billed on.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'A cap is a stop, not an overage charge',
        body:
          'Hitting a cap stops sends rather than silently billing you more. That is safer for your budget, but it does mean a campaign can halt mid-send if you launch a big one late in the cycle.',
      },
      { kind: 'h2', id: 'meta-limits', text: 'Meta messaging limits' },
      {
        kind: 'p',
        text:
          'Independently of your plan, Meta limits how many unique customers you can start a conversation with in a rolling 24 hours. New accounts start low and move up as you send good-quality volume and complete business verification. Replies inside the [24-hour window](/docs/platform/whatsapp-service-window) do not count against it.',
      },
      {
        kind: 'table',
        columns: ['What raises your limit', 'What lowers it'],
        rows: [
          ['Completing Meta business verification', 'Customers blocking or reporting your messages'],
          ['Sustained sending with good quality', 'A sudden spike in volume from a cold list'],
          ['Customers replying to your messages', 'Messaging contacts who never opted in'],
          ['A healthy quality rating over time', 'Promotional content sent as Utility templates'],
        ],
      },
      { kind: 'h3', id: 'quality-rating', text: 'Quality rating' },
      {
        kind: 'p',
        text:
          'Meta assigns your number a quality rating from how customers react. A low rating cuts your messaging limit, and in the worst case restricts the number. It is the asset to protect: a restricted business number is far more expensive than any campaign it carried.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Grow volume, do not jump to it',
        body:
          'If you have not sent a broadcast before, send to your most engaged segment first and let the limit rise. Blasting a full list on day one is the fastest route to a restriction.',
      },
      { kind: 'h2', id: 'runtime-limits', text: 'Automation runtime limits' },
      {
        kind: 'table',
        columns: ['Limit', 'Why it exists'],
        rows: [
          [
            'Two active automations per customer',
            'Stops one customer receiving four unrelated ladders at once. A third enrolment is skipped, not queued.',
          ],
          [
            'Reply cancels remaining steps',
            'On by default. A customer who answered should not keep being chased.',
          ],
          [
            'Revenue attribution window: 7 days',
            'Orders are credited to the last touch within 168 hours.',
          ],
        ],
      },
      { kind: 'h2', id: 'what-it-looks-like', text: 'How hitting a limit shows up' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Messages stopped sending part-way through a campaign',
            fixes: [
              'Check your cycle send allowance in Settings → Billing.',
              'Check your Meta messaging limit in Meta Business Manager.',
              'A campaign row showing a partial send with no failures is almost always a cap.',
            ],
          },
          {
            symptom: 'Orders stopped appearing',
            fixes: [
              'The order cap for the cycle may be reached — check usage in Billing.',
              'Orders keep arriving in Shopify regardless; the automation stops, not your store.',
            ],
          },
          {
            symptom: 'A journey node is locked',
            fixes: [
              'Branching and COD → prepaid need Growth or above.',
              'Already-published journeys keep running; you cannot edit them until you upgrade.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Conversation pricing',
            href: '/docs/platform/conversation-pricing',
            note: 'The two bills.',
          },
          {
            label: 'Settings and billing',
            href: '/docs/reference/settings-billing',
            note: 'Checking your usage.',
          },
          {
            label: 'Send a broadcast',
            href: '/docs/guides/whatsapp-broadcast',
            note: 'Launching without a restriction.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How many WhatsApp messages can I send per day?',
        answer:
          'Two limits apply. Meta caps how many unique customers you can start conversations with in a rolling 24 hours, based on your verification status and quality rating. Your TopEdge plan separately caps campaign and email sends per billing cycle.',
      },
      {
        question: 'What happens when I hit my plan limit?',
        answer:
          'Sends stop rather than billing you an overage. You are warned as you approach the cap and blocked at it, with the warning going to your alert contacts in Settings. Caps reset at the start of each billing cycle.',
      },
      {
        question: 'How do I increase my WhatsApp messaging limit?',
        answer:
          'Complete Meta business verification, send sustained good-quality volume, and keep customers replying rather than blocking. Limits rise over time on their own; a sudden spike from a cold list does the opposite and can restrict the number.',
      },
    ],
  },
];
