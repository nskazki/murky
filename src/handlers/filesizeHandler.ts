'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { isNumber, isFinite, isString } from 'lodash'
import { yellow } from 'chalk'
import { inspect } from 'util'
import rawFilesize = require('filesize')
import str2num from 'str2num'

const filesize = (v: number) => rawFilesize(v).replace(/\s/g, '')
const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%b|%f/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const filesizeReplacer = isString(rawReplacer)
    ? str2num(rawReplacer)
    : rawReplacer

  if (!isNumber(filesizeReplacer) || !isFinite(filesizeReplacer))
    throw new Error(`murky#filesizeHandler: filesizeReplacer must be a finite number!\
                     \n\t filesizeReplacer type: ${typeof filesizeReplacer}\
                     \n\t filesizeReplacer value: ${inspect(filesizeReplacer)}`)

  return yellow(`${filesize(filesizeReplacer)}`)
}

export default <IHandler> { findAll, processOne }
