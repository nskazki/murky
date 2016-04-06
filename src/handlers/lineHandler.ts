'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { inspect } from 'util'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%l/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const multilineReplacer = inspect(rawReplacer, { depth: 0, colors: true })
  const onelineReplacer = multilineReplacer.replace(/,\n\s+/g, ', ')
  return onelineReplacer
}

export default <IHandler> { findAll, processOne }
