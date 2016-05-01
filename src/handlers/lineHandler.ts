'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { isString } from 'lodash'
import { processOne as baseProcessOne } from './stringHandler'
import { green } from 'chalk'
import oneline from 'string-true-oneline'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%l/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const multilineReplacer = baseProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)
  const onelineReplacer = !isString(rawReplacer)
    ? multilineReplacer.replace(/,\n\s+/g, ', ')
    : green(oneline(multilineReplacer))

  return onelineReplacer
}

export default <IHandler> { findAll, processOne }
