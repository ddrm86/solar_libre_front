import { defineStore } from 'pinia'
import { SolarArrayData } from '@/models/solarArrayData.ts'
import { ref, watch } from 'vue'
import { Pvgis, type PvgisRequest } from '@/models/pvgis.ts'
import type { Panel } from '@/models/panel.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'

export const useSolarArrayStore = defineStore('solar_array', () => {
  const projectInfoStore = useProjectInfoStore()

  const solarArray = ref<SolarArrayData>(
    new SolarArrayData({} as Panel, 0, 14, 35, 0)
  )

  const pvgisData = ref<Pvgis | null>(null)

  const isDirty = ref(false)

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

  watch([solarArray, projectInfoStore.projectInfo.location], () => {
    isDirty.value = true
  }, { deep: true })

  watch(pvgisData, () => {
    if (pvgisData.value && !pvgisData.value.fetching) {
      isDirty.value = pvgisData.value.error
    }
  }, { deep: true })

  return { solarArray, pvgisData, isDirty, fetchPvgisData }
})
