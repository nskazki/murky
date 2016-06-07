'use strict'

import handlers from './handlers'
import { IMurky, IPInfo } from './interfaces'
import { inspect } from 'util'
import { isString, fill, toArray } from 'lodash'
import uncolor = require('uncolor')
import supportsColor = require('supports-color')
import assert = require('assert')

const murky: IMurky = function() {
  // like util.format without arguments
  if (arguments.length === 0)
    return ''

  // rawReplacers & fmtStr may be redefined in case if fmtStr is missed
  // look "like util.format without fmtStr" code block
  //
  // fmtStr may be extended in case if count(placeholders(fmtStr)) < rawReplacers.length
  // look "check psInfo and rawReplacer size" code block size
  const args = toArray(arguments)
  let fmtStr: string = args[0]
  let rawReplacers: Array<any> = args.slice(1)

  if (!isString(fmtStr)) {
    // like util.format without fmtStr
    rawReplacers = args
    fmtStr = fill(new Array(rawReplacers.length), '%s').join(' ')
  }

  // get placeholders info
  // psInfo may be
  // - truncated in case if psInfo.length gt rawReplacers.length
  // - extended  in case if psInfo.length lt rawReplacer.length
  let psInfo = extractAllPInfo(fmtStr)

  // check psInfo and rawReplacer size
  if (psInfo.length > rawReplacers.length) {
    // murky('%s %s', 123)
    psInfo = psInfo.slice(0, rawReplacers.length)
  } else if (psInfo.length < rawReplacers.length) {
    // murky('%s', 123, 345)
    const missedCount = rawReplacers.length - psInfo.length
    const missedPlaceholders = fill(new Array(missedCount), '%s').join(' ')
    fmtStr = fmtStr + ' ' + missedPlaceholders
    psInfo = extractAllPInfo(fmtStr)
  }

  // calc result string
  let replacers: Array<string> = []
  let positions: Array<number> = []
  let resStr = fmtStr

  rawReplacers.forEach((rawReplacer, index) => {
    const pInfo = psInfo[index]

    // calc current replacer position
    const rsLength = replacers
      .slice(0, index)
      .reduce((acc, replacer) => acc + replacer.length, 0)
    const psLength = psInfo
      .slice(0, index)
      .reduce((acc, pInfo) => acc + pInfo.placeholder.length, 0)
    const fmtPartLength = pInfo.indexStart
    const position = fmtPartLength - psLength + rsLength

    // get current replacer
    const replacer = handlers.processOne(
      resStr, pInfo, rawReplacer, position)

    // store for next iterations
    replacers.push(replacer)
    positions.push(position)

    // update result string
    const prev = resStr.substring(0, position)
    const post = resStr.substring(position + pInfo.length)
    resStr = prev + replacer + post
  })

  // normalize resStr
  resStr = resStr.replace(/%%/g, '%')

  // check replacers
  const rsOrderErrors = positions.map((posA, indexA) => {
    return positions.slice(0, indexA).map((posB, indexB) => {
      return { posB, indexB }
    }).filter(({ posB }) => {
      return posA !== posB
    }).filter(({ posB }) => {
      return posA <= posB
    }).map(({ posB, indexB }) => {
      return `wrong replacers order: A should be placed after B:\
        \n\t A index: ${indexA}\
        \n\t B index: ${indexB}\
        \n\t A data: ${inspect(posA)}\
        \n\t B data: ${inspect(posB)}`
    })
  }).reduce((acc, part) => acc.concat(part), [])

  const rsTypeErrors = replacers.map((replacer, index) => {
    return { replacer, index }
  }).filter(({ replacer }) => {
    return !isString(replacer)
  }).map(({ replacer, index }) => {
    return `replacer must be a string:
      \n\t index: ${index}\
      \n\t type: ${typeof replacer}\
      \n\t data: ${inspect(replacer)}`
  })

  const rsErrors = [ ...rsOrderErrors, ...rsTypeErrors ]
  assert.ok(rsErrors.length === 0, `murky: internal problem: \n ${rsErrors.join('\n ')}`)

  // return result string
  return resStr
}

// helpers
function extractAllPInfo(fmtStr: string): Array<IPInfo> {
  // placeholder finders may has problems with %%
  // tmpStr used only to get info about placeholders
  const tmpStr = fmtStr.replace(/%%/g, '  ')
  const psInfo = handlers.findAll(tmpStr)

  // check placeholders info
  const psInfoOrderErrors = psInfo.map((pInfoA, indexA) => {
    return psInfo.slice(0, indexA).map((pInfoB, indexB) => {
      return { pInfoB, indexB }
    }).filter(({ pInfoB }) => {
      return pInfoA !== pInfoB
    }).filter(({ pInfoB }) => {
      return pInfoA.indexStart <= pInfoB.indexStart
    }).map(({ pInfoB, indexB }) => {
      return `wrong order of found placeholders: A should be placed after B:\
        \n\t A index: ${indexA}\
        \n\t B index: ${indexB}\
        \n\t A data: ${inspect(pInfoA)}\
        \n\t B data: ${inspect(pInfoB)}`
    })
  }).reduce((acc, part) => acc.concat(part), [])

  const psInfoCrossErrors = psInfo.map((pInfoA, indexA) => {
    return psInfo.map((pInfoB, indexB) => {
      return { pInfoB, indexB }
    }).filter(({ pInfoB }) => {
      return pInfoA !== pInfoB
    }).filter(({ pInfoB }) => {
      return !(false
        || (pInfoA.indexEnd < pInfoB.indexStart)
        || (pInfoB.indexEnd < pInfoA.indexStart))
    }).map(({ pInfoB, indexB }) => {
      return `placeholder A should not cross placeholder B:\
        \n\t A index: ${indexA}\
        \n\t B index: ${indexB}\
        \n\t A data: ${inspect(pInfoA)}\
        \n\t B data: ${inspect(pInfoB)}`
    })
  }).reduce((acc, part) => acc.concat(part), [])

  const psInfoErrors = [ ...psInfoOrderErrors, ...psInfoCrossErrors ]
  assert.ok(psInfoErrors.length === 0, `murky: internal problem!\n ${psInfoErrors.join('\n ')}`)

  return psInfo
}

// it's required for the *.d.ts formation
export const nocolor: IMurky = function() {
  return uncolor(murky.apply(null, arguments)) as string
}

export const color: IMurky = murky

const auto: IMurky = function() {
  return supportsColor
    ? color.apply(null, arguments) as string
    : nocolor.apply(null, arguments) as string
}

export default auto

// ES6 Modules default exports interop with CommonJS
module.exports = auto
module.exports.default = auto
module.exports.color = color
module.exports.nocolor = nocolor
