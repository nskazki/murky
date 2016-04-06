'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { format } from 'util'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  let str = fmtStr.replace(/%{2}/g, '')
  let pRE = /%j/g
  const founds = execGlobal(str, pRE)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  return format(pInfo.placeholder, rawReplacer)
}

export default <IHandler> { findAll, processOne }
