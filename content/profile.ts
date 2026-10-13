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
    en: "I build reliable digital products, from the backend to the interface.",
    es: "Construyo productos digitales confiables, desde el backend hasta la interfaz.",
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
      en: "Built reusable React and TypeScript components for a risk analysis web application, with an AI-first approach. I focus on clean, scalable code and better performance, and I keep the app stable by finding and fixing bugs early. I also review teammates’ code and share technical guidance within an agile team.",
      es: "Construí componentes reutilizables con React y TypeScript para una aplicación web de análisis de riesgo, con un enfoque AI-first. Me enfoco en código limpio y escalable y en mejorar el rendimiento, y mantengo la aplicación estable detectando y corrigiendo errores a tiempo. También reviso el código de mis compañeros y comparto guía técnica dentro de un equipo ágil.",
    },
    relatedExperienceId: "moodys",
  },
  {
    id: "efficient-operations",
    title: { en: "More efficient operations", es: "Operaciones más eficientes" },
    employer: "CGI",
    description: {
      en: "Investigated and reverse-engineered existing processes to improve them, then built scripts and internal tools that streamlined workflows and significantly reduced resolution times for complex incidents. I also adapted endpoints so modern features and legacy systems could work together, and provided advanced technical support.",
      es: "Investigué e hice ingeniería inversa de procesos existentes para mejorarlos, y desarrollé scripts y herramientas internas que agilizaron los flujos de trabajo y redujeron de forma significativa los tiempos de resolución de incidentes complejos. También adapté endpoints para que las funcionalidades modernas y los sistemas heredados trabajaran juntos, y brindé soporte técnico avanzado.",
    },
    relatedExperienceId: "daugherty-cgi",
  },
  {
    id: "end-to-end-delivery",
    title: { en: "End-to-end delivery", es: "Entrega de extremo a extremo" },
    employer: "Edify Software Consulting",
    description: {
      en: "Led and contributed to full stack projects from design to production: defined application architecture, implemented secure and scalable APIs, and built secure integrations with external platforms. I kept test coverage high and enforced standards through peer reviews, turned client requirements into solutions aligned with business goals, and mentored the team as Engineering Champion.",
      es: "Lideré y contribuí a proyectos full stack desde el diseño hasta producción: definí la arquitectura de las aplicaciones, implementé APIs seguras y escalables y construí integraciones seguras con plataformas externas. Mantuve una alta cobertura de pruebas y promoví los estándares mediante revisiones entre pares, traduje los requerimientos de clientes en soluciones alineadas con los objetivos del negocio y mentoreé al equipo como Engineering Champion.",
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
