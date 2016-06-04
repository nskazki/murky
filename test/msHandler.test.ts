'use strict'

import { color, nocolor } from '../src'
import { yellow } from 'chalk'
import assert = require('power-assert')

const s = (v: number) => v * 1000
const m = (v: number) => s(v * 60)
const h = (v: number) => m(v * 60)
const d = (v: number) => h(v * 24)
const M = (v: number) => d(v * 30)
const Y = (v: number) => d(v * 365)
const D = (v: number) => Y(v * 10)
const C = (v: number) => D(v * 10)
const I = (v: number) => C(v * 10)

describe('ms', () => {
  it('0 -> 0 ms', () => {
    const cRes = color('%ms', 0)
    const nRes = nocolor('%ms', 0)

    const cExp = yellow('0 ms')
    const nExp = '0 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-0 -> 0 ms', () => {
    const cRes = color('%ms', -0)
    const nRes = nocolor('%ms', -0)

    const cExp = yellow('0 ms')
    const nExp = '0 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('0.5 -> 0 ms', () => {
    const cRes = color('%ms', 0.5)
    const nRes = nocolor('%ms', 0.5)

    const cExp = yellow('0 ms')
    const nExp = '0 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-0.5 -> 0 ms', () => {
    const cRes = color('%ms', -0.5)
    const nRes = nocolor('%ms', -0.5)

    const cExp = yellow('0 ms')
    const nExp = '0 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 ms', () => {
    const cRes = color('%ms', 1)
    const nRes = nocolor('%ms', 1)

    const cExp = yellow('1 ms')
    const nExp = '1 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1 ms', () => {
    const cRes = color('%ms', -1)
    const nRes = nocolor('%ms', -1)

    const cExp = yellow('-1 ms')
    const nExp = '-1 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })


  it('1 second 1 ms', () => {
    const cRes = color('%ms', s(1) + 1)
    const nRes = nocolor('%ms', s(1) + 1)

    const cExp = yellow('1 second 1 ms')
    const nExp = '1 second 1 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1 seconds 1 ms', () => {
    const cRes = color('%ms', s(-1) - 1)
    const nRes = nocolor('%ms', s(-1) - 1)

    const cExp = yellow('-1 seconds -1 ms')
    const nExp = '-1 seconds -1 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('59 seconds 999 ms', () => {
    const cRes = color('%ms', s(59) + 999)
    const nRes = nocolor('%ms', s(59) + 999)

    const cExp = yellow('59 seconds 999 ms')
    const nExp = '59 seconds 999 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-59 seconds 999 ms', () => {
    const cRes = color('%ms', s(-59) - 999)
    const nRes = nocolor('%ms', s(-59) - 999)

    const cExp = yellow('-59 seconds -999 ms')
    const nExp = '-59 seconds -999 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 minute 1 ms', () => {
    const cRes = color('%ms', m(1) + 1)
    const nRes = nocolor('%ms', m(1) + 1)

    const cExp = yellow('1 minute 1 ms')
    const nExp = '1 minute 1 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1 minutes 1 ms', () => {
    const cRes = color('%ms', m(-1) - 1)
    const nRes = nocolor('%ms', m(-1) - 1)

    const cExp = yellow('-1 minutes -1 ms')
    const nExp = '-1 minutes -1 ms'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 hour', () => {
    const cRes = color('%ms', h(1))
    const nRes = nocolor('%ms', h(1))

    const cExp = yellow('1 hour')
    const nExp = '1 hour'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('23 hours', () => {
    const cRes = color('%ms', h(23))
    const nRes = nocolor('%ms', h(23))

    const cExp = yellow('23 hours')
    const nExp = '23 hours'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 day', () => {
    const cRes = color('%ms', d(1))
    const nRes = nocolor('%ms', d(1))

    const cExp = yellow('1 day')
    const nExp = '1 day'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('29 days', () => {
    const cRes = color('%ms', d(29))
    const nRes = nocolor('%ms', d(29))

    const cExp = yellow('29 days')
    const nExp = '29 days'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 month', () => {
    const cRes = color('%ms', M(1))
    const nRes = nocolor('%ms', M(1))

    const cExp = yellow('1 month')
    const nExp = '1 month'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('11 months', () => {
    const cRes = color('%ms', M(11))
    const nRes = nocolor('%ms', M(11))

    const cExp = yellow('11 months')
    const nExp = '11 months'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 year', () => {
    const cRes = color('%ms', Y(1))
    const nRes = nocolor('%ms', Y(1))

    const cExp = yellow('1 year')
    const nExp = '1 year'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('9 years', () => {
    const cRes = color('%ms', Y(9))
    const nRes = nocolor('%ms', Y(9))

    const cExp = yellow('9 years')
    const nExp = '9 years'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 decade', () => {
    const cRes = color('%ms', D(1))
    const nRes = nocolor('%ms', D(1))

    const cExp = yellow('1 decade')
    const nExp = '1 decade'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('9 decades', () => {
    const cRes = color('%ms', D(9))
    const nRes = nocolor('%ms', D(9))

    const cExp = yellow('9 decades')
    const nExp = '9 decades'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 century', () => {
    const cRes = color('%ms', C(1))
    const nRes = nocolor('%ms', C(1))

    const cExp = yellow('1 century')
    const nExp = '1 century'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('9 centuries', () => {
    const cRes = color('%ms', C(9))
    const nRes = nocolor('%ms', C(9))

    const cExp = yellow('9 centuries')
    const nExp = '9 centuries'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1 millennium', () => {
    const cRes = color('%ms', I(1))
    const nRes = nocolor('%ms', I(1))

    const cExp = yellow('1 millennium')
    const nExp = '1 millennium'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('9 millenniums', () => {
    const cRes = color('%ms', I(9))
    const nRes = nocolor('%ms', I(9))

    const cExp = yellow('9 millenniums')
    const nExp = '9 millenniums'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('123456789 millenniums', () => {
    const cRes = color('%ms', I(123456789))
    const nRes = nocolor('%ms', I(123456789))

    const cExp = yellow('123456789 millenniums')
    const nExp = '123456789 millenniums'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('I(1) + h(23) -> 1 millennium 23 hours', () => {
    const cRes = color('%ms', I(1) + h(23))
    const nRes = nocolor('%ms', I(1) + h(23))

    const cExp = yellow('1 millennium 23 hours')
    const nExp = '1 millennium 23 hours'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('I(1) + h(23) + m(59) + s(59) -> 1 millennium 23 hours', () => {
    const cRes = color('%ms', I(1) + h(23) + m(59) + s(59))
    const nRes = nocolor('%ms', I(1) + h(23) + m(59) + s(59))

    const cExp = yellow('1 millennium 23 hours')
    const nExp = '1 millennium 23 hours'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: 1.234e5', () => {
    const cRes = color('%ms', 1.234e5)
    const nRes = nocolor('%ms', 1.234e5)

    const cExp = yellow('2 minutes 3 seconds')
    const nExp = '2 minutes 3 seconds'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('NOT throw: wrong replacer type, but original placeholder will be replaced by string placeholder', () => {
    assert.equal(nocolor('%ms', []), '[]')
    assert.equal(nocolor('%ms', {}), '{}')
    assert.equal(nocolor('%ms', /./), '/./')
  })

  it('NOT throw: string has unexpected format, but original placeholder will be replaced by string placeholder', () => {
    assert.equal(nocolor('%ms', ''), '')
    assert.equal(nocolor('%ms', '.'), '.')
    assert.equal(nocolor('%ms', 'e'), 'e')
    assert.equal(nocolor('%ms', '.e'), '.e')
    assert.equal(nocolor('%ms', '.e3'), '.e3')
    assert.equal(nocolor('%ms', '-123e'), '-123e')
    assert.equal(nocolor('%ms', 'e123'), 'e123')
  })

  it('throw: placeholders < args', () => {
    assert.throws(() => color('%ms', 123, 123))
    assert.throws(() => nocolor('%ms %%ms %ms', 123, 123, 123))
  })

  it('throw: placeholders > args', () => {
    assert.throws(() => color('%ms'))
    assert.throws(() => nocolor('%ms %%ms %ms', 123))
  })
})
