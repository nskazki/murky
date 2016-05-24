'use strict'

import { color, nocolor } from '../src'
import assert = require('power-assert')

describe('json', () => {
  it('undefined x 1', () => {
    const cRes = color('%j', undefined)
    const nRes = nocolor('%j', undefined)
    assert.equal(cRes, nRes)
    assert.equal(cRes, 'undefined')
  })

  it('undefined x 2', () => {
    const cRes = color('%j %j', undefined, undefined)
    const nRes = nocolor('%j %j', undefined, undefined)
    assert.equal(cRes, nRes)
    assert.equal(cRes, 'undefined undefined')
  })

  it('null x 1', () => {
    const cRes = color('%j', null)
    const nRes = nocolor('%j', null)
    assert.equal(cRes, nRes)
    assert.equal(cRes, 'null')
  })

  it('null x 2', () => {
    const cRes = color('%j %j', null, null)
    const nRes = nocolor('%j %j', null, null)
    assert.equal(cRes, nRes)
    assert.equal(cRes, 'null null')
  })

  it('number x 1', () => {
    const cRes = color('%j', NaN)
    const nRes = nocolor('%j', NaN)
    assert.equal(cRes, nRes)
    assert.equal(cRes, 'null')
  })

  it('number x 3', () => {
    const cRes = color('%j %j %j', 123, Infinity, 789 )
    const nRes = nocolor('%j %j %j', 123, Infinity, 789)
    assert.equal(cRes, nRes)
    assert.equal(cRes, '123 null 789')
  })

  it('string x 1', () => {
    const cRes = color('%j', '')
    const nRes = nocolor('%j', '')
    assert.equal(cRes, nRes)
    assert.equal(cRes, '""')
  })

  it('string x 3', () => {
    const cRes = color('%j %j %j', '古', '🐴', '123')
    const nRes = nocolor('%j %j %j', '古', '🐴', '123')
    assert.equal(cRes, nRes)
    assert.equal(cRes, '"古" "🐴" "123"')
  })

  it('multiline string x 1', () => {
    const cRes = color('%j', '1\n2\n3')
    const nRes = nocolor('%j', '1\n2\n3')

    assert.equal(cRes, nRes)
    assert.equal(cRes, '"1\\n2\\n3"')
  })

  it('multiline string x 2', () => {
    const cRes = color('%j %j', '\r\n1', '\n')
    const nRes = nocolor('%j %j', '\r\n1', '\n')

    assert.equal(cRes, nRes)
    assert.equal(cRes, '"\\r\\n1" "\\n"')
  })

  it('hash x 1', () => {
    const cRes = color('%j', { toString: 123 })
    const nRes = nocolor('%j', { toString: 123 })
    assert.equal(cRes, nRes)
    assert.equal(cRes, '{"toString":123}')
  })

  it('hash x 3', () => {
    const cRes = color('%j %j %j', { '': undefined }, { '': null }, { '🐴': '古' })
    const nRes = nocolor('%j %j %j', { '': undefined }, { '': null }, { '🐴': '古' })
    assert.equal(cRes, nRes)
    assert.equal(cRes, '{} {"":null} {\"🐴\":\"古\"}')
  })

  it('array x 1', () => {
    const cRes = color('%j', [ 123 ])
    const nRes = nocolor('%j', [ 123 ])
    assert.equal(cRes, nRes)
    assert.equal(cRes, '[123]')
  })

  it('array x 8', () => {
    const cRes = color('%j', [ , undefined, null, [], {}, '', { '': undefined }, { '': null } ])
    const nRes = nocolor('%j', [ , undefined, null, [], {}, '', { '': undefined }, { '': null } ])
    assert.equal(cRes, nRes)
    assert.equal(cRes, '[null,null,null,[],{},"",{},{"":null}]')
  })

  it('date x 1', () => {
    const date = new Date(99, 1, 12, 23, 12, 30, 0)
    const cRes = color('%j', date)
    const nRes = nocolor('%j', date)
    assert.equal(cRes, nRes)
    assert.equal(cRes, `"${date.toISOString()}"`)
  })

  it('date x 2', () => {
    const date1 = new Date(99, 1, 12, 23, 12, 30, 0)
    const date2 = new Date(1999, 1, 12, 23, 12, 30, 0)
    const cRes = color('%j = %j', date1, date2)
    const nRes = nocolor('%j = %j', date1, date2)
    assert.equal(cRes, nRes)
    assert.equal(cRes, `"${date1.toISOString()}" = "${date2.toISOString()}"`)
  })

  it('regexp x 1', () => {
    const cRes = color('%j', /\d{1,}\S*@[123](\(.*\))/)
    const nRes = nocolor('%j', /\d{1,}\S*@[123](\(.*\))/)
    assert.equal(cRes, nRes)
    assert.equal(cRes, '{}')
  })

  it('regexp x 2', () => {
    const cRes = color('%j %j', /./, /(?=.)/)
    const nRes = nocolor('%j %j', /./, /(?=.)/)
    assert.equal(cRes, nRes)
    assert.equal(cRes, '{} {}')
  })

  it('promise x 1', () => {
    const cRes = color('%j', Promise.resolve(123))
    const nRes = nocolor('%j', Promise.resolve(123))
    assert.equal(cRes, nRes)
    assert.equal(cRes, '{}')
  })

  it('promise x 2', () => {
    const cRes = color('%j %j', Promise.resolve(1), Promise.reject(new Error('!')))
    const nRes = nocolor('%j %j', Promise.resolve(1), Promise.reject(new Error('!')))
    assert.equal(cRes, nRes)
    assert.equal(cRes, '{} {}')
  })

  it('%%', () => {
    const cRes = color('j %j %%j %%%j %%%%j', '02', '04')
    const nRes = nocolor('j %j %%j %%%j %%%%j', '02', '04')
    assert.equal(cRes, nRes)
    assert.equal(cRes, 'j "02" %j %"04" %%j')
  })

  it('\\n', () => {
    const cRes = color('\n\n\n\n%j\r%j\v\v%j\t\t\t%j', 1, 2, 3, 4)
    const nRes = nocolor('\n\n\n\n%j\r%j\v\v%j\t\t\t%j', 1, 2, 3, 4)
    assert.equal(cRes, nRes)
    assert.equal(cRes, '\n\n\n\n1\r2\v\v3\t\t\t4')
  })

  it('throw: placeholders < args', () => {
    assert.throws(() => color('%j', 123, 123))
    assert.throws(() => nocolor('%j %%j %j', 123, 123, 123))
  })

  it('throw: placeholders > args', () => {
    assert.throws(() => color('%j'))
    assert.throws(() => nocolor('%j %%j %j', 123))
  })
})
