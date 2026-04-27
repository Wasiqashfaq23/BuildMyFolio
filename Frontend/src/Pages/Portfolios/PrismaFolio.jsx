import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const P = {
  cream:      "#f5f0e8",
  creamDark:  "#ede6d6",
  creamDeep:  "#e4dac8",
  ink:        "#1a1208",
  inkMid:     "#3d3020",
  inkLight:   "#7a6a52",
  inkFaint:   "#b5a890",

  terra:      "#c84b2f",
  terraLight: "#e8613d",
  terraGlow:  "rgba(200,75,47,0.12)",
  terraFaint: "rgba(200,75,47,0.06)",

  sage:       "#4a7c6f",
  sageLight:  "#6aad9c",
  sageGlow:   "rgba(74,124,111,0.12)",

  gold:       "#c9973a",
  goldFaint:  "rgba(201,151,58,0.1)",

  border:     "rgba(26,18,8,0.1)",
  borderMid:  "rgba(26,18,8,0.2)",

  display:    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  sans:       "'Outfit', 'DM Sans', 'Trebuchet MS', sans-serif",
  mono:       "'JetBrains Mono', 'Courier New', monospace",
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

const drawStroke = keyframes`
  from { stroke-dashoffset: 1000; opacity: 0; }
  to   { stroke-dashoffset: 0; opacity: 1; }
`;

const blinkCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const stripedMove = keyframes`
  from { background-position: 0 0; }
  to { background-position: 40px 40px; }
`;

const counterUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
`;

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10%       { transform: translate(-2%, -3%); }
  20%       { transform: translate(1%, 2%); }
  30%       { transform: translate(-1%, 1%); }
  40%       { transform: translate(2%, -1%); }
  50%       { transform: translate(-2%, 2%); }
  60%       { transform: translate(1%, -2%); }
  70%       { transform: translate(3%, 1%); }
  80%       { transform: translate(-1%, 3%); }
  90%       { transform: translate(2%, -3%); }
`;


const hoverLift = css`
  transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.32s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(26,18,8,0.14);
  }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: ${P.cream};
    color: ${P.ink};
    font-family: ${P.sans};
    overflow-x: hidden;
    line-height: 1.6;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${P.creamDark}; }
  ::-webkit-scrollbar-thumb { background: ${P.terra}; border-radius: 4px; }
  ::selection { background: ${P.terraGlow}; color: ${P.terra}; }
  a { text-decoration: none; color: inherit; }
`;

const NoiseLayer = styled.div`
  position: fixed;
  inset: -50%;
  width: 200%; height: 200%;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
  animation: ${grain} 0.4s steps(1) infinite;
`;

const ParticleField = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const ParticleSVG = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const AnimatedLine = styled.line`
  stroke: ${P.terra};
  stroke-width: 0.6;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  opacity: 0;
  animation: ${drawStroke} ${({ dur }) => dur || 2}s ${({ delay }) => delay || 0}s ease forwards;
`;

const ParticleDot = styled.circle`
  fill: ${({ c }) => c || P.terra};
  opacity: 0;
  animation: ${fadeIn} 0.6s ${({ delay }) => delay || 0}s ease forwards;
`;

const PARTICLES = [
  { x: 12, y: 18 }, { x: 28, y: 8 }, { x: 45, y: 22 }, { x: 62, y: 12 },
  { x: 78, y: 28 }, { x: 90, y: 15 }, { x: 8,  y: 45 }, { x: 25, y: 55 },
  { x: 40, y: 38 }, { x: 58, y: 50 }, { x: 72, y: 42 }, { x: 88, y: 55 },
  { x: 95, y: 35 }, { x: 15, y: 72 }, { x: 32, y: 65 }, { x: 50, y: 78 },
  { x: 68, y: 68 }, { x: 82, y: 75 }, { x: 92, y: 62 }, { x: 5,  y: 85 },
  { x: 22, y: 88 }, { x: 42, y: 92 }, { x: 60, y: 85 }, { x: 75, y: 90 },
];

const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[1,7],[2,8],[3,9],[4,10],
  [5,12],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[6,13],[7,14],
  [8,15],[9,16],[10,17],[11,18],[13,14],[14,15],[15,16],[16,17],
  [17,18],[13,19],[14,20],[15,21],[16,22],[17,23],[19,20],[20,21],[21,22],[22,23],
];

function ParticleConstellation() {
  return (
    <ParticleSVG viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="pglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P.terra} stopOpacity="0.15" />
          <stop offset="100%" stopColor={P.terra} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#pglow)" />
      {CONNECTIONS.map(([a, b], i) => (
        <AnimatedLine
          key={i}
          x1={PARTICLES[a].x} y1={PARTICLES[a].y}
          x2={PARTICLES[b].x} y2={PARTICLES[b].y}
          dur={1.2 + (i % 5) * 0.4}
          delay={0.1 + i * 0.06}
        />
      ))}
      {PARTICLES.map((p, i) => (
        <ParticleDot
          key={i}
          cx={p.x} cy={p.y}
          r={i % 5 === 0 ? 0.7 : 0.45}
          c={i % 7 === 0 ? P.gold : i % 4 === 0 ? P.sage : P.terra}
          delay={0.3 + i * 0.08}
        />
      ))}
    </ParticleSVG>
  );
}

const NavBar = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 500;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  background: rgba(245,240,232,0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${P.border};

  @media(max-width: 768px) { padding: 0 20px; }
`;

const NavBrand = styled.div`
  font-family: ${P.display};
  font-size: 22px;
  font-weight: 600;
  color: ${P.ink};
  letter-spacing: 0.01em;
  font-style: italic;
`;

const NavCenter = styled.div`
  display: flex;
  gap: 4px;

  @media(max-width: 700px) { display: none; }
`;

const NavItem = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${P.inkLight};
  padding: 5px 14px;
  border-radius: 20px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    color: ${P.ink};
    background: ${P.border};
  }
`;

const NavCTA = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${P.cream};
  background: ${P.ink};
  padding: 8px 22px;
  border-radius: 24px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.22s;

  &:hover {
    background: ${P.terra};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px ${P.terraGlow};
    color: ${P.cream};
  }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  @media(max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroLeft = styled.div`
  position: relative;
  background: ${P.ink};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px 56px 64px;
  overflow: hidden;
  min-height: 100vh;

  @media(max-width: 900px) {
    padding: 80px 24px 48px;
    min-height: 60vh;
  }
`;

const HeroLeftBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 30% 20%, rgba(200,75,47,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 80%, rgba(74,124,111,0.06) 0%, transparent 50%);
`;

const HeroNumber = styled.div`
  position: absolute;
  top: 60px;
  right: -30px;
  font-family: ${P.display};
  font-size: clamp(160px, 20vw, 240px);
  font-weight: 700;
  color: rgba(255,255,255,0.03);
  line-height: 1;
  user-select: none;
  pointer-events: none;
  letter-spacing: -0.04em;
`;

const HeroTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.5s 0.2s ease both;
`;

const HeroTag = styled.span`
  font-family: ${P.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${P.terra};
  border: 1px solid rgba(200,75,47,0.3);
  padding: 4px 12px;
  border-radius: 2px;
`;

const HeroName = styled.h1`
  font-family: ${P.display};
  font-size: clamp(3.5rem, 7vw, 5.5rem);
  font-weight: 300;
  font-style: italic;
  color: ${P.cream};
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  animation: ${fadeUp} 0.6s 0.3s ease both;
`;

const HeroRole = styled.div`
  font-family: ${P.sans};
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  font-weight: 300;
  color: rgba(245,240,232,0.55);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.6s 0.4s ease both;
`;

const HeroStroke = styled.div`
  width: 48px;
  height: 2px;
  background: ${P.terra};
  margin-bottom: 24px;
  animation: ${scaleUp} 0.6s 0.45s ease both;
  transform-origin: left;
`;

const HeroDesc = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: rgba(245,240,232,0.65);
  line-height: 1.8;
  max-width: 380px;
  margin-bottom: 36px;
  animation: ${fadeUp} 0.6s 0.5s ease both;
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.6s 0.58s ease both;
`;

const BtnInk = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  font-family: ${P.sans};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.22s;

  ${({ variant }) => variant === 'terra' ? css`
    background: ${P.terra};
    color: ${P.cream};
    &:hover {
      background: ${P.terraLight};
      transform: translateY(-2px);
      box-shadow: 0 8px 24px ${P.terraGlow};
      color: ${P.cream};
    }
  ` : css`
    background: transparent;
    color: ${P.cream};
    border: 1px solid rgba(245,240,232,0.25);
    &:hover {
      border-color: rgba(245,240,232,0.6);
      color: ${P.cream};
      transform: translateY(-2px);
    }
  `}
`;

const HeroStats = styled.div`
  display: flex;
  gap: 0;
  border-top: 1px solid rgba(245,240,232,0.1);
  padding-top: 28px;
  margin-top: 36px;
  animation: ${fadeIn} 0.8s 0.7s ease both;
`;

const StatItem = styled.div`
  flex: 1;
  padding-right: 24px;
  border-right: 1px solid rgba(245,240,232,0.08);
  margin-right: 24px;
  animation: ${counterUp} 0.5s ${({ i }) => 0.7 + i * 0.12}s ease both;

  &:last-child { border-right: none; margin-right: 0; padding-right: 0; }
`;

const StatNum = styled.div`
  font-family: ${P.display};
  font-size: 2.4rem;
  font-weight: 600;
  color: ${P.cream};
  line-height: 1;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  font-family: ${P.mono};
  font-size: 9px;
  color: rgba(245,240,232,0.35);
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const HeroRight = styled.div`
  position: relative;
  background: ${P.creamDark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 48px;
  overflow: hidden;

  @media(max-width: 900px) {
    padding: 48px 24px;
    min-height: 50vh;
  }
`;

const HeroRightPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(${P.inkFaint} 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 280px;
  height: 360px;
  border-radius: 4px;
  overflow: hidden;
  background: ${P.creamDeep};
  border: 1px solid ${P.border};
  animation: ${scaleUp} 0.7s 0.3s ease both;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  @media(max-width: 480px) { width: 200px; height: 260px; }
`;

const AvatarPlaceholder = styled.div`
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 72px;
  background: repeating-linear-gradient(
    45deg,
    ${P.creamDeep},
    ${P.creamDeep} 10px,
    ${P.creamDark} 10px,
    ${P.creamDark} 20px
  );
  animation: ${stripedMove} 4s linear infinite;
  color: ${P.inkFaint};
`;

const AvatarDecorCorner = styled.div`
  position: absolute;
  width: 32px; height: 32px;
  border-color: ${P.terra};
  border-style: solid;
  border-width: 0;

  &.tl { top: -8px; left: -8px; border-top-width: 2px; border-left-width: 2px; }
  &.tr { top: -8px; right: -8px; border-top-width: 2px; border-right-width: 2px; }
  &.bl { bottom: -8px; left: -8px; border-bottom-width: 2px; border-left-width: 2px; }
  &.br { bottom: -8px; right: -8px; border-bottom-width: 2px; border-right-width: 2px; }
`;

const AvatarLabel = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0; right: 0;
  text-align: center;
  font-family: ${P.mono};
  font-size: 10px;
  color: ${P.cream};
  background: rgba(26,18,8,0.55);
  backdrop-filter: blur(6px);
  padding: 6px 0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const HeroRightDecor = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  animation: ${slideLeft} 0.6s 0.6s ease both;
`;

const AvailBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${P.cream};
  border: 1px solid ${P.border};
  border-radius: 24px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 600;
  color: ${P.sage};
  letter-spacing: 0.04em;

  &::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${P.sage};
    animation: ${blinkCursor} 2s ease-in-out infinite;
  }
`;

const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 48px 60px;

  @media(max-width: 768px) { padding: 70px 20px 40px; }
`;

const SectionEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
  animation: ${slideRight} 0.5s ease both;
`;

const SectionEyebrowNum = styled.span`
  font-family: ${P.mono};
  font-size: 11px;
  color: ${P.terra};
  letter-spacing: 0.1em;
`;

const SectionEyebrowLine = styled.div`
  width: 32px; height: 1px;
  background: ${P.terra};
`;

const SectionEyebrowText = styled.span`
  font-family: ${P.mono};
  font-size: 11px;
  color: ${P.inkLight};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SectionHeading = styled.h2`
  font-family: ${P.display};
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 300;
  font-style: italic;
  color: ${P.ink};
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 52px;
  animation: ${fadeUp} 0.55s 0.08s ease both;
`;

const AccentWord = styled.em`
  color: ${P.terra};
  font-style: italic;
`;

const InkRule = styled.div`
  width: 100%;
  height: 1px;
  background: ${P.border};
  max-width: 1200px;
  margin: 0 auto;

  &.thick {
    height: 2px;
    background: ${P.ink};
  }
`;

const SkillsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: start;
  gap: 32px;
  padding: 24px 0;
  border-bottom: 1px solid ${P.border};
  animation: ${fadeUp} 0.45s ${({ i }) => i * 0.07}s ease both;
  transition: background 0.2s;

  &:first-child { border-top: 1px solid ${P.border}; }
  &:hover { background: ${P.terraFaint}; margin: 0 -16px; padding-left: 16px; padding-right: 16px; }

  @media(max-width: 640px) { grid-template-columns: 1fr; gap: 12px; }
`;

const SkillCatName = styled.div`
  font-family: ${P.display};
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  color: ${P.inkMid};
  padding-top: 4px;
`;

const SkillPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillPill = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  color: ${P.ink};
  background: ${P.creamDark};
  border: 1px solid ${P.border};
  padding: 6px 16px;
  border-radius: 24px;
  letter-spacing: 0.03em;
  transition: all 0.2s;
  cursor: default;

  &:hover {
    background: ${P.ink};
    color: ${P.cream};
    border-color: ${P.ink};
    transform: translateY(-2px);
  }
`;

const ExpList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ExpItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 28px;
  align-items: start;
  padding: 32px 0;
  border-bottom: 1px solid ${P.border};
  animation: ${fadeUp} 0.5s ${({ i }) => i * 0.1}s ease both;
  transition: all 0.24s;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -48px; top: 32px; bottom: 32px;
    width: 2px;
    background: ${P.terra};
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s ease;
  }

  &:hover::before { transform: scaleY(1); }
  &:first-child { border-top: 1px solid ${P.border}; }

  @media(max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 10px;
    &::before { display: none; }
  }
`;

const ExpNum = styled.div`
  font-family: ${P.display};
  font-size: 3.5rem;
  font-weight: 700;
  color: ${P.border};
  line-height: 1;
  font-style: italic;
  transition: color 0.3s;

  ${ExpItem}:hover & { color: ${P.terraGlow}; color: rgba(200,75,47,0.2); }

  @media(max-width: 700px) { font-size: 2rem; }
`;

const ExpContent = styled.div``;

const ExpRole = styled.div`
  font-family: ${P.display};
  font-size: 1.5rem;
  font-weight: 600;
  font-style: italic;
  color: ${P.ink};
  margin-bottom: 4px;
  letter-spacing: -0.01em;
`;

const ExpCompany = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${P.terra};
  margin-bottom: 12px;
  letter-spacing: 0.02em;
`;

const ExpDesc = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${P.inkMid};
  line-height: 1.75;
  max-width: 600px;
`;

const ExpMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;

  @media(max-width: 700px) { flex-direction: row; }
`;

const MetaPill = styled.div`
  font-family: ${P.mono};
  font-size: 10px;
  color: ${P.inkLight};
  border: 1px solid ${P.border};
  background: ${P.creamDark};
  padding: 4px 12px;
  border-radius: 2px;
  letter-spacing: 0.08em;
  white-space: nowrap;
`;

const ProjectsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProjectCard = styled.div`
  display: grid;
  grid-template-columns: ${({ rev }) => rev ? '1fr 1.1fr' : '1.1fr 1fr'};
  gap: 0;
  border: 1px solid ${P.border};
  border-radius: 4px;
  overflow: hidden;
  background: ${P.creamDark};
  ${hoverLift}
  animation: ${scaleUp} 0.5s ${({ i }) => i * 0.1}s ease both;

  @media(max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ProjImg = styled.div`
  position: relative;
  background: ${P.creamDeep};
  overflow: hidden;
  min-height: 280px;
  order: ${({ rev }) => rev ? 2 : 1};

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  ${ProjectCard}:hover & img { transform: scale(1.04); }

  @media(max-width: 800px) { order: 1; min-height: 220px; }
`;

const ProjImgPlaceholder = styled.div`
  width: 100%; height: 100%; min-height: 280px;
  display: flex; align-items: center; justify-content: center;
  font-size: 48px;
  color: ${P.inkFaint};
  background:
    repeating-linear-gradient(
      -55deg,
      ${P.creamDeep},
      ${P.creamDeep} 8px,
      ${P.creamDark} 8px,
      ${P.creamDark} 16px
    );
  animation: ${stripedMove} 8s linear infinite;
`;

const ProjBody = styled.div`
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: ${({ rev }) => rev ? 1 : 2};
  position: relative;

  @media(max-width: 800px) { order: 2; padding: 24px; }
`;

const ProjIndexLabel = styled.div`
  font-family: ${P.mono};
  font-size: 10px;
  color: ${P.inkFaint};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ProjTitle = styled.div`
  font-family: ${P.display};
  font-size: 1.8rem;
  font-weight: 600;
  font-style: italic;
  color: ${P.ink};
  line-height: 1.15;
  margin-bottom: 14px;
  letter-spacing: -0.01em;
`;

const ProjDesc = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${P.inkMid};
  line-height: 1.75;
  margin-bottom: 20px;
`;

const ProjTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 24px;
`;

const ProjTag = styled.span`
  font-family: ${P.mono};
  font-size: 10px;
  color: ${P.sage};
  border: 1px solid ${P.sageGlow};
  background: rgba(74,124,111,0.05);
  padding: 3px 10px;
  border-radius: 2px;
  letter-spacing: 0.06em;
`;

const ProjActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ProjBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 2px;
  letter-spacing: 0.05em;
  transition: all 0.2s;
  cursor: pointer;

  ${({ primary }) => primary ? css`
    background: ${P.ink};
    color: ${P.cream};
    &:hover { background: ${P.terra}; transform: translateY(-1px); color: ${P.cream}; }
  ` : css`
    background: transparent;
    color: ${P.ink};
    border: 1px solid ${P.borderMid};
    &:hover { border-color: ${P.ink}; transform: translateY(-1px); }
  `}
`;

const TeamLine = styled.div`
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${P.border};
  font-size: 12px;
  color: ${P.inkLight};
  a { color: ${P.sage}; &:hover { color: ${P.ink}; } }
`;

const EduList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const EduItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  padding: 28px 0;
  border-bottom: 1px solid ${P.border};
  animation: ${fadeUp} 0.5s ${({ i }) => i * 0.1}s ease both;
  transition: background 0.2s;
  position: relative;

  &:first-child { border-top: 1px solid ${P.border}; }
  &:hover { background: ${P.sageGlow}; margin: 0 -16px; padding-left: 16px; padding-right: 16px; }

  @media(max-width: 640px) { grid-template-columns: 1fr; gap: 8px; }
`;

const EduDeg = styled.div`
  font-family: ${P.display};
  font-size: 1.3rem;
  font-weight: 600;
  font-style: italic;
  color: ${P.ink};
  margin-bottom: 4px;
`;

const EduInst = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${P.sage};
  margin-bottom: 8px;
`;

const EduDesc = styled.div`
  font-size: 13px;
  font-weight: 300;
  color: ${P.inkMid};
  line-height: 1.7;
`;

const EduRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const EduPeriod = styled.div`
  font-family: ${P.mono};
  font-size: 11px;
  color: ${P.inkLight};
  letter-spacing: 0.06em;
`;

const EduGrade = styled.div`
  font-family: ${P.mono};
  font-size: 11px;
  color: ${P.gold};
  letter-spacing: 0.06em;
  font-weight: 500;
`;

const CertList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const CertItem = styled.div`
  background: ${P.creamDark};
  border: 1px solid ${P.border};
  border-radius: 4px;
  padding: 22px 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  cursor: ${({ linked }) => linked ? 'pointer' : 'default'};
  transition: all 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${scaleUp} 0.45s ${({ i }) => i * 0.06}s ease both;

  &:hover {
    border-color: ${P.borderMid};
    background: ${P.cream};
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(26,18,8,0.1);
  }
`;

const CertDot = styled.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${P.terra};
  margin-top: 5px;
  flex-shrink: 0;
`;

const CertContent = styled.div`flex: 1;`;

const CertName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${P.ink};
  margin-bottom: 5px;
  line-height: 1.4;
`;

const CertMeta = styled.div`
  font-family: ${P.mono};
  font-size: 10px;
  color: ${P.inkLight};
  line-height: 1.9;
  letter-spacing: 0.04em;
`;

const ContactSection = styled.section`
  position: relative;
  background: ${P.ink};
  overflow: hidden;
  padding: 0;
`;

const ContactInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 540px;

  @media(max-width: 800px) { grid-template-columns: 1fr; }
`;

const ContactLeft = styled.div`
  padding: 80px 56px 80px 48px;
  border-right: 1px solid rgba(245,240,232,0.08);
  position: relative;
  overflow: hidden;

  @media(max-width: 800px) {
    padding: 60px 24px 48px;
    border-right: none;
    border-bottom: 1px solid rgba(245,240,232,0.08);
  }
`;

const ContactBigText = styled.div`
  font-family: ${P.display};
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  font-style: italic;
  color: ${P.cream};
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.6s ease both;

  em { color: ${P.terra}; font-style: italic; }
`;

const ContactEmailBig = styled.a`
  display: block;
  font-family: ${P.display};
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 400;
  font-style: italic;
  color: ${P.cream};
  opacity: 0.55;
  margin-bottom: 40px;
  letter-spacing: -0.01em;
  transition: all 0.22s;

  &:hover {
    opacity: 1;
    color: ${P.terra};
    transform: translateX(6px);
  }
`;

const ContactSocialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border: 1px solid rgba(245,240,232,0.08);
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(245,240,232,0.5);
  transition: all 0.22s;

  &:hover {
    background: rgba(245,240,232,0.05);
    border-color: rgba(245,240,232,0.2);
    color: ${P.cream};
    transform: translateX(4px);
  }

  .label {
    font-family: ${P.mono};
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.25);
    min-width: 80px;
  }

  .val { flex: 1; padding-left: 14px; }
  .arrow { font-size: 14px; opacity: 0.4; }
`;

const ContactRight = styled.div`
  padding: 80px 48px 80px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;

  @media(max-width: 800px) { padding: 48px 24px; }
`;

const ContactInfoBlock = styled.div`
  border-top: 1px solid rgba(245,240,232,0.08);
  padding-top: 20px;
`;

const ContactInfoLabel = styled.div`
  font-family: ${P.mono};
  font-size: 10px;
  color: rgba(245,240,232,0.25);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const ContactInfoVal = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: rgba(245,240,232,0.65);
`;

const ContactBigCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 36px;
  background: ${P.terra};
  color: ${P.cream};
  font-family: ${P.sans};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.22s;
  align-self: flex-start;

  &:hover {
    background: ${P.terraLight};
    transform: translateY(-2px);
    box-shadow: 0 10px 28px ${P.terraGlow};
    color: ${P.cream};
  }
`;

const FooterEl = styled.footer`
  background: ${P.ink};
  border-top: 1px solid rgba(245,240,232,0.06);
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  flex-wrap: wrap;
  gap: 12px;

  @media(max-width: 768px) { padding: 20px; }
`;

const FooterText = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: rgba(245,240,232,0.25);
  letter-spacing: 0.04em;
`;

const FooterBrand = styled.div`
  font-family: ${P.display};
  font-size: 18px;
  font-weight: 600;
  font-style: italic;
  color: rgba(245,240,232,0.35);
`;

function getImg(img) {
  if (!img) return null;
  return Array.isArray(img) ? img[0] : img;
}

function SectionEyebrowComp({ num, label }) {
  return (
    <SectionEyebrow>
      <SectionEyebrowNum>{num}</SectionEyebrowNum>
      <SectionEyebrowLine />
      <SectionEyebrowText>{label}</SectionEyebrowText>
    </SectionEyebrow>
  );
}

export default function PrismaFolio({ data = {} }) {
  const { navbar, hero, skills, experience, projects, education, certifications, contact, footer } = data;

  const stats = [
    hero?.stat1Value && { val: hero.stat1Value, label: hero.stat1Label || "Stat 1" },
    hero?.stat2Value && { val: hero.stat2Value, label: hero.stat2Label || "Stat 2" },
    hero?.stat3Value && { val: hero.stat3Value, label: hero.stat3Label || "Stat 3" },
  ].filter(Boolean);

  return (
    <>
      <GlobalStyle />
      <NoiseLayer />

      <NavBar>
        <NavBrand>{navbar?.logo || "Portfolio"}</NavBrand>
        <NavCenter>
          {["skills", "experience", "projects", "education", "contact"].map(id => (
            <NavItem key={id} href={`#${id}`}>{id}</NavItem>
          ))}
        </NavCenter>
        <NavCTA href={contact?.email ? `mailto:${contact.email}` : "#contact"}>
          {navbar?.ctaLabel || "Work Together"}
        </NavCTA>
      </NavBar>

      <HeroSection id="hero">
        <HeroLeft>
          <HeroLeftBg />
          <ParticleField>
            <ParticleConstellation />
          </ParticleField>

          <HeroNumber>01</HeroNumber>

          <div style={{ position: "relative", zIndex: 1 }}>
            {(hero?.tag1 || hero?.tag2 || hero?.tag3) && (
              <HeroTagsRow>
                {hero.tag1 && <HeroTag>{hero.tag1}</HeroTag>}
                {hero.tag2 && <HeroTag>{hero.tag2}</HeroTag>}
                {hero.tag3 && <HeroTag>{hero.tag3}</HeroTag>}
              </HeroTagsRow>
            )}

            <HeroName>{hero?.name || "Your Name"}</HeroName>
            <HeroRole>{hero?.role || "Developer"}</HeroRole>
            <HeroStroke />

            {hero?.bio && <HeroDesc>{hero.bio}</HeroDesc>}

            <HeroCTAs>
              <BtnInk href="#contact" variant="terra">
                Start a Project →
              </BtnInk>
              {hero?.resumeLink && (
                <BtnInk href={hero.resumeLink} target="_blank" rel="noopener noreferrer">
                  ↓ Resume
                </BtnInk>
              )}
            </HeroCTAs>

            {stats.length > 0 && (
              <HeroStats>
                {stats.map((s, i) => (
                  <StatItem key={i} i={i}>
                    <StatNum>{s.val}</StatNum>
                    <StatLabel>{s.label}</StatLabel>
                  </StatItem>
                ))}
              </HeroStats>
            )}
          </div>
        </HeroLeft>

        <HeroRight>
          <HeroRightPattern />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <AvatarDecorCorner className="tl" />
              <AvatarDecorCorner className="tr" />
              <AvatarDecorCorner className="bl" />
              <AvatarDecorCorner className="br" />
              <AvatarWrap>
                {getImg(hero?.avatar) ? (
                  <img src={getImg(hero.avatar)} alt={hero?.name || "avatar"} />
                ) : (
                  <AvatarPlaceholder>👤</AvatarPlaceholder>
                )}
                <AvatarLabel>{hero?.role || "Developer"}</AvatarLabel>
              </AvatarWrap>
            </div>
          </div>

          <HeroRightDecor>
            <AvailBadge>Available for Work</AvailBadge>
            {hero?.descriptor && (
              <div style={{
                fontFamily: P.display,
                fontStyle: "italic",
                fontSize: 14,
                color: P.inkLight,
                marginTop: 10,
                maxWidth: 180,
                textAlign: "right",
                lineHeight: 1.5
              }}>
                "{hero.descriptor}"
              </div>
            )}
          </HeroRightDecor>
        </HeroRight>
      </HeroSection>

      {skills && skills.length > 0 && (
        <Section id="skills">
          <SectionEyebrowComp num="02" label="Capabilities" />
          <SectionHeading>
            What I <AccentWord>know</AccentWord>
          </SectionHeading>
          <SkillsTable>
            {skills.map((group, i) => (
              <SkillRow key={i} i={i}>
                <SkillCatName>{group.title}</SkillCatName>
                <SkillPills>
                  {(Array.isArray(group.skills) ? group.skills : []).map((sk, j) => (
                    <SkillPill key={j}>{sk}</SkillPill>
                  ))}
                </SkillPills>
              </SkillRow>
            ))}
          </SkillsTable>
        </Section>
      )}

      <InkRule />

      {experience?.showExperience !== false && experience?.items?.length > 0 && (
        <Section id="experience">
          <SectionEyebrowComp num="03" label="Career" />
          <SectionHeading>
            Where I've <AccentWord>worked</AccentWord>
          </SectionHeading>
          <ExpList>
            {experience.items.map((job, i) => (
              <ExpItem key={i} i={i}>
                <ExpNum>{String(i + 1).padStart(2, "0")}</ExpNum>
                <ExpContent>
                  <ExpRole>{job.role}</ExpRole>
                  {job.company && <ExpCompany>{job.company}</ExpCompany>}
                  {job.description && <ExpDesc>{job.description}</ExpDesc>}
                </ExpContent>
                <ExpMeta>
                  {job.period && <MetaPill>{job.period}</MetaPill>}
                  {job.location && <MetaPill>{job.location}</MetaPill>}
                </ExpMeta>
              </ExpItem>
            ))}
          </ExpList>
        </Section>
      )}

      <InkRule />

      {projects && projects.length > 0 && (
        <Section id="projects">
          <SectionEyebrowComp num="04" label="Selected Work" />
          <SectionHeading>
            Things I've <AccentWord>built</AccentWord>
          </SectionHeading>
          <ProjectsLayout>
            {projects.map((proj, i) => {
              const rev = i % 2 === 1;
              return (
                <ProjectCard key={i} i={i} rev={rev}>
                  <ProjImg rev={rev}>
                    {getImg(proj.image) ? (
                      <img src={getImg(proj.image)} alt={proj.title} />
                    ) : (
                      <ProjImgPlaceholder>◈</ProjImgPlaceholder>
                    )}
                  </ProjImg>
                  <ProjBody rev={rev}>
                    <ProjIndexLabel>
                      Project {String(i + 1).padStart(2, "0")}
                      {proj.date && ` · ${proj.date}`}
                    </ProjIndexLabel>
                    <ProjTitle>{proj.title}</ProjTitle>
                    {proj.description && <ProjDesc>{proj.description}</ProjDesc>}

                    {proj.tags?.length > 0 && (
                      <ProjTags>
                        {proj.tags.map((t, j) => <ProjTag key={j}>{t}</ProjTag>)}
                      </ProjTags>
                    )}

                    <ProjActions>
                      {proj.webapp && (
                        <ProjBtn href={proj.webapp} target="_blank" rel="noopener noreferrer" primary>
                          ↗ View Live
                        </ProjBtn>
                      )}
                      {proj.github && (
                        <ProjBtn href={proj.github} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </ProjBtn>
                      )}
                    </ProjActions>

                    {proj.showMembers && proj.member?.length > 0 && (
                      <TeamLine>
                        Team: {proj.member.map((m, j) => (
                          <span key={j}>
                            {m.github
                              ? <a href={m.github} target="_blank" rel="noopener noreferrer">{m.name}</a>
                              : m.name}
                            {j < proj.member.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </TeamLine>
                    )}
                  </ProjBody>
                </ProjectCard>
              );
            })}
          </ProjectsLayout>
        </Section>
      )}

      <InkRule />

      {education && education.length > 0 && (
        <Section id="education">
          <SectionEyebrowComp num="05" label="Education" />
          <SectionHeading>
            Where I <AccentWord>studied</AccentWord>
          </SectionHeading>
          <EduList>
            {education.map((edu, i) => (
              <EduItem key={i} i={i}>
                <div>
                  <EduDeg>{edu.degree}</EduDeg>
                  {edu.institution && <EduInst>{edu.institution}</EduInst>}
                  {edu.description && <EduDesc>{edu.description}</EduDesc>}
                </div>
                <EduRight>
                  {edu.period && <EduPeriod>{edu.period}</EduPeriod>}
                  {edu.grade && <EduGrade>{edu.grade}</EduGrade>}
                </EduRight>
              </EduItem>
            ))}
          </EduList>
        </Section>
      )}

      {certifications?.showCertifications !== false && certifications?.items?.length > 0 && (
        <>
          <InkRule />
          <Section id="certifications">
            <SectionEyebrowComp num="06" label="Credentials" />
            <SectionHeading>
              Certs & <AccentWord>badges</AccentWord>
            </SectionHeading>
            <CertList>
              {certifications.items.map((cert, i) => (
                <CertItem
                  key={i}
                  i={i}
                  linked={!!cert.link}
                  as={cert.link ? "a" : "div"}
                  href={cert.link || undefined}
                  target={cert.link ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <CertDot />
                  <CertContent>
                    <CertName>{cert.name}</CertName>
                    <CertMeta>
                      {cert.issuer && <div>{cert.issuer}</div>}
                      {cert.date && <div style={{ color: P.gold }}>{cert.date}</div>}
                    </CertMeta>
                  </CertContent>
                </CertItem>
              ))}
            </CertList>
          </Section>
        </>
      )}

      <ContactSection id="contact">
        <ContactInner>
          <ContactLeft>
            <ParticleField>
              <ParticleConstellation />
            </ParticleField>
            <div style={{ position: "relative", zIndex: 1 }}>
              <ContactBigText>
                {contact?.ctaHeadline
                  ? <>{contact.ctaHeadline.split(" ").slice(0, -2).join(" ")} <em>{contact.ctaHeadline.split(" ").slice(-2).join(" ")}</em></>
                  : <>Got a project<br /><em>in mind?</em></>
                }
              </ContactBigText>

              {contact?.email && (
                <ContactEmailBig href={`mailto:${contact.email}`}>
                  {contact.email}
                </ContactEmailBig>
              )}

              <ContactSocialGrid>
                {contact?.github && (
                  <SocialLink href={contact.github} target="_blank" rel="noopener noreferrer">
                    <span className="label">GitHub</span>
                    <span className="val">{contact.github.replace("https://github.com/", "")}</span>
                    <span className="arrow">→</span>
                  </SocialLink>
                )}
                {contact?.linkedin && (
                  <SocialLink href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className="label">LinkedIn</span>
                    <span className="val">{contact.linkedin.replace("https://linkedin.com/in/", "")}</span>
                    <span className="arrow">→</span>
                  </SocialLink>
                )}
                {contact?.showTwitter !== false && contact?.twitter && (
                  <SocialLink href={contact.twitter} target="_blank" rel="noopener noreferrer">
                    <span className="label">Twitter</span>
                    <span className="val">{contact.twitter.replace("https://twitter.com/", "")}</span>
                    <span className="arrow">→</span>
                  </SocialLink>
                )}
                {contact?.showFacebook === true && contact?.facebook && (
                  <SocialLink href={contact.facebook} target="_blank" rel="noopener noreferrer">
                    <span className="label">Facebook</span>
                    <span className="val">{contact.facebook.replace("https://", "")}</span>
                    <span className="arrow">→</span>
                  </SocialLink>
                )}
                {contact?.showInstagram === true && contact?.instagram && (
                  <SocialLink href={contact.instagram} target="_blank" rel="noopener noreferrer">
                    <span className="label">Instagram</span>
                    <span className="val">{contact.instagram.replace("https://", "")}</span>
                    <span className="arrow">→</span>
                  </SocialLink>
                )}
              </ContactSocialGrid>
            </div>
          </ContactLeft>

          <ContactRight>
            {contact?.email && (
              <ContactBigCTA href={`mailto:${contact.email}`}>
                Send a Message →
              </ContactBigCTA>
            )}

            {contact?.location && (
              <ContactInfoBlock>
                <ContactInfoLabel>Location</ContactInfoLabel>
                <ContactInfoVal>{contact.location}</ContactInfoVal>
              </ContactInfoBlock>
            )}

            <ContactInfoBlock>
              <ContactInfoLabel>Response Time</ContactInfoLabel>
              <ContactInfoVal>Within 24 hours</ContactInfoVal>
            </ContactInfoBlock>

            <ContactInfoBlock>
              <ContactInfoLabel>Status</ContactInfoLabel>
              <ContactInfoVal style={{ color: P.sageLight, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: P.sage, display: "inline-block" }} />
                Open to opportunities
              </ContactInfoVal>
            </ContactInfoBlock>
          </ContactRight>
        </ContactInner>
      </ContactSection>

      <FooterEl>
        <FooterText>
          {footer?.text || `© ${new Date().getFullYear()} ${hero?.name || ""} · All rights reserved.`}
        </FooterText>
        <FooterBrand>{navbar?.logo || "Portfolio"}</FooterBrand>
      </FooterEl>
    </>
  );
}