import { ArrowRight, Bot, MessageSquare } from 'lucide-react';

export const ServiceCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 text-transparent bg-clip-text">
              Ready to Transform
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Your Business?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Experience the power of AI-driven solutions. Start your journey with us today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Get Started
              <div className="relative">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/50 to-cyan-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="/demo"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-blue-500/30 rounded-full text-blue-300 font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300"
            >
              Try Demo
              <div>
                <Bot className="w-5 h-5" />
              </div>
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
