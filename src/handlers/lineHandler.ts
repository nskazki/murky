'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { extname, basename } from 'path'
import { isString, last, uniq, isUndefined } from 'lodash'
import { processOne as baseProcessOne } from './stringHandler'

import codePointAt = require('code-point-at')
import getAnsiRegex = require('ansi-regex')

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
    : fmtMulilineString(multilineReplacer)

  return onelineReplacer
}

export default <IHandler> { findAll, processOne }

function fmtMulilineString(multi: string): string {
  // исключение вредных escape sequence
  // и замена переносов строки на пробелы
  const dirty = multi
    .replace(/\v\r/g, '\n')
    .replace(/\r\v/g, '\n')
    .replace(/\v/g, '')
    .replace(/\r/g, '')
    .replace(/\t/g, '')
    .replace(/\x08/g, '') // /\x08/g.test('\b')
    .replace(/\f/g, '')
    .replace(/\n/g, ' ')

  // удаление открывающих и закрывающих пробелов
  // с учетом присутствия неотображаемых последовательностей

  // положение неотображаемых последовательностей
  const padAnsies = execGlobal(dirty, getAnsiRegex()).map(it => {
    const value = last(it)
    const startIndex = it.index
    const endIndex = it.index + value.length - 1
    return { startIndex, endIndex, value }
  })

  // положение открывающих и закрывающих пробелов
  let padSpaces: Array<number> = []

  // поиск пробелов от начала до первого значащего символа
  for (let index = 0; index < dirty.length; index++) {
    const isAnsi = padAnsies.some(padAnsi => true
      && (index >= padAnsi.startIndex)
      && (index <= padAnsi.endIndex))
    const isSurrogate = codePointAt(dirty, index) >= 0x10000
    const padChar = dirty[index]
    const isSpace = /\s/.test(padChar)
    if (!isAnsi && !isSurrogate && !isSpace) break
    if (!isAnsi && !isSurrogate && isSpace) padSpaces.push(index)
  }

  // поиск пробелов от конца до последнего значащего символа
  for (let index = dirty.length - 1; index >= 0; index--) {
    const isAnsi = padAnsies.some(padAnsi => true
      && (index >= padAnsi.startIndex)
      && (index <= padAnsi.endIndex))
    const isSurrogate = codePointAt(dirty, index) >= 0x10000
    const padChar = dirty[index]
    const isSpace = / /.test(padChar)
    if (!isAnsi && !isSurrogate && !isSpace) break
    if (!isAnsi && !isSurrogate && isSpace) padSpaces.push(index)
  }

  // удаление открывающих и закрывающих пробелов
  let noPad = dirty
  uniq(padSpaces)
    .sort((a, b) => b - a)
    .forEach(spacePosition => {
      const prev = noPad.substring(0, spacePosition)
      const post = noPad.substring(spacePosition + 1)
      noPad = prev + post
    })

  // схлопывание пробелова между значащими символами
  // в том числе объединение пробелов отделенных неотображаемыми символоми

  // актуальное положение неотображаемых последовательностей
  const gutAnsies = execGlobal(noPad, getAnsiRegex()).map(it => {
    const value = last(it)
    const startIndex = it.index
    const endIndex = it.index + value.length - 1
    return { startIndex, endIndex, value }
  })

  // состовление карты строки
  let gutMap: Array<string> = []

  for (let index = 0; index < noPad.length; index++) {
    const isAnsi = gutAnsies.some(gutAnsi => true
      && (index >= gutAnsi.startIndex)
      && (index <= gutAnsi.endIndex))
    const isSurrogate = codePointAt(noPad, index) >= 0x10000
    const gutChar = noPad[index]
    const isSpace = / /.test(gutChar)
    if (!isAnsi && !isSurrogate && !isSpace) gutMap.push('c')
    else if (!isAnsi && !isSurrogate && isSpace) gutMap.push(' ')
    else if (isAnsi || isSurrogate) gutMap.push('')
    else gutMap.push('?')
  }

  // поиск пробелов подлежащие удалению для выполнения схлопывания
  let gutSpaces: Array<number> = []
  for (let index = 1; index < gutMap.length; index++) {

    const currType = gutMap[index]
    let prevType: string
    for (let prevIndex = index - 1; prevIndex >= 0; prevIndex--) {
      const prevCandidate = gutMap[prevIndex]
      if (prevCandidate === '') continue

      if (prevCandidate === 'c') prevType = 'c'
      if (prevCandidate === ' ') prevType = ' '
      break
    }

    if (isUndefined(currType) || isUndefined(prevType)) continue

    const isGutSpace = true
      && currType === ' '
      && prevType === ' '
    if (isGutSpace) gutSpaces.push(index)
  }

  // схлопывание пробелов между значащими символами
  let noGut = noPad
  uniq(gutSpaces)
    .sort((a, b) => b - a)
    .forEach(spacePosition => {
      const prev = noGut.substring(0, spacePosition)
      const post = noGut.substring(spacePosition + 1)
      noGut = prev + post
    })

  return noGut
}
