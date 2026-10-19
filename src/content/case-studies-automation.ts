import type { CaseStudyContent } from './case-study-types'

export const automationCaseStudies: Record<string, CaseStudyContent> = {
  'whatsapp-worker': {
    summary: 'A reusable messaging service for connected applications, sender sessions and delivery updates.',
    challenge: 'Several business applications may need messaging without each rebuilding connection handling, delivery queues and reply routing. Shared sending numbers also need consistent ownership, pacing and visibility across those applications.',
    solution: 'We built a separate messaging worker with application-facing APIs, durable queues, sender checks, delivery receipts and reply webhooks. Business rules remain in the application that requests the message.',
    overview: [
      'WhatsApp Worker provides a shared transport layer for connected business applications. It handles account linking, sender sessions, queued messages, delivery updates and incoming replies, allowing each application to keep its own customer and workflow rules.',
      'Messages carry application references and duplicate-request keys. Connection recovery and operating limits are managed by the worker, while an operator view provides visibility into connected numbers and queue status. Replies and receipts return to the application through durable webhooks.'
    ],
    workflowTitle: 'How an application uses the worker',
    workflow: [
      { title: 'Connect a sender', description: 'Link an account and associate the sending number with the application that will use it.' },
      { title: 'Queue the message', description: 'Submit the recipient, expected sender and message with a key that identifies duplicate requests.' },
      { title: 'Follow delivery', description: 'Process the queue with sender checks, operating limits and connection recovery controls.' },
      { title: 'Return the response', description: 'Send receipts and incoming replies back to the responsible application through its webhook.' }
    ],
    storyTitle: 'A shared transport with clear ownership',
    story: [
      { title: 'Separate messaging from business rules', paragraphs: ['The worker handles sessions, message construction and transport. Attendance rules, campaign eligibility, customer identity and human follow-up stay with the application, keeping the messaging service reusable.'] },
      { title: 'Make delivery state visible', paragraphs: ['Durable queues, message identifiers and receipt updates provide a record that applications can query. Connection recovery retains queued work, and uncertain sends are held for reconciliation rather than blindly repeated.'] },
      { title: 'Support several connected applications', paragraphs: ['Application references keep messages and replies associated with their consumer. Shared sender limits, duplicate-request handling and recipient suppression apply across the transport, with operator controls for connection status.'] }
    ],
    outcomes: [
      { value: 'Reusable', label: 'Messaging transport', description: 'Connected applications share the transport while retaining their own business rules.' },
      { value: 'Durable', label: 'Delivery queues', description: 'Queued messages and delivery state are recorded for follow-up and recovery.' },
      { value: 'Scoped', label: 'Sender ownership', description: 'Messages identify their application and expected sending number.' },
      { value: 'Connected', label: 'Replies and receipts', description: 'Incoming events return to the responsible application through webhooks.' }
    ]
  },
  'codex-worker': {
    summary: 'A configurable AI execution service with application context, structured results and reviewable workflows.',
    challenge: 'Adding AI to several applications requires more than a prompt. Each application needs defined capabilities, appropriate context, predictable result formats and a way to follow work without losing control over access or usage.',
    solution: 'We built a shared execution service around the official Codex SDK and App Server, with published capabilities, scoped knowledge, asynchronous jobs, structured output and administrative controls. A separate PMO integration adds approval stages for repository work.',
    overview: [
      'Codex Worker gives connected applications a consistent way to request a defined AI capability. Administrators publish instructions, model policies and output schemas. Applications supply text, images or files, with scoped knowledge and registered read-only tools where configured.',
      'Execution records expose progress, structured results and usage. The service also supports continuing conversations. A separate PMO coding workflow connects requirement review, repository analysis and approved changes in isolated workspaces, with explicit release controls.'
    ],
    workflowTitle: 'From a defined capability to a result',
    workflow: [
      { title: 'Define the capability', description: 'Publish instructions, model policy, permitted context and the expected output structure.' },
      { title: 'Provide the context', description: 'The application supplies its request, attachments and the scoped knowledge available to that execution.' },
      { title: 'Follow the execution', description: 'Track asynchronous progress and usage, continue the conversation or cancel work when needed.' },
      { title: 'Use the result', description: 'Return the structured response to the application and retain the execution record for review.' }
    ],
    storyTitle: 'AI work with a defined operating context',
    story: [
      { title: 'Configuration that applications can share', paragraphs: ['Published capabilities define the instructions, model choices and output schema before execution. Application identities, scoped knowledge and optional tenant controls keep the requested context tied to the caller.'] },
      { title: 'Results that fit the workflow', paragraphs: ['Text, image and file inputs can produce schema-constrained responses. Durable execution records expose events, context evidence and usage, while continuing conversations support work that takes more than one exchange.'] },
      { title: 'A separate path for approved code changes', paragraphs: ['The PMO integration adds requirement approval, read-only repository analysis and plan approval before implementation in isolated workspaces. Configured checks and release review keep production actions explicit and permission-controlled.'] }
    ],
    outcomes: [
      { value: 'Defined', label: 'Published capabilities', description: 'Instructions, model policy and expected output are configured before use.' },
      { value: 'Scoped', label: 'Application context', description: 'Knowledge, attachments and conversations follow their configured application boundaries.' },
      { value: 'Structured', label: 'Usable results', description: 'Schema-constrained output gives applications a predictable response format.' },
      { value: 'Reviewable', label: 'Execution records', description: 'Progress, usage and context evidence stay attached to the work.' }
    ]
  }
}
