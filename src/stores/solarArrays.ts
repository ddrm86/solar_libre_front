import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { SolarArray } from '@/models/solar_arrays/solarArray.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'


export const useSolarArraysStore = defineStore('solar_arrays', () => {
  const projectInfoStore = useProjectInfoStore()

  const arrays = ref<SolarArray[]>([])

  const addSolarArray = () => {
    arrays.value.push(new SolarArray())
  }

  const deleteSolarArray = (index: number) => {
    arrays.value.splice(index, 1)
  }

  watch(
    () => projectInfoStore.projectInfo.location,
    () => {
      arrays.value.forEach((array) => {
        array.isDirty = true
      })
    },
    { deep: true }
  )

  return { arrays, addSolarArray, deleteSolarArray }
})
