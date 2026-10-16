import type {
  Credential,
  Education,
  Profile,
  Publication,
  SkillGroup,
} from "./types";

import credentialsData from "./credentials.json";

// Spanish copy is a draft translation pending owner review.

export const profile: Profile = {
  fullName: "Brandon Oviedo Sánchez",
  headline: {
    en: "Full Stack Software Engineer",
    es: "Ingeniero de Software Full Stack",
  },
  summary: {
    en: "I build reliable digital products, from the backend to the interface.",
    es: "Construyo productos digitales confiables, desde el backend hasta la interfaz.",
  },
  supportingLine: {
    en: "Full stack engineering that ships with agentic coding and AI-driven workflows.",
    es: "Ingeniería full stack que entrega con agentic coding y flujos impulsados por IA.",
  },
  cvSummary: {
    en: "Full Stack Software Engineer who delivers secure, scalable and high-performance applications end to end, with Java/Spring Boot, React, AWS and PostgreSQL. Skilled at translating business requirements into technical solutions, speeding up incident resolution, integrating complex third-party systems and mentoring teammates to deliver quality software on time. Focused on AI-driven engineering: agentic coding workflows with Claude Code and the Model Context Protocol (MCP) applied across the development cycle.",
    es: "Ingeniero de Software Full Stack que entrega aplicaciones seguras, escalables y de alto rendimiento de extremo a extremo, con Java/Spring Boot, React, AWS y PostgreSQL. Capaz de traducir requerimientos de negocio en soluciones técnicas, acelerar la resolución de incidentes, integrar sistemas complejos de terceros y mentorear a compañeros para entregar software de calidad a tiempo. Enfocado en ingeniería impulsada por IA: flujos de agentic coding con Claude Code y el Model Context Protocol (MCP) aplicados a lo largo del ciclo de desarrollo.",
  },
  location: { en: "Costa Rica", es: "Costa Rica" },
  languages: {
    en: ["Native Spanish", "Professional English"],
    es: ["Español nativo", "Inglés profesional"],
  },
  focusAreas: {
    en: ["Full stack", "AI-driven engineering", "Agentic coding"],
    es: ["Full stack", "Ingeniería impulsada por IA", "Agentic coding"],
  },
  email: "boviedos.98@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/brandon-oviedo-231069152/",
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
    title: { en: "AI-driven Engineering", es: "Ingeniería impulsada por IA" },
    skills: [
      { name: "Agentic coding" },
      { name: "Claude Code" },
      { name: "Model Context Protocol (MCP)" },
      { name: "Claude" },
      { name: "Cursor" },
      { name: "Copilot" },
    ],
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
