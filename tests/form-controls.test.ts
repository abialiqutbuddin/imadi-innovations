import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calendarDate,
  dateKey,
  daysInMonth,
  parseLocalDateTime,
  shiftCalendarMonth,
} from '../src/components/form-control-utils'

test('calendar month navigation clamps month-end and leap-year days', () => {
  assert.equal(dateKey(shiftCalendarMonth(calendarDate(2027, 0, 31), 1)), '2027-02-28')
  assert.equal(dateKey(shiftCalendarMonth(calendarDate(2028, 0, 31), 1)), '2028-02-29')
  assert.equal(dateKey(shiftCalendarMonth(calendarDate(2028, 1, 29), 12)), '2029-02-28')
  assert.equal(dateKey(shiftCalendarMonth(calendarDate(2026, 11, 31), 1)), '2027-01-31')
  assert.equal(daysInMonth(1900, 1), 28)
  assert.equal(daysInMonth(2000, 1), 29)
})

test('calendar navigation stays within the accepted API date range', () => {
  assert.equal(dateKey(shiftCalendarMonth(calendarDate(1900, 0, 1), -1)), '1900-01-01')
  assert.equal(dateKey(shiftCalendarMonth(calendarDate(2200, 11, 31), 1)), '2200-12-31')
  assert.equal(parseLocalDateTime('1899-12-31T23:59'), null)
  assert.equal(parseLocalDateTime('2201-01-01T00:00'), null)
})

test('calendar parsing preserves local wall time without timezone conversion', () => {
  const result = parseLocalDateTime('2028-02-29T00:05')
  assert.ok(result)
  assert.equal(dateKey(result.date), '2028-02-29')
  assert.equal(result.hour, '00')
  assert.equal(result.minute, '05')
  for (const value of [
    '2027-02-29T09:30',
    '2026-04-31T12:00',
    '2026-10-18T24:00',
    '2026-10-18T12:60',
    '2026-10-18T12:00Z',
  ]) {
    assert.equal(parseLocalDateTime(value), null, value)
  }
})
