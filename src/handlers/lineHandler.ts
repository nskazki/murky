'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { inspect } from 'util'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  let str = fmtStr.replace(/%{2}/g, '')
  let pRE = /%l/g
  const founds = execGlobal(str, pRE)
  return founds.map(pos => new PInfo(pos, handlerName, this))
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const multilineReplacer = inspect(rawReplacer, { depth: 0, colors: true })
  const onelineReplacer = multilineReplacer.replace(/,\n\s+/g, ', ')
  return onelineReplacer
}

export default <IHandler> { findAll, processOne }
