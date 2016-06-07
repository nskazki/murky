'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { chain, isString } from 'lodash'
import { processOne as baseProcessOne } from './stringHandler'
import { fmtError, isIErrorLike } from 'error-shortener'
import oneline from 'string-true-oneline'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%l/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  if (isIErrorLike(rawReplacer)) {
    return chain(rawReplacer)
      .omit('stack').thru(fmtError)
      .thru(oneline).thru(it => `[${it}]`)
      .value()
  }

  const multilineReplacer = baseProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)
  const onelineReplacer = !isString(rawReplacer)
    ? multilineReplacer.replace(/,\n\s+/g, ', ')
    : oneline(multilineReplacer)

  return onelineReplacer
}

export default <IHandler> { findAll, processOne }
