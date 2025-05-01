import type { SolarArrayModel } from '@/models/solar_arrays/solarArray.ts'

export interface IStringSetup {
  solarArray: SolarArrayModel
  panelNumber: number
}

export class StringSetup implements IStringSetup {
  solarArray: SolarArrayModel
  panelNumber: number

  constructor(solarArray: SolarArrayModel, panelNumber: number) {
    this.solarArray = solarArray
    this.panelNumber = panelNumber
  }
}
