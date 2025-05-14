export interface IConsumptionByTimeBand {
  peak: number
  flat: number
  valley: number
}

export interface IYearlyConsumption {
  consumptionsPerMonth: [IConsumptionByTimeBand]

  calcTotalConsumptionByTimeBand: () => IConsumptionByTimeBand
  calcTotalConsumption: () => number
  setConsumptionByMonthAndTimeBand: (
    monthIndex: number,
    timeBand: keyof IConsumptionByTimeBand,
    value: number,
  ) => void
}

export class CYearlyConsumption implements IYearlyConsumption {
  consumptionsPerMonth: [IConsumptionByTimeBand]

  constructor() {
    this.consumptionsPerMonth = Array.from({ length: 12 }, () => ({
      peak: 0,
      flat: 0,
      valley: 0,
    })) as [IConsumptionByTimeBand]
  }

  setConsumptionByMonthAndTimeBand(
    monthIndex: number,
    timeBand: keyof IConsumptionByTimeBand,
    value: number,
  ): void {
    if (monthIndex >= 0 && monthIndex < 12 && value >= 0) {
      this.consumptionsPerMonth[monthIndex][timeBand] = value
    } else {
      throw new Error('Índice de mes o valor inválido')
    }
  }

  calcTotalConsumptionByTimeBand(): IConsumptionByTimeBand {
    const results = { peak: 0, flat: 0, valley: 0 }
    this.consumptionsPerMonth.forEach((monthConsumpPerBand) => {
      results.peak += monthConsumpPerBand.peak
      results.flat += monthConsumpPerBand.flat
      results.valley += monthConsumpPerBand.valley
    })
    return results
  }

  calcTotalConsumption(): number {
    const totalPerTimeBand = this.calcTotalConsumptionByTimeBand()
    return totalPerTimeBand.peak + totalPerTimeBand.flat + totalPerTimeBand.valley
  }
}
