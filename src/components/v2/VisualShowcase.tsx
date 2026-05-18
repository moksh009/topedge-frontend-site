type VisualShowcaseProps = {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function VisualShowcase({
  title,
  subtitle,
  imageSrc = '/revamp/dashboard-home.png',
  imageAlt = 'TopEdge dashboard preview'
}: VisualShowcaseProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-violet-800 via-violet-600 to-indigo-400 p-1 shadow-xl">
        <div className="rounded-[1.8rem] bg-white/10 p-8 backdrop-blur-sm sm:p-12">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
            <p className="mt-3 text-sm text-violet-100 sm:text-base">{subtitle}</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/20">
            <img src={imageSrc} alt={imageAlt} className="h-auto w-full object-cover" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Signal</p>
              <p className="mt-2 text-sm text-slate-600">New visitor from paid campaign</p>
            </div>
            <div className="rounded-2xl bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Action</p>
              <p className="mt-2 text-sm text-slate-600">AI replies, scores intent, updates CRM</p>
            </div>
            <div className="rounded-2xl bg-white/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Outcome</p>
              <p className="mt-2 text-sm text-slate-600">Qualified lead routed to your closer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
