import { validLocalDateTime } from '../lib/contact-form'

export const MIN_CALENDAR_YEAR = 1900
export const MAX_CALENDAR_YEAR = 2200

/** Calendar arithmetic uses UTC only to avoid daylight-saving date rollover.
 * Submitted values are local date/time strings, never UTC conversions. */
export function calendarDate(year: number, month: number, day: number): Date {
  const date = new Date(0)
  date.setUTCFullYear(year, month, day)
  date.setUTCHours(12, 0, 0, 0)
  return date
}

export function dateKey(date: Date): string {
  return `${String(date.getUTCFullYear()).padStart(4, '0')}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
}

export function daysInMonth(year: number, month: number): number {
  return calendarDate(year, month + 1, 0).getUTCDate()
}

export function parseLocalDateTime(
  value: string,
): { date: Date; hour: string; minute: string } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value)
  if (!match || !validLocalDateTime(value)) return null
  const [, yearText, monthText, dayText, hour, minute] = match
  const year = Number(yearText)
  const month = Number(monthText) - 1
  const day = Number(dayText)
  return { date: calendarDate(year, month, day), hour, minute }
}

export function shiftCalendarMonth(date: Date, amount: number): Date {
  const target = calendarDate(date.getUTCFullYear(), date.getUTCMonth() + amount, 1)
  if (target.getUTCFullYear() < MIN_CALENDAR_YEAR) return calendarDate(MIN_CALENDAR_YEAR, 0, 1)
  if (target.getUTCFullYear() > MAX_CALENDAR_YEAR) return calendarDate(MAX_CALENDAR_YEAR, 11, 31)
  target.setUTCDate(
    Math.min(date.getUTCDate(), daysInMonth(target.getUTCFullYear(), target.getUTCMonth())),
  )
  return target
}
