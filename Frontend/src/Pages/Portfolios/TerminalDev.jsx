import React from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const T = {
  bg:        "#0a0e0a",
  bgPanel:   "#0d120d",
  bgCard:    "#101510",
  green:     "#00ff41",
  greenDim:  "#00c832",
  greenFade: "#007a20",
  greenGlow: "rgba(0,255,65,0.15)",
  greenGlow2:"rgba(0,255,65,0.08)",
  amber:     "#ffb300",
  cyan:      "#00e5ff",
  red:       "#ff3131",
  white:     "#e8f5e9",
  muted:     "#4a7c59",
  border:    "#1a3322",
  borderBright: "#00ff41",
  font:      "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace",
};

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const flicker = keyframes`
  0%   { opacity: 0.97; }
  5%   { opacity: 0.94; }
  10%  { opacity: 0.98; }
  15%  { opacity: 0.93; }
  20%  { opacity: 0.99; }
  25%  { opacity: 0.95; }
  30%  { opacity: 0.98; }
  35%  { opacity: 0.96; }
  40%  { opacity: 0.99; }
  50%  { opacity: 0.97; }
  60%  { opacity: 0.94; }
  70%  { opacity: 0.98; }
  80%  { opacity: 0.96; }
  90%  { opacity: 0.99; }
  100% { opacity: 0.97; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glitchSlide = keyframes`
  0%   { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
  20%  { clip-path: inset(92% 0 1% 0);  transform: translate(1px, 0); }
  40%  { clip-path: inset(43% 0 1% 0);  transform: translate(-1px, 0); }
  60%  { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
  80%  { clip-path: inset(54% 0 7% 0);  transform: translate(0, 0); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(1px, 0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,65,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(0,255,65,0); }
`;

const UPTIME_SECONDS = Math.floor(Date.now() / 1000);

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${T.bg};
    color: ${T.green};
    font-family: ${T.font};
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${T.bg}; }
  ::-webkit-scrollbar-thumb { background: ${T.greenFade}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${T.green}; }

  ::selection { background: ${T.greenFade}; color: ${T.green}; }

  a { color: ${T.green}; text-decoration: none; }
  a:hover { color: ${T.white}; text-shadow: 0 0 8px ${T.green}; }
`;

const CRTWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  animation: ${flicker} 8s infinite;

  &::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.15) 2px,
      rgba(0, 0, 0, 0.15) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }

  &::after {
    content: '';
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0,255,65,0.03),
      transparent
    );
    animation: ${scanline} 6s linear infinite;
    pointer-events: none;
    z-index: 9998;
  }
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 52px;
  background: rgba(10,14,10,0.96);
  border-bottom: 1px solid ${T.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
  backdrop-filter: blur(8px);

  @media(max-width: 768px) { padding: 0 14px; }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${T.green};
  letter-spacing: 0.08em;
`;

const LogoBracket = styled.span`
  color: ${T.muted};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media(max-width: 640px) { display: none; }
`;

const NavLink = styled.a`
  font-size: 11px;
  color: ${T.muted};
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 2px;
  letter-spacing: 0.06em;
  transition: all 0.2s;

  &::before { content: './'; color: ${T.greenFade}; }

  &:hover {
    color: ${T.green};
    border-color: ${T.greenFade};
    background: ${T.greenGlow2};
    text-shadow: 0 0 6px ${T.green};
  }
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${T.green};
  border-radius: 50%;
  display: inline-block;
  animation: ${pulse} 2s infinite;
  margin-right: 4px;
`;

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 28px 40px;
  animation: ${fadeIn} 0.5s ease both;

  @media(max-width: 768px) { padding: 60px 16px 30px; }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const SectionCommand = styled.div`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;

  span.prompt {
    color: ${T.greenFade};
  }
  span.cmd {
    color: ${T.green};
    text-shadow: 0 0 10px ${T.green};
  }
  span.flag {
    color: ${T.cyan};
  }
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, ${T.border}, transparent);
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 28px 40px;
  position: relative;

  @media(max-width: 768px) { padding: 80px 16px 40px; }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
  max-width: 1000px;
  width: 100%;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const HeroContent = styled.div``;

const BootLine = styled.div`
  font-size: 11px;
  color: ${T.muted};
  margin-bottom: 4px;
  letter-spacing: 0.04em;

  &.ok::before {
    content: '[  OK  ] ';
    color: ${T.green};
  }
  &.info::before {
    content: '[ INFO ] ';
    color: ${T.cyan};
  }
  &.warn::before {
    content: '[ WARN ] ';
    color: ${T.amber};
  }
`;

const HeroName = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: ${T.green};
  text-shadow: 0 0 30px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.2);
  letter-spacing: -0.02em;
  margin: 20px 0 8px;
  line-height: 1.1;
  position: relative;

  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    color: ${T.cyan};
    animation: ${glitchSlide} 4s infinite linear;
    opacity: 0.4;
  }
`;

const HeroTitle = styled.div`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: ${T.amber};
  margin-bottom: 20px;
  letter-spacing: 0.12em;
  font-weight: 500;
  text-transform: uppercase;

  &::before { content: '// '; color: ${T.muted}; }
`;

const HeroTagline = styled.div`
  font-size: 13px;
  color: ${T.white};
  line-height: 1.8;
  max-width: 540px;
  background: ${T.bgPanel};
  border: 1px solid ${T.border};
  border-left: 3px solid ${T.green};
  padding: 14px 18px;
  border-radius: 0 4px 4px 0;
  margin-bottom: 28px;

  &::before {
    display: block;
    content: '$ cat bio.txt';
    color: ${T.muted};
    font-size: 11px;
    margin-bottom: 8px;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: ${T.font};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ variant }) => variant === 'primary' ? css`
    background: ${T.green};
    color: ${T.bg};
    border: 1px solid ${T.green};
    &:hover {
      background: transparent;
      color: ${T.green};
      box-shadow: 0 0 20px ${T.greenGlow};
    }
  ` : css`
    background: transparent;
    color: ${T.green};
    border: 1px solid ${T.greenFade};
    &:hover {
      border-color: ${T.green};
      background: ${T.greenGlow2};
      color: ${T.green};
      box-shadow: 0 0 12px ${T.greenGlow};
    }
  `}
`;

const AvatarFrame = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;

  @media(max-width: 768px) {
    width: 140px;
    height: 140px;
    margin: 0 auto;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border: 1px solid ${T.greenFade};
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border: 1px solid ${T.border};
    border-radius: 2px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(20%) contrast(1.1);
  border-radius: 2px;
`;

const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${T.bgPanel};
  border: 1px solid ${T.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: ${T.muted};
  border-radius: 2px;
`;

const AvatarLabel = styled.div`
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: ${T.muted};
  letter-spacing: 0.08em;
`;

const TermCard = styled.div`
  background: ${T.bgCard};
  border: 1px solid ${T.border};
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  animation: ${fadeIn} 0.4s ease both;

  &:hover {
    border-color: ${T.greenFade};
    box-shadow: 0 0 20px ${T.greenGlow2};
  }
`;

const TermCardHeader = styled.div`
  background: ${T.bgPanel};
  border-bottom: 1px solid ${T.border};
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TermDots = styled.div`
  display: flex;
  gap: 5px;
`;

const TermDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
  opacity: 0.7;
`;

const TermCardTitle = styled.div`
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.06em;
  flex: 1;
  text-align: center;
`;

const TermCardBody = styled.div`
  padding: ${({ pad }) => pad || '20px'};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const SkillCategory = styled(TermCard)``;

const SkillCategoryName = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${T.cyan};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 14px;

  &::before { content: '~/'; color: ${T.muted}; }
`;

const SkillTag = styled.span`
  display: inline-block;
  background: ${T.greenGlow2};
  border: 1px solid ${T.greenFade};
  color: ${T.green};
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 2px;
  margin: 3px 4px 3px 0;
  letter-spacing: 0.04em;
  transition: all 0.2s;

  &:hover {
    background: ${T.green};
    color: ${T.bg};
    border-color: ${T.green};
  }
`;

const ExpList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ExpCard = styled(TermCard)``;

const ExpRole = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${T.green};
  margin-bottom: 4px;
`;

const ExpMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 10px;
`;

const ExpMetaItem = styled.div`
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.04em;

  span { color: ${({ accent }) => accent || T.amber}; }
`;

const ExpDesc = styled.div`
  font-size: 12px;
  color: ${T.white};
  line-height: 1.7;
  border-left: 2px solid ${T.greenFade};
  padding-left: 12px;
  opacity: 0.85;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled(TermCard)`
  display: flex;
  flex-direction: column;
`;

const ProjectImgWrap = styled.div`
  position: relative;
  overflow: hidden;
  height: 160px;
  background: ${T.bgPanel};
  border-bottom: 1px solid ${T.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%) contrast(1.05);
    transition: transform 0.3s;
  }

  &:hover img { transform: scale(1.04); }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, ${T.bgCard} 100%);
  }
`;

const ProjectImgPlaceholder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: ${T.muted};
`;

const ProjectBody = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${T.green};
  margin-bottom: 4px;

  &::before { content: '$ '; color: ${T.muted}; }
`;

const ProjectDate = styled.div`
  font-size: 10px;
  color: ${T.muted};
  margin-bottom: 10px;
  letter-spacing: 0.06em;
`;

const ProjectDesc = styled.div`
  font-size: 12px;
  color: ${T.white};
  line-height: 1.7;
  opacity: 0.8;
  flex: 1;
  margin-bottom: 12px;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 14px;
`;

const ProjectTag = styled.span`
  font-size: 10px;
  color: ${T.cyan};
  border: 1px solid rgba(0,229,255,0.25);
  background: rgba(0,229,255,0.05);
  padding: 2px 8px;
  border-radius: 2px;
  letter-spacing: 0.04em;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ProjectLink = styled.a`
  font-size: 11px;
  color: ${T.green};
  border: 1px solid ${T.greenFade};
  padding: 4px 12px;
  border-radius: 2px;
  letter-spacing: 0.06em;
  transition: all 0.2s;

  &:hover {
    background: ${T.green};
    color: ${T.bg};
  }
`;

const MembersRow = styled.div`
  margin-top: 10px;
  font-size: 11px;
  color: ${T.muted};

  a {
    color: ${T.cyan};
    &:hover { text-shadow: 0 0 6px ${T.cyan}; }
  }
`;

const EduList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const EduCard = styled(TermCard)``;

const EduDegree = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${T.green};
  margin-bottom: 4px;
`;

const EduMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 8px;
`;

const EduMetaItem = styled.div`
  font-size: 11px;
  color: ${T.muted};
  span { color: ${({ accent }) => accent || T.amber}; }
`;

const EduDesc = styled.div`
  font-size: 12px;
  color: ${T.white};
  opacity: 0.7;
  line-height: 1.6;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
`;

const CertCard = styled.a`
  display: block;
  background: ${T.bgCard};
  border: 1px solid ${T.border};
  border-radius: 4px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    border-color: ${T.greenFade};
    box-shadow: 0 0 16px ${T.greenGlow2};
    transform: translateY(-2px);
  }
`;

const CertCheck = styled.span`
  color: ${T.green};
  font-size: 14px;
  margin-right: 8px;
`;

const CertName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${T.white};
  margin-bottom: 6px;
`;

const CertMeta = styled.div`
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.04em;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media(max-width: 640px) { grid-template-columns: 1fr; }
`;

const ContactInfo = styled.div``;

const ContactPrompt = styled.div`
  font-size: 13px;
  color: ${T.muted};
  margin-bottom: 24px;
  line-height: 1.7;

  span { color: ${T.green}; }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: ${T.white};
  padding: 10px 14px;
  background: ${T.bgCard};
  border: 1px solid ${T.border};
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.04em;

  &:hover {
    border-color: ${T.greenFade};
    color: ${T.green};
    background: ${T.greenGlow2};
    transform: translateX(4px);
  }

  .label {
    font-size: 10px;
    color: ${T.muted};
    min-width: 70px;
    letter-spacing: 0.06em;
  }

  .value { color: ${T.green}; }
`;

const SystemInfo = styled.div`
  background: ${T.bgCard};
  border: 1px solid ${T.border};
  border-radius: 4px;
  padding: 20px;
  font-size: 12px;
  line-height: 1.9;
  color: ${T.muted};

  .key   { color: ${T.cyan}; min-width: 110px; display: inline-block; }
  .val   { color: ${T.white}; }
  .green { color: ${T.green}; }
`;

const FooterEl = styled.footer`
  border-top: 1px solid ${T.border};
  padding: 24px 28px;
  text-align: center;
  font-size: 11px;
  color: ${T.muted};
  letter-spacing: 0.06em;
  max-width: 1000px;
  margin: 0 auto 0;

  span { color: ${T.greenFade}; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 9px;
  height: 1.1em;
  background: ${T.green};
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
  margin-left: 3px;
`;

const Divider = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 28px;

  hr {
    border: none;
    border-top: 1px solid ${T.border};
  }

  @media(max-width: 768px) { padding: 0 16px; }
`;

function getImg(img) {
  if (!img) return null;
  return Array.isArray(img) ? img[0] : img;
}

function TermHeader({ cmd, flag }) {
  return (
    <SectionHeader>
      <SectionCommand>
        <span className="prompt">~/portfolio </span>
        <span className="cmd">❯ {cmd} </span>
        {flag && <span className="flag">{flag}</span>}
      </SectionCommand>
      <SectionLine />
    </SectionHeader>
  );
}

export default function TerminalDev({ data = {} }) {
  const { navbar, hero, skills, experience, projects, education, certifications, contact, footer } = data;

  const navLinks = ["hero", "skills", "experience", "projects", "education", "certifications", "contact"];

  return (
    <>
      <GlobalStyle />
      <CRTWrapper>
        <NavBar>
          <NavLogo>
            <StatusDot />
            <LogoBracket>[</LogoBracket>
            {navbar?.logo || "DEV"}
            <LogoBracket>]</LogoBracket>
            &nbsp;
            <span style={{ color: T.muted }}>{navbar?.handle || "user@portfolio"}</span>
            <Cursor />
          </NavLogo>
          <NavLinks>
            {navLinks.map(id => (
              <NavLink key={id} href={`#${id}`}>{id}</NavLink>
            ))}
          </NavLinks>
        </NavBar>

        <HeroSection id="hero">
          <HeroGrid>
            <HeroContent>
              <BootLine className="ok">System boot complete</BootLine>
              <BootLine className="info">Loading portfolio daemon...</BootLine>
              <BootLine className="ok">Identity module ready</BootLine>

              <HeroName data-text={hero?.name || "Developer"}>
                {hero?.name || "Your Name"}
              </HeroName>

              <HeroTitle>{hero?.title || "Software Engineer"}</HeroTitle>

              {hero?.tagline && (
                <HeroTagline>{hero.tagline}</HeroTagline>
              )}

              <HeroActions>
                {hero?.resumeLink && (
                  <Btn href={hero.resumeLink} target="_blank" rel="noopener noreferrer" variant="primary">
                    ↓ ./resume.pdf
                  </Btn>
                )}
                {contact?.email && (
                  <Btn href="#contact">
                    ✉ ping me
                  </Btn>
                )}
              </HeroActions>
            </HeroContent>

            <AvatarFrame>
              {getImg(hero?.avatar) ? (
                <AvatarImg src={getImg(hero.avatar)} alt={hero?.name || "avatar"} />
              ) : (
                <AvatarPlaceholder>👤</AvatarPlaceholder>
              )}
              <AvatarLabel>[ VERIFIED USER ]</AvatarLabel>
            </AvatarFrame>
          </HeroGrid>
        </HeroSection>

        <Divider><hr /></Divider>

        {skills && skills.length > 0 && (
          <Section id="skills">
            <TermHeader cmd="ls" flag="-la ./skills/" />
            <SkillsGrid>
              {skills.map((group, i) => (
                <SkillCategory key={i}>
                  <TermCardHeader>
                    <TermDots>
                      <TermDot color={T.red} />
                      <TermDot color={T.amber} />
                      <TermDot color={T.green} />
                    </TermDots>
                    <TermCardTitle>{group.title || "skills"}</TermCardTitle>
                  </TermCardHeader>
                  <TermCardBody>
                    <SkillCategoryName>{group.title}</SkillCategoryName>
                    <div>
                      {(Array.isArray(group.skills) ? group.skills : []).map((sk, j) => (
                        <SkillTag key={j}>{sk}</SkillTag>
                      ))}
                    </div>
                  </TermCardBody>
                </SkillCategory>
              ))}
            </SkillsGrid>
          </Section>
        )}

        <Divider><hr /></Divider>

        {experience?.showExperience !== false && experience?.items?.length > 0 && (
          <Section id="experience">
            <TermHeader cmd="cat" flag="./experience.log" />
            <ExpList>
              {experience.items.map((job, i) => (
                <ExpCard key={i}>
                  <TermCardHeader>
                    <TermDots>
                      <TermDot color={T.red} />
                      <TermDot color={T.amber} />
                      <TermDot color={T.green} />
                    </TermDots>
                    <TermCardTitle>
                      {job.company || "Company"} — process #{String(i + 1).padStart(4, "0")}
                    </TermCardTitle>
                  </TermCardHeader>
                  <TermCardBody>
                    <ExpRole>{job.role}</ExpRole>
                    <ExpMeta>
                      {job.company && <ExpMetaItem>org: <span>{job.company}</span></ExpMetaItem>}
                      {job.period && <ExpMetaItem>period: <span style={{ color: T.cyan }}>{job.period}</span></ExpMetaItem>}
                      {job.location && <ExpMetaItem>loc: <span style={{ color: T.muted }}>{job.location}</span></ExpMetaItem>}
                    </ExpMeta>
                    {job.description && <ExpDesc>{job.description}</ExpDesc>}
                  </TermCardBody>
                </ExpCard>
              ))}
            </ExpList>
          </Section>
        )}

        <Divider><hr /></Divider>

        {projects && projects.length > 0 && (
          <Section id="projects">
            <TermHeader cmd="find" flag="./projects -type f -name '*.prod'" />
            <ProjectsGrid>
              {projects.map((proj, i) => (
                <ProjectCard key={i}>
                  <TermCardHeader>
                    <TermDots>
                      <TermDot color={T.red} />
                      <TermDot color={T.amber} />
                      <TermDot color={T.green} />
                    </TermDots>
                    <TermCardTitle>{proj.title || `project_${i}`}</TermCardTitle>
                  </TermCardHeader>

                  <ProjectImgWrap>
                    {getImg(proj.image) ? (
                      <img src={getImg(proj.image)} alt={proj.title} />
                    ) : (
                      <ProjectImgPlaceholder>▣</ProjectImgPlaceholder>
                    )}
                  </ProjectImgWrap>

                  <ProjectBody>
                    <ProjectTitle>{proj.title}</ProjectTitle>
                    {proj.date && <ProjectDate>// {proj.date}</ProjectDate>}
                    {proj.description && <ProjectDesc>{proj.description}</ProjectDesc>}

                    {proj.tags && proj.tags.length > 0 && (
                      <ProjectTags>
                        {proj.tags.map((t, j) => <ProjectTag key={j}>{t}</ProjectTag>)}
                      </ProjectTags>
                    )}

                    <ProjectLinks>
                      {proj.github && (
                        <ProjectLink href={proj.github} target="_blank" rel="noopener noreferrer">
                          ⌥ source
                        </ProjectLink>
                      )}
                      {proj.webapp && (
                        <ProjectLink href={proj.webapp} target="_blank" rel="noopener noreferrer">
                          ↗ live
                        </ProjectLink>
                      )}
                    </ProjectLinks>

                    {proj.showMembers && proj.member && proj.member.length > 0 && (
                      <MembersRow>
                        <span style={{ color: T.muted }}>// team: </span>
                        {proj.member.map((m, j) => (
                          <span key={j}>
                            {m.github ? (
                              <a href={m.github} target="_blank" rel="noopener noreferrer">{m.name}</a>
                            ) : m.name}
                            {j < proj.member.length - 1 ? ', ' : ''}
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

        <Divider><hr /></Divider>

        {education && education.length > 0 && (
          <Section id="education">
            <TermHeader cmd="tree" flag="./education/" />
            <EduList>
              {education.map((edu, i) => (
                <EduCard key={i}>
                  <TermCardHeader>
                    <TermDots>
                      <TermDot color={T.red} />
                      <TermDot color={T.amber} />
                      <TermDot color={T.green} />
                    </TermDots>
                    <TermCardTitle>{edu.institution || "institution"}</TermCardTitle>
                  </TermCardHeader>
                  <TermCardBody>
                    <EduDegree>{edu.degree}</EduDegree>
                    <EduMeta>
                      {edu.institution && <EduMetaItem>institution: <span>{edu.institution}</span></EduMetaItem>}
                      {edu.period && <EduMetaItem>period: <span style={{ color: T.cyan }}>{edu.period}</span></EduMetaItem>}
                      {edu.grade && <EduMetaItem>grade: <span style={{ color: T.green }}>{edu.grade}</span></EduMetaItem>}
                    </EduMeta>
                    {edu.description && <EduDesc>{edu.description}</EduDesc>}
                  </TermCardBody>
                </EduCard>
              ))}
            </EduList>
          </Section>
        )}

        <Divider><hr /></Divider>

        {certifications?.showCertifications !== false && certifications?.items?.length > 0 && (
          <Section id="certifications">
            <TermHeader cmd="verify" flag="--all ./certs/" />
            <CertGrid>
              {certifications.items.map((cert, i) => (
                <CertCard
                  key={i}
                  href={cert.link || undefined}
                  target={cert.link ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  as={cert.link ? "a" : "div"}
                >
                  <CertName>
                    <CertCheck>✓</CertCheck>
                    {cert.name}
                  </CertName>
                  <CertMeta>
                    {cert.issuer && <div>issuer: <span style={{ color: T.white }}>{cert.issuer}</span></div>}
                    {cert.date && <div>issued: <span style={{ color: T.cyan }}>{cert.date}</span></div>}
                  </CertMeta>
                </CertCard>
              ))}
            </CertGrid>
          </Section>
        )}

        <Divider><hr /></Divider>

        <Section id="contact">
          <TermHeader cmd="ping" flag={contact?.email || "user@host"} />
          <ContactGrid>
            <ContactInfo>
              <ContactPrompt>
                <span>$ </span>Connection established.<br />
                <span>$ </span>Ready to receive incoming packets.<br />
                <span>$ </span>Drop a message or connect via social channels below.
              </ContactPrompt>

              <ContactLinks>
                {contact?.email && (
                  <ContactLink href={`mailto:${contact.email}`}>
                    <span className="label">email</span>
                    <span className="value">{contact.email}</span>
                  </ContactLink>
                )}
                {contact?.github && (
                  <ContactLink href={contact.github} target="_blank" rel="noopener noreferrer">
                    <span className="label">github</span>
                    <span className="value">{contact.github.replace("https://", "")}</span>
                  </ContactLink>
                )}
                {contact?.linkedin && (
                  <ContactLink href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className="label">linkedin</span>
                    <span className="value">{contact.linkedin.replace("https://", "")}</span>
                  </ContactLink>
                )}
                {contact?.showTwitter !== false && contact?.twitter && (
                  <ContactLink href={contact.twitter} target="_blank" rel="noopener noreferrer">
                    <span className="label">twitter/x</span>
                    <span className="value">{contact.twitter.replace("https://", "")}</span>
                  </ContactLink>
                )}
                {contact?.showFacebook === true && contact?.facebook && (
                  <ContactLink href={contact.facebook} target="_blank" rel="noopener noreferrer">
                    <span className="label">facebook</span>
                    <span className="value">{contact.facebook.replace("https://", "")}</span>
                  </ContactLink>
                )}
                {contact?.showInstagram === true && contact?.instagram && (
                  <ContactLink href={contact.instagram} target="_blank" rel="noopener noreferrer">
                    <span className="label">instagram</span>
                    <span className="value">{contact.instagram.replace("https://", "")}</span>
                  </ContactLink>
                )}
              </ContactLinks>
            </ContactInfo>

            <SystemInfo>
              <div><span className="key">OS:</span> <span className="val">GNU/Linux 6.x</span></div>
              <div><span className="key">Shell:</span> <span className="val">zsh 5.9</span></div>
              <div><span className="key">Node:</span> <span className="val">v22.x.x LTS</span></div>
              <div><span className="key">Status:</span> <span className="green">● ONLINE</span></div>
              {contact?.location && (
                <div><span className="key">Location:</span> <span className="val">{contact.location}</span></div>
              )}
              <div><span className="key">Response:</span> <span className="green">{'< 24h'}</span></div>
              <div><span className="key">OpenToWork:</span> <span className="green">true</span></div>
              <div style={{ marginTop: 12, color: "#4a7c59", fontSize: 11 }}>
                // uptime: {UPTIME_SECONDS}s
              </div>
            </SystemInfo>
          </ContactGrid>
        </Section>

        <FooterEl>
          <span>$</span> {footer?.text || `© ${new Date().getFullYear()} — All rights reserved.`}
          <Cursor />
        </FooterEl>
      </CRTWrapper>
    </>
  );
}