/**
 * mapSearch.ts
 *
 * This file defines a Pinia store for managing data from the Leaflet map. The map zoom level is stored
 * so it does not go back to the default value every time the component displaying the map is mounted.
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapSearchStore =
  defineStore('mapSearch', () => {
  const zoom = ref<number>(15)

  return { zoom }
})
