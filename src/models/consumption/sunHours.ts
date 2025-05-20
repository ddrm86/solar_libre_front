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
