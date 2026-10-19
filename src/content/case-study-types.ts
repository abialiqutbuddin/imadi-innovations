/** Editorial copy grounded in project documentation and implemented workflows. */
export type CaseStudyContent = {
  summary: string
  challenge: string
  solution: string
  overview: string[]
  workflowTitle: string
  workflow: { title: string; description: string }[]
  storyTitle: string
  story: { title: string; paragraphs: string[] }[]
  outcomes: { value: string; label: string; description?: string }[]
}
