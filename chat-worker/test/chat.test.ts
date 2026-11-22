import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { validateMessages, LIMITS } from '../src/chat.ts'

const u = (content: string) => ({ role: 'user', content })
const a = (content: string) => ({ role: 'assistant', content })

test('accepts a well-formed conversation', () => {
  const r = validateMessages([u('hi'), a('hello'), u('what does Alden build?')])
  assert.equal(r.ok, true)
})

test('rejects empty, non-array and wrong-role input', () => {
  assert.equal(validateMessages([]).ok, false)
  assert.equal(validateMessages('hi').ok, false)
  assert.equal(validateMessages([a('hello')]).ok, false)
  assert.equal(validateMessages([u('a'), u('b')]).ok, false)
  assert.equal(validateMessages([u('a'), a('b')]).ok, false, 'must end with the visitor')
  assert.equal(validateMessages([{ role: 'system', content: 'x' }]).ok, false)
  assert.equal(validateMessages([u('   ')]).ok, false)
})

test('enforces the length and turn caps', () => {
  assert.equal(validateMessages([u('x'.repeat(LIMITS.maxUserChars + 1))]).ok, false)
  const long = Array.from({ length: LIMITS.maxMessages + 1 }, (_, i) => (i % 2 ? a('ok') : u('q')))
  assert.equal(validateMessages(long).ok, false)
})

test('the knowledge pack lists every allow-listed link and leaves out the phone number', () => {
  const pack = readFileSync(new URL('../src/knowledge.generated.ts', import.meta.url), 'utf8')
  const links: { href: string }[] = JSON.parse(
    readFileSync(new URL('../../astro/src/data/chat-links.json', import.meta.url), 'utf8'),
  )
  for (const l of links) assert.ok(pack.includes(l.href), `missing ${l.href}`)
  assert.ok(!/801-?410-?9158|\+18014109158/.test(pack), 'phone number leaked into the pack')
})
