import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { mediaAlt, mediaURL, safeHref } from '@/lib/content'

export function Arrow({ dark = false, meeting = false }: { dark?: boolean; meeting?: boolean }) {
  return (
    <img
      aria-hidden="true"
      className="action-icon"
      src={
        meeting
          ? '/figma/8019-216-imgFrame2.svg'
          : dark
            ? '/figma/8039-1227-imgFrame.svg'
            : '/figma/8019-216-imgFrame1.svg'
      }
      alt=""
      width={28}
      height={28}
    />
  )
}

export function Button({
  href,
  children,
  variant = 'primary',
  meeting = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'dark' | 'outline'
  meeting?: boolean
  className?: string
}) {
  return (
    <Link className={`button button--${variant} ${className}`} href={safeHref(href)}>
      {children}
      <Arrow meeting={meeting} />
    </Link>
  )
}

export function Eyebrow({ children }: { children?: ReactNode }) {
  if (!children) return null
  return (
    <span className="eyebrow">
      <img src="/figma/8019-216-imgFrame.svg" width={24} height={24} alt="" aria-hidden="true" />
      {children}
    </span>
  )
}

export function Heading({
  title,
  highlight,
  as: Tag = 'h2',
  className = '',
  titleDecoration,
}: {
  title?: string
  highlight?: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  titleDecoration?: ReactNode
}) {
  if (!title && !highlight) return null
  return (
    <Tag className={`display ${className}`}>
      {titleDecoration && title ? <>{title.split(' ')[0]} {titleDecoration} {title.split(' ').slice(1).join(' ')}</> : title}
      {highlight ? (
        <>
          <br />
          <span className="gradient-text">{highlight}</span>
        </>
      ) : null}
    </Tag>
  )
}

export function Picture({
  media,
  fallback,
  alt = '',
  className = '',
  priority = false,
  sizes = '(max-width: 760px) 100vw, 50vw',
}: {
  media?: unknown
  fallback?: string
  alt?: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const src = mediaURL(media, fallback)
  if (!src) return null
  return (
    <div className={`picture ${className}`}>
      <Image src={src} alt={mediaAlt(media, alt)} fill sizes={sizes} priority={priority} />
    </div>
  )
}

export function SectionIntro({
  eyebrow,
  title,
  highlight,
  description,
  action,
  centered = false,
  titleDecoration,
}: {
  eyebrow?: string
  title?: string
  highlight?: string
  description?: string
  action?: { label?: string; href?: string }
  centered?: boolean
  titleDecoration?: ReactNode
}) {
  if (!eyebrow && !title && !highlight && !description && !action?.label) return null
  return (
    <div className={`section-intro ${centered ? 'section-intro--centered' : ''}`}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading title={title} highlight={highlight} titleDecoration={titleDecoration} />
      </div>
      {description || action?.label ? (
        <div className="section-intro__aside">
          {description ? <p>{description}</p> : null}
          {action?.label ? <Button href={action.href || '/contact'}>{action.label}</Button> : null}
        </div>
      ) : null}
    </div>
  )
}
