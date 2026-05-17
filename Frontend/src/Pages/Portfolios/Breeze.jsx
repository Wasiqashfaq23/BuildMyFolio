import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiGlobe } from "react-icons/fi";

export default function Breeze({ data = {} }) {
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

  useEffect(() => {
    if (!activeTab && skillTabs.length > 0) setActiveTab(skillTabs[0]);
  }, [skills]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("breeze-in");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".breeze-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects, skills]);

  const navLinks = ["projects", "skills", "contact"];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const profileImg = Array.isArray(hero.profileImage)
    ? hero.profileImage[0]
    : hero.profileImage;

  const initial = hero.fullName ? hero.fullName.charAt(0).toUpperCase() : "?";

  return (
    <div style={{
      background: "#FFFFFF",
      color: "#0F172A",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .breeze-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .breeze-reveal.breeze-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navbar */
        .breeze-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          border-left: 4px solid #0D9488;
        }
        .breeze-nav-name {
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
        }
        .breeze-nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breeze-nav-links {
          display: flex;
          align-items: center;
          gap: 0.1rem;
        }
        .breeze-nav-link {
          color: #64748B;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 7px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          background: none;
          border: none;
          font-family: inherit;
        }
        .breeze-nav-link:hover {
          color: #0D9488;
          background: #F0FDFA;
        }
        .breeze-otw-badge {
          font-size: 11px;
          font-weight: 600;
          color: #0D9488;
          background: #F0FDFA;
          border: 1px solid #99F6E4;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.03em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .breeze-otw-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0D9488;
          animation: breeze-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes breeze-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .breeze-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .breeze-hamburger div {
          width: 22px;
          height: 2px;
          background: #64748B;
          border-radius: 2px;
        }
        .breeze-mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: #fff;
          border-bottom: 1px solid #E2E8F0;
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .breeze-mobile-link {
          color: #64748B;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          border-bottom: 1px solid #F1F5F9;
          transition: color 0.2s;
          font-family: inherit;
        }
        .breeze-mobile-link:hover { color: #0D9488; }

        /* Hero */
        .breeze-hero {
          padding: 5rem 3rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4rem;
          align-items: center;
        }
        .breeze-hero-greeting {
          font-size: 14px;
          font-weight: 600;
          color: #0D9488;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .breeze-hero-name {
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 900;
          color: #0F172A;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 0.5rem;
        }
        .breeze-hero-role {
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 600;
          color: #0D9488;
          margin-bottom: 1.25rem;
        }
        .breeze-hero-tagline {
          font-size: 16px;
          color: #64748B;
          font-style: italic;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .breeze-hero-bio {
          font-size: 15px;
          color: #475569;
          line-height: 1.8;
          max-width: 500px;
          margin-bottom: 2.5rem;
        }
        .breeze-hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .breeze-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 24px;
          background: #0D9488;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          border-radius: 9px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.3);
        }
        .breeze-btn-primary:hover {
          background: #0F766E;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(13, 148, 136, 0.4);
        }
        .breeze-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 24px;
          background: transparent;
          color: #0F172A;
          font-size: 14px;
          font-weight: 600;
          border-radius: 9px;
          text-decoration: none;
          border: 1.5px solid #E2E8F0;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .breeze-btn-secondary:hover {
          border-color: #0D9488;
          color: #0D9488;
          background: #F0FDFA;
        }

        /* Profile image */
        .breeze-profile-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .breeze-profile-ring {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          padding: 5px;
          background: linear-gradient(135deg, #0D9488, #06B6D4);
          animation: breeze-float 5s ease-in-out infinite;
        }
        @keyframes breeze-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .breeze-profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 4px solid #fff;
        }
        .breeze-profile-initial {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #F0FDFA;
          border: 4px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 72px;
          font-weight: 900;
          color: #0D9488;
          letter-spacing: -0.05em;
        }

        /* Sections */
        .breeze-section {
          padding: 5rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .breeze-divider {
          border: none;
          border-top: 1px solid #E2E8F0;
          margin: 0;
        }
        .breeze-section-header {
          margin-bottom: 3rem;
        }
        .breeze-section-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0D9488;
          margin-bottom: 0.4rem;
        }
        .breeze-section-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
        }

        /* Projects */
        .breeze-projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .breeze-project-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .breeze-project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0D9488, #06B6D4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .breeze-project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(13, 148, 136, 0.12);
        }
        .breeze-project-card:hover::before {
          opacity: 1;
        }
        .breeze-project-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid #E2E8F0;
        }
        .breeze-project-img-placeholder {
          width: 100%;
          height: 160px;
          background: linear-gradient(135deg, #F0FDFA, #ECFDF5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #99F6E4;
          border-bottom: 1px solid #E2E8F0;
        }
        .breeze-project-body {
          padding: 1.25rem;
        }
        .breeze-project-name {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }
        .breeze-project-desc {
          font-size: 13px;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }
        .breeze-project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 0.75rem;
        }
        .breeze-stack-pill {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 9px;
          background: #F0FDFA;
          color: #0D9488;
          border: 1px solid #99F6E4;
          border-radius: 20px;
        }
        .breeze-project-links {
          display: flex;
          gap: 8px;
        }
        .breeze-project-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #64748B;
          text-decoration: none;
          padding: 5px 10px;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .breeze-project-link:hover {
          color: #0D9488;
          border-color: #99F6E4;
          background: #F0FDFA;
        }
        .breeze-project-link.live {
          color: #0D9488;
          border-color: #99F6E4;
        }
        .breeze-project-link.live:hover {
          background: #F0FDFA;
          border-color: #0D9488;
        }

        /* Skills */
        .breeze-skill-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }
        .breeze-skill-tab {
          padding: 8px 18px;
          background: none;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          color: #64748B;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .breeze-skill-tab:hover {
          border-color: #0D9488;
          color: #0D9488;
          background: #F0FDFA;
        }
        .breeze-skill-tab.active {
          background: #0D9488;
          border-color: #0D9488;
          color: #fff;
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.25);
        }
        .breeze-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .breeze-skill-tag {
          font-size: 13px;
          font-weight: 500;
          padding: 8px 18px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 24px;
          color: #475569;
          transition: all 0.2s;
          cursor: default;
        }
        .breeze-skill-tag:hover {
          background: #F0FDFA;
          border-color: #0D9488;
          color: #0D9488;
        }

        /* Contact */
        .breeze-contact-section {
          background: #F0FDFA;
          border-top: 1px solid #CCFBF1;
          border-bottom: 1px solid #CCFBF1;
          padding: 5rem 3rem;
        }
        .breeze-contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .breeze-contact-heading {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 900;
          color: #0F172A;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .breeze-contact-heading span {
          color: #0D9488;
        }
        .breeze-contact-sub {
          font-size: 15px;
          color: #64748B;
          line-height: 1.75;
          max-width: 400px;
        }
        .breeze-contact-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .breeze-contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: all 0.2s;
        }
        .breeze-contact-link:hover {
          border-color: #0D9488;
          color: #0F172A;
          transform: translateX(4px);
          box-shadow: 0 4px 16px rgba(13, 148, 136, 0.1);
        }
        .breeze-contact-link-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #F0FDFA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0D9488;
          flex-shrink: 0;
        }
        .breeze-contact-link-text {
          flex: 1;
        }
        .breeze-contact-link-label {
          font-size: 11px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          display: block;
          margin-bottom: 1px;
        }
        .breeze-contact-link-value {
          font-size: 14px;
          color: #475569;
          font-weight: 500;
        }

        /* Footer */
        .breeze-footer {
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #94A3B8;
          border-top: 1px solid #E2E8F0;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .breeze-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .breeze-nav { padding: 0 1.25rem; border-left-width: 3px; }
          .breeze-nav-links { display: none; }
          .breeze-otw-badge { display: none; }
          .breeze-hamburger { display: flex !important; }
          .breeze-hero {
            grid-template-columns: 1fr !important;
            padding: 4rem 1.25rem 3rem;
            gap: 2.5rem;
          }
          .breeze-profile-ring { width: 150px; height: 150px; }
          .breeze-profile-initial { font-size: 48px; }
          .breeze-profile-wrap { order: -1; }
          .breeze-section { padding: 4rem 1.25rem; }
          .breeze-projects-grid { grid-template-columns: 1fr !important; }
          .breeze-contact-section { padding: 4rem 1.25rem; }
          .breeze-contact-inner { grid-template-columns: 1fr !important; gap: 2.5rem; }
          .breeze-footer { padding: 1.5rem 1.25rem; }
        }
        @media (min-width: 769px) {
          .breeze-hamburger { display: none; }
          .breeze-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="breeze-nav">
        <span className="breeze-nav-name">{hero.fullName || "Portfolio"}</span>
        <div className="breeze-nav-right">
          <div className="breeze-nav-links">
            {navLinks.map((id) => (
              <button key={id} className="breeze-nav-link" onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
          {hero.openToWork && (
            <span className="breeze-otw-badge">
              <span className="breeze-otw-dot" />
              Open to Work
            </span>
          )}
          <button
            className="breeze-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div /><div /><div />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="breeze-mobile-menu">
          {navLinks.map((id) => (
            <button key={id} className="breeze-mobile-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Hero */}
      <section className="breeze-hero">
        <div>
          <div className="breeze-hero-greeting">Hello, I'm</div>
          {hero.fullName && (
            <h1 className="breeze-hero-name">{hero.fullName}</h1>
          )}
          {hero.role && (
            <div className="breeze-hero-role">{hero.role}</div>
          )}
          {hero.tagline && (
            <p className="breeze-hero-tagline">"{hero.tagline}"</p>
          )}
          {hero.description && (
            <p className="breeze-hero-bio">{hero.description}</p>
          )}
          <div className="breeze-hero-btns">
            {hero.resumeLink && (
              <a
                href={hero.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="breeze-btn-primary"
              >
                Download Resume
              </a>
            )}
            <button
              className="breeze-btn-secondary"
              onClick={() => scrollTo("contact")}
            >
              <FiMail size={14} /> Get in Touch
            </button>
          </div>
        </div>

        <div className="breeze-profile-wrap">
          <div className="breeze-profile-ring">
            {profileImg ? (
              <img
                src={profileImg}
                alt={hero.fullName || "Profile"}
                className="breeze-profile-img"
              />
            ) : (
              <div className="breeze-profile-initial">{initial}</div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <hr className="breeze-divider" />
          <section id="projects" className="breeze-section">
            <div className="breeze-section-header breeze-reveal">
              <div className="breeze-section-eyebrow">Selected Work</div>
              <h2 className="breeze-section-title">Projects</h2>
            </div>
            <div className="breeze-projects-grid">
              {projects.map((p, i) => {
                const img = Array.isArray(p.images) ? p.images[0] : p.images;
                return (
                  <div
                    key={i}
                    className="breeze-project-card breeze-reveal"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    {img ? (
                      <img src={img} alt={p.name} className="breeze-project-img" />
                    ) : (
                      <div className="breeze-project-img-placeholder">◇</div>
                    )}
                    <div className="breeze-project-body">
                      <div className="breeze-project-name">{p.name}</div>
                      {p.description && (
                        <p className="breeze-project-desc">{p.description}</p>
                      )}
                      {(p.stack || []).length > 0 && (
                        <div className="breeze-project-stack">
                          {(p.stack || []).map((tech) => (
                            <span key={tech} className="breeze-stack-pill">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="breeze-project-links">
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="breeze-project-link"
                          >
                            <FiGithub size={13} /> Code
                          </a>
                        )}
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="breeze-project-link live"
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
        </>
      )}

      {/* Skills */}
      {skillTabs.length > 0 && (
        <>
          <hr className="breeze-divider" />
          <section id="skills" className="breeze-section">
            <div className="breeze-section-header breeze-reveal">
              <div className="breeze-section-eyebrow">What I Know</div>
              <h2 className="breeze-section-title">Skills</h2>
            </div>
            <div className="breeze-reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="breeze-skill-tabs">
                {skillTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`breeze-skill-tab${activeTab === tab ? " active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="breeze-skills-list">
                {(skillMap[activeTab] || []).map((skill) => (
                  <span key={skill} className="breeze-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Contact */}
      <section id="contact" className="breeze-contact-section">
        <div className="breeze-contact-inner breeze-reveal">
          <div>
            <h2 className="breeze-contact-heading">
              Let's work<br /><span>together.</span>
            </h2>
            <p className="breeze-contact-sub">
              Have a project in mind or want to collaborate? I'm always open to new opportunities
              and interesting conversations.
            </p>
          </div>
          <div className="breeze-contact-links">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="breeze-contact-link">
                <span className="breeze-contact-link-icon"><FiMail size={16} /></span>
                <span className="breeze-contact-link-text">
                  <span className="breeze-contact-link-label">Email</span>
                  <span className="breeze-contact-link-value">{contact.email}</span>
                </span>
              </a>
            )}
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" className="breeze-contact-link">
                <span className="breeze-contact-link-icon"><FiGithub size={16} /></span>
                <span className="breeze-contact-link-text">
                  <span className="breeze-contact-link-label">GitHub</span>
                  <span className="breeze-contact-link-value">
                    {contact.github.replace("https://github.com/", "")}
                  </span>
                </span>
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="breeze-contact-link">
                <span className="breeze-contact-link-icon"><FiLinkedin size={16} /></span>
                <span className="breeze-contact-link-text">
                  <span className="breeze-contact-link-label">LinkedIn</span>
                  <span className="breeze-contact-link-value">
                    {contact.linkedin.replace("https://linkedin.com/in/", "")}
                  </span>
                </span>
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noreferrer" className="breeze-contact-link">
                <span className="breeze-contact-link-icon"><FiGlobe size={16} /></span>
                <span className="breeze-contact-link-text">
                  <span className="breeze-contact-link-label">Website</span>
                  <span className="breeze-contact-link-value">
                    {contact.website.replace(/^https?:\/\//, "")}
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="breeze-footer">
        <span>{`© ${new Date().getFullYear()} ${hero.fullName || ""}. All rights reserved.`}</span>
        <span>Built with BuildMyFolio</span>
      </footer>
    </div>
  );
}
