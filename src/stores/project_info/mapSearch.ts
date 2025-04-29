import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapSearchStore =
  defineStore('mapSearch', () => {
  const zoom = ref<number>(15)

  return { zoom }
})
