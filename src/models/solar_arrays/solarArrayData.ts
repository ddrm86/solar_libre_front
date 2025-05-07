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
