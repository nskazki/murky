'use strict'

import { IFindAll, IProcessOne, IHandler } from '../interfaces'
import { PInfoRE as PInfo } from '../helpers/pInfo'
import { execGlobal } from '../helpers/regExp'
import { toNumber } from '../helpers/number'
import { extname, basename } from 'path'
import { isNumber, isFinite,
  isString, find, last, get } from 'lodash'
import { yellow } from 'chalk'
import { inspect } from 'util'
import pluralize = require('pluralize')
import parseMs from 'parse-large-ms'

const handlerName = basename(__filename, extname(__filename))

export const findAll: IFindAll = function(fmtStr) {
  const founds = execGlobal(fmtStr, /%ms|%m/g)
  return founds.map(pos => {
    return new PInfo(pos, handlerName, this)
  })
}

const rules = [
  { name: 'millenniums',  pair: [ 'millenniums', 'centuries'    ] },
  { name: 'centuries',    pair: [ 'centuries',   'decades'      ] },
  { name: 'decades',      pair: [ 'decades',     'years'        ] },
  { name: 'years',        pair: [ 'years',       'months'       ] },
  { name: 'months',       pair: [ 'months',      'days'         ] },
  { name: 'days',         pair: [ 'days',        'hours'        ] },
  { name: 'hours',        pair: [ 'hours',       'minutes'      ] },
  { name: 'minutes',      pair: [ 'minutes',     'seconds'      ] },
  { name: 'seconds',      pair: [ 'seconds',     'milliseconds' ] },
  { name: 'milliseconds', pair: [ 'seconds',     'milliseconds' ] }
]

const short = {
  'milliseconds': 'ms'
}

export const processOne: IProcessOne = function(fmtStr, pInfo, rawReplacer, replacerPosition) {
  const msReplacer = isString(rawReplacer)
    ? toNumber(rawReplacer)
    : rawReplacer

  if (!isNumber(msReplacer) || !isFinite(msReplacer))
    throw new Error(`murky#msHandler: msReplacer must be a finite number!\
                     \n\t msReplacer type: ${typeof msReplacer}\
                     \n\t msReplacer value: ${inspect(msReplacer)}`)

  const info = parseMs(msReplacer)
  const rule = find(rules, rule => {
    return (info as any)[rule.name] !== 0
  }) || last(rules)

  const bits = rule.pair
    .map(key => pluralize(get(short, key, key), (info as any)[key], true))
    .join(' ')

  return yellow(`[${bits}]`)
}

export default <IHandler> { findAll, processOne }
