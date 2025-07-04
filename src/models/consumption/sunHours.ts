/**
 * sunHours.ts
 *
 * This file defines interfaces and classes for managing sunrise and sunset times based on geographic
 * coordinates and dates.
 * The ISunHours interface represents sunrise and sunset times for a specific day.
 * The CSunHours class implements ISunHours and provides a static method to fetch sunrise and sunset
 * times from an external API.
 * The IYearlySunHours interface represents an array of monthly sun hours and a method to fetch sun
 * hours for each month of the year.
 * The CYearlySunHours class implements IYearlySunHours, storing sun hours for each month and
 * providing a method to fetch and update this data.
 */
import axios from 'axios'

export interface ISunHours {
  sunrise: Date,
  sunset: Date,
}

export class CSunHours implements ISunHours {
  sunrise: Date
  sunset: Date

  constructor(sunrise: Date, sunset: Date) {
    this.sunrise = sunrise
    this.sunset = sunset
  }

  static async fetchSunHours(latitude: number, longitude: number, date: Date): Promise<ISunHours> {
    const apiUrl = 'https://api.sunrisesunset.io/json'

    const dateStr = date.toISOString().split('T')[0]
    return axios
      .get(apiUrl, {
        params: {
          lat: latitude,
          lng: longitude,
          date: dateStr,
          time_format: 24,
        },
      })
      .then((response) => {
        const { sunrise, sunset } = response.data.results
        return new CSunHours(new Date(`${dateStr}T${sunrise}`), new Date(`${dateStr}T${sunset}`))
      })
  }
}

export interface IYearlySunHours {
  sunHoursPerMonth: ISunHours[]
  fetchYearlySunHours(latitude: number, longitude: number): Promise<void>
}

export class CYearlySunHours implements IYearlySunHours {
  sunHoursPerMonth: ISunHours[]

  constructor() {
    this.sunHoursPerMonth = Array.from({ length: 12 }, () => ({
      sunrise: new Date(),
      sunset: new Date(),
    }))
  }

  async fetchYearlySunHours(latitude: number, longitude: number): Promise<void> {
    const promises = this.sunHoursPerMonth.map((_, monthIndex) => {
      const date = new Date()
      date.setMonth(monthIndex, 1)
      return CSunHours.fetchSunHours(latitude, longitude, date)
    })

    this.sunHoursPerMonth = await Promise.all(promises)
  }
}
