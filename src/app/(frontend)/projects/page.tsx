import { PageView, pageMetadata } from '@/components/PageView'
export const generateMetadata = () => pageMetadata('pages', 'projects')
export default function Projects() {
  return <PageView slug="projects" />
}
