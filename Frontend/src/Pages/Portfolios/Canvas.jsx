import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const T = {
  parchment:  "#FAF8F4",
  parchmentD: "#F2EEE7",
  parchmentDD:"#E8E2D8",
  stone:      "#DDD8CF",
  ink:        "#1C1917",
  inkMd:      "#44403C",
  inkLt:      "#78716C",
  inkXl:      "#A8A29E",
  terra:      "#C96A4A",
  terraLt:    "#E08060",
  terraBg:    "rgba(201,106,74,0.07)",
  terraBdr:   "rgba(201,106,74,0.2)",
  black:      "#0F0E0D",
  white:      "#FFFFFF",
  border:     "rgba(28,25,23,0.1)",
  borderMd:   "rgba(28,25,23,0.18)",
  serif:      "'Fraunces', 'Playfair Display', Georgia, serif",
  sans:       "'Epilogue', 'DM Sans', 'Trebuchet MS', sans-serif",
  mono:       "'JetBrains Mono', 'Fira Mono', monospace",
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const pulseGreen = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,400;1,9..144,600&family=Epilogue:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: ${T.parchment};
    color: ${T.ink};
    font-family: ${T.sans};
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.stone}; border-radius: 3px; }
  ::selection { background: ${T.terraBg}; color: ${T.terra}; }
  a { text-decoration: none; color: inherit; }
  img { display: block; max-width: 100%; }
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${T.parchment};
`;

const Wrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 640px) { padding: 0 20px; }
`;

const HR = styled.div`
  height: 1px;
  background: ${T.border};
  width: 100%;
`;

const Nav = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 300;
  height: 58px;
  background: rgba(250,248,244,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid ${T.border};
  display: flex;
  align-items: center;
`;

const NavWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) { padding: 0 20px; }
`;

const NavBrand = styled.div`
  font-family: ${T.serif};
  font-size: 17px;
  font-weight: 600;
  color: ${T.ink};
  letter-spacing: -0.02em;
  font-style: italic;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const NavItems = styled.nav`
  display: flex;
  gap: 2px;
  margin-right: 8px;

  @media (max-width: 580px) { display: none; }
`;

const NavItem = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${T.inkLt};
  padding: 5px 11px;
  border-radius: 5px;
  letter-spacing: 0.01em;
  transition: color 0.14s, background 0.14s;

  &:hover {
    color: ${T.ink};
    background: ${T.parchmentD};
  }
`;

const NavCTA = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: ${T.parchment};
  background: ${T.ink};
  padding: 7px 16px;
  border-radius: 5px;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 0.16s, transform 0.16s;
  white-space: nowrap;

  &:hover {
    background: ${T.terra};
    transform: translateY(-1px);
    color: ${T.parchment};
  }
`;

const HeroSection = styled.section`
  padding-top: 100px;
  padding-bottom: 80px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 88px;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const HeroContent = styled.div`
  animation: ${fadeUp} 0.55s ease both;
`;

const HeroTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.4s 0.1s ease both;
  flex-wrap: wrap;
`;

const LocationChip = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${T.inkLt};
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 4px; height: 4px;
    border-radius: 50%;
    background: ${T.stone};
    display: inline-block;
  }
`;

const AvailChip = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #15803d;
  background: rgba(21,128,61,0.07);
  border: 1px solid rgba(21,128,61,0.18);
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #16a34a;
    animation: ${pulseGreen} 2s ease-in-out infinite;
  }
`;

const HeroName = styled.h1`
  font-family: ${T.serif};
  font-size: clamp(2.8rem, 6.5vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.0;
  color: ${T.ink};
  margin-bottom: 14px;
  animation: ${fadeUp} 0.5s 0.06s ease both;
`;

const HeroTitle = styled.div`
  font-family: ${T.sans};
  font-size: 15px;
  font-weight: 500;
  color: ${T.terra};
  letter-spacing: 0.01em;
  margin-bottom: 8px;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

const HeroTagline = styled.div`
  font-family: ${T.serif};
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  font-style: italic;
  color: ${T.inkMd};
  letter-spacing: -0.01em;
  line-height: 1.5;
  margin-bottom: 20px;
  animation: ${fadeUp} 0.5s 0.13s ease both;
`;

const HeroBio = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: ${T.inkMd};
  line-height: 1.75;
  max-width: 580px;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.5s 0.16s ease both;
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.5s 0.2s ease both;
`;

const BtnSolid = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: ${T.parchment};
  background: ${T.ink};
  padding: 10px 22px;
  border-radius: 5px;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.18s;
  border: 1.5px solid ${T.ink};

  &:hover {
    background: ${T.terra};
    border-color: ${T.terra};
    transform: translateY(-1px);
    color: ${T.parchment};
  }
`;

const BtnOutline = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: ${T.inkMd};
  background: transparent;
  padding: 10px 22px;
  border-radius: 5px;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.18s;
  border: 1.5px solid ${T.borderMd};

  &:hover {
    color: ${T.ink};
    border-color: ${T.ink};
    background: ${T.parchmentD};
  }
`;

const AvatarCircle = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${T.border};
  background: ${T.parchmentD};
  flex-shrink: 0;
  animation: ${scaleIn} 0.5s 0.18s ease both;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 520px) {
    width: 72px;
    height: 72px;
    order: -1;
  }
`;

const AvatarEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${T.parchmentDD};
  font-size: 30px;
  color: ${T.inkXl};
`;

const SecWrap = styled.section`
  padding: 60px 0;

  @media (max-width: 640px) { padding: 44px 0; }
`;

const SecLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
`;

const SecLabelText = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${T.inkXl};
  white-space: nowrap;
`;

const SecLabelLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${T.border};
`;

const SkillTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 15px 0;
  border-bottom: 1px solid ${T.border};
  align-items: baseline;
  animation: ${slideIn} 0.4s ${({ idx }) => idx * 0.055}s ease both;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child  { border-bottom: none; }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const SkillCatLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${T.inkLt};
  letter-spacing: 0.01em;
  padding-top: 1px;
`;

const SkillChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SkillChip = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${T.inkMd};
  background: ${T.parchmentD};
  border: 1px solid ${T.border};
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0;
  cursor: default;
  transition: all 0.14s;

  &:hover {
    background: ${T.terraBg};
    border-color: ${T.terraBdr};
    color: ${T.terra};
  }
`;

const ExpList = styled.div``;

const ExpEntry = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${T.border};
  animation: ${fadeUp} 0.4s ${({ idx }) => idx * 0.08}s ease both;
  transition: background 0.15s;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child  { border-bottom: none; }

  &:hover { background: ${T.parchmentD}; margin: 0 -16px; padding-left: 16px; padding-right: 16px; }
`;

const ExpHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const ExpRole = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
`;

const ExpMetaRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
`;

const MetaTag = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  font-weight: 500;
  color: ${T.inkLt};
  background: ${T.parchmentDD};
  border: 1px solid ${T.border};
  padding: 2px 8px;
  border-radius: 3px;
  white-space: nowrap;
`;

const ExpCompany = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.inkLt};
  margin-bottom: 10px;
  transition: color 0.15s;

  ${ExpEntry}:hover & { color: ${T.terra}; }
`;

const ExpDesc = styled.p`
  font-size: 14px;
  color: ${T.inkMd};
  line-height: 1.72;
  font-weight: 400;
`;

const ProjectsStack = styled.div``;

const ProjCard = styled.div`
  padding: 28px 0;
  border-bottom: 1px solid ${T.border};
  animation: ${fadeUp} 0.45s ${({ idx }) => idx * 0.08}s ease both;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child  { border-bottom: none; }
`;

const ProjLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

const ProjLeft = styled.div``;

const ProjMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const ProjIndex = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.inkXl};
  letter-spacing: 0.06em;
`;

const ProjYear = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.inkXl};
`;

const ProjTitle = styled.div`
  font-family: ${T.serif};
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin-bottom: 10px;
  transition: color 0.15s;

  ${ProjCard}:hover & { color: ${T.terra}; }
`;

const ProjDesc = styled.p`
  font-size: 14px;
  color: ${T.inkMd};
  line-height: 1.72;
  margin-bottom: 14px;
  font-weight: 400;
`;

const ProjTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
`;

const ProjTag = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  font-weight: 500;
  color: ${T.inkLt};
  background: ${T.parchmentD};
  border: 1px solid ${T.border};
  padding: 2px 9px;
  border-radius: 3px;
  letter-spacing: 0;
`;

const ProjActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ProjLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 6px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  ${({ solid }) => solid ? css`
    background: ${T.ink};
    color: ${T.parchment};
    border: 1.5px solid ${T.ink};
    &:hover { background: ${T.terra}; border-color: ${T.terra}; color: ${T.parchment}; }
  ` : css`
    background: transparent;
    color: ${T.inkMd};
    border: 1.5px solid ${T.borderMd};
    &:hover { color: ${T.ink}; border-color: ${T.ink}; background: ${T.parchmentD}; }
  `}
`;

const ProjImg = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${T.border};
  background: ${T.parchmentDD};
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProjCard}:hover & img { transform: scale(1.04); }

  @media (max-width: 520px) { display: none; }
`;

const ProjImgEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: ${T.inkXl};
  background: repeating-linear-gradient(
    -45deg,
    ${T.parchmentDD},
    ${T.parchmentDD} 5px,
    ${T.parchmentD} 5px,
    ${T.parchmentD} 10px
  );
`;

const TeamLine = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: ${T.inkLt};
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;

  a { color: ${T.terra}; font-weight: 500; &:hover { text-decoration: underline; } }
`;

const EduList = styled.div``;

const EduEntry = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid ${T.border};
  animation: ${fadeUp} 0.4s ${({ idx }) => idx * 0.08}s ease both;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child  { border-bottom: none; }
`;

const EduHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const EduDeg = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
  margin-bottom: 3px;
`;

const EduInst = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.inkLt};
`;

const EduRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  @media (max-width: 480px) { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
`;

const EduPill = styled.span`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.inkLt};
  background: ${T.parchmentD};
  border: 1px solid ${T.border};
  padding: 2px 9px;
  border-radius: 3px;
  white-space: nowrap;
`;

const EduGrade = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${T.terra};
  background: ${T.terraBg};
  border: 1px solid ${T.terraBdr};
  padding: 2px 9px;
  border-radius: 3px;
  white-space: nowrap;
`;

const EduNote = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: ${T.inkLt};
  line-height: 1.65;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 10px;
`;

const CertItem = styled.div`
  background: ${T.white};
  border: 1px solid ${T.border};
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  cursor: ${({ linked }) => linked ? 'pointer' : 'default'};
  transition: all 0.16s;
  animation: ${scaleIn} 0.4s ${({ idx }) => idx * 0.055}s ease both;

  &:hover {
    border-color: ${T.borderMd};
    box-shadow: 0 3px 14px rgba(28,25,23,0.07);
    transform: translateY(-2px);
  }
`;

const CertBullet = styled.div`
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${T.terra};
  margin-top: 5px;
  flex-shrink: 0;
`;

const CertName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.ink};
  letter-spacing: -0.01em;
  line-height: 1.4;
  margin-bottom: 5px;
`;

const CertMeta = styled.div`
  font-family: ${T.mono};
  font-size: 10px;
  color: ${T.inkXl};
  line-height: 1.8;
`;

const ContactBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid ${T.border};
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const ContactLeft = styled.div`
  padding: 36px 32px;
  background: ${T.ink};
  color: ${T.parchment};

  @media (max-width: 640px) { padding: 28px 24px; }
`;

const ContactHl = styled.div`
  font-family: ${T.serif};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  font-style: italic;
  color: ${T.parchment};
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 10px;
`;

const ContactSub = styled.div`
  font-size: 13px;
  color: rgba(250,248,244,0.5);
  line-height: 1.65;
  margin-bottom: 28px;
`;

const ContactEmailBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${T.ink};
  background: ${T.parchment};
  padding: 10px 22px;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: all 0.16s;

  &:hover {
    background: ${T.terra};
    color: ${T.parchment};
    transform: translateY(-1px);
  }
`;

const ContactRight = styled.div`
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  background: ${T.parchmentD};

  @media (max-width: 640px) { padding: 24px; }
`;

const SocialRow = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  border-radius: 6px;
  color: ${T.inkMd};
  font-size: 13px;
  font-weight: 500;
  transition: all 0.14s;
  cursor: ${({ isPlain }) => isPlain ? 'default' : 'pointer'};

  &:hover {
    background: ${T.parchmentDD};
    color: ${T.ink};
  }

  .plat {
    font-family: ${T.mono};
    font-size: 10px;
    color: ${T.inkXl};
    min-width: 66px;
    letter-spacing: 0;
  }

  .val {
    flex: 1;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .arr {
    font-size: 11px;
    color: ${T.stone};
    transition: color 0.14s;
  }

  &:hover .arr { color: ${T.terra}; }
`;

const FooterBar = styled.footer`
  border-top: 1px solid ${T.border};
  padding: 22px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const FooterText = styled.div`
  font-size: 12px;
  color: ${T.inkXl};
  font-weight: 400;
`;

const FooterBrand = styled.div`
  font-family: ${T.serif};
  font-size: 14px;
  font-weight: 600;
  font-style: italic;
  color: ${T.inkLt};
  letter-spacing: -0.01em;
`;

function getImg(img) {
  if (!img) return null;
  return Array.isArray(img) ? img[0] : img;
}

function Sec({ id, label, children }) {
  return (
    <SecWrap id={id}>
      <SecLabel>
        <SecLabelText>{label}</SecLabelText>
        <SecLabelLine />
      </SecLabel>
      {children}
    </SecWrap>
  );
}

export default function Canvas({ data = {} }) {
  const { navbar, hero, skills, experience, projects, education, certifications, contact, footer } = data;

  const socials = [
    contact?.github   && { plat: "github",    val: contact.github.replace("https://github.com/",""),    href: contact.github },
    contact?.linkedin && { plat: "linkedin",   val: contact.linkedin.replace("https://linkedin.com/in/",""), href: contact.linkedin },
    contact?.showTwitter   !== false && contact?.twitter   && { plat: "twitter",   val: contact.twitter.replace("https://twitter.com/",""),  href: contact.twitter },
    contact?.showFacebook  === true  && contact?.facebook  && { plat: "facebook",  val: contact.facebook.replace("https://facebook.com/",""), href: contact.facebook },
    contact?.showInstagram === true  && contact?.instagram && { plat: "instagram", val: contact.instagram.replace("https://instagram.com/",""), href: contact.instagram },
  ].filter(Boolean);

  const navIds = [
    skills?.length > 0 && "skills",
    experience?.showExperience !== false && experience?.items?.length > 0 && "experience",
    projects?.length > 0 && "projects",
    education?.length > 0 && "education",
    "contact",
  ].filter(Boolean);

  return (
    <>
      <GlobalStyle />
      <Page>
        <Nav>
          <NavWrap>
            <NavBrand>{navbar?.name || "Portfolio"}</NavBrand>
            <NavRight>
              <NavItems>
                {navIds.map(id => (
                  <NavItem key={id} href={`#${id}`}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </NavItem>
                ))}
              </NavItems>
              <NavCTA href={contact?.email ? `mailto:${contact.email}` : "#contact"}>
                {navbar?.ctaLabel || "Get in Touch"}
              </NavCTA>
            </NavRight>
          </NavWrap>
        </Nav>

        <Wrap>
          <HeroSection id="hero">
            <HeroGrid>
              <HeroContent>
                <HeroTopRow>
                  {hero?.location && <LocationChip>{hero.location}</LocationChip>}
                  {hero?.availableForWork !== false && <AvailChip>Available</AvailChip>}
                </HeroTopRow>

                <HeroName>{hero?.name || "Your Name"}</HeroName>

                {hero?.title && <HeroTitle>{hero.title}</HeroTitle>}

                {hero?.tagline && <HeroTagline>"{hero.tagline}"</HeroTagline>}

                {hero?.bio && <HeroBio>{hero.bio}</HeroBio>}

                <HeroCTAs>
                  {hero?.resumeLink && (
                    <BtnSolid href={hero.resumeLink} target="_blank" rel="noopener noreferrer">
                      ↓ Resume
                    </BtnSolid>
                  )}
                  <BtnOutline href="#contact">
                    Say hello →
                  </BtnOutline>
                </HeroCTAs>
              </HeroContent>

              <AvatarCircle>
                {getImg(hero?.avatar)
                  ? <img src={getImg(hero.avatar)} alt={hero?.name || "avatar"} />
                  : <AvatarEmpty>👤</AvatarEmpty>
                }
              </AvatarCircle>
            </HeroGrid>
          </HeroSection>

          <HR />

          {skills?.length > 0 && (
            <Sec id="skills" label="Skills">
              <SkillTable>
                {skills.map((g, i) => (
                  <SkillRow key={i} idx={i}>
                    <SkillCatLabel>{g.title}</SkillCatLabel>
                    <SkillChips>
                      {(Array.isArray(g.skills) ? g.skills : []).map((sk, j) => (
                        <SkillChip key={j}>{sk}</SkillChip>
                      ))}
                    </SkillChips>
                  </SkillRow>
                ))}
              </SkillTable>
            </Sec>
          )}

          {experience?.showExperience !== false && experience?.items?.length > 0 && (
            <>
              <HR />
              <Sec id="experience" label="Experience">
                <ExpList>
                  {experience.items.map((job, i) => (
                    <ExpEntry key={i} idx={i}>
                      <ExpHead>
                        <ExpRole>{job.role}</ExpRole>
                        <ExpMetaRow>
                          {job.period   && <MetaTag>{job.period}</MetaTag>}
                          {job.location && <MetaTag>{job.location}</MetaTag>}
                        </ExpMetaRow>
                      </ExpHead>
                      {job.company && <ExpCompany>{job.company}</ExpCompany>}
                      {job.description && <ExpDesc>{job.description}</ExpDesc>}
                    </ExpEntry>
                  ))}
                </ExpList>
              </Sec>
            </>
          )}

          {projects?.length > 0 && (
            <>
              <HR />
              <Sec id="projects" label="Projects">
                <ProjectsStack>
                  {projects.map((proj, i) => (
                    <ProjCard key={i} idx={i}>
                      <ProjLayout>
                        <ProjLeft>
                          <ProjMeta>
                            <ProjIndex>
                              {String(i + 1).padStart(2, "0")}
                            </ProjIndex>
                            {proj.date && <ProjYear>· {proj.date}</ProjYear>}
                          </ProjMeta>

                          <ProjTitle>{proj.title}</ProjTitle>

                          {proj.description && <ProjDesc>{proj.description}</ProjDesc>}

                          {proj.tags?.length > 0 && (
                            <ProjTags>
                              {proj.tags.map((t, j) => <ProjTag key={j}>{t}</ProjTag>)}
                            </ProjTags>
                          )}

                          <ProjActions>
                            {proj.webapp && (
                              <ProjLink
                                href={proj.webapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                solid
                              >
                                ↗ Live
                              </ProjLink>
                            )}
                            {proj.github && (
                              <ProjLink
                                href={proj.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Code
                              </ProjLink>
                            )}
                          </ProjActions>

                          {proj.showMembers && proj.member?.length > 0 && (
                            <TeamLine>
                              <span>Team:</span>
                              {proj.member.map((m, j) => (
                                <span key={j}>
                                  {m.github
                                    ? <a href={m.github} target="_blank" rel="noopener noreferrer">{m.name}</a>
                                    : m.name}
                                  {j < proj.member.length - 1 ? "," : ""}
                                </span>
                              ))}
                            </TeamLine>
                          )}
                        </ProjLeft>

                        <ProjImg>
                          {getImg(proj.image)
                            ? <img src={getImg(proj.image)} alt={proj.title} />
                            : <ProjImgEmpty>◈</ProjImgEmpty>
                          }
                        </ProjImg>
                      </ProjLayout>
                    </ProjCard>
                  ))}
                </ProjectsStack>
              </Sec>
            </>
          )}

          {education?.length > 0 && (
            <>
              <HR />
              <Sec id="education" label="Education">
                <EduList>
                  {education.map((edu, i) => (
                    <EduEntry key={i} idx={i}>
                      <EduHead>
                        <div>
                          <EduDeg>{edu.degree}</EduDeg>
                          {edu.institution && <EduInst>{edu.institution}</EduInst>}
                        </div>
                        <EduRight>
                          {edu.period && <EduPill>{edu.period}</EduPill>}
                          {edu.grade  && <EduGrade>{edu.grade}</EduGrade>}
                        </EduRight>
                      </EduHead>
                      {edu.description && <EduNote>{edu.description}</EduNote>}
                    </EduEntry>
                  ))}
                </EduList>
              </Sec>
            </>
          )}

          {certifications?.showCertifications !== false && certifications?.items?.length > 0 && (
            <>
              <HR />
              <Sec id="certifications" label="Certifications">
                <CertGrid>
                  {certifications.items.map((cert, i) => (
                    <CertItem
                      key={i}
                      idx={i}
                      linked={!!cert.link}
                      as={cert.link ? "a" : "div"}
                      href={cert.link || undefined}
                      target={cert.link ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      <CertBullet />
                      <div>
                        <CertName>{cert.name}</CertName>
                        <CertMeta>
                          {cert.issuer && <div>{cert.issuer}</div>}
                          {cert.date   && <div style={{ color: T.terra }}>{cert.date}</div>}
                        </CertMeta>
                      </div>
                    </CertItem>
                  ))}
                </CertGrid>
              </Sec>
            </>
          )}

          <HR />

          <Sec id="contact" label="Contact">
            <ContactBlock>
              <ContactLeft>
                <ContactHl>
                  Let's build<br />something great.
                </ContactHl>
                <ContactSub>
                  Open to new roles, freelance projects, and interesting conversations.
                </ContactSub>
                {contact?.email && (
                  <ContactEmailBtn href={`mailto:${contact.email}`}>
                    Send a message →
                  </ContactEmailBtn>
                )}
              </ContactLeft>

              <ContactRight>
                {contact?.email && (
                  <SocialRow href={`mailto:${contact.email}`}>
                    <span className="plat">email</span>
                    <span className="val">{contact.email}</span>
                    <span className="arr">↗</span>
                  </SocialRow>
                )}
                {socials.map(({ plat, val, href }) => (
                  <SocialRow key={plat} href={href} target="_blank" rel="noopener noreferrer">
                    <span className="plat">{plat}</span>
                    <span className="val">{val}</span>
                    <span className="arr">↗</span>
                  </SocialRow>
                ))}
              </ContactRight>
            </ContactBlock>
          </Sec>

          <HR />

          <FooterBar>
            <FooterText>
              {footer?.text || `© ${new Date().getFullYear()} ${hero?.name || ""}. All rights reserved.`}
            </FooterText>
            <FooterBrand>{navbar?.name || "Portfolio"}</FooterBrand>
          </FooterBar>
        </Wrap>
      </Page>
    </>
  );
}