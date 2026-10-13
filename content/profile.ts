import type {
  Contribution,
  Credential,
  Education,
  Experience,
  Profile,
  Publication,
  SkillGroup,
} from "./types";

// Spanish copy is a draft translation pending owner review.

export const profile: Profile = {
  fullName: "Brandon Oviedo Sánchez",
  headline: {
    en: "Full Stack Software Engineer",
    es: "Ingeniero de Software Full Stack",
  },
  summary: {
    en: "I build reliable digital products with React, TypeScript, and Java / Spring Boot.",
    es: "Construyo productos digitales confiables con React, TypeScript y Java / Spring Boot.",
  },
  supportingLine: {
    en: "5+ years connecting interfaces, services, and business needs.",
    es: "Más de 5 años conectando interfaces, servicios y necesidades de negocio.",
  },
  location: { en: "Costa Rica", es: "Costa Rica" },
  languages: {
    en: ["Native Spanish", "Professional English"],
    es: ["Español nativo", "Inglés profesional"],
  },
  focusAreas: ["Frontend", "Backend", "Cloud"],
  currentEmployer: "Moody’s",
  email: "boviedos.98@gmail.com",
  phone: "+506 8768 9781",
  linkedinUrl: "https://www.linkedin.com/in/brandon-oviedo-231069152/",
  cvUrl: "/cv/Brandon%20Oviedo%20FS.pdf",
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: { en: "Frontend", es: "Frontend" },
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
    ],
  },
  {
    id: "backend-data",
    title: { en: "Backend & Data", es: "Backend y datos" },
    skills: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "NestJS" },
      { name: "REST APIs" },
      { name: "Microservices" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "SQL" },
    ],
  },
  {
    id: "cloud-tooling",
    title: { en: "Cloud & Tooling", es: "Nube y herramientas" },
    skills: [
      { name: "AWS S3" },
      { name: "AWS EC2" },
      { name: "AWS Lambda" },
      { name: "Git" },
      { name: "Maven" },
      { name: "Gradle" },
      { name: "Docker", proficiencyNote: { en: "Basic knowledge", es: "Conocimiento básico" } },
      { name: "Kubernetes", proficiencyNote: { en: "Basic knowledge", es: "Conocimiento básico" } },
    ],
  },
  {
    id: "quality-collaboration",
    title: { en: "Quality & Collaboration", es: "Calidad y colaboración" },
    skills: [
      { name: "Code reviews" },
      { name: "Troubleshooting" },
      { name: "Performance optimization" },
      { name: "Reverse engineering" },
      { name: "Mentoring" },
      { name: "Agile delivery" },
    ],
  },
  {
    id: "ai-assisted",
    title: { en: "AI-assisted Development", es: "Desarrollo asistido por IA" },
    skills: [{ name: "Cursor" }, { name: "Claude" }, { name: "Copilot" }],
  },
];

// Reverse chronological.
export const experiences: Experience[] = [
  {
    id: "moodys",
    employer: "Moody’s",
    role: { en: "Software Engineer", es: "Ingeniero de Software" },
    startDate: "2025-12",
    endDate: null,
    bullets: {
      en: [
        "Develop reusable React and TypeScript features for a risk analysis application.",
        "Improve performance, resolve bugs and support peers through code reviews.",
      ],
      es: [
        "Desarrollo funcionalidades reutilizables con React y TypeScript para una aplicación de análisis de riesgo.",
        "Mejoro el rendimiento, resuelvo errores y apoyo a mis compañeros mediante revisiones de código.",
      ],
    },
    technologies: ["React", "TypeScript"],
  },
  {
    id: "daugherty-cgi",
    employer: "Daugherty / CGI",
    role: {
      en: "Intermediate Full Stack Software Developer",
      es: "Desarrollador de Software Full Stack Intermedio",
    },
    startDate: "2024-01",
    endDate: "2025-12",
    bullets: {
      en: [
        "Built React interfaces and Java / Spring Boot microservices.",
        "Integrated modern and legacy systems; streamlined incident resolution with internal tools.",
      ],
      es: [
        "Construí interfaces con React y microservicios con Java / Spring Boot.",
        "Integré sistemas modernos y heredados; agilicé la resolución de incidentes con herramientas internas.",
      ],
    },
    technologies: ["React", "Java", "Spring Boot"],
  },
  {
    id: "edify",
    employer: "Edify Software Consulting",
    role: {
      en: "Intermediate Full Stack Software Developer",
      es: "Desarrollador de Software Full Stack Intermedio",
    },
    startDate: "2021-01",
    endDate: "2024-01",
    bullets: {
      en: [
        "Delivered applications with Spring Boot, NestJS, Next.js, PostgreSQL and AWS.",
        "Built secure integrations and mentored teammates as Engineering Champion.",
      ],
      es: [
        "Entregué aplicaciones con Spring Boot, NestJS, Next.js, PostgreSQL y AWS.",
        "Construí integraciones seguras y mentoreé a compañeros como Engineering Champion.",
      ],
    },
    technologies: ["Spring Boot", "NestJS", "Next.js", "PostgreSQL", "AWS"],
  },
];

export const contributions: Contribution[] = [
  {
    id: "maintainable-interfaces",
    title: { en: "Maintainable interfaces", es: "Interfaces mantenibles" },
    employer: "Moody’s",
    description: {
      en: "Reusable React and TypeScript components for risk analysis workflows.",
      es: "Componentes reutilizables con React y TypeScript para flujos de análisis de riesgo.",
    },
    relatedExperienceId: "moodys",
  },
  {
    id: "efficient-operations",
    title: { en: "More efficient operations", es: "Operaciones más eficientes" },
    employer: "Daugherty / CGI",
    description: {
      en: "Investigation, reverse engineering and internal tools to streamline incident resolution.",
      es: "Investigación, ingeniería inversa y herramientas internas para agilizar la resolución de incidentes.",
    },
    relatedExperienceId: "daugherty-cgi",
  },
  {
    id: "end-to-end-delivery",
    title: { en: "End-to-end delivery", es: "Entrega de extremo a extremo" },
    employer: "Edify Software Consulting",
    description: {
      en: "Application architecture, secure APIs, external integrations and technical mentoring.",
      es: "Arquitectura de aplicaciones, APIs seguras, integraciones externas y mentoría técnica.",
    },
    relatedExperienceId: "edify",
  },
];

export const education: Education[] = [
  {
    id: "tec",
    institution: "Instituto Tecnológico de Costa Rica",
    qualification: { en: "Computer Engineering", es: "Ingeniería en Computación" },
    startDate: "2016-02",
    endDate: "2021-02",
  },
];

// `url` stays absent until an exact verified link is supplied.
export const publications: Publication[] = [
  {
    id: "jocici-2019",
    event: "JOCICI 2019",
    year: 2019,
    role: { en: "Speaker & co-author", es: "Ponente y coautor" },
    title: {
      en: "Promoting community participation in thematic mapping processes by simplifying the free tool OSMTracker for Android",
      es: "Promoviendo la participación comunitaria en procesos de mapeo temático mediante la simplificación de la herramienta libre OSMTracker para Android",
    },
    note: {
      en: "Publication available in IEEE Xplore.",
      es: "Publicación disponible en IEEE Xplore.",
    },
  },
  {
    id: "sotm-latam-2019",
    event: "State of the Map Latam 2019",
    eventLocation: { en: "Encarnación, Paraguay", es: "Encarnación, Paraguay" },
    year: 2019,
    role: { en: "Speaker & workshop co-author", es: "Ponente y coautor del taller" },
    title: {
      en: "Creating and managing custom button layouts for OSMTracker",
      es: "Creación y gestión de distribuciones de botones personalizadas para OSMTracker",
    },
  },
];

// Owner-verified records only. Empty until supplied (T11).
export const credentials: Credential[] = [];
