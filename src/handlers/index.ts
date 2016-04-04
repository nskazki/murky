'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { resolve } from 'path'
import { readdirSync, statSync  } from 'fs'

const isFile = (path: string) => statSync(path).isFile()
const isHandlerFile = (path: string) => /\w+Handler\.(ts|js)$/.test(path)

const handlers = readdirSync(__dirname)
  .map(file => resolve(__dirname, file))
  .filter(path => isFile(path))
  .filter(path => isHandlerFile(path))
  .map(path => <IHandler> require(path))

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
