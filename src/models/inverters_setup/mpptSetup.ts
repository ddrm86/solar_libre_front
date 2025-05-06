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
}
