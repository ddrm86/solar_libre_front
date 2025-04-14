import type { Panel } from '@/models/panel.ts'

export interface SolarArray {
  id?: string
  panel: Panel
  panelNumber: number
  loss: number
  angle: number
  azimuth: number
}
