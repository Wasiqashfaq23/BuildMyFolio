import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { CloseRounded, GitHub, LinkedIn } from "@mui/icons-material";
import { Modal } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const darkTheme = {
  bg: "#0A0F0F",
  bgLight: "#1C1E27",
  primary: "#00FF00",
  text_primary: "#F2F3F4",
  text_secondary: "#b1b2b3",
  card: "#171721",
  card_light: "#191924",
  white: "#FFFFFF",
  black: "#000000",
  soft2: "#aaaaaa",
};

const Nav = styled.div`
  background-color: ${({ theme }) => theme.card_light};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
  position: relative;
`;
const NavLogoText = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
`;
const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  @media screen and (max-width: 768px) { display: none; }
`;
const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover { color: ${({ theme }) => theme.primary}; }
`;
const GitHubButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;
  white-space: nowrap;
  &:hover { background: ${({ theme }) => theme.primary}; color: white; }
`;
const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  @media screen and (max-width: 768px) { display: none; }
`;
const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0; right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`;
const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: absolute;
  top: 80px; right: 0;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light};
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;
const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover { color: ${({ theme }) => theme.primary}; }
`;

function Navbar({ navbar, contact, experience, certifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const showExp = experience?.showExperience;
  const showCert = certifications?.showCertifications;
  return (
    <Nav>
      <NavbarContainer>
        <NavLogoText>{navbar?.logoText || "My Portfolio"}</NavLogoText>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>☰</MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          {showExp && <NavLink href="#experience">Experience</NavLink>}
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
          {showCert && <NavLink href="#certifications">Certifications</NavLink>}
          <NavLink href="#contact">Contact</NavLink>
        </NavItems>
        <ButtonContainer>
          {navbar?.showGithubButton && (
            <GitHubButton href={contact?.github} target="_blank">
              {navbar?.githubButtonText || "Github Profile"}
            </GitHubButton>
          )}
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            {["about","skills"].map(s => (
              <MobileLink key={s} href={`#${s}`} onClick={() => setIsOpen(false)}>{s.charAt(0).toUpperCase()+s.slice(1)}</MobileLink>
            ))}
            {showExp && <MobileLink href="#experience" onClick={() => setIsOpen(false)}>Experience</MobileLink>}
            <MobileLink href="#projects" onClick={() => setIsOpen(false)}>Projects</MobileLink>
            <MobileLink href="#education" onClick={() => setIsOpen(false)}>Education</MobileLink>
            {showCert && <MobileLink href="#certifications" onClick={() => setIsOpen(false)}>Certifications</MobileLink>}
            <MobileLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileLink>
            {navbar?.showGithubButton && (
              <GitHubButton href={contact?.github} target="_blank" style={{ width: "max-content" }}>
                {navbar?.githubButtonText || "Github Profile"}
              </GitHubButton>
            )}
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
}

const HeroContainer = styled.div`
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
  @media (max-width: 960px) { padding: 66px 16px; }
`;
const HeroInner = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  @media (max-width: 960px) { flex-direction: column; }
`;
const HeroLeft = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) { order: 2; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; }
`;
const HeroRight = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  @media (max-width: 960px) { order: 1; justify-content: center; margin-bottom: 80px; }
`;
const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
  object-fit: cover;
  @media (max-width: 640px) { max-width: 280px; max-height: 280px; }
`;
const HeroTitle = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 40px; line-height: 48px; }
`;
const HeroDesc = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + "95"};
  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) { font-size: 16px; }
`;
const ResumeButton = styled.a`
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 16px 0;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(225deg, #7b00ff 0%, #00c853 100%);
  transition: all 0.2s ease-in-out;
  &:hover { transform: scale(1.05); }
  @media (max-width: 640px) { padding: 12px 0; font-size: 18px; }
`;

function Hero({ hero }) {
  return (
    <HeroContainer id="about">
      <HeroInner>
        <HeroLeft>
          <HeroTitle>Hi, I am <br />{hero?.fullName || "Your Name"}</HeroTitle>
          <HeroDesc>{hero?.description}</HeroDesc>
          {hero?.resumeLink && (
            <ResumeButton href={hero.resumeLink} target="_blank">Check Resume</ResumeButton>
          )}
        </HeroLeft>
        <HeroRight>
          {hero?.profileImage && (
            <HeroImg
              src={Array.isArray(hero.profileImage) ? hero.profileImage[0] : hero.profileImage}
              alt={hero?.fullName}
            />
          )}
        </HeroRight>
      </HeroInner>
    </HeroContainer>
  );
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 16px 60px;
`;
const SectionWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;
const SectionTitle = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) { margin-top: 12px; font-size: 32px; }
`;
const SectionDesc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) { font-size: 16px; }
`;

const SkillsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;
const SkillCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #00FF00;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 500px) { padding: 10px 20px; }
`;
const SkillCardTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  text-align: center;
`;
const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;
const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + "80"};
  border: 1px solid #00FF00;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 768px) { font-size: 14px; padding: 8px 12px; }
`;

function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;
  return (
    <SectionContainer id="skills">
      <SectionWrapper>
        <SectionTitle>Skills</SectionTitle>
        <SectionDesc>Here are the technologies and tools I work with.</SectionDesc>
        <SkillsGrid>
          {skills.map((skill, i) => (
            <SkillCard key={i}>
              <SkillCardTitle>{skill.title}</SkillCardTitle>
              <SkillList>
                {(skill.skills || []).map((item, j) => (
                  <SkillItem key={j}>{item}</SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SectionWrapper>
    </SectionContainer>
  );
}

const ExpCard = styled.div`
  width: 650px;
  border-radius: 10px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  border: 0.1px solid #00FF00;
  &:hover { box-shadow: 0px 0px 20px rgba(0,0,0,0.2); transform: translateY(-5px); }
  @media only screen and (max-width: 768px) { padding: 10px; gap: 8px; width: 300px; }
`;
const ExpTop = styled.div`width: 100%; display: flex; gap: 12px;`;
const ExpLogo = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  background-color: #000;
  border-radius: 10px;
  margin-top: 4px;
`;
const ExpBody = styled.div`width: 100%; display: flex; flex-direction: column;`;
const ExpRole = styled.div`font-size: 18px; font-weight: 600; color: ${({ theme }) => theme.text_primary + "99"};`;
const ExpCompany = styled.div`font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.text_secondary + "99"};`;
const ExpDate = styled.div`font-size: 12px; font-weight: 400; color: ${({ theme }) => theme.text_secondary + "80"};`;
const ExpDesc = styled.div`font-size: 15px; font-weight: 400; color: ${({ theme }) => theme.text_primary + "99"};`;
const ExpSkillsRow = styled.div`width: 100%; display: flex; gap: 12px; flex-wrap: wrap;`;
const ExpSkillBadge = styled.div`font-size: 13px; color: ${({ theme }) => theme.text_primary + "99"};`;
const ExpDocImg = styled.img`width: 100%; border-radius: 8px; margin-top: 8px;`;

function ExperienceCard({ exp }) {
  return (
    <ExpCard>
      <ExpTop>
        {exp.companyLogo && (
          <ExpLogo src={Array.isArray(exp.companyLogo) ? exp.companyLogo[0] : exp.companyLogo} alt={exp.company} />
        )}
        <ExpBody>
          <ExpRole>{exp.role}</ExpRole>
          <a href={exp.companyLink || "#"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <ExpCompany>{exp.company}</ExpCompany>
          </a>
          <ExpDate>{exp.date}</ExpDate>
        </ExpBody>
      </ExpTop>
      {exp.desc && <ExpDesc>{exp.desc}</ExpDesc>}
      {exp.skills && exp.skills.length > 0 && (
        <ExpSkillsRow>
          <b style={{ color: "#b1b2b3" }}>Skills:</b>
          {exp.skills.map((s, i) => <ExpSkillBadge key={i}>• {s}</ExpSkillBadge>)}
        </ExpSkillsRow>
      )}
      {exp.showDoc && exp.doc && (
        <ExpDocImg src={Array.isArray(exp.doc) ? exp.doc[0] : exp.doc} alt="document" />
      )}
    </ExpCard>
  );
}

function Experience({ experience }) {
  if (!experience?.showExperience) return null;
  const items = experience?.items || [];
  return (
    <SectionContainer id="experience">
      <SectionWrapper>
        <SectionTitle>{experience?.sectionTitle || "Work Experience"}</SectionTitle>
        {experience?.sectionDesc && <SectionDesc>{experience.sectionDesc}</SectionDesc>}
        <div style={{ width: "100%", maxWidth: 1000, marginTop: 10 }}>
          <Timeline>
            {items.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  {index !== items.length - 1 && <TimelineConnector style={{ background: "#00FF00" }} />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <ExperienceCard exp={exp} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </SectionWrapper>
    </SectionContainer>
  );
}

const ProjCard = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover { transform: translateY(-10px); box-shadow: 0 0 50px 4px rgba(0,0,0,0.6); filter: brightness(1.1); }
`;
const ProjImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.card_light};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`;
const ProjTags = styled.div`width: 100%; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 4px;`;
const ProjTag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + "15"};
  padding: 2px 8px;
  border-radius: 10px;
`;
const ProjTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const ProjDate = styled.div`font-size: 12px; font-weight: 400; color: ${({ theme }) => theme.text_secondary + "80"};`;
const ProjDesc = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + "99"};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const ProjMembers = styled.div`display: flex; align-items: center; padding-left: 10px;`;
const ProjAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;
const CardContainer = styled.div`display: flex; justify-content: center; align-items: center; gap: 28px; flex-wrap: wrap;`;

const ModalContainer = styled.div`
  width: 100%; height: 100%;
  position: absolute; top: 0; left: 0;
  background-color: #000000a7;
  display: flex; align-items: flex-start; justify-content: center;
  overflow-y: scroll;
`;
const ModalWrapper = styled.div`
  max-width: 800px; width: 100%;
  border-radius: 16px;
  margin: 50px 12px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex; flex-direction: column;
  position: relative;
`;
const ModalImage = styled.img`width: 100%; object-fit: cover; border-radius: 12px; margin-top: 30px;`;
const ModalTitle = styled.div`font-size: 28px; font-weight: 600; color: ${({ theme }) => theme.text_primary}; margin: 8px 6px 0 6px;`;
const ModalDate = styled.div`font-size: 16px; margin: 2px 6px; color: ${({ theme }) => theme.text_secondary};`;
const ModalDesc = styled.div`font-size: 16px; color: ${({ theme }) => theme.text_primary}; margin: 8px 6px;`;
const ModalTags = styled.div`display: flex; flex-wrap: wrap; margin: 8px 0;`;
const ModalTag = styled.div`
  font-size: 14px; color: ${({ theme }) => theme.primary};
  margin: 4px; padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary + "20"};
`;
const ModalButtonGroup = styled.div`display: flex; justify-content: flex-end; margin: 12px 0; gap: 12px;`;
const ModalButton = styled.a`
  width: 100%; text-align: center;
  font-size: 16px; font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px; border-radius: 8px;
  background-color: ${({ dull, theme }) => dull ? theme.bgLight : theme.primary};
  cursor: pointer; text-decoration: none;
  transition: all 0.5s ease;
`;
const MemberRow = styled.div`display: flex; align-items: center; gap: 12px;`;
const MemberImg = styled.img`width: 50px; height: 50px; object-fit: cover; border-radius: 50%;`;
const MemberName = styled.div`font-size: 16px; font-weight: 500; color: ${({ theme }) => theme.text_primary};`;

function ProjectModal({ openModal, setOpenModal }) {
  const project = openModal?.project;
  const img = Array.isArray(project?.image) ? project.image[0] : project?.image;
  return (
    <Modal open={true} onClose={() => setOpenModal({ state: false, project: null })}>
      <ModalContainer>
        <ModalWrapper>
          <CloseRounded
            style={{ position: "absolute", top: "10px", right: "20px", cursor: "pointer" }}
            onClick={() => setOpenModal({ state: false, project: null })}
          />
          {img && <ModalImage src={img} alt={project?.title} />}
          <ModalTitle>{project?.title}</ModalTitle>
          <ModalDate>{project?.date}</ModalDate>
          <ModalTags>{(project?.tags || []).map((tag, i) => <ModalTag key={i}>{tag}</ModalTag>)}</ModalTags>
          <ModalDesc>{project?.description}</ModalDesc>
          {project?.showMembers && project?.member?.length > 0 && (
            <>
              <div style={{ fontSize: 20, fontWeight: 600, margin: "8px 6px" }}>Members</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "12px 6px" }}>
                {project.member.map((m, i) => (
                  <MemberRow key={i}>
                    {m.img && <MemberImg src={Array.isArray(m.img) ? m.img[0] : m.img} alt={m.name} />}
                    <MemberName>{m.name}</MemberName>
                    {m.github && <a href={m.github} target="_blank" rel="noreferrer" style={{ color: "inherit" }}><GitHub /></a>}
                    {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" style={{ color: "inherit" }}><LinkedIn /></a>}
                  </MemberRow>
                ))}
              </div>
            </>
          )}
          <ModalButtonGroup>
            {project?.github && <ModalButton dull href={project.github} target="_blank">View Code</ModalButton>}
            {project?.webapp && <ModalButton href={project.webapp} target="_blank">View Live App</ModalButton>}
          </ModalButtonGroup>
        </ModalWrapper>
      </ModalContainer>
    </Modal>
  );
}

function Projects({ projects }) {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  if (!projects || projects.length === 0) return null;
  return (
    <SectionContainer id="projects">
      <SectionWrapper>
        <SectionTitle>Projects</SectionTitle>
        <SectionDesc>Here are some of my projects.</SectionDesc>
        <CardContainer>
          {projects.map((project, i) => {
            const img = Array.isArray(project.image) ? project.image[0] : project.image;
            return (
              <ProjCard key={i} onClick={() => setOpenModal({ state: true, project })}>
                {img && <ProjImage src={img} alt={project.title} />}
                <ProjTags>{(project.tags || []).map((tag, j) => <ProjTag key={j}>{tag}</ProjTag>)}</ProjTags>
                <div>
                  <ProjTitle>{project.title}</ProjTitle>
                  <ProjDate>{project.date}</ProjDate>
                  <ProjDesc>{project.description}</ProjDesc>
                </div>
                {project.showMembers && (
                  <ProjMembers>
                    {(project.member || []).map((m, j) => m.img && (
                      <ProjAvatar key={j} src={Array.isArray(m.img) ? m.img[0] : m.img} alt={m.name} />
                    ))}
                  </ProjMembers>
                )}
              </ProjCard>
            );
          })}
        </CardContainer>
      </SectionWrapper>
      {openModal.state && <ProjectModal openModal={openModal} setOpenModal={setOpenModal} />}
    </SectionContainer>
  );
}

const EduCard = styled.div`
  width: 650px;
  border-radius: 10px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  padding: 12px 16px;
  display: flex; flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  border: 0.1px solid #00FF00;
  &:hover { box-shadow: 0px 0px 20px rgba(0,0,0,0.2); transform: translateY(-5px); }
  @media only screen and (max-width: 768px) { padding: 10px; gap: 8px; width: 300px; }
`;
const EduTop = styled.div`width: 100%; display: flex; gap: 12px;`;
const EduLogo = styled.img`height: 50px; width: 50px; object-fit: cover; background-color: #000; border-radius: 10px; margin-top: 4px;`;
const EduBody = styled.div`width: 100%; display: flex; flex-direction: column;`;
const EduName = styled.div`font-size: 18px; font-weight: 600; color: ${({ theme }) => theme.text_primary + "99"};`;
const EduDegree = styled.div`font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.text_secondary + "99"};`;
const EduDate = styled.div`font-size: 12px; font-weight: 400; color: ${({ theme }) => theme.text_secondary + "80"};`;
const EduGrade = styled.div`font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.text_secondary + "99"};`;
const EduDesc = styled.div`font-size: 15px; font-weight: 400; color: ${({ theme }) => theme.text_primary + "99"};`;

function Education({ education }) {
  if (!education?.items || education.items.length === 0) return null;
  return (
    <SectionContainer id="education">
      <SectionWrapper>
        <SectionTitle>{education?.sectionTitle || "Education"}</SectionTitle>
        {education?.sectionDesc && <SectionDesc>{education.sectionDesc}</SectionDesc>}
        <div style={{ width: "100%", maxWidth: 1000, marginTop: 10 }}>
          <Timeline>
            {education.items.map((edu, index) => (
              <TimelineItem key={index}>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <EduCard>
                    <EduTop>
                      {edu.img && (
                        <EduLogo src={Array.isArray(edu.img) ? edu.img[0] : edu.img} alt={edu.school} />
                      )}
                      <EduBody>
                        <EduName>{edu.school}</EduName>
                        <EduDegree>{edu.degree}</EduDegree>
                        <EduDate>{edu.date}</EduDate>
                      </EduBody>
                    </EduTop>
                    {edu.showGrade && edu.grade && <EduGrade><b>Grade: </b>{edu.grade}</EduGrade>}
                    {edu.desc && <EduDesc>{edu.desc}</EduDesc>}
                  </EduCard>
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  {index !== education.items.length - 1 && <TimelineConnector style={{ background: "#00FF00" }} />}
                </TimelineSeparator>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </SectionWrapper>
    </SectionContainer>
  );
}

const CertCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #00FF00;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 20px 24px;
  display: flex; flex-direction: column; gap: 8px;
`;
const CertTitle = styled.div`font-size: 18px; font-weight: 600; color: ${({ theme }) => theme.text_primary};`;
const CertIssuer = styled.div`font-size: 14px; color: ${({ theme }) => theme.text_secondary};`;
const CertDate = styled.div`font-size: 12px; color: ${({ theme }) => theme.text_secondary + "80"};`;
const CertLink = styled.a`font-size: 13px; color: ${({ theme }) => theme.primary}; text-decoration: none; &:hover { text-decoration: underline; }`;
const CertImg = styled.img`width: 100%; border-radius: 8px; margin-top: 8px; object-fit: cover;`;
const CertGrid = styled.div`display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; margin-top: 20px;`;

function Certifications({ certifications }) {
  if (!certifications?.showCertifications) return null;
  const items = certifications?.items || [];
  if (items.length === 0) return null;
  return (
    <SectionContainer id="certifications">
      <SectionWrapper>
        <SectionTitle>Certifications</SectionTitle>
        <SectionDesc>Courses and certifications I have completed.</SectionDesc>
        <CertGrid>
          {items.map((cert, i) => (
            <CertCard key={i}>
              <CertTitle>{cert.title}</CertTitle>
              {cert.issuer && <CertIssuer>Issued by: {cert.issuer}</CertIssuer>}
              {cert.date && <CertDate>{cert.date}</CertDate>}
              {cert.credentialLink && <CertLink href={cert.credentialLink} target="_blank">View Credential →</CertLink>}
              {cert.image && (
                <CertImg src={Array.isArray(cert.image) ? cert.image[0] : cert.image} alt={cert.title} />
              )}
            </CertCard>
          ))}
        </CertGrid>
      </SectionWrapper>
    </SectionContainer>
  );
}

const ContactSection = styled.div`
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  padding: 40px 16px 80px;
`;
const ContactLinks = styled.div`display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; margin-top: 16px;`;
const ContactLink = styled.a`
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

function Contact({ contact }) {
  return (
    <ContactSection id="contact">
      <SectionTitle>Contact</SectionTitle>
      <SectionDesc>Feel free to reach out for any questions or opportunities!</SectionDesc>
      <ContactLinks>
        {contact?.email && <ContactLink href={`mailto:${contact.email}`}>{contact.email} →</ContactLink>}
        {contact?.linkedin && <ContactLink href={contact.linkedin} target="_blank">LinkedIn →</ContactLink>}
        {contact?.github && <ContactLink href={contact.github} target="_blank">GitHub →</ContactLink>}
        {contact?.showFacebook && contact?.facebook && <ContactLink href={contact.facebook} target="_blank">Facebook →</ContactLink>}
        {contact?.showTwitter && contact?.twitter && <ContactLink href={contact.twitter} target="_blank">Twitter →</ContactLink>}
        {contact?.showInstagram && contact?.instagram && <ContactLink href={contact.instagram} target="_blank">Instagram →</ContactLink>}
      </ContactLinks>
    </ContactSection>
  );
}

const FooterContainer = styled.div`width: 100%; padding: 2rem 0; display: flex; justify-content: center;`;
const FooterWrapper = styled.footer`
  width: 100%; max-width: 1200px;
  display: flex; flex-direction: column;
  gap: 14px; align-items: center; padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;
const FooterLogo = styled.h1`font-weight: 600; font-size: 20px; color: ${({ theme }) => theme.primary};`;
const FooterNav = styled.nav`
  width: 100%; max-width: 800px;
  display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;
`;
const FooterNavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none; font-size: 1.2rem;
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.primary}; }
`;
const SocialIcons = styled.div`display: flex; margin-top: 1rem;`;
const SocialIcon = styled.a`
  display: inline-block; margin: 0 1rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.primary}; }
`;
const Copyright = styled.p`margin-top: 1.5rem; font-size: 0.9rem; color: ${({ theme }) => theme.soft2}; text-align: center;`;

function Footer({ footer, contact, experience, certifications }) {
  const showExp = experience?.showExperience;
  const showCert = certifications?.showCertifications;
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterLogo>{footer?.footerName || "My Portfolio"}</FooterLogo>
        <FooterNav>
          <FooterNavLink href="#about">About</FooterNavLink>
          <FooterNavLink href="#skills">Skills</FooterNavLink>
          {showExp && <FooterNavLink href="#experience">Experience</FooterNavLink>}
          <FooterNavLink href="#projects">Projects</FooterNavLink>
          <FooterNavLink href="#education">Education</FooterNavLink>
          {showCert && <FooterNavLink href="#certifications">Certifications</FooterNavLink>}
          <FooterNavLink href="#contact">Contact</FooterNavLink>
        </FooterNav>
        <SocialIcons>
          {contact?.github && <SocialIcon href={contact.github} target="_blank"><GitHub /></SocialIcon>}
          {contact?.linkedin && <SocialIcon href={contact.linkedin} target="_blank"><LinkedInIcon /></SocialIcon>}
          {contact?.showFacebook && contact?.facebook && <SocialIcon href={contact.facebook} target="_blank"><FacebookIcon /></SocialIcon>}
          {contact?.showTwitter && contact?.twitter && <SocialIcon href={contact.twitter} target="_blank"><TwitterIcon /></SocialIcon>}
          {contact?.showInstagram && contact?.instagram && <SocialIcon href={contact.instagram} target="_blank"><InstagramIcon /></SocialIcon>}
        </SocialIcons>
        <Copyright>
          &copy; {footer?.copyrightYear || new Date().getFullYear()} {footer?.footerName || ""}. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;
const GradientWrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(0, 255, 0, 0.05) 0%, rgba(0, 255, 0, 0) 50%),
              linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.1) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

export default function NeonStack({ data = {} }) {
  const { navbar, hero, skills, experience, projects, education, certifications, contact, footer } = data;

  return (
    <ThemeProvider theme={darkTheme}>
      <Body>
        <Navbar navbar={navbar} contact={contact} experience={experience} certifications={certifications} />
        <Hero hero={hero} />
        <GradientWrapper>
          <Skills skills={skills} />
          <Experience experience={experience} />
        </GradientWrapper>
        <Projects projects={projects} />
        <GradientWrapper>
          <Education education={education} />
          <Certifications certifications={certifications} />
          <Contact contact={contact} />
        </GradientWrapper>
        <Footer footer={footer} contact={contact} experience={experience} certifications={certifications} />
      </Body>
    </ThemeProvider>
  );
}