import type { DocArticle } from '../types';

/** Reference — one page per dashboard surface. What each control does, and what it needs. */
export const REFERENCE_ARTICLES: DocArticle[] = [
  {
    slug: 'reference/journeys',
    group: 'reference',
    navLabel: 'Journeys',
    title: 'Journeys reference: triggers, nodes, publishing',
    description:
      'Complete reference for TopEdge Journeys — every trigger type, trigger filter, node type, wait behaviour, publishing rule and revenue attribution window.',
    h1: 'Journeys',
    lead:
      'Journeys are visual automations that run when something happens in Shopify. You design a graph, publish it, and TopEdge compiles the published graph into timed steps for each customer who enters.',
    keywords: [
      'WhatsApp journey builder reference',
      'Shopify automation triggers',
      'journey node types',
      'WhatsApp automation publishing',
      'cart abandoned trigger',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/journeys', label: 'Open Journeys' },
    blocks: [
      {
        kind: 'answer',
        text:
          'A journey has one trigger, optional filters, and a graph of nodes. Publishing freezes both the graph and the trigger — editing a published journey changes nothing until you publish again. Each enrolled customer gets their own timeline of scheduled steps, and an inbound reply cancels the rest by default.',
      },
      { kind: 'h2', id: 'runtime', text: 'How a journey runs' },
      {
        kind: 'diagram',
        name: 'journey-runtime',
        title: 'From Shopify event to sent message',
        caption: 'When a send does not happen, the skip reason on the order names which stage stopped it.',
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Publishing is what makes a journey live',
        body:
          'Saving stores a draft. Publishing takes a snapshot of the graph **and** the trigger. A journey whose trigger you changed in the editor keeps firing on its old trigger until you publish again.',
      },
      { kind: 'h2', id: 'triggers', text: 'Trigger types' },
      {
        kind: 'table',
        columns: ['Trigger', 'Fires when'],
        rows: [
          ['**Order placed**', 'An order is created in Shopify. This is also your order-confirmation trigger.'],
          ['**Order shipped**', 'An order is fulfilled, or a fulfilment updates with a non-delivered status.'],
          ['**Order delivered**', 'A fulfilment updates with a delivered shipment status.'],
          ['**Cart abandoned**', 'A checkout is abandoned and the capture delay has elapsed.'],
          ['**Manual**', 'Nothing automatic — you enrol customers yourself from a list.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'There is no "order confirmed" trigger',
        body:
          'An order being placed *is* the confirmation. Looking for a separate confirmed trigger is the most common reason a confirmation journey is built and never fires.',
      },
      { kind: 'h3', id: 'exit-conditions', text: 'Exit conditions' },
      {
        kind: 'p',
        text:
          'Exit conditions cancel a customer’s remaining steps. **Customer replies** is available on every trigger and is on by default, which stops a customer who already answered from being chased. **Order cancelled** is available on order triggers.',
      },
      { kind: 'h2', id: 'filters', text: 'Trigger filters' },
      {
        kind: 'p',
        text:
          'Filters decide who enters. **Every active rule must be true** — they combine with AND, never OR. An empty rule set matches everything, which is usually what you want on an order-confirmation journey.',
      },
      {
        kind: 'table',
        caption: 'Filters on order triggers',
        columns: ['Filter', 'Values'],
        rows: [
          ['Payment method', 'Any, COD, or prepaid. This is how you build a COD-only journey.'],
          ['Order total', 'Minimum, maximum, or both, in rupees.'],
          ['Products', 'Include or exclude specific Shopify products.'],
          ['Customer type', 'Any, first order, or returning.'],
          ['Order tags', 'Include or exclude by tag.'],
          ['Shipping state or city', 'Indian states from a list, or a city as free text.'],
          ['Discount code', 'Whether a specific code was used.'],
        ],
      },
      {
        kind: 'table',
        caption: 'Filters on the cart abandoned trigger',
        columns: ['Filter', 'Values'],
        rows: [
          ['Capture delay', 'How long after abandonment the customer enters — 25 minutes by default.'],
          ['Minimum cart value', 'Skip low-value carts that are not worth a conversation fee.'],
          ['Cart products', 'Only carts containing specific products.'],
        ],
      },
      { kind: 'h2', id: 'nodes', text: 'Node types' },
      {
        kind: 'table',
        columns: ['Node', 'What it does', 'Needs'],
        rows: [
          [
            'Entry',
            'The root of every journey. Holds the trigger, its filters and exit conditions. Cannot be deleted.',
            '—',
          ],
          [
            'Send WhatsApp',
            'Sends an approved template with variables mapped from the order or cart.',
            'An Approved template',
          ],
          [
            'Send Email',
            'Sends an email from your connected mailbox, with subject and body.',
            'Gmail connected',
          ],
          [
            'Order status',
            'Sends the lifecycle template for a stage — confirmed, shipped, out for delivery or delivered.',
            'An Approved Utility template',
          ],
          [
            'Cart recovery',
            'A cart reminder with the live product image and a link back to checkout. Can also send a matching email.',
            'An Approved template',
          ],
          [
            'COD → prepaid',
            'Creates a Shopify draft invoice and injects the payment link into the message.',
            'Growth plan or above',
          ],
          [
            'Wait',
            'Delays the **next** sending node. Presets from 15 minutes to 7 days.',
            '—',
          ],
          [
            'Conditional split',
            'Two outputs, yes and no, based on a rule. Both branches must be wired before publish.',
            'Growth plan or above',
          ],
          [
            'Connect to chatbot',
            'Hands the customer to a published flow, using the latest published version at send time.',
            'A live flow',
          ],
          ['End journey', 'Explicitly terminates a branch.', '—'],
        ],
      },
      { kind: 'h3', id: 'wait-behaviour', text: 'How waits actually work' },
      {
        kind: 'p',
        text:
          'A wait node does not become a step of its own. Its delay is added to the next node that actually sends something. Two waits in a row therefore add up, and a wait at the very end of a branch does nothing at all.',
      },
      { kind: 'h2', id: 'playbooks', text: 'Playbooks' },
      {
        kind: 'p',
        text:
          'Journeys ships pre-built playbooks so you are not starting from an empty canvas. Each comes with the right trigger and nodes already in place — you map your approved templates and publish.',
      },
      {
        kind: 'table',
        columns: ['Playbook', 'Trigger', 'Plan'],
        rows: [
          ['Order placed — confirmation', 'Order placed', 'Launch'],
          ['Order shipped — tracking', 'Order shipped', 'Launch'],
          ['Order delivered — review request', 'Order delivered', 'Launch'],
          ['Cart recovery — 3 step', 'Cart abandoned', 'Launch'],
          ['Quick 3-step follow-up', 'Manual', 'Launch'],
          ['Cart recovery — smart (with branch)', 'Cart abandoned', 'Growth'],
          ['COD confirm with branch', 'Order placed', 'Growth'],
          ['COD → prepaid', 'Order placed', 'Growth'],
        ],
      },
      { kind: 'h2', id: 'limits', text: 'Runtime limits worth knowing' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Two active sequences per customer',
            definition:
              'A customer can be enrolled in at most two running automations at once. A third enrolment is skipped rather than queued, which stops a customer receiving four unrelated ladders at the same time.',
          },
          {
            term: 'Reply cancels remaining steps',
            definition:
              'On by default. A customer who answers your first message does not receive the rest of the ladder. You can turn it off on the entry node, but you usually should not.',
          },
          {
            term: 'Revenue attribution: last touch, 7 days',
            definition:
              'An order is credited to the most recent journey touch within the previous 168 hours. The customer does not need to click your link for it to count.',
          },
          {
            term: 'Published journeys survive a downgrade',
            definition:
              'Plan-gated nodes stop you creating or editing a journey, but an already-published one keeps running. You just cannot change it until you upgrade again.',
          },
          {
            term: 'Scheduled steps need the background worker',
            definition:
              'Delayed sends are dispatched by a background process on a short cycle, not by the web app. On production this is automatic.',
          },
        ],
      },
      { kind: 'h2', id: 'analytics', text: 'Reading journey analytics' },
      {
        kind: 'p',
        text:
          'Each journey has a detail view with per-step counts — enrolled, sent, delivered, read, clicked — and attributed revenue. The canvas can also overlay those counts directly onto the nodes, which is the fastest way to find the step where customers drop out.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Abandoned cart recovery',
            href: '/docs/guides/abandoned-cart-recovery',
            note: 'The cart journey, step by step.',
          },
          {
            label: 'Order status updates',
            href: '/docs/guides/order-status-updates',
            note: 'The lifecycle journeys.',
          },
          {
            label: 'COD confirmation',
            href: '/docs/guides/cod-confirmation',
            note: 'Branching and the prepaid switch.',
          },
          {
            label: 'Flow Builder',
            href: '/docs/reference/flow-builder',
            note: 'For inbound conversations instead.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my published journey not sending?',
        answer:
          'Check in this order: the journey is Published rather than Draft, the template it uses is Approved right now, trigger filters do not exclude the customer, and the customer has a phone number. The order detail page records a skip reason naming the exact cause.',
      },
      {
        question: 'Do trigger filters combine with AND or OR?',
        answer:
          'Always AND. Every active rule must be true for a customer to enter. This is why two reasonable-looking filters can exclude everybody — a minimum order value plus a specific product is a much narrower audience than it appears.',
      },
      {
        question: 'How is recovered revenue attributed to a journey?',
        answer:
          'Last touch within seven days. If a journey message was the most recent TopEdge touch before the order, that journey is credited. The customer does not have to click the link, which avoids under-counting people who get the reminder and then visit your site directly.',
      },
    ],
  },

  {
    slug: 'reference/flow-builder',
    group: 'reference',
    navLabel: 'Flow Builder',
    title: 'Flow Builder reference: nodes and publishing',
    description:
      'Reference for Flow Builder — the canvas, every node type, the simulator, publish validation, and how a published flow handles inbound WhatsApp messages.',
    h1: 'Flow Builder',
    lead:
      'Flow Builder decides what happens when a customer messages you. One published flow handles inbound messages for your whole number; drafts are invisible to customers.',
    keywords: [
      'WhatsApp flow builder nodes',
      'WhatsApp bot canvas',
      'flow publish validation',
      'WhatsApp interactive list buttons',
      'chatbot simulator',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/flow-builder', label: 'Open Flow Builder' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Flows are graphs of conversation nodes built on a canvas. The simulator walks them without messaging anyone, publish validation blocks disconnected handles and unapproved templates, and publishing replaces the live graph from the next inbound message onward.',
      },
      {
        kind: 'diagram',
        name: 'flow-vs-journey',
        title: 'Flow Builder versus Journeys',
        caption: 'If the message should be sent because of a Shopify event, you want Journeys.',
      },
      { kind: 'h2', id: 'canvas', text: 'Working the canvas' },
      {
        kind: 'table',
        columns: ['Action', 'How'],
        rows: [
          ['Edit copy', 'Click the text on a node to edit it in place.'],
          ['Open full settings', 'Double-click a node to open its properties panel.'],
          ['Connect nodes', 'Drag from an output handle to the next node. Branch nodes have several outputs.'],
          ['Add a node', 'Drag it from the palette, or search the palette by name.'],
          ['Test', 'Toolbar → Test Flow opens the simulator.'],
          ['Go live', 'Publish. Validation runs first and blocks on errors.'],
        ],
      },
      { kind: 'h2', id: 'nodes', text: 'Node types' },
      {
        kind: 'table',
        columns: ['Node', 'What it does', 'Limits'],
        rows: [
          ['Message', 'Sends text or media.', 'Long text is truncated behind "Read more" on WhatsApp.'],
          ['Buttons', 'Quick-reply buttons.', 'Three per message.'],
          ['List', 'A tappable list of options.', 'Up to ten rows.'],
          ['Template', 'Sends an approved template.', 'Required outside the 24-hour window.'],
          ['Capture', 'Stores the customer’s reply in a variable.', 'Reusable by later nodes.'],
          ['Condition', 'Branches on a keyword, tag or stored field.', 'Each output must be wired.'],
          ['Live chat', 'Hands over to the inbox and pauses the bot.', 'Stays paused until released.'],
          ['Shopify', 'Looks up an order or product mid-chat.', 'Needs Shopify connected.'],
        ],
      },
      { kind: 'h2', id: 'simulator', text: 'The simulator' },
      {
        kind: 'p',
        text:
          'The simulator is a phone preview that walks your buttons and lists without sending anything to a real customer. Use it on every branch, including the paths you expect nobody to take — those are exactly where dead ends hide.',
      },
      { kind: 'h2', id: 'publishing', text: 'Publish validation' },
      {
        kind: 'p',
        text:
          'Publish runs a preflight check and refuses to go live with errors. Each error links to the node that caused it.',
      },
      {
        kind: 'list',
        items: [
          '**Disconnected node** — an output handle with no edge. Wire it to a node or to an explicit end.',
          '**Template node with no template** — pick an Approved template in the node’s properties.',
          '**Unreachable node** — nothing points at it. Either connect it or delete it.',
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Published flows are snapshots',
        body:
          'The live bot runs the graph as it was at publish time. Editing the canvas updates only the draft, and a conversation already in progress may finish on the previous version.',
      },
      { kind: 'h2', id: 'folders', text: 'Folders and multiple flows' },
      {
        kind: 'p',
        text:
          'Flows can be organised into folders. Journeys can hand a customer to a specific flow with a connect-to-chatbot node, and that handoff always uses the flow’s latest published version — so republishing a flow upgrades every journey pointing at it.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Build your first flow',
            href: '/docs/guides/build-your-first-flow',
            note: 'The guided version of this page.',
          },
          {
            label: 'AI brain',
            href: '/docs/reference/ai-brain',
            note: 'Answering what a menu cannot.',
          },
          {
            label: 'The 24-hour window',
            href: '/docs/platform/whatsapp-service-window',
            note: 'When a template node is required.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How many flows can be live at once?',
        answer:
          'One flow handles inbound messages for your number, so that is the one customers meet first. Other flows can still be live as handoff targets — a journey or a live-chat node can route a customer into a specific flow by name.',
      },
      {
        question: 'Why does publish say my flow has disconnected nodes?',
        answer:
          'Every output handle has to lead somewhere. A buttons node with three buttons needs three edges, even if two of them go to the same reply. Leaving one unwired means a customer could tap it and receive nothing, so publish blocks it.',
      },
    ],
  },

  {
    slug: 'reference/live-chat',
    group: 'reference',
    navLabel: 'Live Chat',
    title: 'Live Chat reference: inbox, takeover, filters',
    description:
      'Reference for the TopEdge shared WhatsApp inbox — conversation list, composer rules, agent takeover, assignment, customer context and inbox filters.',
    h1: 'Live Chat',
    lead:
      'One inbox for your whole team on one business number, with the customer’s order history beside the thread so nobody has to open Shopify admin to answer a question.',
    keywords: [
      'WhatsApp shared inbox reference',
      'WhatsApp agent takeover',
      'customer 360 WhatsApp',
      'WhatsApp inbox filters',
      'team inbox Shopify',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/conversations', label: 'Open Live Chat' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Live Chat is a three-pane inbox: conversations on the left, the thread in the middle, customer context on the right. The composer accepts free text inside 24 hours of the customer’s last message and requires an approved template outside it. Taking control pauses the bot for that thread only.',
      },
      { kind: 'h2', id: 'layout', text: 'The three panes' },
      {
        kind: 'table',
        columns: ['Pane', 'What it holds'],
        rows: [
          ['Conversation list', 'Threads newest first, unread at the top, with filters and search above.'],
          ['Thread', 'The message history and the composer, including delivery and read state per message.'],
          [
            'Customer context',
            'Recent orders, COD status, lifetime value, cart history, tags and consent — plus a link into Audience.',
          ],
        ],
      },
      { kind: 'h2', id: 'composer', text: 'What the composer will let you send' },
      {
        kind: 'diagram',
        name: 'service-window',
        title: 'Free text or template',
        caption: 'Any inbound message from the customer resets the 24-hour window, including a single word.',
      },
      {
        kind: 'table',
        columns: ['Situation', 'What you can send'],
        rows: [
          ['Customer messaged within 24 hours', 'Anything — text, images, documents.'],
          ['More than 24 hours since their last message', 'Approved templates only.'],
          ['Contact has opted out of marketing', 'Utility templates still send; Marketing templates are blocked.'],
          ['WhatsApp disconnected', 'Nothing. Reconnect in Settings first.'],
        ],
      },
      { kind: 'h2', id: 'takeover', text: 'Takeover and release' },
      {
        kind: 'diagram',
        name: 'inbox-handover',
        title: 'The handover cycle',
        caption: 'Resolve and Release are separate actions — resolving a ticket leaves the bot paused.',
      },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Take control',
            definition:
              'Pauses automation for this conversation so only your team replies. Other conversations are unaffected.',
          },
          {
            term: 'Release to bot',
            definition: 'Resumes automation from the customer’s next inbound message.',
          },
          {
            term: 'Resolve',
            definition:
              'Closes the ticket for reporting. It does **not** release the bot — do both when you are finished.',
          },
          {
            term: 'Assign',
            definition: 'Gives the thread an owner, so it leaves the unowned queue.',
          },
        ],
      },
      { kind: 'h2', id: 'filters', text: 'Filters and search' },
      {
        kind: 'table',
        columns: ['Control', 'Options'],
        rows: [
          ['Status', 'All, assigned to me, open, needs help, or a named agent.'],
          ['Date', 'Today, last 7 days, last 30 days.'],
          ['Search', 'Name, phone number, or a message snippet. Two characters minimum.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Quick replies',
        body:
          'Type `/` in the composer to insert a saved reply. If the same answer is being inserted several times a day, move it into your flow or train it as an intent instead.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Inbox and handover guide',
            href: '/docs/guides/shared-inbox-handover',
            note: 'How to work the inbox day to day.',
          },
          {
            label: 'Chat rules and routing',
            href: '/docs/reference/chat-rules',
            note: 'Assign and escalate automatically.',
          },
          {
            label: 'Live Chat feature page',
            href: '/features/live-chat',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the send button greyed out in Live Chat?',
        answer:
          'Either the 24-hour service window has closed, so you need an approved template, or WhatsApp is disconnected. A third case is a Marketing template addressed to a contact who has opted out, which is blocked by design.',
      },
      {
        question: 'Does taking over a conversation stop the bot everywhere?',
        answer:
          'No, only on that conversation. Every other thread keeps running its flows and journeys normally. The paused thread stays paused until someone releases it, which is why a single thread can look permanently silent.',
      },
    ],
  },

  {
    slug: 'reference/orders',
    group: 'reference',
    navLabel: 'Orders',
    title: 'Orders reference: status, activity, actions',
    description:
      'Reference for the Orders screen — syncing from Shopify, changing status, reading per-order WhatsApp activity, and understanding skip reasons.',
    h1: 'Orders',
    lead:
      'Your Shopify orders with the WhatsApp activity attached. This is where you find out whether a customer actually received their confirmation — and if not, why not.',
    keywords: [
      'Shopify orders WhatsApp activity',
      'order status change automation',
      'WhatsApp send skip reason',
      'order fulfilment WhatsApp',
      'Shopify order sync',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/orders', label: 'Open Orders' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Orders mirrors your Shopify orders and records every WhatsApp message sent about each one. Changing an order’s status here enrols the matching journey immediately rather than waiting for Shopify, and each order’s activity list shows what sent, what failed and why anything was skipped.',
      },
      { kind: 'h2', id: 'sync', text: 'Syncing' },
      {
        kind: 'p',
        text:
          'New orders arrive by Shopify webhook within seconds. **Sync** does a backfill instead, which is what you want after first connecting, after a reconnect, or if you suspect webhooks were dropped while something was down. A reconcile job also re-checks orders on a schedule and fires anything missed.',
      },
      { kind: 'h2', id: 'status', text: 'Changing status' },
      {
        kind: 'p',
        text:
          'Changing status here does two things: it updates the order, and it enrols the journey for that stage straight away. A de-duplication guard means the later Shopify echo of the same change does not produce a second message.',
      },
      {
        kind: 'table',
        columns: ['Status you set', 'Journey trigger it fires'],
        rows: [
          ['Shipped', 'Order shipped'],
          ['Out for delivery', 'Order shipped'],
          ['Delivered', 'Order delivered'],
          ['Confirmed or paid', 'Nothing — the order-placed journey already ran'],
          ['Cancelled', 'Nothing sends, and pending steps for that order are cancelled'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Delivered is pushed back to Shopify',
        body:
          'Marking an order delivered posts a carrier event to Shopify so your store reflects it too. If Shopify rejects the event, TopEdge keeps the local status rather than failing your change.',
      },
      { kind: 'h2', id: 'activity', text: 'Per-order activity' },
      {
        kind: 'p',
        text:
          'Open any order to see every message attached to it — which template, when it sent, and its delivery state. This is the first place to look when a customer says they got nothing.',
      },
      {
        kind: 'table',
        caption: 'Common skip reasons and what they mean',
        columns: ['Reason', 'Fix'],
        rows: [
          ['Template not approved', 'The template was pending or has been paused by Meta. Check Meta Manager.'],
          ['No phone number', 'The order has no usable phone. Check your checkout is collecting one.'],
          ['Filter mismatch', 'Trigger filters excluded this order — usually payment method or order total.'],
          ['Already sent', 'De-duplication. The message went out on an earlier event for this order.'],
          ['No published journey', 'Nothing is live for that trigger. Publish the journey.'],
          ['Send cap reached', 'The plan’s cycle allowance is used up — see [limits](/docs/platform/limits-and-quotas).'],
        ],
      },
      { kind: 'h2', id: 'actions', text: 'Actions you can take' },
      {
        kind: 'list',
        items: [
          '**Tag** an order, for your warehouse or for journey filters.',
          '**Cancel** an order, which also cancels its pending automation steps.',
          '**Mark paid**, for a COD order settled another way.',
          '**Fulfil** with tracking details, which fires the shipped journey.',
          '**Open in Shopify** to jump to the order in admin.',
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Order count is a billing meter',
        body:
          'Orders ingested count against your plan’s order allowance for the cycle. Cancelling an order does not give the count back, and a COD order converted to prepaid is counted once, not twice.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Order status updates',
            href: '/docs/guides/order-status-updates',
            note: 'Building the lifecycle journeys.',
          },
          {
            label: 'Journeys reference',
            href: '/docs/reference/journeys',
            note: 'Triggers and filters.',
          },
          {
            label: 'Plan limits',
            href: '/docs/platform/limits-and-quotas',
            note: 'How orders are metered.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does an order say the WhatsApp message was skipped?',
        answer:
          'The activity list names the reason. The usual causes are a template that is not approved at send time, an order with no phone number, trigger filters that excluded the order, or de-duplication because the message already went out on an earlier event.',
      },
      {
        question: 'Does changing order status in TopEdge update Shopify?',
        answer:
          'Delivered and out-for-delivery are pushed back to Shopify as carrier events, and fulfilling an order creates a real Shopify fulfilment. If Shopify rejects an event, TopEdge keeps your local status rather than failing the change.',
      },
    ],
  },

  {
    slug: 'reference/audience-crm',
    group: 'reference',
    navLabel: 'Audience',
    title: 'Audience reference: customers, segments, scores',
    description:
      'Reference for Audience — the customer table, Customer 360, dynamic segment conditions, lead scoring, consent records and bulk actions.',
    h1: 'Audience',
    lead:
      'The CRM behind every campaign. Audience holds contacts, what they bought, how they were acquired, and whether you are allowed to market to them.',
    keywords: [
      'WhatsApp CRM Shopify',
      'customer segments WhatsApp',
      'lead scoring',
      'customer 360 profile',
      'marketing consent record',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/audience-hub/customers', label: 'Open Audience' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Audience has three screens: Customers (every contact, with consent and spend), Segments (dynamic lists built from stacked conditions) and Lead scores (engagement ranking from your own rules). Campaigns send to segments, so this is where the quality of your marketing is actually decided.',
      },
      { kind: 'h2', id: 'customers', text: 'Customers' },
      {
        kind: 'table',
        columns: ['Column or control', 'What it tells you'],
        rows: [
          ['Search', 'Name, phone, email or tag. Indian numbers match with or without the country code.'],
          ['Opt-in', 'Whether you may send Marketing templates to this contact.'],
          ['Score', 'Their lead score band.'],
          ['Spend', 'Lifetime value from Shopify order history.'],
          ['Source', 'How they were acquired — popup, checkout, widget, import or order.'],
          ['Filters', 'Tag, score band, source, engagement, or import batch.'],
        ],
      },
      { kind: 'h3', id: 'customer-360', text: 'Customer 360' },
      {
        kind: 'p',
        text:
          'Click any row for the full profile: orders, message history, tags, consent and where that consent came from. This is the record you rely on if you ever have to evidence opt-in.',
      },
      { kind: 'h3', id: 'bulk-actions', text: 'Bulk actions' },
      {
        kind: 'p',
        text:
          'Select rows to mass message, bulk email, export to CSV or delete. Bulk messaging respects consent and the service window exactly as a campaign does — selecting a contact does not override either.',
      },
      { kind: 'h2', id: 'segments', text: 'Segments' },
      {
        kind: 'p',
        text:
          'Segments are dynamic: conditions are re-evaluated rather than frozen, so a "lapsed 90 days" segment stays correct without maintenance. **Conditions combine with AND**, and the matching count updates live as you edit.',
      },
      {
        kind: 'table',
        caption: 'Conditions you can stack',
        columns: ['Condition', 'Example use'],
        rows: [
          ['Order count', 'Two or more orders — your repeat buyers.'],
          ['Lifetime spend', 'Above a threshold you set — your high-value list.'],
          ['Days since last purchase', '90 to 180 days — your lapsed list.'],
          ['Tags', 'Anything your team or your journeys tagged.'],
          ['Marketing consent', 'Put this in the segment so the count equals what will send.'],
          ['Return-to-origin count', 'Identify high-RTO customers to treat differently.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Include consent in the segment itself',
        body:
          'Campaign preflight trims non-consented contacts anyway. Putting the consent condition into the segment means the number you see while building is the number that actually receives it.',
      },
      { kind: 'h2', id: 'lead-scores', text: 'Lead scores' },
      {
        kind: 'p',
        text:
          'Lead scores rank contacts by engagement using waterfall rules you define, which surfaces high-intent contacts who have not ordered yet — a group order-history segments cannot see at all. Scores also sort the inbox so your team answers the most valuable conversations first.',
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Abandoned carts live elsewhere',
        body:
          'Cart leads are under [Store growth](/docs/reference/store-growth), and the automations that message them are [Journeys](/docs/reference/journeys). Audience holds the people, not the carts.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Segment your customers',
            href: '/docs/guides/segment-your-customers',
            note: 'Segments worth building first.',
          },
          {
            label: 'Collect opt-in',
            href: '/docs/guides/website-opt-in',
            note: 'How contacts get here.',
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
        question: 'Why is a contact missing from Audience after they opted in?',
        answer:
          'Search by the exact number both with and without the country code, and allow a minute or two for the write. If it still is not there, confirm the opt-in tool is Published rather than a draft — a draft can preview without recording anything.',
      },
      {
        question: 'Can I import a customer list into Audience?',
        answer:
          'Yes, by CSV, and you attest that every row opted in. That attestation is recorded against the import. Never import a list you did not collect yourself — messaging it produces blocks and reports that damage your business number.',
      },
    ],
  },

  {
    slug: 'reference/campaigns',
    group: 'reference',
    navLabel: 'Campaigns',
    title: 'Campaigns reference: broadcasts and preflight',
    description:
      'Reference for Campaigns — audience sources, template selection, the preflight checks, batching and pacing, scheduling, and the delivery metrics per campaign.',
    h1: 'Campaigns',
    lead:
      'One-time broadcasts on WhatsApp or email. Timed follow-ups belong in Journeys — campaigns are for the send you decide to make today.',
    keywords: [
      'WhatsApp broadcast campaign',
      'campaign preflight opt-in check',
      'WhatsApp bulk send pacing',
      'marketing template campaign',
      'campaign delivery metrics',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/marketing-hub/campaigns', label: 'Open Campaigns' },
    blocks: [
      {
        kind: 'answer',
        text:
          'A campaign is one channel, one audience and one template. Preflight checks consent coverage and template readiness before anything sends, and sends are batched and paced rather than fired at once so your WhatsApp quality rating survives the campaign.',
      },
      { kind: 'h2', id: 'builder', text: 'The builder, field by field' },
      {
        kind: 'table',
        columns: ['Field', 'Notes'],
        rows: [
          ['Name', 'Internal only. Name it so you recognise it in a results table weeks later.'],
          ['Channel', 'WhatsApp or email, one per campaign. For both, send two and keep audiences from overlapping.'],
          [
            'Audience',
            'A saved segment, a lead-score band, a CSV with attested consent, or a manual selection.',
          ],
          [
            'Template',
            'Approved **Marketing** templates only. Utility templates cannot power broadcasts.',
          ],
          ['Schedule', 'Send now, or schedule for a future time.'],
        ],
      },
      { kind: 'h2', id: 'preflight', text: 'Preflight' },
      {
        kind: 'p',
        text:
          'Preflight runs before a launch and will block it. It is the most useful thing in the product, because the damage from a bad broadcast is invisible on the day and expensive for weeks.',
      },
      {
        kind: 'list',
        items: [
          '**Consent coverage** — blocks the launch when too much of the audience has no recorded consent or has opted out.',
          '**Template readiness** — the template must be approved and its variables mapped.',
          '**Audience size** — confirms the count that will actually receive it, after exclusions.',
          '**Send allowance** — warns when the campaign would exceed your plan’s remaining cycle allowance.',
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'A blocked preflight is doing its job',
        body:
          'Fix the audience, not the check. Blocks and reports from non-consented recipients lower your quality rating, which cuts how many customers you may message per day for weeks afterwards.',
      },
      { kind: 'h2', id: 'sending', text: 'Batching, pacing and priority' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Batching',
            definition:
              'Large audiences are processed in batches rather than all at once, so a big campaign does not block everything else in the queue.',
          },
          {
            term: 'Meta pacing',
            definition:
              'Sends are rate-limited to stay inside Meta’s limits and protect your account. This applies on every plan and is not something a higher plan removes.',
          },
          {
            term: 'Send priority',
            definition:
              'Higher plans are dequeued ahead of lower ones when the queue is busy. It changes ordering, not the Meta rate limit.',
          },
        ],
      },
      { kind: 'h2', id: 'metrics', text: 'Reading the results' },
      {
        kind: 'table',
        columns: ['Metric', 'What it means'],
        rows: [
          ['Sent', 'Accepted by Meta for delivery.'],
          ['Delivered', 'Reached the customer’s phone.'],
          ['Read', 'Opened. Expect this to be far higher than email open rates.'],
          ['Failed', 'Rejected — usually an invalid number or a contact who blocked you.'],
          ['Revenue', 'Orders attributed to the campaign on last touch.'],
        ],
      },
      {
        kind: 'p',
        text:
          'A large gap between sent and delivered means list quality, not a platform problem. Clean the invalid numbers out before your next send.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Send a broadcast',
            href: '/docs/guides/whatsapp-broadcast',
            note: 'The guided version of this page.',
          },
          { label: 'Email', href: '/docs/reference/email', note: 'The email channel.' },
          {
            label: 'Conversation pricing',
            href: '/docs/platform/conversation-pricing',
            note: 'What a broadcast costs.',
          },
          {
            label: 'Campaigns feature page',
            href: '/features/campaigns',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a campaign and a journey?',
        answer:
          'A campaign is a one-time send you decide to make, to an audience you pick, now or at a scheduled time. A journey is automation that runs whenever a Shopify event happens, for as long as it is published, without you touching it again.',
      },
      {
        question: 'Can one campaign send on both WhatsApp and email?',
        answer:
          'No, one channel per campaign. To cover both, create two campaigns and keep the audiences from overlapping, so the same customer does not get the same message twice on two channels within minutes.',
      },
    ],
  },

  {
    slug: 'reference/email',
    group: 'reference',
    navLabel: 'Email',
    title: 'Email reference: Gmail sending and templates',
    description:
      'Reference for the TopEdge email channel — connecting Gmail, the template studio, merge variables, and sending email alongside WhatsApp in journeys.',
    h1: 'Email',
    lead:
      'Email is the second channel, not the main one. It covers the customers you have no WhatsApp consent for, and carries the layouts WhatsApp cannot — a full cart with images, or a long policy explanation.',
    keywords: [
      'Gmail Shopify email automation',
      'cart recovery email template',
      'email merge variables Shopify',
      'WhatsApp and email automation',
      'transactional email Shopify',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/marketing-hub/email', label: 'Open email' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Connect Gmail with Google OAuth and email sends from your own mailbox. Templates are edited in a studio with live merge previews, and journey nodes can send a matching email alongside each WhatsApp step — useful when a contact has no WhatsApp consent.',
      },
      {
        kind: 'prereqs',
        items: [
          'A Google or Google Workspace mailbox you are willing to send from.',
          'Shopify connected, if you want live product images in cart emails.',
        ],
      },
      { kind: 'h2', id: 'connect-gmail', text: 'Connecting Gmail' },
      {
        kind: 'steps',
        steps: [
          {
            title: 'Open the email channel',
            body: 'Settings → Connections → Gmail, or Campaigns → Email → Connect Gmail.',
          },
          {
            title: 'Approve Google OAuth',
            body:
              'Sign in and grant send permission. Use the OAuth flow rather than any app-password workaround — Workspace policies commonly block the latter.',
          },
          {
            title: 'Send yourself a test',
            body: 'Confirm the message arrives and that the From address is the one you expect customers to see.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Email steps block a journey publish',
        body:
          'A journey containing an email node cannot be published or enrolled while Gmail is disconnected. Connect it first, or remove the email node.',
      },
      { kind: 'h2', id: 'templates', text: 'The template studio' },
      {
        kind: 'p',
        text:
          'Templates are edited in a full studio with subject, HTML body and a live preview. Built-in cart and order emails pull real product images from your catalogue when Shopify is connected, so the preview matches what customers receive.',
      },
      {
        kind: 'table',
        caption: 'Merge variables you will use most',
        columns: ['Variable', 'Fills with'],
        rows: [
          ['`{{first_name}}`', 'The customer’s first name.'],
          ['`{{store_name}}`', 'Your store name from brand settings.'],
          ['`{{cart_items_html}}`', 'The abandoned cart rendered as a product list with images.'],
          ['`{{order_id}}`', 'The order number.'],
          ['`{{checkout_url}}`', 'A link back to the abandoned checkout.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'No Meta approval for email',
        body:
          'Email templates are yours to change and send immediately — there is no review queue. That makes email the right place to iterate on copy before committing a version to a WhatsApp template.',
      },
      { kind: 'h2', id: 'where-email-wins', text: 'Where email beats WhatsApp' },
      {
        kind: 'table',
        columns: ['Situation', 'Why email'],
        rows: [
          ['No WhatsApp consent', 'Email reaches contacts you are not allowed to message on WhatsApp.'],
          ['A full cart with images', 'A rich layout reads better in an inbox than in a chat bubble.'],
          ['Long explanations', 'Policies and apologies need more room than a chat message.'],
          ['Cost-sensitive volume', 'There is no per-conversation fee on email.'],
        ],
      },
      {
        kind: 'p',
        text:
          'Coordinate the two so a customer with both consents does not get the same reminder twice. More on channel choice in [WhatsApp vs email for D2C India](/blog/ecommerce-automation-whatsapp-vs-email-india).',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Campaigns',
            href: '/docs/reference/campaigns',
            note: 'Sending an email broadcast.',
          },
          {
            label: 'Abandoned cart recovery',
            href: '/docs/guides/abandoned-cart-recovery',
            note: 'Adding email to the ladder.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does TopEdge send email from its own servers?',
        answer:
          'No, it sends through your connected Gmail or Google Workspace mailbox, so the From address is your own and your existing domain reputation applies. That also means your mailbox provider’s sending limits apply to campaign volume.',
      },
      {
        question: 'Why will my journey not publish with an email step?',
        answer:
          'Because Gmail is not connected. A journey containing an email node is blocked at publish rather than failing silently at send time. Connect Gmail in Settings, or remove the email node from the journey.',
      },
    ],
  },

  {
    slug: 'reference/meta-manager',
    group: 'reference',
    navLabel: 'Meta Manager',
    title: 'Meta Manager reference: templates and catalog',
    description:
      'Reference for Meta Manager — creating WhatsApp templates, blueprints for journeys, submitting for approval, syncing from Meta, the product catalog and QR codes.',
    h1: 'Meta Manager',
    lead:
      'Everything that has to pass through Meta before a customer sees it. Templates are created and submitted here, and nothing in Journeys or Campaigns can send without an approved one.',
    keywords: [
      'WhatsApp template library',
      'Meta template approval',
      'WhatsApp template variables',
      'WhatsApp product catalog',
      'WhatsApp QR code',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/meta-manager/library', label: 'Open Meta Manager' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Meta Manager has four areas: the template Library, Blueprints (pre-built template packs matched to journeys), the WhatsApp product Catalog, and QR codes. Templates move draft → submitted → approved or rejected, and only approved templates appear in journey and campaign pickers.',
      },
      { kind: 'h2', id: 'library', text: 'Library' },
      {
        kind: 'diagram',
        name: 'template-approval',
        title: 'A template from draft to live send',
        caption: 'Approval is usually minutes. Budget up to 24 hours for a first submission.',
      },
      {
        kind: 'table',
        columns: ['Status', 'What it means'],
        rows: [
          ['Draft', 'Yours, not yet submitted. Invisible to customers and to journey pickers.'],
          ['Pending', 'With Meta for review. Nothing can send yet.'],
          ['Approved', 'Usable. Appears in journey and campaign pickers.'],
          ['Rejected', 'Meta’s reason is on the row. Edit and resubmit.'],
          ['Paused or disabled', 'Meta restricted it after approval, usually for quality. It stops sending.'],
        ],
      },
      { kind: 'h3', id: 'naming-and-variables', text: 'Naming and variables' },
      {
        kind: 'list',
        items: [
          'Template names are `lowercase_with_underscores` — no spaces.',
          'Write variables as named fields like `{{first_name}}` and `{{product_name}}`; they are converted to Meta’s numbered placeholders on submission.',
          'Every variable has to be mapped to a data field, or it sends blank.',
          'A header image can be a static upload or **live product** — the highest-value item in the cart or order, fetched at send time.',
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Category is the most common rejection cause',
        body:
          'Utility is for order and shipping updates and must contain no promotional language. Marketing is for anything promotional and requires consent. Authentication is for one-time passcodes only. Put a discount in a Utility template and it will be rejected.',
      },
      { kind: 'h2', id: 'blueprints', text: 'Blueprints' },
      {
        kind: 'p',
        text:
          'Blueprints are template packs that match what Journeys expects — copy, header type, variable mappings and buttons already in place. Create from the blueprint, submit, and the journey node that needs it will find it.',
      },
      {
        kind: 'table',
        columns: ['Blueprint', 'Contains'],
        rows: [
          [
            'Cart recovery',
            'Three WhatsApp templates with a live product header and checkout button, plus matching emails.',
          ],
          ['Order lifecycle', 'Confirmed, shipped, out for delivery and delivered, with a tracking button.'],
          ['COD → prepaid', 'A confirmation template with buttons, plus the payment-link follow-up.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Create all three cart templates before going live',
        body:
          'A cart journey with only the first template approved sends one reminder and then stops silently part-way through the ladder.',
      },
      { kind: 'h2', id: 'sync', text: 'Sync from Meta' },
      {
        kind: 'p',
        text:
          'Templates created directly in Meta Business Manager do not appear automatically. **Sync from Meta** pulls them in, and also refreshes statuses that look stale. Templates are scoped to a WhatsApp Business Account, so an empty library after syncing almost always means you are connected to the wrong one.',
      },
      { kind: 'h2', id: 'catalog-qr', text: 'Catalog and QR codes' },
      {
        kind: 'table',
        columns: ['Area', 'What it does'],
        rows: [
          [
            'Catalog',
            'Imports products from Meta or Shopify so flows and templates can show product cards. Refresh after catalogue changes.',
          ],
          [
            'QR codes',
            'Generates a WhatsApp QR that opens a chat with a prefilled message. Download the PNG for packaging, print or ads.',
          ],
        ],
      },
      {
        kind: 'p',
        text:
          'A QR on packaging is the cheapest opt-in channel you have — the customer starts the conversation, which both captures them and opens the 24-hour window.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Message templates',
            href: '/docs/platform/message-templates',
            note: 'Categories, rules and rejection reasons.',
          },
          {
            label: 'Journeys',
            href: '/docs/reference/journeys',
            note: 'Where templates get used.',
          },
          {
            label: 'Writing templates that pass',
            href: '/blog/meta-whatsapp-cloud-api-shopify-templates',
            note: 'Copy patterns that get approved.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does WhatsApp template approval take?',
        answer:
          'Usually minutes, but a first submission can take up to 24 hours. Plan around it: get your templates approved before you intend to launch, not on the morning you want the journey live.',
      },
      {
        question: 'Why is my template library empty?',
        answer:
          'Templates belong to a specific WhatsApp Business Account. An empty library after a Sync from Meta nearly always means TopEdge is connected to a different WABA than the one holding your templates. Check which account the connection names and reconnect.',
      },
      {
        question: 'Why was my Utility template rejected?',
        answer:
          'Almost always promotional language. Words like sale, discount, offer, percent off or free gift move a template into the Marketing category in Meta’s eyes. Rewrite it to read as a pure order update, or resubmit it as Marketing.',
      },
    ],
  },

  {
    slug: 'reference/opt-in-tools',
    group: 'reference',
    navLabel: 'Opt-in tools',
    title: 'Opt-in tools reference: popups and widgets',
    description:
      'Reference for opt-in tools — popup, spin wheel, mystery discount and WhatsApp widget, their display rules, publishing, app embed install and per-tool reports.',
    h1: 'Opt-in tools',
    lead:
      'Storefront capture. Four tool types, one editor, and one install step in your Shopify theme — plus the display rules that decide whether anyone ever sees them.',
    keywords: [
      'Shopify opt-in popup',
      'spin wheel discount Shopify',
      'WhatsApp widget Shopify',
      'storefront phone capture',
      'Shopify app embed opt-in',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/opt-in-tools', label: 'Open opt-in tools' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Create a popup, spin wheel, mystery discount or WhatsApp widget, set its design, consent wording and display rules, then publish and enable the TopEdge opt-in app embed on your live Shopify theme. Each tool has its own report showing impressions and submissions.',
      },
      { kind: 'h2', id: 'tool-types', text: 'Tool types' },
      {
        kind: 'table',
        columns: ['Type', 'What it is', 'Best for'],
        rows: [
          ['Popup', 'Email or phone capture in a standard, side-image or full-background layout.', 'The default.'],
          ['Spin wheel', 'A gamified wheel that reveals a discount after consent.', 'Consumer brands; highest capture rate.'],
          ['Mystery discount', 'Scratch or tap to reveal an offer.', 'A lighter alternative to the wheel.'],
          ['WhatsApp widget', 'A launcher that opens a chat with your business number.', 'High-intent capture with no interruption.'],
        ],
      },
      { kind: 'h2', id: 'editor', text: 'The editor' },
      {
        kind: 'table',
        columns: ['Setting', 'Notes'],
        rows: [
          ['Design', 'Brand colours, headline, body copy, and which fields you collect.'],
          [
            'Consent copy',
            'Must state the customer agrees to receive WhatsApp marketing from your store. This is the record you rely on later.',
          ],
          ['Discount code', 'Optional. For the wheel and mystery types, this is the reveal.'],
          ['Trigger delay', 'Seconds before it appears. Five seconds is a reasonable default.'],
          ['Page rules', 'All pages, or URL contains. Strict rules are the usual reason a tool "never shows".'],
          ['Device rules', 'Mobile, desktop or both. Most Indian D2C traffic is mobile.'],
          ['Preview', 'Live preview beside the editor, switchable between mobile and desktop.'],
        ],
      },
      { kind: 'h2', id: 'publishing', text: 'Publishing and install' },
      {
        kind: 'steps',
        steps: [
          {
            title: 'Publish the tool',
            body: 'Status must read Published. A draft never renders on the storefront.',
          },
          {
            title: 'Enable the app embed',
            body:
              'Shopify admin → Online Store → Themes → Customize on the **live** theme → App embeds → enable TopEdge Opt-In → Save.',
            note: 'No theme file is edited, and nothing is left behind when you disable it.',
          },
          {
            title: 'Test in incognito with blockers off',
            body: 'Hard-refresh after publishing. Ad blockers hide popups, which looks identical to a broken install.',
          },
        ],
      },
      { kind: 'h2', id: 'reports', text: 'Per-tool reports' },
      {
        kind: 'p',
        text:
          'Each tool has a report with impressions and submissions, so you can compare a wheel against a plain popup on the same traffic rather than guessing. Captured contacts land in [Audience](/docs/reference/audience-crm) with the tool recorded as their source.',
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Footers use your policies, not ours',
        body:
          'Tool footers link to your store’s privacy and terms from brand settings, with an optional per-tool override. They never point at TopEdge’s own legal pages.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Collect opt-in',
            href: '/docs/guides/website-opt-in',
            note: 'The guided version of this page.',
          },
          {
            label: 'Audience',
            href: '/docs/reference/audience-crm',
            note: 'Where captured contacts land.',
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
        question: 'Does the opt-in popup require editing my Shopify theme?',
        answer:
          'No. It installs through a Shopify app embed that you enable in the theme editor, so no theme file is modified and nothing is left behind if you disable it later. The embed has to be enabled on your live theme, not a preview.',
      },
      {
        question: 'Which opt-in tool converts best?',
        answer:
          'Spin wheels usually capture the most contacts on consumer brands, but the WhatsApp widget captures the highest-intent ones because the customer starts the conversation. Each tool has its own report, so compare them on your own traffic rather than trusting averages.',
      },
    ],
  },

  {
    slug: 'reference/ai-brain',
    group: 'reference',
    navLabel: 'AI brain',
    title: 'AI brain reference: intents, knowledge, persona',
    description:
      'Reference for the AI brain — bringing your own Gemini or OpenAI key, store knowledge, bot persona, intent training, intent actions and the confidence test tool.',
    h1: 'AI brain',
    lead:
      'Two things working together: intents that recognise what a customer is asking, and store knowledge that grounds the answer. Without the knowledge, a confident model invents your return policy.',
    keywords: [
      'WhatsApp AI chatbot Shopify',
      'intent detection training',
      'AI store knowledge base',
      'bring your own OpenAI key',
      'bot persona WhatsApp',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/intelligence-hub/intents', label: 'Open intents' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Add your own Gemini or OpenAI key, then fill store knowledge and persona under Intelligence → AI, and train intents under Intelligence → Intents. Each intent holds example phrases and an action — reply, start a flow, assign an agent, or escalate. Inactive intents never match in production.',
      },
      { kind: 'h2', id: 'byok', text: 'Bring your own key' },
      {
        kind: 'p',
        text:
          'The AI runs on your own Gemini or OpenAI key, added under Intelligence → AI. Model usage is billed to you by that provider, and you are never tied to a model TopEdge chose. Keyword-matched intents with fixed replies work with no key at all.',
      },
      { kind: 'h2', id: 'knowledge', text: 'Store knowledge' },
      {
        kind: 'p',
        text:
          'This is what the AI is allowed to know. Anything missing is where invention happens, so state the limits as explicitly as the capabilities.',
      },
      {
        kind: 'list',
        items: [
          'Shipping — dispatch time, delivery time by region, couriers, and what happens when an order is late.',
          'Returns and exchanges — window, condition requirements, who pays return shipping, how refunds are issued.',
          'Payments — accepted methods, COD availability and any COD fee.',
          'Sizing, materials and care — whatever your category is always asked.',
          'What you do **not** offer — no international shipping, no exchange on sale items.',
        ],
      },
      { kind: 'h2', id: 'persona', text: 'Persona' },
      {
        kind: 'p',
        text:
          'Sets the assistant’s name and tone. Keep it close to how your brand already writes. A quirky persona reads badly on a complaint, which is exactly when tone matters most.',
      },
      { kind: 'h2', id: 'intents', text: 'Intents' },
      {
        kind: 'table',
        columns: ['Field', 'Notes'],
        rows: [
          ['Name', 'What the customer is asking, such as "Shipping time".'],
          [
            'Example phrases',
            'Five to ten, in customers’ real words — Hinglish, abbreviations and typos included.',
          ],
          ['Action', 'Reply with text, start a flow, assign to an agent, or escalate.'],
          ['Active toggle', 'Off means it never matches in production, however well trained it is.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Route money and complaints to a human',
        body:
          'A confidently wrong answer about a refund or a delivery date costs far more than the time it saved. Make refunds, complaints and anything legal escalate by design.',
      },
      { kind: 'h2', id: 'test-tool', text: 'The test tool' },
      {
        kind: 'table',
        columns: ['Result', 'What to do'],
        rows: [
          ['Right intent, high confidence', 'Nothing.'],
          ['Right intent, low confidence', 'Add three to five more phrases worded like the test message.'],
          ['Wrong intent', 'Two intents compete — split them, or deactivate the duplicate.'],
          ['No match', 'Expected for new questions. Make sure your flow fallback reaches a human.'],
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Train the AI brain',
            href: '/docs/guides/train-your-ai-brain',
            note: 'The guided version of this page.',
          },
          {
            label: 'Flow Builder',
            href: '/docs/reference/flow-builder',
            note: 'The fallback router.',
          },
          {
            label: 'AI brain feature page',
            href: '/features/ai-brain',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I use the AI brain without an OpenAI or Gemini key?',
        answer:
          'Partly. Intents that match on keywords and reply with fixed text work without any key. Generated answers grounded in your store knowledge need a key, because that is where the model call happens — and it is billed to you by your provider.',
      },
      {
        question: 'Why does my intent match with low confidence?',
        answer:
          'The example phrases are worded the way you write, not the way customers do. Real messages are short, unpunctuated and often Hinglish. Paste five more phrases straight from your inbox and the score moves immediately.',
      },
    ],
  },

  {
    slug: 'reference/chat-rules',
    group: 'reference',
    navLabel: 'Chat rules',
    title: 'Chat rules reference: routing and escalation',
    description:
      'Reference for Automation Hub — routing conversations to agents, escalation conditions, and the smart rules engine where it is enabled on your workspace.',
    h1: 'Chat rules and routing',
    lead:
      'Who answers which conversation, and when a thread stops waiting for the bot. Routing is what stops an inbox of fifty threads becoming one person’s problem.',
    keywords: [
      'WhatsApp conversation routing',
      'agent assignment rules',
      'chat escalation WhatsApp',
      'support routing Shopify',
      'inbox automation rules',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/automation-hub', label: 'Open Automation Hub' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Automation Hub holds routing — which agent or queue a conversation goes to, and the conditions that escalate it out of the bot. A smart rules engine for broader condition-and-action automation is available on workspaces where it is enabled.',
      },
      {
        kind: 'prereqs',
        items: [
          'WhatsApp connected, so there are real conversations to route.',
          'Team members invited, if you want to route to named agents — see [Settings](/docs/reference/settings-billing).',
        ],
      },
      { kind: 'h2', id: 'routing', text: 'Routing' },
      {
        kind: 'p',
        text:
          'Routing decides where a conversation lands once it needs a human. Without it every thread sits in one shared queue and gets picked up by whoever happens to look, which is how conversations go unanswered on a busy day.',
      },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Assignment',
            definition:
              'Gives a conversation an owner, so it leaves the unowned queue and appears under that agent’s filter in [Live Chat](/docs/reference/live-chat).',
          },
          {
            term: 'Escalation',
            definition:
              'Takes a thread out of automation and puts it in front of a human — triggered by an intent, a keyword, or a customer asking for a person.',
          },
          {
            term: 'Queues',
            definition:
              'Group conversations so a team rather than an individual owns them, which survives one person being on leave.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Always give customers a way to a human',
        body:
          'Make "talk to someone" an explicit option in your flow and an escalating intent in your AI brain. Customers who cannot find the exit send three more messages and then leave a review about it.',
      },
      { kind: 'h2', id: 'rules-engine', text: 'The smart rules engine' },
      {
        kind: 'p',
        text:
          'Where enabled, a second tab adds condition-and-action rules across conversations — tagging, assigning or escalating based on what a thread contains. If your Automation Hub shows only Routing, the rules engine is not switched on for your workspace yet.',
      },
      { kind: 'h2', id: 'what-belongs-where', text: 'What belongs where' },
      {
        kind: 'table',
        columns: ['You want to…', 'Use'],
        rows: [
          ['Answer a predictable question automatically', '[Flow Builder](/docs/reference/flow-builder)'],
          ['Recognise a question phrased many ways', '[AI brain](/docs/reference/ai-brain) intents'],
          ['Decide which agent handles a thread', 'Routing, here'],
          ['Message a customer because of a Shopify event', '[Journeys](/docs/reference/journeys)'],
          ['Send a one-off promotion', '[Campaigns](/docs/reference/campaigns)'],
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Live Chat',
            href: '/docs/reference/live-chat',
            note: 'Where routed threads arrive.',
          },
          {
            label: 'Inbox and handover',
            href: '/docs/guides/shared-inbox-handover',
            note: 'Working the queue.',
          },
          {
            label: 'Chat rules feature page',
            href: '/features/chat-rules',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does my Automation Hub only show a Routing tab?',
        answer:
          'The smart rules engine is rolled out per workspace. If only Routing appears, the rules tab is not enabled for you yet — routing, assignment and escalation all still work, and anything more complex can be handled with a condition node in Flow Builder.',
      },
    ],
  },

  {
    slug: 'reference/analytics',
    group: 'reference',
    navLabel: 'Analytics',
    title: 'Analytics reference: revenue, team, delivery',
    description:
      'Reference for Insights — revenue and recovery analytics, team performance, delivery and RTO reporting, and how attribution windows change the numbers.',
    h1: 'Analytics',
    lead:
      'Three reports that answer three different questions: did the automation make money, is the team keeping up, and are orders actually arriving.',
    keywords: [
      'WhatsApp automation analytics',
      'cart recovery revenue report',
      'RTO delivery analytics Shopify',
      'support team performance WhatsApp',
      'attribution window ecommerce',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/insights-hub/analytics', label: 'Open analytics' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Insights has three screens: Analytics for revenue, recovery and campaign performance; Team performance for agent response and resolution; and Delivery & RTO for fulfilment outcomes. Revenue figures use last-touch attribution over a seven-day window, which is why they will not match a click-only report.',
      },
      { kind: 'h2', id: 'analytics-screen', text: 'Analytics' },
      {
        kind: 'table',
        columns: ['Metric', 'What it actually measures'],
        rows: [
          ['Recovered revenue', 'Orders attributed to a recovery journey on last touch within seven days.'],
          ['Campaign revenue', 'Orders attributed to a broadcast on the same basis.'],
          ['Messages sent and delivered', 'Volume, by channel. Useful for cost, not for performance.'],
          ['Read rate', 'Share of delivered messages opened. Expect it to be far above email.'],
          ['Reply rate', 'The number that predicts revenue best — it means a conversation started.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Why these numbers differ from Shopify',
        body:
          'Shopify’s total sales includes shipping and tax; store economics reports net of cost. Attribution windows differ too. Compare the same window and the same definition before concluding anything has drifted.',
      },
      { kind: 'h2', id: 'team-performance', text: 'Team performance' },
      {
        kind: 'p',
        text:
          'Per-agent response time, resolution counts and conversation volume. The useful read is not who answered most, but whether first-response time holds up at your busiest hour — that is when customers leave.',
      },
      { kind: 'h2', id: 'delivery-rto', text: 'Delivery and RTO' },
      {
        kind: 'p',
        text:
          'Fulfilment outcomes: delivered, returned to origin, and the share of each by payment method. This is where you find out whether [COD confirmation](/docs/guides/cod-confirmation) is working, since prepaid and confirmed-COD orders should return at visibly different rates.',
      },
      {
        kind: 'table',
        columns: ['Cut', 'Why it matters'],
        rows: [
          ['RTO by payment method', 'COD versus prepaid. The gap is your conversion opportunity.'],
          ['RTO by region', 'Some pin codes are structurally worse. Price or restrict accordingly.'],
          ['RTO by product', 'A single product driving returns is usually a sizing or expectation problem.'],
          ['Delivery time', 'Promise this, not your best case. Late delivery drives both RTO and support volume.'],
        ],
      },
      { kind: 'h2', id: 'honest-numbers', text: 'Reading these honestly' },
      {
        kind: 'list',
        items: [
          '**Attribution is last touch, seven days.** It credits reminders customers acted on without clicking, and it will over-credit if you send a lot.',
          '**Sent is not a result.** A chart of messages sent measures your spending, not your return.',
          '**Compare like windows.** Month-on-month across a sale period tells you about the sale, not the automation.',
          '**Zero recovered revenue with real sends** means nobody has completed a checkout after a message yet — not that attribution is broken.',
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Store growth',
            href: '/docs/reference/store-growth',
            note: 'Cart-level recovery detail.',
          },
          {
            label: 'Commerce and economics',
            href: '/docs/reference/commerce',
            note: 'True margin after costs.',
          },
          {
            label: 'Analytics feature page',
            href: '/features/analytics',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is recovered revenue different from what I expected?',
        answer:
          'Attribution is last touch within seven days, so a customer who received a reminder and then came back to your site directly still counts. That is deliberate — click-only attribution badly under-counts WhatsApp, where people often act without tapping the link.',
      },
      {
        question: 'Why do TopEdge numbers not match Shopify analytics?',
        answer:
          'Different definitions. Shopify total sales includes shipping and tax, while store economics reports net of cost of goods, shipping and fees. Check you are comparing the same date range and the same measure before assuming a sync problem.',
      },
    ],
  },

  {
    slug: 'reference/store-growth',
    group: 'reference',
    navLabel: 'Store growth',
    title: 'Store growth reference: tracking and carts',
    description:
      'Reference for Store growth — website tracking layers, abandoned cart columns, product and action insights, stock tracking, and third-party checkout webhooks.',
    h1: 'Store growth',
    lead:
      'Everything that happens on your storefront before an order exists: the tracking that captures it, the abandoned carts it produces, and what those carts tell you.',
    keywords: [
      'Shopify abandoned cart tracking',
      'web pixel checkout extension',
      'cart lead phone capture',
      'third party checkout webhook',
      'Shopify stock tracking',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/store-growth-hub/abandoned-carts', label: 'Open store growth' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Store growth has four screens: Website tracking (install and health of the three storefront layers), Abandoned carts (captured carts and their recovery state), Insights (product and action signals) and Stock. Tracking has to be green before any cart arrives with a phone number.',
      },
      { kind: 'h2', id: 'tracking', text: 'Website tracking' },
      {
        kind: 'diagram',
        name: 'tracking-layers',
        title: 'The three layers',
        caption: 'The checkout extension is the one that captures the phone number.',
      },
      {
        kind: 'table',
        columns: ['Layer', 'What it does', 'Installed by'],
        rows: [
          [
            'Theme app embed',
            'Storefront page and product-view events.',
            'One-click install, then enable the embed in the theme editor.',
          ],
          [
            'Web pixel extension',
            'Cart and browse events through Shopify’s pixel framework.',
            'One-click install.',
          ],
          [
            'Checkout extension',
            'Captures the phone number entered at Shopify native checkout.',
            'One-click install.',
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'The live theme, not a preview',
        body:
          'The app embed has to be enabled on your published theme. Enabling it on a preview or duplicate theme is the most common reason tracking reports healthy and still captures nothing.',
      },
      { kind: 'h3', id: 'third-party-checkout', text: 'Third-party checkout' },
      {
        kind: 'p',
        text:
          'One-page and COD-optimised checkouts replace Shopify’s native checkout, so the checkout extension never runs. Use the third-party checkout section to copy a webhook URL into your provider’s dashboard, then run a test abandonment through their flow and confirm the phone reaches TopEdge.',
      },
      { kind: 'h3', id: 'custom-phone-inputs', text: 'Custom phone and OTP pages' },
      {
        kind: 'code',
        language: 'html',
        code: '<input type="tel" autocomplete="tel" data-topedge-phone="true" />',
        caption:
          'A hand-built login or OTP step is not detected automatically. Either attribute is enough to make it readable.',
      },
      { kind: 'h2', id: 'abandoned-carts', text: 'Abandoned carts' },
      {
        kind: 'table',
        columns: ['Column', 'What it means'],
        rows: [
          ['Phone or email', 'Required for recovery. Blank means capture failed, not that recovery is broken.'],
          ['Cart value', 'What they left behind. Useful as a journey filter.'],
          ['Recovery ticks', 'Which messages in the ladder have been sent — 1, 2, 3.'],
          ['Recovered', 'An order was completed after abandonment, with revenue attributed.'],
          ['Open in Shopify', 'Jumps to the checkout or customer in Shopify admin.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'This screen does not send anything',
        body:
          'Abandoned carts is the record. The messages come from a [cart abandoned journey](/docs/guides/abandoned-cart-recovery), and if that journey is in Draft this screen fills up while nothing sends.',
      },
      { kind: 'h2', id: 'insights-stock', text: 'Insights and Stock' },
      {
        kind: 'table',
        columns: ['Screen', 'What it gives you'],
        rows: [
          [
            'Insights',
            'Product-level signals — what is viewed, added and abandoned most — plus suggested actions.',
          ],
          [
            'Stock',
            'Inventory levels pulled from Shopify, with the ability to set quantities. Useful for spotting the out-of-stock product your ads are still driving traffic to.',
          ],
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Abandoned cart recovery',
            href: '/docs/guides/abandoned-cart-recovery',
            note: 'Turning carts into messages.',
          },
          {
            label: 'Connect Shopify',
            href: '/docs/connect-shopify',
            note: 'The permissions tracking needs.',
          },
          {
            label: 'Tracking pixel feature page',
            href: '/features/analytics',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why do my abandoned carts have no phone number?',
        answer:
          'The customer left before reaching a step that collects one, or the checkout extension is not capturing. Adding to cart alone never yields a phone number. On a third-party checkout you need the partner webhook instead, since Shopify checkout extensions do not run there.',
      },
      {
        question: 'Does website tracking slow down my storefront?',
        answer:
          'It installs through Shopify’s app embed and web pixel frameworks, which load asynchronously outside your theme’s critical path. Nothing is written into theme files, so removing it is a toggle in the theme editor rather than a code cleanup.',
      },
    ],
  },

  {
    slug: 'reference/commerce',
    group: 'reference',
    navLabel: 'Commerce',
    title: 'Commerce reference: products, margins, discounts',
    description:
      'Reference for the commerce hub — product catalogue sync, store economics with cost of goods and RTO, and Shopify discount codes used in automations.',
    h1: 'Commerce',
    lead:
      'The commercial side: your catalogue, what each order actually earns after costs, and the discount codes your automations can hand out.',
    keywords: [
      'Shopify product catalog sync',
      'store economics COGS RTO',
      'true margin Shopify',
      'discount codes WhatsApp automation',
      'profit and loss Shopify D2C',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/commerce-hub/products', label: 'Open commerce hub' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Commerce has three screens: Products (your synced Shopify catalogue), Economics (net margin after cost of goods, shipping, RTO and payment fees) and Discounts (live Shopify codes). Economics needs a one-time cost setup before its numbers mean anything.',
      },
      { kind: 'h2', id: 'products', text: 'Products' },
      {
        kind: 'p',
        text:
          'Your Shopify catalogue, synced. **Sync** refreshes it after store changes. This is what flows, templates and live-chat product cards search against, so a product missing here is missing from your automations too.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Empty after a sync?',
        body:
          'Check the products are published to the Online Store sales channel in Shopify. Unpublished products do not come through.',
      },
      { kind: 'h2', id: 'economics', text: 'Economics' },
      {
        kind: 'p',
        text:
          'Revenue is the easy number. Economics works out what is left, which for Indian D2C is a very different figure once return-to-origin is in it.',
      },
      {
        kind: 'steps',
        howToName: 'Set up store economics for true margin',
        totalTimeMinutes: 20,
        steps: [
          {
            title: 'Run the cost setup',
            body: 'Enter cost of goods, shipping cost, your RTO rate and payment gateway fees.',
            note: 'Estimates are fine to start. A rough RTO rate beats leaving it at zero, which flatters every number downstream.',
          },
          {
            title: 'Pick a period',
            body: 'Choose a date range and read net margin rather than gross revenue.',
          },
          {
            title: 'Find the loss-makers',
            body:
              'Sort by margin. Products with high RTO can be gross-profitable and net-negative, and they are invisible in Shopify’s own reporting.',
          },
        ],
      },
      {
        kind: 'table',
        columns: ['Input', 'Why it changes the answer'],
        rows: [
          ['Cost of goods', 'The obvious one, and usually the only one stores track.'],
          ['Shipping cost', 'Forward shipping per order.'],
          [
            'RTO rate',
            'The expensive one. A returned COD order costs both shipping legs and earns nothing.',
          ],
          ['Payment fees', 'Gateway percentage on prepaid orders.'],
        ],
      },
      { kind: 'h2', id: 'discounts', text: 'Discounts' },
      {
        kind: 'p',
        text:
          'Your live Shopify discount codes, so automations can reference a real code rather than one you typed into a template by hand. Journeys can also issue recovery and COD-conversion codes, which is why the Shopify connection asks for discount permissions.',
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'Check the code before it ships in a template',
        body:
          'A template with an expired or misspelled code sends perfectly and converts nobody, and you only find out from a customer. Verify against this list, not from memory.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Analytics',
            href: '/docs/reference/analytics',
            note: 'Revenue and RTO reporting.',
          },
          {
            label: 'Store growth',
            href: '/docs/reference/store-growth',
            note: 'Tracking and abandoned carts.',
          },
          {
            label: 'Profit and costs feature page',
            href: '/features/profit-loss',
            note: 'What it looks like in the product.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does store economics show a lower margin than Shopify?',
        answer:
          'Because it subtracts costs Shopify does not know about — cost of goods, shipping, payment fees and your return-to-origin rate. Shopify reports revenue and gross sales; economics reports what is actually left after an order has been delivered or returned.',
      },
      {
        question: 'Do I need exact costs to use economics?',
        answer:
          'No. Reasonable estimates are far better than leaving the fields empty, which silently treats every cost as zero. Start with approximate figures, especially for RTO, and refine them once you can see which products the report flags.',
      },
    ],
  },

  {
    slug: 'reference/warranty-hub',
    group: 'reference',
    navLabel: 'Warranty hub',
    title: 'Warranty hub reference: batches and claims',
    description:
      'Reference for the warranty hub — product batches and coverage rules, the public registration portal with WhatsApp OTP, and the claim status workflow.',
    h1: 'Warranty hub',
    lead:
      'Digital warranty for physical products: coverage defined by batch, registration verified over WhatsApp, and claims worked through a status pipeline that messages the customer at each step.',
    keywords: [
      'digital warranty Shopify',
      'warranty claim management',
      'product registration WhatsApp OTP',
      'warranty batch coverage',
      'after sales support Shopify',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/warranty-hub', label: 'Open warranty hub' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Warranty batches link Shopify products to a validity period and coverage rules. Customers register on a public mobile portal, verified by WhatsApp OTP, and their registration is matched to the Shopify order. Claims move through pending, approved, shipped or rejected, and each change messages the customer.',
      },
      {
        kind: 'prereqs',
        items: [
          'Shopify connected — batches reference products and registrations match orders.',
          'WhatsApp connected — the OTP and every claim update send over WhatsApp.',
          'A plan that includes the warranty module.',
        ],
      },
      { kind: 'h2', id: 'batches', text: 'Batches and coverage' },
      {
        kind: 'table',
        columns: ['Setting', 'Notes'],
        rows: [
          ['Products', 'The Shopify products this batch covers. A SKU not in a batch cannot be registered.'],
          ['Validity period', 'Coverage dates. A purchase outside the window will not register.'],
          ['Coverage rules', 'What is covered and what is not. Write the exclusions — they are what you cite on a rejection.'],
          ['Support contacts', 'Phone, email and public claim URL shown to customers on the portal.'],
        ],
      },
      { kind: 'h2', id: 'registration', text: 'The registration portal' },
      {
        kind: 'p',
        text:
          'A public, mobile-first page. The customer picks their product, enters a phone number and verifies it with a WhatsApp OTP — no account and no app. Pair it with a WhatsApp QR from [Meta Manager](/docs/reference/meta-manager) printed on the packaging.',
      },
      { kind: 'h2', id: 'claims', text: 'Claim statuses' },
      {
        kind: 'table',
        columns: ['Status', 'What it means for the customer'],
        rows: [
          ['Pending', 'Awaiting your review. Nothing moves automatically.'],
          ['Approved', 'Accepted — the customer gets a WhatsApp confirmation.'],
          ['Shipped', 'Replacement or repaired unit dispatched, with an update.'],
          ['Rejected', 'Declined with the reason you write, delivered to the customer verbatim.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: 'Registrations are a reorder list',
        body:
          'A registered customer has given you a verified contact and told you which product they own and when they bought it. That is the cleanest possible basis for a consumables reorder or replacement-cycle reminder.',
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Warranty registration guide',
            href: '/docs/guides/warranty-registration',
            note: 'The guided version of this page.',
          },
          {
            label: 'Meta Manager',
            href: '/docs/reference/meta-manager',
            note: 'The packaging QR.',
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
        question: 'Why can a customer not find their product when registering?',
        answer:
          'The SKU is not in any warranty batch, the batch validity period does not cover their purchase date, or the product was added to Shopify after the last sync. Check the batch first, then sync products.',
      },
    ],
  },

  {
    slug: 'reference/settings-billing',
    group: 'reference',
    navLabel: 'Settings and billing',
    title: 'Settings reference: connections, team, billing',
    description:
      'Reference for Settings — workspace and brand identity, channel connections, team access, account security, GST invoices and changing your plan or cycle.',
    h1: 'Settings and billing',
    lead:
      'Where the workspace itself is configured: who you are to customers, which channels are connected, who on your team can do what, and what you pay.',
    keywords: [
      'WhatsApp workspace settings',
      'Shopify WhatsApp connections settings',
      'team access roles',
      'GST invoice download',
      'change plan billing cycle',
    ],
    updated: '2026-10-04',
    dashboard: { route: '/settings', label: 'Open Settings' },
    blocks: [
      {
        kind: 'answer',
        text:
          'Settings is organised by tab: Workspace (brand identity, alert contacts, security), Billing (plan, cycle, invoices) and one tab per connection — WhatsApp, Shopify, Gmail, WhatsApp shop, Meta Ads and Instagram. Brand identity feeds the store name and policy links customers see.',
      },
      { kind: 'h2', id: 'workspace', text: 'Workspace' },
      {
        kind: 'table',
        columns: ['Section', 'What it controls'],
        rows: [
          [
            'Brand identity',
            'Store name, logo and policy links. These appear in message variables and in opt-in tool footers.',
          ],
          ['Alert contacts', 'Who gets notified about failures and quota warnings. Keep a real person here.'],
          ['Account security', 'Password and session controls for your workspace login.'],
          ['Delete workspace', 'Permanent. Export anything you need first.'],
        ],
      },
      { kind: 'h2', id: 'connections', text: 'Connections' },
      {
        kind: 'table',
        columns: ['Tab', 'Purpose', 'Guide'],
        rows: [
          ['WhatsApp', 'Your business number, token and webhook.', '[Connect WhatsApp](/docs/connect-whatsapp)'],
          ['Shopify', 'Store binding, permissions and reconnect.', '[Connect Shopify](/docs/connect-shopify)'],
          ['Gmail', 'The mailbox email sends from.', '[Email](/docs/reference/email)'],
          ['WhatsApp shop', 'The product catalogue shown inside WhatsApp.', '[Meta Manager](/docs/reference/meta-manager)'],
          ['Meta Ads, Instagram', 'Additional Meta surfaces, where available on your workspace.', '—'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: 'A reconnect prompt is not cosmetic',
        body:
          'Until you approve it, the features relying on the new permission silently do nothing. Missing shipped and delivered messages is the usual way merchants discover an unapproved reconnect weeks later.',
      },
      { kind: 'h2', id: 'team', text: 'Team access' },
      {
        kind: 'p',
        text:
          'Invite teammates so inbox replies are attributed to the person who sent them and routing can assign to named agents. Attribution matters more than it sounds — without it, team performance reporting cannot tell you anything.',
      },
      { kind: 'h2', id: 'billing', text: 'Billing' },
      {
        kind: 'p',
        text:
          'Your plan, your billing cycle, your usage against this cycle’s caps, and your invoices. Plan prices and what each tier includes are on [the pricing page](/pricing).',
      },
      { kind: 'planLimits' },
      {
        kind: 'definitions',
        items: [
          {
            term: 'Billing cycle',
            definition:
              'Monthly, quarterly or yearly. Longer cycles are discounted; caps reset per cycle either way.',
          },
          {
            term: 'Usage alerts',
            definition:
              'You are warned as you approach a cap and blocked at it. Alert contacts are who receives the warning.',
          },
          {
            term: 'GST invoices',
            definition: 'Available on every plan, downloadable as PDF from this tab.',
          },
          {
            term: 'Order metering',
            definition:
              'Orders ingested count toward the cycle cap. Cancelling does not refund the count, and a COD order converted to prepaid counts once.',
          },
          {
            term: 'Meta conversation fees',
            definition:
              'Billed by Meta separately from your TopEdge plan — see [conversation pricing](/docs/platform/conversation-pricing).',
          },
        ],
      },
      {
        kind: 'related',
        links: [
          {
            label: 'Plan limits and quotas',
            href: '/docs/platform/limits-and-quotas',
            note: 'What happens at a cap.',
          },
          {
            label: 'Conversation pricing',
            href: '/docs/platform/conversation-pricing',
            note: 'The two bills explained.',
          },
          { label: 'Pricing', href: '/pricing', note: 'Current plan prices.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does cancelling an order give back my order allowance?',
        answer:
          'No. Orders are metered as they are ingested, and cancelling does not refund the count. A COD order that converts to prepaid is the exception worth knowing: TopEdge recognises the replacement, so one purchase is counted once rather than twice.',
      },
      {
        question: 'Can I get GST invoices for TopEdge?',
        answer:
          'Yes, on every plan. Invoices are downloadable as PDFs from the Billing tab in Settings. Plan prices are quoted exclusive of GST, which is added at the applicable rate.',
      },
    ],
  },
];
