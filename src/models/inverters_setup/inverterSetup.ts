import type { MonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import type { IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'

export interface IInverterSetup {
  inverter: MonophaseInverter
  setup: IMpptSetup[]
}

export class InverterSetup implements IInverterSetup {
  inverter: MonophaseInverter
  setup: IMpptSetup[]

  constructor(inverter: MonophaseInverter, setup: IMpptSetup[]) {
    this.inverter = inverter
    this.setup = setup
  }
}
