/**
 * solarArrayData.ts
 *
 * This file defines the ISolarArrayData interface and the CSolarArrayData class,
 * which are used to represent and manage the configuration of a solar array
 * within the application. The ISolarArrayData interface specifies properties
 * such as an optional unique identifier, the panel type, the number of panels,
 * system loss, tilt angle, and azimuth orientation.
 *
 * The CSolarArrayData class implements ISolarArrayData, providing a constructor
 * to initialize all required properties for a solar array. It also includes
 * the calcPeakPowerKw method, which calculates the total peak power of the array
 * in kilowatts.
 */

import type { IPanel } from '@/models/inventory/panel.ts'

export interface ISolarArrayData {
  id?: string
  panel: IPanel
  panelNumber: number
  loss: number
  angle: number
  azimuth: number

  calcPeakPowerKw: () => number
}

export class CSolarArrayData implements ISolarArrayData {
  id?: string
  panel: IPanel
  panelNumber: number
  loss: number
  angle: number
  azimuth: number

  constructor(
    panel: IPanel,
    panelNumber: number,
    loss: number,
    angle: number,
    azimuth: number,
  ) {
    this.panel = panel
    this.panelNumber = panelNumber
    this.loss = loss
    this.angle = angle
    this.azimuth = azimuth
  }

  calcPeakPowerKw(): number {
    return (this.panel.nominal_power * this.panelNumber) / 1000
  }
}
