'use strict'

import { color, nocolor } from '../src'
import { yellow } from 'chalk'
import assert = require('power-assert')

describe('number', () => {
  it('+integer: 1e2', () => {
    const cRes = color('%n', 1e2)
    const nRes = nocolor('%n', 1e2)

    const cExp = yellow('100')
    const nExp = '100'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('+integer: 1e3', () => {
    const cRes = color('%n', 1e3)
    const nRes = nocolor('%n', 1e3)

    const cExp = yellow('1,000')
    const nExp = '1,000'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('+interger: 1e8', () => {
    const cRes = color('%n', 1e8)
    const nRes = nocolor('%n', 1e8)

    const cExp = yellow('100,000,000')
    const nExp = '100,000,000'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-integer: -1e2', () => {
    const cRes = color('%n', -1e2)
    const nRes = nocolor('%n', -1e2)

    const cExp = yellow('-100')
    const nExp = '-100'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-integer: -1e3', () => {
    const cRes = color('%n', -1e3)
    const nRes = nocolor('%n', -1e3)

    const cExp = yellow('-1,000')
    const nExp = '-1,000'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-integer: -1e8', () => {
    const cRes = color('%n', -1e8)
    const nRes = nocolor('%n', -1e8)

    const cExp = yellow('-100,000,000')
    const nExp = '-100,000,000'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('NaN', () => {
    const cRes = color('%n', NaN)
    const nRes = nocolor('%n', NaN)

    const cExp = yellow('NaN')
    const nExp = 'NaN'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('Infinity', () => {
    const cRes = color('%n', Infinity)
    const nRes = nocolor('%n', Infinity)

    const cExp = yellow('Infinity')
    const nExp = 'Infinity'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('-Infinity', () => {
    const cRes = color('%n', -Infinity)
    const nRes = nocolor('%n', -Infinity)

    const cExp = yellow('-Infinity')
    const nExp = '-Infinity'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: 1.2', () => {
    const cRes = color('%n', 1.2)
    const nRes = nocolor('%n', 1.2)

    const cExp = yellow('1.20')
    const nExp = '1.20'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: 1.23', () => {
    const cRes = color('%n', 1.23)
    const nRes = nocolor('%n', 1.23)

    const cExp = yellow('1.23')
    const nExp = '1.23'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: 1.234', () => {
    const cRes = color('%n', 1.234)
    const nRes = nocolor('%n', 1.234)

    const cExp = yellow('1.23')
    const nExp = '1.23'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: -1.2', () => {
    const cRes = color('%n', -1.2)
    const nRes = nocolor('%n', -1.2)

    const cExp = yellow('-1.20')
    const nExp = '-1.20'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: -1.23', () => {
    const cRes = color('%n', -1.23)
    const nRes = nocolor('%n', -1.23)

    const cExp = yellow('-1.23')
    const nExp = '-1.23'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: -1.234', () => {
    const cRes = color('%n', -1.234)
    const nRes = nocolor('%n', -1.234)

    const cExp = yellow('-1.23')
    const nExp = '-1.23'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: 12345678.9', () => {
    const cRes = color('%n', 12345678.9)
    const nRes = nocolor('%n', 12345678.9)

    const cExp = yellow('12,345,678.90')
    const nExp = '12,345,678.90'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: 1234567.89', () => {
    const cRes = color('%n', 1234567.89)
    const nRes = nocolor('%n', 1234567.89)

    const cExp = yellow('1,234,567.89')
    const nExp = '1,234,567.89'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: 123456.789', () => {
    const cRes = color('%n', 123456.789)
    const nRes = nocolor('%n', 123456.789)

    const cExp = yellow('123,456.79')
    const nExp = '123,456.79'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: -12345678.9', () => {
    const cRes = color('%n', -12345678.9)
    const nRes = nocolor('%n', -12345678.9)

    const cExp = yellow('-12,345,678.90')
    const nExp = '-12,345,678.90'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: -1234567.89', () => {
    const cRes = color('%n', -1234567.89)
    const nRes = nocolor('%n', -1234567.89)

    const cExp = yellow('-1,234,567.89')
    const nExp = '-1,234,567.89'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('float: -123456.789', () => {
    const cRes = color('%n', -123456.789)
    const nRes = nocolor('%n', -123456.789)

    const cExp = yellow('-123,456.79')
    const nExp = '-123,456.79'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: 1e2', () => {
    const cRes = color('%n', '1e2')
    const nRes = nocolor('%n', ' 1e2 ')

    const cExp = yellow('100')
    const nExp = '100'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: +1e2', () => {
    const cRes = color('%n', '+1e2')
    const nRes = nocolor('%n', ' +1e2 ')

    const cExp = yellow('100')
    const nExp = '100'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -1e8', () => {
    const cRes = color('%n', '-1e8')
    const nRes = nocolor('%n', ' -1e8 ')

    const cExp = yellow('-100,000,000')
    const nExp = '-100,000,000'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -123.e0', () => {
    const cRes = color('%n', '-123.e0')
    const nRes = nocolor('%n', ' -123.e0 ')

    const cExp = yellow('-123')
    const nExp = '-123'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: .123e3', () => {
    const cRes = color('%n', '.123e3')
    const nRes = nocolor('%n', ' .123e3 ')

    const cExp = yellow('123')
    const nExp = '123'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -0', () => {
    const cRes = color('%n', '-0')
    const nRes = nocolor('%n', ' -0 ')

    const cExp = yellow('-0')
    const nExp = '-0'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: NaN', () => {
    const cRes = color('%n', 'NaN')
    const nRes = nocolor('%n', ' NaN ')

    const cExp = yellow('NaN')
    const nExp = 'NaN'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: Infinity', () => {
    const cRes = color('%n', 'Infinity')
    const nRes = nocolor('%n', ' Infinity ')

    const cExp = yellow('Infinity')
    const nExp = 'Infinity'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: +Infinity', () => {
    const cRes = color('%n', '+Infinity')
    const nRes = nocolor('%n', ' +Infinity ')

    const cExp = yellow('Infinity')
    const nExp = 'Infinity'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -Infinity', () => {
    const cRes = color('%n', '-Infinity')
    const nRes = nocolor('%n', ' -Infinity ')

    const cExp = yellow('-Infinity')
    const nExp = '-Infinity'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })


  it('string: +1234567.89', () => {
    const cRes = color('%n', '+1234567.89')
    const nRes = nocolor('%n', ' +1234567.89 ')

    const cExp = yellow('1,234,567.89')
    const nExp = '1,234,567.89'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -123456.789', () => {
    const cRes = color('%n', '-123456.789')
    const nRes = nocolor('%n', ' -123456.789 ')

    const cExp = yellow('-123,456.79')
    const nExp = '-123,456.79'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -123456.', () => {
    const cRes = color('%n', '-123456.')
    const nRes = nocolor('%n', ' -123456. ')

    const cExp = yellow('-123,456')
    const nExp = '-123,456'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('string: -.123', () => {
    const cRes = color('%n', '-.123')
    const nRes = nocolor('%n', ' -.123 ')

    const cExp = yellow('-0.12')
    const nExp = '-0.12'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('throw: wrong replacer type', () => {
    assert.throws(() => color('%n', []), '[]')
    assert.throws(() => color('%n', {}), '{}')
    assert.throws(() => color('%n', /./), '/./')
  })

  it('throw: string has unexpected format', () => {
    assert.throws(() => color('%n', ''), '')
    assert.throws(() => color('%n', '.'), '.')
    assert.throws(() => color('%n', 'e'), 'e')
    assert.throws(() => color('%n', '.e'), '.e')
    assert.throws(() => color('%n', '.e3'), '.e3')
    assert.throws(() => color('%n', '-123e'), '-123e')
    assert.throws(() => color('%n', 'e123'), 'e123')
  })

  it('throw: placeholders < args', () => {
    assert.throws(() => color('%n', 123, 123))
    assert.throws(() => nocolor('%n %%n %n', 123, 123, 123))
  })

  it('throw: placeholders > args', () => {
    assert.throws(() => color('%n'))
    assert.throws(() => nocolor('%n %%n %n', 123))
  })
})
