import type { MonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import type { IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'

export interface IInverterSetup {
  inverter: MonophaseInverter
  setup: IMpptSetup[]
}
