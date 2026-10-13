import type {
  Contribution,
  Credential,
  Education,
  Experience,
  Profile,
  Publication,
  SkillGroup,
} from "./types";

import credentialsData from "./credentials.json";
import experienceData from "./experience.json";

// Spanish copy is a draft translation pending owner review.

export const profile: Profile = {
  fullName: "Brandon Oviedo Sánchez",
  headline: {
    en: "Full Stack Software Engineer",
    es: "Ingeniero de Software Full Stack",
  },
  summary: {
    en: "I build reliable digital products, from the interface to the backend.",
    es: "Construyo productos digitales confiables, desde la interfaz hasta el backend.",
  },
  supportingLine: {
    en: "5+ years turning business needs into software that works.",
    es: "Más de 5 años convirtiendo necesidades de negocio en software que funciona.",
  },
  cvSummary: {
    en: "Results-driven Full Stack Software Engineer with 5 years of experience delivering secure, scalable, and high-performance applications. Proven track record leading end-to-end development with Java/Spring Boot, React, AWS, and PostgreSQL, reducing incident resolution times and integrating complex third-party systems. Skilled in translating business requirements into technical solutions, optimizing processes, and mentoring team members to deliver quality software on time.",
    es: "Ingeniero de Software Full Stack orientado a resultados, con 5 años de experiencia entregando aplicaciones seguras, escalables y de alto rendimiento. Trayectoria comprobada liderando el desarrollo de extremo a extremo con Java/Spring Boot, React, AWS y PostgreSQL, reduciendo los tiempos de resolución de incidentes e integrando sistemas complejos de terceros. Capaz de traducir requerimientos de negocio en soluciones técnicas, optimizar procesos y mentorear a otros miembros del equipo para entregar software de calidad a tiempo.",
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

// Reverse chronological. Edit content/experience.json to add or change entries.
export const experiences: Experience[] = experienceData;

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
    employer: "CGI",
    description: {
      en: "Investigation, reverse engineering and internal tools that made incident resolution faster.",
      es: "Investigación, ingeniería inversa y herramientas internas para resolver incidentes más rápido.",
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

// `url` stays absent until an exact verified link is supplied. When set, it links the publication note.
export const publications: Publication[] = [
  {
    id: "jocici-2019",
    event: "JOCICI 2019",
    year: 2019,
    url: "https://ieeexplore.ieee.org/document/9105207",
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

// Owner-verified records only. Add entries to content/credentials.json (empty until supplied, T11).
export const credentials: Credential[] = credentialsData as Credential[];
