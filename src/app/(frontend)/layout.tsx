import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getSettings, getDocuments } from '@/lib/cms'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DraftBanner } from '@/components/Preview'
import './styles.css'
import '@/components/figma-layout.css'
import '@/components/figma-motion.css'
import '@/components/figma-revision.css'
import '@/components/form-controls.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'),
    title: {
      default: `${settings.companyName} — ${settings.tagline}`,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.description,
    openGraph: { siteName: settings.companyName, type: 'website', locale: 'en_PK' },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [settings, services, draft] = await Promise.all([
    getSettings(),
    getDocuments('services'),
    draftMode(),
  ])
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          {settings.labels?.skipLink || 'Skip to content'}
        </a>
        <div className="site-chrome">
          {draft.isEnabled ? <DraftBanner labels={settings.labels} /> : null}
          <Header settings={settings} />
        </div>
        <main id="main-content">{children}</main>
        <Footer settings={settings} services={services} />
      </body>
    </html>
  )
}
