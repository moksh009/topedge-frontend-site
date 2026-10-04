import type { DocArticle } from '../types';

/** Guides — one task per page, in the order merchants usually switch them on. */
export const GUIDE_ARTICLES: DocArticle[] = [
  {
    slug: 'guides/abandoned-cart-recovery',
    group: 'guides',
    navLabel: 'Abandoned cart recovery',
    title: 'Set up WhatsApp abandoned cart recovery',
    description:
      'Capture the phone number at checkout, publish a three-message cart recovery journey on WhatsApp, and read recovered revenue instead of vanity send counts.',
    h1: 'Abandoned cart recovery on WhatsApp',
    lead:
      'Cart recovery has two halves that fail independently: capturing a phone number when the checkout is abandoned, and sending an approved template afterwards. Get the capture working first — a perfect journey sends nothing to a cart with no phone number.',
    keywords: [
      'WhatsApp abandoned cart recovery Shopify',
      'Shopify cart recovery setup',
      'abandoned checkout recovery WhatsApp',
      'cart recovery journey',
      'recover abandoned carts Shopify India',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/journeys', label: 'Open Journeys' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Install the three storefront tracking layers so abandoned checkouts arrive with a phone number, get three cart-recovery templates approved by Meta, then publish a journey on the **cart abandoned** trigger with waits of roughly 25 minutes, 6 hours and 24 hours. Recovered revenue is attributed to the journey on last touch for seven days.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify and WhatsApp both connected — [Connect Shopify](/docs/connect-shopify), [Connect WhatsApp](/docs/connect-whatsapp).',
          'Storefront tracking installed and green — [Store growth](/docs/reference/store-growth).',
          'Three cart-recovery templates Approved in [Meta Manager](/docs/reference/meta-manager).',
          'A test product you can add to cart and abandon.',
        ],
      },
      { kind: 'h2', id: 'how-it-works', text: 'How recovery actually works' },
      {
        kind: 'p',
        text:
          'A customer reaching checkout and leaving creates an abandoned checkout in Shopify. TopEdge records that as a cart lead. A scheduler then checks for live cart journeys and enrolls the lead, and each wait in the journey becomes a scheduled send. If the customer orders at any point, remaining steps cancel and the cart is marked recovered.',
      },
      {
        kind: 'diagram',
        name: 'cart-recovery-ladder',
        title: 'The default three-message ladder',
        caption:
          'The first reminder is deliberately not instant — a customer who stepped away for two minutes does not need chasing.',
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'No phone number means no recovery',
        body:
          'Adding to cart is not enough. The customer has to reach a step where a phone number or email is captured. If the phone column on a cart row is blank, the problem is tracking, not the journey.',
      },
      { kind: 'h2', id: 'capture', text: 'Step 1 — get the phone number' },
      {
        kind: 'diagram',
        name: 'tracking-layers',
        title: 'All three layers have to be healthy',
        caption:
          'The checkout extension is the one that captures the phone number, so a green theme embed alone will not produce recoverable carts.',
      },
      {
        kind: 'steps',
        howToName: 'Capture abandoned checkout phone numbers on Shopify',
        totalTimeMinutes: 15,
        steps: [
          {
            title: 'Open website tracking',
            body: 'Store growth → Website tracking. You should see a health row per layer.',
          },
          {
            title: 'Install each layer',
            body:
              'Use the one-click install for the theme app embed, the web pixel extension and the checkout extension. Each has to report green.',
          },
          {
            title: 'Enable the app embed on your live theme',
            body:
              'Shopify admin → Online Store → Themes → Customize on the **live** theme → App embeds → enable the TopEdge embeds, then Save.',
            note: 'A preview theme does not count. This is the single most common reason tracking looks installed but captures nothing.',
          },
          {
            title: 'Run a test abandonment',
            body:
              'In an incognito window, add to cart, reach checkout, enter a real phone number, then close the tab without paying.',
          },
          {
            title: 'Confirm the cart row',
            body:
              'Store growth → Abandoned carts. Within a few minutes a row should appear **with the phone number populated**.',
          },
        ],
      },
      { kind: 'h3', id: 'third-party-checkout', text: 'If you use a third-party checkout' },
      {
        kind: 'p',
        text:
          'One-page and COD-optimised checkouts replace Shopify’s native checkout, so the checkout extension never runs. Website tracking has a third-party checkout section — copy the webhook URL into your provider’s dashboard, then run the same test abandonment through their flow and confirm the phone reaches TopEdge.',
      },
      { kind: 'h3', id: 'custom-phone-inputs', text: 'If you have a custom phone or OTP page' },
      {
        kind: 'p',
        text:
          'A hand-built login or OTP step is not detected automatically. Mark the phone input so TopEdge can read it:',
      },
      {
        kind: 'code',
        language: 'html',
        code: '<input type="tel" autocomplete="tel" data-topedge-phone="true" />',
        caption:
          'Either `data-topedge-phone="true"` or `autocomplete="tel"` is enough. Without one of them a custom OTP page captures nothing.',
      },
      { kind: 'h2', id: 'templates', text: 'Step 2 — get three templates approved' },
      {
        kind: 'p',
        text:
          'Meta Manager ships a cart recovery blueprint: three WhatsApp templates with a live product image header, body variables already mapped, and a button back to the checkout. Create all three from the blueprint and submit them — a cart journey should not go live with only the first one approved.',
      },
      {
        kind: 'table',
        caption: 'What each message in the ladder is for',
        columns: ['Message', 'Timing', 'Job'],
        rows: [
          [
            'Reminder 1',
            '~25 minutes',
            'Show what they left. Product image, item name, one link back to checkout. No discount.',
          ],
          [
            'Reminder 2',
            '~6 hours',
            'Handle the objection — shipping time, returns, payment options, COD availability.',
          ],
          [
            'Reminder 3',
            '~24 hours',
            'Last nudge. This is where a discount earns its place, if you use one at all.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Discount on message one is money left on the table',
        body:
          'Most recovered carts come back without an incentive. Leading with a code trains customers to abandon on purpose, and it discounts the customers who were going to buy anyway.',
      },
      { kind: 'h2', id: 'journey', text: 'Step 3 — publish the cart journey' },
      {
        kind: 'steps',
        steps: [
          {
            title: 'Open or create the cart journey',
            body:
              'Journeys → the cart recovery playbook, or a new journey with the **cart abandoned** trigger.',
          },
          {
            title: 'Set the capture delay',
            body:
              'The trigger has a cart delay — how long after abandonment the customer is enrolled. 25 minutes is the default and a sensible starting point.',
          },
          {
            title: 'Map each WhatsApp step to an approved template',
            body:
              'Each cart-recovery node takes one approved template. The product image and checkout link fill from the live cart at send time.',
          },
          {
            title: 'Set the waits between steps',
            body:
              'Wait nodes do not send anything themselves — they add delay to the next step that does. Chain them as 6 hours and then 24 hours.',
          },
          {
            title: 'Optionally also send email',
            body:
              'Cart-recovery nodes can send a matching email alongside WhatsApp. Needs Gmail connected — see [Email](/docs/reference/email).',
          },
          {
            title: 'Add trigger filters if you need them',
            body:
              'You can restrict by cart value or specific products. All rules combine with AND, so two narrow rules can exclude every cart.',
          },
          {
            title: 'Publish',
            body:
              'Publish freezes the graph and the trigger. A saved draft sends nothing, and editing a published journey changes nothing until you publish again.',
          },
        ],
      },
      {
        kind: 'verify',
        items: [
          'A test abandonment creates a cart row **with a phone number**.',
          'The journey shows **Published** with the cart abandoned trigger.',
          'All three templates read **Approved**.',
          'Reminder 1 arrives after the capture delay — not instantly.',
          'Completing the checkout marks the cart recovered and stops remaining messages.',
        ],
      },
      { kind: 'h2', id: 'revenue', text: 'How recovered revenue is counted' },
      {
        kind: 'p',
        text:
          'Attribution is **last touch within seven days**. If a cart message was the most recent TopEdge touch before the order, that journey gets the revenue. The customer does not have to click your link — someone who gets the reminder and then goes to your site directly still counts, which is the honest way to measure it.',
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Delays need the background worker',
        body:
          'Scheduled steps are dispatched by a background process, not by the web app. On a local development setup running only the API, timed cart steps will never fire. On production they run on a short cycle.',
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If recovery is not working' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Abandoned carts list is empty',
            fixes: [
              'Confirm every layer on Store growth → Website tracking is green.',
              'Enable the TopEdge app embed on the **live** theme, not a preview.',
              'Test in incognito with ad blockers off — blockers stop the pixel.',
              'On a third-party checkout, configure the partner webhook and retest through their flow.',
            ],
          },
          {
            symptom: 'Cart rows exist but the phone column is blank',
            fixes: [
              'The customer left before the phone step. For browse abandonment this is expected.',
              'On a custom phone or OTP page, add `data-topedge-phone="true"` to the input.',
              'Check your checkout is not suppressing the phone field for logged-in customers.',
            ],
          },
          {
            symptom: 'Carts have phone numbers but no message is sent',
            fixes: [
              'The journey is in Draft. Publish it.',
              'A template is still pending. All three should read Approved.',
              'Trigger filters exclude the cart — a minimum cart value rule is the usual culprit.',
              'You have reached your plan’s send cap for the cycle — see [limits](/docs/platform/limits-and-quotas).',
            ],
          },
          {
            symptom: 'Recovered revenue stays at zero',
            fixes: [
              'Nobody has completed a checkout after receiving a message yet — attribution needs a real order.',
              'Confirm the test order used the same phone number as the cart.',
              'Orders placed more than seven days after the last touch fall outside the attribution window.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Journeys reference',
            href: '/docs/reference/journeys',
            note: 'Every node and trigger in detail.',
          },
          {
            label: 'Store growth',
            href: '/docs/reference/store-growth',
            note: 'Tracking layers and cart columns.',
          },
          {
            label: 'Cart recovery feature page',
            href: '/features/journeys',
            note: 'What it looks like in the product.',
          },
          {
            label: 'Cart recovery playbook',
            href: '/blog/whatsapp-abandoned-cart-recovery-shopify',
            note: 'Timing and copy, with benchmarks.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How soon should the first abandoned cart message go out?',
        answer:
          'Around 25 to 30 minutes after abandonment. Sending instantly annoys customers who simply switched tabs, and waiting several hours loses the people who were still deciding. The default capture delay is 25 minutes and most stores never need to change it.',
      },
      {
        question: 'Why is my abandoned cart missing a phone number?',
        answer:
          'Because the customer left before reaching a step that collects one, or because the checkout extension is not capturing. Adding to cart alone never produces a phone number. Check that all three tracking layers are green and that the TopEdge app embed is enabled on your live theme.',
      },
      {
        question: 'How many cart recovery messages should I send?',
        answer:
          'Three is the standard ladder: a reminder, an objection-handling message, and a final nudge. More than three starts costing you more in conversation fees and goodwill than it recovers, and it raises your chance of being blocked or reported.',
      },
      {
        question: 'Does cart recovery need marketing opt-in?',
        answer:
          'Cart recovery templates are reviewed by Meta like any other template, and promotional framing belongs in the Marketing category, which does require consent. Keep the ladder transactional in tone and treat consent as a requirement whenever a message carries an offer.',
      },
    ],
  },

  {
    slug: 'guides/cod-confirmation',
    group: 'guides',
    navLabel: 'COD confirmation',
    title: 'Confirm COD orders on WhatsApp to cut RTO',
    description:
      'Confirm cash-on-delivery orders over WhatsApp with button replies, cancel the ones nobody confirms, and offer a prepaid switch to reduce return-to-origin losses.',
    h1: 'COD confirmation and the prepaid switch',
    lead:
      'Return-to-origin is the most expensive problem in Indian D2C, and most of it is decided before dispatch. A confirmation message with two buttons, sent minutes after the order, separates the customers who meant it from the ones who did not.',
    keywords: [
      'COD confirmation WhatsApp',
      'reduce RTO Shopify',
      'cash on delivery confirmation automation',
      'COD to prepaid WhatsApp',
      'RTO reduction India D2C',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/journeys', label: 'Open Journeys' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Publish a journey on the **order placed** trigger, filtered to COD orders, that sends an approved template with Confirm and Cancel buttons within minutes of the order. Confirmed orders go to dispatch, unconfirmed ones get a follow-up, and on Growth plans and above you can offer a prepaid payment link that replaces the COD order with a paid one.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify and WhatsApp connected, with orders syncing.',
          'An approved template with quick-reply buttons — see [Message templates](/docs/platform/message-templates).',
          'For the prepaid switch: a plan that includes COD → prepaid, and Shopify permission to create draft orders.',
          'A COD order you can place as a test.',
        ],
      },
      { kind: 'h2', id: 'why-it-works', text: 'Why confirmation works' },
      {
        kind: 'p',
        text:
          'A COD order costs nothing to place, so it attracts impulse, duplicate and mistaken orders alongside real ones. You only find out at the door, after paying for forward and reverse shipping. Asking for one tap of confirmation moves that discovery to before dispatch, where cancelling is almost free.',
      },
      {
        kind: 'table',
        columns: ['Customer response', 'What you should do'],
        rows: [
          ['Taps **Confirm**', 'Dispatch normally. Tag the order as confirmed so your warehouse can see it.'],
          ['Taps **Cancel**', 'Cancel in Shopify before dispatch. You just saved both legs of shipping.'],
          [
            'Replies with a question',
            'The thread is in [Live Chat](/docs/reference/live-chat) with the order beside it — answer and confirm manually.',
          ],
          [
            'Never responds',
            'Send one follow-up. After that, decide by your own risk rules: hold, call, or dispatch anyway.',
          ],
        ],
      },
      { kind: 'h2', id: 'build-it', text: 'Build the confirmation journey' },
      {
        kind: 'steps',
        howToName: 'Set up WhatsApp COD order confirmation on Shopify',
        totalTimeMinutes: 25,
        steps: [
          {
            title: 'Create a journey on order placed',
            body:
              'Journeys → New, trigger **Order placed**. Order confirmation is the order-placed trigger — there is no separate "order confirmed" event.',
            note: 'This is the single most common point of confusion when building this journey.',
          },
          {
            title: 'Filter to COD only',
            body:
              'In the trigger setup, add a **payment method** rule set to COD. Without it, prepaid customers get asked to confirm an order they already paid for.',
          },
          {
            title: 'Add a short wait',
            body:
              'Five to fifteen minutes. Long enough that the customer has left your site, short enough to be clearly about the order they just placed.',
          },
          {
            title: 'Send the confirmation template',
            body:
              'Map an approved template with Confirm and Cancel quick replies. TopEdge sets the step to wait for a button tap rather than free text.',
          },
          {
            title: 'Branch on the answer (Growth and above)',
            body:
              'A conditional split routes confirmed and cancelled down different paths — tag and dispatch on one side, cancel and notify on the other.',
            note: 'On Launch, skip the branch and handle non-responders from the Orders screen instead.',
          },
          {
            title: 'Add a follow-up for silence',
            body:
              'A second wait of a few hours followed by one more message. Do not build an endless chase — two asks is the limit before it reads as harassment.',
          },
          {
            title: 'Publish and place a test COD order',
            body:
              'Use your own phone. Tap Confirm and check the order records the response, then place another and tap Cancel.',
          },
        ],
      },
      { kind: 'h2', id: 'prepaid-switch', text: 'Offering the prepaid switch' },
      {
        kind: 'p',
        text:
          'The strongest version of this flow does not just confirm — it offers to convert. A small incentive to pay now turns your riskiest orders into your safest ones, and prepaid orders essentially cannot be returned to origin.',
      },
      {
        kind: 'diagram',
        name: 'cod-prepaid-switch',
        title: 'What happens when a customer chooses to prepay',
        caption:
          'Shopify voids the COD order and creates a paid one, so expect two order records for one purchase.',
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Two order records, one sale',
        body:
          'A converted order appears twice in Shopify: the voided COD order and the new paid one. TopEdge recognises the replacement, so it is not counted twice against your order allowance, in revenue attribution, or in your COD share.',
      },
      {
        kind: 'table',
        columns: ['Decision', 'Guidance'],
        rows: [
          [
            'How much to offer',
            'Enough to beat the customer’s inertia, well below your RTO cost per order. Free shipping or a small flat discount is typical.',
          ],
          [
            'When to offer it',
            'In the confirmation message itself, as the alternative to confirming COD. A separate later message converts far less.',
          ],
          [
            'What happens to the COD order',
            'It is voided when the payment succeeds. The new paid order carries a tag identifying it as a conversion.',
          ],
          [
            'If they ignore the link',
            'Nothing breaks. The original COD order stands and your normal flow continues.',
          ],
        ],
      },
      {
        kind: 'verify',
        items: [
          'A test COD order produces a confirmation message with working buttons.',
          'A prepaid test order does **not** receive the confirmation.',
          'Tapping Confirm is recorded against the order.',
          'Tapping Cancel routes down the cancel path, if you built one.',
          'A prepaid payment link opens a valid Shopify checkout for the right amount.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If confirmation is not working' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Prepaid customers are getting the COD confirmation',
            fixes: [
              'Add the **payment method = COD** filter to the trigger. Without it, order placed matches every order.',
              'Republish after editing the trigger — a live journey keeps the trigger it was published with.',
            ],
          },
          {
            symptom: 'Buttons appear but taps do nothing',
            fixes: [
              'The template must use quick-reply buttons, not a URL button.',
              'Confirm the **messages** webhook field is subscribed, which is how button taps reach TopEdge.',
              'Check nobody has taken over the thread in Live Chat — that pauses automation.',
            ],
          },
          {
            symptom: 'The COD → prepaid node is locked',
            fixes: [
              'It is a Growth-and-above feature. See [plan limits](/docs/platform/limits-and-quotas).',
              'Already-published journeys keep running after a downgrade, but you cannot edit or create them.',
            ],
          },
          {
            symptom: 'A converted order looks like two orders',
            fixes: [
              'That is Shopify’s behaviour — the COD order is voided and a paid one created.',
              'TopEdge skips the replacement for order counting, revenue and re-enrolment, so you are not billed or messaged twice.',
              'If a replacement did get a second message, the conversion tag was stripped from the order in Shopify.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Order status updates',
            href: '/docs/guides/order-status-updates',
            note: 'What to send after confirmation.',
          },
          {
            label: 'Journeys reference',
            href: '/docs/reference/journeys',
            note: 'Branches, filters and node types.',
          },
          {
            label: 'RTO reduction playbook',
            href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation',
            note: 'Copy, timing and what to measure.',
          },
          {
            label: 'Delivery and RTO analytics',
            href: '/docs/reference/analytics',
            note: 'Track whether it is working.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does WhatsApp COD confirmation actually reduce RTO?',
        answer:
          'It reduces the share of RTO caused by unintended and duplicate orders, which is the largest removable chunk. It cannot fix RTO caused by delivery failures, wrong addresses or buyer remorse after dispatch. Measure your own before-and-after rather than trusting a headline number.',
      },
      {
        question: 'When should the COD confirmation message be sent?',
        answer:
          'Five to fifteen minutes after the order. The customer still remembers placing it, and you are well ahead of dispatch. Sending instantly feels automated and jumpy; waiting hours means the order may already be packed.',
      },
      {
        question: 'What should I do when a customer never confirms?',
        answer:
          'Send exactly one follow-up, then apply your own rule. Many stores hold high-value unconfirmed COD orders for a phone call and dispatch low-value ones anyway, because the shipping cost of being wrong is smaller than the lost sale.',
      },
      {
        question: 'Do I need a separate template for COD confirmation?',
        answer:
          'Yes. It needs quick-reply buttons so the customer can answer with one tap, and the body has to read as a transactional order confirmation to pass review as a Utility template. Your order confirmation template will not have the buttons.',
      },
    ],
  },

  {
    slug: 'guides/order-status-updates',
    group: 'guides',
    navLabel: 'Order status updates',
    title: 'Send Shopify order updates on WhatsApp',
    description:
      'Automate order confirmed, shipped, out for delivery and delivered messages on WhatsApp, and understand which Shopify event maps to which journey trigger.',
    h1: 'Order status updates',
    lead:
      'The safest automation to start with: transactional, expected by the customer, no marketing consent needed, and it removes most "where is my order" messages before they are sent.',
    keywords: [
      'Shopify order status WhatsApp',
      'WhatsApp order confirmation automation',
      'shipped delivered WhatsApp notification',
      'order tracking WhatsApp Shopify',
      'utility template order update',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/journeys', label: 'Open Journeys' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Publish one journey per lifecycle stage — order placed, order shipped, order delivered — each sending an approved Utility template with an image header and a tracking button. Shopify order and fulfilment webhooks drive the triggers, and a status change you make in the dashboard enrols the journey directly without waiting for Shopify.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify connected with fulfilment permissions approved — [Connect Shopify](/docs/connect-shopify#permissions).',
          'WhatsApp connected and sending.',
          'Approved order-status templates, one per stage.',
        ],
      },
      { kind: 'h2', id: 'triggers', text: 'Which event maps to which trigger' },
      {
        kind: 'p',
        text:
          'Getting this mapping right saves hours. There is **no "order confirmed" trigger** — an order being placed *is* the confirmation. Shipping and delivery come from fulfilment events, which is why they need fulfilment permissions on the Shopify connection.',
      },
      {
        kind: 'table',
        caption: 'Shopify event to journey trigger',
        columns: ['What happens', 'Trigger that fires'],
        rows: [
          ['Order is placed', '**Order placed** — use this for order confirmation'],
          ['Order is marked fulfilled', '**Order shipped**'],
          [
            'A fulfilment updates with a delivered shipment status',
            '**Order delivered**',
          ],
          [
            'A fulfilment updates with any other status',
            '**Order shipped**',
          ],
          [
            'You change the status in the TopEdge Orders screen',
            'Shipped or out for delivery → **order shipped**; delivered → **order delivered**',
          ],
          ['Order is cancelled', 'Nothing sends — existing enrollments for that order are cancelled'],
        ],
      },
      {
        kind: 'diagram',
        name: 'order-status-triggers',
        title: 'Events that start an order journey',
        caption:
          'A cancelled order cancels pending steps, so a customer never gets a shipping message for an order you already cancelled.',
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Dropped webhooks are retried',
        body:
          'Webhooks occasionally fail to arrive. A reconcile job re-reads your orders on a schedule and fires anything that was missed, with a guard that stops a customer getting the same update twice.',
      },
      { kind: 'h2', id: 'templates', text: 'The templates you need' },
      {
        kind: 'p',
        text:
          'Meta Manager has an order lifecycle blueprint that prefills each stage: an image header, body variables mapped to order fields, and a **View order** or **Track order** URL button. Create one template per stage from it. What the dashboard previews is exactly what the customer receives.',
      },
      {
        kind: 'table',
        columns: ['Stage', 'What the message should carry'],
        rows: [
          [
            'Confirmed',
            'Order number, items, total, payment method, and when to expect dispatch.',
          ],
          ['Shipped', 'Courier name, tracking number and a working tracking link.'],
          ['Out for delivery', 'That it arrives today, and for COD the exact amount to keep ready.'],
          ['Delivered', 'Confirmation, plus one ask — a review, or a reorder link.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Keep order templates strictly transactional',
        body:
          'One promotional word — sale, offer, discount, free gift — gets a Utility template rejected. If you genuinely want to promote something, put it in a separate Marketing template sent to consented contacts.',
      },
      { kind: 'h2', id: 'build-it', text: 'Build the journeys' },
      {
        kind: 'steps',
        howToName: 'Automate Shopify order status updates on WhatsApp',
        totalTimeMinutes: 20,
        steps: [
          {
            title: 'Start from the playbooks',
            body:
              'Journeys ships order-placed, order-shipped and order-delivered playbooks with the right trigger and node already in place.',
          },
          {
            title: 'Map the approved template on each',
            body:
              'Open each journey, select the order-status node, and pick the approved template for that stage.',
          },
          {
            title: 'Check the variable mapping',
            body:
              'Each variable should point at an order field — order number, customer name, tracking URL. Unmapped variables send blanks.',
          },
          {
            title: 'Decide on a delay',
            body:
              'Confirmation is best immediate. A delivered message is better after a few hours, so it does not arrive while the customer is still at the door.',
          },
          {
            title: 'Publish each journey',
            body: 'Publish one at a time and test it before moving to the next.',
          },
          {
            title: 'Test the full lifecycle',
            body:
              'Place a test order, then move it through shipped and delivered from the Orders screen. Each stage should produce exactly one message.',
          },
        ],
      },
      {
        kind: 'verify',
        items: [
          'A test order produces exactly one confirmation message.',
          'Marking it shipped produces one shipping message with a working tracking link.',
          'Marking it delivered produces one delivery message.',
          'No stage sends twice when Shopify later echoes the same change.',
          'Cancelling an order stops any pending status messages.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If order updates are not sending' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Order confirmations do not send',
            fixes: [
              'The journey uses the **order placed** trigger — there is no order confirmed trigger.',
              'The journey is Published, not Draft.',
              'The template shows Approved, and the order has a phone number in international format.',
              'Read the skip reason on the order detail page — it names the exact cause.',
            ],
          },
          {
            symptom: 'Shipped and delivered never fire, but confirmations work',
            fixes: [
              'Fulfilment permissions are missing. Settings → Shopify → **Reconnect** and approve everything.',
              'Confirm the order is actually being fulfilled in Shopify, not just tagged.',
              'If your courier updates by a 3PL feed rather than Shopify, check that integration is sending shipment status.',
            ],
          },
          {
            symptom: 'A customer got the same update twice',
            fixes: [
              'Check you do not have two published journeys on the same trigger.',
              'A manual status change plus a Shopify echo is de-duplicated per order and trigger, so duplicates almost always mean duplicate journeys.',
            ],
          },
          {
            symptom: 'The message arrives with blank values',
            fixes: [
              'Variables are unmapped on the node — open it and map each one to an order field.',
              'The field is genuinely empty on that order, such as a tracking number before dispatch.',
              'Preview with a real order rather than sample data before publishing.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Orders reference',
            href: '/docs/reference/orders',
            note: 'Status changes and per-order activity.',
          },
          {
            label: 'Message templates',
            href: '/docs/platform/message-templates',
            note: 'Why Utility and Marketing differ.',
          },
          {
            label: 'COD confirmation',
            href: '/docs/guides/cod-confirmation',
            note: 'The step before dispatch.',
          },
          {
            label: 'Template guide',
            href: '/blog/meta-whatsapp-cloud-api-shopify-templates',
            note: 'Writing templates that pass review.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Which trigger should I use for a Shopify order confirmation?',
        answer:
          'The order placed trigger. An order being placed is the confirmation event, and there is no separate order confirmed trigger. Expecting one is the most common reason a confirmation journey is built but never fires.',
      },
      {
        question: 'Do order status messages need marketing opt-in?',
        answer:
          'No. They are transactional and send as Utility templates, which do not require marketing consent. That is exactly why they are the safest automation to start with — but it also means they must contain no promotional language at all.',
      },
      {
        question: 'Why are my shipped and delivered messages not sending?',
        answer:
          'Almost always missing fulfilment permissions on the Shopify connection. Order confirmations only need order access, so confirmations keep working while shipping messages silently do nothing. Reconnect Shopify and approve the full permission list.',
      },
    ],
  },

  {
    slug: 'guides/build-your-first-flow',
    group: 'guides',
    navLabel: 'Build your first flow',
    title: 'Build a WhatsApp welcome menu with Flow Builder',
    description:
      'Build and publish a WhatsApp bot menu that answers order, shipping and returns questions, and hands over to a human agent when it cannot help.',
    h1: 'Build your first flow',
    lead:
      'Journeys message customers when something happens in Shopify. Flows decide what happens when a customer messages **you**. Without a published flow, every inbound message waits for a human.',
    keywords: [
      'WhatsApp flow builder',
      'WhatsApp bot menu Shopify',
      'WhatsApp chatbot setup',
      'WhatsApp automation inbound replies',
      'WhatsApp interactive buttons list',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/flow-builder', label: 'Open Flow Builder' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Open Flow Builder, start from the seeded welcome flow, give it a greeting with three or four buttons for your most common questions, add a live-chat handover path, test it in the simulator, then publish. Publishing replaces the live graph for the next inbound message — saving a draft changes nothing.',
      },
      {
        kind: 'diagram',
        name: 'flow-vs-journey',
        title: 'Flow Builder and Journeys do different jobs',
        caption:
          'If you are trying to send a message because of a Shopify event, you want [Journeys](/docs/reference/journeys) instead.',
      },
      {
        kind: 'prereqs',
        items: [
          'WhatsApp connected with the **messages** webhook subscribed.',
          'A list of the four or five questions customers actually ask you most.',
          'A second phone to test from.',
        ],
      },
      { kind: 'h2', id: 'design-first', text: 'Decide the menu before you build it' },
      {
        kind: 'p',
        text:
          'The hard part is not the canvas, it is choosing what to offer. Open your inbox, read the last fifty inbound messages, and count. Build for the top four. Everything else should fall through to a human rather than into a dead end.',
      },
      {
        kind: 'table',
        columns: ['Common ask', 'What the flow should do'],
        rows: [
          ['Where is my order?', 'Look up the latest order and reply with its status and tracking link.'],
          ['What is your return policy?', 'Answer directly, in two sentences, with a link.'],
          ['Is this in stock / what size?', 'Answer if you can, otherwise hand to an agent.'],
          ['I want to talk to someone', 'Hand over to Live Chat immediately — do not make them work for it.'],
        ],
      },
      { kind: 'h2', id: 'build-it', text: 'Build it on the canvas' },
      {
        kind: 'steps',
        howToName: 'Build and publish a WhatsApp welcome flow',
        totalTimeMinutes: 30,
        steps: [
          {
            title: 'Open the welcome flow',
            body:
              'Flow Builder → open the seeded welcome flow, or duplicate it so you always have a working version to fall back to.',
          },
          {
            title: 'Write the greeting',
            body:
              'One line of who you are, one line of what they can do. Keep it under two lines — WhatsApp truncates long messages behind a Read more.',
          },
          {
            title: 'Add a buttons node',
            body:
              'Three buttons maximum per node. If you need more options, use a list node instead, which supports up to ten rows.',
          },
          {
            title: 'Connect each option to a reply',
            body:
              'Drag from each output handle to the node that answers it. Every handle must lead somewhere, or publish will block.',
          },
          {
            title: 'Add a live-chat handover',
            body:
              'A live-chat node pauses the bot and puts the thread in the inbox. Always give customers this exit.',
          },
          {
            title: 'Test in the simulator',
            body:
              'The toolbar simulator walks buttons and lists without messaging a real customer. Follow every branch, including the ones you expect nobody to take.',
          },
          {
            title: 'Fix the publish errors',
            body:
              'The publish check lists disconnected handles and template nodes with no approved template selected. Each error links to the node.',
          },
          {
            title: 'Publish, then message yourself',
            body:
              'Publish replaces the live graph for the next inbound message. Message your business number from a personal phone and walk the menu for real.',
          },
        ],
      },
      { kind: 'h2', id: 'node-types', text: 'The nodes you will actually use' },
      {
        kind: 'table',
        columns: ['Node', 'What it does'],
        rows: [
          ['Message', 'Plain text or media. The building block.'],
          ['Buttons', 'Up to three quick replies. Best for a short menu.'],
          ['List', 'Up to ten rows behind a single tap. Best for categories.'],
          ['Capture', 'Stores the customer’s reply in a variable for later nodes.'],
          ['Condition', 'Branches on a keyword, a tag or a stored field.'],
          ['Template', 'Sends an approved template — needed outside the 24-hour window.'],
          ['Live chat', 'Hands over to a human and pauses the bot until released.'],
          ['Shopify', 'Looks up an order or a product mid-conversation.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Inside the window, free text is fine',
        body:
          'A customer messaging you opens a 24-hour window in which the flow can reply with anything. Outside it, only approved templates send — see [the service window](/docs/platform/whatsapp-service-window).',
      },
      {
        kind: 'verify',
        items: [
          'The simulator completes every branch without an error.',
          'Publish succeeds with zero validation errors.',
          'A real inbound message from your own phone returns the menu.',
          'Every button leads to a real answer, not a dead end.',
          'The handover option puts the thread in Live Chat and stops the bot.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If the bot is silent' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Customer messages but gets no reply',
            fixes: [
              'The flow is saved but not **Published**. Publishing is a separate action.',
              'The **messages** webhook field is not subscribed — see [Connect WhatsApp](/docs/connect-whatsapp#troubleshooting).',
              'An agent has taken control of the thread in Live Chat. Release it back to the bot.',
              'Test your trigger keywords in the simulator first.',
            ],
          },
          {
            symptom: 'Publish is blocked on disconnected nodes',
            fixes: [
              'Every output handle needs an edge to a downstream node or an explicit end.',
              'Template nodes need an Approved template selected in their properties.',
              'The publish panel links to each offending node — work the list top to bottom.',
            ],
          },
          {
            symptom: 'The bot replies with the old menu after you edited it',
            fixes: [
              'Publish again. The live graph is a frozen snapshot taken at publish time.',
              'A conversation already in progress may finish on the previous graph.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Flow Builder reference',
            href: '/docs/reference/flow-builder',
            note: 'Every node and setting.',
          },
          {
            label: 'Train your AI brain',
            href: '/docs/guides/train-your-ai-brain',
            note: 'Answer questions a menu cannot.',
          },
          {
            label: 'Shared inbox and handover',
            href: '/docs/guides/shared-inbox-handover',
            note: 'What happens after handover.',
          },
          {
            label: 'Flow Builder feature page',
            href: '/features/flow-builder',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between Flow Builder and Journeys?',
        answer:
          'Flow Builder handles inbound conversations — what the bot says when a customer messages you, including menus, FAQ answers and handover to an agent. Journeys handle outbound automation triggered by Shopify events such as an order being placed or a cart being abandoned.',
      },
      {
        question: 'How many buttons can a WhatsApp message have?',
        answer:
          'Three quick-reply buttons per message. If you need more options, use a list node instead, which presents up to ten rows behind a single tap and reads better than two stacked button messages.',
      },
      {
        question: 'Why does my flow still show the old menu after I edited it?',
        answer:
          'Because the live bot runs a snapshot frozen at publish time. Saving the canvas updates the draft only. Publish again to replace the live graph, which takes effect from the next inbound message.',
      },
    ],
  },

  {
    slug: 'guides/whatsapp-broadcast',
    group: 'guides',
    navLabel: 'Send a broadcast',
    title: 'Send a WhatsApp broadcast that is Meta-safe',
    description:
      'Send a promotional WhatsApp broadcast to a consented segment: pick the audience, use an approved Marketing template, pass preflight, and read the results.',
    h1: 'Send a WhatsApp broadcast',
    lead:
      'Broadcasts are the easiest thing in the product to get wrong, because the damage is not immediate. A bad send does not bounce — it quietly lowers your quality rating and your messaging limit.',
    keywords: [
      'WhatsApp broadcast Shopify',
      'WhatsApp marketing campaign India',
      'WhatsApp bulk message opt-in',
      'marketing template broadcast',
      'WhatsApp quality rating',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/marketing-hub/campaigns', label: 'Open Campaigns' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Build a segment of contacts with recorded marketing consent, pick an approved **Marketing** template, run the campaign preflight to catch opt-out and template problems, then send or schedule. Start with your smallest engaged segment — your messaging limit and quality rating both depend on how the first sends are received.',
      },
      {
        kind: 'prereqs',
        items: [
          'An approved **Marketing** template — Utility templates cannot power broadcasts.',
          'Contacts with recorded marketing consent — [Website opt-in](/docs/guides/website-opt-in).',
          'A segment or CSV defining who receives it.',
          'Enough send allowance left in the cycle — [limits](/docs/platform/limits-and-quotas).',
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Quality rating is the thing to protect',
        body:
          'Blocks and reports lower your WhatsApp quality rating, and a low rating cuts how many customers you may message in 24 hours. One badly targeted broadcast can restrict your account for weeks, long after the campaign is forgotten.',
      },
      { kind: 'h2', id: 'audience', text: 'Step 1 — the audience, not the message' },
      {
        kind: 'p',
        text:
          'Decide who should receive this before you write a word. A broadcast to everyone is almost always worse than a broadcast to the 15% who bought in the last 90 days, both in revenue and in what it does to your account health.',
      },
      {
        kind: 'table',
        columns: ['Audience source', 'When to use it'],
        rows: [
          [
            'Saved segment',
            'The default. Conditions on orders, spend, tags, consent and recency, with a live matching count.',
          ],
          ['Lead score band', 'When you want the most engaged contacts regardless of order history.'],
          [
            'CSV upload',
            'Only for lists you can attest consent for. The attestation is recorded against the import.',
          ],
          ['Manual selection', 'Small, deliberate sends — a VIP group, a restock waitlist.'],
        ],
      },
      { kind: 'h2', id: 'send', text: 'Step 2 — build and send' },
      {
        kind: 'steps',
        howToName: 'Send a WhatsApp marketing broadcast',
        totalTimeMinutes: 20,
        steps: [
          {
            title: 'Create the campaign',
            body: 'Campaigns → New. Name it something you will recognise in a results table later.',
          },
          {
            title: 'Pick one channel',
            body:
              'WhatsApp or email, not both in one campaign. To do both, send two and keep the audiences from overlapping.',
          },
          {
            title: 'Choose the audience',
            body: 'Pick the segment. The count shown is the number of contacts that will actually receive it.',
          },
          {
            title: 'Pick the Marketing template',
            body:
              'Only approved Marketing templates appear. Prefer templates whose variables are name-only — order variables sent to a segment with no order data render blank.',
          },
          {
            title: 'Run preflight',
            body:
              'Preflight checks consent coverage and template readiness, and will block a launch where too many contacts are opted out.',
            note: 'A blocked preflight is doing you a favour. Fix the audience rather than looking for a way around it.',
          },
          {
            title: 'Send or schedule',
            body:
              'Sends are batched and paced rather than fired all at once, which protects your account and your quality rating.',
          },
          {
            title: 'Read the results',
            body:
              'Open the campaign row for sent, delivered, read and failed counts, and for revenue attributed to it.',
          },
        ],
      },
      {
        kind: 'diagram',
        name: 'message-lifecycle',
        title: 'What the delivery numbers mean',
        caption:
          'Delivered means it reached the phone. Read means they opened it. Failures are almost always an invalid number or a blocked contact.',
      },
      { kind: 'h2', id: 'copy', text: 'Writing one that works' },
      {
        kind: 'list',
        items: [
          '**Lead with the thing, not the greeting.** The first line is all most people read in a notification.',
          '**One call to action.** Two links halve both.',
          '**Say who you are.** On WhatsApp the sender is a phone number, not a logo. Name your store in the first line.',
          '**Give them an exit.** An easy opt-out costs you a few contacts; a block costs you account health.',
          '**Send during waking hours** in your customers’ timezone. A 2am notification earns a block.',
        ],
      },
      {
        kind: 'verify',
        items: [
          'Preflight passes with no consent blockers.',
          'A test send to your own number renders correctly on a phone.',
          'Variables resolve to real values, not blanks or dashes.',
          'Delivered count is close to sent — a large gap means bad numbers.',
          'Opt-outs after the send stay in single digits proportionally.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If a broadcast will not send' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Launch blocked — too many contacts opted out',
            fixes: [
              'Filter Audience by consent and look at who is excluded.',
              'Remove any purchased or scraped list. There is no safe way to send to one.',
              'Narrow to a consented segment and send to that instead.',
              'For order updates, use a [journey](/docs/guides/order-status-updates) with a Utility template — no marketing consent needed.',
            ],
          },
          {
            symptom: 'The template you want is not in the list',
            fixes: [
              'It is a Utility template. Broadcasts need the Marketing category.',
              'It is still pending approval in Meta Manager.',
              'Use **Sync from Meta** if it was approved outside TopEdge.',
            ],
          },
          {
            symptom: 'Variables render as blanks or dashes',
            fixes: [
              'The template uses order variables but the segment has contacts with no orders.',
              'Switch to a name-only template for broad sends.',
              'Preview against a real contact before launching.',
            ],
          },
          {
            symptom: 'Delivered is far below sent',
            fixes: [
              'Numbers are invalid or not on WhatsApp — clean the list.',
              'Some recipients have blocked your number.',
              'If it is widespread, check your quality rating in Meta Business Manager.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Campaigns reference',
            href: '/docs/reference/campaigns',
            note: 'Every field in the builder.',
          },
          {
            label: 'Audience and segments',
            href: '/docs/reference/audience-crm',
            note: 'Building the audience.',
          },
          {
            label: 'Conversation pricing',
            href: '/docs/platform/conversation-pricing',
            note: 'What a broadcast costs.',
          },
          {
            label: 'WhatsApp vs email',
            href: '/blog/ecommerce-automation-whatsapp-vs-email-india',
            note: 'Which channel for which message.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need opt-in to send a WhatsApp broadcast?',
        answer:
          'Yes. Promotional broadcasts use Marketing templates and require recorded consent from each contact. Transactional order updates are different — they send as Utility templates through journeys and do not need marketing consent.',
      },
      {
        question: 'Why was my broadcast blocked before sending?',
        answer:
          'Preflight blocks a launch when too large a share of the audience has no recorded consent or has opted out. Fix the audience rather than the check: narrow to a consented segment, and remove any list you cannot prove consent for.',
      },
      {
        question: 'How many WhatsApp broadcasts can I send?',
        answer:
          'Two separate limits apply. Your TopEdge plan caps campaign and email sends per billing cycle, and Meta caps how many unique customers you can start conversations with in 24 hours based on your quality rating and business verification.',
      },
    ],
  },

  {
    slug: 'guides/shared-inbox-handover',
    group: 'guides',
    navLabel: 'Inbox and handover',
    title: 'Run a shared WhatsApp inbox with your team',
    description:
      'Work a shared WhatsApp inbox: take a conversation over from the bot, reply inside and outside the 24-hour window, assign to a teammate and release it back.',
    h1: 'Shared inbox and human handover',
    lead:
      'Automation handles the predictable questions. The inbox exists for everything else — and the handover between the two is where most teams lose conversations.',
    keywords: [
      'WhatsApp shared inbox',
      'WhatsApp team inbox Shopify',
      'bot to human handover WhatsApp',
      'WhatsApp agent takeover',
      'customer support WhatsApp Shopify',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/conversations', label: 'Open Live Chat' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Open a conversation in Live Chat and press **Take control** — the bot pauses so only your team replies. Inside 24 hours of the customer’s last message you can send free text; outside it you must pick an approved template. Press **Release to bot** when you are done, and automation resumes on the next inbound message.',
      },
      {
        kind: 'diagram',
        name: 'inbox-handover',
        title: 'Who is answering at each point',
        caption:
          'Forgetting to release is the usual reason a customer later says the bot "stopped working" — it is still paused on that thread.',
      },
      {
        kind: 'prereqs',
        items: [
          'WhatsApp connected with the **messages** webhook subscribed.',
          'A published flow, so unattended messages still get an answer.',
          'Approved templates for replying outside the 24-hour window.',
        ],
      },
      { kind: 'h2', id: 'daily-work', text: 'Working the inbox' },
      {
        kind: 'steps',
        howToName: 'Take over a WhatsApp conversation from the bot',
        totalTimeMinutes: 5,
        steps: [
          {
            title: 'Open the conversation',
            body: 'Unread threads rise to the top of the list. The customer panel on the right shows who they are.',
          },
          {
            title: 'Check the window before you type',
            body:
              'If the composer accepts free text, you are inside 24 hours. If it asks for a template, the window has closed.',
          },
          {
            title: 'Take control',
            body:
              'This pauses the bot for this thread. Without it, your reply and an automated reply can arrive together and contradict each other.',
          },
          {
            title: 'Use the order context',
            body:
              'The customer panel carries recent orders, COD status, lifetime value and cart history, so you do not have to open Shopify admin.',
          },
          {
            title: 'Assign if it is not yours',
            body: 'Assign the thread to the teammate who owns it, rather than leaving it unowned in the shared queue.',
          },
          {
            title: 'Resolve and release',
            body:
              'Resolve closes the ticket; Release hands the thread back to the bot. Do both — resolving alone leaves the bot paused.',
          },
        ],
      },
      { kind: 'h2', id: 'service-window', text: 'The 24-hour window, in practice' },
      {
        kind: 'diagram',
        name: 'service-window',
        title: 'Free text or template?',
        caption:
          'Every inbound message from the customer resets the window, including a one-word reply.',
      },
      {
        kind: 'p',
        text:
          'This is a WhatsApp platform rule, not a TopEdge setting. Inside 24 hours of the customer’s last message you can send anything. Outside it, only an approved template will go through — and that template reopens the window if they reply. Full detail in [the service window](/docs/platform/whatsapp-service-window).',
      },
      { kind: 'h2', id: 'filters', text: 'Finding the thread you need' },
      {
        kind: 'table',
        columns: ['Filter', 'What it narrows to'],
        rows: [
          ['Status', 'All, assigned to me, open, needs help, or a specific agent.'],
          ['Date', 'Today, last 7 days, last 30 days.'],
          ['Search', 'Name, phone number, or a snippet from a message.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Quick replies save more time than they look like they will',
        body:
          'Type `/` in the composer to insert a saved reply. If your team is answering the same question more than a few times a day, that answer belongs in your flow or your AI brain instead.',
      },
      {
        kind: 'verify',
        items: [
          'A test message from your phone appears in the inbox within seconds.',
          'Free text sends without a template picker inside the window.',
          'Outside the window, a template send succeeds.',
          'Take control stops automated replies on that thread.',
          'Release to bot resumes automation on your next inbound message.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If the inbox is misbehaving' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Inbox is completely empty',
            fixes: [
              'The **messages** webhook field is not subscribed — see [Connect WhatsApp](/docs/connect-whatsapp#troubleshooting).',
              'Message from a personal phone; a business number cannot message itself.',
              'Confirm a flow is Published, otherwise inbound messages arrive with no reply.',
            ],
          },
          {
            symptom: 'Send button is disabled or says the session expired',
            fixes: [
              'The customer has not messaged in over 24 hours. Pick an approved template.',
              'If WhatsApp is disconnected, reconnect in Settings.',
              'A Marketing template to an opted-out contact is blocked — check their consent in Audience.',
            ],
          },
          {
            symptom: 'The bot keeps replying while an agent is typing',
            fixes: [
              'Press **Take control** on the thread — that is what pauses automation.',
              'Check whether another teammate released it back to the bot mid-conversation.',
            ],
          },
          {
            symptom: 'The bot never replies again after a handover',
            fixes: [
              'The thread is still taken over. Press **Release to bot**.',
              'Resolving a ticket does not release it — they are separate actions.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Live Chat reference',
            href: '/docs/reference/live-chat',
            note: 'Every control in the inbox.',
          },
          {
            label: 'Chat rules and routing',
            href: '/docs/reference/chat-rules',
            note: 'Assign and escalate automatically.',
          },
          {
            label: 'Shared inbox with order context',
            href: '/blog/whatsapp-shared-inbox-shopify-order-context',
            note: 'Why order context matters.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why can I not send a free-form WhatsApp reply?',
        answer:
          'The customer has not messaged you in the last 24 hours, so the service window has closed. WhatsApp only allows approved templates outside that window. Once the customer replies to your template, free text works again for another 24 hours.',
      },
      {
        question: 'What happens to the bot when an agent takes over?',
        answer:
          'It pauses for that conversation only. Other conversations keep running their flows. The bot stays paused until someone releases the thread, which is why a thread that seems permanently silent is usually still taken over.',
      },
      {
        question: 'Can several agents work the same WhatsApp number?',
        answer:
          'Yes. That is the point of a shared inbox — one business number, many agents, with assignment so two people do not answer the same customer. Each reply is attributed to the agent who sent it.',
      },
    ],
  },

  {
    slug: 'guides/website-opt-in',
    group: 'guides',
    navLabel: 'Collect opt-in',
    title: 'Collect WhatsApp opt-in on your storefront',
    description:
      'Add a popup, spin wheel or WhatsApp widget to your Shopify store, write consent wording that holds up, and confirm leads land in Audience.',
    h1: 'Collect WhatsApp opt-in',
    lead:
      'Every promotional message you send depends on this. Consent is not a checkbox you add later — it is the asset that decides how large your sendable audience is a year from now.',
    keywords: [
      'WhatsApp opt-in Shopify',
      'WhatsApp marketing consent',
      'Shopify popup phone capture',
      'spin wheel opt-in Shopify',
      'WhatsApp widget storefront',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/opt-in-tools', label: 'Open opt-in tools' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Create a popup, spin wheel or WhatsApp widget in Opt-in tools, write consent wording that names WhatsApp marketing explicitly, publish it, then enable the TopEdge opt-in app embed on your **live** Shopify theme. Submissions arrive in Audience with the consent source recorded against each contact.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify connected.',
          'WhatsApp connected, for the widget and for messaging those contacts later.',
          'Theme editor access in Shopify admin.',
          'A test phone number you can submit.',
        ],
      },
      { kind: 'h2', id: 'pick-a-tool', text: 'Pick the right tool' },
      {
        kind: 'table',
        columns: ['Tool', 'Best for'],
        rows: [
          [
            'Popup',
            'The default. Email or phone capture with an optional discount, in a standard, side-image or full-background layout.',
          ],
          ['Spin wheel', 'Higher capture rate on consumer brands — the discount is revealed after consent.'],
          ['Mystery discount', 'Scratch or tap to reveal. Similar to the spin wheel, lighter visually.'],
          [
            'WhatsApp widget',
            'A launcher that opens a chat with your number. The customer messages you first, which both captures them and opens the 24-hour window.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'The widget is the quietest high performer',
        body:
          'A customer who starts the conversation has given you the strongest possible signal, and their first message opens the service window so you can reply with anything. It also never annoys anyone, because nobody has to dismiss it.',
      },
      { kind: 'h2', id: 'build-it', text: 'Build and publish' },
      {
        kind: 'steps',
        howToName: 'Add a WhatsApp opt-in popup to a Shopify store',
        totalTimeMinutes: 20,
        steps: [
          {
            title: 'Create the tool',
            body: 'Opt-in tools → pick the type → name it something you will recognise, like "Homepage popup".',
          },
          {
            title: 'Design it and write the consent line',
            body:
              'Set your brand colours, headline, and which fields you collect. The consent text must say the customer agrees to receive WhatsApp marketing from your store.',
            note: 'Vague wording is what fails when Meta asks you to evidence consent.',
          },
          {
            title: 'Set the display rules',
            body:
              'Delay in seconds, which pages it shows on, and mobile or desktop. Strict rules are the usual reason a tool "never shows" — it is simply not matching your test page.',
          },
          {
            title: 'Preview both widths',
            body: 'The editor previews mobile and desktop. Most Indian D2C traffic is mobile, so check that one properly.',
          },
          {
            title: 'Publish',
            body: 'Status must read Published. A draft never appears on the storefront.',
          },
          {
            title: 'Enable the app embed on the live theme',
            body:
              'Shopify admin → Online Store → Themes → Customize on the **live** theme → App embeds → enable TopEdge Opt-In → Save.',
            note: 'No theme file editing is needed, and nothing is left behind if you disable it.',
          },
          {
            title: 'Test in incognito with blockers off',
            body:
              'Visit your storefront in a private window, wait out your delay, and submit with your real phone number. Hard-refresh if you just published.',
          },
          {
            title: 'Confirm the contact landed',
            body:
              'Audience → Customers. The contact should appear within a minute or two with marketing consent recorded.',
          },
        ],
      },
      { kind: 'h2', id: 'consent-types', text: 'Where consent can come from' },
      {
        kind: 'diagram',
        name: 'opt-in-sources',
        title: 'The four legitimate sources',
        caption:
          'Each one records how the contact opted in, which is what you rely on if your account is ever reviewed.',
      },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Single opt-in',
            definition:
              'One clear action — ticking a box or submitting a form with consent wording beside it. The practical default for Indian D2C.',
          },
          {
            term: 'Double opt-in',
            definition:
              'A confirmation message the customer has to answer before they count as subscribed. Smaller list, stronger evidence. Use it if your legal team asks for it.',
          },
          {
            term: 'Checkout consent',
            definition:
              'Marketing consent captured during checkout. Highest intent of all, because they are already buying.',
          },
          {
            term: 'CSV import',
            definition:
              'You attest that every row opted in, and that attestation is recorded against the import. Never import a list you did not collect.',
          },
        ],
      },
      { kind: 'h2', id: 'opt-out', text: 'Opt-out is automatic' },
      {
        kind: 'p',
        text:
          'When a customer replies STOP, UNSUBSCRIBE, OPT OUT, REMOVE or CANCEL, TopEdge opts them out of WhatsApp marketing immediately. No action is needed from you, and no promotional message will reach them again unless they message you first. Transactional order updates are unaffected.',
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Never buy a phone list',
        body:
          'Messaging numbers that never opted in produces blocks and reports, which lower your WhatsApp quality rating and cut your messaging limit. The damage lands on your business number and takes weeks to recover from.',
      },
      {
        kind: 'verify',
        items: [
          'The tool shows **Published**, not Draft.',
          'It appears on your storefront in an incognito window after the delay.',
          'A test submission creates a contact in Audience with consent recorded.',
          'The WhatsApp widget opens a chat with your business number and the right prefilled message.',
          'Replying STOP to a marketing message removes the contact from future sends.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If the tool is not appearing' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Popup or widget never shows on the storefront',
            fixes: [
              'Status must be **Published**, not Draft.',
              'Enable the TopEdge Opt-In app embed on the **live** theme and Save.',
              'Test in incognito with ad blockers disabled — blockers hide popups.',
              'Loosen the display rules: a strict URL or mobile-only rule may exclude your test page.',
              'Hard-refresh after publishing (Cmd+Shift+R or Ctrl+Shift+R).',
            ],
          },
          {
            symptom: 'Submission succeeds but the contact is not in Audience',
            fixes: [
              'Search by the exact number, trying with and without the country code.',
              'Wait two minutes and refresh — writes are not instant on busy stores.',
              'Confirm the tool is Published; a draft can preview without recording anything.',
            ],
          },
          {
            symptom: 'The widget opens the wrong number',
            fixes: [
              'Reconnect WhatsApp and confirm the connection names your live business number.',
              'Republish the widget after changing its default message.',
              'Test from a personal phone — a business number cannot message itself.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Opt-in tools reference',
            href: '/docs/reference/opt-in-tools',
            note: 'Every setting in the editor.',
          },
          {
            label: 'Send a broadcast',
            href: '/docs/guides/whatsapp-broadcast',
            note: 'What consent unlocks.',
          },
          {
            label: 'Audience and segments',
            href: '/docs/reference/audience-crm',
            note: 'Where contacts land.',
          },
          {
            label: 'Opt-in tools feature page',
            href: '/features/opt-in-tools',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What counts as valid WhatsApp marketing opt-in?',
        answer:
          'A clear, affirmative action by the customer, with wording beside it that names WhatsApp marketing from your store specifically. A pre-ticked box, a buried line in your terms, or a list you bought do not count, and relying on them puts your business number at risk.',
      },
      {
        question: 'Why is my opt-in popup not showing on my Shopify store?',
        answer:
          'In order of likelihood: the tool is still a draft, the TopEdge app embed is not enabled on your live theme, an ad blocker is hiding it, or your display rules exclude the page you are testing on. Test in an incognito window with blockers off.',
      },
      {
        question: 'Do customers have to opt in again to receive order updates?',
        answer:
          'No. Order, shipping and delivery updates are transactional and send as Utility templates, which do not require marketing consent. Opt-in governs promotional broadcasts only, and opting out of marketing does not stop order updates.',
      },
    ],
  },

  {
    slug: 'guides/train-your-ai-brain',
    group: 'guides',
    navLabel: 'Train the AI brain',
    title: 'Train the AI to answer customer questions',
    description:
      'Add your own AI key, load store knowledge, train intents on real customer phrases, and test confidence before letting the AI reply to customers.',
    h1: 'Train your AI brain',
    lead:
      'A menu answers the questions you predicted. The AI brain answers the ones you did not — but only as well as the knowledge and the example phrases you give it.',
    keywords: [
      'AI chatbot Shopify WhatsApp',
      'train WhatsApp AI replies',
      'intent detection WhatsApp',
      'AI customer support Shopify',
      'bring your own AI key',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/intelligence-hub/intents', label: 'Open intents' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Add your own Gemini or OpenAI key, fill in store knowledge (shipping, returns, sizing, payment), then create intents with five to ten phrases each in the words customers actually use. Test each intent for confidence before activating it — an inactive intent never matches in production.',
      },
      {
        kind: 'prereqs',
          items: [
          'WhatsApp connected, for live replies.',
          'A Gemini or OpenAI API key. Keyword-only intents work without one.',
          'A published flow as the fallback router — [Build your first flow](/docs/guides/build-your-first-flow).',
          'Fifty real inbound messages to read before you start writing phrases.',
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'You bring your own key',
        body:
          'The AI runs on your own Gemini or OpenAI key, so model usage is billed to you by that provider and you are never locked to a model TopEdge picked. Add it under Intelligence → AI.',
      },
      { kind: 'h2', id: 'knowledge-first', text: 'Step 1 — load the knowledge' },
      {
        kind: 'p',
        text:
          'The AI cannot invent your return window. Before any intent work, fill in store knowledge, because this is what grounds every generated answer and it is the difference between a useful assistant and a confident fabricator.',
      },
      {
        kind: 'list',
        items: [
          '**Shipping** — dispatch time, delivery time by region, courier partners, what happens to a delayed order.',
          '**Returns and exchanges** — the window, the condition requirement, who pays return shipping, how refunds are issued.',
          '**Payments** — which methods you accept, whether COD is available and where, any COD fee.',
          '**Sizing and product care** — the questions your category always gets.',
          '**What you do not do** — no international shipping, no exchanges on sale items. Knowing the limits stops invented answers.',
        ],
      },
      { kind: 'h2', id: 'persona', text: 'Step 2 — set the persona' },
      {
        kind: 'p',
        text:
          'Intelligence → AI → Bot personality sets the assistant’s name and tone. Keep it plain and close to how your brand already writes. A bot with a wacky persona ages badly and makes complaints read worse than they are.',
      },
      { kind: 'h2', id: 'intents', text: 'Step 3 — train intents on real phrases' },
      {
        kind: 'steps',
        howToName: 'Train a WhatsApp AI intent',
        totalTimeMinutes: 25,
        steps: [
          {
            title: 'Read your inbox first',
            body:
              'Open the last fifty inbound messages and group them. The groups are your intents, and the messages are your phrases.',
          },
          {
            title: 'Create the intent',
            body: 'Intelligence → Intents → Add intent. Name it for the question, such as "Shipping time".',
          },
          {
            title: 'Add five to ten real phrases',
            body:
              'Copy how customers actually write — Hinglish, abbreviations, no punctuation, typos. "kitne din me ayega" is a better training phrase than "What is your delivery time?".',
            note: 'Phrases you invented yourself are the main cause of low confidence scores.',
          },
          {
            title: 'Choose what it does',
            body:
              'Reply with text, start a flow, assign to an agent, or escalate. Not everything should be answered by the AI — "I want a refund" is better routed to a human.',
          },
          {
            title: 'Activate it',
            body: 'Toggle Active. An inactive intent is invisible in production no matter how well trained it is.',
          },
          {
            title: 'Test it',
            body:
              'Use the test tool to type sample messages and read the matched intent and its confidence. Low or wrong matches mean more phrases, or splitting the intent.',
          },
        ],
      },
      {
        kind: 'table',
        caption: 'Reading the test results',
        columns: ['What you see', 'What to do'],
        rows: [
          ['Right intent, high confidence', 'Nothing. Move on.'],
          ['Right intent, low confidence', 'Add three to five more phrases closer to how the message was worded.'],
          [
            'Wrong intent matched',
            'Two intents are competing. Split them into narrower ones, or deactivate the duplicate.',
          ],
          [
            'No match at all',
            'Expected for genuinely new questions. Make sure your flow fallback hands these to a human.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Escalation is a feature, not a failure',
        body:
          'The most damaging AI reply is a confident wrong one about a refund or a delivery date. Route money, complaints and anything legal to a human by design.',
      },
      {
        kind: 'verify',
        items: [
          'Your AI key is saved and the knowledge tabs accept input.',
          'The test tool matches your sample phrases to the right intents.',
          'Each intent you want live is toggled **Active**.',
          'A real inbound message gets an AI reply when no agent has taken over.',
          'An escalation intent puts the thread in the agent queue.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If the AI answers badly' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Test matches the wrong intent or reports low confidence',
            fixes: [
              'Add three to five more phrases in customers’ own words.',
              'Split broad intents — "Shipping" and "Returns" should not be one intent.',
              'Deactivate duplicate intents competing for the same phrases.',
            ],
          },
          {
            symptom: 'The AI answers but the facts are wrong',
            fixes: [
              'Fill the gap in store knowledge — an empty field is where invention happens.',
              'Add the limits explicitly, including what you do **not** offer.',
              'Change that intent to a fixed reply instead of a generated one.',
            ],
          },
          {
            symptom: 'The AI never replies at all',
            fixes: [
              'Check the intents are Active.',
              'Check no agent has taken over the thread in Live Chat.',
              'Confirm your AI key is saved and valid with its provider.',
              'Confirm a flow is Published as the fallback router.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'AI brain reference',
            href: '/docs/reference/ai-brain',
            note: 'Intents, knowledge and persona.',
          },
          {
            label: 'Build your first flow',
            href: '/docs/guides/build-your-first-flow',
            note: 'The fallback router.',
          },
          {
            label: 'AI WhatsApp chatbot guide',
            href: '/blog/ai-whatsapp-chatbot-for-shopify-india',
            note: 'What to automate and what not to.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need my own OpenAI or Gemini key?',
        answer:
          'For AI-generated replies, yes. TopEdge uses your own key, so usage is billed to you by that provider and you keep control of which model answers your customers. Keyword-matched intents with fixed replies work without any key.',
      },
      {
        question: 'How many example phrases does an intent need?',
        answer:
          'Five to ten, taken from real customer messages rather than written by you. Phrases in your own phrasing score poorly because customers do not write like the person who built the store — expect Hinglish, abbreviations and no punctuation.',
      },
      {
        question: 'Should the AI handle refunds and complaints?',
        answer:
          'No. Route anything involving money, a complaint or a legal question to a human. A confidently wrong answer about a refund costs far more than the time it saved, and customers escalate it publicly.',
      },
    ],
  },

  {
    slug: 'guides/warranty-registration',
    group: 'guides',
    navLabel: 'Warranty registration',
    title: 'Run digital warranty registration on WhatsApp',
    description:
      'Set up warranty batches, share a mobile registration portal with WhatsApp OTP, and move claims through approved, shipped or rejected with automatic updates.',
    h1: 'Warranty registration and claims',
    lead:
      'A warranty card in the box is a dead end — nobody posts it and you learn nothing. A QR on the packaging that opens a WhatsApp registration gives you a verified contact and a reason to talk to the customer again.',
    keywords: [
      'digital warranty registration Shopify',
      'warranty claims WhatsApp',
      'product warranty automation',
      'warranty QR code packaging',
      'WhatsApp OTP registration',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/warranty-hub', label: 'Open warranty hub' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Create a warranty batch linking Shopify products to coverage dates, share the public registration portal (customers verify by WhatsApp OTP), then work claims through pending, approved, shipped or rejected. Each status change sends the customer a WhatsApp update automatically.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify connected — batches link to products and registrations match against orders.',
          'WhatsApp connected — the registration OTP and every claim update send over WhatsApp.',
          'A plan that includes the warranty module.',
          'A test product and a phone you can receive an OTP on.',
        ],
      },
      { kind: 'h2', id: 'setup', text: 'Set it up' },
      {
        kind: 'steps',
        howToName: 'Set up digital warranty registration for a Shopify store',
        totalTimeMinutes: 25,
        steps: [
          {
            title: 'Open the warranty hub',
            body: 'Warranty in the sidebar, when your plan includes it.',
          },
          {
            title: 'Create a product batch',
            body:
              'Link the Shopify products it covers, set the validity period, and define the coverage rules — what is covered and what is not.',
            note: 'Write the exclusions now. They are what you point at when you reject a claim.',
          },
          {
            title: 'Set your support contacts',
            body:
              'The phone, email and public claim URL customers see. These appear on the portal and in claim messages.',
          },
          {
            title: 'Test the registration portal',
            body:
              'Open the public registration link on a phone. Enter a product and a phone number, and complete the WhatsApp OTP.',
          },
          {
            title: 'Confirm the registration',
            body: 'It should appear in the warranty workspace, matched to the order where one exists.',
          },
          {
            title: 'Put a QR on the packaging',
            body:
              'Create a WhatsApp QR in [Meta Manager](/docs/reference/meta-manager) that opens a chat with a prefilled warranty message, and print it on the insert.',
          },
        ],
      },
      { kind: 'h2', id: 'claims', text: 'Working claims' },
      {
        kind: 'table',
        columns: ['Status', 'What it means and what the customer gets'],
        rows: [
          ['Pending', 'Awaiting your review. Check the uploaded proof and the order match.'],
          ['Approved', 'Accepted. The customer receives a WhatsApp confirmation.'],
          ['Shipped', 'Replacement or repaired unit dispatched, with a WhatsApp update.'],
          [
            'Rejected',
            'Declined with a reason you write. The reason is sent to the customer, so write it as if they will read it — because they will.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Registration is a first-party data channel',
        body:
          'A registered customer has given you a verified WhatsApp contact and told you exactly which product they own. That is the best possible basis for a replacement-cycle reminder or a consumables reorder later.',
      },
      {
        kind: 'verify',
        items: [
          'The public registration page loads on a phone.',
          'The OTP arrives over WhatsApp and verification completes.',
          'The registration appears in the warranty workspace.',
          'A claim status change sends the customer a WhatsApp update.',
          'A rejection delivers your written reason to the customer.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If registration is failing' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'The OTP never arrives',
            fixes: [
              'WhatsApp must be connected — the OTP sends over the Cloud API.',
              'The number has to be on WhatsApp and must not have blocked your business.',
              'Enter the number in full international format on the form.',
            ],
          },
          {
            symptom: 'Customer says their product is not found',
            fixes: [
              'The batch must include the SKU they bought.',
              'Sync products from Shopify if the product was added recently.',
              'Check the batch validity period covers their purchase date.',
            ],
          },
          {
            symptom: 'Claims stay pending',
            fixes: [
              'Pending means awaiting your review — nothing moves it automatically.',
              'Open the claim, check the proof against the order, and set a status.',
            ],
          },
          {
            symptom: 'The warranty module is not in the sidebar',
            fixes: [
              'It is plan-gated. Check your plan on the [pricing page](/pricing).',
              'Reload after a plan change — navigation is cached briefly.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Warranty hub reference',
            href: '/docs/reference/warranty-hub',
            note: 'Batches, registrations and claims.',
          },
          {
            label: 'Meta Manager',
            href: '/docs/reference/meta-manager',
            note: 'Creating the packaging QR.',
          },
          {
            label: 'Warranty feature page',
            href: '/features/warranty',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How do customers register a warranty?',
        answer:
          'They open your public registration portal — usually by scanning a QR on the packaging — select their product, enter their phone number and verify it with a WhatsApp OTP. The registration is then matched against the Shopify order where one exists.',
      },
      {
        question: 'Do customers need an account to claim?',
        answer:
          'No. Registration and claims both work from a mobile web page with WhatsApp OTP verification, so there is no password and no app to install. That is deliberate — every extra step loses registrations.',
      },
    ],
  },

  {
    slug: 'guides/segment-your-customers',
    group: 'guides',
    navLabel: 'Segment customers',
    title: 'Segment Shopify customers for WhatsApp',
    description:
      'Build dynamic customer segments from order history, spend, tags and consent, then launch a WhatsApp or email campaign straight from the segment.',
    h1: 'Segment your customers',
    lead:
      'Sending to everyone is the most expensive habit in WhatsApp marketing — it costs you per message and it costs you account health. A segment is how you spend both on the people likely to buy.',
    keywords: [
      'Shopify customer segmentation WhatsApp',
      'WhatsApp audience segments',
      'repeat customer segment Shopify',
      'lead scoring WhatsApp',
      'customer CRM Shopify WhatsApp',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/audience-hub/segments', label: 'Open segments' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Build a segment in Audience → Segments by stacking conditions on order count, spend, tags, consent and recency. The matching count updates live as you edit. Save it, then use **Launch campaign** to open the broadcast builder with that audience already selected.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify connected, so order history and spend are populated.',
          'Contacts in Audience — from [opt-in tools](/docs/guides/website-opt-in), checkout consent or orders.',
          'Marketing consent recorded, if the segment will receive promotional messages.',
        ],
      },
      { kind: 'h2', id: 'segments-that-earn', text: 'Segments worth building first' },
      {
        kind: 'table',
        columns: ['Segment', 'Conditions', 'What to send it'],
        rows: [
          [
            'Recent buyers',
            'Ordered in the last 30 days',
            'Cross-sell the obvious companion product, or ask for a review.',
          ],
          [
            'Repeat customers',
            'Two or more orders, consent recorded',
            'Early access and restocks. This is your most valuable list.',
          ],
          [
            'Lapsed',
            'Last order 90–180 days ago',
            'A genuine reason to come back. This is where a discount earns its keep.',
          ],
          [
            'High value',
            'Lifetime spend above your threshold',
            'Treat differently — human outreach often beats a broadcast here.',
          ],
          [
            'Prepaid-only buyers',
            'No COD orders',
            'Safe to push harder. These customers never cost you RTO.',
          ],
          [
            'High RTO risk',
            'Multiple returns to origin',
            'Nothing promotional. Consider requiring prepayment instead.',
          ],
        ],
      },
      { kind: 'h2', id: 'build-it', text: 'Build a segment' },
      {
        kind: 'steps',
        howToName: 'Build a customer segment for a WhatsApp campaign',
        totalTimeMinutes: 10,
        steps: [
          {
            title: 'Open the segment builder',
            body: 'Audience → Segments → New. Name it for what it is, like "Repeat buyers, consented".',
          },
          {
            title: 'Stack your conditions',
            body:
              'Order count, total spend, tags, consent, days since last purchase, return-to-origin count. Conditions combine with AND.',
            note: 'Because it is AND, three conditions can easily match nobody. Add one at a time and watch the count.',
          },
          {
            title: 'Watch the matching count',
            body:
              'It updates as you edit. Zero means your conditions are too strict — remove the last one you added.',
          },
          {
            title: 'Include consent if you will market to it',
            body:
              'A segment without a consent condition will be trimmed at campaign preflight anyway. Putting it in the segment means the count you see is the count that sends.',
          },
          {
            title: 'Save it',
            body: 'Saved segments are dynamic — contacts move in and out as their behaviour changes. You do not rebuild them.',
          },
          {
            title: 'Launch a campaign from it',
            body:
              'Press **Launch campaign** to open the broadcast builder with this audience selected — see [Send a broadcast](/docs/guides/whatsapp-broadcast).',
          },
        ],
      },
      { kind: 'h2', id: 'lead-scores', text: 'Lead scores, when order history is not enough' },
      {
        kind: 'p',
        text:
          'Lead scores rank contacts by engagement rather than purchases, using waterfall rules you define. They are useful for contacts who have opted in and browsed but never ordered — a group that order-history segments cannot see at all.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Phone numbers match with or without the country code',
        body:
          'Audience search handles Indian numbers both ways, so you do not have to guess the format a contact was saved in. Messages still send in full international format.',
      },
      {
        kind: 'verify',
        items: [
          'The segment’s matching count is a plausible number, not zero.',
          'Spot-check three contacts — they genuinely meet the conditions.',
          'A consent condition is present if the segment will be marketed to.',
          '**Launch campaign** opens the builder with the segment selected.',
          'The campaign audience count matches the segment count.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If a segment looks wrong' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Matching count is zero',
            fixes: [
              'Conditions combine with AND — remove the most recently added one.',
              'Check a date condition is not set to a window with no orders in it.',
              'Confirm orders have actually synced from Shopify.',
            ],
          },
          {
            symptom: 'The campaign audience is smaller than the segment',
            fixes: [
              'Contacts without marketing consent are excluded at send time.',
              'Contacts who replied STOP are permanently excluded from marketing.',
              'Add a consent condition to the segment so the two counts agree.',
            ],
          },
          {
            symptom: 'A contact you expected is missing',
            fixes: [
              'Search by their number both with and without the country code.',
              'Check they are not excluded by a consent or tag condition.',
              'If they just opted in, allow a minute or two and refresh.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Audience reference',
            href: '/docs/reference/audience-crm',
            note: 'Customers, segments and scores.',
          },
          {
            label: 'Send a broadcast',
            href: '/docs/guides/whatsapp-broadcast',
            note: 'Sending to a segment.',
          },
          {
            label: 'Audience CRM feature page',
            href: '/features/audience-crm',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Are TopEdge segments dynamic or a fixed list?',
        answer:
          'Dynamic. A saved segment re-evaluates its conditions, so contacts move in and out as they order, lapse or change consent. You build a segment like "lapsed 90 days" once and it stays correct without any maintenance.',
      },
      {
        question: 'Why does my segment match zero customers?',
        answer:
          'Conditions combine with AND, so every rule has to be true at once. Two reasonable-looking rules — say, more than three orders and ordered in the last seven days — can easily describe nobody. Add conditions one at a time and watch the live count.',
      },
    ],
  },
];
