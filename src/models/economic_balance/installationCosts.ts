/**
 * installationCosts.ts
 *
 * This file defines an interface and a class for managing installation cost data,
 * including the initial installation cost and the annual maintenance cost.
 * The IInstallationCosts interface specifies the structure for these cost properties.
 * The CInstallationCosts class implements IInstallationCosts, providing default values
 * for the initial cost and annual maintenance cost, and a constructor to initialize them.
 */

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
