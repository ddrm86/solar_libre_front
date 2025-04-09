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
export interface PvgisRequest {
  latitude: number;
  longitude: number;
  peakPower: number;
  loss: number;
  angle: number;
  azimuth: number;
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
export interface PvgisResponse {
  database: string;

  monthly: [{
    month: number;
    E_d: number;
    E_m: number;
  }];

  totals: {
    E_d: number;
    E_m: number;
    E_y: number;
    Hi_d: number;
    Hi_m: number;
    Hi_y: number;
    SD_m: number;
    SD_y: number;
    l_aoi: number;
    l_spec: number;
    l_tg: number;
    l_total: number;
  };
}
