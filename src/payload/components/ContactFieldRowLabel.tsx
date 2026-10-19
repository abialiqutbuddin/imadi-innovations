'use client'

import { useRowLabel } from '@payloadcms/ui'

export function ContactFieldRowLabel() {
  const { data, rowNumber } = useRowLabel<{ label?: string; key?: string; enabled?: boolean }>()
  const label = data?.label?.trim() || data?.key || `Field ${(rowNumber ?? 0) + 1}`
  return <span>{label}{data?.enabled === false ? ' (hidden)' : ''}</span>
}

export function ContactOptionRowLabel() {
  const { data, rowNumber } = useRowLabel<{ label?: string; value?: string }>()
  return <span>{data?.label?.trim() || data?.value || `Option ${(rowNumber ?? 0) + 1}`}</span>
}
