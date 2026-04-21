import { useState } from "react";

export default function Freelancer({ data = {} }) {
  const hero = data.hero || {};
  const navbar = data.navbar || {};
  const stats = data.stats || [];
  const clients = data.clients || [];
  const services = data.services || [];
  const testimonials = data.testimonials || [];
  const contact = data.contact || {};
  const directContact = data.directContact || [];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div style={{
      background: "#FFFFFF",
      fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
      minHeight: "100vh",
      color: "#111111"
    }}>

      <nav style={{
        padding: "1.5rem 4rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontSize: "20px", fontWeight: "800",
          background: "linear-gradient(90deg, #FF4D2E, #FF8C00)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          {hero.fullName || "Your Name"}.
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {(navbar.navItems || []).map((item, i) => (
            <a key={i} href={item.href} style={{
              fontSize: "14px", color: "#555", textDecoration: "none", fontWeight: "500"
            }}>{item.label}</a>
          ))}
          {navbar.ctaButton?.label && (
            <a href={navbar.ctaButton.href || "#contact"} style={{
              padding: "10px 22px", background: "#111", color: "#FFF",
              borderRadius: "100px", fontSize: "13px",
              fontWeight: "600", textDecoration: "none"
            }}>{navbar.ctaButton.label}</a>
          )}
        </div>
      </nav>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh" }}>
        <div style={{
          padding: "4rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
          background: "#FF4D2E"
        }}>
          {hero.availabilityText && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.2)",
              padding: "6px 14px", borderRadius: "100px",
              fontSize: "12px", fontWeight: "600", color: "#FFF",
              width: "fit-content", marginBottom: "2rem"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFF", display: "inline-block" }} />
              {hero.availabilityText}
            </div>
          )}
          <h1 style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: "800", lineHeight: "1.1",
            color: "#FFF", margin: "0 0 1.5rem"
          }}>
            {hero.headline || "Your headline here."}
          </h1>
          {hero.subtext && (
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              {hero.subtext}
            </p>
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            {(hero.ctaButtons || []).map((btn, i) => (
              <a key={i} href={btn.href} style={{
                padding: "14px 28px",
                background: i === 0 ? "#FFF" : "transparent",
                color: i === 0 ? "#FF4D2E" : "#FFF",
                border: i === 0 ? "none" : "2px solid rgba(255,255,255,0.5)",
                borderRadius: "100px", fontSize: "14px",
                fontWeight: "700", textDecoration: "none"
              }}>{btn.label}</a>
            ))}
          </div>
        </div>

        <div style={{
          background: "#0A192F", padding: "4rem",
          display: "flex", flexDirection: "column", justifyContent: "space-between"
        }}>
          {stats.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1.5rem", borderRadius: "12px",
                  border: "0.5px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#38BDF8" }}>{stat.value}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {clients.length > 0 && (
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
                TRUSTED BY TEAMS AT
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {clients.map((c, i) => (
                  <span key={i} style={{
                    padding: "6px 16px",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    borderRadius: "100px", fontSize: "12px",
                    border: "0.5px solid rgba(255,255,255,0.15)",
                    fontWeight: "500"
                  }}>{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {services.length > 0 && (
        <section id="services" style={{ padding: "5rem 4rem" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#FF4D2E", fontWeight: "600", marginBottom: "0.75rem" }}>
              WHAT I DO
            </div>
            <h2 style={{ fontSize: "38px", fontWeight: "800", margin: 0 }}>
              Services
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {services.map((s, i) => (
              <div key={i} style={{
                padding: "2rem 1.75rem",
                border: "1.5px solid #F0F0F0",
                borderRadius: "16px",
              }}>
                {s.icon && <div style={{ fontSize: "24px", marginBottom: "1rem" }}>{s.icon}</div>}
                <h3 style={{ fontSize: "17px", fontWeight: "700", margin: "0 0 0.75rem" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.7", margin: 0 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section id="testimonials" style={{ padding: "5rem 4rem", background: "#F8F8F6" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#FF4D2E", fontWeight: "600", marginBottom: "3rem" }}>
            WHAT CLIENTS SAY
          </div>
          <div style={{ maxWidth: "700px" }}>
            <blockquote style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: "600", lineHeight: "1.5",
              margin: "0 0 2rem", color: "#111"
            }}>
              "{testimonials[activeTestimonial]?.quote}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "#FF4D2E", color: "#FFF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: "700"
              }}>
                {testimonials[activeTestimonial]?.name?.[0]}
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "14px" }}>{testimonials[activeTestimonial]?.name}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>{testimonials[activeTestimonial]?.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                  width: i === activeTestimonial ? "32px" : "8px",
                  height: "8px", borderRadius: "100px",
                  background: i === activeTestimonial ? "#FF4D2E" : "#DDD",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s", padding: 0
                }} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" style={{
        padding: "5rem 4rem",
        background: "#0A192F",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center"
      }}>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#38BDF8", fontWeight: "600", marginBottom: "1rem" }}>
            LET'S WORK TOGETHER
          </div>
          <h2 style={{ fontSize: "38px", fontWeight: "800", color: "#FFF", margin: "0 0 1rem" }}>
            {contact.heading || "Got a project?"}
          </h2>
          {contact.subtext && (
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.8", fontSize: "15px" }}>
              {contact.subtext}
            </p>
          )}
        </div>
        <div>
          {contact.email && (
            <a href={`mailto:${contact.email}`} style={{
              display: "block", width: "100%", padding: "16px",
              background: "#FF4D2E", color: "#FFF",
              borderRadius: "12px", fontSize: "14px", fontWeight: "700",
              textDecoration: "none", textAlign: "center", marginBottom: "1rem"
            }}>
              {contact.buttonLabel || "Send me a message"} →
            </a>
          )}
          {directContact.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {directContact.map((dc, i) => (
                <a key={i} href={dc.href} target="_blank" rel="noreferrer" style={{
                  fontSize: "13px", color: "rgba(255,255,255,0.5)",
                  textDecoration: "none", textAlign: "center"
                }}>
                  {dc.platform}: {dc.href}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}