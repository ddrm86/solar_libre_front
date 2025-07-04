/**
 * location.ts
 *
 * This file defines the ILocation interface, which represents a geographic location
 * with properties for latitude, longitude, and address.
 * The latitude and longitude fields specify the geographic coordinates,
 * while the address field provides a human-readable description of the location.
 */

export interface ILocation {
  latitude: number;
  longitude: number;
  address: string;
}
