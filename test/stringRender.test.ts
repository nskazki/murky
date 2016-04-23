'use strict'

import { stringRender as r } from '../src/helpers/string'
import { inspect } from 'util'
import assert = require('power-assert')

describe('helpers/string/stringRender', () => {
  it('\\t x 1', () => {
    const act = r('01234567012345670\n'
                + '\t0\n'
                + ' \t1\n'
                + '  \t2\n'
                + '   \t3\n'
                + '    \t4\n'
                + '     \t5\n'
                + '      \t6\n'
                + '       \t7\n'
                + '        \t8\n'
                + '         \t9\n'
                + '01234567012345670')

    const exp = r('01234567012345670\n'
                + '        0\n'
                + '        1\n'
                + '        2\n'
                + '        3\n'
                + '        4\n'
                + '        5\n'
                + '        6\n'
                + '        7\n'
                + '                8\n'
                + '                9\n'
                + '01234567012345670')

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\t x 2', () => {
    const act = r('0123456701234567012345670\n'
                + '\t\t0\n'
                + ' \t\t1\n'
                + '  \t\t2\n'
                + '   \t\t3\n'
                + '    \t\t4\n'
                + '     \t\t5\n'
                + '      \t\t6\n'
                + '       \t\t7\n'
                + '        \t\t8\n'
                + '         \t\t9\n'
                + '\t\t0\n'
                + ' \t\t1\n'
                + '0123456701234567012345670')

    const exp = r('0123456701234567012345670\n'
                + '                0\n'
                + '                1\n'
                + '                2\n'
                + '                3\n'
                + '                4\n'
                + '                5\n'
                + '                6\n'
                + '                7\n'
                + '                        8\n'
                + '                        9\n'
                + '                0\n'
                + '                1\n'
                + '0123456701234567012345670')

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\b x 1', () => {
    const act = r( '\b012\n'
                + '?\b012\n'
                + '0?\b12\n'
                + '01?\b2\n'
                + '012?\b\n'
                +  '\b012\n'
                + '?\b012\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012?\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\b x 2', () => {
    const act = r(  '\b\b012\n'
                +  '\b?\b012\n'
                + '?\b?\b012\n'
                + '0?\b?\b12\n'
                + '01?\b?\b2\n'
                + '012?\b?\b\n'
                + '012??\b\b\n'
                +   '\b\b012\n'
                +  '\b?\b012\n'
                + '?\b?\b012\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012?\n'
              + '012??\n'
              + '012\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\v', () => {
    const act = r('\v'
                + '1\v'
                + '2\v'
                + '3')
    const exp = '\n'
              + '1\n'
              + ' 2\n'
              + '  3'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\f', () => {
    const act = r('\f'
                + '1\f'
                + '2\f'
                + '3')
    const exp = '\n'
              + '1\n'
              + ' 2\n'
              + '  3'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\r x 1', () => {
    const act = r('\r012\n'
                + '?\r012\n'
                + '??\r012\n'
                + '???\r012\n'
                + '??2\r01\n'
                + '?12\r0\n'
                + '012\r\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\r x 2', () => {
    const act = r('\r?\r012\n'
                + '?\r?\r012\n'
                + '??\r?\r012\n'
                + '???\r?\r012\n'
                + '\r??2\r01\n'
                + '?\r?12\r0\n'
                + '012\r\r\n')
    const exp = '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'
              + '012\n'

    assert.equal(inspect(act), inspect(exp))
  })

  it('\\n', () => {
    const act = r('123\n\n\n123\n123\n\n1\n123')
    const exp = '123\n\n\n123\n123\n\n1\n123'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #1', () => {
    const act = r('\n1234\b\b\bnoop\r!12\v\t213\n01234567')
    const exp = '\n'
              + '!12op\n'
              + '        213\n'
              + '01234567'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #2', () => {
    const act = r('1\b\v2\b\v3')
    const exp = '1\n'
              + '2\n'
              + '3'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #3', () => {
    const act = r('\v\b1\v\b2')
    const exp = '\n'
              + '1\n'
              + '2'
    assert.equal(inspect(act), inspect(exp))
  })

  it('mix test #4', () => {
    const act = r('some\be\rsom\vstrange\r\vline')
    const exp = 'some\n'
              + '   strange\n'
              + 'line'
    assert.equal(inspect(act), inspect(exp))
  })
})
