'use strict'

import handlers from './handlers'
import { IMurky } from './interfaces'
import { inspect } from 'util'
import { isString } from 'lodash'
import uncolor = require('uncolor')

const murky: IMurky = (fmtStr, ...rawReplacers) => {
  // check user input: fmtStr
  if (!isString(fmtStr))
    throw new Error(`murky: input problem: the first arg must be a string!\
      \n\t arg type: ${typeof fmtStr}\
      \n\t arg data: ${inspect(fmtStr)}`)

  // get placeholders info
  const psInfo = handlers.findAll(fmtStr)

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
  if (psInfoErrors.length !== 0) {
    throw new Error(`murky: internal problem!\n ${psInfoErrors.join('\n ')}`)
  }

  // check user input: rawReplacer
  if (psInfo.length !== rawReplacers.length)
    throw new Error(`murky: input problem: the number of found placeholders does not match the number of replacers!\
      \n\t placeholders.length: ${psInfo.length}\
      \n\t replacers.length: ${rawReplacers.length}\
      \n\t placeholders info: \n${inspect(psInfo)}\n`)

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
  if (rsErrors.length !== 0) {
    throw new Error(`murky: internal problem: \n ${rsErrors.join('\n ')}`)
  }

  // return result string
  return resStr
}

// it's required for the *.d.ts formation
export default murky
export const color = murky
export const nocolor: IMurky = (fmtStr, ...rawReplacers) => {
  return uncolor(murky(fmtStr, ...rawReplacers))
}

// ES6 Modules default exports interop with CommonJS
module.exports = murky
module.exports.default = murky
module.exports.color = color
module.exports.nocolor = nocolor
