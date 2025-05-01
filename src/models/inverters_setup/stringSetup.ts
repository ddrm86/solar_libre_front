import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'

export interface IStringSetup {
  solarArray: ISolarArray
  panelNumber: number
}

export class StringSetup implements IStringSetup {
  solarArray: ISolarArray
  panelNumber: number

  constructor(solarArray: ISolarArray, panelNumber: number) {
    this.solarArray = solarArray
    this.panelNumber = panelNumber
  }
}
