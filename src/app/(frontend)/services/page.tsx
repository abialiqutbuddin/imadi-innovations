import { PageView, pageMetadata } from '@/components/PageView'
export const generateMetadata = () => pageMetadata('pages', 'services')
export default function Services() {
  return <PageView slug="services" />
}
