import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'

export interface IStringSetup {
  id: string
  solarArray?: ISolarArray
  panelNumber?: number

  calcPeakPower(): number
  calcPeakVoltage(): number
  calcPeakCurrent(): number
  calcOpenCircuitVoltage(): number
  calcShortCircuitCurrent(): number
}

export class CStringSetup implements IStringSetup {
  id: string = crypto.randomUUID()
  solarArray?: ISolarArray
  panelNumber?: number

  static of(solarArray: ISolarArray, panelNumber: number): CStringSetup {
    const instance = new CStringSetup()
    instance.solarArray = solarArray
    instance.panelNumber = panelNumber
    return instance
  }

  calcPeakPower(): number {
    if (!this.solarArray) {
      return 0
    }
    return this.solarArray.array.panel.nominal_power * (this.panelNumber ?? 0)
  }

  calcPeakVoltage(): number {
    if (!this.solarArray) {
      return 0
    }
    return this.solarArray.array.panel.vmpp * (this.panelNumber ?? 0)
  }

  calcPeakCurrent(): number {
    if (!this.solarArray || !this.panelNumber || this.panelNumber === 0) {
      return 0
    }
    return this.solarArray.array.panel.impp
  }

  calcOpenCircuitVoltage(): number {
    if (!this.solarArray) {
      return 0
    }
    return this.solarArray.array.panel.voc * (this.panelNumber ?? 0)
  }

  calcShortCircuitCurrent(): number {
    if (!this.solarArray || !this.panelNumber || this.panelNumber === 0) {
      return 0
    }
    return this.solarArray.array.panel.isc
  }
}
