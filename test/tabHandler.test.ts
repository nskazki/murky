'use strict'

import { color, nocolor } from '../src'
import { inspect } from 'util'
import assert = require('power-assert')

describe('tab', () => {
  it('string: oneline x 1', () => {
    const cRes = color('%t', '\\n hello \\n')
    const nRes = nocolor('%t', '\\n hello \\n')

    const exp = '\\n hello \\n'
    assert.equal(inspect(cRes), inspect(exp))
    assert.equal(inspect(nRes), inspect(exp))
  })

  it('string: oneline x 2', () => {
    const cRes = color('%t %t', '\r hello \v', '\\n world \\n')
    const nRes = nocolor('%t %t', '\r hello \v', '\\n world \\n')

    const exp = ' hello \n       '
               + ' '
               + '\\n world \\n'
    assert.equal(inspect(cRes), inspect(exp))
    assert.equal(inspect(nRes), inspect(exp))
  })

  it('string: multiline x 1', () => {
    const cRes = color('pad %t', 'hello\nworld\v \r!')
    const nRes = nocolor('pad %t', 'hello\nworld\v \r!')

    const exp = 'pad '
                   + 'hello\n'
               + '    world\n'
               + '    !     '
    assert.equal(inspect(cRes), inspect(exp))
    assert.equal(inspect(nRes), inspect(exp))
  })

  it('string: multiline pad', () => {
    const cRes = color('some\be\vstrange\r\vline\rL %t', 'what am I doing with my life?')
    const nRes = nocolor('some\be\vstrange\r\vline\rL %t', 'what am I doing with my life?')

    const exp = 'some\be\v'
               + 'strange\r\v'
               + 'line\rL '
                 + 'what am I doing with my life?'
    assert.equal(inspect(cRes), inspect(exp))
    assert.equal(inspect(nRes), inspect(exp))
  })

  it('string: multiline pad & multiline replacer', () => {
    const cRes = color('some\be\vstrange\r\vline\rL %t', 'what am I doing\nwith my life?')
    const nRes = nocolor('some\be\vstrange\r\vline\rL %t', 'what am I doing\nwith my life?')

    const exp = 'some\be\v'
               + 'strange\r\v'
               + 'line\rL '
               + 'what am I doing\n'
             + '  with my life?'
    assert.equal(inspect(cRes), inspect(exp))
    assert.equal(inspect(nRes), inspect(exp))
  })
})
