import assert from 'node:assert/strict'
import test from 'node:test'
import { mediaAlt, mediaURL, populated, safeHref } from '../src/lib/content'

test('CMS links support actual website, enquiry, contact, and section destinations', () => {
  for (const href of [
    '/projects/dockiship',
    '/#process',
    '#early-access',
    'https://wa.me/923330365252',
    'mailto:hello@imadi-innovations.com',
    'tel:+923330365252',
  ]) {
    assert.equal(safeHref(` ${href} `), href)
  }
})

test('invalid CMS links fall back without passing executable or protocol-relative values to the browser', () => {
  for (const href of [
    undefined,
    null,
    42,
    '',
    'javascript:alert(1)',
    'data:text/html,<h1>Hello</h1>',
    '//example.org',
    'ftp://example.org/file',
  ]) {
    assert.equal(safeHref(href, '/'), '/')
  }
})

test('browser-normalized slash variants cannot turn internal CMS links into offsite navigation', () => {
  for (const href of ['/\\example.org/path', '/\n/example.org/path', '/\t/example.org/path']) {
    // Browsers normalize these inputs into an external URL despite a single
    // initial slash. Treat them as invalid rather than as internal destinations.
    assert.notEqual(
      new URL(href, 'https://imadi-innovations.com').origin,
      'https://imadi-innovations.com',
    )
    assert.equal(safeHref(href, '/contact'), '/contact')
  }
})

test('missing or unpopulated media uses the intended fallback rather than a broken record ID', () => {
  for (const media of [null, undefined, 12, '12', { id: 12 }]) {
    assert.equal(mediaURL(media, '/figma/8019-216-imgLogo.png'), '/figma/8019-216-imgLogo.png')
  }
  assert.equal(
    mediaURL({ id: 12, url: '/api/media/file/dockiship.png' }),
    '/api/media/file/dockiship.png',
  )
  assert.equal(mediaURL('/company/dockiship-desktop.png'), '/company/dockiship-desktop.png')
})

test('edited alternative text survives and an intentional decorative alt remains empty', () => {
  assert.equal(
    mediaAlt({ alt: 'DockiShip order dashboard' }, 'Project image'),
    'DockiShip order dashboard',
  )
  assert.equal(mediaAlt({ alt: '' }, 'Decorative artwork'), '')
  assert.equal(mediaAlt({ id: 12 }, 'Project image'), 'Project image')
})

test('relationship selections retain editorial order and omit unavailable record references', () => {
  const later = { id: 9, title: 'Second selected project' }
  const first = { id: 3, title: 'First selected project' }
  const selected = [later, 12, null, first, 'unpopulated-reference']
  assert.deepEqual(populated(selected), [later, first])
  assert.equal(selected.length, 5)
  assert.deepEqual(populated(null), [])
})
