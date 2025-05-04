import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'

export interface IStringSetup {
  solarArray?: ISolarArray
  panelNumber?: number
}

export class StringSetup implements IStringSetup {
  solarArray?: ISolarArray
  panelNumber?: number

  static of(solarArray: ISolarArray, panelNumber: number): StringSetup {
    const instance = new StringSetup()
    instance.solarArray = solarArray
    instance.panelNumber = panelNumber
    return instance
  }
}
