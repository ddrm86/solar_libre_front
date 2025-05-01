import { SolarArrayData, type ISolarArrayData } from '@/models/solar_arrays/solarArrayData.ts'
import { Pvgis, type IPvgis } from '@/models/solar_arrays/pvgis.ts'
import type { IPanel } from '@/models/inventory/panel.ts'
import type { IProjectInfo } from '@/models/project_info/projectInfo.ts'

export interface ISolarArray {
  array: ISolarArrayData
  pvgisData?: IPvgis
  isDirty: boolean

  fetchPvgisData: (projectInfo: IProjectInfo) => void
}

export class SolarArray implements ISolarArray {
  array: ISolarArrayData
  pvgisData?: IPvgis
  isDirty: boolean

  constructor(arrayData?: ISolarArrayData) {
    if (!arrayData) {
      this.array = new SolarArrayData({} as IPanel, 0, 14, 35, 0)
    } else {
      this.array = arrayData
    }
    this.isDirty = true
  }

  fetchPvgisData(projectInfo: IProjectInfo): void {
    const pvgisRequest = {
      latitude: projectInfo.location.latitude,
      longitude: projectInfo.location.longitude,
      peakPower: this.array.calcPeakPowerKw(),
      loss: this.array.loss,
      angle: this.array.angle,
      azimuth: this.array.azimuth,
    }

    this.pvgisData = new Pvgis(pvgisRequest)
    this.pvgisData.fetch().then(() => {
      this.isDirty = !this.pvgisData ? true : this.pvgisData.error
    })
  }
}
