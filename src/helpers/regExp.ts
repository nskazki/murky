'use strict'

export function execGlobal(fmtStr: string, regexp: RegExp): Array<RegExpExecArray> {
  const found = regexp.exec(fmtStr)
  return found !== null
    ? [ found, ...execGlobal(fmtStr, regexp) ]
    : [ ]
}
