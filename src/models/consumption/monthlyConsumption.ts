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
}
