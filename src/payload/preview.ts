import type { CollectionConfig } from 'payload'

export const previewURL = (collection: string, slug: unknown): string =>
  `/api/preview?collection=${encodeURIComponent(collection)}&slug=${encodeURIComponent(String(slug || 'home'))}`

export const previewAdmin = (collection: string): CollectionConfig['admin'] => ({
  preview: (doc) => previewURL(collection, doc.slug),
  livePreview: {
    url: ({ data }) => previewURL(collection, data.slug),
    breakpoints: [
      { label: 'Phone', name: 'phone', width: 390, height: 844 },
      { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
      { label: 'Desktop', name: 'desktop', width: 1440, height: 1000 },
    ],
  },
})
