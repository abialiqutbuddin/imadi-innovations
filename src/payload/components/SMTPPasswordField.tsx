'use client'

import { PasswordField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const SMTPPasswordField: TextFieldClientComponent = props => (
  <PasswordField {...props} path={props.path || props.field.name} autoComplete="new-password" />
)
