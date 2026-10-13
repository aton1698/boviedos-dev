import type { Locale } from "@/lib/i18n";
import type { NavId } from "./index";

export interface UiStrings {
  nav: Record<NavId, string>;
  skipLink: string;
  menu: string;
  mainNav: string;
  homeLabel: string;
  getInTouch: string;
  downloadCv: string;
  currentlyAt: string;
  focus: string;
  technologies: string;
  headings: {
    skills: string;
    experience: string;
    contributions: string;
    education: string;
    research: string;
    contact: string;
    credentials: string;
    cv: string;
    blog: string;
  };
  viewFullCv: string;
  backHome: string;
  blog: {
    intro: string;
    comingSoon: string;
    emptyTitle: string;
    emptyCopy: string;
    metaDescription: string;
  };
  cvMeta: { title: string; description: string };
  contributionsIntro: string;
  contactCopy: string;
  contactLabels: { email: string; phone: string; location: string };
  linkedin: string;
  opensNewTab: string;
  caseStudy: string;
  footer: {
    tagline: string;
    navigate: string;
    connect: string;
    navLabel: string;
    backToTop: string;
    privacy: string;
    terms: string;
    legalLabel: string;
  };
  lastUpdated: string;
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
      cv: "CV",
      blog: "Blog",
    },
    skipLink: "Skip to main content",
    menu: "Menu",
    mainNav: "Main navigation",
    homeLabel: "Brandon Oviedo Sánchez, back to top",
    getInTouch: "Let’s talk",
    downloadCv: "Download CV",
    currentlyAt: "Currently at",
    focus: "Focus",
    technologies: "Technologies",
    headings: {
      skills: "Full stack. Clear strengths.",
      experience: "Product engineering, end to end.",
      education: "Education. Research. Community.",
      research: "Research & Speaking",
      contributions: "What I bring to a team.",
      contact: "Ready for the next opportunity. Let’s talk.",
      credentials: "Certifications & Courses",
      cv: "My experience, in brief.",
      blog: "Writing, professional and personal.",
    },
    viewFullCv: "View full CV",
    backHome: "Back to home",
    blog: {
      intro: "Two blogs: one about engineering and the craft, one about everything else.",
      comingSoon: "Coming soon",
      emptyTitle: "No posts yet",
      emptyCopy: "The first posts are on their way. Check back soon.",
      metaDescription: "Blog by Brandon Oviedo Sánchez.",
    },
    cvMeta: {
      title: "Curriculum Vitae | Brandon Oviedo Sánchez",
      description:
        "Full CV of Brandon Oviedo Sánchez: skills, professional experience, contributions, education and research.",
    },
    contributionsIntro: "Selected contributions from my professional experience.",
    contactCopy: "If my experience matches what you’re looking for, I’d be glad to connect.",
    contactLabels: { email: "Email", phone: "Phone", location: "Location" },
    linkedin: "LinkedIn",
    opensNewTab: "(opens in a new tab)",
    caseStudy: "Read the case study",
    footer: {
      tagline: "Building reliable digital products across the stack.",
      navigate: "Navigate",
      connect: "Connect",
      navLabel: "Footer navigation",
      backToTop: "Back to top",
      privacy: "Privacy",
      terms: "Terms",
      legalLabel: "Legal",
    },
    lastUpdated: "Last updated",
    cta: "Get in touch",
    meta: {
      title: "Brandon Oviedo Sánchez | Full Stack Software Engineer",
      description:
        "Full stack software engineer in Costa Rica, building reliable digital products with React, TypeScript, Java, Spring Boot, and AWS.",
      ogAlt: "Brandon Oviedo Sánchez, Full Stack Software Engineer",
    },
    credentialsCopy: "Always learning, with credentials you can verify.",
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
      cv: "CV",
      blog: "Blog",
    },
    skipLink: "Saltar al contenido principal",
    menu: "Menú",
    mainNav: "Navegación principal",
    homeLabel: "Brandon Oviedo Sánchez, volver al inicio",
    getInTouch: "Ponte en contacto",
    downloadCv: "Descargar CV",
    currentlyAt: "Actualmente en",
    focus: "Enfoque",
    technologies: "Tecnologías",
    headings: {
      skills: "Full stack. Fortalezas claras.",
      experience: "Ingeniería de producto, de punta a punta.",
      education: "Educación. Investigación. Comunidad.",
      research: "Investigación y ponencias",
      contributions: "Lo que aporto a un equipo.",
      contact: "Listo para la próxima oportunidad. Hablemos.",
      credentials: "Certificaciones y cursos",
      cv: "Mi experiencia, en breve.",
      blog: "Escritos, profesionales y personales.",
    },
    viewFullCv: "Ver CV completo",
    backHome: "Volver al inicio",
    blog: {
      intro: "Dos blogs: uno sobre ingeniería y el oficio, otro sobre todo lo demás.",
      comingSoon: "Próximamente",
      emptyTitle: "Aún no hay publicaciones",
      emptyCopy: "Las primeras publicaciones están en camino. Vuelve pronto.",
      metaDescription: "Blog de Brandon Oviedo Sánchez.",
    },
    cvMeta: {
      title: "Currículum | Brandon Oviedo Sánchez",
      description:
        "CV completo de Brandon Oviedo Sánchez: habilidades, experiencia profesional, contribuciones, educación e investigación.",
    },
    contributionsIntro: "Contribuciones seleccionadas de mi experiencia profesional.",
    contactCopy: "Si mi experiencia coincide con lo que buscas, con gusto conversamos.",
    contactLabels: { email: "Correo", phone: "Teléfono", location: "Ubicación" },
    linkedin: "LinkedIn",
    opensNewTab: "(se abre en una pestaña nueva)",
    caseStudy: "Ver el caso de estudio",
    footer: {
      tagline: "Construyendo productos digitales confiables de punta a punta.",
      navigate: "Navegación",
      connect: "Contacto",
      navLabel: "Navegación del pie de página",
      backToTop: "Volver arriba",
      privacy: "Privacidad",
      terms: "Términos",
      legalLabel: "Legal",
    },
    lastUpdated: "Última actualización",
    cta: "Contáctame",
    meta: {
      title: "Brandon Oviedo Sánchez | Ingeniero de Software Full Stack",
      description:
        "Ingeniero de software full stack en Costa Rica que construye productos digitales confiables con React, TypeScript, Java, Spring Boot y AWS.",
      ogAlt: "Brandon Oviedo Sánchez, Ingeniero de Software Full Stack",
    },
    credentialsCopy: "Siempre aprendiendo, con credenciales que puedes verificar.",
    credentialGroups: { certification: "Certificaciones", course: "Cursos" },
    credentialLabels: { topics: "Temas", id: "ID de credencial", verify: "Verificar credencial", expires: "Vence" },
    languageLabel: "Idioma",
    languageName: "Español",
  },
};
