import { useState, useEffect } from "react";

function TypingText({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <span style={{ animation: "blink 1s step-end infinite", display: "inline-block", width: "2px", height: "1.1em", background: "#00FF88", verticalAlign: "middle", marginLeft: "2px" }}>|</span>
    </span>
  );
}

export default function Developer({ data = {} }) {
  const hero = data.hero || {};
  const navbar = data.navbar || {};
  const projects = data.projects || [];
  const skills = data.skills || [];
  const contact = data.contact || {};

  const skillMap = {};
  skills.forEach(s => { if (s.categoryName) skillMap[s.categoryName] = s.items || []; });
  const skillTabs = Object.keys(skillMap);
  const [activeTab, setActiveTab] = useState(() => skillTabs[0] || null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{
      background: "#FAFAF8", color: "#111111",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      minHeight: "100vh",
    }}>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 768px) {
          .dev-nav-links { display: none !important; }
          .dev-open-to-work { display: none !important; }
          .dev-hamburger { display: flex !important; }
          .dev-projects-grid { grid-template-columns: 1fr !important; }
          .dev-hero-section { padding: 3rem 1.25rem 2rem !important; }
          .dev-section { padding: 2.5rem 1.25rem !important; }
          .dev-contact-section { padding: 3rem 1.25rem !important; }
          .dev-contact-h2 { font-size: 28px !important; }
        }
        @media (min-width: 769px) {
          .dev-hamburger { display: none !important; }
        }
      `}</style>

      <nav style={{
        padding: "1rem 1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid #E5E5E5", background: "#FFFFFF",
        position: "relative"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00FF88" }} />
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>
            {hero.fullName?.toLowerCase().replace(/\s+/g, ".") || "yourname.dev"}
          </span>
        </div>

        <div className="dev-nav-links" style={{ display: "flex", gap: "2.5rem" }}>
          {["./projects", "./skills", "./contact"].map(item => (
            <a key={item} href={`#${item}`} onClick={(e) => {
              e.preventDefault();
              document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
            }} style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>{item}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {navbar.openToWork && (
            <div className="dev-open-to-work" style={{ background: "#00FF88", color: "#111", fontSize: "11px", padding: "6px 14px", fontWeight: "bold" }}>
              OPEN TO WORK
            </div>
          )}
          <button
            className="dev-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "none", flexDirection: "column", gap: "5px" }}
          >
            {[0, 1, 2].map(i => <div key={i} style={{ width: "20px", height: "2px", background: "#111" }} />)}
          </button>
        </div>

        {menuOpen && (
          <div style={{
            position: "absolute", top: "60px", left: 0, right: 0,
            background: "#fff", borderBottom: "1px solid #E5E5E5",
            padding: "1rem 1.5rem", display: "flex", flexDirection: "column",
            gap: "1rem", zIndex: 100
          }}>
            {["./projects", "./skills", "./contact"].map(item => (
              <a key={item} href={`#${item}`} onClick={(e) => {
                e.preventDefault();
                document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }} style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      <section className="dev-hero-section" style={{ padding: "6rem 5rem 4rem", maxWidth: "900px" }}>
        <div style={{ background: "#111111", borderRadius: "8px", padding: "1.5rem", marginBottom: "3rem", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "1.5rem" }}>
            {["#FF5F56", "#FFBD2E", "#27C93F"].map(c => (
              <div key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ color: "#4EC9B0", fontSize: "13px", marginBottom: "8px" }}>
            <span style={{ color: "#569CD6" }}>const</span>
            <span style={{ color: "#9CDCFE" }}> engineer</span>
            <span style={{ color: "#D4D4D4" }}> = {"{"}</span>
          </div>
          {[["name", hero.fullName], ["role", hero.role], ["location", hero.location], ["focus", hero.focus]]
            .filter(([, v]) => v).map(([key, val]) => (
              <div key={key} style={{ color: "#D4D4D4", fontSize: "13px", paddingLeft: "1.5rem", marginBottom: "4px" }}>
                <span style={{ color: "#9CDCFE" }}>{key}</span>
                <span>: </span>
                <span style={{ color: "#CE9178" }}>"{val}"</span>,
              </div>
            ))}
          <div style={{ color: "#D4D4D4", fontSize: "13px" }}>{"}"}</div>
        </div>

        <h1 style={{ fontSize: "clamp(28px, 5vw, 58px)", fontWeight: "700", lineHeight: "1.1", margin: "0 0 1rem" }}>
          <TypingText text={hero.tagline || "I build things that scale."} />
        </h1>
        <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555", maxWidth: "520px", marginBottom: "2.5rem" }}>
          {hero.description}
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" style={{
              padding: "12px 24px", fontSize: "13px", background: "#111", color: "#00FF88",
              border: "1.5px solid #111", fontFamily: "monospace", fontWeight: "bold", textDecoration: "none"
            }}>View GitHub →</a>
          )}
          <a href="#./contact" style={{
            padding: "12px 24px", fontSize: "13px", background: "transparent", color: "#111",
            border: "1.5px solid #111", fontFamily: "monospace", fontWeight: "bold", textDecoration: "none"
          }}>Contact Me →</a>
        </div>
      </section>


      <section id="./projects" className="dev-section" style={{ padding: "3rem 5rem 4rem", background: "#FFFFFF", borderTop: "1px solid #E5E5E5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "4px", height: "24px", background: "#00FF88" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#999" }}>// FEATURED PROJECTS</span>
        </div>
        <div className="dev-projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <div key={i} style={{ border: "1px solid #E5E5E5", borderRadius: "4px", background: "#FAFAF8", overflow: "hidden" }}>

              {(Array.isArray(p.images) ? p.images[0] : p.image) && (
                <img
                  src={Array.isArray(p.images) ? p.images[0] : p.images}
                  alt={p.name}
                  style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
                />
              )}

              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "8px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#111" }}>{p.name}</span>
                  {p.status && (
                    <div style={{
                      fontSize: "10px", padding: "3px 8px", whiteSpace: "nowrap",
                      background: p.status === "Production" ? "#F0FDF4" : "#EFF6FF",
                      color: p.status === "Production" ? "#16A34A" : "#2563EB",
                      border: `1px solid ${p.status === "Production" ? "#BBF7D0" : "#BFDBFE"}`,
                      borderRadius: "20px"
                    }}>{p.status}</div>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.6", margin: "0 0 1.25rem" }}>{p.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {(p.stack || []).map(tech => (
                      <span key={tech} style={{ fontSize: "11px", padding: "2px 8px", background: "#F0F0F0", color: "#555", borderRadius: "2px" }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#666", textDecoration: "none" }}>Code →</a>}
                    {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#00FF88", textDecoration: "none" }}>Live →</a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="./skills" className="dev-section" style={{ padding: "4rem 5rem", borderTop: "1px solid #E5E5E5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "4px", height: "24px", background: "#00FF88" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#999" }}>// TECH STACK</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {skillTabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 16px", background: "none", cursor: "pointer",
              fontSize: "12px", fontFamily: "monospace", border: "none",
              borderBottom: `2px solid ${activeTab === tab ? "#00FF88" : "transparent"}`,
              color: activeTab === tab ? "#111" : "#999",
              fontWeight: activeTab === tab ? "bold" : "normal"
            }}>{tab}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {(skillMap[activeTab] || []).map(skill => (
            <span key={skill} style={{ padding: "10px 20px", background: "#111", color: "#00FF88", fontSize: "13px", borderRadius: "2px", fontWeight: "bold" }}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="./contact" className="dev-contact-section" style={{ padding: "5rem", background: "#111111", color: "#FAFAF8" }}>
        <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#00FF88", marginBottom: "1.5rem" }}>// GET IN TOUCH</div>
        <h2 className="dev-contact-h2" style={{ fontSize: "42px", fontWeight: "700", margin: "0 0 1rem", color: "#FAFAF8" }}>
          Have a hard problem?<br />Let's solve it together.
        </h2>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {contact.email && (
            <a href={`mailto:${contact.email}`} style={{ color: "#00FF88", fontSize: "16px", textDecoration: "none" }}>{contact.email} →</a>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" style={{ color: "#888", fontSize: "16px", textDecoration: "none" }}>LinkedIn →</a>
          )}
        </div>
      </section>
    </div>
  );
}