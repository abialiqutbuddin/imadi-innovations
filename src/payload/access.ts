import type { Access, CollectionBeforeOperationHook, FieldAccess } from 'payload'

/** Only the two back-office roles can edit or preview content. */
export const isEditor: Access = ({ req }) =>
  Boolean(req.user && ['admin', 'editor'].includes((req.user as { role?: string }).role ?? ''))

export const isAdmin: Access = ({ req }) =>
  Boolean(req.user && (req.user as { role?: string }).role === 'admin')

export const isAdminField: FieldAccess = ({ req }) =>
  Boolean(req.user && (req.user as { role?: string }).role === 'admin')

/** This filter also applies when someone requests ?draft=true through REST. */
export const publishedOrEditor: Access = ({ req }) => {
  if (req.user && ['admin', 'editor'].includes((req.user as { role?: string }).role ?? '')) return true
  return { _status: { equals: 'published' } }
}

export const editorialAccess = {
  create: isEditor,
  read: publishedOrEditor,
  update: isEditor,
  delete: isEditor,
  readVersions: isEditor,
}

/** Anonymous draft=true requests should read the last published revision, not hide a
 * published document merely because a newer private revision exists. Access filters
 * remain in place so a record which has never been published is still invisible. */
export const keepPublishedForVisitors: CollectionBeforeOperationHook = ({ args, operation, req, overrideAccess }) => {
  const trustedEditor = req.user && ['admin', 'editor'].includes((req.user as { role?: string }).role || '')
  if (operation === 'read' && !overrideAccess && !trustedEditor) {
    ;(args as { draft?: boolean }).draft = false
  }
  return args
}

export const editorialHooks = { beforeOperation: [keepPublishedForVisitors] }
