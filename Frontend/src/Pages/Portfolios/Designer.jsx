import { useState } from "react";

const projects = [
  { id: 1, title: "Brand Identity", category: "Branding", year: "2024", color: "#C9A84C" },
  { id: 2, title: "Mobile App UI", category: "UI/UX", year: "2024", color: "#8B7FD4" },
  { id: 3, title: "Editorial Layout", category: "Print", year: "2023", color: "#5BA3A0" },
  { id: 4, title: "Motion Graphics", category: "Motion", year: "2023", color: "#D4756B" },
  { id: 5, title: "Web Redesign", category: "UI/UX", year: "2023", color: "#7EB87A" },
  { id: 6, title: "Packaging Design", category: "Branding", year: "2022", color: "#C9A84C" },
];

const skills = ["Brand Strategy", "Typography", "Motion Design", "Figma", "After Effects", "Print Design"];

export default function DesignerPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const categories = ["All", "Branding", "UI/UX", "Print", "Motion"];

  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{
      background: "#0A0A14",
      color: "#E8E4D9",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      minHeight: "100vh",
    }}>
      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "2rem 4rem", borderBottom: "0.5px solid rgba(201,168,76,0.2)"
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.3em" }}>
          SOFIA ANDREOU
        </span>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {["Work", "About", "Process", "Contact"].map(item => (
            <a key={item} href="#" style={{
              color: "#E8E4D9", textDecoration: "none", fontSize: "13px",
              letterSpacing: "0.1em", opacity: 0.7,
              fontFamily: "'Courier New', monospace"
            }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "6rem 4rem 4rem", maxWidth: "1100px" }}>
        <div style={{
          fontSize: "11px", letterSpacing: "0.4em", color: "#C9A84C",
          fontFamily: "'Courier New', monospace", marginBottom: "2rem"
        }}>
          VISUAL DESIGNER — ATHENS / BERLIN
        </div>
        <h1 style={{
          fontSize: "clamp(48px, 7vw, 88px)", fontWeight: "normal",
          lineHeight: "1.05", margin: "0 0 2rem",
          color: "#E8E4D9"
        }}>
          Crafting brands<br />
          <span style={{ color: "#C9A84C", fontStyle: "italic" }}>that endure.</span>
        </h1>
        <p style={{
          fontSize: "16px", lineHeight: "1.8", maxWidth: "480px",
          color: "rgba(232,228,217,0.6)", margin: "0 0 3rem"
        }}>
          8 years shaping visual identities for fashion houses, cultural institutions, and forward-thinking startups.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <button style={{
            background: "#C9A84C", color: "#0A0A14", border: "none",
            padding: "14px 32px", fontSize: "12px", letterSpacing: "0.2em",
            cursor: "pointer", fontFamily: "'Courier New', monospace"
          }}>VIEW SELECTED WORK</button>
          <span style={{ color: "rgba(232,228,217,0.4)", fontSize: "12px", letterSpacing: "0.1em" }}>
            AVAILABLE FOR FREELANCE
          </span>
        </div>
      </section>

      {/* Skills ribbon */}
      <div style={{
        borderTop: "0.5px solid rgba(201,168,76,0.2)",
        borderBottom: "0.5px solid rgba(201,168,76,0.2)",
        padding: "1rem 4rem",
        display: "flex", gap: "2rem", overflowX: "auto",
        background: "rgba(201,168,76,0.05)"
      }}>
        {skills.map((s, i) => (
          <span key={i} style={{
            fontSize: "11px", letterSpacing: "0.25em", whiteSpace: "nowrap",
            color: "rgba(232,228,217,0.5)", fontFamily: "'Courier New', monospace"
          }}>— {s.toUpperCase()}</span>
        ))}
      </div>

      {/* Work */}
      <section style={{ padding: "5rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "0.3em", color: "#C9A84C", fontFamily: "'Courier New', monospace", margin: 0 }}>
            SELECTED PROJECTS
          </h2>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "12px", letterSpacing: "0.15em",
                color: activeFilter === cat ? "#C9A84C" : "rgba(232,228,217,0.4)",
                fontFamily: "'Courier New', monospace",
                borderBottom: activeFilter === cat ? "1px solid #C9A84C" : "1px solid transparent",
                paddingBottom: "2px", transition: "all 0.2s"
              }}>{cat.toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px", background: "rgba(201,168,76,0.15)"
        }}>
          {filtered.map(project => (
            <div key={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                background: hoveredProject === project.id ? "#111120" : "#0A0A14",
                padding: "3rem 2.5rem",
                cursor: "pointer",
                transition: "background 0.3s",
                position: "relative", overflow: "hidden"
              }}>
              <div style={{
                width: "40px", height: "2px",
                background: project.color, marginBottom: "2rem"
              }} />
              <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(232,228,217,0.4)", marginBottom: "0.75rem", fontFamily: "'Courier New', monospace" }}>
                {project.category.toUpperCase()}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "normal", margin: "0 0 1rem", color: "#E8E4D9" }}>
                {project.title}
              </h3>
              <div style={{ fontSize: "12px", color: "rgba(232,228,217,0.3)", fontFamily: "'Courier New', monospace" }}>
                {project.year}
              </div>
              {hoveredProject === project.id && (
                <div style={{
                  position: "absolute", bottom: "2rem", right: "2rem",
                  fontSize: "24px", color: project.color
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section style={{
        padding: "5rem 4rem",
        borderTop: "0.5px solid rgba(201,168,76,0.2)",
        display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start"
      }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#C9A84C", marginBottom: "1rem", fontFamily: "'Courier New', monospace" }}>
            THE PERSON
          </div>
          <div style={{
            width: "180px", height: "220px",
            background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
            border: "0.5px solid rgba(201,168,76,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(232,228,217,0.2)", fontSize: "12px", letterSpacing: "0.1em"
          }}>
            PHOTO
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: "32px", fontWeight: "normal", margin: "0 0 1.5rem", lineHeight: "1.3" }}>
            I believe design is a conversation between maker and receiver.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "rgba(232,228,217,0.6)", marginBottom: "2rem" }}>
            Trained at the Bauhaus-Universität Weimar, I've spent a decade learning that the best design disappears — leaving only the feeling it creates behind. Currently based between Athens and Berlin, working with clients globally.
          </p>
          <div style={{ display: "flex", gap: "3rem" }}>
            {[["24+", "Projects"], ["8", "Years"], ["3", "Awards"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "32px", color: "#C9A84C" }}>{num}</div>
                <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(232,228,217,0.4)", fontFamily: "'Courier New', monospace" }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{
        padding: "5rem 4rem",
        borderTop: "0.5px solid rgba(201,168,76,0.2)",
        background: "rgba(201,168,76,0.03)"
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#C9A84C", marginBottom: "2rem", fontFamily: "'Courier New', monospace" }}>
          START A PROJECT
        </div>
        <h2 style={{ fontSize: "48px", fontWeight: "normal", margin: "0 0 1rem" }}>
          Let's build something<br />
          <span style={{ color: "#C9A84C", fontStyle: "italic" }}>worth remembering.</span>
        </h2>
        <a href="mailto:sofia@studio.com" style={{
          display: "inline-block", marginTop: "2rem",
          color: "#C9A84C", fontSize: "18px", textDecoration: "none",
          borderBottom: "1px solid rgba(201,168,76,0.4)", paddingBottom: "4px"
        }}>sofia@studio.com →</a>
      </section>
    </div>
  );
}