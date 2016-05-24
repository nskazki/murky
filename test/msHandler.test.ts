'use strict'

import { color, nocolor } from '../src'
import { yellow } from 'chalk'
import assert = require('power-assert')

describe('ms', () => {
  it('0', () => {
    const cRes = color('%ms', 0)
    const nRes = nocolor('%ms', 0)

    const cExp = yellow('[0 seconds 0 ms]')
    const nExp = '[0 seconds 0 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-0', () => {
    const cRes = color('%ms', -0)
    const nRes = nocolor('%ms', -0)

    const cExp = yellow('[0 seconds 0 ms]')
    const nExp = '[0 seconds 0 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1', () => {
    const cRes = color('%ms', 1)
    const nRes = nocolor('%ms', 1)

    const cExp = yellow('[0 seconds 1 ms]')
    const nExp = '[0 seconds 1 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1', () => {
    const cRes = color('%ms', -1)
    const nRes = nocolor('%ms', -1)

    const cExp = yellow('[0 seconds -1 ms]')
    const nExp = '[0 seconds -1 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1e1', () => {
    const cRes = color('%ms', 1e1)
    const nRes = nocolor('%ms', 1e1)

    const cExp = yellow('[0 seconds 10 ms]')
    const nExp = '[0 seconds 10 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1e3', () => {
    const cRes = color('%ms', 1e3)
    const nRes = nocolor('%ms', 1e3)

    const cExp = yellow('[1 second 0 ms]')
    const nExp = '[1 second 0 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1e5', () => {
    const cRes = color('%ms', 1e5)
    const nRes = nocolor('%ms', 1e5)

    const cExp = yellow('[1 minute 40 seconds]')
    const nExp = '[1 minute 40 seconds]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1e7', () => {
    const cRes = color('%ms', 1e7)
    const nRes = nocolor('%ms', 1e7)

    const cExp = yellow('[2 hours 46 minutes]')
    const nExp = '[2 hours 46 minutes]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1e9', () => {
    const cRes = color('%ms', 1e9)
    const nRes = nocolor('%ms', 1e9)

    const cExp = yellow('[11 days 13 hours]')
    const nExp = '[11 days 13 hours]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1e10', () => {
    const cRes = color('%ms', 1e10)
    const nRes = nocolor('%ms', 1e10)

    const cExp = yellow('[3 months 25 days]')
    const nExp = '[3 months 25 days]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1e3', () => {
    const cRes = color('%ms', -1e3)
    const nRes = nocolor('%ms', -1e3)

    const cExp = yellow('[-1 seconds 0 ms]')
    const nExp = '[-1 seconds 0 ms]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1e6', () => {
    const cRes = color('%ms', -1e6)
    const nRes = nocolor('%ms', -1e6)

    const cExp = yellow('[-16 minutes -40 seconds]')
    const nExp = '[-16 minutes -40 seconds]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: 1.234e5', () => {
    const cRes = color('%ms', 1.234e5)
    const nRes = nocolor('%ms', 1.234e5)

    const cExp = yellow('[2 minutes 3 seconds]')
    const nExp = '[2 minutes 3 seconds]'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('throw: wrong replacer type', () => {
    assert.throws(() => color('%ms', []), '[]')
    assert.throws(() => color('%ms', {}), '{}')
    assert.throws(() => color('%ms', /./), '/./')
  })

  it('throw: string has unexpected format', () => {
    assert.throws(() => color('%ms', ''))
    assert.throws(() => color('%ms', '.'))
    assert.throws(() => color('%ms', 'e'), 'e')
    assert.throws(() => color('%ms', '.e'), '.e')
    assert.throws(() => color('%ms', '.e3'), '.e3')
    assert.throws(() => color('%ms', '-123e'), '-123e')
    assert.throws(() => color('%ms', 'e123'), 'e123')
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
