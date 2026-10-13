import type { Locale } from "@/lib/i18n";
import type { SectionId } from "./index";

export interface UiStrings {
  nav: Record<SectionId, string>;
  skipLink: string;
  menu: string;
  mainNav: string;
  homeLabel: string;
  getInTouch: string;
  downloadCv: string;
  currentlyAt: string;
  focus: string;
  headings: {
    skills: string;
    experience: string;
    contributions: string;
    education: string;
    research: string;
    contact: string;
    credentials: string;
  };
  contributionsIntro: string;
  contactCopy: string;
  contactLabels: { email: string; phone: string; location: string };
  linkedin: string;
  opensNewTab: string;
  caseStudy: string;
  cta: string;
  meta: { title: string; description: string; ogAlt: string };
  credentialsCopy: string;
  credentialGroups: { certification: string; course: string };
  credentialLabels: { topics: string; id: string; verify: string; expires: string };
  languageLabel: string; // accessible name of the language selector
  languageName: string; // name of this locale, used by the switcher
}

// Spanish copy is a draft translation pending owner review.
export const ui: Record<Locale, UiStrings> = {
  en: {
    nav: {
      profile: "Profile",
      skills: "Skills",
      experience: "Experience",
      contributions: "Contributions",
      education: "Education",
      credentials: "Certifications & Courses",
      contact: "Contact",
    },
    skipLink: "Skip to main content",
    menu: "Menu",
    mainNav: "Main navigation",
    homeLabel: "Brandon Oviedo Sánchez, back to top",
    getInTouch: "Let’s talk",
    downloadCv: "Download CV",
    currentlyAt: "Currently at",
    focus: "Focus",
    headings: {
      skills: "Full stack. Clear strengths.",
      experience: "Product engineering. Consulting experience.",
      education: "Education. Research. Community.",
      research: "Research & Speaking",
      contributions: "What I bring to a team.",
      contact: "Excited for the next opportunity. Let’s talk.",
      credentials: "Certifications & Courses",
    },
    contributionsIntro: "Selected contributions from my professional experience.",
    contactCopy: "If my experience matches what you’re looking for, I’d be glad to connect.",
    contactLabels: { email: "Email", phone: "Phone", location: "Location" },
    linkedin: "LinkedIn",
    opensNewTab: "(opens in a new tab)",
    caseStudy: "Read the case study",
    cta: "Get in touch",
    meta: {
      title: "Brandon Oviedo Sánchez | Full Stack Software Engineer",
      description:
        "Full stack software engineer based in Costa Rica, building reliable digital products with React, TypeScript, Java, Spring Boot, and AWS.",
      ogAlt: "Brandon Oviedo Sánchez, Full Stack Software Engineer",
    },
    credentialsCopy: "Continuous learning, backed by verifiable credentials.",
    credentialGroups: { certification: "Certifications", course: "Courses" },
    credentialLabels: { topics: "Topics", id: "Credential ID", verify: "Verify credential", expires: "Expires" },
    languageLabel: "Language",
    languageName: "English",
  },
  es: {
    nav: {
      profile: "Perfil",
      skills: "Habilidades",
      experience: "Experiencia",
      contributions: "Contribuciones",
      education: "Educación",
      credentials: "Certificaciones y cursos",
      contact: "Contacto",
    },
    skipLink: "Saltar al contenido principal",
    menu: "Menú",
    mainNav: "Navegación principal",
    homeLabel: "Brandon Oviedo Sánchez, volver al inicio",
    getInTouch: "Ponte en contacto",
    downloadCv: "Descargar CV",
    currentlyAt: "Actualmente en",
    focus: "Enfoque",
    headings: {
      skills: "Full stack. Fortalezas claras.",
      experience: "Ingeniería de producto. Experiencia en consultoría.",
      education: "Educación. Investigación. Comunidad.",
      research: "Investigación y ponencias",
      contributions: "Lo que aporto a un equipo.",
      contact: "Entusiasmo por la próxima oportunidad. Hablemos.",
      credentials: "Certificaciones y cursos",
    },
    contributionsIntro: "Contribuciones seleccionadas de mi experiencia profesional.",
    contactCopy: "Si mi experiencia coincide con lo que buscas, con gusto conversamos.",
    contactLabels: { email: "Correo", phone: "Teléfono", location: "Ubicación" },
    linkedin: "LinkedIn",
    opensNewTab: "(se abre en una pestaña nueva)",
    caseStudy: "Ver el caso de estudio",
    cta: "Contáctame",
    meta: {
      title: "Brandon Oviedo Sánchez | Ingeniero de Software Full Stack",
      description:
        "Ingeniero de software full stack con sede en Costa Rica, que construye productos digitales confiables con React, TypeScript, Java, Spring Boot y AWS.",
      ogAlt: "Brandon Oviedo Sánchez, Ingeniero de Software Full Stack",
    },
    credentialsCopy: "Aprendizaje continuo, respaldado por credenciales verificables.",
    credentialGroups: { certification: "Certificaciones", course: "Cursos" },
    credentialLabels: { topics: "Temas", id: "ID de credencial", verify: "Verificar credencial", expires: "Vence" },
    languageLabel: "Idioma",
    languageName: "Español",
  },
};
