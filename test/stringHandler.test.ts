'use strict'

import { color, nocolor } from '../src'
import { bold, red, gray, magenta, yellow, green } from 'chalk'
import { inspect } from 'util'
import assert = require('power-assert')

describe('string', () => {

  it('undefined x 1', () => {
    const cRes = color('%s', undefined)
    const nRes = nocolor('%s', undefined)

    assert.equal(cRes, gray('undefined'))
    assert.equal(nRes, 'undefined')
  })

  it('undefined x 2', () => {
    const cRes = color('%s %s', undefined, undefined)
    const nRes = nocolor('%s %s', undefined, undefined)

    assert.equal(cRes, `${gray('undefined')} ${gray('undefined')}`)
    assert.equal(nRes, 'undefined undefined')
  })

  it('null x 1', () => {
    const cRes = color('%s', null)
    const nRes = nocolor('%s', null)

    assert.equal(cRes, `${bold('null')}`)
    assert.equal(nRes, 'null')
  })

  it('null x 2', () => {
    const cRes = color('%s %s', null, null)
    const nRes = nocolor('%s %s', null, null)

    assert.equal(cRes, `${bold('null')} ${bold('null')}`)
    assert.equal(nRes, 'null null')
  })

  it('number x 1', () => {
    const cRes = color('%s', NaN)
    const nRes = nocolor('%s', NaN)

    assert.equal(cRes, yellow('NaN'))
    assert.equal(nRes, 'NaN')
  })

  it('number x 3', () => {
    const cRes = color('%s %s %s', 123, Infinity, 789 )
    const nRes = nocolor('%s %s %s', 123, Infinity, 789)

    assert.equal(cRes, `${yellow('123')} ${yellow('Infinity')} ${yellow('789')}`)
    assert.equal(nRes, '123 Infinity 789')
  })

  it('string x 1', () => {
    const cRes = color('%s', '')
    const nRes = nocolor('%s', '')

    assert.equal(cRes, '')
    assert.equal(nRes, '')
  })

  it('string x 3', () => {
    const cRes = color('%s %s %s', '古', '🐴', '123')
    const nRes = nocolor('%s %s %s', '古', '🐴', '123')

    assert.equal(cRes, `${green('古')} ${green('🐴')} ${green('123')}`)
    assert.equal(nRes, '古 🐴 123')
  })

  it('multiline string x 1', () => {
    const cRes = color('%s', '1\n2\n3')
    const nRes = nocolor('%s', '1\n2\n3')

    assert.equal(cRes, `${green('1\n2\n3')}`)
    assert.equal(nRes, '1\n2\n3')
  })

  it('multiline string x 2', () => {
    const cRes = color('%s %s', '\r\n1', '\n')
    const nRes = nocolor('%s %s', '\r\n1', '\n')

    const cExp =  green('\n1') + ' ' + green('\n')
    const nExp = '\n1 \n'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('hash x 1', () => {
    const cRes = color('%s', { toString: 123 })
    const nRes = nocolor('%s', { toString: 123 })

    assert.equal(cRes, `{ toString: ${yellow('123')} }`)
    assert.equal(nRes, '{ toString: 123 }')
  })

  it('hash x 3', () => {
    const cRes = color('%s %s %s', { '': undefined }, { '': null }, { '🐴': '古' })
    const nRes = nocolor('%s %s %s', { '': undefined }, { '': null }, { '🐴': '古' })

    const cExp =
         `{ ${green(`''`)}: ${gray('undefined')} }`
      + ` { ${green(`''`)}: ${bold('null')} }`
      + ` { ${green(`'🐴'`)}: ${green(`'古'`)} }`
    const nExp =
         `{ '': undefined } { '': null } { '🐴': '古' }`

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('array x 1', () => {
    const cRes = color('%s', [ 123 ])
    const nRes = nocolor('%s', [ 123 ])

    assert.equal(cRes, `[ ${yellow('123')} ]`)
    assert.equal(nRes, '[ 123 ]')
  })

  it('array x 8', () => {
    const cRes = color('%s', [ , undefined, null, [], {}, '', { '': undefined }, { '': null } ])
    const nRes = nocolor('%s', [ , undefined, null, [], {}, '', { '': undefined }, { '': null } ])

    const cExp =
        `[ `
      + `, ${gray('undefined')}`
      + `, ${bold(null)}`
      + `, []`
      + `, {}`
      + `, ${green(`''`)}`
      + `, { ${green(`''`)}: ${gray('undefined')} }`
      + `, { ${green(`''`)}: ${bold('null')} }`
      + ` ]`
    const nExp = `[ , undefined, null, [], {}, '', { '': undefined }, { '': null } ]`

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('date x 1', () => {
    const date = new Date(99, 1, 12, 23, 12, 30, 0)
    const cRes = color('%s', date)
    const nRes = nocolor('%s', date)

    assert.equal(cRes, magenta(date.toISOString()))
    assert.equal(nRes, date.toISOString())
  })

  it('date x 2', () => {
    const date1 = new Date(99, 1, 12, 23, 12, 30, 0)
    const date2 = new Date(1999, 1, 12, 23, 12, 30, 0)
    const cRes = color('%s %s', date1, date2)
    const nRes = nocolor('%s %s', date1, date2)

    const cExp =
         `${magenta(date1.toISOString())}`
      + ` ${magenta(date2.toISOString())}`
    const nExp =
         `${date1.toISOString()}`
      + ` ${date2.toISOString()}`

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('regexp x 1', () => {
    const cRes = color('%s', /\d{1,}\S*@[123](\(.*\))/)
    const nRes = nocolor('%s', /\d{1,}\S*@[123](\(.*\))/)

    assert.equal(cRes, red('/\\d{1,}\\S*@[123](\\(.*\\))/'))
    assert.equal(nRes, '/\\d{1,}\\S*@[123](\\(.*\\))/')
  })

  it('regexp x 2', () => {
    const cRes = color('%s %s', /./, /(?=.)/)
    const nRes = nocolor('%s %s', /./, /(?=.)/)

    assert.equal(cRes, `${red('/./')} ${red('/(?=.)/')}`)
    assert.equal(nRes, '/./ /(?=.)/')
  })

  it('promise x 1', () => {
    const cRes = color('%s', Promise.resolve(123))
    const nRes = nocolor('%s', Promise.resolve(123))

    assert.equal(cRes, `Promise { ${yellow('123')} }`)
    assert.equal(nRes, 'Promise { 123 }')
  })

  it('promise x 2', () => {
    const cRes = color('%s %s', Promise.resolve(1), Promise.reject(2))
    const nRes = nocolor('%s %s', Promise.resolve(1), Promise.reject(2))

    const cExp = `Promise { ${yellow('1')} } Promise { <rejected> ${yellow('2') } }`
    const nExp = 'Promise { 1 } Promise { <rejected> 2 }'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('error x 1', () => {
    const error = {
      name:    `NewError`,
      message: `Text added from some place!\
                \n\t SomeMeta: foo=bar; other=abc\
                \n\t OriginalError: something happened!`,
      stack:   `SomeError: something happened!
                    at Timer.listOnTimeout (timers.js:92:15)`
    }

    const cRes = color('%s', error)
    const nRes = nocolor('%s', error)

    const nExp =
      `NewError: Text added from some place!`
    + `\n         SomeMeta: foo=bar; other=abc`
    + `\n         OriginalError: something happened!`
    + `\nStack:`
    + `\n    SomeError: something happened!`
    + `\n    at Timer.listOnTimeout (timers.js:92:15)`

    assert.equal(cRes, nRes)
    assert.equal(inspect(nRes), inspect(nExp))
  })

  it('%%', () => {
    const cRes = color('j %s %%s %%%s %%%%s', '02', '04')
    const nRes = nocolor('j %s %%s %%%s %%%%s', '02', '04')

    const cExp = `j ${green('02')} %s %${green('04')} %%s`
    const nExp = 'j 02 %s %04 %%s'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('\\n', () => {
    const cRes = color('\n\n\n\n%s\r%s\v\v%s\t\t\t', 1, 2, 3)
    const nRes = nocolor('\n\n\n\n%s\r%s\v\v%s\t\t\t', 1, 2, 3)

    const cExp = `\n\n\n\n${yellow('1')}\r${yellow('2')}\v\v${yellow('3')}\t\t\t`
    const nExp = '\n\n\n\n1\r2\v\v3\t\t\t'

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('throw: placeholders < args', () => {
    assert.throws(() => color('%s', 123, 123))
    assert.throws(() => nocolor('%s %%s %s', 123, 123, 123))
  })

  it('throw: placeholders > args', () => {
    assert.throws(() => color('%s'))
    assert.throws(() => nocolor('%s %%s %s', 123))
  })
})
