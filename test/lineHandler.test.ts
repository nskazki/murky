'use strict'

import { color, nocolor } from '../src'
import { gray, bold, yellow, green } from 'chalk'
import assert = require('power-assert')

describe('line', () => {
  it('string: oneline', () => {
    const cRes = color('%l', '\\n hello \\n')
    const nRes = nocolor('%l', '\\n hello \\n')

    assert.equal(cRes, green('\\n hello \\n'))
    assert.equal(nRes, '\\n hello \\n')
  })

  it('string: empty', () => {
    const replacer = yellow('')
    const cRes = color('%l', replacer)
    const nRes = nocolor('%l', replacer)

    assert.equal(cRes, '')
    assert.equal(nRes, '')
  })

  it('string: \\n only', () => {
    const cRes = color('%l', '\n')
    const nRes = nocolor('%l', '\n')

    assert.equal(cRes, '')
    assert.equal(nRes, '')
  })

  it('string: \\n on start', () => {
    const cRes = color('%l', '\n hello')
    const nRes = nocolor('%l', '\n hello')

    assert.equal(cRes, green('hello'))
    assert.equal(nRes, 'hello')
  })

  it('string: \\n on end', () => {
    const cRes = color('%l', 'hello \n')
    const nRes = nocolor('%l', 'hello \n')

    assert.equal(cRes, green('hello'))
    assert.equal(nRes, 'hello')
  })

  it('string: \\n on end and start', () => {
    const cRes = color('%l', '\n hello \n')
    const nRes = nocolor('%l', '\n hello \n')

    assert.equal(cRes, green('hello'))
    assert.equal(nRes, 'hello')
  })

  it('string: \\n on end and start with multi spaces', () => {
    const cRes = color('%l', '  \n   hello    \n ')
    const nRes = nocolor('%l', '  \n   hello    \n ')

    assert.equal(cRes, green('hello'))
    assert.equal(nRes, 'hello')
  })

  it('string: multi escape sequences and multi spaces', () => {
    const cRes = color('%l', 'h\ve\vl\rl\f\bo \nw\no\r\v\r\vr\v\rl\nd !')
    const nRes = nocolor('%l', 'h\ve\vl\rl\f\bo \nw\no\r\v\r\vr\v\rl\nd !')

    assert.equal(cRes, green('h e l l o w o r l d !'))
    assert.equal(nRes, 'h e l l o w o r l d !')
  })

  it('string: simple colored - empty', () => {
    const replacer = yellow('')
    const cRes = color('%l', replacer)
    const nRes = nocolor('%l', replacer)

    assert.equal(cRes, '')
    assert.equal(nRes, '')
  })

  it('array: number x 1', () => {
    const cRes = color('%l', [ 1 ])
    const nRes = nocolor('%l', [ 1 ])

    assert.equal(cRes, `[ ${yellow('1')} ]`)
    assert.equal(nRes, '[ 1 ]')
  })

  it('array: number x 3', () => {
    const cRes = color('%l', [ 1, 2, 3 ])
    const nRes = nocolor('%l', [ 1, 2, 3 ])

    assert.equal(cRes, `[ ${yellow('1')}, ${yellow('2')}, ${yellow('3')} ]`)
    assert.equal(nRes, '[ 1, 2, 3 ]')
  })

  it('array: big number x 1', () => {
    const cRes = color('%l', [ 1e20 ])
    const nRes = nocolor('%l', [ 1e20 ])

    assert.equal(cRes, `[ ${yellow(1e20.toString())} ]`)
    assert.equal(nRes, `[ ${1e20.toString()} ]`)
  })

  it('array: big number x 3', () => {
    const cRes = color('%l', [ 1e20, 2e20, 3e20 ])
    const nRes = nocolor('%l', [ 1e20, 2e20, 3e20 ])

    assert.equal(cRes, `[ ${yellow(1e20.toString())}, ${yellow(2e20.toString())}, ${yellow(3e20.toString())} ]`)
    assert.equal(nRes, `[ ${1e20.toString()}, ${2e20.toString()}, ${3e20.toString()} ]`)
  })

  it('hash: number x 3', () => {
    const cRes = color('%l', { a: 1, b: 2, c: 3 })
    const nRes = nocolor('%l', { a: 1, b: 2, c: 3 })

    assert.equal(cRes, `{ a: ${yellow('1')}, b: ${yellow('2')}, c: ${yellow('3')} }`)
    assert.equal(nRes, `{ a: 1, b: 2, c: 3 }`)
  })

  it('hash: big number x 3', () => {
    const cRes = color('%l', { a: 1e20, b: 2e20, c: 3e20 })
    const nRes = nocolor('%l', { a: 1e20, b: 2e20, c: 3e20 })

    assert.equal(cRes, `{ a: ${yellow(1e20.toString())}, b: ${yellow(2e20.toString())}, c: ${yellow(3e20.toString())} }`)
    assert.equal(nRes, `{ a: ${1e20.toString()}, b: ${2e20.toString()}, c: ${3e20.toString()} }`)
  })

  it('array: hash with numbers or big numbers  x 4', () => {
    const replacer = [ { a: 1e20, b: 2e20, c: 3e20 }, { a: 1, b: 2, c: 3 }, { a : 1e20 }, { a: 1 } ]
    const cRes = color('%l', replacer)
    const nRes = nocolor('%l', replacer)

    const cExp =
        `[ { a: ${yellow(1e20.toString())}, b: ${yellow(2e20.toString())}, c: ${yellow(3e20.toString())} }`
      + `, { a: ${yellow('1')}, b: ${yellow('2')}, c: ${yellow('3')} }`
      + `, { a: ${yellow(1e20.toString())} }`
      + `, { a: ${yellow('1')} } ]`
    const nExp =
        `[ { a: ${(1e20.toString())}, b: ${(2e20.toString())}, c: ${(3e20.toString())} }`
      + `, { a: 1, b: 2, c: 3 }`
      + `, { a: ${(1e20.toString())} }`
      + `, { a: 1 } ]`

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('array: big string with \\n x 3', () => {
    const replacer = [
      `${(1e20.toString())} \n \n ${(1e20.toString())}  \n \n ${(1e20.toString())}`,
      `${(2e20.toString())} \n \n ${(2e20.toString())}  \n \n ${(2e20.toString())}`,
      `${(3e20.toString())} \n \n ${(3e20.toString())}  \n \n ${(3e20.toString())}`
    ]

    const cRes = color('%l', replacer)
    const nRes = nocolor('%l', replacer)

    const cExp = `[ `
      +   `${green(`'${(1e20.toString())} \\n \\n ${(1e20.toString())}  \\n \\n ${(1e20.toString())}'`)}`
      + `, ${green(`'${(2e20.toString())} \\n \\n ${(2e20.toString())}  \\n \\n ${(2e20.toString())}'`)}`
      + `, ${green(`'${(3e20.toString())} \\n \\n ${(3e20.toString())}  \\n \\n ${(3e20.toString())}'`)}`
      + ` ]`
    const nExp = `[ `
      +   `'${(1e20.toString())} \\n \\n ${(1e20.toString())}  \\n \\n ${(1e20.toString())}'`
      + `, '${(2e20.toString())} \\n \\n ${(2e20.toString())}  \\n \\n ${(2e20.toString())}'`
      + `, '${(3e20.toString())} \\n \\n ${(3e20.toString())}  \\n \\n ${(3e20.toString())}'`
      + ` ]`

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('array: big string with \\b x 3', () => {
    const replacer = [
      `${(1e20.toString())} \b \b ${(1e20.toString())}  \b \b ${(1e20.toString())}`,
      `${(2e20.toString())} \b \b ${(2e20.toString())}  \b \b ${(2e20.toString())}`,
      `${(3e20.toString())} \b \b ${(3e20.toString())}  \b \b ${(3e20.toString())}`
    ]

    const cRes = color('%l', replacer)
    const nRes = nocolor('%l', replacer)

    const cExp = `[ `
      +   `${green(`'${(1e20.toString())} \\b \\b ${(1e20.toString())}  \\b \\b ${(1e20.toString())}'`)}`
      + `, ${green(`'${(2e20.toString())} \\b \\b ${(2e20.toString())}  \\b \\b ${(2e20.toString())}'`)}`
      + `, ${green(`'${(3e20.toString())} \\b \\b ${(3e20.toString())}  \\b \\b ${(3e20.toString())}'`)}`
      + ` ]`
    const nExp = `[ `
      +   `'${(1e20.toString())} \\b \\b ${(1e20.toString())}  \\b \\b ${(1e20.toString())}'`
      + `, '${(2e20.toString())} \\b \\b ${(2e20.toString())}  \\b \\b ${(2e20.toString())}'`
      + `, '${(3e20.toString())} \\b \\b ${(3e20.toString())}  \\b \\b ${(3e20.toString())}'`
      + ` ]`

    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })

  it('array: mix of values', () => {
    const replacer = [ undefined, undefined, null, {}, [], ',', [], {}, null,  undefined, undefined ]

    const cRes = color('%l', replacer)
    const nRes = nocolor('%l', replacer)

    const cExp = `[ `
      +   `${gray('undefined')}`
      + `, ${gray('undefined')}`
      + `, ${bold('null')}`
      + `, {}`
      + `, []`
      + `, ${green(`','`)}`
      + `, []`
      + `, {}`
      + `, ${bold('null')}`
      + `, ${gray('undefined')}`
      + `, ${gray('undefined')}`
      + ` ]`
    const nExp = `[ `
      +   `undefined`
      + `, undefined`
      + `, null`
      + `, {}`
      + `, []`
      + `, ','`
      + `, []`
      + `, {}`
      + `, null`
      + `, undefined`
      + `, undefined`
      + ` ]`


    assert.equal(cRes, cExp)
    assert.equal(nRes, nExp)
  })
})
