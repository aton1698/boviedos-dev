import type { Localized } from "./types";

export const legalPages = ["privacy", "terms"] as const;
export type LegalPageId = (typeof legalPages)[number];

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

/** ISO date of the last review of both documents; shown on the pages. */
export const legalUpdated = "2026-10-13";

// Spanish copy is a draft translation pending owner review. These texts describe how the site works today
// (no cookies, analytics, forms or accounts): update them if that changes. They are not legal advice.
export const legalDocuments: Record<LegalPageId, Localized<LegalDocument>> = {
  privacy: {
    en: {
      title: "Privacy Notice",
      intro:
        "This site is the personal portfolio and CV of Brandon Oviedo Sánchez. This notice explains what information the site handles and how.",
      sections: [
        {
          heading: "Who is responsible",
          paragraphs: [
            "Brandon Oviedo Sánchez, based in Costa Rica, is responsible for this site. You can reach me at boviedos.98@gmail.com.",
          ],
        },
        {
          heading: "What the site collects",
          paragraphs: [
            "The site has no accounts, forms, comments, advertising or analytics tools, and it does not ask you for personal information.",
            "It does not set cookies or use similar technologies to track you.",
          ],
        },
        {
          heading: "Technical data from hosting",
          paragraphs: [
            "The site is hosted on Vercel. Like any web host, it may process technical data such as your IP address, browser type and the time of each request, to deliver the site and keep it secure. I do not use this data to identify you.",
          ],
        },
        {
          heading: "If you contact me",
          paragraphs: [
            "If you email me, I use your name, email address and message only to reply to you. I keep the conversation for as long as it is useful for that purpose and do not share it with third parties.",
          ],
        },
        {
          heading: "Links to other sites",
          paragraphs: [
            "The site links to services such as LinkedIn, HackerRank, Skilljar and IEEE Xplore. Those sites have their own privacy practices, which I do not control.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can ask me to access, correct or delete any personal information I hold about you, for example from an email exchange, by writing to boviedos.98@gmail.com.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "If the site starts using new tools that handle personal data, I will update this notice before they go live. The date of the last review is shown at the top of this page.",
          ],
        },
      ],
    },
    es: {
      title: "Aviso de privacidad",
      intro:
        "Este sitio es el portafolio y CV personal de Brandon Oviedo Sánchez. Este aviso explica qué información maneja el sitio y cómo.",
      sections: [
        {
          heading: "Quién es el responsable",
          paragraphs: [
            "Brandon Oviedo Sánchez, con sede en Costa Rica, es el responsable de este sitio. Puedes escribirme a boviedos.98@gmail.com.",
          ],
        },
        {
          heading: "Qué recopila el sitio",
          paragraphs: [
            "El sitio no tiene cuentas, formularios, comentarios, publicidad ni herramientas de analítica, y no te pide información personal.",
            "No usa cookies ni tecnologías similares para rastrearte.",
          ],
        },
        {
          heading: "Datos técnicos del hosting",
          paragraphs: [
            "El sitio está alojado en Vercel. Como cualquier servicio de hosting, puede procesar datos técnicos como tu dirección IP, el tipo de navegador y la hora de cada solicitud, para entregar el sitio y mantenerlo seguro. No uso estos datos para identificarte.",
          ],
        },
        {
          heading: "Si me contactas",
          paragraphs: [
            "Si me escribes por correo, uso tu nombre, tu dirección de correo y tu mensaje solo para responderte. Conservo la conversación mientras sea útil para ese fin y no la comparto con terceros.",
          ],
        },
        {
          heading: "Enlaces a otros sitios",
          paragraphs: [
            "El sitio enlaza a servicios como LinkedIn, HackerRank, Skilljar e IEEE Xplore. Esos sitios tienen sus propias prácticas de privacidad, que no controlo.",
          ],
        },
        {
          heading: "Tus derechos",
          paragraphs: [
            "Puedes pedirme acceso, corrección o eliminación de la información personal que tenga sobre ti, por ejemplo de un intercambio de correos, escribiendo a boviedos.98@gmail.com.",
          ],
        },
        {
          heading: "Cambios",
          paragraphs: [
            "Si el sitio empieza a usar herramientas nuevas que traten datos personales, actualizaré este aviso antes de que entren en funcionamiento. La fecha de la última revisión aparece al inicio de esta página.",
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms of Use",
      intro:
        "By using this site you agree to these terms. If you do not agree with them, please do not use the site.",
      sections: [
        {
          heading: "Purpose of the site",
          paragraphs: [
            "This site presents the professional profile, experience and writing of Brandon Oviedo Sánchez. It is for information only and is not an offer of services.",
          ],
        },
        {
          heading: "Content and intellectual property",
          paragraphs: [
            "The texts, design, logo and other original material on this site belong to Brandon Oviedo Sánchez, all rights reserved. You may view the site, share its links and download the CV to evaluate my profile. You may not copy, resell or republish the content without my written permission.",
            "Company, product and certification names mentioned here belong to their owners. They appear only to describe my experience and do not imply endorsement.",
          ],
        },
        {
          heading: "Accuracy of the information",
          paragraphs: [
            "I do my best to keep the information accurate and current, but it may change or contain mistakes. The site is provided as is, without warranties of any kind.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "Do not attempt to disrupt the site, gain unauthorized access to it, or use automated tools in a way that harms its operation.",
          ],
        },
        {
          heading: "External links",
          paragraphs: [
            "The site links to third-party sites. I am not responsible for their content or practices.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the extent permitted by law, I am not liable for damages arising from the use of, or the inability to use, this site or its content.",
          ],
        },
        {
          heading: "Governing law and changes",
          paragraphs: [
            "These terms are governed by the laws of Costa Rica. I may update them from time to time; the date of the last review is shown at the top of this page. Questions can be sent to boviedos.98@gmail.com.",
          ],
        },
      ],
    },
    es: {
      title: "Términos de uso",
      intro:
        "Al usar este sitio aceptas estos términos. Si no estás de acuerdo con ellos, por favor no uses el sitio.",
      sections: [
        {
          heading: "Propósito del sitio",
          paragraphs: [
            "Este sitio presenta el perfil profesional, la experiencia y los escritos de Brandon Oviedo Sánchez. Es solo informativo y no constituye una oferta de servicios.",
          ],
        },
        {
          heading: "Contenido y propiedad intelectual",
          paragraphs: [
            "Los textos, el diseño, el logo y demás material original de este sitio pertenecen a Brandon Oviedo Sánchez, todos los derechos reservados. Puedes ver el sitio, compartir sus enlaces y descargar el CV para evaluar mi perfil. No puedes copiar, revender ni republicar el contenido sin mi permiso por escrito.",
            "Los nombres de empresas, productos y certificaciones mencionados pertenecen a sus propietarios. Aparecen solo para describir mi experiencia y no implican respaldo alguno.",
          ],
        },
        {
          heading: "Exactitud de la información",
          paragraphs: [
            "Me esfuerzo por mantener la información correcta y actualizada, pero puede cambiar o contener errores. El sitio se ofrece tal cual, sin garantías de ningún tipo.",
          ],
        },
        {
          heading: "Uso aceptable",
          paragraphs: [
            "No intentes interrumpir el sitio, acceder a él sin autorización ni usar herramientas automatizadas de forma que perjudique su funcionamiento.",
          ],
        },
        {
          heading: "Enlaces externos",
          paragraphs: [
            "El sitio enlaza a páginas de terceros. No soy responsable de su contenido ni de sus prácticas.",
          ],
        },
        {
          heading: "Limitación de responsabilidad",
          paragraphs: [
            "En la medida que la ley lo permita, no soy responsable por daños derivados del uso, o de la imposibilidad de uso, de este sitio o de su contenido.",
          ],
        },
        {
          heading: "Ley aplicable y cambios",
          paragraphs: [
            "Estos términos se rigen por las leyes de Costa Rica. Puedo actualizarlos de vez en cuando; la fecha de la última revisión aparece al inicio de esta página. Las consultas pueden enviarse a boviedos.98@gmail.com.",
          ],
        },
      ],
    },
  },
};
