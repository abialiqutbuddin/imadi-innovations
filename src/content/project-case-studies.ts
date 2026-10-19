import { operationsCaseStudies } from './case-studies-operations'
import { coordinationCaseStudies } from './case-studies-coordination'
import { automationCaseStudies } from './case-studies-automation'
import { attendanceCaseStudies } from './case-studies-attendance'
import type { CaseStudyContent } from './case-study-types'

export const projectCaseStudies: Record<string, CaseStudyContent> = {
  ...operationsCaseStudies,
  ...coordinationCaseStudies,
  ...automationCaseStudies,
  ...attendanceCaseStudies,
}

export const additionalProjects = [
  { title: 'WhatsApp Worker', slug: 'whatsapp-worker', client: 'Imadi Innovations', industry: 'Business communications', category: 'Automation & AI', serviceSlugs: ['custom-web-software'], placeholder: 'whatsapp-worker-placeholder.png' },
  { title: 'Codex Worker', slug: 'codex-worker', client: 'Imadi Innovations', industry: 'Developer tools', category: 'Automation & AI', serviceSlugs: ['custom-web-software', 'ai-integrations'], placeholder: 'codex-worker-placeholder.png' },
  { title: 'Attendance System', slug: 'attendance-system', client: 'Imadi Innovations', industry: 'Community & event operations', category: 'Web Applications', serviceSlugs: ['custom-web-software'], placeholder: 'attendance-system-placeholder.png' },
] as const

function textNode(text: string) {
  return { type: 'text', detail: 0, format: 0, mode: 'normal' as const, style: '', text, version: 1 }
}

function paragraph(text: string) {
  return { type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null, children: [textNode(text)], textFormat: 0, textStyle: '' }
}

/** Shared by the fresh seed and the guarded initial-content upgrade. */
export function projectStoryFields(slug: string, endingSections: Record<string, any>[]) {
  const story = projectCaseStudies[slug]
  if (!story) return null
  const richText = (children: Record<string, any>[]) => ({ root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: null, children } })
  return {
    summary: story.summary,
    challenge: story.challenge,
    solution: story.solution,
    content: richText(story.overview.map(paragraph)),
    results: story.outcomes,
    sections: [
      {
        blockType: 'process', enabled: true, theme: 'light',
        eyebrow: 'HOW THE WORK CONNECTS', title: story.workflowTitle,
        steps: story.workflow.map((step, index) => ({ number: String(index + 1).padStart(2, '0'), ...step })),
      },
      {
        blockType: 'richContent', enabled: true, theme: 'light',
        eyebrow: 'A CLOSER LOOK', title: story.storyTitle,
        content: richText(story.story.flatMap((section) => [
          { type: 'heading', tag: 'h3', format: '' as const, indent: 0, version: 1, direction: null, children: [textNode(section.title)] },
          ...section.paragraphs.map(paragraph),
        ])),
      },
      ...endingSections,
    ],
  }
}
