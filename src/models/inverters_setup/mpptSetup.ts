/**
 * mpptSetup.ts
 *
 * This file defines the IMpptSetup interface and the CMpptSetup class for managing
 * the configuration of MPPT (Maximum Power Point Tracking) setups in a solar inverter system.
 * The IMpptSetup interface specifies properties such as a unique identifier and an array of string setups,
 * as well as methods to calculate key electrical parameters for the MPPT,
 * including peak power, peak voltage, peak current, open circuit voltage, and short circuit current.
 * The CMpptSetup class implements IMpptSetup, providing logic to aggregate or select
 * the appropriate values from its associated string setups for each calculation.
 * The toString method generates a human-readable summary of the MPPT setup,
 * listing the number of panels, panel maker, model, and azimuth for each string with an associated solar array.
 */

import type { IStringSetup } from '@/models/inverters_setup/stringSetup.ts'

export interface IMpptSetup {
  id: string
  strings: IStringSetup[]

  calcPeakPower(): number
  calcPeakVoltage(): number
  calcPeakCurrent(): number
  calcOpenCircuitVoltage(): number
  calcShortCircuitCurrent(): number
}

export class CMpptSetup implements IMpptSetup {
  id: string = crypto.randomUUID()
  strings: IStringSetup[]

  constructor(strings: IStringSetup[]) {
    this.strings = strings
  }

  calcPeakPower(): number {
    return this.strings.reduce((acc, string) => {
      return acc + string.calcPeakPower()
    }, 0)
  }

  calcPeakVoltage(): number {
    return this.strings.reduce((max, string) => {
        return Math.max(max, string.calcPeakVoltage())
    }, 0)
  }

  calcPeakCurrent(): number {
    return this.strings.reduce((acc, string) => {
      return acc + string.calcPeakCurrent()
    }, 0)
  }

  calcOpenCircuitVoltage(): number {
    return this.strings.reduce((max, string) => {
        return Math.max(max, string.calcOpenCircuitVoltage())
    }, 0)
  }

  calcShortCircuitCurrent(): number {
    return this.strings.reduce((acc, string) => {
      return acc + string.calcShortCircuitCurrent()
    }, 0)
  }

  toString(): string {
    const initText = 'Strings ➡️ '
    const stringText = this.strings
      .filter((string) => string.solarArray)
      .map(
        (string) =>
          `${string.panelNumber} x ${string.solarArray?.array.panel.maker}
        ${string.solarArray?.array.panel.model} 🧭${string.solarArray?.array.azimuth}º`,
      )
      .join(' | ')
    return initText + stringText
  }
}
