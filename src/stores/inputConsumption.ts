import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  CYearlyConsumption,
  type IYearlyConsumption
} from '@/models/consumption/inputConsumption.ts'

export const useInputConsumptionStore = defineStore('input_consumption', () => {
  const consumption = ref<IYearlyConsumption>(new CYearlyConsumption())

  const consumptionByTimeBand = computed(() => {
    return consumption.value.calcTotalConsumptionByTimeBand()
  })

  const totalConsumption = computed(() => {
    return consumption.value.calcTotalConsumption()
  })

  return { consumption, consumptionByTimeBand, totalConsumption }
})
