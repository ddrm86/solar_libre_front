import axios, { AxiosError } from 'axios'

/**
 * Data model for PVGIS request parameters.
 *
 * Attributes:
 *   latitude (number): Latitude of the location.
 *   longitude (number): Longitude of the location.
 *   peakPower (number): Peak power of the solar panel system in kW.
 *   loss (number): System losses in percentage.
 *   angle (number): Tilt angle of the solar panels.
 *   azimuth (number): Azimuth angle of the solar panels (0 = S, 90 = W, -90 = E).
 */
export interface IPvgisRequest {
  latitude: number
  longitude: number
  peakPower: number
  loss: number
  angle: number
  azimuth: number
}

/**
 * Data model for PVGIS response parameters.
 *
 * Attributes:
 *   database (string): The database used for the calculations.
 *   monthly (Array): Array of monthly data containing energy production and irradiation details.
 *     - month (number): The month of the year (1-12).
 *     - E_d (number): Average daily energy production from the system (kWh/d).
 *     - E_m (number): Average monthly energy production from the system (kWh/mo).
 *     - H(i)_d (number): Average daily sum of global irradiation per square meter received by the modules (kWh/m²/d).
 *     - H(i)_m (number): Average monthly sum of global irradiation per square meter received by the modules (kWh/m²/mo).
 *     - SD_m (number): Standard deviation of the monthly energy production due to year-to-year variation (kWh).
 *   totals (Object): Total energy production and irradiation details.
 *     - E_d (number): Average daily energy production from the system (kWh/d).
 *     - E_m (number): Average monthly energy production from the system (kWh/mo).
 *     - E_y (number): Average annual energy production from the system (kWh/y).
 *     - H(i)_d (number): Average daily sum of global irradiation per square meter received by the modules (kWh/m²/d).
 *     - H(i)_m (number): Average monthly sum of global irradiation per square meter received by the modules (kWh/m²/mo).
 *     - H(i)_y (number): Average annual sum of global irradiation per square meter received by the modules (kWh/m²/y).
 *     - SD_m (number): Standard deviation of the monthly energy production due to year-to-year variation (kWh).
 *     - SD_y (number): Standard deviation of the annual energy production due to year-to-year variation (kWh).
 *     - l_aoi (number): Angle of incidence loss (%).
 *     - l_spec (string): Spectral loss (%).
 *     - l_tg (number): Temperature and irradiance loss (%).
 *     - l_total (number): Total loss (%).
 */
export interface IPvgisResponse {
  database: string

  monthly: [
    {
      month: number
      E_d: number
      E_m: number
    },
  ]

  totals: {
    E_d: number
    E_m: number
    E_y: number
    Hi_d: number
    Hi_m: number
    Hi_y: number
    SD_m: number
    SD_y: number
    l_aoi: number
    l_spec: number
    l_tg: number
    l_total: number
  }
}

export interface IPvgis {
  request: IPvgisRequest
  response?: IPvgisResponse
  error: boolean
  errorDetails?: AxiosError

  fetch: () => Promise<void>
}

export class CPvgis implements IPvgis {
  request: IPvgisRequest
  response?: IPvgisResponse
  fetching = false
  error = false
  errorDetails?: AxiosError

  constructor(request: IPvgisRequest) {
    this.request = request
  }

  async fetch () {
    this.fetching = true
    return axios
      .get('/pvgis', {
        params: {
          latitude: this.request.latitude,
          longitude: this.request.longitude,
          peak_power: this.request.peakPower,
          loss: this.request.loss,
          angle: this.request.angle,
          azimuth: this.request.azimuth,
        },
      })
      .then((apiResponse) => {
        this.error = false
        this.response = CPvgis.readPvgisResponse(apiResponse.data);
      })
      .catch((errorResponse) => {
        this.error = true
        this.errorDetails = errorResponse
      })
      .finally(() => {
        this.fetching = false
      })
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  private static readPvgisResponse(apiResponse: any) : IPvgisResponse {
    return {
      database: apiResponse.inputs.meteo_data.radiation_db,
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      monthly: apiResponse.outputs.monthly.fixed.map((monthData: any) => ({
        month: monthData.month,
        E_d: monthData.E_d,
        E_m: monthData.E_m,
      })),
      totals: {
        E_d: apiResponse.outputs.totals.fixed.E_d,
        E_m: apiResponse.outputs.totals.fixed.E_m,
        E_y: apiResponse.outputs.totals.fixed.E_y,
        Hi_d: apiResponse.outputs.totals.fixed['H(i)_d'],
        Hi_m: apiResponse.outputs.totals.fixed['H(i)_m'],
        Hi_y: apiResponse.outputs.totals.fixed['H(i)_y'],
        SD_m: apiResponse.outputs.totals.fixed.SD_m,
        SD_y: apiResponse.outputs.totals.fixed.SD_y,
        l_aoi: apiResponse.outputs.totals.fixed.l_aoi,
        l_spec: parseFloat(apiResponse.outputs.totals.fixed.l_spec),
        l_tg: apiResponse.outputs.totals.fixed.l_tg,
        l_total: apiResponse.outputs.totals.fixed.l_total,
      },
    }
  }
}
