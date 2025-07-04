/**
 * energyCosts.ts
 *
 * This file defines interfaces and a class for managing energy cost data, including taxes and
 * costs per kWh for different time bands.
 * The IEnergyCosts interface specifies the structure for
 * energy cost properties such as IVA, electric tax, peak, flat, and valley kWh costs, total annual
 * cost, and compensation per kWh.
 * The CEnergyCosts class implements IEnergyCosts, providing default values for each property and
 * a constructor to initialize them.
 */

export interface IEnergyCosts {
  iva: number
  electricTax: number
  peakKwhCost: number
  flatKwhCost: number
  valleyKwhCost: number
  totalAnnualCost: number
  compensationPerKwh: number
}

export class CEnergyCosts implements IEnergyCosts {
  iva: number
  electricTax: number
  peakKwhCost: number
  flatKwhCost: number
  valleyKwhCost: number
  totalAnnualCost: number
  compensationPerKwh: number

  constructor() {
    this.iva = 0.21
    this.electricTax = 0.05113
    this.peakKwhCost = 0.0
    this.flatKwhCost = 0.0
    this.valleyKwhCost = 0.0
    this.totalAnnualCost = 0.0
    this.compensationPerKwh = 0.09
  }
}
