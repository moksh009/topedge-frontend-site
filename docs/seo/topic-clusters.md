# Topic clusters (GEO content architecture)

> Map every indexable marketing URL into a cluster. Use for internal linking and backlog prioritization.
> Companion: [`content-backlog.md`](./content-backlog.md) · [`geo-citation-log.md`](./geo-citation-log.md)

Last refreshed: **2026-09-21**

## Pillars

| ID | Pillar | Hub URL |
|---|---|---|
| T1 | Cart recovery / Journeys | `/features/journeys` |
| T2 | COD confirmation / RTO | `/blog/cod-confirmation-whatsapp-reduce-rto-shopify` |
| T3 | Meta Cloud API / templates / pricing India | `/blog/whatsapp-business-api-pricing-india` |
| T4 | Shared inbox / Live Chat | `/features/live-chat` |
| T5 | Alternatives / comparisons | `/compare` · `/compare/alternatives` |
| T6 | Choosing a Shopify WhatsApp app | `/blog/how-to-choose-whatsapp-app-shopify-app-store` |

## Cluster map

### T1 — Cart recovery / Journeys
- Pillar: `/features/journeys`
- Support: `/blog/whatsapp-abandoned-cart-recovery-shopify`, `/blog/whatsapp-automation-for-shopify`, `/blog/shopify-whatsapp-automation-what-to-automate-first`, `/blog/shopify-automation-checklist-whatsapp-cart-recovery`, `/features/flow-builder`, `/features/campaigns`
- Commercial: `/pricing`, `/`, `/blog/best-whatsapp-apps-for-shopify`

### T2 — COD / RTO
- Pillar: `/blog/cod-confirmation-whatsapp-reduce-rto-shopify`
- Support: `/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation`, `/features/journeys`, `/features/chat-rules`
- Commercial: `/pricing`, `/contact`

### T3 — Meta Cloud API / templates
- Pillar: `/blog/meta-whatsapp-cloud-api-shopify-templates`
- Support: `/blog/whatsapp-business-api-pricing-india`, `/features/meta-manager`, `/shopify-whatsapp-integration`, `/integrations`
- Commercial: `/pricing`

### T4 — Inbox / Live Chat
- Pillar: `/features/live-chat`
- Support: `/blog/whatsapp-shared-inbox-shopify-order-context`, `/blog/ai-chatbot-for-shopify`, `/blog/ai-whatsapp-chatbot-for-shopify-india`, `/features/ai-brain`, `/features/intent-detection`, `/features/chat-rules`
- Commercial: `/pricing`

### T5 — Alternatives / comparisons
- Pillar: `/compare` · `/compare/alternatives`
- Support: `/blog/best-whatsapp-apps-for-shopify`, `/blog/best-whatsapp-automation-tools-shopify-india`, `/blog/how-to-choose-whatsapp-app-shopify-app-store`
- Pairwise: `/compare/wati`, `/aisensy`, `/interakt`, `/bitespeed`, `/zoko`, `/getgabs`, `/kanal`, `/dondy`, `/updatrr`
- Alternatives posts: zoko / getgabs / kanal / dondy blogs
- Index: `/compare/alternatives`, 3-way board

### T6 — App Store selection
- Pillar: `/blog/how-to-choose-whatsapp-app-shopify-app-store`
- Support: alternatives blogs, `/compare/alternatives`, `/integrations`

## Linking rules
1. Each key URL should have **≥3 inbound** contextual links from its cluster.
2. New posts: within 2 weeks, link from ≥3 existing pages.
3. Do **not** dump competitor names in the site footer.

## Inbound hygiene pass (2026-09-21)

| Key URL | Before | After (target) | Notes |
|---|---|---|---|
| `/blog/dondy-alternative-shopify-india` | 0 | ≥3 | Linked from compare/dondy related, best-tools, choose-app, Meta pricing blog |
| `/features/chat-rules` | 2 | ≥3 | Linked from flow-builder, live-chat, intent-detection, instagram related |
| `/blog/how-to-choose-whatsapp-app-shopify-app-store` | 2 | ≥3 | Linked from opt-in related + existing alternatives/Meta blogs |

Re-count after deploy with a repo grep of `href` targets; footer still excludes competitor dumps.
