import React from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const T = {
  bg:         "#07080f",
  bgDeep:     "#050609",
  bgPanel:    "#0c0e1a",
  bgCard:     "#0f1120",
  bgCardHov:  "#131528",
  bgGlass:    "rgba(15,17,32,0.85)",

  violet:     "#7c3aed",
  violetBri:  "#a855f7",
  violetDim:  "#4c1d95",
  violetGlow: "rgba(124,58,237,0.25)",
  violetGlowS:"rgba(124,58,237,0.12)",

  coral:      "#ff4d6d",
  coralDim:   "#c9184a",
  coralGlow:  "rgba(255,77,109,0.2)",

  blue:       "#38bdf8",
  blueGlow:   "rgba(56,189,248,0.15)",

  white:      "#f0f0ff",
  whiteD:     "#a0a0c0",
  muted:      "#4a4a6a",
  border:     "#1a1b2e",
  borderBri:  "#2d2f50",

  display:    "'Bebas Neue', 'Impact', sans-serif",
  mono:       "'IBM Plex Mono', 'Fira Code', monospace",
  body:       "'DM Sans', 'Segoe UI', sans-serif",
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideRight = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const gridPan = keyframes`
  0%   { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
`;

const pulsate = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.95); }
`;

const scan = keyframes`
  0%   { top: -4px; }
  100% { top: 100%; }
`;

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow:
      0 0 4px #fff,
      0 0 12px ${T.violet},
      0 0 32px ${T.violet},
      0 0 72px ${T.violetBri};
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`;

const floatUp = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${T.bg};
    color: ${T.white};
    font-family: ${T.body};
    overflow-x: hidden;
    cursor: default;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${T.bgDeep}; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(${T.violet}, ${T.coral});
    border-radius: 4px;
  }

  ::selection { background: ${T.violetDim}; color: ${T.violetBri}; }
  a { text-decoration: none; }
`;

const GridBg = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -40px;
    background-image:
      linear-gradient(${T.border} 1px, transparent 1px),
      linear-gradient(90deg, ${T.border} 1px, transparent 1px);
    background-size: 40px 40px;
    animation: ${gridPan} 8s linear infinite;
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 90% 60%, rgba(255,77,109,0.06) 0%, transparent 60%),
                radial-gradient(ellipse 50% 60% at 10% 80%, rgba(56,189,248,0.05) 0%, transparent 60%);
  }
`;

const ScanLine = styled.div`
  position: fixed;
  left: 0; right: 0;
  height: 3px;
  background: linear-gradient(to bottom, transparent, rgba(124,58,237,0.06), transparent);
  z-index: 9997;
  pointer-events: none;
  animation: ${scan} 10s linear infinite;
`;

const PageShell = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 56px;
  z-index: 200;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: rgba(7,8,15,0.92);
  border-bottom: 1px solid ${T.border};
  backdrop-filter: blur(16px);
  gap: 0;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, ${T.violet}, ${T.coral});
  border-radius: 6px;
  font-family: ${T.display};
  font-size: 16px;
  color: #fff;
  letter-spacing: 0.05em;
  flex-shrink: 0;
`;

const NavSystem = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.08em;

  span { color: ${T.violetBri}; }
`;

const NavCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media(max-width: 768px) { display: none; }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;

  @media(max-width: 640px) { display: none; }
`;

const NavBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
  border: 1px solid transparent;
  border-radius: 4px;
  letter-spacing: 0.06em;
  transition: all 0.18s;
  cursor: pointer;

  &:hover {
    color: ${T.violetBri};
    border-color: ${T.violetDim};
    background: ${T.violetGlowS};
  }

  &.active {
    color: ${T.violetBri};
    border-color: ${T.violetDim};
    background: ${T.violetGlowS};
  }
`;

const LiveDot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${T.mono};
  font-size: 10px;
  color: #22c55e;
  margin-left: 8px;
  letter-spacing: 0.06em;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    display: inline-block;
    animation: ${pulsate} 2s ease-in-out infinite;
  }
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 32px 60px;
  width: 100%;
  animation: ${fadeUp} 0.6s ease both;

  @media(max-width: 768px) { padding: 70px 18px 40px; }
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
`;

const SectionNum = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.violet};
  letter-spacing: 0.1em;
  opacity: 0.7;
`;

const SectionTitle = styled.h2`
  font-family: ${T.display};
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.06em;
  color: ${T.white};
  line-height: 1;
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, ${T.borderBri}, transparent);
`;

const SectionAccent = styled.span`
  color: ${T.violet};
`;

const glassBase = css`
  background: ${T.bgGlass};
  border: 1px solid ${T.border};
  border-radius: 12px;
  backdrop-filter: blur(12px);
`;

const Panel = styled.div`
  ${glassBase}
  padding: ${({ pad }) => pad || '28px'};
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;

  &:hover {
    border-color: ${T.borderBri};
    box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
    transform: translateY(-2px);
  }
`;

const WindowPanel = styled.div`
  ${glassBase}
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;

  &:hover {
    border-color: ${({ accent }) => accent || T.borderBri};
    box-shadow: 0 16px 48px rgba(0,0,0,0.5),
                0 0 0 1px ${({ accent }) => accent || T.borderBri}22,
                inset 0 1px 0 rgba(255,255,255,0.04);
    transform: translateY(-3px);
  }
`;

const WindowChrome = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${T.border};
  background: rgba(0,0,0,0.2);
  gap: 12px;
`;

const WinDots = styled.div`
  display: flex;
  gap: 5px;
`;

const WinDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ c }) => c};
  opacity: 0.8;
`;

const WinTitle = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};
  flex: 1;
  text-align: center;
  letter-spacing: 0.06em;
`;

const WinTag = styled.div`
  font-family: ${T.mono};
  font-size: 9px;
  color: ${({ c }) => c || T.violet};
  border: 1px solid ${({ c }) => c || T.violet}44;
  padding: 2px 7px;
  border-radius: 3px;
  letter-spacing: 0.06em;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 32px 60px;
  position: relative;

  @media(max-width: 768px) { padding: 80px 18px 40px; }
`;

const HeroInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 64px;
  align-items: center;

  @media(max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const HeroLeft = styled.div`
  animation: ${fadeUp} 0.7s ease both;
`;

const HeroPretitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.violet};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 16px;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: ${T.violet};
  }
`;

const HeroName = styled.h1`
  font-family: ${T.display};
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 0.92;
  letter-spacing: 0.03em;
  color: ${T.white};
  margin-bottom: 12px;

  .accent {
    background: linear-gradient(90deg, ${T.violetBri}, ${T.coral});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${neonFlicker} 8s ease-in-out infinite;
  }
`;

const HeroRole = styled.div`
  font-size: 15px;
  color: ${T.whiteD};
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

const HeroSub = styled.div`
  font-family: ${T.mono};
  font-size: 12px;
  color: ${T.muted};
  letter-spacing: 0.06em;
  margin-bottom: 32px;
`;

const HeroBio = styled.p`
  font-size: 15px;
  color: ${T.whiteD};
  line-height: 1.8;
  max-width: 560px;
  margin-bottom: 40px;
  font-weight: 300;
`;

const HeroStats = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: left;
`;

const StatNum = styled.div`
  font-family: ${T.display};
  font-size: 2.2rem;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, ${T.violetBri}, ${T.coral});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: linear-gradient(135deg, ${T.violet}, ${T.coral});
  color: #fff;
  font-family: ${T.mono};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${T.violetGlow}, 0 4px 12px ${T.coralGlow};
    color: #fff;
    &::after { opacity: 1; }
  }
`;

const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  color: ${T.violetBri};
  font-family: ${T.mono};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  border-radius: 6px;
  border: 1px solid ${T.violetDim};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${T.violetGlowS};
    border-color: ${T.violet};
    color: ${T.violetBri};
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${T.violetGlow};
  }
`;

const HeroRight = styled.div`
  animation: ${fadeUp} 0.7s 0.2s ease both;

  @media(max-width: 960px) { order: -1; }
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  animation: ${floatUp} 6s ease-in-out infinite;
`;

const AvatarRing = styled.div`
  position: absolute;
  inset: -16px;
  border-radius: 20px;
  background: conic-gradient(
    from 0deg,
    ${T.violet},
    ${T.coral},
    ${T.blue},
    ${T.violet}
  );
  animation: ${spinSlow} 8s linear infinite;
  opacity: 0.5;
  filter: blur(2px);
`;

const AvatarFrame = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  border: 2px solid ${T.border};
  background: ${T.bgPanel};
  z-index: 1;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
  background: ${T.bgPanel};
  color: ${T.muted};
`;

const StatusBadge = styled.div`
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: ${T.bgCard};
  border: 1px solid ${T.border};
  border-radius: 24px;
  padding: 7px 18px;
  font-family: ${T.mono};
  font-size: 11px;
  color: #22c55e;
  letter-spacing: 0.08em;
  white-space: nowrap;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    animation: ${pulsate} 2s ease-in-out infinite;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

const SkillPanel = styled(WindowPanel)``;

const SkillCatLabel = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.violet};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${T.border};
`;

const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const SkillChip = styled.span`
  display: inline-block;
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.white};
  background: ${T.bgPanel};
  border: 1px solid ${T.border};
  padding: 4px 12px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  transition: all 0.2s;
  cursor: default;

  &:hover {
    border-color: ${T.violetDim};
    color: ${T.violetBri};
    background: ${T.violetGlowS};
    transform: translateY(-1px);
  }
`;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;

  &::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 20px;
    bottom: 20px;
    width: 1px;
    background: linear-gradient(to bottom, ${T.violet}, transparent);
  }

  @media(max-width: 640px) {
    &::before { left: 12px; }
  }
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 24px;
  padding-bottom: 40px;
  animation: ${slideRight} 0.5s ease both;
  animation-delay: ${({ i }) => i * 0.1}s;

  @media(max-width: 640px) {
    grid-template-columns: 26px 1fr;
    gap: 14px;
  }
`;

const TimelineDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${T.violet};
  border: 2px solid ${T.bg};
  margin-top: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px ${T.violetDim}, 0 0 12px ${T.violet};
  position: relative;
  z-index: 1;
`;

const TimelineContent = styled(WindowPanel)``;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  padding: 20px 24px 16px;
  border-bottom: 1px solid ${T.border};
`;

const ExpRole = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${T.white};
`;

const ExpCompany = styled.div`
  font-family: ${T.mono};
  font-size: 12px;
  margin-top: 4px;
  background: linear-gradient(90deg, ${T.violetBri}, ${T.coral});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ExpMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ExpPeriod = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.06em;
`;

const ExpLoc = styled.div`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
`;

const ExpDesc = styled.div`
  padding: 16px 24px 20px;
  font-size: 14px;
  color: ${T.whiteD};
  line-height: 1.75;
  font-weight: 300;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const ProjectCard = styled(WindowPanel)`
  display: flex;
  flex-direction: column;
`;

const ProjectImage = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
  background: ${T.bgPanel};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    filter: brightness(0.85) saturate(1.1);
  }

  &:hover img { transform: scale(1.06); }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 40%,
      ${T.bgCard} 100%
    );
  }
`;

const ProjectImgPlaceholder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: ${T.muted};
  font-family: ${T.mono};
  background: repeating-linear-gradient(
    45deg,
    ${T.bgPanel},
    ${T.bgPanel} 8px,
    ${T.bgCard} 8px,
    ${T.bgCard} 16px
  );
`;

const ProjectBody = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${T.white};
  margin-bottom: 4px;
  letter-spacing: 0.01em;
`;

const ProjectDate = styled.div`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
  margin-bottom: 12px;
  letter-spacing: 0.08em;
`;

const ProjectDesc = styled.div`
  font-size: 13px;
  color: ${T.whiteD};
  line-height: 1.7;
  flex: 1;
  font-weight: 300;
  margin-bottom: 16px;
`;

const ProjectChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
`;

const ProjectChip = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.coral};
  border: 1px solid ${T.coralDim}44;
  background: ${T.coralGlow};
  padding: 3px 9px;
  border-radius: 3px;
  letter-spacing: 0.06em;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ProjBtn = styled.a`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  font-family: ${T.mono};
  font-size: 11px;
  color: ${({ primary }) => primary ? T.bg : T.violetBri};
  background: ${({ primary }) => primary ? `linear-gradient(135deg, ${T.violet}, ${T.coral})` : 'transparent'};
  border: 1px solid ${({ primary }) => primary ? 'transparent' : T.violetDim};
  border-radius: 5px;
  letter-spacing: 0.06em;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    ${({ primary }) => primary ? css`
      box-shadow: 0 4px 14px ${T.violetGlow};
      color: #fff;
    ` : css`
      background: ${T.violetGlowS};
      border-color: ${T.violet};
      color: ${T.violetBri};
    `}
  }
`;

const MembersRow = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${T.border};
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};

  a {
    color: ${T.blue};
    &:hover { color: ${T.white}; }
  }
`;

const EduGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EduCard = styled(WindowPanel)``;

const EduTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  padding: 22px 26px 16px;
  border-bottom: 1px solid ${T.border};
`;

const EduDegree = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${T.white};
`;

const EduInstitution = styled.div`
  font-family: ${T.mono};
  font-size: 12px;
  margin-top: 5px;
  color: ${T.violet};
`;

const EduRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const EduPeriod = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};
`;

const EduGrade = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  background: linear-gradient(90deg, ${T.violetBri}, ${T.blue});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
`;

const EduDesc = styled.div`
  padding: 14px 26px 18px;
  font-size: 13px;
  color: ${T.whiteD};
  line-height: 1.7;
  font-weight: 300;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
`;

const CertCard = styled.a`
  display: block;
  padding: 18px 20px;
  background: ${T.bgCard};
  border: 1px solid ${T.border};
  border-radius: 10px;
  transition: all 0.22s;
  cursor: ${({ href }) => href ? 'pointer' : 'default'};

  &:hover {
    border-color: ${T.violetDim};
    background: ${T.bgCardHov};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${T.violetDim}44;
  }
`;

const CertIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: linear-gradient(135deg, ${T.violetDim}, ${T.coralDim});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 12px;
  color: white;
`;

const CertName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.white};
  margin-bottom: 6px;
  line-height: 1.4;
`;

const CertMeta = styled.div`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
  line-height: 1.8;
  letter-spacing: 0.04em;
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media(max-width: 640px) { grid-template-columns: 1fr; }
`;

const ContactPanel = styled(WindowPanel)``;

const ContactHeadline = styled.div`
  font-family: ${T.display};
  font-size: 2rem;
  letter-spacing: 0.06em;
  color: ${T.white};
  margin-bottom: 12px;

  span {
    background: linear-gradient(90deg, ${T.violetBri}, ${T.coral});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ContactSub = styled.div`
  font-size: 14px;
  color: ${T.whiteD};
  line-height: 1.7;
  margin-bottom: 28px;
  font-weight: 300;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactRow = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: ${T.bgPanel};
  border: 1px solid ${T.border};
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 13px;
  color: ${T.whiteD};

  &:hover {
    border-color: ${T.violetDim};
    background: ${T.violetGlowS};
    color: ${T.violetBri};
    transform: translateX(4px);
  }

  .icon {
    font-size: 16px;
    width: 24px;
    text-align: center;
  }

  .label {
    font-family: ${T.mono};
    font-size: 10px;
    color: ${T.muted};
    min-width: 64px;
    letter-spacing: 0.06em;
  }

  .val {
    flex: 1;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SysPanel = styled.div`
  background: ${T.bgDeep};
  border: 1px solid ${T.border};
  border-radius: 10px;
  overflow: hidden;
`;

const SysPanelHeader = styled.div`
  padding: 10px 16px;
  background: ${T.bgPanel};
  border-bottom: 1px solid ${T.border};
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
  letter-spacing: 0.1em;
`;

const SysPanelBody = styled.div`
  padding: 20px;
  font-family: ${T.mono};
  font-size: 12px;
  line-height: 2;
  color: ${T.muted};

  .k { color: ${T.violetBri}; padding-right: 8px; }
  .v { color: ${T.white}; }
  .ok { color: #22c55e; }
  .warn { color: ${T.coral}; }
`;

const FooterEl = styled.footer`
  border-top: 1px solid ${T.border};
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
`;

const FooterText = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.06em;
`;

const FooterBadge = styled.div`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.muted};
  border: 1px solid ${T.border};
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.08em;
`;

function getImg(img) {
  if (!img) return null;
  return Array.isArray(img) ? img[0] : img;
}

function SectionHead({ num, title, accent }) {
  return (
    <SectionLabel>
      <SectionNum>[ {num} ]</SectionNum>
      <SectionTitle>
        {title}{accent && <SectionAccent> {accent}</SectionAccent>}
      </SectionTitle>
      <SectionLine />
    </SectionLabel>
  );
}

function WinHeader({ title, tag, tagColor }) {
  return (
    <WindowChrome>
      <WinDots>
        <WinDot c="#ff5f57" />
        <WinDot c="#febc2e" />
        <WinDot c="#28c840" />
      </WinDots>
      <WinTitle>{title}</WinTitle>
      {tag && <WinTag c={tagColor}>{tag}</WinTag>}
    </WindowChrome>
  );
}

export default function NeonOS({ data = {} }) {
  const { navbar, hero, skills, experience, projects, education, certifications, contact, footer } = data;

  const navItems = [
    { id: "skills", label: "skills" },
    { id: "experience", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "education", label: "education" },
    { id: "certifications", label: "certs" },
    { id: "contact", label: "contact" },
  ];

  return (
    <>
      <GlobalStyle />
      <GridBg />
      <ScanLine />

      <PageShell>
        <NavBar>
          <NavLeft>
            <NavLogo>{navbar?.logo || "OS"}</NavLogo>
            <NavSystem>
              <span>@{(navbar?.handle || "user").replace(/^@/, "")}</span>
            </NavSystem>
          </NavLeft>

          <NavCenter>
            {navbar?.systemName || "PORTFOLIO_OS v2.0"}
          </NavCenter>

          <NavRight>
            {navItems.map(n => (
              <NavBtn key={n.id} href={`#${n.id}`}>{n.label}</NavBtn>
            ))}
            <LiveDot>online</LiveDot>
          </NavRight>
        </NavBar>

        <ContentWrap>
          <HeroSection id="hero">
            <HeroInner>
              <HeroLeft>
                <HeroPretitle>PORTFOLIO_OS · INIT SEQUENCE</HeroPretitle>

                <HeroName>
                  {(() => {
                    const name = hero?.name || "Developer";
                    const parts = name.split(" ");
                    if (parts.length === 1) return <span className="accent">{name}</span>;
                    return <>
                      {parts.slice(0, -1).join(" ")}{" "}
                      <span className="accent">{parts[parts.length - 1]}</span>
                    </>;
                  })()}
                </HeroName>

                {hero?.title && <HeroRole>{hero.title}</HeroRole>}
                {hero?.subtitle && <HeroSub>{hero.subtitle}</HeroSub>}
                {hero?.bio && <HeroBio>{hero.bio}</HeroBio>}

                {(hero?.yearsExp || hero?.projectsCount || hero?.coffeeCount) && (
                  <HeroStats>
                    {hero.yearsExp && (
                      <StatItem>
                        <StatNum>{hero.yearsExp}</StatNum>
                        <StatLabel>years exp</StatLabel>
                      </StatItem>
                    )}
                    {hero.projectsCount && (
                      <StatItem>
                        <StatNum>{hero.projectsCount}</StatNum>
                        <StatLabel>projects</StatLabel>
                      </StatItem>
                    )}
                    {hero.coffeeCount && (
                      <StatItem>
                        <StatNum>{hero.coffeeCount}</StatNum>
                        <StatLabel>—</StatLabel>
                      </StatItem>
                    )}
                  </HeroStats>
                )}

                <HeroCTAs>
                  {hero?.resumeLink && (
                    <PrimaryBtn href={hero.resumeLink} target="_blank" rel="noopener noreferrer">
                      ↓ Download CV
                    </PrimaryBtn>
                  )}
                  {contact?.email && (
                    <GhostBtn href="#contact">
                      ✦ Get in touch
                    </GhostBtn>
                  )}
                </HeroCTAs>
              </HeroLeft>

              <HeroRight>
                <AvatarWrap>
                  <AvatarRing />
                  <AvatarFrame>
                    {getImg(hero?.avatar) ? (
                      <AvatarImg src={getImg(hero.avatar)} alt={hero?.name || "avatar"} />
                    ) : (
                      <AvatarPlaceholder>👤</AvatarPlaceholder>
                    )}
                  </AvatarFrame>
                  {hero?.statusBadge && (
                    <StatusBadge>{hero.statusBadge}</StatusBadge>
                  )}
                </AvatarWrap>
              </HeroRight>
            </HeroInner>
          </HeroSection>

          {skills && skills.length > 0 && (
            <Section id="skills">
              <SectionHead num="01" title="TECH" accent="STACK" />
              <SkillsGrid>
                {skills.map((group, i) => (
                  <SkillPanel key={i} accent={T.violetDim}>
                    <WinHeader title={group.title || "category"} tag="PKG" tagColor={T.violet} />
                    <div style={{ padding: "20px" }}>
                      <SkillCatLabel>{group.title}</SkillCatLabel>
                      <TagsWrap>
                        {(Array.isArray(group.skills) ? group.skills : []).map((sk, j) => (
                          <SkillChip key={j}>{sk}</SkillChip>
                        ))}
                      </TagsWrap>
                    </div>
                  </SkillPanel>
                ))}
              </SkillsGrid>
            </Section>
          )}

          {experience?.showExperience !== false && experience?.items?.length > 0 && (
            <Section id="experience">
              <SectionHead num="02" title="WORK" accent="HISTORY" />
              <Timeline>
                {experience.items.map((job, i) => (
                  <TimelineItem key={i} i={i}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                      <TimelineDot />
                    </div>
                    <TimelineContent accent={T.violetDim}>
                      <ExpHeader>
                        <div>
                          <ExpRole>{job.role}</ExpRole>
                          {job.company && <ExpCompany>{job.company}</ExpCompany>}
                        </div>
                        <ExpMeta>
                          {job.period && <ExpPeriod>{job.period}</ExpPeriod>}
                          {job.location && <ExpLoc>{job.location}</ExpLoc>}
                        </ExpMeta>
                      </ExpHeader>
                      {job.description && <ExpDesc>{job.description}</ExpDesc>}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>
          )}

          {projects && projects.length > 0 && (
            <Section id="projects">
              <SectionHead num="03" title="FEATURED" accent="PROJECTS" />
              <ProjectsGrid>
                {projects.map((proj, i) => (
                  <ProjectCard key={i} accent={T.coralDim}>
                    <WinHeader
                      title={proj.title || `project_${i}`}
                      tag={proj.date || "PROD"}
                      tagColor={T.coral}
                    />

                    <ProjectImage>
                      {getImg(proj.image) ? (
                        <img src={getImg(proj.image)} alt={proj.title} />
                      ) : (
                        <ProjectImgPlaceholder>◈</ProjectImgPlaceholder>
                      )}
                    </ProjectImage>

                    <ProjectBody>
                      <ProjectTitle>{proj.title}</ProjectTitle>
                      {proj.date && <ProjectDate>{proj.date}</ProjectDate>}
                      {proj.description && <ProjectDesc>{proj.description}</ProjectDesc>}

                      {proj.tags?.length > 0 && (
                        <ProjectChips>
                          {proj.tags.map((t, j) => <ProjectChip key={j}>{t}</ProjectChip>)}
                        </ProjectChips>
                      )}

                      <ProjectActions>
                        {proj.webapp && (
                          <ProjBtn href={proj.webapp} target="_blank" rel="noopener noreferrer" primary>
                            ↗ Live Demo
                          </ProjBtn>
                        )}
                        {proj.github && (
                          <ProjBtn href={proj.github} target="_blank" rel="noopener noreferrer">
                            ⌥ Source
                          </ProjBtn>
                        )}
                      </ProjectActions>

                      {proj.showMembers && proj.member?.length > 0 && (
                        <MembersRow>
                          <span style={{ color: T.muted }}>collab: </span>
                          {proj.member.map((m, j) => (
                            <span key={j}>
                              {m.github ? (
                                <a href={m.github} target="_blank" rel="noopener noreferrer">{m.name}</a>
                              ) : m.name}
                              {j < proj.member.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </MembersRow>
                      )}
                    </ProjectBody>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            </Section>
          )}

          {education && education.length > 0 && (
            <Section id="education">
              <SectionHead num="04" title="EDUCATION" />
              <EduGrid>
                {education.map((edu, i) => (
                  <EduCard key={i} accent={T.border}>
                    <WinHeader title={edu.institution || "institution"} tag="EDU" tagColor={T.blue} />
                    <EduTop>
                      <div>
                        <EduDegree>{edu.degree}</EduDegree>
                        {edu.institution && <EduInstitution>{edu.institution}</EduInstitution>}
                      </div>
                      <EduRight>
                        {edu.period && <EduPeriod>{edu.period}</EduPeriod>}
                        {edu.grade && <EduGrade>{edu.grade}</EduGrade>}
                      </EduRight>
                    </EduTop>
                    {edu.description && <EduDesc>{edu.description}</EduDesc>}
                  </EduCard>
                ))}
              </EduGrid>
            </Section>
          )}

          {certifications?.showCertifications !== false && certifications?.items?.length > 0 && (
            <Section id="certifications">
              <SectionHead num="05" title="CERTS" accent="& BADGES" />
              <CertGrid>
                {certifications.items.map((cert, i) => (
                  <CertCard
                    key={i}
                    href={cert.link || undefined}
                    target={cert.link ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    as={cert.link ? "a" : "div"}
                  >
                    <CertIcon>✦</CertIcon>
                    <CertName>{cert.name}</CertName>
                    <CertMeta>
                      {cert.issuer && <div>{cert.issuer}</div>}
                      {cert.date && <div style={{ color: T.violet }}>{cert.date}</div>}
                    </CertMeta>
                  </CertCard>
                ))}
              </CertGrid>
            </Section>
          )}

          <Section id="contact">
            <SectionHead num="06" title="GET IN" accent="TOUCH" />
            <ContactLayout>
              <ContactPanel accent={T.violetDim}>
                <WinHeader title="connection.init" tag="OPEN" tagColor="#22c55e" />
                <div style={{ padding: "28px" }}>
                  <ContactHeadline>
                    Let's <span>Connect</span>
                  </ContactHeadline>
                  {contact?.availability && (
                    <ContactSub>{contact.availability}</ContactSub>
                  )}
                  <ContactLinks>
                    {contact?.email && (
                      <ContactRow href={`mailto:${contact.email}`}>
                        <span className="icon">✉</span>
                        <span className="label">email</span>
                        <span className="val">{contact.email}</span>
                      </ContactRow>
                    )}
                    {contact?.github && (
                      <ContactRow href={contact.github} target="_blank" rel="noopener noreferrer">
                        <span className="icon">⌥</span>
                        <span className="label">github</span>
                        <span className="val">{contact.github.replace("https://github.com/", "")}</span>
                      </ContactRow>
                    )}
                    {contact?.linkedin && (
                      <ContactRow href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                        <span className="icon">◈</span>
                        <span className="label">linkedin</span>
                        <span className="val">{contact.linkedin.replace("https://linkedin.com/in/", "")}</span>
                      </ContactRow>
                    )}
                    {contact?.showTwitter !== false && contact?.twitter && (
                      <ContactRow href={contact.twitter} target="_blank" rel="noopener noreferrer">
                        <span className="icon">✦</span>
                        <span className="label">twitter/x</span>
                        <span className="val">{contact.twitter.replace("https://twitter.com/", "")}</span>
                      </ContactRow>
                    )}
                    {contact?.showFacebook === true && contact?.facebook && (
                      <ContactRow href={contact.facebook} target="_blank" rel="noopener noreferrer">
                        <span className="icon">◉</span>
                        <span className="label">facebook</span>
                        <span className="val">{contact.facebook.replace("https://", "")}</span>
                      </ContactRow>
                    )}
                    {contact?.showInstagram === true && contact?.instagram && (
                      <ContactRow href={contact.instagram} target="_blank" rel="noopener noreferrer">
                        <span className="icon">◎</span>
                        <span className="label">instagram</span>
                        <span className="val">{contact.instagram.replace("https://", "")}</span>
                      </ContactRow>
                    )}
                  </ContactLinks>
                </div>
              </ContactPanel>

              <SysPanel>
                <SysPanelHeader>▸ SYSTEM_INFO.json</SysPanelHeader>
                <SysPanelBody>
                  <div><span className="k">status</span> <span className="ok">● ONLINE</span></div>
                  <div><span className="k">response_time</span> <span className="v">&lt; 24h</span></div>
                  {contact?.location && (
                    <div><span className="k">location</span> <span className="v">{contact.location}</span></div>
                  )}
                  <div><span className="k">timezone</span> <span className="v">UTC±0</span></div>
                  <div><span className="k">open_to</span> <span className="warn">"freelance", "fulltime"</span></div>
                  <div><span className="k">remote</span> <span className="ok">true</span></div>
                  <div><span className="k">relocation</span> <span className="v">negotiable</span></div>
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.border}`, fontSize: 10, color: T.muted }}>
                    © {new Date().getFullYear()} · built with ♥ and strong coffee
                  </div>
                </SysPanelBody>
              </SysPanel>
            </ContactLayout>
          </Section>

          <FooterEl>
            <FooterText>
              {footer?.text || `© ${new Date().getFullYear()} ${hero?.name || ""} — All rights reserved.`}
            </FooterText>
            <FooterBadge>PORTFOLIO_OS v2.0</FooterBadge>
          </FooterEl>
        </ContentWrap>
      </PageShell>
    </>
  );
}