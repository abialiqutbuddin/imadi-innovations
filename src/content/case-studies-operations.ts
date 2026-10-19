import type { CaseStudyContent } from './case-study-types'

/** Public copy supported by work/project-research/operations-projects.json. */
export const operationsCaseStudies: Record<string, CaseStudyContent> = {
  dockiship: {
    summary:
      'A connected operations platform for product catalogs, warehouse stock, supplier purchasing and marketplace fulfillment.',
    challenge:
      'An order depends on more than its shipping status. Product variants, available stock, supplier receipts, labels, costs and returns all affect what a warehouse team can do next. DockiShip brings these relationships into a consistent workflow while keeping each company’s operations and staff permissions in context.',
    solution:
      'We built linked workspaces for inventory, purchasing and orders, supported by warehouse records, role permissions and marketplace integrations. Receiving updates purchasing and stock together; fulfillment keeps label and pickup requirements with the order; physical counts have a review path before inventory adjustments are approved.',
    overview: [
      'DockiShip is a warehouse and fulfillment platform that connects the work around a product, from supplier purchasing and receiving to stock management and customer orders. Company owners, staff and suppliers use views suited to their responsibilities.',
      'TikTok and Temu order integrations sit alongside shipping and tracking tools. Product reports, reorder preparation and selected mobile workflows help teams work with the same operational information across the office and warehouse.',
    ],
    workflowTitle: 'From incoming stock to outgoing orders',
    workflow: [
      {
        title: 'Prepare the purchase',
        description:
          'Create a supplier purchase order, select products and variants, and keep shipment and purchasing details together.',
      },
      {
        title: 'Receive and reconcile',
        description:
          'Receive items into the relevant warehouse and update the related stock and cost records. Review physical counts through the verification queue.',
      },
      {
        title: 'Work the order',
        description:
          'Review incoming orders, labels and item details, then progress through the permitted packing and pickup actions.',
      },
      {
        title: 'Follow through',
        description:
          'Track shipment progress, handle returns or reshipments, and use product reports to review stock and eligible reorder suggestions.',
      },
    ],
    storyTitle: 'Connected at the points that matter',
    story: [
      {
        title: 'Inventory with its operational context',
        paragraphs: [
          'Product variants, warehouses, purchase receipts and order items share related stock information. Transfers and reconciliation give staff tools for everyday movement, while a separate count queue, approval view and history support physical verification.',
        ],
      },
      {
        title: 'Fulfillment beyond a status label',
        paragraphs: [
          'Order screens bring labels, pickup requirements, tracking and exception handling into the same workflow. Returns and reshipments remain linked to the order, with stock and cost rules considered as part of those actions. Marketplace connections bring TikTok and Temu orders into that operational flow.',
        ],
      },
      {
        title: 'Appropriate tools for each team',
        paragraphs: [
          'Owners, permissioned staff and supplier users have distinct entry points and responsibilities. Selected mobile tools let authorized users review orders, perform supported fulfillment updates and count or approve stock, using the same company and permission context as the web application.',
        ],
      },
    ],
    outcomes: [
      { value: 'Connected catalog', label: 'Products and warehouse stock', description: 'Variants, warehouses and stock movements stay related to the purchasing and order workflows that use them.' },
      { value: 'Receiving in context', label: 'Purchasing and inventory', description: 'Supplier orders, receipts, payments and returns have dedicated tools alongside their stock and cost context.' },
      { value: 'Defined fulfillment', label: 'Orders through dispatch', description: 'Labels, packing, pickup, tracking and exceptions form a connected operational workflow.' },
      { value: 'Role-aware access', label: 'Owners, staff and suppliers', description: 'Company scope and permissions shape the views and actions available to each user.' },
    ],
  },
  eclinicassist: {
    summary:
      'A healthcare administration workspace connecting practice and provider records, onboarding, credentialing and revenue-cycle work.',
    challenge:
      'Healthcare administration involves related practices, facilities, providers and documents, with different people responsible for collecting information, reviewing it and following up. The product needs to make those relationships clear, distinguish submitted information from approved records, and give each team an appropriate view of its work.',
    solution:
      'We connected a shared directory with guided intake, document review, credentialing tasks and dedicated revenue-cycle workspaces. OTP-protected submission and correction flows support outside participants, while internal users work through scoped records, review decisions, status updates and reports.',
    overview: [
      'eClinicAssist brings practices, facilities, providers and their supporting information into a shared administrative workspace. Teams can move from organization and provider records to onboarding, credentialing and operational follow-up with the relevant context in view.',
      'Guided intake supports document collection and review before information is applied to live records. Credentialing, collection and authorization workspaces provide their own tasks, logs, assignments and reporting, with role permissions and limited collaboration flows controlling participation.',
    ],
    workflowTitle: 'From invitation to reviewed records',
    workflow: [
      {
        title: 'Prepare and invite',
        description:
          'Create an intake, set the information and credential requirements, and send an invitation to the submitter.',
      },
      {
        title: 'Complete the information',
        description:
          'The submitter verifies access with OTP, adds organization and provider details, uploads requested documents and submits the intake.',
      },
      {
        title: 'Review and correct',
        description:
          'Internal reviewers inspect the submission, record item decisions and request corrections or delegated provider completion where needed.',
      },
      {
        title: 'Apply and follow up',
        description:
          'Apply reviewed information and convert the intake into directory records, then continue relevant credentialing and administrative follow-up.',
      },
    ],
    storyTitle: 'A clearer path through administrative work',
    story: [
      {
        title: 'Connected organizations and people',
        paragraphs: [
          'The directory links practices, facilities, providers and contacts with their supporting information. Teams can understand the relationships around a record and maintain documents, credentials and activity within the relevant administrative context.',
        ],
      },
      {
        title: 'A deliberate review boundary',
        paragraphs: [
          'Intake separates information gathering from finalization. Submitters have focused completion and correction flows, while internal reviewers can inspect items, request missing information and apply approved changes. Progress, reminders and provider completion requests help the team keep the submission moving.',
        ],
      },
      {
        title: 'Workspaces built for follow-up',
        paragraphs: [
          'Credentialing combines tasks, requirements, workflow steps and document reports. Collection supports assignments, batches, saved views and validated imports; authorization tracking adds status, attachments and controlled sharing. Each workspace provides tools that reflect the work being handled.',
        ],
      },
    ],
    outcomes: [
      { value: 'Connected directory', label: 'Practices, facilities and providers', description: 'Related records and supporting information give administrative teams a shared organizational context.' },
      { value: 'Reviewed onboarding', label: 'Collection through finalization', description: 'Invitations, submissions, corrections and conversion form a defined intake workflow.' },
      { value: 'Visible follow-up', label: 'Credentialing and daily queues', description: 'Tasks, status, notes and supporting documents keep operational work attached to the relevant record.' },
      { value: 'Scoped collaboration', label: 'Staff and invited participants', description: 'Role permissions, entity scope and purpose-specific sharing shape how users participate.' },
    ],
  },
  lynchr: {
    summary:
      'An HR workspace connecting employee records, attendance, leave, loans and payroll with role-appropriate views and approvals.',
    challenge:
      'Employee administration crosses several connected areas: personal and official records, working time, leave, loans and pay. Each has its own decisions and history, yet changes in one area can affect another. The platform needs to support employee access and manager review while keeping detailed HR and payroll work in context.',
    solution:
      'We brought employee profiles, time and request workflows, reporting and payroll into a shared application. Profile views expose relevant documents and history; configured approvals support leave and loans; attendance considers shifts, leave and holidays; salary and final-settlement tools provide calculation previews and controlled processing actions.',
    overview: [
      'LyncHR connects employee information with the work that surrounds it: attendance, leave, loans, payroll and reporting. Personal and official profiles bring documents, working-time records and pay-related views into the same employee context.',
      'Employees, managers and administrative teams use tools appropriate to their responsibilities. Request approvals, attendance rules, salary processing and final-settlement previews support detailed HR operations, while announcements and celebrations provide shared spaces for team updates.',
    ],
    workflowTitle: 'Connected employee operations',
    workflow: [
      {
        title: 'Maintain the profile',
        description:
          'Keep personal and official details, documents, assignments and relevant employee history together.',
      },
      {
        title: 'Record time and requests',
        description:
          'Collect device or manual attendance and submit leave or loan requests through the relevant employee tools.',
      },
      {
        title: 'Review with context',
        description:
          'Approvers review requests and their history. Attendance views account for shifts, policies, holidays and approved leave.',
      },
      {
        title: 'Process and report',
        description:
          'Review salary groups and payroll reports, use settlement previews where applicable, and complete permitted payroll actions.',
      },
    ],
    storyTitle: 'Employee context across the working day',
    story: [
      {
        title: 'Profiles that connect the details',
        paragraphs: [
          'Personal information, official records, documents, attendance and payroll are accessible through the employee profile. Role-dependent views provide relevant leave, loan and approval tools without treating each area as an unrelated employee record.',
        ],
      },
      {
        title: 'Time and requests with defined rules',
        paragraphs: [
          'Attendance supports device and manual inputs alongside shift and policy rules, with leave and holiday context considered in the resulting status. Leave and loan workflows connect requests to configured approvers, recorded decisions, balances and installments.',
        ],
      },
      {
        title: 'Detailed payroll administration',
        paragraphs: [
          'Salary groups, disbursement actions, provident-fund and tax reports support the work around monthly pay. Final-settlement tools add editable drafts, calculation previews and permitted finalization actions. Employee reports and manager scope provide an appropriate view of the people behind those records.',
        ],
      },
    ],
    outcomes: [
      { value: 'Connected profiles', label: 'Employee information in context', description: 'Documents, attendance, requests and payroll views are connected through the employee profile.' },
      { value: 'Contextual attendance', label: 'Time, shifts and leave', description: 'Working-time records are interpreted alongside configured policies, holidays and approved leave.' },
      { value: 'Defined approvals', label: 'Leave and loan requests', description: 'Requests have dedicated review actions and supporting decision history.' },
      { value: 'Reviewable payroll', label: 'Salary and settlement tools', description: 'Salary groups, reports and settlement previews support detailed payroll administration.' },
    ],
  },
}
