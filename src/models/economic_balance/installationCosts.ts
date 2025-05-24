export interface IInstallationCosts {
  initialCost: number
  annualMaintenanceCost: number
}

export class CInstallationCosts implements IInstallationCosts {
  initialCost: number
  annualMaintenanceCost: number

  constructor() {
    this.initialCost = 0.0
    this.annualMaintenanceCost = 150.0
  }
}
