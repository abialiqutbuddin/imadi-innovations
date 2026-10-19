import { PageView, pageMetadata } from '@/components/PageView'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return pageMetadata('pages', (await params).slug)
}
export default async function ContentPage({ params }: Props) {
  return <PageView slug={(await params).slug} />
}
