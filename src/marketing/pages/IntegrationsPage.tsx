import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MousePointerClick } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import '../styles/integrations.css';

function InstagramGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <defs>
        <radialGradient id="mkt-int-ig" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill="url(#mkt-int-ig)"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
      />
    </svg>
  );
}

type Connection = {
  id: 'shopify' | 'whatsapp' | 'instagram' | 'pixel';
  name: string;
  kind: string;
  icon: ReactNode;
  points: string[];
  href: string;
  cta: string;
};

const CONNECTIONS: Connection[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    kind: 'Store sync',
    icon: <img src="/platforms/shopify.svg" alt="Shopify logo" width={24} height={24} />,
    points: [
      'OAuth connect, no code or Zapier',
      'Orders, carts, catalog, and COD fields sync',
      'Store webhooks trigger journeys in real time',
    ],
    href: '/shopify-whatsapp-integration',
    cta: 'Shopify integration',
  },
  {
    id: 'whatsapp',
    name: 'Meta WhatsApp',
    kind: 'Cloud API',
    icon: <img src="/platforms/whatsapp.svg" alt="WhatsApp logo" width={24} height={24} />,
    points: [
      'Utility and marketing templates',
      'Template status sync in Meta Manager',
      'Nothing sends until you approve a template',
    ],
    href: '/features/meta-manager',
    cta: 'Meta Manager',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    kind: 'Comments + stories',
    icon: <InstagramGlyph />,
    points: [
      'Comments and story mentions become DMs',
      'Continue on Instagram or WhatsApp',
      'Same Live Chat inbox as WhatsApp',
    ],
    href: '/features/instagram',
    cta: 'Instagram automation',
  },
  {
    id: 'pixel',
    name: 'Tracking Pixel',
    kind: 'Shopify theme embed',
    icon: <MousePointerClick size={22} strokeWidth={2} aria-hidden />,
    points: [
      'One-click Shopify theme app embed',
      'Product views and carts matched to WhatsApp numbers',
      'Consent-aware events and pixel health',
    ],
    href: '/features/journeys',
    cta: 'Pixel-triggered journeys',
  },
];

const STEPS = [
  {
    title: 'Connect Shopify',
    body: 'Authorize the store with Shopify OAuth. Orders, carts, and catalog start syncing.',
  },
  {
    title: 'Add WhatsApp Cloud API',
    body: 'Enter your Meta WhatsApp credentials. Onboarding guides each field.',
  },
  {
    title: 'Approve and publish',
    body: 'Approve your Meta templates, then publish a journey. Nothing sends before approval.',
  },
];

const GUIDES = [
  {
    href: '/shopify-whatsapp-integration',
    label: 'Guide',
    title: 'Shopify WhatsApp integration',
    body: 'OAuth store sync plus Meta Cloud API in one workspace.',
  },
  {
    href: '/features/journeys#abandoned-cart',
    label: 'Feature',
    title: 'Cart recovery journeys',
    body: 'Recover abandoned carts with approved WhatsApp templates.',
  },
  {
    href: '/blog/meta-whatsapp-cloud-api-shopify-templates',
    label: 'Playbook',
    title: 'Meta templates for Shopify',
    body: 'Categories, approval, and what to send when.',
  },
];

const FAQS = [
  {
    question: 'Do I need Zapier to connect Shopify and WhatsApp?',
    answer:
      'No. TopEdge connects Shopify via OAuth and Meta WhatsApp Cloud API natively, so carts, orders, catalog, and COD fields sync without Zapier for standard ecommerce flows.',
  },
  {
    question: 'How long does Shopify WhatsApp setup take?',
    answer:
      'Most brands connect Shopify and WhatsApp in about 15 minutes. Nothing sends until you approve each Meta template.',
  },
  {
    question: 'Does TopEdge add a markup on Meta WhatsApp fees?',
    answer:
      'No. Meta charges per message category, and TopEdge passes Cloud API costs through with no markup.',
  },
];

function Hub() {
  return (
    <div className="mkt-int-hub" aria-hidden>
      <div className="mkt-int-hub__side">
        <span className="mkt-int-hub__node mkt-int-hub__node--shopify">
          <img src="/platforms/shopify.svg" alt="Shopify logo" width={26} height={26} />
          <span>Shopify</span>
        </span>
        <span className="mkt-int-hub__node mkt-int-hub__node--pixel">
          <MousePointerClick size={22} strokeWidth={2} />
          <span>Pixel</span>
        </span>
      </div>
      <span className="mkt-int-hub__wire" />
      <span className="mkt-int-hub__core">
        <img src="/brand-mark.png" alt="TopEdge AI logo" width={44} height={44} />
        <span>
          TopEdge <em>AI</em>
        </span>
      </span>
      <span className="mkt-int-hub__wire mkt-int-hub__wire--out" />
      <div className="mkt-int-hub__side">
        <span className="mkt-int-hub__node mkt-int-hub__node--whatsapp">
          <img src="/platforms/whatsapp.svg" alt="WhatsApp logo" width={26} height={26} />
          <span>WhatsApp</span>
        </span>
        <span className="mkt-int-hub__node mkt-int-hub__node--instagram">
          <InstagramGlyph size={24} />
          <span>Instagram</span>
        </span>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.integrations.title}
        description={PAGE_SEO.integrations.description}
        keywords={PAGE_SEO.integrations.keywords}
        path={PAGE_SEO.integrations.path}
        noSuffix
        faqSchema={FAQS}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Integrations',
            description: PAGE_SEO.integrations.description,
            path: PAGE_SEO.integrations.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Integrations', path: '/integrations' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-int">
        <header className="mkt-int__hero">
          <p className="mkt-int__eyebrow">Integrations</p>
          <h1 className="mkt-int__h1">
            Connect Shopify and WhatsApp in <span className="mkt-int__hl">one workspace</span>
          </h1>
          <p className="mkt-int__sub">
            TopEdge sits on the tools you already trust. Connect once, sync continuously, operate
            from one workspace.
          </p>
          <div className="mkt-int__actions">
            <Link to="/signup" className="mkt-int__btn mkt-int__btn--solid">
              Start free
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link to="/shopify-whatsapp-integration" className="mkt-int__btn">
              Shopify integration guide
            </Link>
          </div>
          <Hub />
        </header>

        <section className="mkt-int__section" aria-labelledby="mkt-int-connect">
          <div className="mkt-int__head">
            <h2 id="mkt-int-connect">
              What <span className="mkt-int__hl">connects</span>
            </h2>
            <p>Native connections for standard ecommerce flows, no middleware to maintain.</p>
          </div>
          <div className="mkt-int__cards">
            {CONNECTIONS.map((c) => (
              <article key={c.id} className={`mkt-int-card mkt-int-card--${c.id}`}>
                <div className="mkt-int-card__top">
                  <span className="mkt-int-card__icon">{c.icon}</span>
                  <div>
                    <h3>{c.name}</h3>
                    <p className="mkt-int-card__kind">{c.kind}</p>
                  </div>
                </div>
                <ul className="mkt-int-card__points">
                  {c.points.map((pt) => (
                    <li key={pt}>
                      <Check size={15} strokeWidth={2.5} aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link to={c.href} className="mkt-int-card__link">
                  {c.cta}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mkt-int__section" aria-labelledby="mkt-int-setup">
          <div className="mkt-int__head">
            <h2 id="mkt-int-setup">
              How setup <span className="mkt-int__hl">works</span>
            </h2>
            <p>About fifteen minutes from install to your first approved journey.</p>
          </div>
          <ol className="mkt-int__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="mkt-int-step">
                <span className="mkt-int-step__n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mkt-int__section" aria-labelledby="mkt-int-guides">
          <div className="mkt-int__head">
            <h2 id="mkt-int-guides">
              Go <span className="mkt-int__hl">deeper</span>
            </h2>
          </div>
          <div className="mkt-int__guides">
            {GUIDES.map((g) => (
              <Link key={g.href} to={g.href} className="mkt-int-guide">
                <span className="mkt-int-guide__label">{g.label}</span>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
                <ArrowRight className="mkt-int-guide__arrow" size={16} aria-hidden />
              </Link>
            ))}
          </div>
        </section>

        <section className="mkt-int__section" aria-labelledby="mkt-int-faq">
          <div className="mkt-int__head">
            <h2 id="mkt-int-faq">
              Common <span className="mkt-int__hl">questions</span>
            </h2>
          </div>
          <div className="mkt-int__faq">
            {FAQS.map((f) => (
              <div key={f.question} className="mkt-int-faq">
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title="Connect your store in about fifteen minutes"
          subtitle="Start free, Shopify OAuth and WhatsApp credentials are guided in onboarding."
          primaryLabel="Start free"
          secondaryLabel="See features"
          secondaryTo="/features"
        />
      </MarketingPage>
    </>
  );
}
