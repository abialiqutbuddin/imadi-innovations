import type { CaseStudyContent } from './case-study-types'

export const coordinationCaseStudies: Record<string, CaseStudyContent> = {
  'pmo-karachi': {
    summary: 'Event planning, team tasks and conversations in a shared web and mobile workspace.',
    challenge: 'An event can span departments, zones and delivery dates. Coordinators need clear task ownership and progress, while team members need access to the work and conversations that belong to their role.',
    solution: 'We built an event workspace that connects scoped team access, configurable tasks, chat and reporting, with a mobile application for people working away from a desk.',
    overview: [
      'PMO Karachi brings event operations into a shared workspace. Events can follow departmental or zonal structures, with tasks that record assignees, dates, priorities and progress. Linked work and dependencies help teams understand how responsibilities fit together.',
      'Web and mobile interfaces keep the event context close to the team. Conversations, attachments and alerts support daily coordination, while filtered reporting and document workflows give coordinators a way to review progress. Optional work tracking adds assigned-task timers and weekly timesheets.'
    ],
    workflowTitle: 'How teams use PMO',
    workflow: [
      { title: 'Organize the event', description: 'Set up the event structure, departments or zones and the people who need access.' },
      { title: 'Assign the work', description: 'Create tasks with owners, dates, priorities and the information needed to carry them out.' },
      { title: 'Coordinate delivery', description: 'Update progress and use chat, attachments and mentions to keep the team connected.' },
      { title: 'Review progress', description: 'Filter operational reports by team, location, assignee or date and export a reviewable record.' }
    ],
    storyTitle: 'A workspace shaped around the team',
    story: [
      { title: 'Structure that follows the event', paragraphs: ['Departmental and zonal structures give the workspace a practical shape. Tasks carry ownership, deadlines and progress, with linked tasks and dependencies available when the work crosses team boundaries.'] },
      { title: 'Continuity across web and mobile', paragraphs: ['The mobile application brings dashboards, assigned tasks, conversations and alerts into the same event context. Permission-aware navigation helps each person reach the features available to their role.'] },
      { title: 'Updates that can be reviewed', paragraphs: ['Reporting connects the operational view with PDF and Excel exports. Meeting notes can be developed into structured minutes, and optional timers and timesheets provide a record of assigned work.'] }
    ],
    outcomes: [
      { value: 'Shared', label: 'Event workspace', description: 'Teams, tasks and conversations stay connected to the event.' },
      { value: 'Clear', label: 'Task ownership', description: 'Assignees, dates, priorities and progress are recorded against the work.' },
      { value: 'Connected', label: 'Web and mobile', description: 'Coordinators and team members can follow the workflow across devices.' },
      { value: 'Reviewable', label: 'Operational reporting', description: 'Filtered reports can be exported as PDF or Excel files.' }
    ]
  },
  'magnet-cargo': {
    summary: 'A cargo booking and delivery workspace connecting customers, administrators and drivers.',
    challenge: 'A cargo booking needs clear shipment information at intake and a consistent way to record delivery updates. The customer, administrator and driver each need a practical view of the same shipment.',
    solution: 'We built a web application around one booking record, with guided shipment intake, pickup-day validation, an administrative overview and delivery updates that feed back into booking status.',
    overview: [
      'Magnet Cargo connects shipment intake with an operational overview and a driver update workflow. A guided booking form captures sender, receiver and shipment details, including pieces, weight and booking date. City-specific pickup rules are checked in the form and on the server.',
      'Administrators can review bookings, status totals and delivery records, as well as create driver accounts. Drivers can find bookings, review the latest delivery information and record updates. Each update stays attached to its booking and carries its current delivery status.'
    ],
    workflowTitle: 'From booking to delivery update',
    workflow: [
      { title: 'Create a booking', description: 'Capture sender, receiver, piece count, weight and booking date in a guided form.' },
      { title: 'Check the schedule', description: 'Validate required information and city-specific pickup-day rules before saving.' },
      { title: 'Review operations', description: 'Use the administrative workspace to follow bookings and delivery status totals.' },
      { title: 'Record delivery', description: 'Add the driver, date, city, amount and status to the shipment’s delivery record.' }
    ],
    storyTitle: 'One booking through the operation',
    story: [
      { title: 'Clear information at intake', paragraphs: ['Sender, receiver and shipment details are grouped into a guided sequence. Required fields, positive piece counts and shipment weight are validated before the booking is saved.'] },
      { title: 'Rules built into the workflow', paragraphs: ['City-specific booking-day rules are checked while the form is completed and again on the server. The booking flow carries the operational schedule rule through both steps.'] },
      { title: 'Delivery updates linked to the shipment', paragraphs: ['The administrative workspace brings bookings and delivery records together. Drivers can review the latest update and add delivery details, with the booking status updated alongside the new delivery record.'] }
    ],
    outcomes: [
      { value: 'Structured', label: 'Booking intake', description: 'Shipment details follow a consistent sender, receiver and cargo format.' },
      { value: 'Validated', label: 'Pickup schedules', description: 'City-specific booking rules are checked in the form and on the server.' },
      { value: 'Visible', label: 'Booking status', description: 'Administrators can review status totals and delivery updates.' },
      { value: 'Linked', label: 'Delivery records', description: 'Delivery updates remain attached to the booking they describe.' }
    ]
  }
}
