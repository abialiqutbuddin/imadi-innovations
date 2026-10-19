import Link from 'next/link'
import { getSettings } from '@/lib/cms'
export default async function NotFound() {
  const { labels = {} } = await getSettings()
  return (
    <section className="section">
      <div className="container not-found">
        <p className="gradient-text">404</p>
        <h1 className="display">{labels.notFoundTitle || 'Page not found'}</h1>
        <p>
          {labels.notFoundDescription || 'This page may have moved. Let’s get you back on track.'}
        </p>
        <Link className="button button--primary" href="/">
          {labels.homeLink || 'Go home'} ↗
        </Link>
      </div>
    </section>
  )
}
