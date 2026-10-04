import type { DocArticle } from '../types';

/** Get started — connect the two channels, then go live. */
export const START_ARTICLES: DocArticle[] = [
  {
    slug: '',
    group: 'start',
    navLabel: 'Overview',
    title: 'TopEdge Documentation',
    description:
      'Guides and reference for running WhatsApp automation on Shopify with TopEdge — setup, journeys, cart recovery, COD confirmation, templates and billing.',
    h1: 'TopEdge documentation',
    lead:
      'Everything the dashboard can do, written for the person running the store. Start with the [quickstart](/docs/quickstart) if you just signed up, or jump straight to a screen in [Reference](/docs/reference/journeys).',
    keywords: [
      'TopEdge documentation',
      'WhatsApp automation docs',
      'Shopify WhatsApp setup',
      'WhatsApp Cloud API Shopify',
      'cart recovery documentation',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/', label: 'Open your dashboard' },
    blocks: [
      {
        kind: 'answer',
        text:
          'TopEdge connects your Shopify store to the WhatsApp Cloud API so order updates, COD confirmations and abandoned-cart recovery send themselves, and every reply lands in one shared inbox. Setup is two connections — Shopify and WhatsApp — plus approved message templates before anything sends to a real customer.',
      },
      { kind: 'h2', id: 'how-it-fits', text: 'How the pieces fit together' },
      {
        kind: 'p',
        text:
          'One sentence to hold on to: **Shopify is the truth for orders, WhatsApp is the truth for messaging, and Journeys is what connects them.** Everything else in the dashboard is a view on top of those three.',
      },
      {
        kind: 'diagram',
        name: 'platform-map',
        title: 'What feeds a TopEdge workspace',
        caption:
          'Each connection fills in part of the same customer timeline, so the inbox, journeys and analytics all read the same data.',
      },
      {
        kind: 'table',
        columns: ['Part of the product', 'What it owns'],
        rows: [
          [
            'Shopify connection',
            'Orders, products, customers, checkouts, fulfilments. Source of truth for anything commercial.',
          ],
          [
            'WhatsApp connection',
            'Your business number, message templates, inbound messages and delivery receipts.',
          ],
          [
            '[Journeys](/docs/reference/journeys)',
            'Outbound automation on Shopify events — order placed, shipped, delivered, cart abandoned, COD.',
          ],
          [
            '[Flow Builder](/docs/reference/flow-builder)',
            'What the bot says when a customer messages **you** — menus, FAQs, handover to an agent.',
          ],
          [
            '[Meta Manager](/docs/reference/meta-manager)',
            'Creating templates and getting them approved by Meta. Nothing sends without an approved template.',
          ],
          [
            '[Store growth](/docs/reference/store-growth)',
            'Storefront tracking and the abandoned carts it captures, including the phone number.',
          ],
          [
            '[Audience](/docs/reference/audience-crm)',
            'The CRM — contacts, consent, segments and lead scores that campaigns send to.',
          ],
        ],
      },
      { kind: 'h2', id: 'first-week', text: 'What to do in your first week' },
      {
        kind: 'steps',
        steps: [
          {
            title: 'Connect both channels',
            body:
              'Follow [Connect WhatsApp](/docs/connect-whatsapp) and [Connect Shopify](/docs/connect-shopify). Until both are green the dashboard shows empty tables rather than invented numbers.',
          },
          {
            title: 'Get your order templates approved',
            body:
              'Meta reviews every template before it can send. Submit the order-status set first — see [Message templates](/docs/platform/message-templates).',
            note: 'Approval is usually minutes, but budget up to 24 hours for your first submission.',
          },
          {
            title: 'Turn on order status updates',
            body:
              'The safest first automation: transactional, no marketing consent needed, and customers expect it. [Order status updates](/docs/guides/order-status-updates).',
          },
          {
            title: 'Install storefront tracking, then cart recovery',
            body:
              'Cart recovery only works once a phone number is being captured at checkout. [Abandoned cart recovery](/docs/guides/abandoned-cart-recovery).',
          },
          {
            title: 'Publish a welcome flow',
            body:
              'So customers who reply to your messages get an answer instead of silence. [Build your first flow](/docs/guides/build-your-first-flow).',
          },
          {
            title: 'Add marketing opt-in last',
            body:
              'Broadcasts need provable consent. Collect it with [website opt-in tools](/docs/guides/website-opt-in) before your first promotional send.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Empty is intentional',
        body:
          'Before you connect, hubs show zeros and connect cards — never sample revenue or made-up customers. If you try to save or send in that state you get an explanatory notice, not a green success for something that did not run.',
      },
      { kind: 'h2', id: 'where-to-go', text: 'Where to go next' },
      {
        kind: 'related',
        links: [
          { label: 'Quickstart', href: '/docs/quickstart', note: 'Live in about 30 minutes.' },
          {
            label: 'Go-live checklist',
            href: '/docs/go-live-checklist',
            note: 'Everything to verify before real customers see it.',
          },
          {
            label: 'Troubleshooting',
            href: '/docs/troubleshooting',
            note: 'Find your error message and the fix.',
          },
          {
            label: 'Plans and limits',
            href: '/docs/platform/limits-and-quotas',
            note: 'Order and send caps per cycle.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need the WhatsApp Business app to use TopEdge?',
        answer:
          'No. TopEdge runs on the WhatsApp Business Platform (Cloud API), which is a different product from the WhatsApp Business phone app. You can keep using the app on a different number, or enable coexistence on the same number if your WhatsApp Business Account supports it.',
      },
      {
        question: 'Can I use TopEdge without Shopify?',
        answer:
          'The inbox, Flow Builder, templates, campaigns and the AI brain all work without Shopify. Order journeys, cart recovery, product catalogue and store economics need the Shopify connection, because those read order and checkout data from your store.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Connecting Shopify and WhatsApp takes about 30 minutes if you already have a WhatsApp Business Account on Meta. The variable is template approval — Meta usually reviews in minutes, but a first submission can take up to 24 hours.',
      },
    ],
  },

  {
    slug: 'quickstart',
    group: 'start',
    navLabel: 'Quickstart',
    title: 'Quickstart: WhatsApp automation for Shopify',
    description:
      'Go live with TopEdge in about 30 minutes: connect Shopify and WhatsApp, approve an order template, publish one journey and send yourself a test message.',
    h1: 'Quickstart',
    lead:
      'The shortest path from a new workspace to a real WhatsApp message about a real order. Roughly 30 minutes of work, plus however long Meta takes to approve your first template.',
    keywords: [
      'TopEdge quickstart',
      'WhatsApp automation setup Shopify',
      'connect WhatsApp Cloud API Shopify',
      'Shopify WhatsApp order confirmation setup',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/onboarding/playbook', label: 'Open the setup playbook' },
    blocks: [
      {
        kind: 'answer',
        text:
          'To go live: connect Shopify, connect your WhatsApp Business Account, submit one order-confirmation template to Meta, publish the order-placed journey once that template is approved, then place a test order on your own phone. Everything else — cart recovery, campaigns, the AI brain — builds on that foundation.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify admin access to the store you want to connect.',
          'A WhatsApp Business Account on the Cloud API, with a phone number that is **not** currently active in the WhatsApp Business app (or with coexistence enabled).',
          'Admin rights in Meta Business Manager, so you can approve the connection and submit templates.',
          'A second phone you can message from — a business number cannot message itself.',
        ],
      },
      { kind: 'h2', id: 'connect', text: '1. Connect Shopify and WhatsApp' },
      {
        kind: 'steps',
        howToName: 'Set up WhatsApp automation for a Shopify store',
        totalTimeMinutes: 30,
        steps: [
          {
            title: 'Connect Shopify',
            body:
              'Settings → Connections → Shopify → **Connect**, then approve the install in Shopify admin. You never type your `.myshopify.com` domain — the install starts from Shopify.',
            note: 'Full walkthrough and the permission list: [Connect Shopify](/docs/connect-shopify).',
          },
          {
            title: 'Connect WhatsApp',
            body:
              'Settings → Connections → WhatsApp → **Connect** and run the embedded Meta signup. Approve the WhatsApp Business Account and phone number you want TopEdge to send from.',
            note: 'Full walkthrough including the webhook step: [Connect WhatsApp](/docs/connect-whatsapp).',
          },
          {
            title: 'Confirm both cards are green',
            body:
              'Both connection cards should read Connected, and the amber "WhatsApp disconnected" bar should be gone from the top of the dashboard.',
          },
          {
            title: 'Sync your orders',
            body:
              'Open Orders and press **Sync**. Real Shopify orders appear within a minute or two. If the table stays empty, your Shopify permissions need re-approving.',
          },
          {
            title: 'Submit an order template to Meta',
            body:
              'Meta Manager → Library → the order lifecycle blueprint. It prefills an image header, body variables and a **View order** button. Submit it and wait for the status to turn Approved.',
            note:
              'Utility templates must read as transactional. One promotional word is the most common rejection reason.',
          },
          {
            title: 'Publish the order-placed journey',
            body:
              'Journeys → **Order placed**. Map the WhatsApp step to your approved template, then Publish. Draft journeys send nothing at all.',
          },
          {
            title: 'Place a test order',
            body:
              'Check out on your own store using your own phone number. The confirmation should arrive on WhatsApp within seconds, and the order detail page shows the send in its activity list.',
          },
        ],
      },
      {
        kind: 'diagram',
        name: 'journey-runtime',
        title: 'What happens when your test order is placed',
        caption:
          'If a test send never arrives, this is the order to debug in — the skip reason on the order tells you which stage stopped.',
      },
      {
        kind: 'verify',
        items: [
          'Shopify and WhatsApp both show **Connected** in Settings → Connections.',
          'Orders lists real orders from your store after a Sync.',
          'Your order template shows **Approved** in Meta Manager.',
          'The order-placed journey shows **Published**, not Draft.',
          'A test order produces a WhatsApp message, and the order detail page records the send.',
        ],
      },
      { kind: 'h2', id: 'then-what', text: '2. Then add one automation at a time' },
      {
        kind: 'p',
        text:
          'Resist switching everything on at once. Each automation below is independent, and each has a different prerequisite — adding them one at a time means you always know which change broke something.',
      },
      {
        kind: 'table',
        columns: ['Add this', 'It needs', 'Guide'],
        rows: [
          [
            'Shipped and delivered updates',
            'Fulfilment permissions on the Shopify connection',
            '[Order status updates](/docs/guides/order-status-updates)',
          ],
          [
            'Abandoned cart recovery',
            'Storefront tracking installed and capturing a phone number',
            '[Abandoned cart recovery](/docs/guides/abandoned-cart-recovery)',
          ],
          [
            'COD confirmation',
            'An approved template with buttons',
            '[COD confirmation](/docs/guides/cod-confirmation)',
          ],
          [
            'A welcome menu for replies',
            'A published flow',
            '[Build your first flow](/docs/guides/build-your-first-flow)',
          ],
          [
            'Promotional broadcasts',
            'Marketing consent on your contacts',
            '[WhatsApp broadcasts](/docs/guides/whatsapp-broadcast)',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Test before every publish',
        body:
          'Publishing a journey affects real customers on the next matching event. Place a test order, or abandon a test checkout, before you leave a new automation running overnight.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Go-live checklist',
            href: '/docs/go-live-checklist',
            note: 'The full list to verify before launch.',
          },
          {
            label: 'The 24-hour service window',
            href: '/docs/platform/whatsapp-service-window',
            note: 'Why some messages need a template.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why has my test WhatsApp message not arrived?',
        answer:
          'Check four things in order: the journey is Published rather than Draft, the template it uses shows Approved, the order carries a phone number in international format, and WhatsApp still shows Connected. The order detail page records a skip reason that names which of these failed.',
      },
      {
        question: 'Can I test without placing a real order?',
        answer:
          'Yes for conversations — Flow Builder has a simulator that walks menus and buttons without messaging anyone. Order journeys need a real Shopify order to trigger, so most merchants place a small test order and cancel or refund it afterwards.',
      },
      {
        question: 'Do I need a new phone number for WhatsApp?',
        answer:
          'Not necessarily, but the number cannot be actively registered in the WhatsApp Business app unless your WhatsApp Business Account has coexistence enabled. Many merchants use a dedicated number for automation and keep their existing one for manual chats.',
      },
    ],
  },

  {
    slug: 'connect-whatsapp',
    group: 'start',
    navLabel: 'Connect WhatsApp',
    title: 'Connect WhatsApp Cloud API to TopEdge',
    description:
      'Connect your WhatsApp Business Account to TopEdge: embedded Meta signup, the messages webhook, permanent access tokens, and how to fix a disconnected channel.',
    h1: 'Connect WhatsApp',
    lead:
      'TopEdge sends and receives on the WhatsApp Business Platform (Cloud API). This page covers the connection itself, the webhook subscription that makes the inbox work, and what to do when the channel drops.',
    keywords: [
      'connect WhatsApp Cloud API',
      'WhatsApp Business Account setup',
      'WhatsApp webhook messages subscription',
      'WhatsApp permanent access token',
      'WhatsApp embedded signup',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/settings?tab=whatsapp', label: 'Open WhatsApp settings' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Connect WhatsApp from Settings → Connections → WhatsApp using the embedded Meta signup, which handles the access token for you. Then confirm the **messages** webhook field is subscribed — without it TopEdge can send messages but will never receive replies, so the inbox stays empty.',
      },
      {
        kind: 'prereqs',
        items: [
          'A WhatsApp Business Account (WABA) in Meta Business Manager, and admin rights on it.',
          'A phone number that can receive an SMS or call to verify, and that is not actively registered in the WhatsApp Business app.',
          'A verified business on Meta if you want to raise your messaging limits beyond the starting tier.',
        ],
      },
      { kind: 'h2', id: 'embedded-signup', text: 'Connect with embedded signup (recommended)' },
      {
        kind: 'p',
        text:
          'Embedded signup runs Meta’s own flow inside the dashboard. It creates or selects the WABA, registers the phone number, subscribes TopEdge to the account and stores a long-lived token — which is why it is the recommended path over pasting credentials by hand.',
      },
      {
        kind: 'steps',
        howToName: 'Connect a WhatsApp Business Account to TopEdge',
        totalTimeMinutes: 15,
        steps: [
          {
            title: 'Open WhatsApp connections',
            body: 'Settings → Connections → WhatsApp → **Connect**.',
          },
          {
            title: 'Sign in to Meta',
            body:
              'Use the Facebook account that administers your business. A personal account with no Business Manager access cannot complete this.',
          },
          {
            title: 'Pick or create the WhatsApp Business Account',
            body:
              'Choose the WABA that owns the number you want to send from. Creating a second WABA for the same business is a common cause of templates appearing to go missing later.',
          },
          {
            title: 'Add and verify the phone number',
            body:
              'Enter the number, choose SMS or voice verification, and enter the code. Verified numbers show a green state in Meta.',
          },
          {
            title: 'Finish and return to TopEdge',
            body:
              'The card should now read Connected, showing the phone number and WhatsApp Business Account it is bound to.',
          },
          {
            title: 'Confirm the messages webhook',
            body:
              'Open the Webhook tab. The **messages** field must be subscribed. This is what delivers inbound messages, delivery receipts and button taps to TopEdge.',
            note: 'No messages field means no inbox, no bot replies and no read receipts.',
          },
          {
            title: 'Send yourself a test',
            body:
              'Message your business number from a personal phone. The thread should appear in Live Chat within seconds.',
          },
        ],
      },
      { kind: 'h2', id: 'manual-credentials', text: 'Manual credentials (advanced)' },
      {
        kind: 'p',
        text:
          'If embedded signup cannot complete — for example on a WABA managed by an agency that will not grant access — you can paste credentials instead. You will need the Phone Number ID, the WhatsApp Business Account ID, an access token and your Meta App ID, all from the Meta developer console.',
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Temporary tokens expire in about 24 hours',
        body:
          'The token shown on the Meta developer dashboard is a test token. Production needs a **System User** token with the `whatsapp_business_messaging` permission, which does not expire. A channel that works for a day and then dies is almost always a temporary token.',
      },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Phone Number ID',
            definition:
              'Identifies the specific number messages send from. Not the phone number itself — a numeric ID from Meta.',
          },
          {
            term: 'WhatsApp Business Account ID (WABA ID)',
            definition:
              'The account that owns your numbers and templates. Templates are scoped to this, which is why connecting the wrong WABA makes your template library look empty.',
          },
          {
            term: 'Access token',
            definition:
              'Authorises TopEdge to call Meta on your behalf. Use a System User token in production.',
          },
          {
            term: 'Webhook verify token',
            definition:
              'A shared secret Meta echoes back when it first calls your webhook URL, proving the endpoint is yours.',
          },
        ],
      },
      {
        kind: 'verify',
        items: [
          'The WhatsApp card reads **Connected** with the right phone number.',
          'No amber "WhatsApp disconnected" bar at the top of the dashboard.',
          'The **messages** webhook field is subscribed in the Webhook tab.',
          'A test message from a personal phone lands in Live Chat.',
          'Meta Manager lists your templates — an empty library usually means the wrong WABA.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If something goes wrong' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Amber "WhatsApp disconnected" bar across every page',
            fixes: [
              'Open Settings → Connections → WhatsApp and reconnect. If you are on manual credentials, paste a fresh permanent System User token.',
              'A token that stopped working overnight was almost certainly a 24-hour test token.',
              'Confirm the number has not been disconnected or migrated inside Meta Business Manager.',
              'Reconnect, then send a test message to confirm inbound still arrives.',
            ],
          },
          {
            symptom: 'Connection succeeds but the inbox stays empty',
            fixes: [
              'Check the **messages** webhook field is subscribed — sending works without it, receiving does not.',
              'Message from a personal phone. A business number cannot message itself.',
              'Confirm a flow is Published in [Flow Builder](/docs/reference/flow-builder), otherwise inbound messages arrive with no automated reply.',
            ],
          },
          {
            symptom: 'Embedded signup says the phone number is already in use',
            fixes: [
              'The number is registered in the WhatsApp Business app. Either delete that account or enable coexistence on your WABA.',
              'Check for a second Cloud API app already claiming the number in Meta Business Manager.',
              'As a last resort, verify a different number and keep the old one for manual chats.',
            ],
          },
          {
            symptom: 'Template library is empty after connecting',
            fixes: [
              'You are almost certainly connected to a different WhatsApp Business Account than the one holding your templates.',
              'Check which WABA the connection names, and compare it with the account in Meta Business Manager.',
              'Reconnect against the correct WABA, then use **Sync from Meta** in Meta Manager.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Message templates',
            href: '/docs/platform/message-templates',
            note: 'Categories, variables and approval.',
          },
          {
            label: 'The 24-hour service window',
            href: '/docs/platform/whatsapp-service-window',
            note: 'When a template is required.',
          },
          { label: 'Live Chat', href: '/docs/reference/live-chat', note: 'The shared inbox.' },
          {
            label: 'Connect Shopify',
            href: '/docs/connect-shopify',
            note: 'The other half of setup.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my WhatsApp inbox empty even though the channel is connected?',
        answer:
          'Connection and webhook subscription are two separate things. TopEdge can send as soon as the token is valid, but inbound messages only arrive once the messages webhook field is subscribed on your Meta app. Check the Webhook tab in WhatsApp settings and subscribe it.',
      },
      {
        question: 'What kind of WhatsApp access token should I use?',
        answer:
          'A System User token with the whatsapp_business_messaging permission. The token offered on the Meta developer dashboard is a temporary test token that expires in roughly 24 hours, which makes the channel appear to break by itself the next day.',
      },
      {
        question: 'Can I keep using the WhatsApp Business app on the same number?',
        answer:
          'Only if coexistence is enabled on your WhatsApp Business Account. Otherwise a number can be registered either on the Cloud API or in the WhatsApp Business app, not both, and embedded signup will report that the number is already in use.',
      },
    ],
  },

  {
    slug: 'connect-shopify',
    group: 'start',
    navLabel: 'Connect Shopify',
    title: 'Connect Shopify to TopEdge',
    description:
      'Install the TopEdge Shopify app, understand the permissions it asks for, verify that orders sync, and fix a store stuck on Reconnect.',
    h1: 'Connect Shopify',
    lead:
      'The Shopify connection is what makes order journeys, cart recovery, product catalogue and store economics work. It is an app install, so the flow always starts and finishes in Shopify admin.',
    keywords: [
      'connect Shopify WhatsApp app',
      'TopEdge Shopify integration',
      'Shopify app permissions scopes',
      'Shopify order sync WhatsApp',
      'Shopify abandoned checkout webhook',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/settings?tab=connections', label: 'Open connections' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Connect Shopify from Settings → Connections → Shopify, or by opening TopEdge from Shopify admin. You approve the app’s permissions once in Shopify, TopEdge registers its webhooks, and orders start syncing within a minute or two. You never type your store domain — the install is always approved inside Shopify.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify admin or staff access with permission to install apps.',
          'A store on a plan that allows app installs (development stores are fine for testing).',
          'If you also use a third-party checkout, access to that provider’s dashboard for the webhook step.',
        ],
      },
      { kind: 'h2', id: 'install', text: 'Install the app' },
      {
        kind: 'steps',
        howToName: 'Connect a Shopify store to TopEdge',
        totalTimeMinutes: 10,
        steps: [
          {
            title: 'Start the connect flow',
            body:
              'Settings → Connections → Shopify → **Connect**. You can also start from Shopify admin → Apps → TopEdge, which lands you back in the dashboard afterwards.',
          },
          {
            title: 'Approve the permissions in Shopify',
            body:
              'Shopify shows the full permission list. Approve all of them — a partial grant leaves specific features silently broken rather than visibly disabled.',
            note: 'See [what each permission is for](#permissions) below.',
          },
          {
            title: 'Wait for webhooks to register',
            body:
              'TopEdge subscribes to the order, fulfilment, checkout and app-lifecycle webhooks it needs. This happens automatically right after the install.',
          },
          {
            title: 'Verify orders sync',
            body: 'Open Orders and press **Sync**. Live orders should appear within one to two minutes.',
          },
          {
            title: 'Install storefront tracking',
            body:
              'Only needed for cart recovery and browse events. Store growth → Website tracking installs the theme embed, web pixel and checkout extension — see [Store growth](/docs/reference/store-growth).',
          },
        ],
      },
      { kind: 'h2', id: 'permissions', text: 'What the permissions are for' },
      {
        kind: 'p',
        text:
          'Shopify asks you to approve everything at once, so it helps to know what each group unlocks. Nothing here writes to your products or your customers.',
      },
      {
        kind: 'table',
        columns: ['Permission group', 'What it enables'],
        rows: [
          [
            'Orders (read and write)',
            'Order journeys and triggers, commerce analytics, and the order actions you take from the inbox — tag, cancel, mark paid.',
          ],
          [
            'Products and inventory',
            'Product catalogue for flows and message templates, stock levels, and setting quantities from the Stock screen.',
          ],
          [
            'Customers and checkouts',
            'Audience CRM, identity matching by phone number, and abandoned checkout detection for cart recovery.',
          ],
          [
            'Fulfilments',
            'Shipped and delivered journeys, tracking numbers, and creating fulfilments from the Orders screen.',
          ],
          [
            'Draft orders and discounts',
            'COD → prepaid payment links and cart recovery invoices, plus issuing recovery discount codes.',
          ],
          [
            'Pixels and customer events',
            'The storefront web pixel that captures carts and browse events.',
          ],
          [
            'Themes (read only)',
            'Detecting whether the TopEdge opt-in app embed is enabled on your live theme. TopEdge never edits theme files.',
          ],
          [
            'Reports and payouts (read only)',
            'Session and payout figures shown in Insights. Read-only, and never used to move money.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Permissions change over time',
        body:
          'When the app starts using a new Shopify capability, your store shows a **Reconnect** prompt. Approving it re-grants the whole set — nothing works differently until you do, which is why features can appear to stop after an update.',
      },
      {
        kind: 'verify',
        items: [
          'The Shopify card reads **Connected** and shows your store domain.',
          'Orders lists real orders after a Sync.',
          'Product search returns your catalogue.',
          'For cart recovery: every layer on Store growth → Website tracking is green.',
        ],
      },
      { kind: 'h2', id: 'troubleshooting', text: 'If something goes wrong' },
      {
        kind: 'troubleshoot',
        cases: [
          {
            symptom: 'Shopify card shows Reconnect, or fulfilments are missing',
            fixes: [
              'Settings → Shopify → **Reconnect** and approve the full permission list again.',
              'Open Orders → **Sync** and wait a couple of minutes.',
              'Missing shipped or delivered messages are nearly always missing fulfilment permissions — reconnecting fixes it.',
            ],
          },
          {
            symptom: 'Orders table stays empty after connecting',
            fixes: [
              'Press **Sync** on the Orders screen; the first load is a backfill, not a webhook.',
              'Confirm the connected store domain is the store you are actually looking at in Shopify admin.',
              'If you connected several stores while testing, make sure this workspace owns the right one.',
            ],
          },
          {
            symptom: 'Dashboard numbers do not match Shopify analytics',
            fixes: [
              'Compare the same date range and the same definition — Shopify’s total sales includes shipping and tax, while store economics reports net of cost.',
              'Press Sync to backfill any orders that arrived while the connection was down.',
              'Orders placed before you connected are backfilled, but only for the window the sync covers.',
            ],
          },
          {
            symptom: 'You uninstalled from Shopify but TopEdge still shows Connected',
            fixes: [
              'Reload the dashboard — connection state is cached briefly.',
              'If it persists, press Reconnect and then disconnect cleanly from Settings.',
              'Uninstalling in Shopify revokes the token, so no further data moves either way regardless of what the card says.',
            ],
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Store growth',
            href: '/docs/reference/store-growth',
            note: 'Tracking layers and cart capture.',
          },
          {
            label: 'Order status updates',
            href: '/docs/guides/order-status-updates',
            note: 'The first journey to switch on.',
          },
          {
            label: 'Shopify WhatsApp integration',
            href: '/shopify-whatsapp-integration',
            note: 'How the integration works, in product terms.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does TopEdge edit my Shopify theme?',
        answer:
          'No. Storefront tracking installs through Shopify app embeds and the web pixel extension, both of which are managed in the theme editor and removed cleanly when you disable them. TopEdge reads your theme only to check whether the opt-in embed is enabled.',
      },
      {
        question: 'Why does Shopify ask me to reconnect?',
        answer:
          'Shopify requires a fresh approval whenever an app starts using a capability you have not already granted. Until you approve it, the features relying on that capability stop working — missing shipped and delivered messages are the usual symptom.',
      },
      {
        question: 'Can I connect more than one Shopify store?',
        answer:
          'Each workspace binds to one Shopify store, so a second store needs its own workspace. Connecting a different store to an existing workspace releases the previous binding, which is why test stores should be disconnected before you connect the real one.',
      },
    ],
  },

  {
    slug: 'go-live-checklist',
    group: 'start',
    navLabel: 'Go-live checklist',
    title: 'Go-live checklist before real customers',
    description:
      'The checks to run before TopEdge messages real customers: connections, approved templates, published journeys, consent, tracking and a live end-to-end test.',
    h1: 'Go-live checklist',
    lead:
      'Work down this list once. Everything on it has caused a real merchant a real problem — usually silence where a message should have been, or a message that should not have gone out.',
    keywords: [
      'WhatsApp automation go live checklist',
      'Shopify WhatsApp launch checklist',
      'WhatsApp template approval check',
      'WhatsApp marketing consent check',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/onboarding/playbook', label: 'Open the setup playbook' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Before going live, confirm both channels are connected, every template a journey uses is Approved, each journey you expect to run is Published rather than Draft, marketing sends only target contacts with recorded consent, and one real end-to-end test has produced a message on a real phone.',
      },
      { kind: 'h2', id: 'connections', text: 'Connections' },
      {
        kind: 'verify',
        items: [
          'Shopify shows **Connected** with the correct store domain.',
          'WhatsApp shows **Connected** with the number you want customers to see.',
          'The **messages** webhook field is subscribed.',
          'Your WhatsApp token is a permanent System User token, not a 24-hour test token.',
          'Gmail is connected if any journey or campaign sends email.',
        ],
      },
      { kind: 'h2', id: 'templates', text: 'Templates' },
      {
        kind: 'verify',
        items: [
          'Every template referenced by a published journey shows **Approved**.',
          'Order and shipping templates are in the **Utility** category and contain no promotional language.',
          'Promotional templates are in the **Marketing** category.',
          'Variables are mapped — a template with unmapped variables sends with blanks or fails outright.',
          'The preview in the dashboard matches what you want the customer to receive.',
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Approved at send time, not at publish time',
        body:
          'Meta can pause or disable a template after approval if quality drops. A journey that worked last week can start skipping sends without any change on your side — the skip reason on the order will say so.',
      },
      { kind: 'h2', id: 'automations', text: 'Automations' },
      {
        kind: 'verify',
        items: [
          'Each journey you expect to run shows **Published**. Draft journeys never send.',
          'The trigger on each journey matches the event you think it does — order confirmation is the **order placed** trigger.',
          'Trigger filters are deliberate. All rules combine with AND, so two narrow rules can exclude everyone.',
          'Wait timings are what you intend — the first cart reminder is minutes, not instant.',
          'Your main flow is Published in Flow Builder, so replies get an answer.',
        ],
      },
      { kind: 'h2', id: 'consent', text: 'Consent and compliance' },
      {
        kind: 'verify',
        items: [
          'Marketing broadcasts target only contacts with recorded opt-in.',
          'No purchased or scraped phone lists are loaded into Audience.',
          'Opt-in tools carry consent wording that names WhatsApp marketing explicitly.',
          'STOP handling is understood — it opts the contact out of marketing automatically.',
          'Order and shipping updates use Utility templates, which do not require marketing consent.',
        ],
      },
      {
        kind: 'diagram',
        name: 'opt-in-sources',
        title: 'Where consent can legitimately come from',
        caption:
          'Each source records how the contact opted in, which is what you rely on if Meta ever asks.',
      },
      { kind: 'h2', id: 'tracking', text: 'Tracking (for cart recovery only)' },
      {
        kind: 'verify',
        items: [
          'All three layers on Store growth → Website tracking are green.',
          'The TopEdge opt-in app embed is enabled on your **live** theme, not a preview theme.',
          'A test abandoned checkout produced a cart row **with a phone number**.',
          'If you use a third-party checkout, its webhook is configured and tested.',
        ],
      },
      { kind: 'h2', id: 'live-test', text: 'One real end-to-end test' },
      {
        kind: 'steps',
        steps: [
          {
            title: 'Place a real order on your own phone',
            body:
              'Use a number you control, in international format. Confirm the WhatsApp message arrives and reads correctly on a phone, not just in the dashboard preview.',
          },
          {
            title: 'Abandon a checkout',
            body:
              'Enter your phone at checkout and leave. Confirm the cart appears under abandoned carts with the phone populated, then wait for the first reminder to fire.',
          },
          {
            title: 'Reply to the message',
            body:
              'Your reply should appear in Live Chat and trigger your welcome flow. This proves the webhook is working in the inbound direction too.',
          },
          {
            title: 'Take over and release',
            body:
              'Take control of the thread, send a free-form reply, then release it to the bot. Confirm automation resumes on your next inbound message.',
          },
          {
            title: 'Check the money',
            body:
              'Complete the abandoned checkout and confirm the cart is marked recovered with revenue attributed.',
          },
        ],
      },
      { kind: 'h2', id: 'limits', text: 'Know your limits before launch day' },
      {
        kind: 'p',
        text:
          'Two separate ceilings apply. Your TopEdge plan caps orders and sends per billing cycle, and Meta caps how many unique customers you can message in 24 hours. A launch broadcast is the usual way to discover both at once.',
      },
      { kind: 'planLimits' },
      {
        kind: 'related',
        links: [
          {
            label: 'Plan limits and quotas',
            href: '/docs/platform/limits-and-quotas',
            note: 'Both ceilings explained.',
          },
          {
            label: 'Conversation pricing',
            href: '/docs/platform/conversation-pricing',
            note: 'What Meta charges and what TopEdge charges.',
          },
          {
            label: 'Troubleshooting',
            href: '/docs/troubleshooting',
            note: 'When a check above fails.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the most common reason a WhatsApp automation does not send?',
        answer:
          'A journey left in Draft. Publishing is a separate action from saving, and a saved draft looks complete in the editor while sending nothing. The second most common reason is a template that is still pending Meta approval.',
      },
      {
        question: 'Do order confirmations need marketing consent?',
        answer:
          'No. Order, shipping and delivery updates are transactional and send as Utility templates, which do not require marketing opt-in. Promotional broadcasts are different and do need recorded consent from the contact.',
      },
    ],
  },
];
