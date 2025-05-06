import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import type { IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'

export interface IInverterSetup {
  inverter?: IMonophaseInverter
  setup: IMpptSetup[]
}

export class CInverterSetup implements IInverterSetup {
  inverter?: IMonophaseInverter
  setup : IMpptSetup[] = []

  static of(inverter: IMonophaseInverter, setup: IMpptSetup[]): CInverterSetup {
    const instance = new CInverterSetup();
    instance.inverter = inverter;
    instance.setup = setup;
    return instance;
  }
}
