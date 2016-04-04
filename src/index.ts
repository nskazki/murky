'use strict'

import handlers from './handlers'
import { inspect } from 'util'
import { isString } from 'lodash'

export default function murky(fmtStr: string, ...rawReplacers: Array<any>): string {
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

  // get replacers
  const replacers = rawReplacers.map((rawReplacer, index) => {
    const pInfo = psInfo[index]
    return handlers.processOne(rawReplacer, pInfo)
  })

  // calc replacers positions
  const positions = psInfo.map((pInfo, index) => {
    const rsLength = replacers
      .slice(0, index)
      .reduce((acc, replacer) => acc + replacer.length, 0)
    const psLength = psInfo
      .slice(0, index)
      .reduce((acc, pInfo) => acc + pInfo.placeholder.length, 0)
    const fmtPartLength = pInfo.indexStart
    const resStartIndex = fmtPartLength - psLength + rsLength
    return resStartIndex
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

  // calc result string
  let resStr = fmtStr
  psInfo.forEach((pInfo, index) => {
    const replacer = replacers[index]
    const position = positions[index]

    const prev = resStr.substring(0, position)
    const post = resStr.substring(position + pInfo.length)

    resStr = prev + replacer + post
  })

  return resStr
}
