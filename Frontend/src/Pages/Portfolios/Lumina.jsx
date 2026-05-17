import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiTwitter } from "react-icons/fi";

export default function Lumina({ data = {} }) {
  const hero = data.hero || {};
  const projects = data.projects || [];
  const skills = data.skills || [];
  const contact = data.contact || {};

  const skillMap = {};
  skills.forEach((s) => {
    if (s.categoryName) skillMap[s.categoryName] = s.items || [];
  });
  const skillTabs = Object.keys(skillMap);

  const [activeTab, setActiveTab] = useState(() => skillTabs[0] || "");
  const [menuOpen, setMenuOpen] = useState(false);

  // Update activeTab when skills load
  useEffect(() => {
    if (!activeTab && skillTabs.length > 0) setActiveTab(skillTabs[0]);
  }, [skills]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lumina-in");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".lumina-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects, skills]);

  const navLinks = ["projects", "skills", "contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      background: "#0F0A1E",
      color: "#F8FAFC",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Scroll reveal */
        .lumina-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .lumina-reveal.lumina-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navbar */
        .lumina-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(15, 10, 30, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
        }
        .lumina-nav-name {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        .lumina-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .lumina-nav-link {
          color: #94A3B8;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          background: none;
          border: none;
          text-decoration: none;
        }
        .lumina-nav-link:hover {
          color: #F8FAFC;
          background: rgba(139, 92, 246, 0.12);
        }
        .lumina-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lumina-otw-badge {
          font-size: 11px;
          font-weight: 600;
          color: #A7F3D0;
          background: rgba(167, 243, 208, 0.1);
          border: 1px solid rgba(167, 243, 208, 0.25);
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .lumina-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .lumina-hamburger div {
          width: 22px;
          height: 2px;
          background: #94A3B8;
          border-radius: 2px;
          transition: background 0.2s;
        }
        .lumina-mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: rgba(15, 10, 30, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
        }
        .lumina-mobile-link {
          color: #94A3B8;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          border-bottom: 1px solid rgba(139, 92, 246, 0.08);
          transition: color 0.2s;
        }
        .lumina-mobile-link:hover { color: #F8FAFC; }

        /* Hero */
        .lumina-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 2rem 4rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .lumina-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .lumina-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #8B5CF6, transparent 70%);
          top: -100px; left: -100px;
          animation: lumina-float1 8s ease-in-out infinite;
        }
        .lumina-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #EC4899, transparent 70%);
          top: 30%; right: -80px;
          animation: lumina-float2 10s ease-in-out infinite;
        }
        .lumina-orb-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #6366F1, transparent 70%);
          bottom: -80px; left: 40%;
          animation: lumina-float3 9s ease-in-out infinite;
        }
        @keyframes lumina-float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 20px) scale(1.05); }
          66% { transform: translate(-20px, 35px) scale(0.96); }
        }
        @keyframes lumina-float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-25px, 15px) scale(1.04); }
          70% { transform: translate(15px, -20px) scale(0.97); }
        }
        @keyframes lumina-float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(20px, -25px) scale(1.06); }
          60% { transform: translate(-15px, 10px) scale(0.95); }
        }
        .lumina-hero-content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
        }
        .lumina-hero-name {
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #F8FAFC 0%, #8B5CF6 50%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: lumina-shimmer 4s ease-in-out infinite;
          background-size: 200% 200%;
        }
        @keyframes lumina-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .lumina-hero-role {
          font-size: clamp(16px, 3vw, 22px);
          font-weight: 500;
          color: #8B5CF6;
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }
        .lumina-hero-tagline {
          font-size: clamp(15px, 2vw, 18px);
          font-style: italic;
          color: #94A3B8;
          margin-bottom: 1.5rem;
        }
        .lumina-hero-bio {
          font-size: 16px;
          line-height: 1.8;
          color: #CBD5E1;
          max-width: 560px;
          margin: 0 auto 2.5rem;
        }
        .lumina-hero-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .lumina-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(139, 92, 246, 0.35);
        }
        .lumina-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.55);
        }
        .lumina-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: rgba(139, 92, 246, 0.08);
          color: #C4B5FD;
          font-size: 14px;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          border: 1px solid rgba(139, 92, 246, 0.3);
          cursor: pointer;
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
        }
        .lumina-btn-secondary:hover {
          transform: translateY(-2px);
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.5);
        }

        /* Sections */
        .lumina-section {
          padding: 6rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lumina-section-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8B5CF6;
          margin-bottom: 0.5rem;
        }
        .lumina-section-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #F8FAFC;
          margin-bottom: 3rem;
          letter-spacing: -0.03em;
        }

        /* Projects */
        .lumina-projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .lumina-project-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .lumina-project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
        }
        .lumina-project-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        .lumina-project-img-placeholder {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: rgba(139, 92, 246, 0.4);
        }
        .lumina-project-body {
          padding: 1.5rem;
        }
        .lumina-project-name {
          font-size: 18px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .lumina-project-desc {
          font-size: 14px;
          color: #94A3B8;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .lumina-project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 1rem;
        }
        .lumina-stack-pill {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          background: rgba(139, 92, 246, 0.12);
          color: #C4B5FD;
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 20px;
        }
        .lumina-project-links {
          display: flex;
          gap: 10px;
        }
        .lumina-project-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #94A3B8;
          text-decoration: none;
          padding: 5px 12px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 6px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .lumina-project-link:hover {
          color: #8B5CF6;
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.08);
        }
        .lumina-project-link.live {
          color: #EC4899;
          border-color: rgba(236, 72, 153, 0.25);
        }
        .lumina-project-link.live:hover {
          background: rgba(236, 72, 153, 0.08);
          border-color: rgba(236, 72, 153, 0.5);
        }

        /* Skills */
        .lumina-skill-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .lumina-skill-tab {
          padding: 8px 18px;
          background: none;
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          color: #94A3B8;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .lumina-skill-tab:hover {
          border-color: rgba(139, 92, 246, 0.5);
          color: #C4B5FD;
        }
        .lumina-skill-tab.active {
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
        }
        .lumina-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .lumina-skill-pill {
          font-size: 13px;
          font-weight: 500;
          padding: 8px 18px;
          background: rgba(139, 92, 246, 0.07);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 24px;
          color: #C4B5FD;
          transition: all 0.2s;
          cursor: default;
        }
        .lumina-skill-pill:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 16px rgba(139, 92, 246, 0.25);
          color: #E0D9FF;
        }

        /* Contact */
        .lumina-contact-section {
          padding: 5rem 2rem;
          text-align: center;
          background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.05) 40%, transparent);
          border-top: 1px solid rgba(139, 92, 246, 0.1);
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }
        .lumina-contact-heading {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #F8FAFC, #8B5CF6 50%, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lumina-contact-sub {
          font-size: 16px;
          color: #94A3B8;
          margin-bottom: 2.5rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }
        .lumina-contact-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border-radius: 12px;
          text-decoration: none;
          margin-bottom: 2.5rem;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lumina-contact-email-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.6);
        }
        .lumina-social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .lumina-social-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 14px;
          font-weight: 500;
          color: #94A3B8;
          text-decoration: none;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          transition: all 0.2s;
        }
        .lumina-social-link:hover {
          color: #F8FAFC;
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
        }

        /* Divider */
        .lumina-divider {
          border: none;
          border-top: 1px solid rgba(139, 92, 246, 0.1);
          margin: 0;
        }

        /* Footer */
        .lumina-footer {
          padding: 2rem;
          text-align: center;
          font-size: 13px;
          color: #475569;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .lumina-nav-links { display: none; }
          .lumina-otw-badge { display: none; }
          .lumina-hamburger { display: flex !important; }
          .lumina-projects-grid { grid-template-columns: 1fr !important; }
          .lumina-section { padding: 4rem 1.25rem; }
        }
        @media (min-width: 769px) {
          .lumina-hamburger { display: none; }
          .lumina-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="lumina-nav">
        <span className="lumina-nav-name">
          {hero.fullName || "Portfolio"}
        </span>
        <div className="lumina-nav-links">
          {navLinks.map((id) => (
            <button key={id} className="lumina-nav-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <div className="lumina-nav-right">
          {hero.openToWork && (
            <span className="lumina-otw-badge">Available for work</span>
          )}
          <button
            className="lumina-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div /><div /><div />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lumina-mobile-menu">
          {navLinks.map((id) => (
            <button key={id} className="lumina-mobile-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Hero */}
      <section className="lumina-hero">
        <div className="lumina-orb lumina-orb-1" />
        <div className="lumina-orb lumina-orb-2" />
        <div className="lumina-orb lumina-orb-3" />
        <div className="lumina-hero-content">
          {hero.fullName && (
            <h1 className="lumina-hero-name">{hero.fullName}</h1>
          )}
          {hero.role && (
            <div className="lumina-hero-role">{hero.role}</div>
          )}
          {hero.tagline && (
            <p className="lumina-hero-tagline">{hero.tagline}</p>
          )}
          {hero.description && (
            <p className="lumina-hero-bio">{hero.description}</p>
          )}
          <div className="lumina-hero-btns">
            {hero.resumeLink && (
              <a
                href={hero.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="lumina-btn-primary"
              >
                Download Resume
              </a>
            )}
            <button
              className="lumina-btn-secondary"
              onClick={() => scrollTo("contact")}
            >
              <FiMail size={15} /> Get in Touch
            </button>
          </div>
        </div>
      </section>

      <hr className="lumina-divider" />

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" className="lumina-section">
          <div className="lumina-reveal">
            <div className="lumina-section-label">Featured Work</div>
            <h2 className="lumina-section-title">Projects</h2>
          </div>
          <div className="lumina-projects-grid">
            {projects.map((p, i) => {
              const img = Array.isArray(p.images) ? p.images[0] : p.images;
              return (
                <div
                  key={i}
                  className="lumina-project-card lumina-reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  {img ? (
                    <img src={img} alt={p.name} className="lumina-project-img" />
                  ) : (
                    <div className="lumina-project-img-placeholder">◈</div>
                  )}
                  <div className="lumina-project-body">
                    <div className="lumina-project-name">{p.name}</div>
                    {p.description && (
                      <p className="lumina-project-desc">{p.description}</p>
                    )}
                    {(p.stack || []).length > 0 && (
                      <div className="lumina-project-stack">
                        {(p.stack || []).map((tech) => (
                          <span key={tech} className="lumina-stack-pill">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="lumina-project-links">
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="lumina-project-link"
                        >
                          <FiGithub size={13} /> Code
                        </a>
                      )}
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="lumina-project-link live"
                        >
                          <FiExternalLink size={13} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <hr className="lumina-divider" />

      {/* Skills */}
      {skillTabs.length > 0 && (
        <section id="skills" className="lumina-section">
          <div className="lumina-reveal">
            <div className="lumina-section-label">What I Know</div>
            <h2 className="lumina-section-title">Skills</h2>
          </div>
          <div className="lumina-reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="lumina-skill-tabs">
              {skillTabs.map((tab) => (
                <button
                  key={tab}
                  className={`lumina-skill-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="lumina-skills-list">
              {(skillMap[activeTab] || []).map((skill) => (
                <span key={skill} className="lumina-skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="lumina-contact-section">
        <div className="lumina-reveal">
          <h2 className="lumina-contact-heading">Let's Build<br />Something.</h2>
          <p className="lumina-contact-sub">
            Have an idea, a project, or just want to say hello? I'd love to hear from you.
          </p>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="lumina-contact-email-btn"
            >
              <FiMail size={17} /> {contact.email}
            </a>
          )}
          <div className="lumina-social-links">
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" className="lumina-social-link">
                <FiGithub size={16} /> GitHub
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="lumina-social-link">
                <FiLinkedin size={16} /> LinkedIn
              </a>
            )}
            {contact.twitter && (
              <a href={contact.twitter} target="_blank" rel="noreferrer" className="lumina-social-link">
                <FiTwitter size={16} /> Twitter
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lumina-footer">
        {`© ${new Date().getFullYear()} ${hero.fullName || ""}. Built with BuildMyFolio.`}
      </footer>
    </div>
  );
}
