export type Document = Record<string, any>

export function mediaURL(media: unknown, fallback = ''): string {
  if (typeof media === 'string' && media.startsWith('/')) return media
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    // Payload returns absolute URLs for local uploads. Keep local files portable across
    // preview/production origins and use Next's same-origin image optimizer.
    try {
      const url = new URL(media.url, 'http://local.invalid')
      if (url.pathname.startsWith('/api/media/file/')) return `${url.pathname}${url.search}`
    } catch {
      return fallback
    }
    return media.url
  }
  return fallback
}

export function mediaAlt(media: unknown, fallback = ''): string {
  if (media && typeof media === 'object' && 'alt' in media && typeof media.alt === 'string')
    return media.alt
  return fallback
}

export function safeHref(href: unknown, fallback = '/contact'): string {
  if (typeof href !== 'string') return fallback
  const value = href.trim()
  if (/[\\\u0000-\u001f\u007f]/.test(value)) return fallback
  if (/^\/(?!\/)|^#[a-zA-Z0-9_-]*$|^https?:\/\/|^mailto:|^tel:/i.test(value)) return value
  return fallback
}

export function populated(items: unknown): Document[] {
  return Array.isArray(items) ? items.filter((item) => item && typeof item === 'object') : []
}

export function excerpt(text: string, limit = 155): string {
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text
}
