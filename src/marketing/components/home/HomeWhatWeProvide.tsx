import PremiumCard from '../PremiumCard';
import { Section, SectionHeading } from '../ui';
import { Stagger, StaggerItem } from '../motion';
import { valuePillars } from '../../data/home';

export default function HomeWhatWeProvide() {
  return (
    <Section className="!py-16 md:!py-24">
      <SectionHeading
        eyebrow="Platform"
        title="Four jobs. One workspace."
        subtitle="Automate, approve templates, reply in one inbox, grow with campaigns."
        center
      />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
        {valuePillars.map((pillar) => (
          <StaggerItem key={pillar.id}>
            <PremiumCard
              tag={pillar.outcome}
              title={pillar.title}
              subtitle={pillar.desc}
              to={pillar.to}
            >
              <ul className="relative mt-4 flex flex-wrap gap-2">
                {pillar.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-violet-100 bg-violet-50/60 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </PremiumCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
