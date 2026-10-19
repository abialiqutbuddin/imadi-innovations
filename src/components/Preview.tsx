'use client'

import { RefreshRouteOnSave, useLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import type { Document } from '@/lib/content'
import { Blocks } from './Blocks'

export function PreviewPage({ page, context }: { page: Document; context: Document }) {
  const { data } = useLivePreview<Document>({
    initialData: page,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100',
    depth: 3,
  })
  return <Blocks blocks={data.layout || []} context={context} formOwner={{ collection: 'pages', id: data.id }} />
}

export function DraftBanner({ labels = {} }: { labels?: Document }) {
  const router = useRouter()
  return (
    <>
      <RefreshRouteOnSave
        refresh={() => router.refresh()}
        serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'}
      />
      <aside className="draft-banner">
        {labels.previewNotice || 'Draft preview'}{' '}
        <button
          onClick={async () => {
            await fetch('/api/exit-preview')
            router.refresh()
          }}
        >
          {labels.exitPreview || 'Exit preview'}
        </button>
      </aside>
    </>
  )
}
