'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { toNumber } from '../helpers/number'
import { extname, basename } from 'path'
import { isNumber, isFinite, isString } from 'lodash'
import { yellow } from 'chalk'
import { inspect } from 'util'
import parseMs = require('parse-ms')

const handlerName = basename(__filename, extname(__filename))
const plural = (count: number, baseName: string) => {
  const pName = (count === 0 || count > 1.5 || count < -1.5)
    ? baseName + 's'
    : baseName
  return `${count} ${pName}`
}

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%ms|%m/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const msReplacer = isString(rawReplacer)
    ? toNumber(rawReplacer)
    : rawReplacer

  if (!isNumber(msReplacer) || !isFinite(msReplacer))
    throw new Error(`murky#msHandler: msReplacer must be a finite number!\
                     \n\t msReplacer type: ${typeof msReplacer}\
                     \n\t msReplacer value: ${inspect(msReplacer)}`)

  const info = parseMs(msReplacer)
  if (info.days !== 0) {
    return yellow(`[${plural(info.days, 'day')} ${plural(info.hours, 'hour')}]`)
  } else if (info.hours !== 0) {
    return yellow(`[${plural(info.hours, 'hour')} ${plural(info.minutes, 'minute')}]`)
  } else if (info.minutes !== 0) {
    return yellow(`[${plural(info.minutes, 'minute')} ${plural(info.seconds, 'second')}]`)
  } else if (info.seconds !== 0) {
    return yellow(`[${plural(info.seconds, 'second')} ${info.milliseconds} ms]`)
  } else {
    return yellow(`[0 seconds ${info.milliseconds} ms]`)
  }
}

export default <IHandler> { findAll, processOne }
