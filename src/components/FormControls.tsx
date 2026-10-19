'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  calendarDate,
  dateKey,
  parseLocalDateTime,
  shiftCalendarMonth,
  MIN_CALENDAR_YEAR,
  MAX_CALENDAR_YEAR,
} from './form-control-utils'

type CommonControlProps = {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  labelledBy?: string
  onBlur?: () => void
}

export type SelectOption = { label: string; value: string; disabled?: boolean }

function Chevron({ direction = 'down' }: { direction?: 'down' | 'left' | 'right' }) {
  return (
    <svg
      className={`fc-chevron fc-chevron--${direction}`}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A select-only combobox: keyboard focus stays on the trigger as options change. */
export function BrandedSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required,
  disabled,
  invalid,
  describedBy,
  labelledBy,
  onBlur,
}: CommonControlProps & { options: SelectOption[] }) {
  const listId = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const popup = useRef<HTMLDivElement>(null)
  const search = useRef({ text: '', time: 0 })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [position, setPosition] = useState<{
    left: number
    top: number
    width: number
    maxHeight: number
  } | null>(null)
  const choices = [
    { value: '', label: placeholder },
    ...options.filter((option) => option.value !== ''),
  ]
  const selected = choices.findIndex((option) => option.value === value)
  const selectedLabel = selected >= 0 ? choices[selected].label : placeholder

  useLayoutEffect(() => {
    if (!open || disabled) return
    function place() {
      const rect = trigger.current?.getBoundingClientRect()
      if (!rect) return
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const below = viewportHeight - rect.bottom - 12
      const above = rect.top - 12
      const desiredHeight = Math.min(320, choices.length * 48 + 12)
      const height = Math.min(desiredHeight, Math.max(below, above))
      const showAbove = below < desiredHeight && above > below
      setPosition({
        left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
        top: showAbove ? Math.max(8, rect.top - height - 6) : rect.bottom + 6,
        width: Math.min(rect.width, window.innerWidth - 16),
        maxHeight: Math.min(320, showAbove ? height : Math.max(96, below)),
      })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    window.visualViewport?.addEventListener('resize', place)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      window.visualViewport?.removeEventListener('resize', place)
    }
  }, [open, disabled, choices.length])

  useEffect(() => {
    if (!open) return
    function dismiss(event: PointerEvent) {
      const target = event.target as Node
      if (!trigger.current?.contains(target) && !popup.current?.contains(target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  useEffect(() => {
    if (disabled) setOpen(false)
  }, [disabled])

  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active, listId])

  function show(index = selected >= 0 ? selected : 0) {
    if (disabled) return
    setActive(index)
    setPosition(null)
    setOpen(true)
  }
  function choose(index: number) {
    if (!choices[index] || choices[index].disabled) return
    onChange(choices[index].value)
    setOpen(false)
    trigger.current?.focus()
  }
  function move(step: number) {
    let next = active
    for (let count = 0; count < choices.length; count++) {
      next = (next + step + choices.length) % choices.length
      if (!choices[next].disabled) {
        setActive(next)
        return
      }
    }
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) show(selected >= 0 ? selected : event.key === 'ArrowDown' ? 0 : choices.length - 1)
      else move(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      const indices = choices.map((_, index) => index).filter((index) => !choices[index].disabled)
      const index = event.key === 'Home' ? indices[0] : indices[indices.length - 1]
      if (open) setActive(index)
      else show(index)
    } else if (event.key === 'Escape' && open) {
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
    } else if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault()
      choose(active)
    } else if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      event.key !== ' '
    ) {
      event.preventDefault()
      const now = Date.now()
      const text =
        now - search.current.time < 700
          ? search.current.text + event.key.toLocaleLowerCase()
          : event.key.toLocaleLowerCase()
      search.current = { text, time: now }
      const query = [...text].every((letter) => letter === text[0]) ? text[0] : text
      const start = open ? active : selected
      for (let offset = 1; offset <= choices.length; offset++) {
        const index = (start + offset + choices.length) % choices.length
        if (
          !choices[index].disabled &&
          choices[index].label.toLocaleLowerCase().startsWith(query)
        ) {
          if (open) setActive(index)
          else onChange(choices[index].value)
          break
        }
      }
    }
  }

  return (
    <div className="fc-control" data-open={open || undefined}>
      <input type="hidden" name={name} value={value} disabled={disabled} />
      <button
        ref={trigger}
        id={id}
        type="button"
        className="fc-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-labelledby={labelledBy}
        disabled={disabled}
        data-placeholder={!value || undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={keyDown}
        onBlur={() => {
          setOpen(false)
          onBlur?.()
        }}
      >
        <span>{selectedLabel}</span>
        <Chevron />
      </button>
      {open && !disabled
        ? createPortal(
            <div
              ref={popup}
              id={listId}
              role="listbox"
              aria-labelledby={labelledBy || id}
              className="fc-select-menu"
              style={{ ...position, visibility: position ? 'visible' : 'hidden' }}
              onMouseDown={(event) => event.preventDefault()}
            >
              {choices.map((option, index) => (
                <div
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled || undefined}
                  className="fc-option"
                  data-active={active === index || undefined}
                  data-placeholder={!option.value || undefined}
                  onPointerMove={() => {
                    if (!option.disabled) setActive(index)
                  }}
                  onClick={() => choose(index)}
                >
                  <span>{option.label}</span>
                  {option.value === value ? (
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
                      <path
                        d="m4 10 4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

export type DateTimeLabels = {
  dialogTitle?: string
  previousMonth?: string
  nextMonth?: string
  calendarHelp?: string
  timeLabel?: string
  hourLabel?: string
  minuteLabel?: string
  clearLabel?: string
  cancelLabel?: string
  applyLabel?: string
  closeLabel?: string
  invalidTime?: string
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const monthFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const fullDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** The date is a request in the visitor's local timezone, not an appointment booking. */
export function BrandedDateTimePicker({
  id,
  name,
  value,
  onChange,
  placeholder = 'Choose a date and time',
  required,
  disabled,
  invalid,
  describedBy,
  labelledBy,
  onBlur,
  timeZone,
  labels = {},
}: CommonControlProps & { timeZone?: string; labels?: DateTimeLabels }) {
  const controlId = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const dayButtons = useRef(new Map<string, HTMLButtonElement>())
  const [open, setOpen] = useState(false)
  const [draftDate, setDraftDate] = useState<Date | null>(null)
  const [focusedDate, setFocusedDate] = useState<Date | null>(null)
  const [month, setMonth] = useState<Date | null>(null)
  const [hour, setHour] = useState('09')
  const [minute, setMinute] = useState('00')
  const [timeError, setTimeError] = useState(false)
  const current = parseLocalDateTime(value)
  const display = current
    ? `${dateFormatter.format(current.date)}, ${current.hour}:${current.minute}`
    : placeholder

  function close() {
    dialog.current?.close()
    setOpen(false)
    trigger.current?.focus()
    onBlur?.()
  }
  function show() {
    const now = new Date()
    const initial = current?.date || calendarDate(now.getFullYear(), now.getMonth(), now.getDate())
    setDraftDate(initial)
    setFocusedDate(initial)
    setMonth(calendarDate(initial.getUTCFullYear(), initial.getUTCMonth(), 1))
    setHour(current?.hour || '09')
    setMinute(current?.minute || '00')
    setTimeError(false)
    setOpen(true)
  }

  useLayoutEffect(() => {
    if (!open || !dialog.current) return
    const panel = dialog.current
    panel.showModal()
    function place() {
      const rect = trigger.current?.getBoundingClientRect()
      if (!rect) return
      const width = Math.min(352, window.innerWidth - 24)
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      panel.style.width = `${width}px`
      panel.style.maxHeight = `${Math.max(180, viewportHeight - 24)}px`
      const height = panel.getBoundingClientRect().height
      const below = viewportHeight - rect.bottom - 8
      const top =
        below >= height
          ? rect.bottom + 8
          : Math.max(12, Math.min(rect.top - height - 8, viewportHeight - height - 12))
      panel.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`
      panel.style.top = `${Math.max(12, top)}px`
    }
    place()
    const frame = requestAnimationFrame(() => {
      if (focusedDate) dayButtons.current.get(dateKey(focusedDate))?.focus({ preventScroll: true })
    })
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    window.visualViewport?.addEventListener('resize', place)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      window.visualViewport?.removeEventListener('resize', place)
      if (panel.open) panel.close()
    }
    // The draft can change while the same native modal remains open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (disabled && open) close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  function focusDay(next: Date) {
    if (next.getUTCFullYear() < MIN_CALENDAR_YEAR || next.getUTCFullYear() > MAX_CALENDAR_YEAR)
      return
    setFocusedDate(next)
    setMonth(calendarDate(next.getUTCFullYear(), next.getUTCMonth(), 1))
    requestAnimationFrame(() =>
      dayButtons.current.get(dateKey(next))?.focus({ preventScroll: true }),
    )
  }
  function dayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    let next: Date | null = null
    if (event.key === 'ArrowLeft')
      next = calendarDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 1)
    if (event.key === 'ArrowRight')
      next = calendarDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
    if (event.key === 'ArrowUp')
      next = calendarDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - 7)
    if (event.key === 'ArrowDown')
      next = calendarDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7)
    if (event.key === 'Home')
      next = calendarDate(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() - date.getUTCDay(),
      )
    if (event.key === 'End')
      next = calendarDate(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + 6 - date.getUTCDay(),
      )
    if (event.key === 'PageUp') next = shiftCalendarMonth(date, event.shiftKey ? -12 : -1)
    if (event.key === 'PageDown') next = shiftCalendarMonth(date, event.shiftKey ? 12 : 1)
    if (next) {
      event.preventDefault()
      focusDay(next)
    }
  }
  function changeMonth(amount: number) {
    if (!month || !focusedDate) return
    const nextMonth = shiftCalendarMonth(month, amount)
    setMonth(nextMonth)
    setFocusedDate(
      calendarDate(
        nextMonth.getUTCFullYear(),
        nextMonth.getUTCMonth(),
        Math.min(
          focusedDate.getUTCDate(),
          calendarDate(nextMonth.getUTCFullYear(), nextMonth.getUTCMonth() + 1, 0).getUTCDate(),
        ),
      ),
    )
  }
  function timeKeyDown(event: KeyboardEvent<HTMLInputElement>, segment: 'hour' | 'minute') {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
    event.preventDefault()
    const max = segment === 'hour' ? 24 : 60
    const number = Number(segment === 'hour' ? hour : minute) || 0
    const next = String((number + (event.key === 'ArrowUp' ? 1 : -1) + max) % max).padStart(2, '0')
    if (segment === 'hour') setHour(next)
    else setMinute(next)
    setTimeError(false)
  }
  function containTabFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const panel = event.currentTarget
    const controls = Array.from(
      panel.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href], [tabindex]'),
    ).filter(
      (element) =>
        element.tabIndex >= 0 &&
        !element.matches(':disabled') &&
        element.getClientRects().length > 0 &&
        !element.closest('[hidden], [aria-hidden="true"]'),
    )
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (!first || !last) {
      event.preventDefault()
      return
    }
    const active = document.activeElement
    if (event.shiftKey && (active === first || active === panel)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (active === last || active === panel)) {
      event.preventDefault()
      first.focus()
    }
  }
  function apply() {
    const validHour = /^\d{1,2}$/.test(hour) && Number(hour) <= 23
    const validMinute = /^\d{1,2}$/.test(minute) && Number(minute) <= 59
    if (!draftDate || !validHour || !validMinute) {
      setTimeError(true)
      const segments = dialog.current?.querySelectorAll<HTMLInputElement>('.fc-time-input')
      segments?.[validHour ? 1 : 0]?.focus()
      return
    }
    onChange(`${dateKey(draftDate)}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`)
    close()
  }

  const first = month
    ? calendarDate(month.getUTCFullYear(), month.getUTCMonth(), 1 - month.getUTCDay())
    : null
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const days = first
    ? Array.from({ length: 42 }, (_, index) =>
        calendarDate(first.getUTCFullYear(), first.getUTCMonth(), first.getUTCDate() + index),
      )
    : []

  return (
    <div className="fc-control" data-open={open || undefined}>
      <input type="hidden" name={name} value={value} disabled={disabled} />
      <button
        ref={trigger}
        id={id}
        type="button"
        className="fc-trigger"
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? controlId : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-labelledby={labelledBy}
        disabled={disabled}
        data-placeholder={!current || undefined}
        onClick={show}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault()
            show()
          }
        }}
        onBlur={() => {
          if (!open) onBlur?.()
        }}
      >
        <span>{display}</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path
            d="M7 3v4m10-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14h2m4 0h2m-8 3h2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && month && draftDate && focusedDate
        ? createPortal(
            <dialog
              ref={dialog}
              id={controlId}
              className="fc-date-dialog"
              aria-labelledby={`${controlId}-title`}
              aria-describedby={`${controlId}-help`}
              onKeyDown={containTabFocus}
              onCancel={(event) => {
                event.preventDefault()
                close()
              }}
              onClick={(event) => {
                if (event.target !== event.currentTarget) return
                const rect = event.currentTarget.getBoundingClientRect()
                if (
                  event.clientX < rect.left ||
                  event.clientX > rect.right ||
                  event.clientY < rect.top ||
                  event.clientY > rect.bottom
                )
                  close()
              }}
            >
              <div className="fc-date-title">
                <h2 id={`${controlId}-title`}>{labels.dialogTitle || 'Choose date and time'}</h2>
                <button
                  type="button"
                  className="fc-icon-button"
                  aria-label={labels.closeLabel || 'Close date picker'}
                  onClick={close}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <p className="fc-visually-hidden" id={`${controlId}-help`}>
                {labels.calendarHelp ||
                  'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.'}
              </p>
              <div className="fc-month-nav">
                <button
                  type="button"
                  className="fc-icon-button"
                  aria-label={labels.previousMonth || 'Previous month'}
                  disabled={
                    month.getUTCFullYear() === MIN_CALENDAR_YEAR && month.getUTCMonth() === 0
                  }
                  onClick={() => changeMonth(-1)}
                >
                  <Chevron direction="left" />
                </button>
                <h3 aria-live="polite">{monthFormatter.format(month)}</h3>
                <button
                  type="button"
                  className="fc-icon-button"
                  aria-label={labels.nextMonth || 'Next month'}
                  disabled={
                    month.getUTCFullYear() === MAX_CALENDAR_YEAR && month.getUTCMonth() === 11
                  }
                  onClick={() => changeMonth(1)}
                >
                  <Chevron direction="right" />
                </button>
              </div>
              <table className="fc-calendar" role="grid" aria-label={monthFormatter.format(month)}>
                <thead>
                  <tr>
                    {weekdays.map((day) => (
                      <th key={day} scope="col" abbr={day}>
                        {day.slice(0, 2)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }, (_, week) => (
                    <tr key={week}>
                      {days.slice(week * 7, week * 7 + 7).map((date) => {
                        const key = dateKey(date)
                        const selectedDay = key === dateKey(draftDate)
                        const allowed =
                          date.getUTCFullYear() >= MIN_CALENDAR_YEAR &&
                          date.getUTCFullYear() <= MAX_CALENDAR_YEAR
                        return (
                          <td key={key} role="gridcell" aria-selected={selectedDay}>
                            <button
                              ref={(element) => {
                                if (element) dayButtons.current.set(key, element)
                                else dayButtons.current.delete(key)
                              }}
                              type="button"
                              className="fc-day"
                              tabIndex={key === dateKey(focusedDate) ? 0 : -1}
                              aria-label={fullDateFormatter.format(date)}
                              aria-current={key === today ? 'date' : undefined}
                              data-selected={selectedDay || undefined}
                              data-outside-month={
                                date.getUTCMonth() !== month.getUTCMonth() || undefined
                              }
                              disabled={!allowed}
                              onFocus={() => setFocusedDate(date)}
                              onKeyDown={(event) => dayKeyDown(event, date)}
                              onClick={() => {
                                setDraftDate(date)
                                setFocusedDate(date)
                                setMonth(calendarDate(date.getUTCFullYear(), date.getUTCMonth(), 1))
                              }}
                            >
                              {date.getUTCDate()}
                            </button>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="fc-time">
                <div>
                  <p className="fc-time-label" id={`${controlId}-time`}>
                    {labels.timeLabel || 'Time (24-hour)'}
                  </p>
                  {timeZone ? <p className="fc-timezone">{timeZone}</p> : null}
                </div>
                <div
                  className="fc-time-segments"
                  role="group"
                  aria-labelledby={`${controlId}-time`}
                >
                  <input
                    className="fc-time-input"
                    aria-label={labels.hourLabel || 'Hour, 00 to 23'}
                    aria-invalid={timeError || undefined}
                    aria-describedby={timeError ? `${controlId}-time-error` : undefined}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={2}
                    value={hour}
                    onChange={(event) => {
                      setHour(event.target.value.replace(/\D/g, '').slice(0, 2))
                      setTimeError(false)
                    }}
                    onKeyDown={(event) => timeKeyDown(event, 'hour')}
                    onBlur={() => {
                      if (hour && Number(hour) <= 23) setHour(hour.padStart(2, '0'))
                    }}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                  <span aria-hidden="true">:</span>
                  <input
                    className="fc-time-input"
                    aria-label={labels.minuteLabel || 'Minute, 00 to 59'}
                    aria-invalid={timeError || undefined}
                    aria-describedby={timeError ? `${controlId}-time-error` : undefined}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={2}
                    value={minute}
                    onChange={(event) => {
                      setMinute(event.target.value.replace(/\D/g, '').slice(0, 2))
                      setTimeError(false)
                    }}
                    onKeyDown={(event) => timeKeyDown(event, 'minute')}
                    onBlur={() => {
                      if (minute && Number(minute) <= 59) setMinute(minute.padStart(2, '0'))
                    }}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                </div>
              </div>
              {timeError ? (
                <p className="fc-time-error" id={`${controlId}-time-error`} role="alert">
                  {labels.invalidTime || 'Enter an hour from 00–23 and minutes from 00–59.'}
                </p>
              ) : null}
              <div className="fc-date-actions">
                <button
                  type="button"
                  className="fc-text-button"
                  onClick={() => {
                    onChange('')
                    close()
                  }}
                >
                  {labels.clearLabel || 'Clear'}
                </button>
                <button type="button" className="fc-text-button" onClick={close}>
                  {labels.cancelLabel || 'Cancel'}
                </button>
                <button type="button" className="fc-apply-button" onClick={apply}>
                  {labels.applyLabel || 'Apply'}
                </button>
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </div>
  )
}
