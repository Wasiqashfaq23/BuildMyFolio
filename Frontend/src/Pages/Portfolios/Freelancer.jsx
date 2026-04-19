import { useState } from "react";

const services = [
  { icon: "◈", title: "Strategy", desc: "Product positioning, go-to-market planning, and competitive analysis for early-stage companies." },
  { icon: "◇", title: "Copywriting", desc: "Website copy, pitch decks, and brand messaging that converts skeptics into customers." },
  { icon: "◉", title: "Content", desc: "Long-form articles, newsletters, and social strategy that build genuine audiences." },
  { icon: "◈", title: "Consulting", desc: "Embedded team support for fast-growing startups navigating product-market fit." },
];

const testimonials = [
  { quote: "Priya turned our dense technical pitch into a story investors actually wanted to fund.", name: "Arjun K.", role: "Founder, Dataflow" },
  { quote: "Our conversion rate tripled after the website overhaul. That's the only metric I care about.", name: "Marie L.", role: "CMO, Sonder Health" },
  { quote: "She thinks like a founder and writes like a journalist. Rare combination.", name: "Tom S.", role: "Partner, Ridge Ventures" },
];

const clients = ["Stripe", "Notion", "Linear", "Figma", "Intercom", "Loom"];

export default function FreelancerPortfolio() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [emailVal, setEmailVal] = useState("");

  return (
    <div style={{
      background: "#FFFFFF",
      fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
      minHeight: "100vh",
      color: "#111111"
    }}>

      {/* Nav */}
      <nav style={{
        padding: "1.5rem 4rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontSize: "20px", fontWeight: "800",
          background: "linear-gradient(90deg, #FF4D2E, #FF8C00)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          Priya Nair.
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Services", "Work", "About", "Blog"].map(item => (
            <a key={item} href="#" style={{
              fontSize: "14px", color: "#555", textDecoration: "none",
              fontWeight: "500"
            }}>{item}</a>
          ))}
          <button style={{
            padding: "10px 22px", background: "#111", color: "#FFF",
            border: "none", borderRadius: "100px", fontSize: "13px",
            fontWeight: "600", cursor: "pointer"
          }}>Book a call</button>
        </div>
      </nav>

      {/* Hero — color block layout */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "90vh"
      }}>
        {/* Left */}
        <div style={{
          padding: "4rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
          background: "#FF4D2E"
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.2)",
            padding: "6px 14px", borderRadius: "100px",
            fontSize: "12px", fontWeight: "600", color: "#FFF",
            width: "fit-content", marginBottom: "2rem"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFF", display: "inline-block" }} />
            OPEN FOR PROJECTS — 2025
          </div>
          <h1 style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: "800", lineHeight: "1.1",
            color: "#FFF", margin: "0 0 1.5rem"
          }}>
            Words that make people do things.
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: "1.8", marginBottom: "2.5rem" }}>
            I'm a freelance strategist and copywriter helping startups clarify their message and capture their market.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{
              padding: "14px 28px", background: "#FFF",
              color: "#FF4D2E", border: "none",
              borderRadius: "100px", fontSize: "14px",
              fontWeight: "700", cursor: "pointer"
            }}>See my work ↗</button>
            <button style={{
              padding: "14px 28px", background: "transparent",
              color: "#FFF", border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: "100px", fontSize: "14px",
              fontWeight: "600", cursor: "pointer"
            }}>Read the blog</button>
          </div>
        </div>

        {/* Right */}
        <div style={{
          background: "#0A192F",
          padding: "4rem",
          display: "flex", flexDirection: "column", justifyContent: "space-between"
        }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[["50+", "Projects delivered"], ["$40M+", "Revenue influenced"], ["5 yrs", "In the trenches"], ["18", "Happy clients"]].map(([num, label]) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.05)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "0.5px solid rgba(255,255,255,0.1)"
              }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#38BDF8" }}>{num}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Clients */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
              TRUSTED BY TEAMS AT
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {clients.map(c => (
                <span key={c} style={{
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
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "5rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#FF4D2E", fontWeight: "600", marginBottom: "0.75rem" }}>
              WHAT I DO
            </div>
            <h2 style={{ fontSize: "38px", fontWeight: "800", margin: 0 }}>
              Pick one, or all four.
            </h2>
          </div>
          <a href="#" style={{ fontSize: "14px", color: "#FF4D2E", fontWeight: "600", textDecoration: "none" }}>
            See packages →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <div key={i} style={{
              padding: "2rem 1.75rem",
              border: "1.5px solid #F0F0F0",
              borderRadius: "16px",
              transition: "border-color 0.2s, transform 0.2s",
              cursor: "default"
            }}>
              <div style={{
                fontSize: "24px", color: "#FF4D2E",
                marginBottom: "1rem"
              }}>{s.icon}</div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", margin: "0 0 0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.7", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: "5rem 4rem",
        background: "#F8F8F6"
      }}>
        <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#FF4D2E", fontWeight: "600", marginBottom: "3rem" }}>
          WHAT CLIENTS SAY
        </div>
        <div style={{ maxWidth: "700px" }}>
          <blockquote style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: "600", lineHeight: "1.5",
            margin: "0 0 2rem",
            color: "#111"
          }}>
            "{testimonials[activeTestimonial].quote}"
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "#FF4D2E", color: "#FFF",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: "700"
            }}>
              {testimonials[activeTestimonial].name[0]}
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "14px" }}>{testimonials[activeTestimonial].name}</div>
              <div style={{ fontSize: "12px", color: "#888" }}>{testimonials[activeTestimonial].role}</div>
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

      {/* CTA / newsletter */}
      <section style={{
        padding: "5rem 4rem",
        background: "#0A192F",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center"
      }}>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: "0.2em", color: "#38BDF8", fontWeight: "600", marginBottom: "1rem" }}>
            LET'S WORK TOGETHER
          </div>
          <h2 style={{ fontSize: "38px", fontWeight: "800", color: "#FFF", margin: "0 0 1rem" }}>
            Got a project?<br />I want to hear about it.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.8", fontSize: "15px" }}>
            I take on a limited number of projects each quarter. Reach out early — spots fill fast.
          </p>
        </div>
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
              style={{
                width: "100%", padding: "16px 20px",
                background: "rgba(255,255,255,0.07)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                color: "#FFF", fontSize: "15px",
                borderRadius: "12px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
          <button style={{
            width: "100%", padding: "16px",
            background: "#FF4D2E", color: "#FFF",
            border: "none", borderRadius: "12px",
            fontSize: "14px", fontWeight: "700",
            cursor: "pointer"
          }}>
            Send me a message →
          </button>
          <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            Or email directly: priya@nairco.io
          </div>
        </div>
      </section>
    </div>
  );
}