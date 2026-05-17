import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiArrowRight } from "react-icons/fi";

function CyclingRole({ roles }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!roles || roles.length <= 1) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles]);

  if (!roles || roles.length === 0) return null;
  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        color: "#F59E0B",
      }}
    >
      {roles[index]}
    </span>
  );
}

export default function Obsidian({ data = {} }) {
  const hero = data.hero || {};
  const experience = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills || [];
  const contact = data.contact || {};

  const roles = hero.roles
    ? hero.roles.split(",").map((r) => r.trim()).filter(Boolean)
    : [];

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
          if (entry.isIntersecting) entry.target.classList.add("obsidian-in");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".obsidian-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects, skills, experience]);

  const navLinks = [
    ...(experience.length > 0 ? ["experience"] : []),
    "projects",
    "skills",
    "contact",
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const stats = [
    hero.yearsExp && { value: hero.yearsExp, label: "Years Experience" },
    hero.projectCount && { value: hero.projectCount, label: "Projects Shipped" },
    hero.techCount && { value: hero.techCount, label: "Technologies" },
  ].filter(Boolean);

  return (
    <div style={{
      background: "#0A0A0A",
      color: "#FAFAFA",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .obsidian-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .obsidian-reveal.obsidian-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navbar */
        .obsidian-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          background: #0A0A0A;
          border-bottom: 2px solid #F59E0B;
        }
        .obsidian-nav-name {
          font-size: 17px;
          font-weight: 800;
          color: #FAFAFA;
          letter-spacing: -0.03em;
        }
        .obsidian-nav-name span {
          color: #F59E0B;
        }
        .obsidian-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .obsidian-nav-link {
          color: #71717A;
          font-size: 13px;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          background: none;
          border: none;
          font-family: inherit;
        }
        .obsidian-nav-link:hover {
          color: #FAFAFA;
          background: rgba(255, 255, 255, 0.04);
        }
        .obsidian-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .obsidian-hamburger div {
          width: 22px;
          height: 2px;
          background: #71717A;
          border-radius: 2px;
        }
        .obsidian-mobile-menu {
          position: fixed;
          top: 60px; left: 0; right: 0;
          background: #0A0A0A;
          border-bottom: 1px solid #1F1F1F;
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
        }
        .obsidian-mobile-link {
          color: #71717A;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          border-bottom: 1px solid #1F1F1F;
          transition: color 0.2s;
          font-family: inherit;
        }
        .obsidian-mobile-link:hover { color: #FAFAFA; }

        /* Hero */
        .obsidian-hero {
          padding: 6rem 3rem 5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .obsidian-hero-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #F59E0B;
          margin-bottom: 1.25rem;
        }
        .obsidian-hero-name {
          font-size: clamp(48px, 7vw, 90px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: #FAFAFA;
          margin-bottom: 1rem;
        }
        .obsidian-hero-role-line {
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 500;
          color: #71717A;
          margin-bottom: 1.5rem;
          min-height: 40px;
        }
        .obsidian-hero-tagline {
          font-size: 18px;
          font-weight: 400;
          color: #A1A1AA;
          margin-bottom: 1rem;
          max-width: 560px;
          line-height: 1.6;
        }
        .obsidian-hero-bio {
          font-size: 15px;
          color: #71717A;
          line-height: 1.8;
          max-width: 520px;
          margin-bottom: 2.5rem;
        }
        .obsidian-stats-row {
          display: flex;
          gap: 3rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .obsidian-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .obsidian-stat-value {
          font-size: 36px;
          font-weight: 900;
          color: #F59E0B;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .obsidian-stat-label {
          font-size: 12px;
          font-weight: 500;
          color: #52525B;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .obsidian-hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .obsidian-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: #F59E0B;
          color: #0A0A0A;
          font-size: 14px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .obsidian-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(245, 158, 11, 0.4);
        }
        .obsidian-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: transparent;
          color: #A1A1AA;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          border: 1px solid #1F1F1F;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          font-family: inherit;
        }
        .obsidian-btn-secondary:hover {
          border-color: #3F3F46;
          color: #FAFAFA;
        }

        /* Sections */
        .obsidian-section {
          padding: 5rem 3rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .obsidian-divider {
          border: none;
          border-top: 1px solid #111111;
          margin: 0;
        }
        .obsidian-section-header {
          margin-bottom: 3rem;
        }
        .obsidian-section-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F59E0B;
          margin-bottom: 0.5rem;
        }
        .obsidian-section-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          color: #FAFAFA;
          letter-spacing: -0.04em;
        }

        /* Experience Timeline */
        .obsidian-timeline {
          position: relative;
          padding-left: 2rem;
        }
        .obsidian-timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: linear-gradient(to bottom, #F59E0B, transparent);
        }
        .obsidian-timeline-item {
          position: relative;
          padding-bottom: 2.5rem;
          padding-left: 1.5rem;
        }
        .obsidian-timeline-item:last-child {
          padding-bottom: 0;
        }
        .obsidian-timeline-dot {
          position: absolute;
          left: -1.5rem;
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #F59E0B;
          border: 2px solid #0A0A0A;
          box-shadow: 0 0 0 2px #F59E0B;
        }
        .obsidian-exp-role {
          font-size: 17px;
          font-weight: 700;
          color: #FAFAFA;
          letter-spacing: -0.02em;
          margin-bottom: 3px;
        }
        .obsidian-exp-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .obsidian-exp-company {
          font-size: 14px;
          font-weight: 600;
          color: #F59E0B;
        }
        .obsidian-exp-sep {
          color: #3F3F46;
          font-size: 12px;
        }
        .obsidian-exp-duration {
          font-size: 13px;
          color: #52525B;
        }
        .obsidian-exp-desc {
          font-size: 14px;
          color: #71717A;
          line-height: 1.7;
          margin-bottom: 10px;
          max-width: 600px;
        }
        .obsidian-exp-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .obsidian-exp-skill-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          background: rgba(245, 158, 11, 0.08);
          color: #D97706;
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 4px;
        }

        /* Projects */
        .obsidian-projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .obsidian-project-card {
          background: #111111;
          border: 1px solid #1F1F1F;
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .obsidian-project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #F59E0B, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .obsidian-project-card:hover {
          border-color: #2D2D2D;
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }
        .obsidian-project-card:hover::before {
          opacity: 1;
        }
        .obsidian-project-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid #1F1F1F;
        }
        .obsidian-project-img-placeholder {
          width: 100%;
          height: 180px;
          background: #0D0D0D;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: #2D2D2D;
          border-bottom: 1px solid #1F1F1F;
        }
        .obsidian-project-body {
          padding: 1.5rem;
        }
        .obsidian-project-name {
          font-size: 17px;
          font-weight: 700;
          color: #FAFAFA;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .obsidian-project-desc {
          font-size: 13px;
          color: #52525B;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .obsidian-project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 1rem;
        }
        .obsidian-stack-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          background: rgba(245, 158, 11, 0.06);
          color: #A16207;
          border: 1px solid rgba(245, 158, 11, 0.15);
          border-radius: 4px;
        }
        .obsidian-project-links {
          display: flex;
          gap: 8px;
        }
        .obsidian-project-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #52525B;
          text-decoration: none;
          padding: 5px 12px;
          border: 1px solid #1F1F1F;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .obsidian-project-link:hover {
          color: #FAFAFA;
          border-color: #3F3F46;
          background: rgba(255, 255, 255, 0.03);
        }
        .obsidian-project-link.live {
          color: #D97706;
          border-color: rgba(245, 158, 11, 0.2);
        }
        .obsidian-project-link.live:hover {
          background: rgba(245, 158, 11, 0.06);
          border-color: rgba(245, 158, 11, 0.4);
          color: #F59E0B;
        }

        /* Skills */
        .obsidian-skill-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid #1F1F1F;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .obsidian-skill-tab {
          padding: 10px 20px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          color: #52525B;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          font-family: inherit;
          position: relative;
        }
        .obsidian-skill-tab:hover {
          color: #A1A1AA;
        }
        .obsidian-skill-tab.active {
          color: #F59E0B;
          border-bottom-color: #F59E0B;
        }
        .obsidian-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .obsidian-skill-tag {
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          background: #111111;
          border: 1px solid #1F1F1F;
          border-radius: 6px;
          color: #A1A1AA;
          transition: all 0.2s;
          cursor: default;
        }
        .obsidian-skill-tag:hover {
          border-color: rgba(245, 158, 11, 0.3);
          color: #F59E0B;
          background: rgba(245, 158, 11, 0.05);
        }

        /* Contact */
        .obsidian-contact {
          background: #050505;
          border-top: 1px solid #111111;
          padding: 6rem 3rem;
        }
        .obsidian-contact-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .obsidian-contact-heading {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #FAFAFA;
          margin-bottom: 0.5rem;
          line-height: 1.0;
        }
        .obsidian-contact-heading span {
          color: #F59E0B;
        }
        .obsidian-contact-sub {
          font-size: 16px;
          color: #52525B;
          margin-bottom: 2.5rem;
          max-width: 420px;
          line-height: 1.7;
        }
        .obsidian-contact-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .obsidian-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #71717A;
          text-decoration: none;
          padding: 11px 22px;
          background: #111111;
          border: 1px solid #1F1F1F;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .obsidian-contact-link:hover {
          color: #FAFAFA;
          border-color: #3F3F46;
          transform: translateY(-2px);
        }
        .obsidian-contact-link.email {
          color: #F59E0B;
          border-color: rgba(245, 158, 11, 0.25);
        }
        .obsidian-contact-link.email:hover {
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2);
        }

        /* Footer */
        .obsidian-footer {
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #111111;
          font-size: 12px;
          color: #3F3F46;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .obsidian-nav-links { display: none; }
          .obsidian-hamburger { display: flex !important; }
          .obsidian-projects-grid { grid-template-columns: 1fr !important; }
          .obsidian-hero { padding: 4rem 1.25rem 3rem; }
          .obsidian-section { padding: 4rem 1.25rem; }
          .obsidian-contact { padding: 4rem 1.25rem; }
          .obsidian-footer { padding: 1.5rem 1.25rem; }
          .obsidian-nav { padding: 0 1.25rem; }
          .obsidian-stats-row { gap: 2rem; }
        }
        @media (min-width: 769px) {
          .obsidian-hamburger { display: none; }
          .obsidian-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="obsidian-nav">
        <span className="obsidian-nav-name">{hero.fullName || "Portfolio"}</span>
        <div className="obsidian-nav-links">
          {navLinks.map((id) => (
            <button key={id} className="obsidian-nav-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="obsidian-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div /><div /><div />
        </button>
      </nav>

      {menuOpen && (
        <div className="obsidian-mobile-menu">
          {navLinks.map((id) => (
            <button key={id} className="obsidian-mobile-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Hero */}
      <section className="obsidian-hero">
        <div className="obsidian-hero-eyebrow">Hello, I'm</div>
        {hero.fullName && (
          <h1 className="obsidian-hero-name">{hero.fullName}</h1>
        )}
        {roles.length > 0 && (
          <div className="obsidian-hero-role-line">
            <CyclingRole roles={roles} />
          </div>
        )}
        {hero.tagline && (
          <p className="obsidian-hero-tagline">{hero.tagline}</p>
        )}
        {hero.description && (
          <p className="obsidian-hero-bio">{hero.description}</p>
        )}
        {stats.length > 0 && (
          <div className="obsidian-stats-row">
            {stats.map(({ value, label }) => (
              <div key={label} className="obsidian-stat">
                <span className="obsidian-stat-value">{value}</span>
                <span className="obsidian-stat-label">{label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="obsidian-hero-btns">
          {hero.resumeLink && (
            <a
              href={hero.resumeLink}
              target="_blank"
              rel="noreferrer"
              className="obsidian-btn-primary"
            >
              Resume <FiArrowRight size={15} />
            </a>
          )}
          <button className="obsidian-btn-secondary" onClick={() => scrollTo("contact")}>
            <FiMail size={14} /> Contact
          </button>
        </div>
      </section>

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <hr className="obsidian-divider" />
          <section id="experience" className="obsidian-section">
            <div className="obsidian-section-header obsidian-reveal">
              <div className="obsidian-section-eyebrow">Career</div>
              <h2 className="obsidian-section-title">Experience</h2>
            </div>
            <div className="obsidian-timeline">
              {experience.map((job, i) => (
                <div
                  key={i}
                  className="obsidian-timeline-item obsidian-reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="obsidian-timeline-dot" />
                  <div className="obsidian-exp-role">{job.role}</div>
                  <div className="obsidian-exp-meta">
                    {job.company && <span className="obsidian-exp-company">{job.company}</span>}
                    {job.company && job.duration && <span className="obsidian-exp-sep">·</span>}
                    {job.duration && <span className="obsidian-exp-duration">{job.duration}</span>}
                  </div>
                  {job.description && (
                    <p className="obsidian-exp-desc">{job.description}</p>
                  )}
                  {(job.skills || []).length > 0 && (
                    <div className="obsidian-exp-skills">
                      {(job.skills || []).map((s) => (
                        <span key={s} className="obsidian-exp-skill-tag">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <hr className="obsidian-divider" />
          <section id="projects" className="obsidian-section">
            <div className="obsidian-section-header obsidian-reveal">
              <div className="obsidian-section-eyebrow">Selected Work</div>
              <h2 className="obsidian-section-title">Projects</h2>
            </div>
            <div className="obsidian-projects-grid">
              {projects.map((p, i) => {
                const img = Array.isArray(p.images) ? p.images[0] : p.images;
                return (
                  <div
                    key={i}
                    className="obsidian-project-card obsidian-reveal"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    {img ? (
                      <img src={img} alt={p.name} className="obsidian-project-img" />
                    ) : (
                      <div className="obsidian-project-img-placeholder">◈</div>
                    )}
                    <div className="obsidian-project-body">
                      <div className="obsidian-project-name">{p.name}</div>
                      {p.description && (
                        <p className="obsidian-project-desc">{p.description}</p>
                      )}
                      {(p.stack || []).length > 0 && (
                        <div className="obsidian-project-stack">
                          {(p.stack || []).map((tech) => (
                            <span key={tech} className="obsidian-stack-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="obsidian-project-links">
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="obsidian-project-link"
                          >
                            <FiGithub size={13} /> Code
                          </a>
                        )}
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="obsidian-project-link live"
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
          <hr className="obsidian-divider" />
          <section id="skills" className="obsidian-section">
            <div className="obsidian-section-header obsidian-reveal">
              <div className="obsidian-section-eyebrow">Toolkit</div>
              <h2 className="obsidian-section-title">Skills</h2>
            </div>
            <div className="obsidian-reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="obsidian-skill-tabs">
                {skillTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`obsidian-skill-tab${activeTab === tab ? " active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="obsidian-skills-list">
                {(skillMap[activeTab] || []).map((skill) => (
                  <span key={skill} className="obsidian-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Contact */}
      <section id="contact" className="obsidian-contact">
        <div className="obsidian-contact-inner obsidian-reveal">
          <h2 className="obsidian-contact-heading">
            Let's <span>talk.</span>
          </h2>
          <p className="obsidian-contact-sub">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>
          <div className="obsidian-contact-links">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="obsidian-contact-link email"
              >
                <FiMail size={15} /> {contact.email}
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="obsidian-contact-link"
              >
                <FiGithub size={15} /> GitHub
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="obsidian-contact-link"
              >
                <FiLinkedin size={15} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="obsidian-footer">
        <span>{`© ${new Date().getFullYear()} ${hero.fullName || ""}. All rights reserved.`}</span>
        <span>Built with BuildMyFolio</span>
      </footer>
    </div>
  );
}
