import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { type ISolarArray, CSolarArray } from '@/models/solar_arrays/solarArray.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'


export const useSolarArraysStore = defineStore('solar_arrays', () => {
  const projectInfoStore = useProjectInfoStore()

  const arrays = ref<ISolarArray[]>([])

  const totalNumberOfPanels = computed(() => {
    return arrays.value.reduce((total, array) => total + array.array.panelNumber, 0)
  })

  const addSolarArray = () => {
    arrays.value.push(new CSolarArray())
  }

  const deleteSolarArray = (index: number) => {
    arrays.value.splice(index, 1)
  }

  const pvgisProductionPerMonth = computed(() => {
    const monthlyProduction = Array(12).fill(0)

    arrays.value.forEach((array) => {
      if (array.pvgisData?.response?.monthly) {
        array.pvgisData.response.monthly.forEach((monthData) => {
          monthlyProduction[monthData.month - 1] += monthData.E_m
        })
      }
    })

    return monthlyProduction
  })

  watch(
    () => projectInfoStore.projectInfo.location,
    () => {
      arrays.value.forEach((array) => {
        array.isDirty = true
      })
    },
    { deep: true }
  )

  return { arrays, totalNumberOfPanels, addSolarArray, deleteSolarArray, pvgisProductionPerMonth }
})
