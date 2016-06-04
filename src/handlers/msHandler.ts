'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { isNumber, isFinite, isString } from 'lodash'
import { yellow } from 'chalk'
import { inspect } from 'util'
import prettyMs from 'pretty-large-ms'
import str2num from 'str2num'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%ms|%m/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const msReplacer = isString(rawReplacer)
    ? str2num(rawReplacer)
    : rawReplacer

  if (!isNumber(msReplacer) || !isFinite(msReplacer))
    throw new Error(`murky#msHandler: msReplacer must be a finite number!\
                     \n\t msReplacer type: ${typeof msReplacer}\
                     \n\t msReplacer value: ${inspect(msReplacer)}`)

  return yellow(`${prettyMs(msReplacer)}`)
}

export default <IHandler> { findAll, processOne }
