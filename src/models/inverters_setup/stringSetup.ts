/**
 * stringSetup.ts
 *
 * This file defines the IStringSetup interface and the CStringSetup class for managing
 * the configuration of a string of solar panels within a solar array.
 * The IStringSetup interface specifies properties such as the string identifier,
 * an optional reference to a solar array, and the number of panels in the string.
 * It also declares methods to calculate key electrical parameters for the string,
 * including peak power, peak voltage, peak current, open circuit voltage,
 * and short circuit current.
 * The CStringSetup class implements IStringSetup, providing default values and
 * concrete logic for each calculation method based on the associated solar array
 * and panel count. The static of method allows for convenient instantiation
 * of CStringSetup objects with a given solar array and panel number.
 */

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
    if (!this.solarArray?.array) {
      return 0
    }
    return this.solarArray.array.panel.nominal_power * (this.panelNumber ?? 0)
  }

  calcPeakVoltage(): number {
    if (!this.solarArray?.array) {
      return 0
    }
    return this.solarArray.array.panel.vmpp * (this.panelNumber ?? 0)
  }

  calcPeakCurrent(): number {
    if (!this.solarArray?.array || !this.panelNumber || this.panelNumber === 0) {
      return 0
    }
    return this.solarArray.array.panel.impp
  }

  calcOpenCircuitVoltage(): number {
    if (!this.solarArray?.array) {
      return 0
    }
    return this.solarArray.array.panel.voc * (this.panelNumber ?? 0)
  }

  calcShortCircuitCurrent(): number {
    if (!this.solarArray?.array || !this.panelNumber || this.panelNumber === 0) {
      return 0
    }
    return this.solarArray.array.panel.isc
  }
}
