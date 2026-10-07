import type { BlogPost } from '../types/blog';

type Faq = { question: string; answer: string };

/** FAQs render as open plain HTML (answer engines do not click accordions) and match `faqs` word for word. */
function faqHtml(faqs: Faq[]): string {
  const items = faqs
    .map(
      (f) =>
        `<div class="mkt-blog-faq__item"><h3 class="mkt-blog-faq__q">${f.question}</h3><p>${f.answer}</p></div>`,
    )
    .join('\n');
  return `<h2>Frequently asked questions</h2>\n<div class="mkt-blog-faq">\n${items}\n</div>`;
}

function verdict(html: string): string {
  return `<div class="mkt-blog-verdict">\n<p class="mkt-blog-verdict__label">Quick verdict</p>\n${html}\n</div>`;
}

const WATI_FAQS: Faq[] = [
  {
    question: 'What is the best WATI alternative for a Shopify store in India?',
    answer:
      'It depends on what you are replacing. If WATI works for support but the platform fee, AI access or COD setup is the problem, a Shopify-native tool with flat INR pricing and built-in COD journeys, like TopEdge AI, is the closest fit. If you need a large multi-agent support desk across many channels, stay with a support-first tool and add cart recovery separately.',
  },
  {
    question: 'Will my approved WhatsApp templates move if I leave WATI?',
    answer:
      'Templates belong to your WhatsApp Business Account, not to the provider. If the new platform connects to the same WABA, your approved templates come with it. Check which WABA the new tool has bound before assuming anything was lost.',
  },
  {
    question: 'Can I run WATI and a new tool at the same time while I test?',
    answer:
      'You can test on a development store or a separate phone number, but one WhatsApp number can only be connected to one platform at a time. Plan a short cutover window and keep your cart and COD journeys paused on the old tool until the new ones are confirmed on a real phone.',
  },
  {
    question: 'Does switching from WATI change my Meta message costs?',
    answer:
      'Meta charges per template message by category, and that rate is the same whichever platform sends it. What changes is the platform fee and whether the platform adds its own markup on top. Compare the total of Meta fees plus platform fee at your real monthly volume, not the headline plan price.',
  },
];

const AISENSY_FAQS: Faq[] = [
  {
    question: 'Is AiSensy good for Shopify COD confirmation?',
    answer:
      'AiSensy can send COD confirmation messages, but according to our September 2026 research the COD-to-prepaid payment link step usually needs API integration and manual template mapping. If COD to prepaid conversion is your main goal, test that exact flow on a live Shopify store before you commit.',
  },
  {
    question: 'Why do Shopify brands look for an AiSensy alternative?',
    answer:
      'The common reasons are platform charges added on top of Meta rates, credit-based AI usage, and chatbot flow features that sit on higher plans. None of these is a flaw on its own. They matter when your volume grows and the bill stops tracking your order count.',
  },
  {
    question: 'What should I test before switching from AiSensy?',
    answer:
      'Run one real abandoned checkout, one real COD order and one inbound customer chat on the new platform, using the templates you actually send today. If all three behave on a real phone, the migration risk is low.',
  },
  {
    question: 'Do I lose chat history when I switch WhatsApp platforms?',
    answer:
      'Usually yes for the conversation history inside the old tool, because it lives in that vendor’s database. Export what you need first. Your contacts, opt-in records and approved templates are the parts you must keep.',
  },
];

const INTERAKT_FAQS: Faq[] = [
  {
    question: 'What is the best Interakt alternative for Shopify India?',
    answer:
      'For a COD-heavy Shopify store that wants flat INR plans, native cart recovery and a COD-to-prepaid path on every plan, TopEdge AI is a close fit. If you already rely on Interakt’s broader catalog and campaign tooling and only want cheaper AI, compare the add-on cost first before moving anything.',
  },
  {
    question: 'How much does Interakt cost in India?',
    answer:
      'As of our September 2026 research the plan that includes the WhatsApp channel starts from about ₹2,799 a month after the 14-day trial, and AI agent usage is an add-on. Plans change often, so confirm on interakt.shop before you decide.',
  },
  {
    question: 'Is the COD to prepaid feature locked on Interakt?',
    answer:
      'According to our September 2026 research it is supported natively but sits behind the Advanced Shopify integration on higher-tier plans. Check your current tier on the live pricing page.',
  },
  {
    question: 'How long does it take to move from Interakt to another WhatsApp platform?',
    answer:
      'Most Shopify stores can connect a new platform, resubmit or reuse templates and test one cart and one COD flow in a day. Allow extra time if you have many custom chatbot branches to rebuild.',
  },
];

const BITESPEED_FAQS: Faq[] = [
  {
    question: 'Is Bitespeed a good fit for small Indian Shopify stores?',
    answer:
      'According to our September 2026 research Bitespeed asks stores to reach a minimum monthly revenue to qualify for onboarding, with baseline plans starting around ₹15,000 a month. That suits larger brands. Smaller D2C stores usually look for an INR plan sized to order volume instead.',
  },
  {
    question: 'What is the best Bitespeed alternative for Shopify India?',
    answer:
      'If you want WhatsApp cart recovery, COD confirmation and a shared inbox at a price a sub-₹5 lakh a month store can justify, a flat INR order-based plan like TopEdge AI is the practical alternative. If you want a full multi-channel AI agent stack and have the budget, Bitespeed stays relevant.',
  },
  {
    question: 'Does Bitespeed charge extra for AI?',
    answer:
      'Public listings and third-party summaries in September 2026 describe AI chatbot and AI marketing agent as separate add-ons. Confirm the current price on bitespeed.co or the Shopify App Store before you compare.',
  },
  {
    question: 'Can I keep my Shopify data when I change WhatsApp tools?',
    answer:
      'Yes. Orders, customers and carts live in Shopify. A new platform re-syncs them over OAuth. What you must export from the old tool is conversation history, tags and any custom segments.',
  },
];

const TEMPLATE_FAQS: Faq[] = [
  {
    question: 'Why was my WhatsApp template rejected?',
    answer:
      'The most common causes are a category that does not match the content (promotional text in a utility template), variables that are not in order or sit at the very start or end, missing sample values, and wording that Meta’s review flags as misleading or as asking for sensitive data. The rejection reason shown in Meta Business Manager tells you which one applies.',
  },
  {
    question: 'Can I appeal a rejected WhatsApp template?',
    answer:
      'Yes. Fix the issue and resubmit, or use the review request option in Meta Business Manager when you believe the rejection was wrong. Appealing without changing anything rarely works, so change the wording, sample values or category first.',
  },
  {
    question: 'How long does WhatsApp template approval take?',
    answer:
      'Many templates are reviewed within minutes and most within a day, but Meta does not guarantee a time. Submit templates before a campaign or sale, never the same hour you need them.',
  },
  {
    question: 'Why did Meta change my template category to marketing?',
    answer:
      'Meta can reclassify a template whose content reads as promotional, even if you submitted it as utility. Marketing messages are billed at a higher rate, so strip offers and calls to buy out of utility templates such as order updates.',
  },
];

const OPTIN_FAQS: Faq[] = [
  {
    question: 'Do I need opt-in to send WhatsApp messages to Shopify customers in India?',
    answer:
      'Yes. WhatsApp Business Platform policy requires that people opt in to receive messages from your business, and that you make clear which business they are hearing from and what they will receive. Keep a record of when and how each person agreed.',
  },
  {
    question: 'Is a pre-ticked checkbox valid opt-in on Shopify checkout?',
    answer:
      'It is a weak basis and best avoided. Use an unticked checkbox or an explicit action by the customer, and word it so it names WhatsApp and the kind of messages. Treat this as general guidance and check with a lawyer for your own flows.',
  },
  {
    question: 'Does opt-in cover both order updates and marketing offers?',
    answer:
      'Best practice is to ask separately. A customer who agrees to order updates has not necessarily agreed to promotional offers, and marketing messages carry both a higher Meta fee and a higher complaint risk.',
  },
  {
    question: 'What happens if customers block or report my WhatsApp number?',
    answer:
      'Blocks and reports lower your quality rating, which can reduce how many messages you may send and in serious cases restrict the number. Sending only to people who asked, with a clear way to stop, is the main protection.',
  },
];

export const blogPostsQ4: BlogPost[] = [
  {
    id: 27,
    title: 'WATI Alternative for Shopify India (2026)',
    description:
      'Looking for a WATI alternative for Shopify India? What to keep, what to fix (markup, AI access, COD), and how to test a switch in one afternoon.',
    slug: 'wati-alternative-shopify-india',
    date: '2026-10-08',
    readTime: '9 min',
    category: 'Comparisons',
    author: 'Moksh Patel',
    image: '/marketing/features/unified-identity.png',
    imageAlt: 'Shopify India brand comparing a WATI alternative for WhatsApp automation',
    keywords: [
      'WATI alternative',
      'WATI alternative India',
      'WATI alternative Shopify',
      'WATI vs TopEdge',
      'WATI competitors India',
      'WhatsApp automation Shopify India',
      'switch WhatsApp platform Shopify',
    ],
    faqs: WATI_FAQS,
    content: `
${verdict(`<p><strong>A WATI alternative makes sense for Shopify India when</strong> you want cart recovery and COD handled natively, without custom API work, and a bill you can forecast in ₹. It does not make sense if your main need is a large multi-agent support desk. Be honest about which of the two you are.</p>`)}

<p>WATI is a well-known WhatsApp platform with a strong shared inbox. Many Shopify brands start there. This guide is for the point where support is fine but commerce automation feels bolted on.</p>

<h2>Why do Shopify India teams look for a WATI alternative?</h2>
<p>The reasons we hear are practical, not ideological.</p>
<ul>
<li><strong>Platform charges above Meta rates.</strong> Meta bills template messages by category. A platform can add its own charge on top.</li>
<li><strong>AI access on higher plans.</strong> Our September 2026 research found AI capabilities tied to a higher tier.</li>
<li><strong>COD to prepaid needs developer work.</strong> Mapping payment links to templates through webhooks is a project, not a setting.</li>
<li><strong>One phone number, one profile.</strong> The same buyer with two numbers appears as two contacts.</li>
</ul>
<p>Tradeoff: a support-first tool is often better for pure helpdesk volume. If most of your WhatsApp traffic is inbound questions rather than outbound commerce flows, switching may not pay off.</p>

<h2>What should a WATI alternative include?</h2>
<table>
<thead><tr><th>Requirement</th><th>Why it matters for Shopify India</th></tr></thead>
<tbody>
<tr><td>Official Meta Cloud API</td><td>Keeps your number safe and templates portable</td></tr>
<tr><td>Native Shopify cart and order sync</td><td>Recovery uses live cart contents, not a generic reminder</td></tr>
<tr><td>COD confirmation with a prepaid path</td><td>Cuts RTO before dispatch</td></tr>
<tr><td>Template approval gating</td><td>No journey sends until the template is APPROVED</td></tr>
<tr><td>Reporting in rupees recovered</td><td>Proves the tool pays for itself</td></tr>
</tbody>
</table>

<h2>Where does TopEdge AI fit?</h2>
<p>TopEdge AI is built around Shopify D2C in India: flat INR plans from ₹1,999 a month plus GST, Meta messages billed at Meta rates with no TopEdge markup, <a href="/features/journeys">cart recovery and COD journeys</a>, <a href="/features/live-chat">Live Chat with order context</a> and unified customer identity across numbers. We are not trying to out-support a dedicated helpdesk product.</p>
<p>See the line-by-line board on <a href="/compare/wati">TopEdge vs WATI</a> and plan details on <a href="/pricing">pricing</a>.</p>

<h2>How do you test a switch in one afternoon?</h2>
<ol>
<li>List the WATI flows you actually use: cart, COD, broadcasts, inbox, bots.</li>
<li>Connect the new tool to a development store or a spare number.</li>
<li>Submit the templates you really send and wait for APPROVED.</li>
<li>Place one real test order and one real abandoned checkout.</li>
<li>Confirm both messages on a real phone before moving live traffic.</li>
</ol>
<p>If the demo cannot show a live cart and a COD branch, you are shopping for a broadcast tool.</p>

${faqHtml(WATI_FAQS)}

<p class="mkt-blog-footnote">WATI plan and feature statements reflect public listings and our September 2026 research. Confirm on wati.io before you buy.</p>
<p>Related: <a href="/blog/best-whatsapp-automation-tools-shopify-india">best WhatsApp automation tools for Shopify India</a>, <a href="/blog/how-to-choose-whatsapp-app-shopify-app-store">how to choose a WhatsApp app</a>, <a href="/compare/alternatives">all alternatives</a>.</p>
`,
  },
  {
    id: 28,
    title: 'AiSensy Alternative for Shopify India (2026)',
    description:
      'An AiSensy alternative for Shopify India: what AiSensy does well, where COD, AI credits and flow limits bite, and what to test before you switch.',
    slug: 'aisensy-alternative-shopify-india',
    date: '2026-10-08',
    readTime: '9 min',
    category: 'Comparisons',
    author: 'Moksh Patel',
    image: '/marketing/features/shopify-whatsapp.png',
    imageAlt: 'Shopify India store owner evaluating an AiSensy alternative for WhatsApp marketing',
    keywords: [
      'AiSensy alternative',
      'AiSensy alternative India',
      'AiSensy alternative Shopify',
      'AiSensy vs TopEdge',
      'AiSensy pricing India',
      'WhatsApp marketing Shopify India',
    ],
    faqs: AISENSY_FAQS,
    content: `
${verdict(`<p><strong>AiSensy is a strong broadcast and campaign tool.</strong> Look for an alternative if you care more about native cart recovery, a COD-to-prepaid flow and predictable cost as volume grows. If most of your value is one-off broadcasts, the switch may not be worth it.</p>`)}

<p>AiSensy is one of the most visible WhatsApp marketing platforms in India and appears in most roundups. That visibility is exactly why teams compare it with Shopify-native tools once their store scales.</p>

<h2>Where do Shopify brands hit limits with AiSensy?</h2>
<ul>
<li><strong>Platform usage charges</strong> are applied on top of Meta’s base message rates.</li>
<li><strong>AI is credit based</strong>, with a per-message fee structure that grows with chat volume.</li>
<li><strong>Chatbot flow builder</strong> features sit on higher plans or add-on modules.</li>
<li><strong>COD to prepaid</strong> typically needs API integration and manual mapping of payment links.</li>
</ul>
<p>These are findings from our September 2026 research, not guarantees. Plans change, so check the live page.</p>

<h2>AiSensy vs a Shopify-native alternative</h2>
<table>
<thead><tr><th>Question</th><th>AiSensy (public patterns)</th><th>TopEdge AI</th></tr></thead>
<tbody>
<tr><td>Meta message markup</td><td>Platform charges above Meta rates</td><td>No markup on Meta rates</td></tr>
<tr><td>AI cost model</td><td>Per-message credits</td><td>Bring your own key, you pay the model provider</td></tr>
<tr><td>COD to prepaid</td><td>API plus manual mapping</td><td>Built into journeys on Growth and Scale</td></tr>
<tr><td>Flow limits</td><td>Capped by plan and credits</td><td>Flow builder on all plans</td></tr>
<tr><td>Best for</td><td>Broadcasts and campaigns</td><td>Shopify cart, COD and order lifecycle</td></tr>
</tbody>
</table>
<p>Tradeoff: bring-your-own-key AI means you manage a model account. That is cheaper at volume, but it is one more thing to set up.</p>

<h2>What to test before you leave AiSensy</h2>
<ol>
<li>Export contacts and opt-in records, not only the list.</li>
<li>Rebuild your top three flows on the new tool, not all of them.</li>
<li>Run one abandoned checkout and one COD order end to end.</li>
<li>Compare Meta fees plus platform fees at your busiest month.</li>
</ol>
<p>The full scorecard is on <a href="/compare/aisensy">TopEdge vs AiSensy</a>, and the three-way view is <a href="/compare/topedge-vs-wati-vs-aisensy">TopEdge vs WATI vs AiSensy</a>.</p>

${faqHtml(AISENSY_FAQS)}

<p class="mkt-blog-footnote">AiSensy statements reflect public listings and our September 2026 research. Confirm plan limits, credits and fees on aisensy.com before purchase.</p>
<p>Related: <a href="/blog/whatsapp-business-api-pricing-india">WhatsApp Business API pricing in India</a>, <a href="/pricing">TopEdge pricing</a>, <a href="/blog/cod-confirmation-whatsapp-reduce-rto-shopify">COD confirmation on WhatsApp</a>.</p>
`,
  },
  {
    id: 29,
    title: 'Interakt Alternative for Shopify India (2026)',
    description:
      'An Interakt alternative for Shopify India: pricing from about ₹2,799, AI add-on cost, COD-to-prepaid on higher tiers, and a one-day switch test.',
    slug: 'interakt-alternative-shopify-india',
    date: '2026-10-08',
    readTime: '8 min',
    category: 'Comparisons',
    author: 'Moksh Patel',
    image: '/marketing/features/shopify-whatsapp.png',
    imageAlt: 'Comparison of Interakt alternatives for Shopify WhatsApp automation in India',
    keywords: [
      'Interakt alternative',
      'Interakt alternative Shopify',
      'Interakt alternative India',
      'Interakt pricing India',
      'Interakt vs TopEdge',
      'Shopify WhatsApp app India',
    ],
    faqs: INTERAKT_FAQS,
    content: `
${verdict(`<p><strong>Interakt is a reasonable default for Indian Shopify stores.</strong> An alternative is worth testing if AI add-on cost, plan-gated COD-to-prepaid, or tier limits on custom fields and events are starting to bite. If none of those apply, staying put is the cheaper move.</p>`)}

<p>Interakt has a long history with Indian merchants and a solid Shopify app. This page is for the moment it stops fitting, not a case against it.</p>

<h2>What usually triggers an Interakt comparison?</h2>
<ul>
<li><strong>Entry price.</strong> Our September 2026 research puts the plan that includes the WhatsApp channel from about ₹2,799 a month after the 14-day trial.</li>
<li><strong>AI agents are an add-on</strong>, with a per-message cost after a small free allowance.</li>
<li><strong>COD to prepaid</strong> is supported natively but sits behind the Advanced Shopify integration on higher tiers.</li>
<li><strong>Chatbot depth.</strong> Branched chatbots need the higher plan, and limits on custom fields, events and tags follow the tier.</li>
</ul>

<h2>Side by side</h2>
<table>
<thead><tr><th>Area</th><th>Interakt (public patterns)</th><th>TopEdge AI</th></tr></thead>
<tbody>
<tr><td>Starting price after trial</td><td>About ₹2,799/mo (WhatsApp plan)</td><td>₹1,999/mo + GST (Launch)</td></tr>
<tr><td>AI</td><td>Paid add-on, per-message usage</td><td>Bring your own key</td></tr>
<tr><td>COD to prepaid</td><td>Higher-tier Shopify integration</td><td>Growth and Scale plans</td></tr>
<tr><td>Contact model</td><td>One contact per phone number</td><td>Unified identity across numbers and orders</td></tr>
<tr><td>Warranty workflows</td><td>External CRM or webhooks</td><td>Built in</td></tr>
</tbody>
</table>
<p>Tradeoff: Interakt has a longer track record and a larger user base. If your team already knows it well, retraining has a real cost. See the full board on <a href="/compare/interakt">TopEdge vs Interakt</a>.</p>

<h2>A one-day switch test</h2>
<ol>
<li>Pick the two flows that earn the most money: usually cart recovery and COD confirmation.</li>
<li>Connect the alternative to the same WhatsApp Business Account so templates carry over.</li>
<li>Run one real order of each type on a spare number.</li>
<li>Only then plan the cutover.</li>
</ol>

${faqHtml(INTERAKT_FAQS)}

<p class="mkt-blog-footnote">Interakt pricing and add-on statements reflect public listings and our September 2026 research. Confirm on interakt.shop and the Shopify App Store before purchase.</p>
<p>Related: <a href="/blog/best-whatsapp-apps-for-shopify">best WhatsApp apps for Shopify</a>, <a href="/features/journeys">WhatsApp journeys</a>, <a href="/compare/alternatives">all alternatives</a>.</p>
`,
  },
  {
    id: 30,
    title: 'Bitespeed Alternative for Shopify India (2026)',
    description:
      'A Bitespeed alternative for Shopify India: revenue minimums, USD-style pricing and AI add-ons, versus a flat INR plan sized to your order volume.',
    slug: 'bitespeed-alternative-shopify-india',
    date: '2026-10-08',
    readTime: '8 min',
    category: 'Comparisons',
    author: 'Moksh Patel',
    image: '/marketing/features/unified-identity.png',
    imageAlt: 'Shopify India brand weighing a Bitespeed alternative with INR pricing',
    keywords: [
      'Bitespeed alternative',
      'Bitespeed alternative Shopify',
      'Bitespeed pricing India',
      'Bitespeed vs TopEdge',
      'Shopify WhatsApp app INR pricing',
    ],
    faqs: BITESPEED_FAQS,
    content: `
${verdict(`<p><strong>Bitespeed targets larger brands and global omnichannel stacks.</strong> If your Shopify store is below that scale, or you want to pay in rupees on a plan sized to orders, an INR-first alternative is the more practical choice. If you are a large brand that wants an AI-agent suite, Bitespeed stays in the running.</p>`)}

<p>Bitespeed is often named in roundups for WhatsApp-heavy markets including India. The question for a small or mid-size D2C brand is not whether it is good, but whether its pricing model fits your size.</p>

<h2>Where does Bitespeed pricing stop fitting?</h2>
<ul>
<li><strong>Onboarding threshold.</strong> Our September 2026 research found a minimum monthly revenue requirement and baseline plans from about ₹15,000 a month.</li>
<li><strong>AI add-ons.</strong> The AI chatbot and AI marketing agent are described as separate add-ons of roughly $100 a month each.</li>
<li><strong>Markup on Meta rates.</strong> Platform usage and conversation markup apply on top of Meta’s base rates.</li>
<li><strong>Warranty</strong> is not natively supported.</li>
</ul>
<p>What Bitespeed does well: native COD to prepaid, broad omnichannel coverage and opt-in widgets such as spin-the-wheel pop-ups.</p>

<h2>Compared with a flat INR plan</h2>
<table>
<thead><tr><th>Area</th><th>Bitespeed (public patterns)</th><th>TopEdge AI</th></tr></thead>
<tbody>
<tr><td>Who it is built for</td><td>Larger brands, omnichannel</td><td>Shopify D2C in India</td></tr>
<tr><td>Entry price</td><td>About ₹15,000/mo baseline</td><td>₹1,999/mo + GST</td></tr>
<tr><td>AI</td><td>Separate add-ons</td><td>Bring your own key</td></tr>
<tr><td>Meta billing</td><td>Platform markup applies</td><td>Meta rates, no markup</td></tr>
<tr><td>Warranty</td><td>Not native</td><td>Built in</td></tr>
</tbody>
</table>
<p>Tradeoff: TopEdge AI is WhatsApp and Instagram first. If you need email, SMS and web chat in one suite, compare that scope honestly. Details are on <a href="/compare/bitespeed">TopEdge vs Bitespeed</a>.</p>

${faqHtml(BITESPEED_FAQS)}

<p class="mkt-blog-footnote">Bitespeed statements reflect public listings and third-party summaries as of September 2026. Confirm on bitespeed.co and the Shopify App Store before purchase.</p>
<p>Related: <a href="/blog/best-whatsapp-automation-tools-shopify-india">best WhatsApp automation tools for Shopify India</a>, <a href="/pricing">TopEdge pricing</a>, <a href="/features/live-chat">Live Chat</a>.</p>
`,
  },
  {
    id: 31,
    title: 'WhatsApp Template Rejected? Fix It for Shopify',
    description:
      'Why Meta rejects WhatsApp templates for Shopify stores (category, variables, samples) and how to rewrite order, cart and COD templates for approval.',
    slug: 'whatsapp-template-rejected-meta-shopify-fix',
    date: '2026-10-08',
    readTime: '9 min',
    category: 'Meta & templates',
    author: 'Moksh Patel',
    image: '/marketing/features/shopify-whatsapp.png',
    imageAlt: 'Meta WhatsApp template rejection reasons and fixes for Shopify order and cart messages',
    keywords: [
      'WhatsApp template rejected',
      'WhatsApp template rejected fix',
      'Meta template rejection reasons',
      'WhatsApp template approval Shopify',
      'WhatsApp utility vs marketing template',
      'WhatsApp template variables',
    ],
    faqs: TEMPLATE_FAQS,
    content: `
${verdict(`<p><strong>Most rejections come from five fixable things:</strong> wrong category, badly placed variables, missing sample values, promotional wording in a utility template, and vague or misleading text. Fix the cause shown in Meta Business Manager and resubmit. Do not resubmit unchanged.</p>`)}

<p>A rejected template blocks a cart or COD journey completely, because a good platform will not send until the template is APPROVED. Knowing the common causes saves days. Always read the reason Meta shows first, and re-check Meta’s current template guidelines because rules change.</p>

<h2>The five reasons templates get rejected</h2>
<table>
<thead><tr><th>Cause</th><th>What it looks like</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Wrong category</td><td>An offer inside a utility order update</td><td>Move offers to a marketing template</td></tr>
<tr><td>Variable placement</td><td>Text starts or ends with {{1}}, or numbers skip</td><td>Add fixed words around variables and keep them in order</td></tr>
<tr><td>Missing samples</td><td>No example value for each variable</td><td>Add a realistic sample such as an order number</td></tr>
<tr><td>Too many variables</td><td>Long text built from placeholders</td><td>Write more fixed copy, fewer variables</td></tr>
<tr><td>Misleading or sensitive</td><td>Asks for card or OTP details in the body</td><td>Link to a secure page instead</td></tr>
</tbody>
</table>

<h2>Utility or marketing: the category that costs money</h2>
<p>Meta bills marketing templates at a higher rate than utility ones, and can reclassify a utility template that reads as promotional. An order confirmed message should state the order, items and delivery date. Add a discount code and it can flip to marketing. See how rates work in <a href="/blog/whatsapp-business-api-pricing-india">WhatsApp Business API pricing in India</a>.</p>

<h2>Rewrite examples for Shopify</h2>
<h3>Order confirmation (utility)</h3>
<p>Hi {{1}}, your order {{2}} is confirmed. We will ship it to {{3}} and share tracking soon.</p>
<h3>COD confirmation (utility)</h3>
<p>Hi {{1}}, please confirm your cash on delivery order {{2}} for ₹{{3}}. Reply YES to confirm or NO to cancel.</p>
<h3>Cart reminder (marketing)</h3>
<p>Hi {{1}}, you left {{2}} in your cart. Your cart is saved here: {{3}}</p>
<p>Tradeoff: a plain template converts less than a persuasive one, but a rejected template converts nothing. Start plain, then test one change at a time.</p>

<h2>Workflow that avoids rejections</h2>
<ol>
<li>Submit templates days before a sale, never the same hour.</li>
<li>Write one template per purpose and name it clearly.</li>
<li>Track status in one place. <a href="/features/meta-manager">Meta Manager</a> shows pending, approved and rejected templates beside your journeys.</li>
<li>Gate journeys so nothing sends before APPROVED. See <a href="/blog/meta-whatsapp-cloud-api-shopify-templates">Meta Cloud API templates for Shopify</a>.</li>
</ol>

${faqHtml(TEMPLATE_FAQS)}

<p class="mkt-blog-footnote">Template rules come from Meta’s WhatsApp Business Platform documentation and change over time. Verify against the current guidelines before launch.</p>
<p>Related: <a href="/blog/whatsapp-abandoned-cart-recovery-shopify">WhatsApp abandoned cart recovery</a>, <a href="/docs/quickstart">quickstart</a>.</p>
`,
  },
  {
    id: 32,
    title: 'WhatsApp Opt-In for Shopify India: Do It Right',
    description:
      'How to collect WhatsApp opt-in on Shopify in India: checkout, popups, QR and chat, what to record, and how to keep your quality rating healthy.',
    slug: 'whatsapp-opt-in-shopify-india',
    date: '2026-10-08',
    readTime: '9 min',
    category: 'Compliance',
    author: 'Moksh Patel',
    image: '/marketing/features/optin-popup.png',
    imageAlt: 'Shopify WhatsApp opt-in popup collecting customer consent for order updates and offers',
    keywords: [
      'WhatsApp opt-in Shopify',
      'WhatsApp opt-in India',
      'WhatsApp consent Shopify checkout',
      'WhatsApp marketing consent',
      'WhatsApp quality rating',
      'collect WhatsApp opt-in website popup',
    ],
    faqs: OPTIN_FAQS,
    content: `
${verdict(`<p><strong>Collect opt-in at checkout and on your site, word it clearly, store proof, and keep order updates separate from offers.</strong> It costs a few percent of reach and protects your number. This is general guidance, not legal advice.</p>`)}

<p>Opt-in is the foundation of every WhatsApp journey. Without it you lose your quality rating before you lose the customer. Meta’s WhatsApp Business Platform policy expects that people agree to hear from you on WhatsApp, and India’s data protection rules push the same way on clear, specific consent.</p>

<h2>Where to collect opt-in on a Shopify store</h2>
<table>
<thead><tr><th>Source</th><th>Strength</th><th>Watch out for</th></tr></thead>
<tbody>
<tr><td>Checkout checkbox</td><td>Reaches every buyer</td><td>Leave unticked, name WhatsApp</td></tr>
<tr><td>Website popup</td><td>Captures visitors before checkout</td><td>Do not hide the consent text</td></tr>
<tr><td>Click-to-WhatsApp ad or button</td><td>Customer starts the chat</td><td>Opens a service window, not marketing consent</td></tr>
<tr><td>QR on packaging</td><td>Good for repeat buyers</td><td>State what messages they will get</td></tr>
<tr><td>Instagram comment to DM</td><td>High intent</td><td>Ask again before offers</td></tr>
</tbody>
</table>
<p>TopEdge’s <a href="/features/opt-in-tools">opt-in tools</a> cover website popups and capture, so consent starts inside the same system that runs your journeys.</p>

<h2>What good consent wording looks like</h2>
<ul>
<li>Names the business and WhatsApp.</li>
<li>Says what you will send: order updates, offers, or both.</li>
<li>Offers an easy way to stop.</li>
<li>Is separate from terms and conditions.</li>
</ul>
<p>Tradeoff: stricter wording and an unticked box reduce opt-in volume. The people who remain open and answer your messages, which keeps your quality rating high.</p>

<h2>What to record</h2>
<ol>
<li>Phone number and name as given.</li>
<li>Date and time of consent.</li>
<li>Where it was given: checkout, popup, QR or chat.</li>
<li>The exact wording shown.</li>
<li>Any later opt-out.</li>
</ol>

<h2>Keep quality rating healthy</h2>
<p>Blocks and reports lower quality and can limit sending. Send cart and COD messages soon after the trigger, include a clear stop option and avoid sending offers to people who only agreed to order updates. Our guide to <a href="/blog/whatsapp-abandoned-cart-recovery-shopify">WhatsApp abandoned cart recovery</a> covers timing in detail.</p>

${faqHtml(OPTIN_FAQS)}

<p class="mkt-blog-footnote">This article is general information, not legal advice. Check Meta’s current WhatsApp Business Platform policy and take advice on India’s data protection rules for your own flows.</p>
<p>Related: <a href="/blog/cod-confirmation-whatsapp-reduce-rto-shopify">COD confirmation on WhatsApp</a>, <a href="/docs/quickstart">quickstart</a>.</p>
`,
  },
];
