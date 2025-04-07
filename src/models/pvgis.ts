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

export interface PvgisResponse {
  database: string;

  monthly: [{
    month: number;
    Ed: number;
    Em: number;
  }];

  yearly: {
    Ed: number;
    Em: number;
    Ey: number;
  };
}
