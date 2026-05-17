import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiEdit3, FiShare2, FiArrowRight, FiLayout } from "react-icons/fi";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

const FALLBACK_CARDS = [
  { id: "f1", label: "Developer", color: "#1e293b" },
  { id: "f2", label: "Designer", color: "#1d4ed8" },
  { id: "f3", label: "Creative", color: "#6d28d9" },
  { id: "f4", label: "Minimal", color: "#0f766e" },
];

function TemplateCard({ template, style, counterRotate }) {
  const hasImage = template.image && !template._fallback;
  return (
    <div style={style} className="absolute">
      <div
        style={{ animation: counterRotate }}
        className="w-44 h-28 sm:w-52 sm:h-32 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800"
      >
        {hasImage ? (
          <img
            src={template.image}
            alt={template.templateName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-1"
            style={{ background: template.color || "#1e293b" }}
          >
            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">
              {template.label || template.templateName || "Template"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function OrbitalCarousel({ templates }) {
  const orbitRef = useRef(null);
  const cards = templates.length >= 2 ? templates : FALLBACK_CARDS;
  const count = cards.length;
  const ORBIT_RADIUS = 260;
  const DURATION = 22;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 600, height: 600, maxWidth: "100vw" }}>
      <div
        className="absolute rounded-full border border-slate-200 dark:border-white/5"
        style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
      />

      <div
        ref={orbitRef}
        className="absolute"
        style={{
          width: ORBIT_RADIUS * 2,
          height: ORBIT_RADIUS * 2,
          animation: `orbitSpin ${DURATION}s linear infinite`,
        }}
      >
        {cards.map((card, i) => {
          const angleDeg = (360 / count) * i;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = ORBIT_RADIUS + ORBIT_RADIUS * Math.cos(angleRad) - 88;
          const y = ORBIT_RADIUS + ORBIT_RADIUS * Math.sin(angleRad) - 56;
          return (
            <TemplateCard
              key={card._id || card.id}
              template={card}
              style={{ left: x, top: y }}
              counterRotate={`counterOrbitSpin ${DURATION}s linear infinite`}
            />
          );
        })}
      </div>

      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-blue-500/30">
          <FiLayout className="text-white" size={24} />
        </div>
        <p className="text-slate-500 dark:text-white/50 text-xs">{cards.length} templates</p>
      </div>
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/template`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setTemplates(d); })
      .catch(() => {});
  }, []);

  const features = [
    { icon: FiLayout, title: "Choose a Template", description: "Pick from professionally designed templates tailored for developers, designers, and creatives." },
    { icon: FiEdit3, title: "Fill in Your Details", description: "Add your projects, skills, and experience through a guided, step-by-step form." },
    { icon: FiShare2, title: "Publish Instantly", description: "Get a unique shareable link and publish your portfolio online in seconds." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Navbar */}
      <header className="border-b border-slate-200 dark:border-white/5 sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <img src={logo} alt="BuildMyFolio" className="h-10" />
            <nav className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
              {/* Left: copy */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium mb-6">
                  <span>Free Portfolio Builder</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
                  Build a Portfolio
                  <br />
                  <span className="text-blue-600 dark:text-blue-400">in Minutes</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Pick a live template, fill in your details, get a shareable link — no code needed.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    Create Your Portfolio
                    <FiArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Right: orbital carousel */}
              <div className="flex-1 flex items-center justify-center lg:justify-end">
                <OrbitalCarousel templates={templates} />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <article key={i} className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">Ready to Get Started?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-lg mx-auto">
              Join developers and creatives building professional portfolios. Free forever.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Create Free Account
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-600">BuildMyFolio — Free Portfolio Builder</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
