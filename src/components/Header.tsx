'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Document } from '@/lib/content'
import { mediaURL, safeHref } from '@/lib/content'
import { Button } from './ui'

export function Header({ settings }: { settings: Document }) {
  const [open, setOpen] = useState(false)
  const menuToggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        menuToggle.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label={`${settings.companyName || 'Imadi Innovations'} home`}
        >
          <img
            src={mediaURL(settings.logo, '/figma/8222-2773-imgLogo.svg')}
            alt={settings.companyName || 'Imadi Innovations'}
            width={188}
            height={48}
          />
        </Link>
        <button
          ref={menuToggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={
            open
              ? settings.labels?.closeMenu || 'Close navigation'
              : settings.labels?.openMenu || 'Open navigation'
          }
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={open ? 'nav is-open' : 'nav'}
        >
          {(settings.navigation || []).map((item: Document) => (
            <Link
              key={item.id || item.href}
              href={safeHref(item.href, '/')}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-booking">
          <Button href={settings.booking?.href || '/contact'}>
            {settings.booking?.label || 'Book a call'}
          </Button>
        </div>
      </div>
    </header>
  )
}
