import type { Capability } from "./types";

// What the work adds up to, grouped by capability: no employers, dates or figures. Spanish copy is a draft
// translation pending owner review.
export const capabilities: Capability[] = [
  {
    id: "frontend",
    title: { en: "Frontend engineering", es: "Ingeniería frontend" },
    summary: {
      en: "Interfaces that stay fast, clear and maintainable as the product grows.",
      es: "Interfaces rápidas, claras y mantenibles a medida que el producto crece.",
    },
    points: {
      en: [
        "Reusable component libraries in React and TypeScript.",
        "Performance tuning and clean, scalable code.",
        "Data-heavy web applications built with an AI-first approach.",
      ],
      es: [
        "Bibliotecas de componentes reutilizables con React y TypeScript.",
        "Optimización de rendimiento y código limpio y escalable.",
        "Aplicaciones web con mucha información, construidas con un enfoque AI-first.",
      ],
    },
    technologies: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    id: "backend",
    title: { en: "Backend and APIs", es: "Backend y APIs" },
    summary: {
      en: "Services and APIs that are secure by design and ready to scale.",
      es: "Servicios y APIs seguros por diseño y listos para escalar.",
    },
    points: {
      en: [
        "Microservices with Java and Spring Boot, and with NestJS.",
        "Secure, scalable REST APIs.",
        "Endpoints that let modern features work alongside legacy systems.",
      ],
      es: [
        "Microservicios con Java y Spring Boot, y con NestJS.",
        "APIs REST seguras y escalables.",
        "Endpoints que permiten que las funcionalidades modernas convivan con sistemas heredados.",
      ],
    },
    technologies: ["Java", "Spring Boot", "NestJS", "REST APIs", "Microservices"],
  },
  {
    id: "architecture",
    title: { en: "Architecture and integrations", es: "Arquitectura e integraciones" },
    summary: {
      en: "Technical decisions that tie the product to the business goal.",
      es: "Decisiones técnicas que conectan el producto con el objetivo del negocio.",
    },
    points: {
      en: [
        "Application architecture, from the first design to production.",
        "Secure integrations with external platforms.",
        "Client requirements translated into technical solutions.",
      ],
      es: [
        "Arquitectura de aplicaciones, desde el primer diseño hasta producción.",
        "Integraciones seguras con plataformas externas.",
        "Requerimientos de clientes traducidos en soluciones técnicas.",
      ],
    },
    technologies: [],
  },
  {
    id: "cloud-data",
    title: { en: "Cloud and data", es: "Nube y datos" },
    summary: {
      en: "Production-ready services on AWS, backed by relational databases.",
      es: "Servicios listos para producción en AWS, respaldados por bases de datos relacionales.",
    },
    points: {
      en: [
        "Cloud services on AWS: S3, EC2 and Lambda.",
        "Relational databases and SQL.",
        "Containers and orchestration (basic knowledge).",
      ],
      es: [
        "Servicios en la nube con AWS: S3, EC2 y Lambda.",
        "Bases de datos relacionales y SQL.",
        "Contenedores y orquestación (conocimiento básico).",
      ],
    },
    technologies: ["AWS", "PostgreSQL", "MySQL", "SQL", "Docker", "Kubernetes"],
  },
  {
    id: "quality",
    title: { en: "Quality and reliability", es: "Calidad y confiabilidad" },
    summary: {
      en: "Stable, production-ready software that teammates can trust and extend.",
      es: "Software estable y listo para producción en el que el equipo puede confiar y que puede extender.",
    },
    points: {
      en: [
        "High test coverage and consistent coding standards.",
        "Peer code reviews that spread good practices.",
        "Bugs found and fixed early to keep applications stable.",
      ],
      es: [
        "Alta cobertura de pruebas y estándares de código consistentes.",
        "Revisiones de código entre pares que extienden las buenas prácticas.",
        "Errores detectados y corregidos a tiempo para mantener las aplicaciones estables.",
      ],
    },
    technologies: ["Git", "Maven", "Gradle"],
  },
  {
    id: "troubleshooting",
    title: { en: "Troubleshooting and process improvement", es: "Resolución de problemas y mejora de procesos" },
    summary: {
      en: "Complex incidents resolved faster, and the processes behind them improved.",
      es: "Incidentes complejos resueltos más rápido y los procesos detrás de ellos mejorados.",
    },
    points: {
      en: [
        "In-depth investigation and reverse engineering of existing systems.",
        "Scripts and internal tools that streamline workflows and cut resolution times.",
        "Advanced technical support.",
      ],
      es: [
        "Investigación a fondo e ingeniería inversa de sistemas existentes.",
        "Scripts y herramientas internas que agilizan los flujos de trabajo y reducen los tiempos de resolución.",
        "Soporte técnico avanzado.",
      ],
    },
    technologies: [],
  },
  {
    id: "ai-driven",
    title: { en: "AI-driven engineering", es: "Ingeniería impulsada por IA" },
    summary: {
      en: "AI built into the daily workflow, with engineering judgment still in charge.",
      es: "La IA integrada al flujo de trabajo diario, con el criterio de ingeniería al mando.",
    },
    points: {
      en: [
        "Agentic coding workflows with Claude Code across the development cycle.",
        "Model Context Protocol (MCP) to connect tools and data to AI assistants.",
        "An AI-first approach when building features.",
      ],
      es: [
        "Flujos de agentic coding con Claude Code a lo largo del ciclo de desarrollo.",
        "Model Context Protocol (MCP) para conectar herramientas y datos con asistentes de IA.",
        "Un enfoque AI-first al construir funcionalidades.",
      ],
    },
    technologies: ["Claude Code", "Model Context Protocol (MCP)", "Claude", "Cursor", "Copilot"],
  },
  {
    id: "collaboration",
    title: { en: "Collaboration and mentoring", es: "Colaboración y mentoría" },
    summary: {
      en: "A teammate who raises the level of the whole team.",
      es: "Un compañero que eleva el nivel de todo el equipo.",
    },
    points: {
      en: [
        "Agile delivery in cross-functional teams.",
        "Technical guidance and mentoring for teammates.",
        "End-to-end delivery, from requirements to production.",
      ],
      es: [
        "Entrega ágil en equipos multidisciplinarios.",
        "Guía técnica y mentoría para compañeros.",
        "Entrega de extremo a extremo, desde los requerimientos hasta producción.",
      ],
    },
    technologies: [],
  },
];
