import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureMarketingImage from '../FeatureMarketingImage';
import { PrimaryButton, Section, SectionHeading } from '../ui';
import { Stagger, StaggerItem } from '../motion';
import { metaSteps } from '../../data/home';

export default function HomeMetaSection() {
  return (
    <Section className="border-y border-violet-100/60">
      <SectionHeading
        eyebrow="Meta Manager"
        title="Templates Meta approves — on your terms"
        subtitle="Ten ecommerce-ready messages. AI drafts your version. You review, then send to Meta. Use them in flows and campaigns when approved — usually within 24–48 hours."
        center
      />

      <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-violet-200/50 bg-violet-100/50 md:grid-cols-3">
        {metaSteps.map((s) => (
          <StaggerItem key={s.step}>
            <div
              className="h-full bg-white p-8"
              whileHover={{ backgroundColor: '#faf5ff' }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs font-medium tabular-nums text-[#7C3AED]/70">{s.step}</p>
              <h3 className="mt-4 text-lg tracking-tight text-[#0c1222]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-14">
        <FeatureMarketingImage imageId="meta-manager-library" interactive />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <PrimaryButton to="/features/meta-manager">Explore template library</PrimaryButton>
        <Link
          to="/features/meta-manager"
          className="text-sm text-[#7C3AED] underline-offset-4 hover:text-[#6d28d9] hover:underline"
        >
          Pick → Create → Send to Meta
        </Link>
      </div>
    </Section>
  );
}
