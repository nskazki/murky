'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { green } from 'chalk'
import { inspect } from 'util'
import { isString } from 'lodash'
import stringRender from 'string-render'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%s/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  return isString(rawReplacer)
    ? green(stringRender(rawReplacer))
    : inspect(rawReplacer, { depth: null, colors: true })
}

export default <IHandler> { findAll, processOne }
