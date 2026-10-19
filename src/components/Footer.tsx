import Link from 'next/link'
import type { Document } from '@/lib/content'
import { mediaURL, safeHref } from '@/lib/content'

export function Footer({ settings, services }: { settings: Document; services: Document[] }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Home">
              <img
                src={mediaURL(settings.footer?.logo, '/figma/footer-mark.svg')}
                alt={settings.companyName}
                width={96}
                height={96}
              />
            </Link>
            <p>{settings.description}</p>
            <div className="social-links">
              {(settings.socials || []).map((s: Document) => (
                <a
                  href={safeHref(s.url, '/')}
                  key={s.id || s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-label">{settings.labels?.servicesLink || 'Services'}</p>
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.id}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-label">{settings.labels?.exploreLabel || 'Explore'}</p>
            {(settings.footerNavigation || settings.navigation || []).map((item: Document) => (
              <Link href={safeHref(item.href, '/')} key={item.id || item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-label">{settings.labels?.contactLink || 'Let’s talk'}</p>
            <a href={`mailto:${settings.contact?.email}`}>{settings.contact?.email}</a>
            <a href={`tel:${String(settings.contact?.phone || '').replace(/[^\d+]/g, '')}`}>
              {settings.contact?.phone}
            </a>
            <p>{settings.contact?.address}</p>
            <div className="footer-note">
              <h2>
                {settings.footer?.headline}
                <br />
                <span>{settings.footer?.highlight}</span>
              </h2>
              <p>{settings.footer?.description}</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            {settings.footer?.copyright ||
              `© ${new Date().getFullYear()} ${settings.companyName}. All rights reserved.`}
          </p>
          <div>
            <Link href="/privacy">{settings.labels?.privacyLabel || 'Privacy policy'}</Link>
            <Link href="/contact">{settings.labels?.contactLink || 'Contact'}</Link>
          </div>
        </div>
        <p className="footer-wordmark" aria-hidden="true">
          {settings.companyName}
        </p>
      </div>
    </footer>
  )
}
