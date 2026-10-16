import type { Locale } from "@/lib/i18n";
import type { NavId } from "./index";

export interface UiStrings {
  nav: Record<NavId, string>;
  skipLink: string;
  menu: string;
  mainNav: string;
  homeLabel: string;
  getInTouch: string;
  focus: string;
  technologies: string;
  headings: {
    skills: string;
    capabilities: string;
    education: string;
    research: string;
    contact: string;
    credentials: string;
    blog: string;
  };
  viewFullCv: string;
  backHome: string;
  backToBlog: string;
  blog: {
    intro: string;
    comingSoon: string;
    emptyTitle: string;
    emptyCopy: string;
    search: { label: string; placeholder: string; clear: string; noResults: string; resultOne: string; resultMany: string };
  };
  cvMeta: { title: string; description: string };
  cvForm: {
    title: string;
    open: string;
    intro: string;
    stepLabel: string;
    steps: { contact: string; verify: string };
    name: { label: string; placeholder: string };
    company: { label: string; placeholder: string; error: string };
    email: { label: string; placeholder: string; error: string };
    comments: { label: string; placeholder: string; counter: string };
    verify: { label: string; hint: string; loading: string };
    back: string;
    next: string;
    download: string;
    sending: string;
    errors: { human: string; generic: string; unavailable: string };
    success: { title: string; body: string };
    privacy: string;
  };
  capabilitiesNav: { label: string; previous: string; next: string; position: string };
  capabilitiesIntro: string;
  pointsLabel: string;
  contactCopy: string;
  contactLabels: { email: string; location: string };
  linkedin: string;
  opensNewTab: string;
  caseStudy: string;
  footer: {
    home: string;
    navigate: string;
    connect: string;
    navLabel: string;
    backToTop: string;
    privacy: string;
    terms: string;
    legalLabel: string;
    theme: { label: string; dark: string; light: string; system: string };
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
      capabilities: "Capabilities",
      skills: "Skills",
      education: "Education",
      credentials: "Certifications & Courses",
      contact: "Contact",
      blog: "Blog",
    },
    skipLink: "Skip to main content",
    menu: "Menu",
    mainNav: "Main navigation",
    homeLabel: "Brandon Oviedo Sánchez, back to top",
    getInTouch: "Let’s talk",
    focus: "Focus",
    technologies: "Technologies",
    headings: {
      skills: "Full stack. Clear strengths.",
      capabilities: "What I do. How I do it.",
      education: "Education. Research. Community.",
      research: "Research & Speaking",
      contact: "Ready for the next opportunity. Let’s talk.",
      credentials: "Certifications & Courses",
      blog: "Two blogs. One voice.",
    },
    viewFullCv: "See all capabilities",
    backHome: "Back to home",
    backToBlog: "Back to the blog",
    blog: {
      intro: "Two blogs: one about engineering and the craft, one about everything else.",
      comingSoon: "Coming soon",
      emptyTitle: "No posts yet",
      emptyCopy: "The first posts are on their way. Check back soon.",
      search: {
        label: "Search posts",
        placeholder: "Search by title or topic",
        clear: "Clear search",
        noResults: "No posts match your search.",
        resultOne: "post",
        resultMany: "posts",
      },
    },
    cvMeta: {
      title: "Capabilities | Brandon Oviedo Sánchez",
      description:
        "What Brandon Oviedo Sánchez does: frontend, backend and APIs, architecture, cloud, quality, troubleshooting, AI-driven engineering and mentoring.",
    },
    cvForm: {
      title: "Download my CV",
      open: "Download my CV",
      intro: "I’d love to share my CV with you. Tell me a bit about who you are and how to reach you.",
      stepLabel: "Step",
      steps: { contact: "Your details", verify: "Verification" },
      name: { label: "Your name (optional)", placeholder: "Your name" },
      company: { label: "Company that is hiring", placeholder: "Company name", error: "Enter the company name (at least 2 characters)." },
      email: { label: "Email to reach you", placeholder: "name@company.com", error: "Enter a valid email address." },
      comments: { label: "Comments (optional)", placeholder: "Anything you would like me to know", counter: "characters left" },
      verify: {
        label: "Almost there: confirm you are human.",
        hint: "The download button appears once the check passes.",
        loading: "Loading the check…",
      },
      back: "Back",
      next: "Continue",
      download: "Download CV",
      sending: "Preparing your CV…",
      errors: {
        human: "The human check did not pass. Please try again.",
        generic: "Something went wrong. Please try again in a moment.",
        unavailable: "The CV download is not available right now. Please email me instead.",
      },
      success: { title: "Your CV is downloading", body: "Thank you. I will get back to you at the email you shared if it fits." },
      privacy: "These details are sent to me by email, and I only use them to reply to you.",
    },
    capabilitiesNav: { label: "Capabilities", previous: "Previous capability", next: "Next capability", position: "of" },
    capabilitiesIntro: "The work, grouped by what it makes possible.",
    pointsLabel: "What it covers",
    contactCopy: "If my experience matches what you’re looking for, I’d be glad to connect.",
    contactLabels: { email: "Email", location: "Location" },
    linkedin: "LinkedIn",
    opensNewTab: "(opens in a new tab)",
    caseStudy: "Read the case study",
    footer: {
      home: "Home",
      navigate: "Explore",
      connect: "Connect",
      navLabel: "Footer navigation",
      backToTop: "Back to top",
      privacy: "Privacy",
      terms: "Terms",
      legalLabel: "Legal",
      theme: { label: "Theme", dark: "Dark", light: "Light", system: "Auto" },
    },
    lastUpdated: "Last updated",
    cta: "Get in touch",
    meta: {
      title: "Brandon Oviedo Sánchez | Full Stack Software Engineer",
      description:
        "Full stack software engineer in Costa Rica, building reliable digital products with React, TypeScript, Java, Spring Boot, and AWS, and AI-driven engineering workflows with Claude.",
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
      capabilities: "Capacidades",
      skills: "Habilidades",
      education: "Educación",
      credentials: "Certificaciones y cursos",
      contact: "Contacto",
      blog: "Blog",
    },
    skipLink: "Saltar al contenido principal",
    menu: "Menú",
    mainNav: "Navegación principal",
    homeLabel: "Brandon Oviedo Sánchez, volver al inicio",
    getInTouch: "Ponte en contacto",
    focus: "Enfoque",
    technologies: "Tecnologías",
    headings: {
      skills: "Full stack. Fortalezas claras.",
      capabilities: "Qué hago. Cómo lo hago.",
      education: "Educación. Investigación. Comunidad.",
      research: "Investigación y ponencias",
      contact: "Listo para la próxima oportunidad. Hablemos.",
      credentials: "Certificaciones y cursos",
      blog: "Dos blogs. Una voz.",
    },
    viewFullCv: "Ver todas las capacidades",
    backHome: "Volver al inicio",
    backToBlog: "Volver al blog",
    blog: {
      intro: "Dos blogs: uno sobre ingeniería y el oficio, otro sobre todo lo demás.",
      comingSoon: "Próximamente",
      emptyTitle: "Aún no hay publicaciones",
      emptyCopy: "Las primeras publicaciones están en camino. Vuelve pronto.",
      search: {
        label: "Buscar publicaciones",
        placeholder: "Buscar por título o tema",
        clear: "Borrar búsqueda",
        noResults: "Ninguna publicación coincide con tu búsqueda.",
        resultOne: "publicación",
        resultMany: "publicaciones",
      },
    },
    cvMeta: {
      title: "Capacidades | Brandon Oviedo Sánchez",
      description:
        "Lo que hace Brandon Oviedo Sánchez: frontend, backend y APIs, arquitectura, nube, calidad, resolución de problemas, ingeniería impulsada por IA y mentoría.",
    },
    cvForm: {
      title: "Descarga mi CV",
      open: "Descargar mi CV",
      intro: "Con gusto te comparto mi CV. Cuéntame un poco quién eres y cómo contactarte.",
      stepLabel: "Paso",
      steps: { contact: "Tus datos", verify: "Verificación" },
      name: { label: "Tu nombre (opcional)", placeholder: "Tu nombre" },
      company: { label: "Empresa que recluta", placeholder: "Nombre de la empresa", error: "Escribe el nombre de la empresa (al menos 2 caracteres)." },
      email: { label: "Correo para contactarte", placeholder: "nombre@empresa.com", error: "Escribe un correo válido." },
      comments: { label: "Comentarios (opcional)", placeholder: "Algo que quieras que sepa", counter: "caracteres restantes" },
      verify: {
        label: "Ya casi: confirma que eres una persona.",
        hint: "El botón de descarga aparece cuando pasa la verificación.",
        loading: "Cargando la verificación…",
      },
      back: "Atrás",
      next: "Continuar",
      download: "Descargar CV",
      sending: "Preparando tu CV…",
      errors: {
        human: "No se pasó la verificación. Inténtalo de nuevo.",
        generic: "Algo salió mal. Inténtalo de nuevo en un momento.",
        unavailable: "La descarga del CV no está disponible ahora. Escríbeme por correo.",
      },
      success: { title: "Tu CV se está descargando", body: "Gracias. Te responderé al correo que compartiste si encaja." },
      privacy: "Estos datos me llegan por correo y los uso solo para responderte.",
    },
    capabilitiesNav: { label: "Capacidades", previous: "Capacidad anterior", next: "Capacidad siguiente", position: "de" },
    capabilitiesIntro: "El trabajo, agrupado por lo que hace posible.",
    pointsLabel: "Qué abarca",
    contactCopy: "Si mi experiencia coincide con lo que buscas, con gusto conversamos.",
    contactLabels: { email: "Correo", location: "Ubicación" },
    linkedin: "LinkedIn",
    opensNewTab: "(se abre en una pestaña nueva)",
    caseStudy: "Ver el caso de estudio",
    footer: {
      home: "Inicio",
      navigate: "Explorar",
      connect: "Contacto",
      navLabel: "Navegación del pie de página",
      backToTop: "Volver arriba",
      privacy: "Privacidad",
      terms: "Términos",
      legalLabel: "Legal",
      theme: { label: "Tema", dark: "Oscuro", light: "Claro", system: "Auto" },
    },
    lastUpdated: "Última actualización",
    cta: "Contáctame",
    meta: {
      title: "Brandon Oviedo Sánchez | Ingeniero de Software Full Stack",
      description:
        "Ingeniero de software full stack en Costa Rica que construye productos digitales confiables con React, TypeScript, Java, Spring Boot y AWS, y flujos de ingeniería impulsada por IA con Claude.",
      ogAlt: "Brandon Oviedo Sánchez, Ingeniero de Software Full Stack",
    },
    credentialsCopy: "Siempre aprendiendo, con credenciales que puedes verificar.",
    credentialGroups: { certification: "Certificaciones", course: "Cursos" },
    credentialLabels: { topics: "Temas", id: "ID de credencial", verify: "Verificar credencial", expires: "Vence" },
    languageLabel: "Idioma",
    languageName: "Español",
  },
};
