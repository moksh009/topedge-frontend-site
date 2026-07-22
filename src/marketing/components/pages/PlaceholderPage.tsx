import MarketingSEO from '../MarketingSEO';
import MarketingCtaBand from '../MarketingCtaBand';
import MarketingPage from '../MarketingPage';
import { PageHero, Section, MarketingCard } from '../ui';

export default function PlaceholderPage({
  title,
  description,
  path,
  eyebrow,
}: {
  title: string;
  description: string;
  path: string;
  eyebrow: string;
}) {
  return (
    <>
      <MarketingSEO title={title} description={description} path={path} />
      <MarketingPage>
        <PageHero eyebrow={eyebrow} title={title} subtitle={description} />
        <Section className="!pt-0">
          <MarketingCard className="mx-auto max-w-3xl !p-8 text-center">
            <p className="text-sm leading-relaxed text-slate-500">
              This page shell is live so navigation works while the premium content is built section by section.
            </p>
          </MarketingCard>
        </Section>
        <MarketingCtaBand
          title="Start with the homepage and pricing"
          subtitle="The navigation is now wired for the full marketing site. Next we can deepen each feature page with real product mocks."
          primaryLabel="Start free"
          primaryTo="/signup"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
