import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import type { IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'

export interface IInverterSetup {
  id: string
  inverter?: IMonophaseInverter
  setup: IMpptSetup[]

  calcPeakPower(): number
  calcPeakVoltage(): number
  calcStartupVoltage(): number
  calcInverterUsage(): number
}

export class CInverterSetup implements IInverterSetup {
  id: string = crypto.randomUUID()
  inverter?: IMonophaseInverter
  setup : IMpptSetup[] = []

  static of(inverter: IMonophaseInverter, setup: IMpptSetup[]): CInverterSetup {
    const instance = new CInverterSetup();
    instance.inverter = inverter;
    instance.setup = setup;
    return instance;
  }

  calcPeakPower(): number {
    return this.setup.reduce((acc, mppt) => {
      return acc + mppt.calcPeakPower()
    }, 0)
  }

  calcPeakVoltage(): number {
    return this.setup.reduce((max, mppt) => {
      return Math.max(max, mppt.calcPeakVoltage())
    }, 0)
  }

  calcStartupVoltage(): number {
    return this.setup
      .map((mppt) => mppt.calcPeakVoltage())
      .filter((voltage) => voltage > 0)
      .reduce((min, voltage) => Math.min(min, voltage), Infinity)
  }

  calcInverterUsage(): number {
    if (!this.inverter) {
      return 0
    }
    const peakPower = this.calcPeakPower()
    const inverterOutputPower = this.inverter.nominal_output_power
    return peakPower / inverterOutputPower
  }
}
