
export default function Feat() {
  const features = [
    {
      title: "Instant In-Browser Execution",
      subtitle: "Powered by Pyodide & WebAssembly",
      description:
        "Experience zero-latency coding with our Monaco-based editor. Run Python and JavaScript entirely in your browser—no server setup required—ensuring a fast, secure, and offline-capable coding environment",
      image: "https://www.shutterstock.com/image-photo/close-photo-generate-video-where-600nw-2619428765.jpg",
    },
    {
      title: "Code Execution Visualized",
      subtitle: "Step-Through Debugging",
      description:
        "Don't just run your code—see it live. Visualize stack traces and variable state changes line-by-line for Python and JS. Perfect for debugging complex algorithms and mastering recursion.",
      image: "https://addyosmani.com/assets/images/vsdraw-linked.png",
      reverse: true,
    },
    {
      title: "Gemini-Powered Assistance",
      subtitle: "Real-time Contextual Help",
      description:
        "Stuck on a bug? Our integrated Gemini AI chatbot understands your current editor context. Get instant code explanations, optimization tips, and error fixes without ever leaving your workspace",
      image: "https://thumbs.dreamstime.com/b/ai-chatbot-technology-laptop-screen-night-futuristic-purple-blue-neon-glow-illuminates-displaying-interface-person-384912186.jpg",
    },
    {
      title: "CF",
  subtitle: "Codeforce Analyzer",
  description:
    "Aggregate your competitive programming journey in one place. Automatically fetch and visualize your solve rates, contest ratings, and submission history and get tips.",
  image: "https://miro.medium.com/1*iPZ00kImJY8oVioV5Dy75A.jpeg",
  reverse: true,
    },
  ];

  return (
    <section className="py-20  bg-[#060707] overflow-hidden relative">
    <div className="bg-cyan-400 h-[250px] w-[250px] rounded-full blur-[120px] opacity-40 absolute top-300 -left-10"></div>
  <div className="bg-cyan-400 h-[250px] w-[250px] rounded-full blur-[120px] opacity-40 absolute top-150 right-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Discover the features that set us apart from the competition
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                feature.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-6">
                <div>
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wider">
                    {feature.subtitle}
                  </span>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}