import { PageView, pageMetadata } from '@/components/PageView'
export const generateMetadata = () => pageMetadata('pages', 'insights')
export default function Insights() {
  return <PageView slug="insights" />
}
