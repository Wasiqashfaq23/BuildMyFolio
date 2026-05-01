import styled, { createGlobalStyle, keyframes} from "styled-components";

const T = {
  white:    "#FFFFFF",
  offWhite: "#F9F8F6",
  surface:  "#F3F2EF",
  border:   "#E8E6E1",
  borderMd: "#D4D1CB",
  ink:      "#111110",
  inkMd:    "#3D3C38",
  inkLt:    "#7A786F",
  inkXl:    "#B0ADA5",
  amber:    "#E8A020",
  amberLt:  "#F5BC56",
  amberBg:  "rgba(232,160,32,0.08)",
  amberBdr: "rgba(232,160,32,0.25)",
  font:     "'Bricolage Grotesque', 'DM Sans', 'Helvetica Neue', sans-serif",
  mono:     "'JetBrains Mono', 'Fira Mono', monospace",
  radius:   "10px",
  radiusSm: "6px",
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const slideRight = keyframes`
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: ${T.white};
    color: ${T.ink};
    font-family: ${T.font};
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.borderMd}; border-radius: 3px; }
  ::selection { background: ${T.amberBg}; color: ${T.amber}; }
  a { text-decoration: none; color: inherit; }
  img { display: block; }
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${T.white};
`;

const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 28px;

  @media (max-width: 600px) { padding: 0 18px; }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${T.border};
  margin: 0;
`;

const NavWrap = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${T.border};
  height: 56px;
  display: flex;
  align-items: center;
`;

const NavInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 28px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) { padding: 0 18px; }
`;

const NavName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${T.ink};
  letter-spacing: -0.01em;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2px;

  @media (max-width: 560px) { display: none; }
`;

const NavLink = styled.a`
  font-size: 13px;
  font-weight: 500;
  color: ${T.inkLt};
  padding: 5px 10px;
  border-radius: ${T.radiusSm};
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: ${T.ink};
    background: ${T.surface};
  }
`;

const NavCTA = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${T.white};
  background: ${T.ink};
  padding: 7px 16px;
  border-radius: ${T.radiusSm};
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;

  &:hover {
    background: ${T.amber};
    transform: translateY(-1px);
    color: ${T.white};
  }
`;

const HeroSection = styled.section`
  padding: 112px 0 80px;
  animation: ${fadeUp} 0.5s ease both;

  @media (max-width: 600px) { padding: 96px 0 60px; }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const HeroLeft = styled.div``;

const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  animation: ${fadeIn} 0.4s 0.1s ease both;
`;

const LocationBadge = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${T.inkLt};
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${T.borderMd};
    display: inline-block;
  }
`;

const AvailBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #16a34a;
  background: rgba(22,163,74,0.08);
  border: 1px solid rgba(22,163,74,0.2);
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #16a34a;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const HeroName = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: ${T.ink};
  margin-bottom: 10px;
  animation: ${fadeUp} 0.5s 0.05s ease both;
`;

const HeroTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${T.amber};
  margin-bottom: 18px;
  letter-spacing: -0.01em;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

const HeroBio = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${T.inkMd};
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.5s 0.15s ease both;
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.5s 0.2s ease both;
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: ${T.white};
  background: ${T.ink};
  padding: 10px 22px;
  border-radius: ${T.radiusSm};
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.18s;
  border: 1.5px solid transparent;

  &:hover {
    background: transparent;
    border-color: ${T.ink};
    color: ${T.ink};
    transform: translateY(-2px);
  }
`;

const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: ${T.inkMd};
  background: transparent;
  padding: 10px 22px;
  border-radius: ${T.radiusSm};
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.18s;
  border: 1.5px solid ${T.border};

  &:hover {
    border-color: ${T.borderMd};
    color: ${T.ink};
    background: ${T.surface};
  }
`;

const AvatarWrap = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2.5px solid ${T.border};
  flex-shrink: 0;
  animation: ${scaleIn} 0.5s 0.15s ease both;
  background: ${T.surface};

  @media (max-width: 560px) {
    width: 72px;
    height: 72px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  background: ${T.surface};
  color: ${T.inkXl};
`;

const SectionWrap = styled.section`
  padding: 64px 0;
  animation: ${fadeUp} 0.5s ease both;

  @media (max-width: 600px) { padding: 48px 0; }
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.inkXl};
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${T.border};
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid ${T.border};
  align-items: baseline;
  animation: ${slideRight} 0.4s ${({ i }) => i * 0.06}s ease both;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child { border-bottom: none; }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const SkillCat = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.inkLt};
  letter-spacing: -0.01em;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SkillTag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${T.inkMd};
  background: ${T.surface};
  border: 1px solid ${T.border};
  padding: 4px 11px;
  border-radius: 20px;
  letter-spacing: -0.01em;
  transition: all 0.15s;
  cursor: default;

  &:hover {
    background: ${T.amberBg};
    border-color: ${T.amberBdr};
    color: ${T.amber};
  }
`;

const ExpList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ExpItem = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid ${T.border};
  animation: ${fadeUp} 0.4s ${({ i }) => i * 0.08}s ease both;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child { border-bottom: none; }

  &:hover .exp-company {
    color: ${T.amber};
  }
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 6px;
`;

const ExpRole = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
`;

const ExpMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const ExpPill = styled.span`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.inkLt};
  background: ${T.surface};
  border: 1px solid ${T.border};
  padding: 2px 9px;
  border-radius: 4px;
  letter-spacing: 0;
  white-space: nowrap;
`;

const ExpCompany = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.inkLt};
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  transition: color 0.2s;
`;

const ExpDesc = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${T.inkMd};
  line-height: 1.7;
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ProjectItem = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${T.border};
  animation: ${fadeUp} 0.4s ${({ i }) => i * 0.08}s ease both;
  cursor: default;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child { border-bottom: none; }
`;

const ProjectTop = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 12px;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const ProjectTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const ProjectTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
`;

const ProjectYear = styled.span`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.inkXl};
  letter-spacing: 0;
`;

const ProjectDesc = styled.p`
  font-size: 14px;
  color: ${T.inkMd};
  line-height: 1.7;
  margin-bottom: 14px;
`;

const ProjectChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
`;

const ProjectChip = styled.span`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.inkLt};
  background: ${T.surface};
  border: 1px solid ${T.border};
  padding: 3px 9px;
  border-radius: 4px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ProjectLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: ${T.inkMd};
  border: 1.5px solid ${T.border};
  padding: 5px 14px;
  border-radius: ${T.radiusSm};
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  letter-spacing: -0.01em;

  &:hover {
    border-color: ${T.ink};
    color: ${T.ink};
    background: ${T.surface};
  }

  &.primary {
    background: ${T.ink};
    color: ${T.white};
    border-color: ${T.ink};

    &:hover {
      background: ${T.amber};
      border-color: ${T.amber};
      color: ${T.white};
    }
  }
`;

const ProjectImg = styled.div`
  width: 110px;
  height: 72px;
  border-radius: ${T.radiusSm};
  overflow: hidden;
  border: 1px solid ${T.border};
  background: ${T.surface};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img { transform: scale(1.05); }

  @media (max-width: 560px) { display: none; }
`;

const ProjectImgPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: ${T.inkXl};
  background: repeating-linear-gradient(
    45deg,
    ${T.surface},
    ${T.surface} 5px,
    ${T.white} 5px,
    ${T.white} 10px
  );
`;

const TeamRow = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: ${T.inkLt};
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;

  a {
    color: ${T.amber};
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`;

const EduList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const EduItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${T.border};
  animation: ${fadeUp} 0.4s ${({ i }) => i * 0.08}s ease both;

  &:first-child { border-top: 1px solid ${T.border}; }
  &:last-child { border-bottom: none; }
`;

const EduHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
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
  margin-bottom: 8px;
`;

const EduRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  @media (max-width: 480px) { align-items: flex-start; }
`;

const EduPill = styled.span`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.inkLt};
  background: ${T.surface};
  border: 1px solid ${T.border};
  padding: 2px 9px;
  border-radius: 4px;
  white-space: nowrap;
`;

const EduGrade = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${T.amber};
  background: ${T.amberBg};
  border: 1px solid ${T.amberBdr};
  padding: 2px 9px;
  border-radius: 4px;
  white-space: nowrap;
`;

const EduDesc = styled.p`
  font-size: 13px;
  color: ${T.inkLt};
  line-height: 1.65;
  margin-top: 8px;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const CertCard = styled.div`
  background: ${T.white};
  border: 1px solid ${T.border};
  border-radius: ${T.radius};
  padding: 16px 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  transition: all 0.18s;
  animation: ${scaleIn} 0.4s ${({ i }) => i * 0.06}s ease both;
  cursor: ${({ linked }) => linked ? 'pointer' : 'default'};

  &:hover {
    border-color: ${T.borderMd};
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    transform: translateY(-2px);
  }
`;

const CertDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${T.amber};
  margin-top: 5px;
  flex-shrink: 0;
`;

const CertName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${T.ink};
  margin-bottom: 4px;
  line-height: 1.4;
  letter-spacing: -0.01em;
`;

const CertMeta = styled.div`
  font-family: ${T.mono};
  font-size: 11px;
  color: ${T.inkXl};
  line-height: 1.8;
`;

const ContactWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid ${T.border};
  border-radius: ${T.radius};
  overflow: hidden;

  @media (max-width: 580px) { grid-template-columns: 1fr; }
`;

const ContactLeft = styled.div`
  padding: 32px;
  border-right: 1px solid ${T.border};
  background: ${T.offWhite};

  @media (max-width: 580px) { border-right: none; border-bottom: 1px solid ${T.border}; }
`;

const ContactHeadline = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${T.ink};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 8px;
`;

const ContactSub = styled.div`
  font-size: 14px;
  color: ${T.inkLt};
  line-height: 1.65;
  margin-bottom: 24px;
`;

const ContactEmailBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${T.white};
  background: ${T.ink};
  padding: 11px 22px;
  border-radius: ${T.radiusSm};
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.18s;

  &:hover {
    background: ${T.amber};
    transform: translateY(-1px);
    color: ${T.white};
  }
`;

const ContactRight = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactLinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: ${T.radiusSm};
  font-size: 14px;
  font-weight: 500;
  color: ${T.inkMd};
  transition: all 0.15s;
  cursor: ${({ isDiv }) => isDiv ? 'default' : 'pointer'};

  &:hover {
    background: ${T.surface};
    color: ${T.ink};
  }

  .platform {
    font-size: 11px;
    font-family: ${T.mono};
    color: ${T.inkXl};
    min-width: 64px;
    letter-spacing: 0;
  }

  .val {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
  }

  .arrow {
    font-size: 12px;
    color: ${T.inkXl};
    transition: color 0.15s;
  }

  &:hover .arrow { color: ${T.amber}; }
`;

const FooterWrap = styled.footer`
  border-top: 1px solid ${T.border};
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const FooterText = styled.div`
  font-size: 13px;
  color: ${T.inkXl};
`;

const FooterBrand = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${T.inkLt};
  letter-spacing: -0.01em;
`;

function getImg(img) {
  if (!img) return null;
  return Array.isArray(img) ? img[0] : img;
}

export default function Folio({ data = {} }) {
  const {
    navbar, hero, skills, experience,
    projects, education, certifications, contact, footer,
  } = data;

  const navSections = [
    skills?.length > 0 && "skills",
    experience?.showExperience !== false && experience?.items?.length > 0 && "experience",
    projects?.length > 0 && "projects",
    education?.length > 0 && "education",
    "contact",
  ].filter(Boolean);

  const socialLinks = [
    contact?.github    && { label: "GitHub",    val: contact.github.replace("https://github.com/", ""),    href: contact.github },
    contact?.linkedin  && { label: "LinkedIn",  val: contact.linkedin.replace("https://linkedin.com/in/", ""), href: contact.linkedin },
    contact?.showTwitter  !== false && contact?.twitter  && { label: "Twitter",  val: contact.twitter.replace("https://twitter.com/", ""),  href: contact.twitter },
    contact?.showFacebook === true  && contact?.facebook && { label: "Facebook", val: contact.facebook.replace("https://facebook.com/", ""), href: contact.facebook },
    contact?.showInstagram === true && contact?.instagram && { label: "Instagram", val: contact.instagram.replace("https://instagram.com/", ""), href: contact.instagram },
  ].filter(Boolean);

  return (
    <>
      <GlobalStyle />
      <Page>
        <NavWrap>
          <NavInner>
            <NavName>{navbar?.name || "Portfolio"}</NavName>
            <NavRight>
              <NavLinks>
                {navSections.map(s => (
                  <NavLink key={s} href={`#${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</NavLink>
                ))}
              </NavLinks>
              <NavCTA href={contact?.email ? `mailto:${contact.email}` : "#contact"}>
                {navbar?.ctaLabel || "Get in Touch"}
              </NavCTA>
            </NavRight>
          </NavInner>
        </NavWrap>

        <Container>
          <HeroSection id="hero">
            <HeroGrid>
              <HeroLeft>
                <HeroMeta>
                  {hero?.location && <LocationBadge>{hero.location}</LocationBadge>}
                  {hero?.availableForWork !== false && <AvailBadge>Available for Work</AvailBadge>}
                </HeroMeta>

                <HeroName>{hero?.name || "Your Name"}</HeroName>
                {hero?.title && <HeroTitle>{hero.title}</HeroTitle>}
                {hero?.bio && <HeroBio>{hero.bio}</HeroBio>}

                <HeroCTAs>
                  {hero?.resumeLink && (
                    <BtnPrimary href={hero.resumeLink} target="_blank" rel="noopener noreferrer">
                      ↓ Resume
                    </BtnPrimary>
                  )}
                  <BtnSecondary href="#contact">
                    Contact me →
                  </BtnSecondary>
                </HeroCTAs>
              </HeroLeft>

              <AvatarWrap>
                {getImg(hero?.avatar)
                  ? <img src={getImg(hero.avatar)} alt={hero?.name || "avatar"} />
                  : <AvatarPlaceholder>👤</AvatarPlaceholder>
                }
              </AvatarWrap>
            </HeroGrid>
          </HeroSection>

          <Divider />
          {skills && skills.length > 0 && (
            <SectionWrap id="skills">
              <SectionLabel>Skills</SectionLabel>
              <SkillsGrid>
                {skills.map((group, i) => (
                  <SkillRow key={i} i={i}>
                    <SkillCat>{group.title}</SkillCat>
                    <SkillTags>
                      {(Array.isArray(group.skills) ? group.skills : []).map((sk, j) => (
                        <SkillTag key={j}>{sk}</SkillTag>
                      ))}
                    </SkillTags>
                  </SkillRow>
                ))}
              </SkillsGrid>
            </SectionWrap>
          )}

          {experience?.showExperience !== false && experience?.items?.length > 0 && <Divider />}
          {experience?.showExperience !== false && experience?.items?.length > 0 && (
            <SectionWrap id="experience">
              <SectionLabel>Experience</SectionLabel>
              <ExpList>
                {experience.items.map((job, i) => (
                  <ExpItem key={i} i={i}>
                    <ExpHeader>
                      <div>
                        <ExpRole>{job.role}</ExpRole>
                        {job.company && (
                          <ExpCompany className="exp-company">{job.company}</ExpCompany>
                        )}
                      </div>
                      <ExpMeta>
                        {job.period && <ExpPill>{job.period}</ExpPill>}
                        {job.location && <ExpPill>{job.location}</ExpPill>}
                      </ExpMeta>
                    </ExpHeader>
                    {job.description && <ExpDesc>{job.description}</ExpDesc>}
                  </ExpItem>
                ))}
              </ExpList>
            </SectionWrap>
          )}

          {projects?.length > 0 && <Divider />}
          {projects && projects.length > 0 && (
            <SectionWrap id="projects">
              <SectionLabel>Projects</SectionLabel>
              <ProjectsList>
                {projects.map((proj, i) => (
                  <ProjectItem key={i} i={i}>
                    <ProjectTop>
                      <div>
                        <ProjectTitleRow>
                          <ProjectTitle>{proj.title}</ProjectTitle>
                          {proj.date && <ProjectYear>{proj.date}</ProjectYear>}
                        </ProjectTitleRow>
                        {proj.description && <ProjectDesc>{proj.description}</ProjectDesc>}

                        {proj.tags?.length > 0 && (
                          <ProjectChips>
                            {proj.tags.map((t, j) => <ProjectChip key={j}>{t}</ProjectChip>)}
                          </ProjectChips>
                        )}

                        <ProjectLinks>
                          {proj.webapp && (
                            <ProjectLink className="primary" href={proj.webapp} target="_blank" rel="noopener noreferrer">
                              ↗ Live Demo
                            </ProjectLink>
                          )}
                          {proj.github && (
                            <ProjectLink href={proj.github} target="_blank" rel="noopener noreferrer">
                              ⌥ Source Code
                            </ProjectLink>
                          )}
                        </ProjectLinks>

                        {proj.showMembers && proj.member?.length > 0 && (
                          <TeamRow>
                            <span>Team:</span>
                            {proj.member.map((m, j) => (
                              <span key={j}>
                                {m.github
                                  ? <a href={m.github} target="_blank" rel="noopener noreferrer">{m.name}</a>
                                  : m.name}
                                {j < proj.member.length - 1 ? "," : ""}
                              </span>
                            ))}
                          </TeamRow>
                        )}
                      </div>

                      <ProjectImg>
                        {getImg(proj.image)
                          ? <img src={getImg(proj.image)} alt={proj.title} />
                          : <ProjectImgPlaceholder>◈</ProjectImgPlaceholder>
                        }
                      </ProjectImg>
                    </ProjectTop>
                  </ProjectItem>
                ))}
              </ProjectsList>
            </SectionWrap>
          )}

          {education?.length > 0 && <Divider />}
          {education && education.length > 0 && (
            <SectionWrap id="education">
              <SectionLabel>Education</SectionLabel>
              <EduList>
                {education.map((edu, i) => (
                  <EduItem key={i} i={i}>
                    <EduHeader>
                      <div>
                        <EduDeg>{edu.degree}</EduDeg>
                        {edu.institution && <EduInst>{edu.institution}</EduInst>}
                      </div>
                      <EduRight>
                        {edu.period && <EduPill>{edu.period}</EduPill>}
                        {edu.grade && <EduGrade>{edu.grade}</EduGrade>}
                      </EduRight>
                    </EduHeader>
                    {edu.description && <EduDesc>{edu.description}</EduDesc>}
                  </EduItem>
                ))}
              </EduList>
            </SectionWrap>
          )}
          {certifications?.showCertifications !== false && certifications?.items?.length > 0 && (
            <>
              <Divider />
              <SectionWrap id="certifications">
                <SectionLabel>Certifications</SectionLabel>
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
                      <CertDot />
                      <div>
                        <CertName>{cert.name}</CertName>
                        <CertMeta>
                          {cert.issuer && <div>{cert.issuer}</div>}
                          {cert.date && <div style={{ color: T.amber }}>{cert.date}</div>}
                        </CertMeta>
                      </div>
                    </CertCard>
                  ))}
                </CertGrid>
              </SectionWrap>
            </>
          )}

          <Divider />
          <SectionWrap id="contact">
            <SectionLabel>Contact</SectionLabel>
            <ContactWrap>
              <ContactLeft>
                <ContactHeadline>Let's work<br />together.</ContactHeadline>
                <ContactSub>
                  Have a project in mind or just want to say hello? My inbox is always open.
                </ContactSub>
                {contact?.email && (
                  <ContactEmailBtn href={`mailto:${contact.email}`}>
                    Send an Email →
                  </ContactEmailBtn>
                )}
              </ContactLeft>

              <ContactRight>
                {contact?.email && (
                  <ContactLinkItem href={`mailto:${contact.email}`}>
                    <span className="platform">email</span>
                    <span className="val">{contact.email}</span>
                    <span className="arrow">↗</span>
                  </ContactLinkItem>
                )}
                {socialLinks.map(({ label, val, href }) => (
                  <ContactLinkItem key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <span className="platform">{label.toLowerCase()}</span>
                    <span className="val">{val}</span>
                    <span className="arrow">↗</span>
                  </ContactLinkItem>
                ))}
              </ContactRight>
            </ContactWrap>
          </SectionWrap>

        </Container>
        <Divider />
        <Container>
          <FooterWrap>
            <FooterText>
              {footer?.text || `© ${new Date().getFullYear()} ${hero?.name || ""}. All rights reserved.`}
            </FooterText>
            <FooterBrand>{navbar?.name || "Portfolio"}</FooterBrand>
          </FooterWrap>
        </Container>

      </Page>
    </>
  );
}