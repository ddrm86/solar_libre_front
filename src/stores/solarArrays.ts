import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SolarArray } from '@/models/solarArray.ts'

export const useSolarArraysStore = defineStore('solar_arrays', () => {
  const arrays = ref<SolarArray[]>([])

  const addSolarArray = () => {
    arrays.value.push(new SolarArray())
  }

  return { arrays, addSolarArray }
})
