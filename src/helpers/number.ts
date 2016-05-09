'use strict'

import { inspect } from 'util'

export function toNumber(value: string): number {
    const trimed = value.trim()

    const isStrNaN = trimed === 'NaN'
    const isStrInfinity = /^[-+]?Infinity$/.test(trimed)

    const isStrEpsilon = false
      || /^[-+]?\d+\.\d*e\d+$/.test(trimed)
      || /^[-+]?\d*\.\d+e\d+$/.test(trimed)
      || /^[-+]?\d+e\d+$/.test(trimed)

    const isStrNormal = false
      || /^[-+]?\d+\.\d*$/.test(trimed)
      || /^[-+]?\d*\.\d+$/.test(trimed)
      || /^[-+]?\d+$/.test(trimed)

    const isStrNumber = false
      || isStrNaN
      || isStrInfinity
      || isStrEpsilon
      || isStrNormal

    if (isStrNumber) return Number(trimed)
    throw new Error(`murky/helpers/number#toNumber: value can't be cast to number!\
                     \n\t value type: ${typeof value}\
                     \n\t value: ${inspect(value)}`)
}
