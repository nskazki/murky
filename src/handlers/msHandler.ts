'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { processOne as stringProcessOne } from './stringHandler'
import { extname, basename } from 'path'
import { isNumber, isFinite, isString } from 'lodash'
import { yellow } from 'chalk'
import prettyMs from 'pretty-large-ms'
import str2num, { isNum } from 'str2num'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%ms|%m/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  if (!isNumber(rawReplacer) && !isString(rawReplacer))
    return stringProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)

  if (isString(rawReplacer) && !isNum(rawReplacer))
    return stringProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)

  const msReplacer = isString(rawReplacer)
    ? str2num(rawReplacer)
    : rawReplacer

  if (!isFinite(msReplacer))
    return stringProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)

  return yellow(`${prettyMs(msReplacer)}`)
}

export default <IHandler> { findAll, processOne }
