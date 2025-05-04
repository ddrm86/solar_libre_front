import type { IStringSetup } from '@/models/inverters_setup/stringSetup.ts'

export interface IMpptSetup {
  strings: IStringSetup[]
}

export class CMpptSetup implements IMpptSetup {
  strings: IStringSetup[]

  constructor(strings: IStringSetup[]) {
    this.strings = strings
  }
}
