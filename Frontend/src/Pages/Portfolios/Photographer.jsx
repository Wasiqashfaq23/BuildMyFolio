import { useState } from "react";

const galleries = {
  "Portraits": [
    { id: 1, label: "Unfound", sub: "Stockholm, 2024", ratio: "4/5" },
    { id: 2, label: "Meridian", sub: "Cape Town, 2024", ratio: "3/4" },
    { id: 3, label: "Stillwater", sub: "Tokyo, 2023", ratio: "4/5" },
    { id: 4, label: "Between Frames", sub: "Havana, 2023", ratio: "1/1" },
    { id: 5, label: "The Golden Hour", sub: "Lisbon, 2022", ratio: "3/4" },
    { id: 6, label: "Tender", sub: "Seoul, 2022", ratio: "4/5" },
  ],
  "Landscapes": [
    { id: 7, label: "Vast", sub: "Iceland, 2024", ratio: "16/9" },
    { id: 8, label: "Desert Bloom", sub: "Namibia, 2023", ratio: "16/9" },
    { id: 9, label: "The Long Road", sub: "Montana, 2023", ratio: "16/9" },
  ],
  "Editorial": [
    { id: 10, label: "Vogue Italia", sub: "March 2024", ratio: "3/4" },
    { id: 11, label: "Wallpaper*", sub: "June 2023", ratio: "4/5" },
    { id: 12, label: "AnOther Magazine", sub: "Fall 2023", ratio: "3/4" },
  ]
};

const photoColors = [
  "#8B7355", "#6B8E6B", "#7B7B8B", "#8B6B6B",
  "#5B7B8B", "#8B8B6B", "#6B6B8B", "#7B8B6B"
];

export default function PhotographerPortfolio() {
  const [activeGallery, setActiveGallery] = useState("Portraits");
  const [hovered, setHovered] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  const items = galleries[activeGallery];

  return (
    <div style={{
      background: "#F5F0E8",
      minHeight: "100vh",
      fontFamily: "'Palatino Linotype', 'Palatino', 'Book Antiqua', Georgia, serif",
      color: "#1C1C1C"
    }}>
      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(245,240,232,0.95)",
        backdropFilter: "blur(8px)",
        padding: "1.5rem 3.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "0.5px solid rgba(28,28,28,0.15)"
      }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <div style={{ fontSize: "15px", color: "#1C1C1C", letterSpacing: "0.05em", fontWeight: "400" }}>
            Nadia Vasquez
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#888", marginTop: "2px" }}>
            PHOTOGRAPHER
          </div>
        </a>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {["Portfolio", "About", "Prints", "Contact"].map(item => (
            <a key={item} href="#" style={{
              fontSize: "13px", color: "#555", textDecoration: "none",
              letterSpacing: "0.05em"
            }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero full-bleed */}
      <section style={{
        height: "85vh",
        background: "#2C2520",
        display: "flex", alignItems: "flex-end",
        padding: "3rem 3.5rem",
        position: "relative", overflow: "hidden"
      }}>
        {/* Simulated hero image with gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #3D3028 0%, #2C2520 40%, #1C1818 100%)",
          opacity: 0.9
        }} />
        <div style={{
          position: "absolute", top: "3rem", right: "3.5rem",
          fontSize: "11px", letterSpacing: "0.4em", color: "rgba(245,240,232,0.5)"
        }}>
          AVAILABLE FOR ASSIGNMENTS
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.4em", color: "rgba(245,240,232,0.5)", marginBottom: "1.5rem" }}>
            BASED IN BUENOS AIRES — WORLDWIDE
          </div>
          <h1 style={{
            fontSize: "clamp(42px, 6vw, 80px)",
            fontWeight: "300", color: "#F5F0E8",
            lineHeight: "1.1", margin: "0 0 1.5rem",
            maxWidth: "700px"
          }}>
            Stories told through<br />
            <em>light and shadow.</em>
          </h1>
          <p style={{ color: "rgba(245,240,232,0.55)", fontSize: "15px", maxWidth: "420px", lineHeight: "1.8" }}>
            Documenting the quiet moments between decisive ones. Editorial, portraiture, and fine art work since 2015.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "4rem 3.5rem" }}>
        {/* Gallery nav */}
        <div style={{
          display: "flex", gap: "0", marginBottom: "3rem",
          borderBottom: "0.5px solid rgba(28,28,28,0.15)"
        }}>
          {Object.keys(galleries).map(gallery => (
            <button key={gallery} onClick={() => setActiveGallery(gallery)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "0.75rem 2rem 1rem",
              fontSize: "13px", letterSpacing: "0.08em",
              color: activeGallery === gallery ? "#1C1C1C" : "#999",
              borderBottom: activeGallery === gallery ? "1.5px solid #1C1C1C" : "1.5px solid transparent",
              marginBottom: "-0.5px",
              fontFamily: "'Palatino Linotype', Georgia, serif",
              transition: "color 0.2s"
            }}>{gallery}</button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div style={{
          columns: "3",
          columnGap: "1.5rem"
        }}>
          {items.map((photo, i) => (
            <div key={photo.id}
              onMouseEnter={() => setHovered(photo.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => { setLightboxItem(photo); setLightboxOpen(true); }}
              style={{
                breakInside: "avoid",
                marginBottom: "1.5rem",
                cursor: "pointer",
                position: "relative", overflow: "hidden",
                borderRadius: "2px"
              }}>
              {/* Placeholder for photo */}
              <div style={{
                background: photoColors[i % photoColors.length],
                aspectRatio: photo.ratio,
                transition: "transform 0.4s ease",
                transform: hovered === photo.id ? "scale(1.02)" : "scale(1)"
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(28,28,28,0.6)",
                opacity: hovered === photo.id ? 1 : 0,
                transition: "opacity 0.3s",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1.25rem"
              }}>
                <div style={{ color: "#F5F0E8", fontSize: "15px" }}>{photo.label}</div>
                <div style={{ color: "rgba(245,240,232,0.6)", fontSize: "11px", letterSpacing: "0.15em", marginTop: "4px" }}>
                  {photo.sub.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && lightboxItem && (
        <div onClick={() => setLightboxOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(28,28,28,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "zoom-out"
        }}>
          <div style={{
            background: "#2C2520",
            width: "min(600px, 90vw)",
            padding: "2.5rem"
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              aspectRatio: lightboxItem.ratio,
              background: photoColors[lightboxItem.id % photoColors.length],
              marginBottom: "1.5rem"
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ color: "#F5F0E8", fontSize: "18px" }}>{lightboxItem.label}</div>
                <div style={{ color: "rgba(245,240,232,0.5)", fontSize: "11px", letterSpacing: "0.2em", marginTop: "6px" }}>
                  {lightboxItem.sub.toUpperCase()}
                </div>
              </div>
              <button onClick={() => setLightboxOpen(false)} style={{
                background: "none", border: "none", color: "rgba(245,240,232,0.5)",
                cursor: "pointer", fontSize: "20px"
              }}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <section style={{
        padding: "5rem 3.5rem",
        borderTop: "0.5px solid rgba(28,28,28,0.12)",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center"
      }}>
        <div style={{
          aspectRatio: "4/5",
          background: "#8B7355",
          borderRadius: "2px"
        }} />
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#999", marginBottom: "2rem" }}>
            ABOUT
          </div>
          <h2 style={{ fontSize: "32px", fontWeight: "300", margin: "0 0 1.5rem", lineHeight: "1.4" }}>
            I don't take photographs.<br />
            <em>I wait for them.</em>
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "2", color: "#555", marginBottom: "1.5rem" }}>
            After a decade shooting for international publications from Vogue to National Geographic, I've come to believe that the best images exist in the pause — that liminal moment before the world resettles.
          </p>
          <p style={{ fontSize: "15px", lineHeight: "2", color: "#555" }}>
            My work lives in the intersection of documentary truth and painterly composition.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "3rem 3.5rem",
        background: "#1C1C1C",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ color: "rgba(245,240,232,0.4)", fontSize: "12px", letterSpacing: "0.15em" }}>
          © 2024 NADIA VASQUEZ
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Instagram", "Email", "Prints"].map(s => (
            <a key={s} href="#" style={{
              color: "rgba(245,240,232,0.5)", fontSize: "12px",
              textDecoration: "none", letterSpacing: "0.1em"
            }}>{s.toUpperCase()}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}