import type { IStringSetup } from '@/models/inverters_setup/stringSetup.ts'

export interface IMpptSetup {
  id: string
  strings: IStringSetup[]
}

export class CMpptSetup implements IMpptSetup {
  id: string = crypto.randomUUID()
  strings: IStringSetup[]

  constructor(strings: IStringSetup[]) {
    this.strings = strings
  }

  toString(): string {
    const initText = 'Strings ➡️ ';
    const stringText = this.strings
      .filter(string => string.solarArray)
      .map(string =>
        `${string.panelNumber} x ${string.solarArray?.array.panel.maker}
        ${string.solarArray?.array.panel.model} 🧭${string.solarArray?.array.azimuth}º`
      )
      .join(' | ');
    return initText + stringText;
  }
}
