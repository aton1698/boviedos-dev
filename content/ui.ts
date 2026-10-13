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
  };
  contributionsIntro: string;
  contactCopy: string;
  contactLabels: { email: string; phone: string; location: string };
  linkedin: string;
  opensNewTab: string;
  caseStudy: string;
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
    getInTouch: "Get in touch",
    downloadCv: "Download CV",
    currentlyAt: "Currently at",
    focus: "Focus",
    headings: {
      skills: "Full stack. Clear strengths.",
      experience: "Product engineering. Consulting experience.",
      education: "Education. Research. Community.",
      research: "Research & Speaking",
      contributions: "What I bring to a team.",
      contact: "Let’s talk about your next team.",
    },
    contributionsIntro: "Selected contributions from my professional experience.",
    contactCopy: "If my experience matches what you’re looking for, I’d be glad to connect.",
    contactLabels: { email: "Email", phone: "Phone", location: "Location" },
    linkedin: "LinkedIn",
    opensNewTab: "(opens in a new tab)",
    caseStudy: "Read the case study",
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
    getInTouch: "Contáctame",
    downloadCv: "Descargar CV",
    currentlyAt: "Actualmente en",
    focus: "Enfoque",
    headings: {
      skills: "Full stack. Fortalezas claras.",
      experience: "Ingeniería de producto. Experiencia en consultoría.",
      education: "Educación. Investigación. Comunidad.",
      research: "Investigación y ponencias",
      contributions: "Lo que aporto a un equipo.",
      contact: "Hablemos de tu próximo equipo.",
    },
    contributionsIntro: "Contribuciones seleccionadas de mi experiencia profesional.",
    contactCopy: "Si mi experiencia coincide con lo que buscas, con gusto conversamos.",
    contactLabels: { email: "Correo", phone: "Teléfono", location: "Ubicación" },
    linkedin: "LinkedIn",
    opensNewTab: "(se abre en una pestaña nueva)",
    caseStudy: "Ver el caso de estudio",
    languageLabel: "Idioma",
    languageName: "Español",
  },
};
