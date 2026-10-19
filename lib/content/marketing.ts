export type ServiceDetail = {
  title: string;
  detail: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type MarketingService = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  situation: string;
  buyerProblems: string[];
  supportedOutcomes: string[];
  deliverables: ServiceDetail[];
  workflow: ServiceDetail[];
  architecture: ServiceDetail[];
  included: string[];
  excluded: string[];
  faqs: ServiceFaq[];
  cta: string;
  ctaDetail: string;
};

export const marketingServices: MarketingService[] = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    shortName: "Custom software",
    summary:
      "Operational systems shaped around the roles, rules, exceptions, and reporting your business actually needs.",
    situation:
      "Choose this when standard software forces your team into workarounds or leaves important handoffs outside the system.",
    buyerProblems: [
      "Critical work is split across spreadsheets, messages, and disconnected tools.",
      "Standard software does not reflect the roles, approvals, or exceptions in the operation.",
      "Teams re-enter the same information or rely on one person to keep the process moving.",
    ],
    supportedOutcomes: [
      "A shared operational record with clearer ownership",
      "Workflows that make approvals and exceptions visible",
      "A maintainable foundation for the next process improvement",
    ],
    deliverables: [
      { title: "Workflow model", detail: "Roles, decisions, information flows, exceptions, and success criteria made explicit before implementation." },
      { title: "Purpose-built system", detail: "Interfaces and business rules shaped around the approved operational scope." },
      { title: "Deployment and handover", detail: "Release responsibilities, documentation, and agreed acceptance checks prepared with the system." },
    ],
    workflow: [
      { title: "Observe", detail: "Map the current workflow and the points where ownership or information breaks down." },
      { title: "Define", detail: "Agree the first useful boundary, user roles, exceptions, and acceptance criteria." },
      { title: "Build", detail: "Deliver reviewable workflow slices so operational feedback arrives while decisions can still change." },
      { title: "Handover", detail: "Validate the agreed scope, document ownership, and identify any later improvements separately." },
    ],
    architecture: [
      { title: "Business rules", detail: "Rules and permissions stay explicit so the system reflects accountable decisions." },
      { title: "Integration boundaries", detail: "Existing systems are connected only where the workflow and data ownership justify it." },
    ],
    included: ["Approved workflows and user roles", "Required interfaces and business rules", "Agreed integrations and acceptance checks"],
    excluded: ["Unapproved adjacent workflows", "Guaranteed commercial or operational results", "Ongoing support unless it is explicitly scoped"],
    faqs: [
      { question: "Do we need a complete specification before starting?", answer: "No. Discovery is used to turn the current operation, constraints, and desired change into an inspectable first scope." },
      { question: "Can an existing tool remain part of the workflow?", answer: "Yes, when keeping or integrating it is more responsible than replacing it. That decision is made after its role and data boundaries are understood." },
    ],
    cta: "Map the workflow before choosing the feature list.",
    ctaDetail: "Bring the current process, the people involved, and the breakdown your team sees most often.",
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    shortName: "Web applications",
    summary:
      "Portals, dashboards, admin systems, and customer-facing platforms designed for clear everyday operation.",
    situation:
      "Choose this when teams or customers need secure access to shared data, actions, approvals, and reporting.",
    buyerProblems: [
      "Customers or staff cannot complete a connected workflow in one place.",
      "Operational data is available but difficult to act on, review, or govern.",
      "An admin process has grown beyond forms, email, and manual status updates.",
    ],
    supportedOutcomes: [
      "A responsive interface around the priority workflow",
      "Clearer role, permission, and status boundaries",
      "A web platform that can be reviewed and extended deliberately",
    ],
    deliverables: [
      { title: "Application experience", detail: "Responsive user journeys for the approved customer, staff, or administrative roles." },
      { title: "Operational backend", detail: "Business rules, permissions, data handling, and administration required by those journeys." },
      { title: "Connected release", detail: "Agreed integrations, deployment setup, validation, and handover for the published scope." },
    ],
    workflow: [
      { title: "Journey definition", detail: "Identify who needs to act, what they need to know, and where the current journey loses clarity." },
      { title: "Interface and rules", detail: "Model states, permissions, edge cases, and responsive behavior together." },
      { title: "Vertical delivery", detail: "Review complete slices from interface through data and administration." },
      { title: "Release check", detail: "Validate the agreed browsers, devices, roles, and operational ownership before handover." },
    ],
    architecture: [
      { title: "Role-aware access", detail: "Permissions are designed around real responsibilities, not added as a final interface setting." },
      { title: "Responsive behavior", detail: "Priority tasks are designed for their actual screen contexts rather than merely compressed." },
    ],
    included: ["Approved user journeys", "Responsive application interface", "Required backend, administration, and integrations"],
    excluded: ["Every possible user request in the first release", "Third-party platform behavior outside project control", "Traffic or conversion guarantees"],
    faqs: [
      { question: "Is this limited to public websites?", answer: "No. The service is intended for interactive web software such as portals, dashboards, admin systems, and customer platforms." },
      { question: "How are permissions handled?", answer: "Roles and sensitive actions are defined with the workflow and then validated as part of the approved scope." },
    ],
    cta: "Define the web journey people need to complete.",
    ctaDetail: "Bring the users, decisions, data, and access constraints that shape the platform.",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Mobile applications",
    summary:
      "Mobile tools for customers, field teams, staff, and workflows that need to move beyond the desktop.",
    situation:
      "Choose this when the work happens on-site, in transit, at a branch, or directly in a customer's hands.",
    buyerProblems: [
      "The task happens away from a desk but the current system assumes desktop access.",
      "Field or branch activity reaches the core operation late or without enough context.",
      "A customer journey needs device-native access to a focused set of actions.",
    ],
    supportedOutcomes: [
      "A focused mobile journey for the priority task",
      "Clearer connection between mobile activity and administration",
      "Release decisions grounded in device and store constraints",
    ],
    deliverables: [
      { title: "Mobile experience", detail: "Approved journeys designed around touch, attention, connectivity, and device context." },
      { title: "Backend and administration", detail: "The services, permissions, and operational controls needed behind the app." },
      { title: "Release preparation", detail: "Agreed device validation, build ownership, and store-readiness support within scope." },
    ],
    workflow: [
      { title: "Context review", detail: "Understand where, when, and under what constraints the mobile task happens." },
      { title: "Journey prototype", detail: "Test the priority flow and information hierarchy before expanding the surface area." },
      { title: "App and operations", detail: "Build the mobile journey alongside the backend and admin responsibilities it creates." },
      { title: "Release preparation", detail: "Validate agreed devices and document the responsibilities surrounding distribution." },
    ],
    architecture: [
      { title: "Connectivity", detail: "Network assumptions and failure states are defined from the actual operating context." },
      { title: "Operational counterpart", detail: "Mobile actions are connected to the administration and review workflow they require." },
    ],
    included: ["Approved mobile journeys", "Required backend and admin controls", "Agreed build and release preparation"],
    excluded: ["App-store approval guarantees", "Unsupported device coverage", "Unscoped web or desktop products"],
    faqs: [
      { question: "Do we need both iOS and Android?", answer: "That depends on the users, distribution context, device constraints, and approved release strategy. It is a scope decision, not a default assumption." },
      { question: "Does the mobile app include an admin system?", answer: "When the workflow needs administration, review, or support controls, those responsibilities are included in the proposed system boundary." },
    ],
    cta: "Scope the task that must work away from the desk.",
    ctaDetail: "Bring the device context, users, connectivity assumptions, and the action that matters most.",
  },
  {
    slug: "mvp-saas-development",
    name: "MVP & SaaS Development",
    shortName: "MVP & SaaS",
    summary:
      "Focused product delivery that tests the important assumptions without confusing a prototype with production software.",
    situation:
      "Choose this when a new product needs scope discipline, a dependable first release, and a credible route to iteration.",
    buyerProblems: [
      "A product idea contains too many assumptions to fund as one undifferentiated build.",
      "The first release needs to be credible without pretending to solve the whole roadmap.",
      "Product, commercial, and technical decisions are moving without a shared release boundary.",
    ],
    supportedOutcomes: [
      "A first release tied to explicit product assumptions",
      "A visible distinction between prototype, MVP, and later roadmap",
      "A technical and operational base that can be evaluated after launch",
    ],
    deliverables: [
      { title: "Product definition", detail: "Users, problem, assumptions, constraints, and evidence needs translated into a release decision." },
      { title: "Release-ready scope", detail: "A coherent first product with the necessary operational and administrative support." },
      { title: "Learning roadmap", detail: "Deferred capabilities and next decisions recorded separately from the approved release." },
    ],
    workflow: [
      { title: "Assumption map", detail: "Separate what is known, what is believed, and what the first release needs to learn." },
      { title: "Release boundary", detail: "Prioritize a coherent journey and identify the operational work required behind it." },
      { title: "Product delivery", detail: "Review usable increments against the approved product and quality criteria." },
      { title: "Learning handover", detail: "Document deferred decisions and the evidence needed before expanding the roadmap." },
    ],
    architecture: [
      { title: "Change boundary", detail: "Architecture follows the confirmed first release while preserving identified expansion seams." },
      { title: "Product operations", detail: "Administration, support, and data responsibilities are treated as part of the product." },
    ],
    included: ["Approved first-release journey", "Necessary product operations", "Deferred-scope and learning record"],
    excluded: ["An entire long-term roadmap in the MVP", "Market traction or investment guarantees", "Features without a first-release responsibility"],
    faqs: [
      { question: "Is an MVP the smallest possible feature list?", answer: "Not necessarily. It is the smallest coherent release that can serve its defined user and test the important assumptions responsibly." },
      { question: "Can the roadmap change during delivery?", answer: "Yes. New information can change priorities, but its effect on the approved release is kept visible rather than silently absorbed." },
    ],
    cta: "Turn the product idea into a release decision.",
    ctaDetail: "Bring the user, problem, important assumptions, and the evidence the first release should create.",
  },
  {
    slug: "ai-workflow-automation",
    name: "AI & Workflow Automation",
    shortName: "AI & automation",
    summary:
      "Human-reviewed automation for repetitive information work, connected to a real process and a measurable decision.",
    situation:
      "Choose this when teams repeatedly read, classify, summarize, search, or move information between systems.",
    buyerProblems: [
      "Skilled people spend time repeatedly sorting, extracting, or moving information.",
      "An AI experiment exists but its review, failure, and ownership model is unclear.",
      "A rule-based handoff could be automated, but exceptions still need responsible human decisions.",
    ],
    supportedOutcomes: [
      "An automation opportunity tied to a defined workflow",
      "Visible review and exception handling around uncertain output",
      "An evaluation approach that can reveal when the system should not act",
    ],
    deliverables: [
      { title: "Opportunity assessment", detail: "Task frequency, inputs, decision risk, failure cost, and human ownership examined before implementation." },
      { title: "Evaluated workflow", detail: "Automation and review steps designed around representative examples and explicit exceptions." },
      { title: "Monitored system", detail: "Operational controls and agreed signals for reviewing output after release." },
    ],
    workflow: [
      { title: "Qualify", detail: "Determine whether AI, deterministic automation, process change, or no build is the responsible answer." },
      { title: "Evaluate", detail: "Use representative inputs and failure cases to define acceptable assisted behavior." },
      { title: "Integrate", detail: "Place the automation inside the real workflow with ownership, review, and exception paths." },
      { title: "Monitor", detail: "Keep output review and later adjustment responsibilities visible after handover." },
    ],
    architecture: [
      { title: "Human control", detail: "Higher-consequence decisions retain an explicit review or approval boundary." },
      { title: "Evaluation", detail: "Representative inputs and failure cases matter more than a polished isolated demonstration." },
    ],
    included: ["Approved automation workflow", "Evaluation and exception approach", "Agreed review and monitoring controls"],
    excluded: ["Accuracy guarantees", "Autonomous high-consequence decisions without agreed oversight", "AI where a simpler rule or process change is more appropriate"],
    faqs: [
      { question: "When should AI not be used?", answer: "When the task can be solved more reliably with clear rules, when representative data is unavailable, or when failure cannot be managed by the proposed workflow." },
      { question: "Can a human review the output?", answer: "Yes. Review, escalation, and exception ownership are designed with the workflow instead of treated as a fallback after launch." },
    ],
    cta: "Test the automation opportunity against the real workflow.",
    ctaDetail: "Bring representative inputs, the current manual decision, and examples of what must not go wrong.",
  },
  {
    slug: "integrations-modernization-support",
    name: "Integrations, Modernization & Support",
    shortName: "Integrations & support",
    summary:
      "Risk-managed improvements for existing software, data flows, APIs, deployments, and ongoing operations.",
    situation:
      "Choose this when useful software already exists but has become disconnected, fragile, difficult to change, or hard to support.",
    buyerProblems: [
      "Useful systems hold related data but still depend on manual transfer and reconciliation.",
      "A production system is difficult to change because ownership, dependencies, or deployment are unclear.",
      "The team needs a safer improvement path than a full replacement project.",
    ],
    supportedOutcomes: [
      "A clearer map of the current system and its risks",
      "A staged integration or modernization path",
      "Explicit ownership for deployment, documentation, and agreed support",
    ],
    deliverables: [
      { title: "System review", detail: "Current responsibilities, dependencies, data flows, constraints, and failure points documented." },
      { title: "Change plan", detail: "A staged integration, migration, or modernization boundary with review and rollback considerations." },
      { title: "Operational handover", detail: "Agreed documentation, deployment ownership, and support responsibilities made explicit." },
    ],
    workflow: [
      { title: "Inventory", detail: "Identify what exists, who depends on it, and where operational knowledge currently lives." },
      { title: "Risk boundary", detail: "Separate urgent stability issues from structural changes and optional improvements." },
      { title: "Stage the change", detail: "Deliver reviewable steps with validation around data, interfaces, and existing users." },
      { title: "Transfer ownership", detail: "Document the resulting system and the support boundary actually agreed." },
    ],
    architecture: [
      { title: "System boundaries", detail: "Ownership and data movement are made explicit before introducing another connection." },
      { title: "Staged change", detail: "Migration and replacement decisions are sized around operational risk and reversibility." },
    ],
    included: ["Approved system and dependency review", "Scoped integration or modernization work", "Agreed documentation and support boundary"],
    excluded: ["Unreviewed replacement of working systems", "Unlimited maintenance", "Responsibility for undocumented third-party changes outside scope"],
    faqs: [
      { question: "Does modernization require a full rewrite?", answer: "No. The review may support staged improvements, isolation of fragile areas, integration, or replacement. A rewrite is one option, not the default." },
      { question: "Is ongoing support automatically included?", answer: "No. Support responsibilities, response expectations, and exclusions need to be explicitly agreed for the system in question." },
    ],
    cta: "Make the current system understandable before changing it.",
    ctaDetail: "Bring the system map you have, the recurring failure or bottleneck, and the people who depend on it.",
  },
];

export function getMarketingService(slug: string) {
  return marketingServices.find((service) => service.slug === slug);
}
