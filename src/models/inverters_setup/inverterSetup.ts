import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import type { IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'

export interface IInverterSetup {
  inverter: IMonophaseInverter
  setup: IMpptSetup[]
}

export class CInverterSetup implements IInverterSetup {
  inverter: IMonophaseInverter
  setup: IMpptSetup[]

  constructor(inverter: IMonophaseInverter, setup: IMpptSetup[]) {
    this.inverter = inverter
    this.setup = setup
  }
}
