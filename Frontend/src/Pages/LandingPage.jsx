import { useNavigate } from "react-router-dom";
import { FiLayout, FiEdit3, FiShare2, FiZap, FiArrowRight } from "react-icons/fi";

function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: FiLayout, title: "Choose a Template", description: "Pick from professionally designed templates tailored for developers, designers, and creatives." },
    { icon: FiEdit3, title: "Fill in Your Details", description: "Add your projects, skills, and experience through a guided, step-by-step form." },
    { icon: FiShare2, title: "Publish Instantly", description: "Get a unique shareable link and publish your portfolio online in seconds." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <FiLayout className="text-white" size={15} />
              </div>
              <span className="text-base font-bold text-slate-900">BuildMyFolio</span>
            </div>
            <nav className="flex items-center gap-2" aria-label="Main">
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-medium mb-6">
            <FiZap size={12} aria-hidden="true" />
            <span>Free Portfolio Builder</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
            Build a Professional Portfolio
            <br className="hidden sm:block" />
            <span className="text-blue-600"> in Minutes</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Choose a template, fill in your details, and get a live portfolio link — no coding, no design skills, completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Create Your Portfolio
              <FiArrowRight size={14} aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Sign In
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-2xl font-bold text-slate-900 text-center mb-10">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <article key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <feature.icon className="text-blue-600" size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="bg-slate-900 rounded-xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Join developers and creatives building professional portfolios. Free forever.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 text-sm font-medium text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors"
            >
              Create Free Account
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-400">BuildMyFolio — Free Portfolio Builder</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
