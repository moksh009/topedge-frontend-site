import type { TopicBlock } from '../components/topic/TopicBlocks';
import type { JourneyStep } from '../components/journey/JourneyFlow';

/**
 * Worked examples of the journeys TopEdge actually ships.
 *
 * Every trigger, step and template name here is read off
 * `shared/template-catalog.json` in the dashboard repo, not written to sound
 * good. The catalogue carries slot metadata (trigger, step order, canonical
 * Meta name) but no approved body copy, so these pages publish the **shape**
 * of each journey, its Meta category and therefore its cost, rather than
 * fabricating message wording that nobody has had approved.
 *
 * Deliberately not a page: the warranty journey. It is a real automation and a
 * genuine differentiator, but nobody searches for it, and a page that cannot
 * rank and cannot convert is just another URL. It gets a card on the index
 * pointing at /features/warranty instead.
 */
export type JourneyExample = {
  slug: string;
  /** Card copy on the index. */
  cardTitle: string;
  cardBlurb: string;
  /** Shopify trigger name, for the index card. */
  cardTrigger: string;
  /** Meta category of the sends, which sets the cost badge on the card. */
  cardCategory: 'Utility' | 'Marketing';
  /** What the journey is for, in a merchant's words. */
  cardGoal: string;
  /** The number to watch to know it is working. */
  cardMetric: string;
  /**
   * Wide generated scene for the detail-page hero. Richer than `art`, which
   * has to survive being shown at thumbnail size on the index.
   */
  hero: string;
  heroAlt: string;
  /** Real product composition. Kept for reuse elsewhere, not on the hero. */
  image: string;
  imageAlt: string;
  /**
   * Concept illustration, used on the index and as a band inside the article.
   * Generated, so it never depicts product UI or a result: it carries the idea
   * of the journey, while `image` carries the evidence that it exists.
   */
  art: string;
  artAlt: string;
  eyebrow: string;
  h1: string;
  /** Phrase inside h1 to highlight in violet. Must appear in h1 verbatim. */
  h1Accent: string;
  subtitle: string;
  title: string;
  description: string;
  keywords: string;
  answerFirst: string;
  trigger: string;
  triggerNote?: string;
  steps: JourneyStep[];
  blocks: TopicBlock[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

export const JOURNEY_EXAMPLES: JourneyExample[] = [
  {
    slug: 'abandoned-cart-recovery',
    cardTitle: 'Abandoned cart recovery',
    cardBlurb:
      'Three WhatsApp reminders over 72 hours, each with the product photo, price and a one-tap link back to checkout.',
    cardTrigger: 'abandoned_cart',
    cardCategory: 'Marketing',
    cardGoal: 'Recover lost sales',
    cardMetric: 'Recovered revenue',
    image: '/marketing/solutions/sol-fashion-cart-saas.jpg',
    imageAlt:
      'An abandoned cart card showing a linen shirt at \u20b92,499 in size M, beside the WhatsApp recovery message naming the same product, size and price.',
    hero: '/marketing/journeys/hero-abandoned-cart-recovery.webp',
    heroAlt:
      'An isometric scene: a phone showing chat bubbles, a shop checkout counter to one side, and a shopping cart stopped on a winding path that curves back toward the counter.',
    art: '/marketing/journeys/jx-abandoned-cart-recovery.webp',
    artAlt:
      'An isometric illustration of a shop checkout counter with a path leading away to a stalled shopping cart, and message markers along the path pointing it back.',
    eyebrow: 'Journey example',
    h1: 'Abandoned cart recovery journey on WhatsApp',
    h1Accent: 'cart recovery',
    subtitle:
      'Three WhatsApp reminders that bring shoppers back to their cart, with the exact timing, messages and cost per cart.',
    title: 'Abandoned Cart Recovery Journey on WhatsApp for Shopify',
    description:
      'The 3-step WhatsApp abandoned cart recovery journey for Shopify India: triggers, timing, Meta template categories and the ₹ cost per recovered cart.',
    keywords:
      'abandoned cart recovery WhatsApp, WhatsApp cart recovery journey, Shopify abandoned cart WhatsApp, cart recovery flow, abandoned cart automation India',
    answerFirst:
      'A WhatsApp abandoned cart journey fires when Shopify marks a checkout abandoned, then sends up to three reminders carrying the product image, the ₹ total and a link back to the same checkout. In TopEdge it is three templates on one trigger, with the customer dropping out of the sequence the moment they pay or reply.',
    trigger: 'abandoned_cart',
    triggerNote:
      'Shopify counts a checkout abandoned once it has been incomplete for more than ten minutes after the customer gave an email or phone number.',
    steps: [
      {
        title: 'Reminder 1: your cart is waiting',
        detail:
          'Shows the product photo, the price and a button straight back to checkout. Sent while the shopper is still interested.',
        timing: 'within 30 to 60 minutes',
        category: 'Marketing',
        templateName: 'cart_recovery_1',
        preview: {
          header: 'Product image',
          body: 'Hi {{Priya}}, you left something behind 👀\n\n{{Olive Linen Shirt, M}} is still in your cart at {{₹2,499}}.\nTap below to finish your order.',
          buttons: ['Complete my order', 'Ask a question'],
          note:
            'Marketing category, because it exists to make a sale that has not happened yet.',
        },
        branches: [
          { label: 'Pays', outcome: 'Journey ends. No further reminder is sent.' },
          { label: 'Replies', outcome: 'Thread moves to the shared inbox with the cart attached.' },
        ],
      },
      {
        title: 'Reminder 2: offer help',
        detail:
          'Instead of repeating itself, this one offers help with whatever stopped them: size, delivery time or COD.',
        timing: '+24 hours',
        category: 'Marketing',
        templateName: 'cart_recovery_2',
        preview: {
          header: 'Product image',
          body: 'Still deciding, {{Priya}}? 🤔\n\nHappy to help with size, delivery time or Cash on Delivery. Just reply here.\nYour cart is saved for you.',
          buttons: ['Complete my order', 'Ask a question'],
          note:
            'The send that should clear the objection, not repeat the first message.',
        },
      },
      {
        title: 'Reminder 3: last call',
        detail:
          'The final nudge. It has no discount code on purpose, so repeat buyers don’t learn to abandon carts to get one.',
        timing: '+48 hours',
        category: 'Marketing',
        templateName: 'cart_recovery_3',
        preview: {
          header: 'Product image',
          body: 'Last call, {{Priya}} ⏳\n\nWe’re holding {{Olive Linen Shirt, M}} at {{₹2,499}} until tonight. After that it goes back to stock.',
          buttons: ['Complete my order', 'Ask a question'],
          note:
            'No discount code. A predictable discount here teaches repeat buyers to abandon on purpose.',
        },
        branches: [
          { label: 'No reply', outcome: 'Sequence closes. The customer stays in the audience, not the ladder.' },
        ],
      },
    ],
    blocks: [
      {
        kind: 'figures',
        id: 'why',
        h2: 'Why this journey exists',
        intro:
          'Most shoppers leave without buying. WhatsApp gets read fast in India, which makes it the best place to bring them back.',
        figures: [
          {
            value: '70.22%',
            label:
              'Average documented online shopping cart abandonment rate, averaged across 50 published studies.',
            source: 'baymardCart',
          },
          {
            value: '10 minutes',
            label:
              'How long a Shopify checkout must sit incomplete, after the customer has given their email, before Shopify counts it abandoned.',
            source: 'shopifyAbandoned',
          },
          {
            value: '₹0.8631',
            label:
              'What Meta charges per delivered marketing message in India. Three sends is roughly ₹2.59 per abandoned cart, before anyone buys anything.',
            source: 'metaPricing',
          },
        ],
      },
      {
        kind: 'prose',
        id: 'category',
        h2: 'What cart recovery costs, and why',
        body: [
          'This is the part most comparisons skip. A cart reminder is promotional: it exists to make a sale that has not happened, so Meta categorises it as marketing, at ₹0.8631 a delivered message in India rather than the ₹0.1150 a utility message costs. There is no wording that gets a cart reminder reclassified, and a platform promising otherwise is describing a template that will be rejected or re-categorised later.',
          'Three sends is therefore about ₹2.59 per abandoned cart. On a ₹2,499 order at a 10% recovery rate, that is ₹25.90 spent to recover ₹2,499 of revenue. The maths is comfortable, which is exactly why the discipline matters: a fourth and fifth send will not break the budget, but they will damage the quality rating that decides your messaging limits.',
        ],
      },
      {
        kind: 'checklist',
        id: 'practice',
        h2: 'What to do, and what to avoid',
        doLabel: 'Do this',
        dontLabel: 'Avoid this',
        doItems: [
          'Send the first reminder inside 30 to 60 minutes, while the decision is still live',
          'Carry the product image and the ₹ total, so the message is about their cart and not about you',
          'Drop the customer out of the sequence the moment they pay or reply',
          'Keep an “Ask a question” button on every message',
          'Measure recovered orders in Shopify, not just opens',
        ],
        dontItems: [
          'A fourth and fifth reminder, which costs quality rating and buys little',
          'Discounting in reminder one, when the shopper only wanted a shipping answer',
          'Inventing a discount code the store has not actually created',
          'Messaging numbers that never opted in',
          'Treating a high read rate as success when no order followed',
        ],
      },
      {
        kind: 'callout',
        id: 'policy',
        tone: 'warn',
        title: 'Meta has to approve these templates first',
        body:
          'All three steps are pre-built templates that still go to Meta for approval against your own WhatsApp Business account. Until they come back approved, the journey cannot send them, which is deliberate: the alternative is automation that quietly ships drafts to customers.',
        link: {
          label: 'Read Meta’s template guidelines',
          href: 'https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/',
        },
      },
    ],
    faqs: [
      {
        question: 'How many WhatsApp cart recovery messages should I send?',
        answer:
          'Three across about 72 hours is the shipped ladder and it is where most Indian D2C stores land. Beyond that the extra sends cost quality rating faster than they earn orders, and quality rating decides how many messages Meta lets you send at all.',
      },
      {
        question: 'What does a WhatsApp cart recovery sequence cost?',
        answer:
          'Cart reminders are marketing-category templates, which Meta prices at ₹0.8631 per delivered message in India. Three sends is roughly ₹2.59 per abandoned cart, billed by Meta to your own account. TopEdge adds no markup on that.',
      },
      {
        question: 'Does the customer keep getting messages after they pay?',
        answer:
          'No. Payment ends the journey, and so does a reply, which moves the thread into the shared inbox with the cart attached instead of leaving automation talking over a human conversation.',
      },
      {
        question: 'Can I add a discount code to the last reminder?',
        answer:
          'You can, but the shipped template deliberately does not carry one. A predictable discount at step three teaches repeat customers to abandon on purpose, and it trains your own margin away. Clear the objection first and keep the discount for a campaign you control.',
      },
      {
        question: 'Is WhatsApp cart recovery better than Shopify abandoned cart email?',
        answer:
          'They do different jobs. Shopify recovery emails work on the Online Store and Buy Button channels and need an email address, which COD-heavy Indian catalogs often do not collect. WhatsApp is read faster and works off the phone number. Most stores run both and let WhatsApp take the first few hours.',
      },
    ],
    related: [
      { label: 'Journey builder', href: '/features/journeys' },
      { label: 'Cart recovery playbook', href: '/blog/whatsapp-abandoned-cart-recovery-shopify' },
      { label: 'Meta India rate card', href: '/pricing/meta-rates' },
      { label: 'COD confirmation journey', href: '/whatsapp-journey-examples/cod-confirmation' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },

  {
    slug: 'cod-confirmation',
    cardTitle: 'COD confirmation',
    cardBlurb:
      'Ask every COD customer to confirm before you ship, so fake and impulse orders never leave the warehouse.',
    cardTrigger: 'cod_order_placed',
    cardCategory: 'Utility',
    cardGoal: 'Cut RTO on COD orders',
    cardMetric: 'RTO rate',
    image: '/marketing/solutions/sol-cod-rto-saas.jpg',
    imageAlt:
      'An RTO risk panel showing confirmed, prepaid-flip and at-risk COD counts, beside a WhatsApp thread asking a buyer to confirm their shipping address.',
    hero: '/marketing/journeys/hero-cod-confirmation.webp',
    heroAlt:
      'An isometric scene: a phone showing a chat bubble with a tick and a cross beside it, a warehouse on one side and a house with a parcel at the door on the other.',
    art: '/marketing/journeys/jx-cod-confirmation.webp',
    artAlt:
      'An isometric illustration of a parcel at a house door with a confirm and a cancel marker beside it, and a path leading back to a warehouse.',
    eyebrow: 'Journey example',
    h1: 'COD confirmation journey on WhatsApp',
    h1Accent: 'COD confirmation',
    subtitle:
      'Ask every COD customer to confirm on WhatsApp before you ship, and stop paying for parcels that come back.',
    title: 'COD Confirmation Journey on WhatsApp for Shopify India',
    description:
      'The WhatsApp COD confirmation journey for Shopify India: trigger, utility template at ₹0.1150, confirm and cancel branches, and the warehouse hold rule.',
    keywords:
      'COD confirmation WhatsApp, cash on delivery confirmation Shopify, reduce RTO India, COD order confirmation automation, WhatsApp COD journey',
    answerFirst:
      'A COD confirmation journey fires when a Cash on Delivery order is placed on Shopify and asks the customer to confirm before anything ships. It runs on a utility template at ₹0.1150 a message in India, against a return-to-origin parcel that costs ₹180 to ₹240 in direct logistics. That ratio is the entire argument for running it.',
    trigger: 'cod_order_placed',
    triggerNote:
      'Fires only on orders where Shopify marks the payment method as Cash on Delivery, so prepaid orders never enter this journey.',
    steps: [
      {
        title: 'Ask the customer to confirm',
        detail:
          'Shows the order, the product and the amount to pay on delivery, with Confirm and Cancel buttons. It’s a utility message, so it costs about a seventh of a marketing one.',
        timing: 'within minutes of checkout',
        category: 'Utility',
        templateName: 'cod_confirmation_v1',
        preview: {
          header: 'Product image',
          body: 'Hi {{Priya}}, your order {{#1042}} is ready to ship 📦\n\n{{Olive Linen Shirt, M}}\nPay on delivery: {{₹2,499}}\n\nPlease confirm and we’ll dispatch it today.',
          buttons: ['Confirm order', 'Cancel order'],
          note:
            'Utility category: it is about an order that already exists, so it costs about a seventh of a marketing send.',
        },
        branches: [
          { label: 'Confirms', outcome: 'Order is released to the warehouse for picking.' },
          { label: 'Cancels', outcome: 'Order is held and flagged, before anyone pays to ship it.' },
          { label: 'No reply', outcome: 'Order stays on hold and a reminder is scheduled.' },
        ],
      },
      {
        title: 'Reminder if there’s no reply',
        detail:
          'One follow-up before your dispatch cut-off. The order stays on hold until the customer replies.',
        timing: '+6 to 12 hours',
        category: 'Utility',
        templateName: 'cod_confirm_v2',
        preview: {
          body: 'Hi {{Priya}}, just checking in 🙂\n\nYour order {{#1042}} is on hold until you confirm it.\nPay on delivery: {{₹2,499}}',
          buttons: ['Confirm order', 'Cancel order'],
          note:
            'One follow-up inside the dispatch window. After this, silence needs a written rule.',
        },
        branches: [
          { label: 'Still silent', outcome: 'Hold, cancel or call, by a written policy your CX and warehouse both follow.' },
        ],
      },
      {
        title: 'Your team takes over',
        detail:
          'If the customer asks a question instead, the chat moves to your shared inbox with the Shopify order right beside it.',
        category: 'Service',
        branches: [
          { label: 'Resolved', outcome: 'Agent releases or cancels the order from the same screen.' },
        ],
      },
    ],
    blocks: [
      {
        kind: 'figures',
        id: 'economics',
        h2: 'The unit economics',
        intro:
          'One confirmation message costs a fraction of a rupee. One returned parcel costs hundreds.',
        figures: [
          {
            value: '₹180 to ₹240',
            label:
              'Direct logistics cost of one RTO parcel: forward shipping, reverse logistics, repackaging and inventory holding. Acquisition spend sits on top of that.',
            source: 'amazonShippingRto',
          },
          {
            value: '₹0.1150',
            label:
              'What Meta charges for the utility message that prevents it. The ratio is roughly 1,500 to 1 in favour of asking.',
            source: 'metaPricing',
          },
          {
            value: '39.2% to 21.0%',
            label:
              'RTO at the November 2025 festive peak, falling to 21.0% by March 2026 among brands running prepaid incentives and pre-dispatch verification, across 410M+ shipments.',
            source: 'unicommerceRto',
          },
        ],
      },
      {
        kind: 'prose',
        id: 'timing',
        h2: 'Why timing matters',
        body: [
          'A confirmation message is only worth sending while you can still act on the answer. Once the courier has the parcel, a cancellation is an RTO rather than a saved order, and you have already paid to ship it.',
          'The published numbers back the urgency. Orders attempted within one to two days recorded 22% RTO, rising to 35% when the attempt came after five or more days, and a failed delivery that is not resolved within 36 hours of the NDR being raised almost always ends in cancellation and return. Confirmation is the same discipline applied one step earlier, before the first attempt rather than after it.',
        ],
      },
      {
        kind: 'specTable',
        id: 'branches',
        h2: 'What the warehouse does with each reply',
        intro:
          'Agree this with your warehouse team before you switch the journey on.',
        columns: ['Customer reply', 'Order state', 'Who acts'],
        rows: [
          {
            label: 'Confirms',
            cells: ['Released for picking', 'Warehouse, automatically'],
          },
          {
            label: 'Cancels',
            cells: ['Held and flagged, nothing ships', 'Warehouse, automatically'],
          },
          {
            label: 'Asks a question',
            cells: ['Stays on hold', 'CX, in the shared inbox'],
          },
          {
            label: 'Silent after the reminder',
            cells: ['Stays on hold, pending your written rule', 'CX, by policy'],
            note: 'The rule has to exist in writing. Inconsistent holds across shifts recreate the RTO you are trying to prevent.',
          },
        ],
        footnote:
          'Basic COD confirmation runs on every TopEdge plan. Converting a confirmed COD order to prepaid needs a branching journey and is a Growth and Scale feature.',
      },
      {
        kind: 'callout',
        id: 'category',
        tone: 'note',
        title: 'Keep offers out of the confirmation message',
        body:
          'Confirmation is a transactional message about an order the customer has already placed, which is what makes it utility at ₹0.1150. Attach a discount or a prepaid incentive to the same message and you have written a marketing template at ₹0.8631, and a worse confirmation. The prepaid offer belongs in a second message.',
        link: { label: 'See the COD to prepaid journey', href: '/whatsapp-journey-examples/cod-to-prepaid' },
      },
    ],
    faqs: [
      {
        question: 'When should the COD confirmation message be sent?',
        answer:
          'Within minutes of the order being placed, and always before the courier collects the parcel. Once it has shipped, a cancellation becomes an RTO you have already paid for rather than an order you saved.',
      },
      {
        question: 'What does COD confirmation cost per order?',
        answer:
          'It runs on a utility template, which Meta prices at ₹0.1150 per delivered message in India. Against a return-to-origin parcel costing ₹180 to ₹240 in direct logistics, one confirmation pays for itself if it prevents one return in roughly fifteen hundred.',
      },
      {
        question: 'What happens if the customer never replies?',
        answer:
          'The order stays on hold and a reminder goes out inside the dispatch window. After that, silence needs a written rule your CX and warehouse both follow: hold, cancel, or call. What breaks stores is inconsistency between shifts, not the rule itself.',
      },
      {
        question: 'Does COD confirmation reduce RTO?',
        answer:
          'Published Indian data shows RTO falling from 39.2% at the November 2025 festive peak to 21.0% by March 2026 among brands running pre-dispatch verification and prepaid incentives. That is a basket of measures rather than confirmation alone, and your own rate depends on category and geography, so measure against your own baseline.',
      },
      {
        question: 'Is COD confirmation available on every plan?',
        answer:
          'Yes. Basic COD confirmation runs on Launch, Growth and Scale. Converting a confirmed COD order to prepaid uses a branching journey and is available on Growth and above.',
      },
    ],
    related: [
      { label: 'COD confirmation feature', href: '/features/cod-confirmation' },
      { label: 'The RTO benchmark', href: '/blog/cod-rto-benchmark-india-2026' },
      { label: 'Full COD SOP', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: 'COD to prepaid journey', href: '/whatsapp-journey-examples/cod-to-prepaid' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },

  {
    slug: 'cod-to-prepaid',
    cardTitle: 'COD to prepaid',
    cardBlurb:
      'After a COD order is confirmed, offer free shipping to pay online now and cut return risk.',
    cardTrigger: 'cod_prepaid',
    cardCategory: 'Marketing',
    cardGoal: 'Get paid upfront',
    cardMetric: 'Prepaid switch rate',
    image: '/marketing/solutions/sol-cod-prepaid-saas.jpg',
    imageAlt:
      'A confirm, prepaid offer and paid sequence beside a WhatsApp message offering shipping savings with a secure pay link.',
    hero: '/marketing/journeys/hero-cod-to-prepaid.webp',
    heroAlt:
      'An isometric scene: a phone showing a chat bubble with a tick, a stack of cash on one side and a card payment terminal on the other, joined by a curved arrow.',
    art: '/marketing/journeys/jx-cod-to-prepaid.webp',
    artAlt:
      'An isometric illustration of a stack of cash with a curved arrow sweeping across to a card payment terminal under a confirmation tick.',
    eyebrow: 'Journey example',
    h1: 'COD to prepaid journey on WhatsApp',
    h1Accent: 'COD to prepaid',
    subtitle:
      'Turn confirmed COD orders into prepaid ones with a simple WhatsApp offer to pay by UPI or card.',
    title: 'COD to Prepaid Journey on WhatsApp for Shopify India',
    description:
      'The WhatsApp COD to prepaid journey for Shopify India: when the UPI nudge fires, why it is a second message, and what a prepaid order is worth.',
    keywords:
      'COD to prepaid WhatsApp, convert COD to prepaid Shopify, UPI prepaid nudge India, prepaid conversion WhatsApp, reduce COD orders Shopify',
    answerFirst:
      'A COD to prepaid journey messages a customer after their Cash on Delivery order is confirmed, offering a reason to pay by UPI or card before dispatch. It is a separate send from the confirmation on purpose: bundling an offer into a confirmation turns a ₹0.1150 utility message into a ₹0.8631 marketing one and makes the confirmation itself less clear.',
    trigger: 'cod_prepaid',
    triggerNote:
      'Fires after a COD order exists and has been confirmed, so the offer never reaches someone who already cancelled.',
    steps: [
      {
        title: 'Customer confirms the COD order',
        detail:
          'The COD confirmation always runs first. There’s no point offering prepaid to someone who hasn’t confirmed they want the order.',
        category: 'Utility',
        templateName: 'cod_confirmation_v1',
        preview: {
          header: 'Product image',
          body: 'Hi {{Priya}}, your order {{#1042}} is ready to ship 📦\n\n{{Olive Linen Shirt, M}}\nPay on delivery: {{₹2,499}}\n\nPlease confirm and we’ll dispatch it today.',
          buttons: ['Confirm order', 'Cancel order'],
          note:
            'Utility category: it is about an order that already exists, so it costs about a seventh of a marketing send.',
        },
      },
      {
        title: 'Offer a reason to pay now',
        detail:
          'A separate message with a real incentive, usually free shipping, and a secure payment link.',
        timing: 'after confirmation',
        category: 'Marketing',
        templateName: 'eco_cod_prepaid_switch',
        preview: {
          header: 'Product image',
          body: 'Your order {{#1042}} is confirmed, {{Priya}} 🙌\n\nPay now by UPI or card and shipping is on us. You save {{₹80}}, same delivery date.',
          buttons: ['Pay now & save ₹80', 'Keep Cash on Delivery'],
          note:
            'A separate send from the confirmation. Bundling the offer into it would reclassify that message as marketing.',
        },
        branches: [
          { label: 'Pays', outcome: 'Order flips to prepaid. RTO exposure drops to near prepaid levels.' },
          { label: 'Declines or ignores', outcome: 'Order ships as COD, already confirmed. Nothing is lost.' },
        ],
      },
    ],
    blocks: [
      {
        kind: 'figures',
        id: 'worth',
        h2: 'What a prepaid order is worth',
        intro:
          'Prepaid orders get returned far less often than COD ones. That gap decides how big an incentive you can afford.',
        figures: [
          {
            value: '58% vs under 15%',
            label:
              'Festive-quarter COD return rate against prepaid, across 410M+ shipments and 6,000+ brands.',
            source: 'unicommerceRto',
          },
          {
            value: '26% vs under 2%',
            label:
              'COD RTO against prepaid RTO, as cited in First Resort’s 2026 India fashion returns research, which also attributes 60% to 70% of RTOs to low buying intent rather than logistics failure.',
            source: 'firstResortReturns',
          },
          {
            value: '₹30',
            label:
              'The COD remittance fee in Amazon Shipping India’s worked ₹799 order, on top of the amortised RTO cost in the same breakdown.',
            source: 'amazonShippingTrueCost',
          },
        ],
      },
      {
        kind: 'prose',
        id: 'second-message',
        h2: 'Why it has to be a separate message',
        body: [
          'There are two reasons and they point the same way. The first is pricing: a confirmation is a utility message at ₹0.1150 because it is transactional. Add an incentive and it becomes promotional, which Meta prices at ₹0.8631. You would be paying about seven times more for a message that now does two jobs.',
          'The second is comprehension. A confirmation asks one question and needs one answer, and a customer who is being asked to confirm an order and switch payment method in the same breath tends to do neither. Confirm first, then offer. The order is safe either way, because it was confirmed before the offer went out.',
        ],
      },
      {
        kind: 'checklist',
        id: 'incentive',
        h2: 'Choosing an incentive you can afford',
        intro:
          'Never offer more than a prepaid order actually saves you in returns and COD fees.',
        doLabel: 'Do this',
        dontLabel: 'Avoid this',
        doItems: [
          'Price the incentive against your own COD return rate, not an industry average',
          'Prefer free or discounted shipping, which is a real cost you avoid on a return',
          'Send it only after the order is confirmed',
          'Use a secure payment link rather than asking for details in chat',
          'Track the switch rate against your own baseline for a month before judging it',
        ],
        dontItems: [
          'Offering a flat discount larger than the RTO cost you are avoiding',
          'Bundling the offer into the confirmation message',
          'Promising a switch rate to yourself before you have measured one',
          'Sending it to customers who already cancelled',
          'Treating a prepaid flip as a new order in your revenue reporting',
        ],
      },
      {
        kind: 'callout',
        id: 'plan',
        tone: 'note',
        title: 'Available on Growth and Scale',
        body:
          'Basic COD confirmation runs on every plan. The prepaid switch reads the confirmation outcome and branches on it, so it needs Journey Branch, which is a Growth and Scale feature. Worth knowing before you plan around it.',
        link: { label: 'See plans', href: '/pricing' },
      },
    ],
    faqs: [
      {
        question: 'What is a COD to prepaid conversion?',
        answer:
          'It is a message sent after a Cash on Delivery order is confirmed, offering the customer an incentive to pay by UPI or card before the parcel ships. The order flips from COD to prepaid, which removes most of the return-to-origin risk attached to it.',
      },
      {
        question: 'Why not put the prepaid offer in the confirmation message?',
        answer:
          'Two reasons. It reclassifies the message from utility at ₹0.1150 to marketing at ₹0.8631, and it asks the customer two questions at once, which tends to get neither answered. Confirm first, offer second.',
      },
      {
        question: 'What switch rate should I expect?',
        answer:
          'We will not publish a number we have not measured across enough stores to stand behind, and every vendor figure you will find for this is a vendor figure. Measure your own for a month against your own COD baseline. The published COD against prepaid return gap is the part that is independently documented.',
      },
      {
        question: 'Is COD to prepaid available on all plans?',
        answer:
          'No. It needs Journey Branch, so it is a Growth and Scale feature. Basic COD confirmation is on every plan including Launch.',
      },
    ],
    related: [
      { label: 'COD confirmation journey', href: '/whatsapp-journey-examples/cod-confirmation' },
      { label: 'COD to prepaid playbook', href: '/blog/cod-to-prepaid-whatsapp-shopify-india' },
      { label: 'Journey builder', href: '/features/journeys' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },

  {
    slug: 'order-status-updates',
    cardTitle: 'Order status updates',
    cardBlurb:
      'Confirmed, shipped, delivered and cancelled updates that stop “where is my order?” messages before they start.',
    cardTrigger: 'order_placed · order_fulfilled',
    cardCategory: 'Utility',
    cardGoal: 'Fewer support tickets',
    cardMetric: '“Where is my order?” tickets',
    image: '/marketing/solutions/sol-electronics-inbox-saas.jpg',
    imageAlt:
      'A support thread beside an order card showing the order number, its status and the courier tracking number.',
    hero: '/marketing/journeys/hero-order-status-updates.webp',
    heroAlt:
      'An isometric scene: a phone showing a chat bubble, with a winding path behind it running from a warehouse to a house, a parcel partway along and marker posts beside it.',
    art: '/marketing/journeys/jx-order-status-updates.webp',
    artAlt:
      'An isometric illustration of a parcel travelling a winding path from a warehouse to a house, with three status markers standing along the route.',
    eyebrow: 'Journey example',
    h1: 'WhatsApp order status updates for Shopify',
    h1Accent: 'order status',
    subtitle:
      'Keep customers updated from checkout to doorstep, so “where is my order?” never reaches your inbox.',
    title: 'WhatsApp Order Status Updates for Shopify India',
    description:
      'The WhatsApp order status journey for Shopify: confirmed, shipped with tracking, delivered and cancelled, on utility templates at ₹0.1150 each.',
    keywords:
      'WhatsApp order status updates, Shopify order notification WhatsApp, order tracking WhatsApp India, shipping update automation, WISMO reduction',
    answerFirst:
      'An order status journey sends the customer a WhatsApp message at each point their Shopify order changes state: placed, shipped with a tracking link, delivered, and cancelled with a refund timeline. All four are utility templates at ₹0.1150 in India, and together they are the cheapest way to stop "where is my order" reaching your inbox at all.',
    trigger: 'order_placed → order_fulfilled',
    triggerNote:
      'Each step is bound to a Shopify order event, so the messages follow the real fulfilment state rather than a schedule.',
    steps: [
      {
        title: 'Order confirmed',
        detail:
          'Acknowledge the order immediately after checkout, with the order number and what was bought. This is the message that sets the expectation everything else is measured against.',
        timing: 'on order_placed',
        category: 'Utility',
        templateName: 'order_status_confirmed_v1',
        preview: {
          header: 'Product image',
          body: 'Hi {{Priya}}, thank you for your order! 🎉\n\nOrder {{#1042}} · {{Olive Linen Shirt, M}}\nTotal: {{₹2,499}}\n\nWe’ll message you here the moment it ships.',
          note:
            'Sets the expectation every later message is measured against.',
        },
      },
      {
        title: 'Order shipped',
        detail:
          'Image header with a Track order button carrying the courier link. This is the single highest-value message in the sequence, because it answers the question most customers were about to ask.',
        timing: 'on order_fulfilled',
        category: 'Utility',
        templateName: 'order_status_shipped_v1',
        preview: {
          header: 'Product image',
          body: 'Good news, {{Priya}}! Your order is on its way 🚚\n\nOrder {{#1042}} shipped with {{Delhivery}}.\nExpected delivery: {{Fri, 14 Nov}}',
          buttons: ['Track order'],
          note:
            'The highest-value message in the sequence. Without a working Track order button it generates the ticket it was meant to prevent.',
        },
      },
      {
        title: 'Order delivered',
        detail:
          'Delivery confirmation once the parcel arrives. It closes the loop, and it is the natural moment to ask for a review or offer warranty registration as a separate step.',
        category: 'Utility',
        templateName: 'order_status_delivered_v1',
        preview: {
          header: 'Product image',
          body: 'Delivered! ✅ Hope you love it, {{Priya}}.\n\nOrder {{#1042}} reached you today. If anything isn’t right, just reply here and we’ll fix it.',
          buttons: ['Contact support'],
          note:
            'Closes the loop, and is the natural moment to ask for a review as a separate send.',
        },
      },
      {
        title: 'Cancellation acknowledged',
        detail:
          'Acknowledge the cancellation and state the refund timeline. Silence after a cancellation is what turns a refund into a support ticket and a bad review.',
        category: 'Utility',
        templateName: 'order_cancellation_v1',
        preview: {
          body: 'Hi {{Priya}}, your order {{#1042}} has been cancelled.\n\nIf you paid online, your refund of {{₹2,499}} will reach you in {{5–7}} working days.',
          note:
            'Silence after a cancellation is what turns a refund into a support ticket.',
        },
        branches: [
          { label: 'Replies', outcome: 'Thread opens in the shared inbox with the order and refund state visible.' },
        ],
      },
    ],
    blocks: [
      {
        kind: 'prose',
        id: 'wismo',
        h2: 'This journey is a support cost, not a marketing one',
        body: [
          '"Where is my order" is the highest-volume question in Indian D2C support, and almost all of it is avoidable. The customer is not asking because they are impatient, they are asking because nothing told them. A shipping message with a working tracking link removes the reason for the question rather than answering it faster.',
          'The economics are different from cart recovery too. Every message here is utility, at ₹0.1150 in India rather than ₹0.8631, because each one is about an order that already exists. Four sends across the life of an order is roughly ₹0.46. An agent answering the same question once costs more than that in salaried minutes.',
        ],
      },
      {
        kind: 'figures',
        id: 'cost',
        h2: 'What the sequence costs',
        figures: [
          {
            value: '₹0.1150',
            label:
              'Per delivered utility or authentication message in India. Every step in this journey is utility.',
            source: 'metaPricing',
          },
          {
            value: '1,000 free',
            label:
              'Service messages per business phone number per month from 1 October 2026. Replies to these updates fall inside that tier before they are charged.',
            source: 'metaPricing',
          },
          {
            value: '36 hours',
            label:
              'After an NDR is raised, nearly every failed delivery that is not resolved within this window ends in cancellation and return. A delivery-stage message is what buys you the chance to resolve it.',
            source: 'amazonShippingNdr',
          },
        ],
      },
      {
        kind: 'callout',
        id: 'tracking',
        tone: 'note',
        title: 'The tracking link is the whole message',
        body:
          'A shipping notification without a working Track order button is a notification that generates the support ticket it was meant to prevent. The shipped template ships with an image header and a URL button for exactly this reason.',
        link: { label: 'Shared inbox with order context', href: '/blog/whatsapp-shared-inbox-shopify-order-context' },
      },
    ],
    faqs: [
      {
        question: 'What order status messages should a Shopify store send on WhatsApp?',
        answer:
          'Four: order confirmed, shipped with a tracking link, delivered, and cancelled with a refund timeline. All four are utility templates, so the cost scales with orders rather than with audience size.',
      },
      {
        question: 'How much do WhatsApp order updates cost?',
        answer:
          'Each is a utility message, priced by Meta at ₹0.1150 per delivered message in India. The full four-message sequence across an order is roughly ₹0.46, billed by Meta to your own account with no markup from TopEdge.',
      },
      {
        question: 'Do order updates count as marketing messages?',
        answer:
          'No, as long as they stay transactional. An order update is about an order the customer already placed, which is what makes it utility. Add a promotion to it and Meta will categorise it as marketing at ₹0.8631, which is roughly seven times the price.',
      },
      {
        question: 'Will this reduce support tickets?',
        answer:
          'It removes the reason for the most common one. "Where is my order" is asked because nothing told the customer, so a shipping message with a working tracking link prevents the ticket rather than answering it faster. Measure it against your own WISMO volume before and after.',
      },
    ],
    related: [
      { label: 'Journey builder', href: '/features/journeys' },
      { label: 'Shared inbox', href: '/blog/whatsapp-shared-inbox-shopify-order-context' },
      { label: 'Meta template guide', href: '/blog/meta-whatsapp-cloud-api-shopify-templates' },
      { label: 'Meta India rate card', href: '/pricing/meta-rates' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
];

export function journeyExampleBySlug(slug: string) {
  return JOURNEY_EXAMPLES.find((j) => j.slug === slug) ?? null;
}
