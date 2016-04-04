'use strict'

import { IPInfo, IHandler } from '../interfaces'
import { last } from 'lodash'

export class PInfoBase implements IPInfo {
  placeholder: string
  handlerName: string
  handlerLink: IHandler
  indexStart: number
  indexEnd: number
  length: number

  protected _selfCheck() {
    if (this.placeholder.length === 0) {
      throw new Error(`PInfoBase: internal problem: placeholder length must be greater then zero\
        \n\t placeholder: ${this.placeholder}\
        \n\t placeholder.length: ${this.placeholder.length}`)
    }

    if (this.handlerName.length === 0) {
      throw new Error(`PInfoBase: internal problem: handlerName length must be greater then zero\
        \n\t handlerName: ${this.handlerName}\
        \n\t handlerName.length: ${this.handlerName.length}`)
    }

    if (this.indexStart < 0 || this.indexEnd < 0) {
      throw new Error(`PInfoBase: internal problem: indexEnd and indexStart must be greater then zero\
        \n\t indexStart; ${this.indexStart}\
        \n\t indexEnd: ${this.indexEnd}`)
    }

    if (this.indexStart > this.indexEnd) {
      throw new Error(`PInfoBase: internal problem: indexEnd must be less then indexEnd\
        \n\t indexStart: ${this.indexStart}\
        \n\t indexEnd: ${this.indexEnd}`)
    }

    if (this.length !== this.placeholder.length) {
      throw new Error(`PInfoBase: internal problem: placeholder length must be equal to the length\
        \n\t placeholder: ${this.placeholder}\
        \n\t placeholder.length: ${this.placeholder.length}\
        \n\t indexStart: ${this.indexStart}\
        \n\t indexEnd: ${this.indexEnd}\
        \n\t length: ${this.length}`)
    }
  }
}

export class PInfoRE extends PInfoBase {
  placeholder: string
  indexStart: number
  indexEnd: number
  length: number

  constructor(
    position: RegExpExecArray,
    public handlerName: string,
    public handlerLink: IHandler
  ) {
    super()

    this.placeholder = last(position)
    this.indexStart = position.index
    this.indexEnd = position.index + this.placeholder.length - 1
    this.length = this.placeholder.length

    this._selfCheck()
  }
}

export class PInfo extends PInfoBase {
  length: number

  constructor(
    public placeholder: string,
    public handlerName: string,
    public handlerLink: IHandler,
    public indexStart: number,
    public indexEnd: number
  ) {
    super()
    this.length = this.indexEnd - this.indexStart + 1
    this._selfCheck()
  }
}
