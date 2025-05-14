export interface IConsumptionByTimeBand {
  peak: number,
  flat: number,
  valley: number,
}

export interface IYearlyConsumption {
  january: IConsumptionByTimeBand,
  february: IConsumptionByTimeBand,
  march: IConsumptionByTimeBand,
  april: IConsumptionByTimeBand,
  may: IConsumptionByTimeBand,
  june: IConsumptionByTimeBand,
  july: IConsumptionByTimeBand,
  august: IConsumptionByTimeBand,
  september: IConsumptionByTimeBand,
  october: IConsumptionByTimeBand,
  november: IConsumptionByTimeBand,
  december: IConsumptionByTimeBand,

  calcTotalConsumptionByTimeBand: () => IConsumptionByTimeBand,
  calcTotalConsumption: () => number,
}

export class CYearlyConsumption implements IYearlyConsumption {
  january = { peak: 0, flat: 0, valley: 0 };
  february = { peak: 0, flat: 0, valley: 0 };
  march = { peak: 0, flat: 0, valley: 0 };
  april = { peak: 0, flat: 0, valley: 0 };
  may = { peak: 0, flat: 0, valley: 0 };
  june = { peak: 0, flat: 0, valley: 0 };
  july = { peak: 0, flat: 0, valley: 0 };
  august = { peak: 0, flat: 0, valley: 0 };
  september = { peak: 0, flat: 0, valley: 0 };
  october = { peak: 0, flat: 0, valley: 0 };
  november = { peak: 0, flat: 0, valley: 0 };
  december = { peak: 0, flat: 0, valley: 0 };

  calcTotalConsumptionByTimeBand(): IConsumptionByTimeBand {
    const results = { peak: 0, flat: 0, valley: 0 }
    Object.keys(this).forEach((month) => {
      const monthConsumpPerBand = this[month as keyof CYearlyConsumption] as IConsumptionByTimeBand;
      results.peak += monthConsumpPerBand.peak
      results.flat += monthConsumpPerBand.flat
      results.valley += monthConsumpPerBand.valley
    });
    return results
  }

  calcTotalConsumption(): number {
    const totalPerTimeBand = this.calcTotalConsumptionByTimeBand()
    return totalPerTimeBand.peak + totalPerTimeBand.flat + totalPerTimeBand.valley
  }
}
