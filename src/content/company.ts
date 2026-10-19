/**
 * Editorial starting content for the Imadi Innovations website.
 * Baseline company/project facts are grounded in the existing public website.
 * Source-based case-study enrichments live in project-case-studies.ts; see
 * CASE-STUDY-SOURCES.md for the local documentation/source evidence.
 * No illustrative testimonials, statistics, or measured project outcomes are seeded.
 * See work/content-research.md for sources and editorial decisions.
 */

export const company = {
  name: 'Imadi Innovations',
  tagline: 'Thoughtful design. Practical software.',
  description:
    'We design and build mobile apps, web platforms, desktop software, and connected workflows around the way your business works.',
  email: 'hello@imadi-innovations.com',
  phone: '+92 333 036 5252',
  address: 'Karachi, Pakistan',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/imadi-innovations' },
    { label: 'WhatsApp', href: 'https://wa.me/923330365252' },
  ],
}

export const hero = {
  eyebrow: 'DESIGN MEETS DEVELOPMENT',
  lines: ['Designing the Next', 'Generation of', 'Business Software.'],
  highlightLine: 2,
  description:
    'From the first sketch to the systems behind it, we turn complex workflows into clear digital experiences. Built for your people. Ready for your next chapter.',
}

export const services = [
  {
    title: 'Mobile Applications',
    slug: 'mobile-applications',
    summary: 'Useful experiences, wherever work happens.',
    description:
      'Give customers and teams a simpler way to get things done. We design and develop mobile applications for customer services, field operations, delivery workflows, and everyday business tasks.',
    benefits: [
      'Clear journeys for customers and staff',
      'Android and iOS experiences designed for real use',
      'Connected accounts, dashboards, and notifications',
      'Offline requirements considered from the start',
    ],
  },
  {
    title: 'Custom Web Software',
    slug: 'custom-web-software',
    summary: 'Your operations, brought into one clear view.',
    description:
      'Replace disconnected spreadsheets and repeated follow-ups with a web platform shaped around your workflow. We build portals, dashboards, CRMs, booking tools, and business systems that help the right people see and do the right things.',
    benefits: [
      'Workflows that reflect how your team operates',
      'Role-based views and approval processes',
      'Connected records, reports, and business tools',
      'An interface that stays useful as your needs grow',
    ],
  },
  {
    title: 'Desktop Systems',
    slug: 'desktop-systems',
    summary: 'Dependable tools for the work at your counter.',
    description:
      'Build practical desktop software for shops, offices, and operational teams. From billing and inventory to printing and local workflows, we plan around the devices, connectivity, and working conditions your team actually has.',
    benefits: [
      'Purpose-built billing and inventory workflows',
      'Printing and device integration planned around your setup',
      'Offline workflows where the project requires them',
      'Clear screens for daily repetitive tasks',
    ],
  },
  {
    title: 'SaaS Products',
    slug: 'saas-products',
    summary: 'From a promising idea to a usable product.',
    description:
      'Turn a business problem into a focused product people can understand and use. We help shape the first release, design the experience, build the platform, and create a foundation for learning from real users.',
    benefits: [
      'A clear first release with a manageable scope',
      'User journeys, accounts, and administration',
      'A reusable foundation for future features',
      'Product improvements guided by user feedback',
    ],
  },
  {
    title: 'AI Integrations',
    slug: 'ai-integrations',
    summary: 'Less repetitive work. More room to think.',
    description:
      'Put AI to work on a specific, useful task. We connect document reading, search, summaries, and workflow assistance to your existing tools, with review steps that keep your team in control.',
    benefits: [
      'Document extraction and structured information',
      'Search and summaries grounded in your content',
      'Connections to existing APIs and business systems',
      'Human review for work that needs a decision',
    ],
  },
]

export const problems = [
  {
    title: 'Too many tools. No clear picture.',
    description:
      'Orders in messages, stock in spreadsheets, and updates in someone’s head. We bring the pieces together so your team can work from shared information.',
  },
  {
    title: 'Good people doing repetitive work.',
    description:
      'Repeated entry and manual follow-ups take attention away from customers. We map the busywork and build a simpler path through it.',
  },
  {
    title: 'Software that makes work harder.',
    description:
      'Your team should not have to work around a confusing interface. We shape the experience around real tasks, clear steps, and practical decisions.',
  },
  {
    title: 'An idea waiting for a first step.',
    description:
      'You do not need every feature on day one. We help define the problem, choose a focused first release, and turn your idea into something you can use.',
  },
]

export const processSteps = [
  {
    title: 'Understand the work',
    description:
      'We listen to your team, map the current process, and find the places where work slows down or information gets lost.',
  },
  {
    title: 'Make a clear plan',
    description:
      'Together, we define the users, priorities, screens, integrations, and scope of the first release.',
  },
  {
    title: 'Design the experience',
    description:
      'We turn the plan into clear journeys and interfaces, so you can review how the product will work before development moves ahead.',
  },
  {
    title: 'Build and review',
    description:
      'We develop the software in reviewable stages, share progress, and test the important workflows with you.',
  },
  {
    title: 'Launch and keep improving',
    description:
      'We prepare the release, help your team get started, and plan the next improvements around what real use reveals.',
  },
]

export const faqs = [
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'We work with businesses and teams that need clearer ways to manage their operations. Our public portfolio includes healthcare administration, HR, logistics, event coordination, restaurant operations, education, and wellness.',
  },
  {
    question: 'Can you improve an existing system?',
    answer:
      'Yes. We can start by reviewing your current software, workflow, and technical setup. From there, we can recommend a focused improvement, a new integration, or a phased rebuild based on what is worth keeping.',
  },
  {
    question: 'Do we need a detailed specification before we talk?',
    answer:
      'No. Bring the problem, a few examples of the current process, and the outcome you want. We can help turn those into a clear scope and practical next steps.',
  },
  {
    question: 'How long will our project take?',
    answer:
      'Timing depends on the scope, integrations, content, and review process. After discovery, we agree on the first release and share a delivery plan. A focused first version is often the best place to start.',
  },
  {
    question: 'How do you work out the project cost?',
    answer:
      'We estimate the work after understanding your goals and the features needed for the first release. The proposal explains the scope, delivery stages, and any separate hosting, service, or maintenance costs.',
  },
  {
    question: 'Can you connect the tools we already use?',
    answer:
      'We can assess integrations with your existing forms, databases, APIs, CRMs, payment services, and other tools. Feasibility depends on the access and integration options each provider offers.',
  },
  {
    question: 'Will we be able to update this website ourselves?',
    answer:
      'Yes. This website is built around editable content and reusable sections. Your team can manage services, projects, articles, FAQs, images, and approved testimonials through the admin panel. New kinds of layouts or features can be added when you need them.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We can plan support, maintenance, and further improvements with you. The support scope, responsibilities, and ongoing costs are agreed separately so expectations stay clear.',
  },
]

export const projectSeeds = [
  {
    title: 'DockiShip',
    slug: 'dockiship',
    summary: 'Connecting inventory, purchasing, and marketplace fulfilment.',
    client: 'DockiShip',
    category: 'Web Applications',
    challenge:
      'E-commerce operations bring together stock, suppliers, warehouses, sales channels, and shipments. Teams need a shared view of those moving parts to manage the work.',
    solution:
      'A central web platform for product and variant records, warehouse stock movement, purchase orders, supplier management, and marketplace fulfilment workflows, with role-based access for operational teams.',
    results: [
      'Inventory and warehouse movement in a shared workspace',
      'Purchasing and supplier records connected to stock',
      'Order, shipping, tracking, and returns workflows',
    ],
    published: true,
  },
  {
    title: 'eClinicAssist',
    slug: 'eclinicassist',
    summary: 'A clearer workspace for healthcare administration.',
    client: 'eClinicAssist',
    category: 'Web Applications',
    challenge:
      'Healthcare administration involves provider records, facilities, payer requirements, documents, and time-sensitive follow-ups. Those relationships need to remain visible as work moves between teams.',
    solution:
      'A cloud-based operations platform bringing together the provider directory, credentialing, compliance tracking, payer portal records, revenue cycle issues, and operational reporting.',
    results: [
      'A central directory for providers, practices, and facilities',
      'Credentialing documents and status tracking',
      'Operational reports and revenue cycle issue visibility',
    ],
    published: true,
  },
  {
    title: 'LyncHR',
    slug: 'lynchr',
    summary: 'Employee operations, connected from attendance to payroll.',
    client: 'LyncHR',
    category: 'Web Applications',
    challenge:
      'Employee records, attendance, leave, and payroll are closely related. Managing them in separate places makes everyday administration difficult to follow.',
    solution:
      'An HR management platform with employee profiles, roles and departments, attendance and leave workflows, salary processing, benefits, and settlement records.',
    results: [
      'Employee profiles and team structure in one place',
      'Attendance, leave requests, and approvals',
      'Payroll, salary slips, and benefit processing',
    ],
    published: true,
  },
  {
    title: 'PMO Karachi',
    slug: 'pmo-karachi',
    summary: 'Helping event teams coordinate people, tasks, and progress.',
    client: 'Project Management Office Karachi',
    category: 'Web & Mobile',
    challenge:
      'Event operations depend on many teams working towards shared deadlines. People need to know their responsibilities, find the right information, and see progress across departments.',
    solution:
      'A web and mobile operations platform for event planning, department and zone organisation, member roles, task assignment, dashboards, team communication, and document sharing.',
    results: [
      'Event, department, and member organisation',
      'Task assignments and progress dashboards',
      'Shared communication, notes, and documents',
    ],
    published: true,
  },
  {
    title: 'Magnet Cargo',
    slug: 'magnet-cargo',
    summary: 'Bringing shipment booking and delivery operations together.',
    client: 'Magnet Cargo Shipping & Logistic LLC',
    category: 'Web Applications',
    challenge:
      'Shipment requests need to move from the customer to operations and on to the driver, with booking details and delivery updates kept together.',
    solution:
      'A logistics web application combining public pickup bookings, driver delivery updates, collected cash records, and an administration dashboard for bookings and driver accounts.',
    results: [
      'Structured customer shipment booking',
      'Driver assignments and delivery status updates',
      'Administrative visibility into booking activity',
    ],
    published: true,
  },
  {
    title: 'Restro',
    slug: 'restro',
    summary: 'Turning catering enquiries into organised daily operations.',
    client: 'Restro',
    category: 'Web Applications',
    challenge:
      'Catering orders arrive through conversations, while kitchen planning needs structured order details, dates, menu items, and payment information.',
    solution:
      'A catering operations tool that extracts details from unstructured messages, organises orders, connects scheduling with Google Calendar, and gives administrators tools to review orders, pricing, and payments.',
    results: [
      'Structured order information with administrative review',
      'Calendar-connected scheduling for kitchen planning',
      'Customer, menu, payment, and workload visibility',
    ],
    published: true,
  },
  {
    title: 'One Window System',
    slug: 'one-window-system',
    summary: 'A connected web and mobile workspace for education management.',
    client: 'OWS',
    category: 'Web & Mobile',
    challenge:
      'Education operations need information to remain accessible across administrative workflows and the devices people use.',
    solution:
      'A custom web and mobile solution for education system management, with a connected backend and interfaces for its users.',
    results: ['Web and mobile access to education management workflows'],
    published: true,
  },
  {
    title: 'Nutrilife',
    slug: 'nutrilife',
    summary: 'A mobile companion for nutrition and everyday wellbeing.',
    client: 'Nutrilife',
    category: 'Mobile Apps',
    challenge:
      'Health goals and everyday habits need an experience that is easy to return to on a mobile device.',
    solution:
      'A mobile application focused on nutrition tracking, health goals, and wellness habits.',
    results: ['A mobile experience for nutrition and wellness tracking'],
    published: true,
  },
]

export const postSeeds = [
  {
    title: 'When your spreadsheets become a software brief',
    slug: 'when-spreadsheets-become-a-software-brief',
    excerpt:
      'You do not need to throw away a process that works. Start by finding the handoffs, repeated entry, and missing visibility that slow it down.',
    body: [
      'A spreadsheet is often the first useful business system. It is familiar, flexible, and quick to change. The difficulty starts when several people need to update the same information, follow the same approval steps, or know which version is current.',
      'Before choosing software, map one complete piece of work. Where does an order or request begin? Who adds information? What gets copied into another sheet? Who decides what happens next? Use a real example and follow it all the way to completion.',
      'Look for three practical signals: the same information is entered repeatedly, progress depends on asking someone for an update, or important decisions rely on a report that takes too long to prepare. These are useful starting points for a project brief.',
      'Keep the first release focused. One shared customer record, one clear order flow, or one reliable approval queue can be more useful than a long list of disconnected features. Decide what a completed task should look like and how you will check it.',
      'Plan the move as carefully as the build. Agree which records to bring across, who can edit them, how exceptions are handled, and how the team will learn the new process. The goal is a clearer working day, with software supporting the people doing the work.',
    ],
    published: false,
  },
  {
    title: 'A useful first release starts with a smaller question',
    slug: 'a-useful-first-release-starts-with-a-smaller-question',
    excerpt:
      'Instead of asking for every feature, ask what the first version must help a real person finish. That is where a focused product begins.',
    body: [
      'An early product idea usually comes with plenty of possibilities. Accounts, notifications, reports, subscriptions, integrations, and a mobile app may all sound essential. A useful first release begins by deciding which problem needs an answer first.',
      'Choose a user and a specific task. A customer needs to make a booking. A coordinator needs to assign work. A shop owner needs to record a sale and see the remaining stock. Describe the beginning, the decision points, and the finished result in plain language.',
      'Sketch that journey before discussing the full feature list. Include the awkward moments: missing information, cancelled requests, incorrect entries, or a person without the right access. These details reveal the work the interface and backend actually need to do.',
      'Separate the first release from later improvements. The first release should complete the chosen journey coherently. Features that support another user group or an occasional edge workflow can be planned for a later stage when appropriate.',
      'Finally, decide what you want to learn from use. Can people complete the task? Where do they hesitate? What does the team still handle outside the system? Those observations give the next release a purpose beyond simply adding more screens.',
    ],
    published: false,
  },
  {
    title: 'Where AI belongs in a business workflow',
    slug: 'where-ai-belongs-in-a-business-workflow',
    excerpt:
      'Start with a repeatable task, connect it to the right information, and give people a clear way to review the result.',
    body: [
      'A useful AI project starts with work people already understand. Reading an incoming document, finding information in a knowledge base, or preparing a first summary are clearer starting points than adding a chatbot without a defined purpose.',
      'Pick one task and describe the input and expected output. For document extraction, list the fields needed and show examples of different document layouts. For search, decide which sources the answer should use. For summaries, explain what the reader needs to decide next.',
      'Design the review step at the same time as the automation. A person should be able to see the source, correct a result, and know whether the output has been accepted. Business records and decisions need a clear path beyond a generated response.',
      'Consider access before connecting information. The system should respect who is allowed to view a record, which service processes it, and how long the input and output are retained. These choices belong in the project scope.',
      'Test with examples from the real workflow, including unclear inputs and missing information. Observe the time needed for both processing and review. Then decide whether to expand the feature, change the task, or keep the simpler approach.',
    ],
    published: false,
  },
]

export const about = {
  eyebrow: 'THE PEOPLE BEHIND THE PRODUCT',
  title: 'We make complex work',
  highlight: 'feel simpler.',
  description:
    'Imadi Innovations is a Pakistan-based software team working with businesses that want clearer processes, useful digital tools, and room to grow.',
  story: [
    'The most useful software starts with understanding the work. Who uses the system? What do they need to finish? Where does information get lost? We begin there, before choosing screens or technologies.',
    'Our work brings design and development together. We build mobile applications, web platforms, desktop systems, and integrations for operational challenges across healthcare administration, logistics, HR, events, and other business workflows.',
    'We value straightforward communication and practical decisions. That means a clear scope, visible progress, and an experience shaped around the people who will use it every day.',
    'From our base in Karachi, we work with teams remotely and stay involved as ideas become working software. The aim is always the same: a system that makes the next step easier to see and the work easier to manage.',
  ],
}

export const product = {
  title: 'Meet Tijarat.',
  highlight: 'Made for the way you do business.',
  description:
    'Business software being shaped for Pakistani shops, wholesalers, retailers, distributors, and growing teams. Bring billing, stock, customers, suppliers, and accounts into one practical workspace.',
  features: [
    'Billing and invoicing',
    'Inventory and stock movement',
    'Customer and supplier balances',
    'Expenses, payments, and reports',
    'Urdu and English experiences',
    'Workflows shaped by local business needs',
  ],
  ctaLabel: 'Explore Tijarat',
  ctaHref: '/tijarat',
  status: 'Early access',
}

export const testimonials: {
  quote: string
  name: string
  role?: string
  company?: string
}[] = []
