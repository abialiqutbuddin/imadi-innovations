import type { CaseStudyContent } from './case-study-types'

/** Grounded in the independent attendance portal's source; see its research handoff. */
export const attendanceCaseStudies: Record<string, CaseStudyContent> = {
  'attendance-system': {
    summary:
      'Connecting attendance records, WhatsApp follow-ups, and coordinator review in one event workspace.',
    challenge:
      'An attendance sheet can show a missing scan without explaining what happened. Organizers need to follow up, capture replies, review attendance claims, and keep the final record connected to the right event and day.',
    solution:
      'A dedicated web portal brings imported attendance data together with targeted WhatsApp follow-ups, a shared conversation inbox, coordinator updates, administrator review, and response-sheet synchronization.',
    overview: [
      'Attendance System gives event teams a place to move from attendance data to the next action. Organizers can connect Google Sheets or upload CSV and Excel files, map the source columns, and review the records that need follow-up for an event day.',
      'The portal connects that list to WhatsApp conversations and attendance review. Imported scan status, attendee replies, and coordinator decisions remain distinguishable, while response outputs and an audit trail preserve the context behind an update.',
    ],
    workflowTitle: 'From attendance records to a reviewed response',
    workflow: [
      {
        title: 'Bring the source into view',
        description:
          'Connect an attendance spreadsheet or upload a file, map its columns, and select the relevant event and day.',
      },
      {
        title: 'Review who needs a follow-up',
        description:
          'Check the eligible audience, preview personalized prompts, and start a bulk or individual follow-up.',
      },
      {
        title: 'Handle replies with context',
        description:
          'Use the conversation inbox to read responses, add notes, send a manual reply, or take over a conversation.',
      },
      {
        title: 'Review and record the result',
        description:
          'Review attendance claims, record an authorized correction, and queue the resulting response for the configured sheet output.',
      },
    ],
    storyTitle: 'A workflow built around the follow-up',
    story: [
      {
        title: 'A missing scan needs context',
        paragraphs: [
          'The portal separates the source attendance mark from what someone reports in a reply and what a coordinator later records. Teams can see the origin of an attendance status instead of treating every update as the same kind of evidence.',
          'A claim that someone attended without a recorded scan can move into administrator review. Reviewed decisions and manual attendance changes retain an audit entry and conversation context.',
        ],
      },
      {
        title: 'Follow-ups that remain connected to the work',
        paragraphs: [
          'Organizers can send an individual follow-up or work through an eligible group. Attendance already recorded, a pending review, an existing prompt, or coordinator handling can affect whether a new prompt is appropriate.',
          'Replies stay beside the relevant attendance record. Coordinators can take over when a conversation needs attention, while uncertain or unmatched messages can be retained for a person to resolve.',
        ],
      },
      {
        title: 'Separate events, shared working habits',
        paragraphs: [
          'Event selection scopes the workspace, and coordinator assignments limit the groups they can access. Source mapping, follow-up controls, inbox handling, and response outputs give teams a repeatable process across event days.',
          'Configured Google Sheets outputs receive response updates through queued jobs. The portal retains its own response and audit history so a spreadsheet output is part of the workflow rather than the only record of what happened.',
        ],
      },
    ],
    outcomes: [
      {
        value: 'Connected',
        label: 'Attendance and follow-up',
        description: 'Source records, prompts, replies, and review decisions sit within the same event workflow.',
      },
      {
        value: 'Traceable',
        label: 'Attendance decisions',
        description: 'The portal distinguishes imported marks, reported attendance, and authorized changes.',
      },
      {
        value: 'Focused',
        label: 'Coordinator access',
        description: 'Event and group assignments shape the records each coordinator can work with.',
      },
      {
        value: 'Shared',
        label: 'Response outputs',
        description: 'Queued sheet updates connect recorded responses to the configured reporting destination.',
      },
    ],
  },
}
