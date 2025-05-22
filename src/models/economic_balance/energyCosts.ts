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
