/**
 * inverterSetup.ts
 *
 * This file defines the IInverterSetup interface and the CInverterSetup class,
 * which are used to manage the configuration of inverters in a solar energy system.
 * The IInverterSetup interface specifies properties such as a unique identifier,
 * an optional reference to a monophase inverter, and an array of MPPT setups.
 * It also declares methods to calculate key electrical parameters for the inverter setup,
 * including peak power, peak voltage, startup voltage, and inverter usage ratio.
 * The CInverterSetup class implements IInverterSetup, providing logic to aggregate
 * or select the appropriate values from its associated MPPT setups for each calculation.
 * The static of method allows for convenient instantiation of CInverterSetup objects
 * with a given inverter and MPPT setup array.
 */

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
