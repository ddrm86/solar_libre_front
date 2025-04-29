import { SolarArrayData, type SolarArrayDataModel } from '@/models/solarArrayData.ts'
import { Pvgis, type PvgisInterface } from '@/models/pvgis.ts'
import type { Panel } from '@/models/panel.ts'
import type { ProjectInfo } from '@/models/project_info/projectInfo.ts'

export interface SolarArrayModel {
  array: SolarArrayDataModel
  pvgisData?: PvgisInterface
  isDirty: boolean

  fetchPvgisData: (projectInfo: ProjectInfo) => void
}

export class SolarArray implements SolarArrayModel {
  array: SolarArrayData
  pvgisData?: Pvgis
  isDirty: boolean

  constructor(arrayData?: SolarArrayData) {
    if (!arrayData) {
      this.array = new SolarArrayData({} as Panel, 0, 14, 35, 0)
    } else {
      this.array = arrayData
    }
    this.isDirty = true
  }

  fetchPvgisData(projectInfo: ProjectInfo): void {
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
