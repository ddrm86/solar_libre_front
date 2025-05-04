import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { type ISolarArray, CSolarArray } from '@/models/solar_arrays/solarArray.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'


export const useSolarArraysStore = defineStore('solar_arrays', () => {
  const projectInfoStore = useProjectInfoStore()

  const arrays = ref<ISolarArray[]>([])

  const addSolarArray = () => {
    arrays.value.push(new CSolarArray())
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
