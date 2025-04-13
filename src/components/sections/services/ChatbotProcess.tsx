import { MessageSquare, Database, Bot, Code } from 'lucide-react';

export const ChatbotProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Design",
      description: "Design conversational flows and user interactions",
      color: "from-blue-500/80 to-cyan-500/80"
    },
    {
      number: "02",
      title: "Train",
      description: "Train the chatbot with your business knowledge",
      color: "from-purple-500/80 to-pink-500/80"
    },
    {
      number: "03",
      title: "Test",
      description: "Rigorous testing and continuous improvement",
      color: "from-orange-500/80 to-red-500/80"
    },
    {
      number: "04",
      title: "Deploy",
      description: "Seamless integration with your platforms",
      color: "from-emerald-500/80 to-teal-500/80"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden sf-pro-display bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight gradient-text">
            Chatbot Process
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-25 sm:gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative mt-24 sm:mt-0">
                {/* Step Number */}
                <div className="absolute -top-16 left-0 right-0 flex justify-center sm:block sm:left-0">
                  <div className={`text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent text-center sm:text-left`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                  <p className="text-gray-400/90">
                    {step.description}
                  </p>

                  {/* Interactive Elements */}
                  <div className="mt-6 flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div className="text-sm text-gray-500">Learn more</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
