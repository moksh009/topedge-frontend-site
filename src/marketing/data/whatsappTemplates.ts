import type { TemplateMessage } from '../components/journey/PhoneMock';

/**
 * The WhatsApp template library.
 *
 * Every slug, canonical Meta name, trigger and button set here is read off
 * `shared/template-catalog.json` in the dashboard repo. Eleven slots in three
 * groups, which is what TopEdge actually ships. We publish eleven rather than
 * padding the page to look like a hundred, because a library that lists
 * templates the product does not have is a support ticket waiting to happen.
 *
 * The body copy in each preview is an illustrative example. The catalogue
 * stores structure, not approved wording, because every merchant submits these
 * to Meta from their own WhatsApp Business account and edits the words. What
 * is NOT illustrative: the category, the trigger, the buttons and which fields
 * come from the Shopify order.
 */

export type TemplateSlot = {
  id: string;
  title: string;
  /** What this template is for, in a merchant's words. */
  purpose: string;
  /** Canonical Meta template name, matchable in the dashboard. */
  metaName: string;
  category: 'Utility' | 'Marketing';
  /** Shopify event that fires it, or null where it is sent by a program. */
  trigger: string;
  message: TemplateMessage;
  /** The one thing people get wrong with this template. */
  watchOut?: string;
};

export type TemplateGroup = {
  id: string;
  label: string;
  blurb: string;
  slots: TemplateSlot[];
};

export const TEMPLATE_RATE = {
  Utility: '₹0.1150',
  Marketing: '₹0.8631',
} as const;

export const TEMPLATE_GROUPS: TemplateGroup[] = [
  {
    id: 'order-messages',
    label: 'Order messages',
    blurb:
      'The six that run against a Shopify order. All utility, because each one is about an order the customer already placed, which is why they cost about a seventh of a marketing send.',
    slots: [
      {
        id: 'om_order_confirm',
        title: 'Order confirmation',
        purpose:
          'Acknowledges the order straight after checkout. This is the message that sets the expectation every later one is measured against.',
        metaName: 'order_status_confirmed_v1',
        category: 'Utility',
        trigger: 'order_placed',
        message: {
          body: 'Thanks {{Priya}}, we have your order {{#1042}}.\nTotal {{₹2,499}}. We will message you the moment it ships.',
        },
      },
      {
        id: 'om_cod_confirm',
        title: 'COD confirmation',
        purpose:
          'Asks the customer to confirm a Cash on Delivery order before anything is picked. The cheapest thing you can put in front of a return-to-origin parcel.',
        metaName: 'cod_confirmation_v1',
        category: 'Utility',
        trigger: 'cod_order_placed',
        message: {
          body: 'Hi {{Priya}}, please confirm your Cash on Delivery order {{#1042}}.\nAmount due on delivery: {{₹2,499}}.',
          buttons: ['Confirm order', 'Cancel order'],
        },
        watchOut:
          'Keep the prepaid offer out of this one. Attach an incentive and Meta reclassifies it as marketing, at roughly seven times the price.',
      },
      {
        id: 'om_cod_confirm_v2',
        title: 'COD confirm, ship or cancel',
        purpose:
          'The follow-up while the order is still inside your dispatch window. After this, silence is a decision and needs a written rule.',
        metaName: 'cod_confirm_v2',
        category: 'Utility',
        trigger: 'cod_order_placed',
        message: {
          body: 'Hi {{Priya}}, order {{#1042}} is still waiting on your confirmation, so we have not dispatched it yet.\nAmount due: {{₹2,499}}.',
          buttons: ['Confirm order', 'Cancel order'],
        },
      },
      {
        id: 'om_shipped_flow',
        title: 'Order shipped',
        purpose:
          'Carries an image header and a Track order button. The single highest-value message in the set, because it answers the question most customers were about to ask.',
        metaName: 'order_status_shipped_v1',
        category: 'Utility',
        trigger: 'order_fulfilled',
        message: {
          header: 'Product image',
          body: 'Order {{#1042}} has shipped with {{Delhivery}}.\nTracking number: {{1Z999AA10123456}}.',
          buttons: ['Track order'],
        },
        watchOut:
          'Without a working tracking link this message creates the support ticket it was meant to prevent.',
      },
      {
        id: 'om_delivered',
        title: 'Order delivered',
        purpose:
          'Closes the loop once the parcel arrives, and is the natural moment to ask for a review as a separate send.',
        metaName: 'order_status_delivered_v1',
        category: 'Utility',
        trigger: 'order delivered',
        message: {
          body: 'Order {{#1042}} was delivered.\nIf anything is not right, just reply here and we will sort it out.',
          buttons: ['Contact support'],
        },
      },
      {
        id: 'om_cancelled',
        title: 'Cancellation received',
        purpose:
          'Acknowledges the cancellation and states the refund timeline. Silence here is what turns a refund into a support ticket and a bad review.',
        metaName: 'order_cancellation_v1',
        category: 'Utility',
        trigger: 'order cancelled',
        message: {
          body: 'Order {{#1042}} has been cancelled.\nAnything you already paid comes back within {{5 to 7}} working days.',
        },
      },
    ],
  },
  {
    id: 'cart-recovery',
    label: 'Cart recovery',
    blurb:
      'Three sends across about 72 hours, on one trigger. All marketing category, because a cart reminder exists to make a sale that has not happened yet. There is no wording that changes that.',
    slots: [
      {
        id: 'cart_recovery_1',
        title: 'Reminder one, the cart is still here',
        purpose:
          'Product image, the item and its total, a Buy now button back to the same checkout. Sent while the intent is still warm.',
        metaName: 'cart_recovery_1',
        category: 'Marketing',
        trigger: 'abandoned_cart',
        message: {
          header: 'Product image',
          body: 'Hi {{Priya}}, you left {{Olive Linen Shirt, size M}} in your cart. It is still saved at {{₹2,499}}.\nTap below to finish your order.',
          buttons: ['Buy now', 'Contact support'],
        },
      },
      {
        id: 'cart_recovery_2',
        title: 'Reminder two, answer the objection',
        purpose:
          'The send that should clear whatever actually stopped them: sizing, delivery time, or whether COD is available. Not a repeat of the first message.',
        metaName: 'cart_recovery_2',
        category: 'Marketing',
        trigger: 'abandoned_cart',
        message: {
          body: 'Hi {{Priya}}, your cart is still saved.\nIf something was unclear about sizing, delivery time or COD, just reply and we will answer it.',
          buttons: ['Buy now', 'Contact support'],
        },
      },
      {
        id: 'cart_recovery_3',
        title: 'Reminder three, last call',
        purpose:
          'The final send. It ships without a discount code on purpose.',
        metaName: 'cart_recovery_3',
        category: 'Marketing',
        trigger: 'abandoned_cart',
        message: {
          body: 'Last reminder, {{Priya}}. {{Olive Linen Shirt, size M}} is still held at {{₹2,499}}.\nWe release it back to stock after today.',
          buttons: ['Buy now', 'Contact support'],
        },
        watchOut:
          'A predictable discount at step three teaches repeat customers to abandon on purpose. Clear the objection instead, and keep discounts for a campaign you control.',
      },
    ],
  },
  {
    id: 'audience-programs',
    label: 'Audience programs',
    blurb:
      'Two optional programs that sit outside the order flow. One utility, one marketing, and the difference is whether the message carries an offer.',
    slots: [
      {
        id: 'warranty_certificate',
        title: 'Warranty activated',
        purpose:
          'Confirms warranty registration for brands that register at purchase. Utility, because it is a record of something the customer already bought.',
        metaName: 'warranty_registration_v1',
        category: 'Utility',
        trigger: 'order_placed',
        message: {
          body: 'Your warranty for {{SmartHub E-400}} is active, {{Priya}}.\nCover runs to {{14 March 2028}} against order {{#1042}}.',
          buttons: ['View warranty'],
        },
      },
      {
        id: 'eco_cod_prepaid',
        title: 'COD to prepaid nudge',
        purpose:
          'Offers a confirmed COD customer a reason to pay by UPI or card before dispatch. Sent after the confirmation, never bundled into it.',
        metaName: 'eco_cod_prepaid_switch',
        category: 'Marketing',
        trigger: 'cod_prepaid',
        message: {
          body: 'Order {{#1042}} is confirmed, {{Priya}}.\nPay now by UPI or card and we will cover the {{₹80}} shipping. Same delivery date.',
          buttons: ['Pay now', 'Keep as COD'],
        },
        watchOut:
          'Needs a branching journey, so it is a Growth and Scale feature. Basic COD confirmation runs on every plan.',
      },
    ],
  },
];

/**
 * Festival copy. These are NOT extra templates: each is a seasonal rewrite of a
 * slot above, submitted to Meta as its own template under your own account.
 * Kept separate so nobody reads them as capability the product does not have.
 */
export const FESTIVAL_VARIANTS: {
  id: string;
  title: string;
  basedOn: string;
  note: string;
  message: TemplateMessage;
}[] = [
  {
    id: 'diwali-cart',
    title: 'Diwali cart reminder',
    basedOn: 'cart_recovery_1',
    note: 'Already marketing category, so festive copy changes nothing about the price.',
    message: {
      header: 'Product image',
      body: 'Diwali delivery closes soon, {{Priya}}.\n{{Olive Linen Shirt, size M}} is still in your cart at {{₹2,499}}. Order by {{Thursday}} and it reaches you before the weekend.',
      buttons: ['Buy now', 'Contact support'],
    },
  },
  {
    id: 'diwali-prepaid',
    title: 'Diwali prepaid nudge',
    basedOn: 'eco_cod_prepaid_switch',
    note: 'Festive dispatch queues are long, which is the honest reason to ask for prepaid now.',
    message: {
      body: 'Order {{#1042}} is confirmed, {{Priya}}.\nPay by UPI today and we ship it in the first Diwali batch, with the {{₹80}} shipping on us.',
      buttons: ['Pay now', 'Keep as COD'],
    },
  },
  {
    id: 'diwali-shipped',
    title: 'Festive dispatch update',
    basedOn: 'order_status_shipped_v1',
    note: 'Stays utility only while it carries no offer. Add a festive discount and it becomes a marketing send at ₹0.8631.',
    message: {
      header: 'Product image',
      body: 'Good news {{Priya}}, order {{#1042}} is out in today’s festive dispatch with {{Delhivery}}.\nTracking: {{1Z999AA10123456}}.',
      buttons: ['Track order'],
    },
  },
];

export function allSlots() {
  return TEMPLATE_GROUPS.flatMap((g) => g.slots);
}
