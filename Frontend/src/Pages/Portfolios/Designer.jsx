import { useState } from "react";

export default function Designer({ data = {} }) {
  const hero = data.hero || {};
  const skills = data.skills || [];
  const projects = data.projects || [];
  const about = data.about || {};
  const contact = data.contact || {};

  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);

  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{ background: "#0A0A14", color: "#E8E4D9", fontFamily: "'Georgia', serif", minHeight: "100vh" }}>

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 4rem", borderBottom: "0.5px solid rgba(201,168,76,0.2)" }}>
        <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.3em" }}>
          {hero.fullName?.toUpperCase() || "YOUR NAME"}
        </span>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {["Work", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "#E8E4D9", textDecoration: "none", fontSize: "13px", opacity: 0.7, fontFamily: "monospace" }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      <section style={{ padding: "6rem 4rem 4rem", maxWidth: "1100px" }}>
        {hero.location && (
          <div style={{ fontSize: "11px", letterSpacing: "0.4em", color: "#C9A84C", fontFamily: "monospace", marginBottom: "2rem" }}>
            VISUAL DESIGNER — {hero.location.toUpperCase()}
          </div>
        )}
        <h1 style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: "normal", lineHeight: "1.05", margin: "0 0 2rem", color: "#E8E4D9" }}>
          {hero.tagline || "Crafting brands that endure."}
        </h1>
        {hero.bio && (
          <p style={{ fontSize: "16px", lineHeight: "1.8", maxWidth: "480px", color: "rgba(232,228,217,0.6)", margin: "0 0 3rem" }}>
            {hero.bio}
          </p>
        )}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="#work" style={{ background: "#C9A84C", color: "#0A0A14", padding: "14px 32px", fontSize: "12px", letterSpacing: "0.2em", fontFamily: "monospace", textDecoration: "none" }}>
            VIEW SELECTED WORK
          </a>
          {hero.availableForFreelance && (
            <span style={{ color: "rgba(232,228,217,0.4)", fontSize: "12px", letterSpacing: "0.1em" }}>
              AVAILABLE FOR FREELANCE
            </span>
          )}
        </div>
      </section>

      {skills.length > 0 && (
        <div style={{ borderTop: "0.5px solid rgba(201,168,76,0.2)", borderBottom: "0.5px solid rgba(201,168,76,0.2)", padding: "1rem 4rem", display: "flex", gap: "2rem", overflowX: "auto", background: "rgba(201,168,76,0.05)" }}>
          {skills.map((s, i) => (
            <span key={i} style={{ fontSize: "11px", letterSpacing: "0.25em", whiteSpace: "nowrap", color: "rgba(232,228,217,0.5)", fontFamily: "monospace" }}>
              — {s.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <section id="work" style={{ padding: "5rem 4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "13px", letterSpacing: "0.3em", color: "#C9A84C", fontFamily: "monospace", margin: 0 }}>
              SELECTED PROJECTS
            </h2>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "0.15em", color: activeFilter === cat ? "#C9A84C" : "rgba(232,228,217,0.4)", fontFamily: "monospace", borderBottom: activeFilter === cat ? "1px solid #C9A84C" : "1px solid transparent", paddingBottom: "2px" }}>
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(201,168,76,0.15)" }}>
            {filtered.map((project, i) => (
              <a
                key={i}
                href={project.link || "#"}
                target={project.link ? "_blank" : "_self"}
                rel="noreferrer"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ display: "block", background: hoveredProject === i ? "#111120" : "#0A0A14", padding: "3rem 2.5rem", cursor: "pointer", transition: "background 0.3s", position: "relative", overflow: "hidden", textDecoration: "none" }}
              >
                <div style={{ width: "40px", height: "2px", background: project.color || "#C9A84C", marginBottom: "2rem" }} />
                <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(232,228,217,0.4)", marginBottom: "0.75rem", fontFamily: "monospace" }}>
                  {project.category?.toUpperCase()}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "normal", margin: "0 0 1rem", color: "#E8E4D9" }}>
                  {project.title}
                </h3>
                <div style={{ fontSize: "12px", color: "rgba(232,228,217,0.3)", fontFamily: "monospace" }}>
                  {project.year}
                </div>
                {hoveredProject === i && (
                  <div style={{ position: "absolute", bottom: "2rem", right: "2rem", fontSize: "24px", color: project.color || "#C9A84C" }}>→</div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      <section id="about" style={{ padding: "5rem 4rem", borderTop: "0.5px solid rgba(201,168,76,0.2)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#C9A84C", marginBottom: "1rem", fontFamily: "monospace" }}>THE PERSON</div>
          <div style={{ width: "180px", height: "220px", background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)", border: "0.5px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(232,228,217,0.2)", fontSize: "12px" }}>
            PHOTO
          </div>
        </div>
        <div>
          {about.aboutHeadline && (
            <h2 style={{ fontSize: "32px", fontWeight: "normal", margin: "0 0 1.5rem", lineHeight: "1.3" }}>{about.aboutHeadline}</h2>
          )}
          {about.aboutBio && (
            <p style={{ fontSize: "15px", lineHeight: "1.9", color: "rgba(232,228,217,0.6)", marginBottom: "2rem" }}>{about.aboutBio}</p>
          )}
          <div style={{ display: "flex", gap: "3rem" }}>
            {[
              [about.stat1Value, about.stat1Label],
              [about.stat2Value, about.stat2Label],
              [about.stat3Value, about.stat3Label],
            ].filter(([val]) => val).map(([num, label], i) => (
              <div key={i}>
                <div style={{ fontSize: "32px", color: "#C9A84C" }}>{num}</div>
                <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(232,228,217,0.4)", fontFamily: "monospace" }}>{label?.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: "5rem 4rem", borderTop: "0.5px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.03)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#C9A84C", marginBottom: "2rem", fontFamily: "monospace" }}>START A PROJECT</div>
        <h2 style={{ fontSize: "48px", fontWeight: "normal", margin: "0 0 1rem" }}>
          {contact.contactHeadline || "Let's build something worth remembering."}
        </h2>
        {contact.email && (
          <a href={`mailto:${contact.email}`} style={{ display: "inline-block", marginTop: "2rem", color: "#C9A84C", fontSize: "18px", textDecoration: "none", borderBottom: "1px solid rgba(201,168,76,0.4)", paddingBottom: "4px" }}>
            {contact.email} →
          </a>
        )}
      </section>

    </div>
  );
}