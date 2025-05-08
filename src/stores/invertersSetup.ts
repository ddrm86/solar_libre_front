import { defineStore } from 'pinia'
import { CInverterSetup, type IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { computed, ref, watch } from 'vue'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { CStringSetup } from '@/models/inverters_setup/stringSetup.ts'

export const useInvertersSetupStore = defineStore('inverters_setup', () => {
  const solarArraysStore = useSolarArraysStore()

  const inverters = ref<IInverterSetup[]>([])

  const availableSetups = computed(() => {
    const solarArrays = solarArraysStore.arrays
    const panelUsage: Record<string, number> = {}

    // Contar paneles asignados en los inversores
    inverters.value.forEach((inverter) => {
      inverter.setup.forEach((mppt) => {
        mppt.strings.forEach((stringSetup) => {
          if (stringSetup.solarArray) {
            const arrayId = stringSetup.solarArray.id
            panelUsage[arrayId] = (panelUsage[arrayId] || 0) + (stringSetup.panelNumber ?? 0)
          }
        })
      })
    })

    // Calcular paneles restantes
    return solarArrays
      .map((array) => {
        const usedPanels = panelUsage[array.id] || 0
        const maxPanels = array.array.panelNumber - usedPanels
        return { array, maxPanels }
      })
      .filter((entry) => entry.maxPanels > 0)
  })

  const numberOfAvailablePanels = computed(() => {
    return availableSetups.value.reduce((total, setup) => total + setup.maxPanels, 0)
  })

  const addInverterSetup = () => {
    inverters.value.push(CInverterSetup.of({} as IMonophaseInverter, []))
  }

  const updateInverterSetup = (setup: IInverterSetup, index: number) => {
    inverters.value[index] = setup
  }

  const deleteInverterSetup = (index: number) => {
    inverters.value.splice(index, 1)
  }

  /**
   * If the panel model in a solar array is changed or the number of panels is reduced,
   * the strings associated with that array are reset
   */
  watch(
    () =>
      solarArraysStore.arrays.map((array) => ({
        id: array.id,
        panelId: array.array.panel.id,
        panelNumber: array.array.panelNumber,
      })),
    (newArrays, oldArrays) => {
      newArrays.forEach((newArray, index) => {
        const oldArray = oldArrays[index]

        if (oldArray) {
          if (newArray.panelId !== oldArray.panelId || newArray.panelNumber < oldArray.panelNumber) {
            resetStringsAssociatedWithSolarArray(newArray.id)
          }
        }
      })
    },
    { deep: true },
  )

  function resetStringsAssociatedWithSolarArray(arrayId: string) {
    inverters.value.forEach((inverter) => {
      inverter.setup.forEach((mppt) => {
        mppt.strings.forEach((stringSetup, stringIndex) => {
          if (stringSetup.solarArray?.id === arrayId) {
            mppt.strings[stringIndex] = new CStringSetup()
          }
        })
      })
    })
  }

  return {
    inverters,
    availableSetups,
    numberOfAvailablePanels,
    addInverterSetup,
    updateInverterSetup,
    deleteInverterSetup,
  }
})
