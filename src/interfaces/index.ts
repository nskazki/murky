'use strict'

export interface IHandler {
  findAll: IFindAll,
  processOne:  IProcessOne
}

export interface IFindAll {
  (fmtStr: string): Array<IPInfo>
}

export interface IProcessOne {
  (fmtStr: string, pInfo: IPInfo, rawReplacer: any, replacerPosition: number): string
}

export interface IPInfo {
  placeholder: string,
  handlerName: string,
  handlerLink: IHandler,
  indexStart: number,
  indexEnd: number,
  length: number
}
