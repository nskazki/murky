'use strict'

import { color, nocolor } from '../src'
import { yellow } from 'chalk'
import assert = require('power-assert')

const KB = (v: number) => v * 1024
const MB = (v: number) => KB(v) * 1024
const GB = (v: number) => MB(v) * 1024
const TB = (v: number) => GB(v) * 1024
const PB = (v: number) => TB(v) * 1024
const EB = (v: number) => PB(v) * 1024
const ZB = (v: number) => EB(v) * 1024
const YB = (v: number) => ZB(v) * 1024

describe('filesize', () => {
  it('0 -> 0B', () => {
    const cRes = color('%b', 0)
    const nRes = nocolor('%b', 0)

    const cExp = yellow('0B')
    const nExp = '0B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-0 -> 0B', () => {
    const cRes = color('%b', -0)
    const nRes = nocolor('%b', -0)

    const cExp = yellow('0B')
    const nExp = '0B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('0.1 -> 0B', () => {
    const cRes = color('%b', 0.1)
    const nRes = nocolor('%b', 0.1)

    const cExp = yellow('0B')
    const nExp = '0B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-0.1 -> 0B', () => {
    const cRes = color('%b', -0.1)
    const nRes = nocolor('%b', -0.1)

    const cExp = yellow('0B')
    const nExp = '0B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('0.5 -> 1B', () => {
    const cRes = color('%b', 0.5)
    const nRes = nocolor('%b', 0.5)

    const cExp = yellow('1B')
    const nExp = '1B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-0.5 -> 0B', () => {
    const cRes = color('%b', -0.5)
    const nRes = nocolor('%b', -0.5)

    const cExp = yellow('-1B')
    const nExp = '-1B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1B', () => {
    const cRes = color('%b', 1)
    const nRes = nocolor('%b', 1)

    const cExp = yellow('1B')
    const nExp = '1B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1B', () => {
    const cRes = color('%b', -1)
    const nRes = nocolor('%b', -1)

    const cExp = yellow('-1B')
    const nExp = '-1B'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1KB', () => {
    const cRes = color('%b', KB(1))
    const nRes = nocolor('%b', KB(1))

    const cExp = yellow('1KB')
    const nExp = '1KB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1.5KB', () => {
    const cRes = color('%b', KB(1) + 512)
    const nRes = nocolor('%b', KB(1) + 512)

    const cExp = yellow('1.5KB')
    const nExp = '1.5KB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('KB(1023) -> 1023KB', () => {
    const cRes = color('%b', KB(1023))
    const nRes = nocolor('%b', KB(1023))

    const cExp = yellow('1023KB')
    const nExp = '1023KB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('MB(1) - KB(1) -> 1023KB', () => {
    const cRes = color('%b', MB(1) - KB(1))
    const nRes = nocolor('%b', MB(1) - KB(1))

    const cExp = yellow('1023KB')
    const nExp = '1023KB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('MB(1) - 1 -> 1024KB', () => {
    const cRes = color('%b', MB(1) - 1)
    const nRes = nocolor('%b', MB(1) - 1)

    const cExp = yellow('1024KB')
    const nExp = '1024KB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('2GB', () => {
    const cRes = color('%b', GB(2))
    const nRes = nocolor('%b', GB(2))

    const cExp = yellow('2GB')
    const nExp = '2GB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('10TB', () => {
    const cRes = color('%b', TB(10))
    const nRes = nocolor('%b', TB(10))

    const cExp = yellow('10TB')
    const nExp = '10TB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('100PB', () => {
    const cRes = color('%b', PB(100))
    const nRes = nocolor('%b', PB(100))

    const cExp = yellow('100PB')
    const nExp = '100PB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('512EB', () => {
    const cRes = color('%b', EB(512))
    const nRes = nocolor('%b', EB(512))

    const cExp = yellow('512EB')
    const nExp = '512EB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-1ZB', () => {
    const cRes = color('%b', ZB(-1))
    const nRes = nocolor('%b', ZB(-1))

    const cExp = yellow('-1ZB')
    const nExp = '-1ZB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1023YB', () => {
    const cRes = color('%b', YB(1023))
    const nRes = nocolor('%b', YB(1023))

    const cExp = yellow('1023YB')
    const nExp = '1023YB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('1024YB', () => {
    const cRes = color('%b', YB(1024))
    const nRes = nocolor('%b', YB(1024))

    const cExp = yellow('1024YB')
    const nExp = '1024YB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('123456789YB', () => {
    const cRes = color('%b', YB(123456789))
    const nRes = nocolor('%b', YB(123456789))

    const cExp = yellow('123456789YB')
    const nExp = '123456789YB'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('NOT throw: wrong replacer type, but original placeholder will be replaced by string placeholder', () => {
    assert.equal(nocolor('%b', []), '[]')
    assert.equal(nocolor('%b', {}), '{}')
    assert.equal(nocolor('%b', /./), '/./')
  })

  it('NOT throw: string has unexpected format, but original placeholder will be replaced by string placeholder', () => {
    assert.equal(nocolor('%b', ''), '')
    assert.equal(nocolor('%b', '.'), '.')
    assert.equal(nocolor('%b', 'e'), 'e')
    assert.equal(nocolor('%b', '.e'), '.e')
    assert.equal(nocolor('%b', '.e3'), '.e3')
    assert.equal(nocolor('%b', '-123e'), '-123e')
    assert.equal(nocolor('%b', 'e123'), 'e123')
  })
})
