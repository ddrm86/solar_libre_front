/**
 * solarArray.ts
 *
 * This file defines the ISolarArray interface and the CSolarArray class,
 * which are used to represent and manage a solar array within the application.
 * The ISolarArray interface specifies properties such as a unique identifier,
 * the array configuration, optional PVGIS data, a dirty state flag, and a method
 * to fetch PVGIS data using project information.
 *
 * The CSolarArray class implements ISolarArray, initializing the array data
 * and providing logic to fetch and update PVGIS data based on the project's
 * geographic location and the array's electrical characteristics.
 * The fetchPvgisData method constructs a PVGIS request using the project's
 * latitude, longitude, array peak power, system loss, tilt angle, and azimuth,
 * then updates the PVGIS data and the dirty state accordingly.
 */

import { CSolarArrayData, type ISolarArrayData } from '@/models/solar_arrays/solarArrayData.ts'
import { CPvgis, type IPvgis } from '@/models/solar_arrays/pvgis.ts'
import type { IPanel } from '@/models/inventory/panel.ts'
import type { IProjectInfo } from '@/models/project_info/projectInfo.ts'

export interface ISolarArray {
  id: string
  array: ISolarArrayData
  pvgisData?: IPvgis
  isDirty: boolean

  fetchPvgisData: (projectInfo: IProjectInfo) => void
}

export class CSolarArray implements ISolarArray {
  id: string = crypto.randomUUID()
  array: ISolarArrayData
  pvgisData?: IPvgis
  isDirty: boolean

  constructor(arrayData?: ISolarArrayData) {
    if (!arrayData) {
      this.array = new CSolarArrayData({} as IPanel, 0, 14, 35, 0)
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

    this.pvgisData = new CPvgis(pvgisRequest)
    this.pvgisData.fetch().then(() => {
      this.isDirty = !this.pvgisData ? true : this.pvgisData.error
    })
  }
}
