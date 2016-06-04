'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { processOne as stringProcessOne } from './stringHandler'
import { extname, basename } from 'path'
import { isNumber, isInteger,
  isFinite, isString, last } from 'lodash'
import isNegativeZero = require('is-negative-zero')
import { yellow } from 'chalk'
import { inspect } from 'util'
import str2num, { isNum } from 'str2num'

const handlerName = basename(__filename, extname(__filename))
const isNegative = (v: number) => isNegativeZero(v) || (v < 0)

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%d|%n/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  if (!isNumber(rawReplacer) && !isString(rawReplacer))
    return stringProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)

  if (isString(rawReplacer) && !isNum(rawReplacer))
    return stringProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)

  const numReplacer = isString(rawReplacer)
    ? str2num(rawReplacer)
    : rawReplacer

  if (!isFinite(numReplacer))
    return inspect(numReplacer, { colors: true })

  const precision = isInteger(numReplacer) ? 0 : 2
  const numberStr = numReplacer.toFixed(precision)

  const negative = isNegative(numReplacer) ? '-' : ''
  const base = last(/\d+/.exec(numberStr))
  const decimal = last(/\d+(\.\d+)/.exec(numberStr)) || ''

  const baseWithCommas = base    // '12345'
    .split('').reverse()         // [ '5', '4', '3', '2', '1' ]
    .reduce((parts, char) => {   // [ ['5', '4', '3'], ['2', '1'] ]
      last(parts).length !== 3
        ? last(parts).push(char)
        : parts.push([ char ])
      return parts
    }, [[]])
    .reverse()                   // [ ['2', '1'], ['5', '4', '3'] ]
    .map(part => {               // [ '12', '345' ]
      return part.reverse().join('')
    })
    .join(',')                   // '12,345'

  return yellow(negative + baseWithCommas + decimal)
}

export default <IHandler> { findAll, processOne }
