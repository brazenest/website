import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TOPICS, exchangeText, toLabels } from '../src/classify.ts'
import { VENTURES } from '../src/knowledge.generated.ts'

test('every venture is a topic, and house is not', () => {
  for (const v of VENTURES) assert.ok((TOPICS as readonly string[]).includes(v.slug), v.slug)
  assert.ok(!(TOPICS as readonly string[]).includes('house'))
})

test('toLabels keeps known values, dedupes, caps topics at three', () => {
  const l = toLabels({ topics: ['rotavox', 'rotavox', 'nonsense', 'career', 'bolt', 'writing'], coverage: 'partial', intent: 'hiring' })
  assert.deepEqual(l, { topics: ['rotavox', 'career', 'bolt'], primary_topic: 'rotavox', coverage: 'partial', intent: 'hiring' })
})

test('toLabels rejects unusable output', () => {
  assert.equal(toLabels(null), null)
  assert.equal(toLabels({ topics: [], coverage: 'answered', intent: 'curious' }), null)
  assert.equal(toLabels({ topics: ['memrey'], coverage: 'sure', intent: 'curious' }), null)
  assert.equal(toLabels({ topics: ['memrey'], coverage: 'answered', intent: 'buy' }), null)
})

test('exchangeText sends the previous and latest question and the answer, truncated', () => {
  const t = exchangeText(
    [
      { role: 'user', content: 'What is Rotavox?' },
      { role: 'assistant', content: 'Music scheduling.' },
      { role: 'user', content: 'x'.repeat(5000) },
    ],
    'y'.repeat(9000),
  )
  assert.match(t, /<previous_question>What is Rotavox\?<\/previous_question>/)
  assert.ok(!t.includes('Music scheduling.'), 'earlier answers are not sent')
  assert.ok(t.length < 1500 + 2500 + 200)
})

test('probing and off_topic stand alone', () => {
  assert.deepEqual(toLabels({ topics: ['career', 'probing'], coverage: 'declined', intent: 'probing' })?.topics, ['probing'])
})
