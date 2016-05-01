'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { last, repeat } from 'lodash'
import { processOne as baseProcessOne } from './stringHandler'
import stringRender from 'string-render'
import stringWidth = require('string-width')


const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%t/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const rawLines = fmtStr.substring(0, replacerPosition)
  const clrLines = stringRender(rawLines + '\v')

  const lastLine = last(clrLines.split('\n')).replace(/%%/g, '%')
  const lineSize = stringWidth(lastLine)

  const leftPad = repeat(' ', lineSize)
  const baseReplacer = baseProcessOne(fmtStr, pInfo, rawReplacer, replacerPosition)
  const padReplacer = baseReplacer.replace(/\n/g, '\n' + leftPad)

  return padReplacer
}

export default <IHandler> { findAll, processOne }
