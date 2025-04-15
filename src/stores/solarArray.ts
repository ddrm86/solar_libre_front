import { defineStore } from 'pinia'
import { SolarArray } from '@/models/solarArray.ts'
import { ref } from 'vue'
import { Pvgis, type PvgisRequest } from '@/models/pvgis.ts'
import type { Panel } from '@/models/panel.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'

export const useSolarArrayStore = defineStore('solar_array', () => {
  const projectInfoStore = useProjectInfoStore()

  const solarArray = ref<SolarArray>(
    new SolarArray({} as Panel, 0, 0, 0, 0)
  )

  const pvgisData = ref<Pvgis | null>(null)

  function fetchPvgisData() {
    const pvgisRequest: PvgisRequest = {
      latitude: projectInfoStore.projectInfo.location.latitude,
      longitude: projectInfoStore.projectInfo.location.longitude,
      peakPower: solarArray.value.calcPeakPowerKw(),
      loss: solarArray.value.loss,
      angle: solarArray.value.angle,
      azimuth: solarArray.value.azimuth,
    }
    pvgisData.value = new Pvgis(pvgisRequest)
    pvgisData.value.fetch()
  }

  return { solarArray, pvgisData, fetchPvgisData }
})
