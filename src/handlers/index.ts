'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'

import jsonHandler from './jsonHandler'
import lineHandler from './lineHandler'
import stringHandler from './stringHandler'
import tabHandler from './tabHandler'
import numberHandler from './numberHandler'
import msHandler from './msHandler'
import filesizeHandler from './filesizeHandler'

const handlers = [
  jsonHandler, lineHandler,
  stringHandler, tabHandler,
  numberHandler, msHandler,
  filesizeHandler ]

export const findAll: IFindAll = function(fmtStr) {
  const psInfo = handlers
    .map(handler => handler.findAll(fmtStr))
    .reduce((acc, part) => acc.concat(part), [])
    .sort((pInfoA, pInfoB) => pInfoA.indexStart - pInfoB.indexStart)
  return psInfo
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const replacer = pInfo.handlerLink.processOne(fmtStr, pInfo, rawReplacer, replacerPosition)
  return replacer
}

export default <IHandler> { findAll, processOne }
