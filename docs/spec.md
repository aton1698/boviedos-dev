boviedos dev Website System Specification
Brandon Oviedo Sánchez | English recruiter portfolio | Version 1.1 | 10 October 2026
Build a responsive online CV that lets recruiters understand Brandon’s technical strengths, employment history and professional contributions, download his CV and contact him directly. The site combines a restrained technological identity with readable content and selective React Bits motion.
Scope and delivery
* One English public page at https://boviedos.dev, with seven anchor sections: Profile, Skills, Experience, Contributions, Education, Certifications & Courses, and Contact.
* Responsive layouts for phones, tablets, laptops and desktop displays. The section renders are desktop references; the rules in this specification define smaller-screen behavior.
* CV download, email and phone links, LinkedIn link, keyboard navigation, metadata, sitemap, robots policy and a print-friendly view.
* No account system, admin panel, database or contact-form backend is required for the initial release. Maintain structured content in the repository.
Content authority and release rule
Employment, skills and education follow the supplied CV. Credentials require verified titles, issuers, dates and links before publication. The credentials render contains design placeholders; hide unverified entries on the public site. Never publish the placeholder notice shown in the concept render. Do not invent certifications, skill scores, project metrics or client testimonials.
Primary user journeys
* Recruiter arrives, identifies the full stack profile and current employer, then jumps to Skills or Experience.
* Technical reviewer examines Contributions and the supporting employment context.
* Visitor downloads the CV or opens email, phone or LinkedIn contact links without signing in.
Design reference priority
Use English renders 01–07 as the current section direction. Images 08–15 preserve earlier Spanish explorations and are not production copy. The early dashboard mockups are conceptual examples and must not be represented as Brandon’s completed projects.
Project folder with all renders
________________


Visual System and Responsive Layout
Tokens and typography
Background #090C10; primary text #F2F5F7; secondary text #8B96A5; accent #C4FF48; divider #26313C. Use the accent for active navigation, small arrows and selected interaction states. Keep backgrounds solid and cards largely borderless.
Use Space Grotesk for headings and brand, Inter for body text, navigation and actions, and JetBrains Mono for short technical labels and compact dates. DD-02 and DD-03 define exact weights, loading, fallback stacks and type scales. These choices are fixed implementation requirements. Let headings wrap naturally on smaller screens.
Layout rules
* Container: width 100%, max-width 1280px; centered. Side padding 20px under 768px, 32px at 768–1023px, 48–64px above 1024px. Support 320px viewport width without horizontal overflow.
* Section spacing: 64–80px on mobile and 96–128px on desktop. Rows use 24–40px gaps. Avoid forcing each section to 100vh; content determines height.
* At less than 768px: one column throughout. Name, intro, actions, dates, titles and descriptions stack in reading order. Actions wrap or stack; phone/email strings can wrap without losing meaning.
* At 768–1023px: keep main text in one column; Skills may use two columns only when labels and values remain readable. Experience keeps dates above each employer. Education entries stack.
* At 1024px and above: Profile may use a text and wave split; Skills use aligned category/value rows; Experience may use date, role and contribution columns; Contact retains generous whitespace.
Navigation behavior
Use a sticky header, semantic anchor links and section IDs: profile, skills, experience, contributions, education, credentials, contact. Set scroll-margin-top to header height plus 24px. Observe sections to indicate the active link without repeatedly replacing browser history; anchor clicks update the hash normally.
Show full navigation only when it fits (target 1200px and above). Below that, display brand and a Menu button. The menu exposes all sections, closes on selection or Escape, returns focus to the trigger and reports expanded state. If implemented as a modal, trap focus and make the background inert. Do not depend on hover.
Responsive decoration
The hero wave is decorative and cannot overlap text. Reduce its density and opacity on tablets; use a static cropped motif or omit it on small phones. The page remains complete when the effect is disabled or fails.
________________


Profile and Skills
Profile content
H1: Brandon Oviedo Sánchez. Eyebrow: Full Stack Software Engineer. Intro: I build reliable digital products with React, TypeScript, and Java / Spring Boot. Supporting line: 5+ years connecting interfaces, services, and business needs.
Context: Costa Rica · Native Spanish · Professional English. Employer: Currently at Moody’s. Focus areas: Frontend / Backend / Cloud. Primary action: Download CV. Secondary action: Get in touch.
Download CV links to a real, readable PDF served from the site, for example /cv/brandon-oviedo-cv.pdf. Use a descriptive accessible label and a filename. Keep employer and experience duration as editable data rather than baking them into graphics.
Render reference: 01-en-profile.png
Skills content
* Frontend: React, Next.js, TypeScript, JavaScript.
* Backend & Data: Java, Spring Boot, NestJS, REST APIs, Microservices, PostgreSQL, MySQL, SQL.
* Cloud & Tooling: AWS S3, EC2 and Lambda; Git, Maven and Gradle. Docker and Kubernetes are explicitly basic knowledge.
* Quality & Collaboration: Code reviews, troubleshooting, performance optimization, reverse engineering, mentoring and agile delivery.
* AI-assisted Development: Cursor, Claude and Copilot.
Heading: Full stack. Clear strengths. Group skills as accessible lists, not progress bars or numerical scores. Labels and values must remain text in HTML, searchable and selectable. A skill may link to related experience only when there is a real destination; decorative arrows are not fake buttons.
Render reference: 02-en-skills.png
Interaction and narrow screens
Reveal the name once using restrained Split Text motion; keep an accessible full-text heading. Stack profile actions when necessary. Skill rows become label followed by values on mobile, with natural text wrapping and no horizontal carousel. CV and contact actions remain available without JavaScript.
________________


Experience and Contributions
Experience content
Heading: Product engineering. Consulting experience. Present roles in reverse chronological order with dates, employer, exact role title and concise supporting bullets.
* Moody’s | Dec 2025–Present | Software Engineer. Develop reusable React and TypeScript features for a risk analysis application. Improve performance, resolve bugs and support peers through code reviews.
* Daugherty / CGI | Jan 2024–Dec 2025 | Intermediate Full Stack Software Developer. Built React interfaces and Java / Spring Boot microservices. Integrated modern and legacy systems; streamlined incident resolution with internal tools.
* Edify Software Consulting | Jan 2021–Jan 2024 | Intermediate Full Stack Software Developer. Delivered applications with Spring Boot, NestJS, Next.js, PostgreSQL and AWS. Built secure integrations and mentored teammates as Engineering Champion.
Use an ordered semantic list with decorative separators. Dates and titles stay visible; avoid hiding core experience behind accordions. On small screens place dates first, then employer and role, then bullets. Use readable text rather than logos as the primary identifier.
Render reference: 03-en-experience.png
Contributions content
Heading: What I bring to a team. Intro: Selected contributions from my professional experience. Show three concise examples tied to their employer context.
* Maintainable interfaces — Moody’s. Reusable React and TypeScript components for risk analysis workflows.
* More efficient operations — Daugherty / CGI. Investigation, reverse engineering and internal tools to streamline incident resolution.
* End-to-end delivery — Edify Software Consulting. Application architecture, secure APIs, external integrations and technical mentoring.
Contribution rows are informational unless a reviewed case study exists. Do not show false destination arrows or confidential product screenshots. Future case studies can add problem, responsibility, approach and evidence-based outcome without changing the section order.
Render reference: 04-en-contributions.png
________________


Education Credentials and Contact
Education and research
Heading: Education. Research. Community. Instituto Tecnológico de Costa Rica — Computer Engineering — Feb 2016–Feb 2021. Preserve the institution’s proper name.
* JOCICI 2019 — Speaker & co-author. Promoting community participation in thematic mapping processes by simplifying the free tool OSMTracker for Android. Publication available in IEEE Xplore.
* State of the Map Latam 2019 — Encarnación, Paraguay — Speaker & workshop co-author. Creating and managing custom button layouts for OSMTracker.
Research links require the exact verified paper or workshop URL. Until supplied, render the titles as plain text. On mobile place event and role above the title.
Render reference: 05-en-education.png
Certifications and courses
Heading: Certifications & Courses. Supporting copy: Continuous learning, backed by verifiable credentials. Group formal certifications separately from completed courses. Each entry includes title, issuer/provider, issue or completion date, topics and optional credential ID, verification URL and expiry date.
Store a verification status for each entry. Only verified entries appear publicly. If no entries are verified, omit the section and navigation item until content is ready. Do not display bracketed placeholders, a pending-content warning or an invented credential. Preserve the layout reference for future populated entries.
Render reference: 06-en-certifications-courses.png
Contact
Heading: Let’s talk about your next team. Copy: If my experience matches what you’re looking for, I’d be glad to connect. Display boviedos.98@gmail.com, +506 8768 9781 and Costa Rica. Use mailto:boviedos.98@gmail.com and tel:+50687689781. Provide Download CV and LinkedIn links.
LinkedIn destination: https://www.linkedin.com/in/brandon-oviedo-231069152/ . Remove tracking parameters. Use meaningful labels; external links opening a new tab must use rel="noopener noreferrer" and indicate the behavior accessibly. Footer: © [current year] Brandon Oviedo Sánchez.
Render reference: 07-en-contact.png
________________


Application Architecture and Content Model
Proposed implementation
Use Next.js App Router, React and TypeScript with CSS variables and responsive utility classes or CSS modules. Pin compatible stable dependencies and commit the lockfile. These are implementation recommendations, not an already deployed system.
Pre-render the English content as semantic HTML. Keep page, section content and metadata in server components; isolate browser-dependent React Bits effects, menu state and active navigation in small client components. Do not turn the whole page into a client component for a decorative effect.
Component responsibilities
* SiteHeader and MobileNavigation: anchor navigation, menu controls, focus behavior and active-section state.
* ProfileSection, SkillsSection, ExperienceSection, ContributionsSection, EducationSection, CredentialsSection and ContactSection: accessible content and responsive layouts.
* HeroWave and AnimatedHeading: optional visual enhancement, reduced-motion behavior and static fallbacks.
* CvDownload and ExternalLink: consistent destinations, accessible labels and external-link behavior. SiteFooter: identity and current year.
Suggested repository locations
app/page.tsx and app/layout.tsx compose the page; app/globals.css defines tokens; app/robots.ts and app/sitemap.ts define indexability; components/sections holds content views; components/motion holds effects; content/profile.ts stores typed content; public/cv holds the PDF.
Data model
* Profile: fullName, headline, summary, location, languages[], currentEmployer, email, phone, linkedinUrl, cvUrl.
* SkillGroup: id, title, skills[]; each skill has name and an optional honest proficiency note.
* Experience: id, employer, role, startDate, endDate|null, bullets[], technologies[]. Use ISO month strings; format English display dates centrally.
* Contribution: id, title, employer, description, relatedExperienceId and optional reviewed caseStudyUrl.
* Education and Publication: institution/event, qualification/role, dates, title and optional verified URL.
* Credential: id, kind (certification/course), title, issuer, issueDate, expiryDate?, credentialId?, verificationUrl?, topics[], verified.
Asset and content management
Drive links in this document are design references, not production image hosting. Implement the site in HTML/CSS; do not render mockup screenshots as the interface. Serve actual production assets and the CV from the site or an appropriate asset host. Validate content at build time; missing credentials must not fail the rest of the page. A CMS is optional later, not part of the initial release.
________________


Motion Accessibility and Performance
Motion map
* Line Waves: faint decorative hero motion at low speed. Limit to one canvas effect; aria-hidden and noninteractive. Use a static motif for reduced motion or unsupported devices. Pause when the hero leaves view or the tab is hidden.
* Split Text: staggered entrance for the profile name only, lasting approximately 600–900ms total and running once. Preserve an accessible unsplit name and ensure failed initialization leaves text visible.
* Section entrances: optional 300–450ms opacity/translate transition with 8–12px travel. Content is visible by default and progressively enhanced; never delay recruiter access until a long animation finishes.
* Magnet: optional subtle desktop effect on the primary CV action, maximum displacement 4–6px. Disable for coarse pointers and reduced motion; retain a stable clickable/focusable area.
* Spotlight Card: optional restrained contribution hover highlight only if it benefits the final layout. Provide an equivalent visible keyboard focus state for any actual link. Do not add bordered cards solely to accommodate the effect.
Decrypted Text is excluded from core professional content in this minimal direction. No custom cursor, scroll hijacking, sound, flashing or autoplay content. Never make hover the only way to see details.
Accessibility requirements
Target WCAG 2.2 AA. Use lang="en", one H1, sequential headings, header/nav/main/footer landmarks and a skip link. Ensure text contrast at least 4.5:1 for normal text and 3:1 for large text; interactive boundaries and focus indicators need appropriate contrast. Decorative lines do not carry meaning alone.
All actions work by keyboard. Touch targets aim for at least 44×44px, links have clear focus states and reading order follows DOM order. Respect prefers-reduced-motion in CSS and JavaScript. At 200% zoom and 320px width, content reflows without horizontal scrolling or clipping.
Performance targets
Release targets, not measured results: Lighthouse mobile performance ≥90, accessibility ≥95 and SEO ≥95 under documented test conditions. Aim for LCP ≤2.5s, CLS ≤0.1 and field INP ≤200ms at the 75th percentile once traffic provides sufficient data.
Use font subsets and limited weights, reserve layout space, defer optional motion code, avoid duplicate animation libraries and lazy-load below-fold media. Stop canvas work offscreen and cap rendering resolution where necessary. Ensure no hydration errors and no animation dependency blocks content or CV download.
________________


SEO Operations and Acceptance Criteria
Search and sharing
Set title to Brandon Oviedo Sánchez | Full Stack Software Engineer. Suggested description: Full stack software engineer based in Costa Rica, building reliable digital products with React, TypeScript, Java, Spring Boot, and AWS. Set the production canonical to https://boviedos.dev, English language and a branded Open Graph image.
Provide sitemap and robots rules. Index only production; prevent preview environments from being indexed. Add truthful Person structured data with name, jobTitle, URL and verified LinkedIn sameAs. Avoid unverified certification markup. Support a print view that removes navigation and motion, uses black text on white and preserves section order.
Deployment and maintenance
Deploy through a Git-backed Next.js-compatible host. Configure boviedos.dev DNS and HTTPS, redirect alternate www/non-www origin to the canonical, and separate preview from production. CI runs type checks, lint, build and targeted functional checks. A reviewed production deployment is a separate action from this specification.
Keep secrets out of browser bundles and repository content. No backend is necessary for mailto/tel contact links. Analytics is optional and should collect only aggregate visits and events such as CV downloads and contact-link clicks; do not send personal data in event payloads. Apply privacy requirements if tracking is added.
Release checks
* All seven verified content sections render in English. If credentials remain unverified, hide Credentials and its navigation link; all remaining anchor links still work.
* Verify widths 320, 375, 390, 768, 1024, 1280 and 1440px, portrait/landscape where relevant, 200% zoom and long text wrapping. No overlaps, truncated email, hidden dates or horizontal overflow.
* Check current Chrome, Firefox and Safari, plus iOS Safari and Android Chrome. Validate keyboard menu flow, Escape, focus return, skip link and reduced motion.
* CV URL returns a readable PDF; email, phone and LinkedIn destinations are correct. No placeholder credentials, conceptual project claims or nonfunctional arrows remain.
* Content remains readable if JavaScript, canvas or animation initialization fails. Verify clean console, production build, metadata, canonical, sitemap, robots and print output.
* Before release, supply verified credential records, final CV PDF, optional verified research links, the font configuration defined in DD-02 and the hosting account. Do not represent missing records as earned credentials.
Technical references
Next.js server and client components
Next.js metadata and Open Graph images
React Bits Line Waves
React Bits Split Text
React Bits Magnet
React Bits Spotlight Card
________________


Render Inventory and Direct Image Links
All 15 generated images are stored in the project folder. Links below open the actual image files in Google Drive. Access follows the folder and file permissions; these are not public asset CDN URLs.
Current English section renders
Render reference: 01-en-profile.png
Render reference: 02-en-skills.png
Render reference: 03-en-experience.png
Render reference: 04-en-contributions.png
Render reference: 05-en-education.png
Render reference: 06-en-certifications-courses.png
Render reference: 07-en-contact.png
The credentials image documents the future layout and includes placeholders. Use verified content at implementation time and omit the placeholder notice from the production interface.
Earlier design explorations
Render reference: 08-initial-full-page-es.png
Render reference: 09-minimal-full-page-es.png
Render reference: 10-es-profile.png
Render reference: 11-es-skills.png
Render reference: 12-es-experience.png
Render reference: 13-es-contributions.png
Render reference: 14-es-education.png
Render reference: 15-es-contact.png
The earlier Spanish images are retained for design history. They do not override English copy or the latest minimal layout. The initial full-page concept contains illustrative dashboards rather than verified portfolio projects.
Design Decisions and Delivery Traceability
This section defines the implementation baseline for the future Trello backlog. Decisions DD-01 through DD-12 refine the earlier design guidance. Requirements REQ-01 through REQ-12 are the stable references for ticket creation. Every card must cite its requirement IDs, relevant decision IDs and the actual render URL from the Render Inventory. The site and ticket copy are written in English.
DD-01 Visual direction
Decision: use a minimalist technological style with a graphite canvas, white type, restrained electric-lime accents, generous whitespace and thin decorative dividers. Rationale: recruiters should understand the profile quickly while the visual details communicate attention to interface quality. The seven English section renders define composition; implement them as responsive HTML rather than reproducing them as screenshots. Earlier Spanish concepts remain historical references.
DD-02 Font families and loading
Headings and brand: Space Grotesk, weights 500 and 600, fallback Arial, sans-serif. Body text, navigation and actions: Inter, weights 400, 500 and 600, fallback Arial, sans-serif. Section labels and compact dates: JetBrains Mono, weights 400 and 500, fallback monospace. Use Next.js font loading with CSS variables --font-heading, --font-body and --font-mono; serve fonts locally with swap behavior. Load only required weights and Latin/Latin Extended coverage for accented names. No remote runtime font request is required. Retain font license notices. Fonts must not conceal content while loading.
DD-03 Typography scale
H1: clamp(2.75rem, 1.5rem + 4vw, 6rem), weight 600, line-height 1.05, tracking -0.035em. Section H2: clamp(2rem, 1.4rem + 2vw, 4rem), weight 500, line-height 1.1, tracking -0.025em. Entry H3: 20px on phones and 24px on desktop, weight 500, line-height 1.3. Body: 16px on phones and 18px on desktop, line-height 1.6, weight 400. Navigation/actions: 16px, weight 500, line-height 1.4. Technical labels: 12px, line-height 1.5, tracking 0.08em. Keep body lines around 60–75 characters; do not apply uppercase or monospaced styling to long paragraphs.
DD-04 Semantic color tokens
--color-bg: #090C10, page background. --color-surface: #10151B, optional subtle hover surface. --color-text: #F2F5F7, headings and primary content. --color-text-muted: #8B96A5, secondary descriptions and dates. --color-accent: #C4FF48, active navigation, selected arrows and focus. --color-divider: #26313C, decorative separators only. --color-control-border: #66717F, visible outlined controls. --color-on-accent: #090C10, text on lime actions. --color-hover-text: #FFFFFF. Define these once in CSS and reference tokens throughout components.
Calculated contrast against #090C10: primary text 17.90:1; muted text 6.54:1; lime accent 16.56:1; control border 3.95:1. Decorative divider contrast is only 1.48:1, so it must not be the sole boundary of an interactive control or carry essential information. Recheck contrast for every composited surface or changed background during implementation. Never use lime body paragraphs or opacity to dim required text below its contrast target.
DD-05 Spacing geometry and iconography
Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 and 128px. Main container maximum width 1280px. Keep the responsive padding and breakpoints specified earlier. Use 1px borders, 4px button radius and 6px optional panel radius. Avoid pill badges and large rounded cards. Use a consistent thin-stroke icon family, such as Lucide, at 18–20px; pair contact icons with text. Decorative arrows are aria-hidden. An arrow appears as an actionable affordance only when the row has a real destination.
DD-06 Interaction states
Primary CV action: transparent background, #66717F border and #F2F5F7 label; hover uses #10151B surface and #C4FF48 border. Secondary text links: #F2F5F7 label with a small lime arrow; hover adds an underline. Focus-visible: 2px lime outline with 4px offset; do not remove browser focus without an equivalent. Pressed actions use the hover surface and an optional 1px translation. Controls have a minimum 44px target height. Disabled controls, if ever needed, must use native disabled semantics and a clear label; do not ship a disabled CV action. Active navigation uses an underline plus text styling, not color alone.
DD-07 Responsive behavior
Mobile-first layout. Below 768px, stack section content and actions; do not shrink long experience descriptions into desktop columns. At 768–1023px, preserve stacked experience and education entries. At 1024px and above, allow aligned multicolumn rows. Expand full navigation only when it fits, with 1200px as the initial threshold. Support 320px width, natural text wrapping and 200% zoom. The decorative wave cannot determine hero height or force horizontal overflow. Test the exact viewport widths listed in Release checks.
DD-08 Motion hierarchy
Use Line Waves only in the hero and Split Text only for the initial name reveal. Section entrances remain brief and optional. Magnet and Spotlight are optional polish, not launch dependencies. Keep core information visible immediately; animations progressively enhance it. Reduced motion removes stagger, magnetic movement and continuous wave animation. Coarse-pointer devices receive static or simplified decoration. Motion styling must not change reading order, click targets or focus visibility.
DD-09 Content and section hierarchy
Maintain the section order Profile → Skills → Experience → Contributions → Education → Certifications & Courses → Contact. Present experience in reverse chronology and skills in meaningful groups. Keep dates and job titles visible without accordion expansion. Treat employer contributions as evidence of experience, not public standalone products. Credentials require verified records; omit empty credentials and their nav link on production. Use one H1 and coherent H2/H3 nesting.
DD-10 Architecture and source of truth
Next.js App Router with TypeScript and typed repository content is the launch baseline. Choose CSS variables with Tailwind utility classes for responsive composition; keep raw color and font values in the central token layer. Server-render professional content and use small client islands for interaction. This Google Doc is the product specification; repository content is the runtime data source. Drive image links are review references. The site serves its own CV and production assets.
DD-11 Scope and unresolved inputs
Launch includes the public English CV page, responsive navigation, downloadable CV, contact links, semantic HTML, restrained motion, metadata and print styling. Authentication, a CMS, a blog, a contact-form service and a theme switcher are future scope. Content inputs still required: verified credentials, final downloadable CV asset and optional exact research URLs. Hosting account and production configuration are delivery dependencies. Font families and colors are now fixed by DD-02 and DD-04.
DD-12 Change control
When a design choice changes, update its DD identifier and the affected requirements in this document before revising Trello acceptance criteria. Preserve previous renders as history, clearly label replacements and update the current reference links. Requirement IDs remain stable; split implementation work into linked child cards rather than changing the meaning of an existing requirement.
Requirements for the Future Trello Backlog
Suggested board name: boviedos.dev — Website Delivery. Suggested lists: Backlog, Ready, In Progress, Review, Done. These are planning definitions for the later board creation. Use labels Foundation, UI, Content, Motion, Accessibility, SEO and Delivery. Mark a card Blocked when an input is missing, and record the blocker in its description.
Card template
Title: [REQ-ID] Verb plus concrete outcome. Description: user outcome; scope; linked specification and DD IDs; direct render URL where applicable; dependencies and inputs; implementation notes. Acceptance checklist: observable behavior, responsive behavior and failure/reduced-motion behavior as applicable. Add validation evidence, owner and priority when creating the actual card. Do not copy vague statements such as make it modern as acceptance criteria.
REQ-01 Foundation and tokens
Priority P0. Decisions DD-02, DD-03, DD-04, DD-05 and DD-10. No dependency. Outcome: establish the Next.js/TypeScript shell and central design tokens. Acceptance: pinned dependencies and reproducible build; all three font families mapped to CSS variables; tokens match the specified hex values; no runtime third-party font request; sample headings and actions use the defined typography and states.
REQ-02 Navigation and responsive shell
Priority P0. Depends on REQ-01. Decisions DD-06 and DD-07. Acceptance: sticky navigation anchors resolve to existing sections; compact menu works by keyboard, touch and Escape with focus return; active item is visible; anchor targets are not hidden behind the header; no overflow at 320–1440px or 200% zoom; empty credentials do not create a dead link.
REQ-03 Profile and CV download
Priority P0. Depends on REQ-01 and the final CV asset. Decisions DD-03 and DD-09. Reference: English Profile render 01. Acceptance: name, role, summary, location, languages and current employer match approved content; Download CV returns the actual readable PDF; Get in touch targets Contact; text remains visible without motion or JavaScript.
REQ-04 Skills
Priority P0. Depends on REQ-01. Decisions DD-07 and DD-09. Reference: English Skills render 02. Acceptance: all five groups are searchable HTML text; basic Docker/Kubernetes knowledge stays explicit; no proficiency percentages or ratings; categories stack on mobile without truncating technologies.
REQ-05 Experience
Priority P0. Depends on REQ-01 and validated employment content. Decisions DD-07 and DD-09. Reference: English Experience render 03. Acceptance: Moody’s, Daugherty/CGI and Edify display the specified dates, roles and bullets; reverse chronology is preserved; full text and dates remain visible on mobile; informational rows have no misleading link affordances.
REQ-06 Contributions
Priority P0. Depends on REQ-05. Decisions DD-09. Reference: English Contributions render 04. Acceptance: three contributions link conceptually to the correct employment context; no invented metrics, client claims or conceptual dashboard screenshots appear; case-study actions exist only with actual reviewed destinations.
REQ-07 Education and research
Priority P0. Depends on REQ-01. Decisions DD-09. Reference: English Education render 05. Acceptance: institution, qualification, dates and conference details match the specification; unverified research destinations remain plain text; long paper title wraps legibly on 320px screens.
REQ-08 Certifications and courses
Priority P1. Depends on REQ-01 and verified credential records. Decisions DD-09 and DD-11. Reference: English Credentials render 06. Acceptance: certifications and courses are distinct groups; each published record has title, issuer and date; verification links are real when present; expiry information is represented when relevant; missing records hide the section/nav item; no bracketed placeholders or pending-content warning reach production.
REQ-09 Contact and print view
Priority P0. Depends on REQ-03. Decisions DD-06 and DD-09. Reference: English Contact render 07. Acceptance: mailto, tel and clean LinkedIn links resolve to approved destinations; CV action works; external-link behavior is accessible; print output uses readable black text on white, removes navigation/motion and preserves section order.
REQ-10 Motion and accessibility
Priority P0 for accessibility and fallbacks; P1 for optional polish. Depends on REQ-02 through REQ-09 as available. Decisions DD-06 and DD-08. Acceptance: reduced motion disables continuous/staggered/magnetic effects; decorative wave is hidden from assistive technology and pauses offscreen; keyboard focus remains visible; headings and landmarks are correct; content survives canvas/JavaScript failure; stated contrast targets pass in every relevant state.
REQ-11 SEO and performance
Priority P0. Depends on REQ-03 through REQ-09. Decisions DD-10. Acceptance: production metadata, canonical, Open Graph image, robots and sitemap are correct; previews are not indexed; structured data contains truthful values; no hydration errors or animation-blocked content; Lighthouse targets are measured under recorded conditions. Field INP is monitored after sufficient production traffic, not claimed from a lab run.
REQ-12 QA and deployment
Priority P0. Depends on all launch P0 cards and hosting/domain access. Decisions DD-07, DD-11 and DD-12. Acceptance: type checks, lint and build pass; required viewport and browser checks have evidence; link/CV checks pass; HTTPS and canonical redirect work; final content contains no placeholders; deployment has a known rollback revision. Unverified credentials can remain blocked while the launch hides their empty section.
Definition of Ready and Definition of Done
Ready: scope, DD/REQ references, required content, render reference, dependencies and measurable acceptance criteria are present. Done: implementation reviewed; acceptance checks and responsive/accessibility evidence attached; no new console errors; build passes; specification updated if behavior changed. A screenshot alone does not prove functional completion.