import type { IStringSetup } from '@/models/inverters_setup/stringSetup.ts'

export interface IMpptSetup {
  id: string
  strings: IStringSetup[]

  calcPeakPower(): number
  calcPeakVoltage(): number
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
