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
      'Six messages that follow every Shopify order. All are utility templates, so each costs about a seventh of a marketing message.',
    slots: [
      {
        id: 'om_order_confirm',
        title: 'Order confirmation',
        purpose:
          'Sent right after checkout, so the customer knows the order went through and what happens next.',
        metaName: 'order_status_confirmed_v1',
        category: 'Utility',
        trigger: 'order_placed',
        message: {
          header: 'Product image',
          body: 'Hi {{Priya}}, thank you for your order! 🎉\n\nOrder {{#1042}} · {{Olive Linen Shirt, M}}\nTotal: {{₹2,499}}\n\nWe’ll message you here the moment it ships.',
        },
      },
      {
        id: 'om_cod_confirm',
        title: 'COD confirmation',
        purpose:
          'Asks the customer to confirm a Cash on Delivery order before it is packed, so fake and impulse orders never ship.',
        metaName: 'cod_confirmation_v1',
        category: 'Utility',
        trigger: 'cod_order_placed',
        message: {
          header: 'Product image',
          body: 'Hi {{Priya}}, your order {{#1042}} is ready to ship 📦\n\n{{Olive Linen Shirt, M}}\nPay on delivery: {{₹2,499}}\n\nPlease confirm and we’ll dispatch it today.',
          buttons: ['Confirm order', 'Cancel order'],
        },
      },
      {
        id: 'om_cod_confirm_v2',
        title: 'COD reminder',
        purpose:
          'One follow-up if the customer has not confirmed yet. The order stays on hold until they reply.',
        metaName: 'cod_confirm_v2',
        category: 'Utility',
        trigger: 'cod_order_placed',
        message: {
          body: 'Hi {{Priya}}, just checking in 🙂\n\nYour order {{#1042}} is on hold until you confirm it.\nPay on delivery: {{₹2,499}}',
          buttons: ['Confirm order', 'Cancel order'],
        },
      },
      {
        id: 'om_shipped_flow',
        title: 'Order shipped',
        purpose:
          'Tells the customer their parcel is on the way, with a one-tap tracking link. This one stops most “where is my order” questions.',
        metaName: 'order_status_shipped_v1',
        category: 'Utility',
        trigger: 'order_fulfilled',
        message: {
          header: 'Product image',
          body: 'Good news, {{Priya}}! Your order is on its way 🚚\n\nOrder {{#1042}} shipped with {{Delhivery}}.\nExpected delivery: {{Fri, 14 Nov}}',
          buttons: ['Track order'],
        },
      },
      {
        id: 'om_delivered',
        title: 'Order delivered',
        purpose:
          'Confirms the parcel arrived and gives the customer an easy way to reach you if something is wrong.',
        metaName: 'order_status_delivered_v1',
        category: 'Utility',
        trigger: 'order delivered',
        message: {
          header: 'Product image',
          body: 'Delivered! ✅ Hope you love it, {{Priya}}.\n\nOrder {{#1042}} reached you today. If anything isn’t right, just reply here and we’ll fix it.',
          buttons: ['Contact support'],
        },
      },
      {
        id: 'om_cancelled',
        title: 'Order cancelled',
        purpose:
          'Confirms the cancellation and tells the customer when their refund will arrive.',
        metaName: 'order_cancellation_v1',
        category: 'Utility',
        trigger: 'order cancelled',
        message: {
          body: 'Hi {{Priya}}, your order {{#1042}} has been cancelled.\n\nIf you paid online, your refund of {{₹2,499}} will reach you in {{5–7}} working days.',
        },
      },
    ],
  },
  {
    id: 'cart-recovery',
    label: 'Cart recovery',
    blurb:
      'Three reminders over about 72 hours. These are marketing templates, because they ask for a sale that has not happened yet.',
    slots: [
      {
        id: 'cart_recovery_1',
        title: 'Cart reminder 1',
        purpose:
          'Sent within the hour, with the product photo, price and a button straight back to checkout.',
        metaName: 'cart_recovery_1',
        category: 'Marketing',
        trigger: 'abandoned_cart',
        message: {
          header: 'Product image',
          body: 'Hi {{Priya}}, you left something behind 👀\n\n{{Olive Linen Shirt, M}} is still in your cart at {{₹2,499}}.\nTap below to finish your order.',
          buttons: ['Complete my order', 'Ask a question'],
        },
      },
      {
        id: 'cart_recovery_2',
        title: 'Cart reminder 2',
        purpose:
          'Sent the next day. Instead of repeating itself, it offers help with sizing, delivery or COD.',
        metaName: 'cart_recovery_2',
        category: 'Marketing',
        trigger: 'abandoned_cart',
        message: {
          header: 'Product image',
          body: 'Still deciding, {{Priya}}? 🤔\n\nHappy to help with size, delivery time or Cash on Delivery. Just reply here.\nYour cart is saved for you.',
          buttons: ['Complete my order', 'Ask a question'],
        },
      },
      {
        id: 'cart_recovery_3',
        title: 'Cart reminder 3',
        purpose:
          'The last reminder. No discount code, on purpose.',
        metaName: 'cart_recovery_3',
        category: 'Marketing',
        trigger: 'abandoned_cart',
        message: {
          header: 'Product image',
          body: 'Last call, {{Priya}} ⏳\n\nWe’re holding {{Olive Linen Shirt, M}} at {{₹2,499}} until tonight. After that it goes back to stock.',
          buttons: ['Complete my order', 'Ask a question'],
        },
      },
    ],
  },
  {
    id: 'audience-programs',
    label: 'Extra programs',
    blurb:
      'Two optional messages outside the normal order flow. One utility, one marketing, depending on whether it carries an offer.',
    slots: [
      {
        id: 'warranty_certificate',
        title: 'Warranty activated',
        purpose:
          'Confirms the warranty is registered, for brands that offer one at purchase.',
        metaName: 'warranty_registration_v1',
        category: 'Utility',
        trigger: 'order_placed',
        message: {
          body: 'Your warranty is active ✅\n\nProduct: {{SmartHub E-400}}\nCovered until: {{14 March 2028}}\nOrder: {{#1042}}',
          buttons: ['View warranty'],
        },
      },
      {
        id: 'eco_cod_prepaid',
        title: 'COD to prepaid offer',
        purpose:
          'Sent after a COD order is confirmed, offering free shipping if the customer pays online now.',
        metaName: 'eco_cod_prepaid_switch',
        category: 'Marketing',
        trigger: 'cod_prepaid',
        message: {
          header: 'Product image',
          body: 'Your order {{#1042}} is confirmed, {{Priya}} 🙌\n\nPay now by UPI or card and shipping is on us. You save {{₹80}}, same delivery date.',
          buttons: ['Pay now & save ₹80', 'Keep Cash on Delivery'],
        },
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
  category: TemplateSlot['category'];
  note: string;
  message: TemplateMessage;
}[] = [
  {
    id: 'diwali-cart',
    category: 'Marketing',
    title: 'Diwali cart reminder',
    basedOn: 'cart_recovery_1',
    note: 'Cart reminders are already marketing, so festive wording does not change the price.',
    message: {
      header: 'Product image',
      body: 'Happy Diwali, {{Priya}}! 🪔\n\n{{Olive Linen Shirt, M}} is still in your cart at {{₹2,499}}.\nOrder by {{Thursday}} to get it before the festival.',
      buttons: ['Complete my order', 'Ask a question'],
    },
  },
  {
    id: 'diwali-prepaid',
    category: 'Marketing',
    title: 'Diwali prepaid offer',
    basedOn: 'eco_cod_prepaid_switch',
    note: 'Festive delivery queues are long, which gives customers a real reason to pay now.',
    message: {
      header: 'Product image',
      body: 'Your order {{#1042}} is confirmed 🪔\n\nPay by UPI today and it goes out in our first Diwali batch, with {{₹80}} shipping on us.',
      buttons: ['Pay now & save ₹80', 'Keep Cash on Delivery'],
    },
  },
  {
    id: 'diwali-shipped',
    category: 'Utility',
    title: 'Festive shipping update',
    basedOn: 'order_status_shipped_v1',
    note: 'Stays utility only while it has no offer. Add a festive discount and it is charged as marketing.',
    message: {
      header: 'Product image',
      body: 'Your Diwali order is on its way, {{Priya}} 🎁\n\nOrder {{#1042}} shipped with {{Delhivery}}.\nExpected delivery: {{Fri, 14 Nov}}',
      buttons: ['Track order'],
    },
  },
];
