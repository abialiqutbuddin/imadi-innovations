'use client'

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import type { Document } from '@/lib/content'
import {
  resolveContactFields,
  validateContactValues,
  type ContactField,
  type ContactFormLocator,
} from '@/lib/contact-form'
import { BrandedDateTimePicker, BrandedSelect } from './FormControls'

type FieldValues = Record<string, string | boolean>

export function ContactForm({
  block,
  services,
  form,
  preview = false,
}: {
  block: Document
  services: Document[]
  form?: ContactFormLocator
  preview?: boolean
}) {
  const fields = useMemo(() => resolveContactFields(block, services), [block, services])
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [values, setValues] = useState<FieldValues>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [attempted, setAttempted] = useState(false)
  const [timeZone, setTimeZone] = useState('')
  const currentValues = useRef<FieldValues>({})
  const pending = useRef(false)
  const summary = useRef<HTMLDivElement>(null)
  const prefix = useId()
  const path = usePathname()
  const page = block.variant === 'page'
  const unavailable = preview || !form || fields.length === 0
  const submitting = state === 'submitting'
  const id = (name: string) => `${prefix}-${name}`
  const validationSummary = block.validationSummaryMessage || 'Please check the highlighted fields.'

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || '')
  }, [])

  function focusSummary() {
    requestAnimationFrame(() => summary.current?.focus())
  }

  function checkField(field: ContactField, value: string | boolean) {
    const result = validateContactValues([field], { [field.key]: value }, timeZone)
    setErrors((current) => {
      const next = { ...current }
      if (result.errors?.[field.key]) next[field.key] = result.errors[field.key]
      else delete next[field.key]
      return next
    })
  }

  function updateValue(field: ContactField, value: string | boolean) {
    currentValues.current = { ...currentValues.current, [field.key]: value }
    setValues(currentValues.current)
    if (state === 'success') {
      setState('idle')
      setMessage('')
    }
    if (attempted || touched[field.key] || errors[field.key]) checkField(field, value)
  }

  function blurField(field: ContactField) {
    if (submitting) return
    setTouched((current) => ({ ...current, [field.key]: true }))
    checkField(field, currentValues.current[field.key] ?? (field.type === 'checkbox' ? false : ''))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending.current || unavailable) return
    const element = event.currentTarget
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || timeZone
    setTimeZone(browserTimeZone)
    setAttempted(true)
    const submissionValues = Object.fromEntries(
      fields.map((field) => [field.key, currentValues.current[field.key] ?? (field.type === 'checkbox' ? false : '')]),
    ) as FieldValues
    const validation = validateContactValues(fields, submissionValues, browserTimeZone)
    if (!validation.data) {
      setErrors(validation.errors || {})
      setState('error')
      setMessage(validationSummary)
      focusSummary()
      return
    }

    const website = new FormData(element).get('website') || ''
    pending.current = true
    setState('submitting')
    setMessage('')
    setErrors({})
    let failureMessage = block.errorMessage || 'We couldn’t save your enquiry. Please try again.'
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form,
          values: submissionValues,
          source: path,
          website,
          timeZone: browserTimeZone,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) {
        const serverErrors = Object.entries(result.errors || {}).filter(
          (entry): entry is [string, string] => typeof entry[1] === 'string',
        )
        const fieldErrors = Object.fromEntries(
          serverErrors.filter(([key]) =>
            fields.some((field) => field.key === key),
          ),
        )
        const formChanged = serverErrors.some(([key]) => !fields.some((field) => field.key === key))
        setErrors(fieldErrors)
        failureMessage = formChanged
          ? 'This form has changed. Please refresh and try again.'
          : Object.keys(fieldErrors).length
            ? validationSummary
            : result.error || result.message || failureMessage
        throw new Error(failureMessage)
      }
      setState('success')
      setMessage(block.successMessage || result.message || 'Your enquiry has been saved.')
      currentValues.current = {}
      setValues({})
      setTouched({})
      setAttempted(false)
      element.reset()
    } catch {
      setState('error')
      setMessage(failureMessage)
      focusSummary()
    } finally {
      pending.current = false
    }
  }

  function renderField(field: ContactField) {
    const fieldId = id(field.key)
    const error = errors[field.key]
    const hint = [field.helpText, field.type === 'datetime' && timeZone ? `(${timeZone})` : '']
      .filter(Boolean)
      .join(' ')
    const describedBy = [hint ? id(`${field.key}-hint`) : '', error ? id(`${field.key}-error`) : '']
      .filter(Boolean)
      .join(' ') || undefined
    const value = values[field.key] ?? (field.type === 'checkbox' ? false : '')
    const label = (
      <>
        {field.label}
        {field.required ? <span className="form-field__required" aria-hidden="true"> *</span> : null}
      </>
    )
    const inputProps = {
      id: fieldId,
      name: field.key,
      required: field.required,
      disabled: submitting,
      'aria-invalid': error ? (true as const) : undefined,
      'aria-describedby': describedBy,
      onBlur: () => blurField(field),
    }

    return (
      <div
        className={`form-field form-field--${field.width}${field.type === 'checkbox' ? ' form-field--checkbox' : ''}`}
        key={field.key}
      >
        {field.type !== 'checkbox' ? <label id={id(`${field.key}-label`)} htmlFor={fieldId}>{label}</label> : null}
        {field.type === 'select' ? (
          <BrandedSelect
            id={fieldId}
            name={field.key}
            value={String(value)}
            onChange={(next) => updateValue(field, next)}
            onBlur={() => blurField(field)}
            options={field.options}
            placeholder={field.placeholder}
            required={field.required}
            disabled={submitting}
            invalid={Boolean(error)}
            describedBy={describedBy}
            labelledBy={id(`${field.key}-label`)}
          />
        ) : field.type === 'datetime' ? (
          <BrandedDateTimePicker
            id={fieldId}
            name={field.key}
            value={String(value)}
            onChange={(next) => updateValue(field, next)}
            onBlur={() => blurField(field)}
            placeholder={field.placeholder}
            required={field.required}
            disabled={submitting}
            invalid={Boolean(error)}
            describedBy={describedBy}
            labelledBy={id(`${field.key}-label`)}
            timeZone={timeZone}
            labels={block.datePickerLabels}
          />
        ) : field.type === 'checkbox' ? (
          <label className="form-checkbox" htmlFor={fieldId}>
            <input
              {...inputProps}
              type="checkbox"
              checked={value === true}
              onChange={(event) => updateValue(field, event.target.checked)}
            />
            <span>{label}</span>
          </label>
        ) : field.type === 'textarea' ? (
          <textarea
            {...inputProps}
            value={String(value)}
            placeholder={field.placeholder}
            minLength={field.minLength}
            maxLength={field.maxLength}
            rows={4}
            onChange={(event) => updateValue(field, event.target.value)}
          />
        ) : (
          <input
            {...inputProps}
            type={field.type}
            value={String(value)}
            placeholder={field.placeholder}
            autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : field.key === 'name' ? 'name' : field.key === 'company' ? 'organization' : undefined}
            minLength={field.minLength}
            maxLength={field.maxLength}
            min={field.type === 'number' ? field.min : undefined}
            max={field.type === 'number' ? field.max : undefined}
            inputMode={field.type === 'number' ? 'decimal' : undefined}
            onChange={(event) => updateValue(field, event.target.value)}
          />
        )}
        {hint ? <small className="form-field__hint" id={id(`${field.key}-hint`)}>{hint}</small> : null}
        {error ? <span className="field-error" id={id(`${field.key}-error`)}>{error}</span> : null}
      </div>
    )
  }

  return (
    <form
      className={`contact-form contact-form--revised contact-form--builder ${page ? 'contact-form--page' : ''}`}
      onSubmit={submit}
      noValidate
      aria-busy={submitting}
    >
      {state === 'error' ? (
        <div className="form-message form-message--error" ref={summary} tabIndex={-1} role="alert">
          <p>{message}</p>
          {Object.keys(errors).length ? (
            <ul>
              {fields.filter((field) => errors[field.key]).map((field) => (
                <li key={field.key}>
                  <a
                    href={`#${id(field.key)}`}
                    onClick={(event) => {
                      event.preventDefault()
                      const control = document.getElementById(id(field.key))
                      control?.focus()
                      control?.scrollIntoView({ block: 'center' })
                    }}
                  >
                    {errors[field.key]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      <div className="contact-form__fields">{fields.map(renderField)}</div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" tabIndex={-1} autoComplete="off" disabled={submitting} />
      </div>
      {unavailable ? (
        <p className="form-message form-message--notice" role="status">
          {preview
            ? block.previewMessage || 'Publish this form before accepting enquiries.'
            : block.unavailableMessage || 'This form is not accepting enquiries right now. Please contact us by email.'}
        </p>
      ) : null}
      {state === 'success' ? <p className="form-message" role="status" aria-live="polite">{message}</p> : null}
      <div className="form-actions">
        {block.privacyNote ? <small>{block.privacyNote}</small> : null}
        <button className="button button--dark" disabled={submitting || unavailable} type="submit">
          {submitting ? block.submittingLabel || 'Sending…' : block.submitLabel || 'Send enquiry'}
          <img alt="" aria-hidden="true" src="/figma/8019-216-imgFrame1.svg" width={28} height={28} />
        </button>
      </div>
    </form>
  )
}
