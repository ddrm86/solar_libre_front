import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import {
  CYearlyConsumption,
  type IYearlyConsumption
} from '@/models/consumption/inputConsumption.ts'
import { CYearlySunHours, type IYearlySunHours } from '@/models/consumption/sunHours.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'

export const useInputConsumptionStore = defineStore('input_consumption', () => {
  const projectInfoStore = useProjectInfoStore()

  const consumption = ref<IYearlyConsumption>(new CYearlyConsumption())

  const consumptionByTimeBand = computed(() => {
    return consumption.value.calcTotalConsumptionByTimeBand()
  })

  const totalConsumption = computed(() => {
    return consumption.value.calcTotalConsumption()
  })

  const yearlySunHours = ref<IYearlySunHours>(new CYearlySunHours())

  watch(
    () => [projectInfoStore.projectInfo.location.latitude, projectInfoStore.projectInfo.location.longitude],
    ([lat, lng]) => {
      void yearlySunHours.value.fetchYearlySunHours(lat, lng)
    },
    { immediate: true }
  )

  return { consumption, consumptionByTimeBand, totalConsumption, yearlySunHours }
})
