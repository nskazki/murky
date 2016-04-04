'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { inspect } from 'util'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const str = fmtStr.replace(/%{2}/g, '')
  const pRE = /%s/g
  const founds = execGlobal(str, pRE)
  return founds.map(pos => new PInfo(pos, handlerName, this))
}

export const processOne: IProcessOne = function(rawReplacer, pInfo) {
  return inspect(rawReplacer, { depth: 0, colors: true })
}

export default <IHandler> { findAll, processOne }
