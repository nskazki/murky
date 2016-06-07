'use strict'

import murky, { color, nocolor } from '../src'
import { yellow, green } from 'chalk'
import assert = require('power-assert')

describe('index', () => {
  it('check export', () => {
    assert.notEqual(color, murky)
    assert.notEqual(color, nocolor)
    assert.notEqual(nocolor, murky)
  })

  it('call without args', () => {
    assert.equal(color(), '')
    assert.equal(nocolor(), '')
  })

  it('call without fmtStr: arg x 1', () => {
    assert.equal(color(123), yellow('123'))
    assert.equal(nocolor(123), '123')
  })

  it('call without fmtStr: arg x 2', () => {
    const cAct = color(123, {})
    const nAct = nocolor(123, {})

    const cExp = `${yellow('123')} {}`
    const nExp = '123 {}'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with empty fmtStr', () => {
    assert.equal(color(''), '')
    assert.equal(nocolor(''), '')
  })

  it('call with not empty fmtStr', () => {
    assert.equal(color(yellow('hi!')), yellow('hi!'))
    assert.equal(nocolor(yellow('hi!')), 'hi!')
  })

  it('call with empty fmtStr and replacers x 1', () => {
    const cAct = color('', 123)
    const nAct = nocolor('', 123)

    const cExp = ' ' + yellow('123')
    const nExp = ' 123'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with empty fmtStr and replacers x 2', () => {
    const cAct = color('', 123, 'hi')
    const nAct = nocolor('', 123, 'hi')

    const cExp = ' ' + yellow('123') + ' ' + green('hi')
    const nExp = ' 123 hi'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with not empty fmtStr and replacers x 1', () => {
    const cAct = color('hi!', 123)
    const nAct = nocolor('hi!', 123)

    const cExp = 'hi! ' + yellow('123')
    const nExp = 'hi! 123'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with not empty fmtStr and replacers x 2', () => {
    const cAct = color('hi!', 123, {})
    const nAct = nocolor('hi!', 123, {})

    const cExp = 'hi!' + ' ' + yellow('123') + ' ' + '{}'
    const nExp = 'hi! 123 {}'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps<re: placeholders x 1 and replacers x 2', () => {
    const cAct = color('%s', 123, {})
    const nAct = nocolor('%s', 123, {})

    const cExp = yellow('123') + ' ' + '{}'
    const nExp = '123 {}'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps<re: placeholders x 1 and replacers x 3', () => {
    const cAct = color('%s', 123, {}, [])
    const nAct = nocolor('%s', 123, {}, [])

    const cExp = yellow('123') + ' ' + '{}' + ' ' + '[]'
    const nExp = '123 {} []'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps<re: placeholders x 2 and replacers x 3', () => {
    const cAct = color('%s %s', 123, {}, [])
    const nAct = nocolor('%s %s', 123, {}, [])

    const cExp = yellow('123') + ' ' + '{}' + ' ' + '[]'
    const nExp = '123 {} []'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps=re: placeholders x 1 and replacers x 1', () => {
    const cAct = color('%s', {})
    const nAct = nocolor('%s', {})

    const cExp = '{}'
    const nExp = '{}'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps=re: placeholders x 2 and replacers x 2', () => {
    const cAct = color('%s %s', 123, {})
    const nAct = nocolor('%s %s', 123, {})

    const cExp = yellow('123') + ' ' + '{}'
    const nExp = '123 {}'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps>re: placeholders x 1 and replacers x 0', () => {
    const cAct = color('%s')
    const nAct = nocolor('%s')

    const cExp = '%s'
    const nExp = '%s'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps>re: placeholders x 2 and replacers x 0', () => {
    const cAct = color('%s %s')
    const nAct = nocolor('%s %s')

    const cExp = '%s %s'
    const nExp = '%s %s'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps>re: placeholders x 2 and replacers x 1', () => {
    const cAct = color('%s %s', 123)
    const nAct = nocolor('%s %s', 123)

    const cExp = yellow('123') + ' %s'
    const nExp = '123 %s'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps>re: placeholders x 3 and replacers x 1', () => {
    const cAct = color('%s %s %s', 123)
    const nAct = nocolor('%s %s %s', 123)

    const cExp = yellow('123') + ' %s %s'
    const nExp = '123 %s %s'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps>re: placeholders x 3 and replacers x 2', () => {
    const cAct = color('%s %s %s', 123, {})
    const nAct = nocolor('%s %s %s', 123, {})

    const cExp = yellow('123') + ' {} %s'
    const nExp = '123 {} %s'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })

  it('call with ps>re: placeholders x 4 and replacers x 2', () => {
    const cAct = color('%s %s %s %s', 123, {})
    const nAct = nocolor('%s %s %s %s', 123, {})

    const cExp = yellow('123') + ' {} %s %s'
    const nExp = '123 {} %s %s'

    assert.equal(cAct, cExp)
    assert.equal(nAct, nExp)
  })
})
