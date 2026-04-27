import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const C = {
  base:       "#16202e",
  baseUp:     "#1e2d3d",
  baseSurf:   "#243447",
  basePop:    "#2c3e52",

  amber:      "#f5a623",
  amberLight: "#ffc55a",
  amberGlow:  "rgba(245,166,35,0.18)",
  amberGlowS: "rgba(245,166,35,0.08)",

  mint:       "#2dd4bf",
  mintLight:  "#5eead4",
  mintGlow:   "rgba(45,212,191,0.18)",
  mintGlowS:  "rgba(45,212,191,0.07)",

  coral:      "#fb7185",
  coralGlow:  "rgba(251,113,133,0.15)",

  lav:        "#a78bfa",
  lavGlow:    "rgba(167,139,250,0.15)",

  white:      "#f0f4f8",
  whiteD:     "#94a3b8",
  muted:      "#4a6278",
  border:     "rgba(255,255,255,0.07)",
  borderBri:  "rgba(255,255,255,0.14)",

  display:    "'Clash Display', 'Syne', 'Playfair Display', Georgia, serif",
  body:       "'Satoshi', 'Plus Jakarta Sans', 'Nunito', sans-serif",
  mono:       "'JetBrains Mono', 'Fira Code', monospace",
};

const morphBlob = keyframes`
  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%  { border-radius: 50% 60% 30% 60% / 30% 40% 70% 60%; }
  75%  { border-radius: 40% 50% 60% 30% / 60% 40% 50% 70%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatA = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-18px) rotate(5deg); }
  66%       { transform: translateY(-8px) rotate(-3deg); }
`;

const floatB = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  40%       { transform: translateY(-22px) rotate(-6deg); }
  70%       { transform: translateY(-10px) rotate(4deg); }
`;

const floatC = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-14px) scale(1.06); }
`;

const spinOrbit = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const spinOrbitReverse = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`;


const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1; transform: scale(1.08); }
`;



const ticker = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: ${C.base};
    color: ${C.white};
    font-family: ${C.body};
    overflow-x: hidden;
    line-height: 1.6;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.base}; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, ${C.amber}, ${C.mint});
    border-radius: 5px;
  }

  ::selection { background: ${C.amberGlow}; color: ${C.amberLight}; }
  a { text-decoration: none; color: inherit; }
`;

const BlobLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  filter: blur(${({ blur }) => blur || 60}px);
  opacity: ${({ op }) => op || 0.12};
  animation: ${morphBlob} ${({ dur }) => dur || 12}s ease-in-out infinite,
             ${floatA} ${({ fdur }) => fdur || 8}s ease-in-out infinite;
  background: ${({ bg }) => bg};
  width: ${({ w }) => w || 400}px;
  height: ${({ h }) => h || 400}px;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
`;

const FloatShape = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 0;
  opacity: ${({ op }) => op || 0.06};
  animation: ${({ anim }) => anim === 'b' ? floatB : anim === 'c' ? floatC : floatA}
    ${({ dur }) => dur || 10}s ease-in-out infinite;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
`;

const Ring = styled.div`
  width: ${({ s }) => s || 80}px;
  height: ${({ s }) => s || 80}px;
  border-radius: 50%;
  border: ${({ thick }) => thick || 1.5}px solid ${({ c }) => c || C.mint};
`;

const Triangle = styled.div`
  width: 0; height: 0;
  border-left: ${({ s }) => s || 30}px solid transparent;
  border-right: ${({ s }) => s || 30}px solid transparent;
  border-bottom: ${({ s2 }) => s2 || 52}px solid ${({ c }) => c || C.amber};
`;

const Square = styled.div`
  width: ${({ s }) => s || 50}px;
  height: ${({ s }) => s || 50}px;
  border: 1.5px solid ${({ c }) => c || C.lav};
  transform: rotate(45deg);
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 500;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background: rgba(22,32,46,0.75);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${C.border};

  @media(max-width: 768px) { padding: 0 20px; }
`;

const NavBrand = styled.div`
  font-family: ${C.display};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(90deg, ${C.amberLight}, ${C.mintLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 auto;

  @media(max-width: 680px) { display: none; }
`;

const NavLink = styled.a`
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${C.whiteD};
  border-radius: 20px;
  transition: all 0.2s;
  letter-spacing: 0.01em;

  &:hover {
    color: ${C.white};
    background: ${C.borderBri};
  }
`;

const NavCTA = styled.a`
  padding: 9px 22px;
  font-size: 13px;
  font-weight: 600;
  color: ${C.base};
  background: linear-gradient(135deg, ${C.amber}, ${C.amberLight});
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.22s;
  letter-spacing: 0.02em;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${C.amberGlow};
    color: ${C.base};
  }
`;

const MarqueeWrap = styled.div`
  width: 100%;
  overflow: hidden;
  border-top: 1px solid ${C.border};
  border-bottom: 1px solid ${C.border};
  padding: 12px 0;
  background: ${C.baseUp};
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 0;
  animation: ${ticker} 28s linear infinite;
  width: max-content;
`;

const MarqueeItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  font-family: ${C.display};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: ${C.muted};
  padding-right: 40px;
  text-transform: uppercase;
  white-space: nowrap;

  &::after {
    content: '✦';
    color: ${C.amber};
    font-size: 10px;
  }
`;

const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 100px 40px 60px;

  @media(max-width: 768px) { padding: 70px 20px 40px; }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${C.mono};
  font-size: 11px;
  font-weight: 500;
  color: ${C.mint};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 16px;
  animation: ${fadeLeft} 0.5s ease both;

  &::before {
    content: '';
    width: 24px;
    height: 1px;
    background: ${C.mint};
  }
`;

const SectionHeading = styled.h2`
  font-family: ${C.display};
  font-size: clamp(2.2rem, 4.5vw, 3.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: ${C.white};
  margin-bottom: 48px;
  animation: ${fadeUp} 0.55s 0.08s ease both;
`;

const GradText = styled.span`
  background: linear-gradient(135deg, ${C.amberLight} 0%, ${C.mint} 60%, ${C.lav} 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 5s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSection = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 40px 60px;

  @media(max-width: 768px) { padding: 100px 20px 60px; }
`;

const HeroInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 80px;
  align-items: center;

  @media(max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

const HeroLeft = styled.div``;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${C.amberGlowS};
  border: 1px solid ${C.amberGlow};
  border-radius: 24px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${C.amberLight};
  letter-spacing: 0.08em;
  margin-bottom: 24px;
  animation: ${scaleIn} 0.5s ease both;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${C.amber};
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }
`;

const HeroName = styled.h1`
  font-family: ${C.display};
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${C.white};
  margin-bottom: 18px;
  animation: ${fadeUp} 0.6s 0.1s ease both;
`;

const HeroTitle = styled.div`
  font-family: ${C.display};
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 500;
  color: ${C.whiteD};
  margin-bottom: 10px;
  letter-spacing: 0.01em;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`;

const HeroSub = styled.div`
  font-family: ${C.mono};
  font-size: 13px;
  color: ${C.mint};
  letter-spacing: 0.08em;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.6s 0.25s ease both;
`;

const HeroBio = styled.p`
  font-size: 16px;
  color: ${C.whiteD};
  line-height: 1.8;
  max-width: 520px;
  margin-bottom: 40px;
  font-weight: 300;
  animation: ${fadeUp} 0.6s 0.3s ease both;

  @media(max-width: 1000px) { margin-left: auto; margin-right: auto; }
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.6s 0.38s ease both;

  @media(max-width: 1000px) { justify-content: center; }
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 14px 30px;
  background: linear-gradient(135deg, ${C.amber}, ${C.amberLight});
  color: ${C.base};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.03em;
  border-radius: 32px;
  cursor: pointer;
  transition: all 0.22s;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.4s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px ${C.amberGlow};
    color: ${C.base};
    &::after { left: 140%; }
  }
`;

const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 26px;
  background: transparent;
  color: ${C.white};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  border-radius: 32px;
  border: 1.5px solid ${C.borderBri};
  cursor: pointer;
  transition: all 0.22s;

  &:hover {
    border-color: ${C.mint};
    color: ${C.mintLight};
    background: ${C.mintGlowS};
    transform: translateY(-3px);
    box-shadow: 0 8px 24px ${C.mintGlow};
  }
`;

const HeroRight = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${fadeRight} 0.7s 0.2s ease both;
`;

const AvatarOrbit = styled.div`
  position: relative;
  width: 340px;
  height: 340px;

  @media(max-width: 480px) { width: 260px; height: 260px; }
`;

const OrbitRing = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px dashed ${({ c }) => c || C.mint};
  opacity: 0.3;
  animation: ${({ rev }) => rev ? spinOrbitReverse : spinOrbit} ${({ dur }) => dur || 20}s linear infinite;
  inset: ${({ inset }) => inset || 0};
`;

const OrbitDot = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ c }) => c || C.amber};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  box-shadow: 0 0 12px ${({ c }) => c || C.amber};
`;

const AvatarCore = styled.div`
  position: absolute;
  inset: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${C.border};
  background: ${C.baseSurf};

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const AvatarGlow = styled.div`
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    ${C.amberGlow},
    ${C.mintGlowS},
    transparent 70%);
  pointer-events: none;
`;

const AvatarPlaceholder = styled.div`
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 64px;
  background: linear-gradient(135deg, ${C.baseSurf}, ${C.basePop});
  color: ${C.muted};
`;

const FloatingBadge = styled.div`
  position: absolute;
  background: ${C.baseSurf};
  border: 1px solid ${C.borderBri};
  border-radius: 14px;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${C.white};
  white-space: nowrap;
  backdrop-filter: blur(10px);
  animation: ${({ anim }) => anim === 'b' ? floatB : floatC} ${({ dur }) => dur || 7}s ease-in-out infinite;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  z-index: 2;

  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  transform: ${({ tx }) => tx || 'none'};

  span { color: ${({ ac }) => ac || C.amber}; margin-right: 6px; }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const SkillCard = styled.div`
  background: ${C.baseUp};
  border: 1px solid ${C.border};
  border-radius: 20px;
  padding: 26px;
  position: relative;
  overflow: hidden;
  transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${fadeUp} 0.5s ${({ i }) => i * 0.08}s ease both;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${C.amber}, ${C.mint}, ${C.lav});
    background-size: 200%;
    animation: ${gradientShift} 4s ease infinite;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: ${C.borderBri};
    box-shadow: 0 20px 48px rgba(0,0,0,0.35);

    &::before { opacity: 1; }
  }
`;

const SkillIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${C.amberGlowS}, ${C.mintGlowS});
  border: 1px solid ${C.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 16px;
`;

const SkillCat = styled.div`
  font-family: ${C.display};
  font-size: 16px;
  font-weight: 600;
  color: ${C.white};
  margin-bottom: 14px;
  letter-spacing: 0.01em;
`;

const ChipsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Chip = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: ${C.whiteD};
  background: ${C.basePop};
  border: 1px solid ${C.border};
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.03em;
  transition: all 0.18s;

  &:hover {
    color: ${C.amberLight};
    border-color: ${C.amberGlow};
    background: ${C.amberGlowS};
    transform: translateY(-1px);
  }
`;

const SKILL_ICONS = ["⚡", "🎨", "🛠", "🚀", "🔮", "📦", "🌐", "⚙️"];

const ExpWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ExpCard = styled.div`
  background: ${C.baseUp};
  border: 1px solid ${C.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.26s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${fadeUp} 0.5s ${({ i }) => i * 0.1}s ease both;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, ${C.amber}, ${C.mint});
    border-radius: 3px 0 0 3px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateX(6px);
    border-color: ${C.borderBri};
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
    &::after { opacity: 1; }
  }
`;

const ExpTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px 28px 18px;
  border-bottom: 1px solid ${C.border};
`;

const ExpLeft = styled.div``;

const ExpRole = styled.div`
  font-family: ${C.display};
  font-size: 18px;
  font-weight: 600;
  color: ${C.white};
  margin-bottom: 5px;
  letter-spacing: 0.01em;
`;

const ExpCompany = styled.div`
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(90deg, ${C.amber}, ${C.mint});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ExpRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ExpPill = styled.div`
  font-family: ${C.mono};
  font-size: 11px;
  color: ${({ c }) => c || C.whiteD};
  background: ${C.basePop};
  border: 1px solid ${C.border};
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.04em;
`;

const ExpBody = styled.div`
  padding: 16px 28px 22px;
  font-size: 14px;
  color: ${C.whiteD};
  line-height: 1.75;
  font-weight: 300;
`;

const ProjectsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media(max-width: 680px) { grid-template-columns: 1fr; }
`;

const ProjectCard = styled.div`
  background: ${C.baseUp};
  border: 1px solid ${C.border};
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${scaleIn} 0.5s ${({ i }) => i * 0.08}s ease both;

  ${({ i }) => i % 3 === 0 && css`
    grid-column: 1 / -1;
    flex-direction: row;

    @media(max-width: 680px) { flex-direction: column; }
  `}

  &:hover {
    transform: translateY(-6px);
    border-color: ${C.borderBri};
    box-shadow: 0 24px 56px rgba(0,0,0,0.4);
  }
`;

const ProjectImgWrap = styled.div`
  position: relative;
  overflow: hidden;
  background: ${C.baseSurf};
  flex-shrink: 0;

  height: 200px;

  ${ProjectCard}:nth-child(3n+1) & {
    width: 45%;
    height: auto;
    min-height: 220px;

    @media(max-width: 680px) { width: 100%; height: 200px; }
  }

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }

  &:hover img { transform: scale(1.07); }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, ${C.baseUp} 100%);
  }
`;

const ImgPlaceholder = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  background: repeating-linear-gradient(
    -45deg,
    ${C.baseSurf},
    ${C.baseSurf} 10px,
    ${C.basePop} 10px,
    ${C.basePop} 20px
  );
  color: ${C.muted};
`;

const ProjectBody = styled.div`
  padding: 22px 26px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjYear = styled.div`
  font-family: ${C.mono};
  font-size: 11px;
  color: ${C.muted};
  letter-spacing: 0.1em;
  margin-bottom: 8px;
`;

const ProjTitle = styled.div`
  font-family: ${C.display};
  font-size: 19px;
  font-weight: 600;
  color: ${C.white};
  margin-bottom: 10px;
  letter-spacing: 0.01em;
  line-height: 1.2;
`;

const ProjDesc = styled.div`
  font-size: 13px;
  color: ${C.whiteD};
  line-height: 1.7;
  flex: 1;
  font-weight: 300;
  margin-bottom: 16px;
`;

const ProjTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
`;

const ProjTag = styled.span`
  font-family: ${C.mono};
  font-size: 10px;
  color: ${C.mint};
  border: 1px solid ${C.mintGlowS};
  background: rgba(45,212,191,0.06);
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
`;

const ProjLinks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ProjBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.03em;

  ${({ variant }) => variant === 'primary' ? css`
    background: linear-gradient(135deg, ${C.amber}, ${C.amberLight});
    color: ${C.base};
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${C.amberGlow};
      color: ${C.base};
    }
  ` : css`
    background: transparent;
    color: ${C.whiteD};
    border: 1px solid ${C.border};
    &:hover {
      border-color: ${C.borderBri};
      color: ${C.white};
      background: ${C.basePop};
    }
  `}
`;

const MembersLine = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${C.border};
  font-size: 12px;
  color: ${C.muted};

  a { color: ${C.mint}; &:hover { color: ${C.white}; } }
`;

const EduWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const EduCard = styled.div`
  background: ${C.baseUp};
  border: 1px solid ${C.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.25s ease;
  animation: ${fadeUp} 0.5s ${({ i }) => i * 0.1}s ease both;

  &:hover {
    border-color: ${C.borderBri};
    box-shadow: 0 12px 36px rgba(0,0,0,0.28);
    transform: translateY(-4px);
  }
`;

const EduTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px 28px 18px;
  border-bottom: 1px solid ${C.border};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, ${C.lav}, ${C.mint});
    border-radius: 0 2px 2px 0;
  }
`;

const EduDeg = styled.div`
  font-family: ${C.display};
  font-size: 17px;
  font-weight: 600;
  color: ${C.white};
  margin-bottom: 4px;
`;

const EduInst = styled.div`
  font-size: 14px;
  color: ${C.lav};
  font-weight: 500;
`;

const EduMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  font-family: ${C.mono};
  font-size: 12px;
  color: ${C.muted};
`;

const EduGrade = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${C.amberLight};
`;

const EduDesc = styled.div`
  padding: 14px 28px 20px;
  font-size: 13px;
  color: ${C.whiteD};
  line-height: 1.7;
  font-weight: 300;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

const CertCard = styled.div`
  background: ${C.baseUp};
  border-radius: 18px;
  padding: 20px 22px;
  cursor: ${({ linked }) => linked ? 'pointer' : 'default'};
  transition: all 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${scaleIn} 0.45s ${({ i }) => i * 0.06}s ease both;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, ${C.amberGlowS}, transparent 70%);
    transition: all 0.4s;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: ${C.amberGlow};
    box-shadow: 0 14px 36px rgba(0,0,0,0.3);
    &::before { opacity: 1; top: -30px; right: -30px; }
  }
`;

const CertBadge = styled.div`
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${C.amberGlowS}, ${C.lavGlow});
  border: 1px solid ${C.border};
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  margin-bottom: 14px;
`;

const CertName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${C.white};
  margin-bottom: 6px;
  line-height: 1.4;
`;

const CertMeta = styled.div`
  font-family: ${C.mono};
  font-size: 11px;
  color: ${C.muted};
  line-height: 1.8;
`;

const ContactWrap = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;

  @media(max-width: 700px) { grid-template-columns: 1fr; }
`;

const ContactLeft = styled.div``;

const ContactTagline = styled.div`
  font-family: ${C.display};
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: ${C.white};
  line-height: 1.15;
  margin-bottom: 14px;
  letter-spacing: -0.01em;
`;

const ContactSub = styled.div`
  font-size: 14px;
  color: ${C.whiteD};
  line-height: 1.75;
  margin-bottom: 32px;
  font-weight: 300;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  background: ${C.baseUp};
  border: 1px solid ${C.border};
  border-radius: 14px;
  font-size: 14px;
  color: ${C.whiteD};
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    border-color: ${C.amberGlow};
    background: ${C.amberGlowS};
    color: ${C.amberLight};
    transform: translateX(6px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }

  .icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: ${C.basePop};
    border: 1px solid ${C.border};
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    transition: all 0.22s;
  }

  &:hover .icon {
    background: ${C.amberGlowS};
    border-color: ${C.amberGlow};
  }

  .text { flex: 1; }
  .label { font-size: 10px; font-family: ${C.mono}; color: ${C.muted}; letter-spacing: 0.08em; }
  .val { font-size: 13px; font-weight: 500; }
`;

const ContactRight = styled.div`
  background: ${C.baseUp};
  border: 1px solid ${C.border};
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, ${C.mintGlow}, transparent 70%);
    pointer-events: none;
  }
`;

const ContactStatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const ContactStat = styled.div`
  background: ${C.basePop};
  border: 1px solid ${C.border};
  border-radius: 14px;
  padding: 16px 18px;

  .num {
    font-family: ${C.display};
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, ${C.amberLight}, ${C.mint});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 4px;
  }

  .lbl {
    font-size: 11px;
    font-family: ${C.mono};
    color: ${C.muted};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const AvailBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(45,212,191,0.07);
  border: 1px solid ${C.mintGlow};
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 13px;
  color: ${C.mintLight};
  font-weight: 500;

  &::before {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${C.mint};
    flex-shrink: 0;
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  border-top: 1px solid ${C.border};
  padding: 28px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;

  @media(max-width: 768px) { padding: 24px 20px; }
`;

const FooterText = styled.div`
  font-size: 13px;
  color: ${C.muted};
  font-weight: 400;
`;

const FooterBrand = styled.div`
  font-family: ${C.display};
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(90deg, ${C.amberLight}, ${C.mintLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${C.border}, transparent);
  max-width: 1120px;
  margin: 0 auto;
`;

function getImg(img) {
  if (!img) return null;
  return Array.isArray(img) ? img[0] : img;
}

export default function AuroraStudio({ data = {} }) {
  const { navbar, hero, skills, experience, projects, education, certifications, contact, footer } = data;

  const marqueeItems = [
    "Creative Developer",
    "Motion Design",
    "Interactive Experiences",
    "WebGL",
    "React",
    "Open Source",
    "UI Engineering",
    "Animation",
  ];

  return (
    <>
      <GlobalStyle />

      <BlobLayer>
        <Blob bg={`linear-gradient(135deg, ${C.amber}, ${C.amberLight})`}
          w={500} h={500} top="-10%" left="-8%" op={0.09} dur={14} fdur={9} blur={90} />
        <Blob bg={`linear-gradient(135deg, ${C.mint}, #0ea5e9)`}
          w={420} h={420} top="30%" right="-10%" op={0.08} dur={16} fdur={11} blur={80} />
        <Blob bg={`linear-gradient(135deg, ${C.lav}, ${C.coral})`}
          w={360} h={360} bottom="5%" left="20%" op={0.07} dur={12} fdur={8} blur={100} />
      </BlobLayer>

      <FloatShape top="18%" left="5%" op={0.07} dur={10} anim="b">
        <Ring s={100} c={C.mint} />
      </FloatShape>
      <FloatShape top="55%" right="4%" op={0.06} dur={13} anim="c">
        <Ring s={60} c={C.amber} thick={2} />
      </FloatShape>
      <FloatShape top="75%" left="8%" op={0.05} dur={11} anim="a">
        <Square s={40} c={C.lav} />
      </FloatShape>
      <FloatShape top="25%" right="8%" op={0.05} dur={9} anim="b">
        <Triangle s={20} s2={34} c={C.coral} />
      </FloatShape>
      <FloatShape top="45%" left="2%" op={0.04} dur={15} anim="c">
        <Ring s={140} c={C.lav} />
      </FloatShape>

      <NavBar>
        <NavBrand>{navbar?.logo || "Portfolio"}</NavBrand>
        <NavLinks>
          {["skills", "experience", "projects", "education", "contact"].map(id => (
            <NavLink key={id} href={`#${id}`}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </NavLink>
          ))}
        </NavLinks>
        <NavCTA href={contact?.email ? `mailto:${contact.email}` : "#contact"}>
          {navbar?.ctaLabel || "Hire Me"}
        </NavCTA>
      </NavBar>

      <HeroSection id="hero">
        <HeroInner>
          <HeroLeft>
            <HeroEyebrow>
              {hero?.statusBadge || "Available for Work"}
            </HeroEyebrow>

            <HeroName>
              {hero?.name || "Your Name"}
            </HeroName>

            <HeroTitle>
              <GradText>{hero?.title || "Creative Developer"}</GradText>
            </HeroTitle>

            {hero?.subtitle && <HeroSub>{hero.subtitle}</HeroSub>}
            {hero?.bio && <HeroBio>{hero.bio}</HeroBio>}

            <HeroCTAs>
              {hero?.resumeLink && (
                <BtnPrimary href={hero.resumeLink} target="_blank" rel="noopener noreferrer">
                  ↓ Download CV
                </BtnPrimary>
              )}
              {hero?.showreel && (
                <BtnSecondary href={hero.showreel} target="_blank" rel="noopener noreferrer">
                  ▶ Watch Showreel
                </BtnSecondary>
              )}
              {!hero?.showreel && contact?.email && (
                <BtnSecondary href="#contact">
                  ✦ Let's Talk
                </BtnSecondary>
              )}
            </HeroCTAs>
          </HeroLeft>

          <HeroRight>
            <AvatarOrbit>
              <OrbitRing inset="0" c={C.amberLight} dur={22} />
              <OrbitRing inset="20px" c={C.mint} dur={15} rev />
              <OrbitRing inset="50px" c={C.lav} dur={30} />

              <OrbitDot c={C.amber} top="5%" left="50%" style={{ transform: "translateX(-50%)" }} />
              <OrbitDot c={C.mint} top="50%" left="98%" style={{ transform: "translateY(-50%)" }} />
              <OrbitDot c={C.lav} top="95%" left="50%" style={{ transform: "translateX(-50%)" }} />

              <AvatarGlow />
              <AvatarCore>
                {getImg(hero?.avatar) ? (
                  <img src={getImg(hero.avatar)} alt={hero?.name || "avatar"} />
                ) : (
                  <AvatarPlaceholder>👤</AvatarPlaceholder>
                )}
              </AvatarCore>

              {hero?.badge1 && (
                <FloatingBadge top="-10px" left="-30px" ac={C.amber} anim="b" dur={6}>
                  <span>✦</span>{hero.badge1}
                </FloatingBadge>
              )}
              {hero?.badge2 && (
                <FloatingBadge bottom="-10px" right="-24px" ac={C.mint} anim="c" dur={7}>
                  <span>◈</span>{hero.badge2}
                </FloatingBadge>
              )}
              {hero?.badge3 && (
                <FloatingBadge bottom="60px" left="-36px" ac={C.lav} anim="a" dur={8}>
                  <span>★</span>{hero.badge3}
                </FloatingBadge>
              )}
            </AvatarOrbit>
          </HeroRight>
        </HeroInner>
      </HeroSection>

      <MarqueeWrap>
        <MarqueeTrack>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <MarqueeItem key={i}>{item}</MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeWrap>

      {skills && skills.length > 0 && (
        <Section id="skills">
          <SectionTag>Tech Stack</SectionTag>
          <SectionHeading>
            What I <GradText>Work With</GradText>
          </SectionHeading>
          <SkillsGrid>
            {skills.map((group, i) => (
              <SkillCard key={i} i={i}>
                <SkillIcon>{SKILL_ICONS[i % SKILL_ICONS.length]}</SkillIcon>
                <SkillCat>{group.title}</SkillCat>
                <ChipsWrap>
                  {(Array.isArray(group.skills) ? group.skills : []).map((sk, j) => (
                    <Chip key={j}>{sk}</Chip>
                  ))}
                </ChipsWrap>
              </SkillCard>
            ))}
          </SkillsGrid>
        </Section>
      )}

      <Divider />

      {experience?.showExperience !== false && experience?.items?.length > 0 && (
        <Section id="experience">
          <SectionTag>Career</SectionTag>
          <SectionHeading>
            Work <GradText>Experience</GradText>
          </SectionHeading>
          <ExpWrap>
            {experience.items.map((job, i) => (
              <ExpCard key={i} i={i}>
                <ExpTop>
                  <ExpLeft>
                    <ExpRole>{job.role}</ExpRole>
                    {job.company && <ExpCompany>{job.company}</ExpCompany>}
                  </ExpLeft>
                  <ExpRight>
                    {job.period && <ExpPill>{job.period}</ExpPill>}
                    {job.location && <ExpPill c={C.muted}>{job.location}</ExpPill>}
                  </ExpRight>
                </ExpTop>
                {job.description && <ExpBody>{job.description}</ExpBody>}
              </ExpCard>
            ))}
          </ExpWrap>
        </Section>
      )}

      <Divider />

      {projects && projects.length > 0 && (
        <Section id="projects">
          <SectionTag>Work</SectionTag>
          <SectionHeading>
            Featured <GradText>Projects</GradText>
          </SectionHeading>
          <ProjectsWrap>
            {projects.map((proj, i) => (
              <ProjectCard key={i} i={i}>
                <ProjectImgWrap>
                  {getImg(proj.image) ? (
                    <img src={getImg(proj.image)} alt={proj.title} />
                  ) : (
                    <ImgPlaceholder>◈</ImgPlaceholder>
                  )}
                </ProjectImgWrap>

                <ProjectBody>
                  {proj.date && <ProjYear>{proj.date}</ProjYear>}
                  <ProjTitle>{proj.title}</ProjTitle>
                  {proj.description && <ProjDesc>{proj.description}</ProjDesc>}

                  {proj.tags?.length > 0 && (
                    <ProjTagsRow>
                      {proj.tags.map((t, j) => <ProjTag key={j}>{t}</ProjTag>)}
                    </ProjTagsRow>
                  )}

                  <ProjLinks>
                    {proj.webapp && (
                      <ProjBtn href={proj.webapp} target="_blank" rel="noopener noreferrer" variant="primary">
                        ↗ Live Demo
                      </ProjBtn>
                    )}
                    {proj.github && (
                      <ProjBtn href={proj.github} target="_blank" rel="noopener noreferrer">
                        ⌥ GitHub
                      </ProjBtn>
                    )}
                  </ProjLinks>

                  {proj.showMembers && proj.member?.length > 0 && (
                    <MembersLine>
                      Team: {proj.member.map((m, j) => (
                        <span key={j}>
                          {m.github
                            ? <a href={m.github} target="_blank" rel="noopener noreferrer">{m.name}</a>
                            : m.name}
                          {j < proj.member.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </MembersLine>
                  )}
                </ProjectBody>
              </ProjectCard>
            ))}
          </ProjectsWrap>
        </Section>
      )}

      <Divider />

      {education && education.length > 0 && (
        <Section id="education">
          <SectionTag>Academic</SectionTag>
          <SectionHeading>
            <GradText>Education</GradText>
          </SectionHeading>
          <EduWrap>
            {education.map((edu, i) => (
              <EduCard key={i} i={i}>
                <EduTop>
                  <div>
                    <EduDeg>{edu.degree}</EduDeg>
                    {edu.institution && <EduInst>{edu.institution}</EduInst>}
                  </div>
                  <EduMeta>
                    {edu.period && <div>{edu.period}</div>}
                    {edu.grade && <EduGrade>{edu.grade}</EduGrade>}
                  </EduMeta>
                </EduTop>
                {edu.description && <EduDesc>{edu.description}</EduDesc>}
              </EduCard>
            ))}
          </EduWrap>
        </Section>
      )}

      <Divider />

      {certifications?.showCertifications !== false && certifications?.items?.length > 0 && (
        <Section id="certifications">
          <SectionTag>Credentials</SectionTag>
          <SectionHeading>
            Certs & <GradText>Badges</GradText>
          </SectionHeading>
          <CertGrid>
            {certifications.items.map((cert, i) => (
              <CertCard
                key={i}
                i={i}
                linked={!!cert.link}
                as={cert.link ? "a" : "div"}
                href={cert.link || undefined}
                target={cert.link ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <CertBadge>🏅</CertBadge>
                <CertName>{cert.name}</CertName>
                <CertMeta>
                  {cert.issuer && <div>{cert.issuer}</div>}
                  {cert.date && <div style={{ color: C.amberLight }}>{cert.date}</div>}
                </CertMeta>
              </CertCard>
            ))}
          </CertGrid>
        </Section>
      )}

      <Divider />

      <Section id="contact">
        <SectionTag>Contact</SectionTag>
        <SectionHeading>
          Let's <GradText>Connect</GradText>
        </SectionHeading>

        <ContactWrap>
          <ContactLeft>
            <ContactTagline>
              {contact?.tagline || "Ready to build something extraordinary?"}
            </ContactTagline>
            <ContactSub>
              Whether it's a freelance project, a full-time role, or just a great idea — I'd love to hear from you.
            </ContactSub>

            <ContactLinks>
              {contact?.email && (
                <ContactItem href={`mailto:${contact.email}`}>
                  <div className="icon">✉</div>
                  <div className="text">
                    <div className="label">email</div>
                    <div className="val">{contact.email}</div>
                  </div>
                </ContactItem>
              )}
              {contact?.github && (
                <ContactItem href={contact.github} target="_blank" rel="noopener noreferrer">
                  <div className="icon">⌥</div>
                  <div className="text">
                    <div className="label">github</div>
                    <div className="val">{contact.github.replace("https://github.com/", "")}</div>
                  </div>
                </ContactItem>
              )}
              {contact?.linkedin && (
                <ContactItem href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <div className="icon">◈</div>
                  <div className="text">
                    <div className="label">linkedin</div>
                    <div className="val">{contact.linkedin.replace("https://linkedin.com/in/", "")}</div>
                  </div>
                </ContactItem>
              )}
              {contact?.showTwitter !== false && contact?.twitter && (
                <ContactItem href={contact.twitter} target="_blank" rel="noopener noreferrer">
                  <div className="icon">✦</div>
                  <div className="text">
                    <div className="label">twitter / x</div>
                    <div className="val">{contact.twitter.replace("https://twitter.com/", "")}</div>
                  </div>
                </ContactItem>
              )}
              {contact?.showFacebook === true && contact?.facebook && (
                <ContactItem href={contact.facebook} target="_blank" rel="noopener noreferrer">
                  <div className="icon">◉</div>
                  <div className="text">
                    <div className="label">facebook</div>
                    <div className="val">{contact.facebook.replace("https://", "")}</div>
                  </div>
                </ContactItem>
              )}
              {contact?.showInstagram === true && contact?.instagram && (
                <ContactItem href={contact.instagram} target="_blank" rel="noopener noreferrer">
                  <div className="icon">◎</div>
                  <div className="text">
                    <div className="label">instagram</div>
                    <div className="val">{contact.instagram.replace("https://", "")}</div>
                  </div>
                </ContactItem>
              )}
            </ContactLinks>
          </ContactLeft>

          <ContactRight>
            <ContactStatGrid>
              {hero?.yearsExp && (
                <ContactStat>
                  <div className="num">{hero.yearsExp}</div>
                  <div className="lbl">years exp</div>
                </ContactStat>
              )}
              {hero?.projectsCount && (
                <ContactStat>
                  <div className="num">{hero.projectsCount}</div>
                  <div className="lbl">projects</div>
                </ContactStat>
              )}
              {(!hero?.yearsExp || !hero?.projectsCount) && (
                <>
                  <ContactStat>
                    <div className="num">{experience?.items?.length || 0}+</div>
                    <div className="lbl">roles</div>
                  </ContactStat>
                  <ContactStat>
                    <div className="num">{projects?.length || 0}+</div>
                    <div className="lbl">projects</div>
                  </ContactStat>
                </>
              )}
            </ContactStatGrid>

            <AvailBanner>
              Currently open to new opportunities
            </AvailBanner>

            {contact?.location && (
              <div style={{ fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>📍</span>
                <span>{contact.location}</span>
              </div>
            )}
          </ContactRight>
        </ContactWrap>
      </Section>

      <Footer>
        <FooterText>
          {footer?.text || `© ${new Date().getFullYear()} ${hero?.name || ""} · All rights reserved.`}
        </FooterText>
        <FooterBrand>{navbar?.logo || "Portfolio"}</FooterBrand>
      </Footer>
    </>
  );
}