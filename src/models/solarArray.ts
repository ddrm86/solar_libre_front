import type { Panel } from '@/models/panel.ts'

export interface SolarArrayModel {
  id?: string
  panel: Panel
  panelNumber: number
  loss: number
  angle: number
  azimuth: number

  calcPeakPowerKw: () => number
}

export class SolarArray implements SolarArrayModel {
  id?: string
  panel: Panel
  panelNumber: number
  loss: number
  angle: number
  azimuth: number

  constructor(
    panel: Panel,
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
