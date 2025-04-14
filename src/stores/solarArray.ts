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

  const pvgisRequest = ref<PvgisRequest>({
    latitude: projectInfoStore.projectInfo.location.latitude,
    longitude: projectInfoStore.projectInfo.location.longitude,
    peakPower: solarArray.value.calcPeakPowerKw(),
    loss: solarArray.value.loss,
    angle: solarArray.value.angle,
    azimuth: solarArray.value.azimuth,
  })

  const pvgisData = ref<Pvgis>(new Pvgis(pvgisRequest.value))

  function fetchPvgisData() {
    pvgisData.value.fetch()
  }

  return { solarArray, pvgisData, fechPvgisData: fetchPvgisData }
})
