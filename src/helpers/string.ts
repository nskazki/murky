'use strict'

import { repeat } from 'lodash'

import codePointAt = require('code-point-at')
import getAnsiRegex = require('ansi-regex')

export function stringRender(rawStr: string): string {
  let clrStr = rawStr
    .replace(getAnsiRegex(), '')
    .replace(/\v\r/g, '\n')
    .replace(/\r\v/g, '\n')
    .replace(/\r\n/g, '\n')

  let resStr: Array<string> = [ ]
  let resNextIndex = 0
  let resLineStart = 0

  for (let index = 0; index < clrStr.length; index ++) {
    if (codePointAt(clrStr, index) >= 0x10000) continue

    let char = clrStr[index]

    if ((char === '\v') || (char === '\f')) {
      const padSize = resNextIndex - resLineStart
      const padLine = repeat(' ', padSize)

      resNextIndex = resStr.length
      resStr[resNextIndex] = '\n'
      resNextIndex++
      resLineStart = resNextIndex

      resStr.push.apply(resStr, padLine.split(''))
      resNextIndex += padSize
      continue
    }

    if (char === '\r') {
      const newCurr = resLineStart
      resNextIndex = newCurr
      continue
    }

    if (char === '\t') {
      const tabSize = 8
      const tabDone = (resNextIndex - resLineStart) % tabSize
      const padSize = tabSize - tabDone
      const padLine = repeat(' ', padSize)
      resStr.push.apply(resStr, padLine.split(''))
      resNextIndex += padSize
      continue
    }

    if (char === '\b') {
      if (resNextIndex === resLineStart) continue
      resNextIndex--
      continue
    }

    if (char === '\n') {
      resNextIndex = resStr.length
      resStr[resNextIndex] = '\n'
      resNextIndex++
      resLineStart = resNextIndex
      continue
    }

    resStr[resNextIndex] = char
    resNextIndex++
  }

  return resStr.join('')
}
