import { PageView, pageMetadata } from '@/components/PageView'
export const generateMetadata = () => pageMetadata('pages', 'home')
export default function Home() {
  return <PageView slug="home" />
}
