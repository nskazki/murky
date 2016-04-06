'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { inspect } from 'util'
import { last, repeat } from 'lodash'
import stringWidth = require('string-width')

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%t/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const prevStr = fmtStr.substring(0, replacerPosition)
    .replace(/\r\v/g, '\n')
    .replace(/\v\r/g, '\n')
  const lineStr = last(splitByChars(prevStr, [ '\n', '\r' ]))
  const normStr = lineStr.replace(/%%/g, '')
  const lineSize = stringWidth(normStr)

  const leftPad = repeat(' ', lineSize)
  const replacer = inspect(rawReplacer, { depth: 0, colors: true })
    .replace(/\n/g, '\n' + leftPad)

  return replacer
}

export default <IHandler> { findAll, processOne }

function splitByChars(str: string, chars: Array<string>): Array<string> {
  let resArray: Array<string> = []
  let subIndexStart = 0
  let subIndexEnd = 0

  for ( ; subIndexEnd !== str.length; subIndexEnd++) {
    if (chars.indexOf(str[subIndexEnd]) === -1) continue

    const subStr = str.substring(subIndexStart, subIndexEnd)
    if (subStr !== '') resArray.push(subStr)
    subIndexStart = subIndexEnd + 1
  }

  const subStr = str.substring(subIndexStart, str.length)
  if (subStr !== '') resArray.push(subStr)

  return resArray
}
