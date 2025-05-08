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
          // Si cambia el panel asociado
          if (newArray.panelId !== oldArray.panelId) {
            inverters.value.forEach((inverter) => {
              inverter.setup.forEach((mppt) => {
                mppt.strings.forEach((stringSetup, stringIndex) => {
                  if (stringSetup.solarArray?.id === newArray.id) {
                    mppt.strings[stringIndex] = new CStringSetup()
                  }
                })
              })
            })
          }

          // Si cambia el número de paneles y es menor que el anterior
          if (newArray.panelNumber < oldArray.panelNumber) {
            inverters.value.forEach((inverter) => {
              inverter.setup.forEach((mppt) => {
                mppt.strings.forEach((stringSetup, stringIndex) => {
                  if (stringSetup.solarArray?.id === newArray.id) {
                    mppt.strings[stringIndex] = new CStringSetup()
                  }
                })
              })
            })
          }
        }
      })
    },
    { deep: true },
  )

  return {
    inverters,
    availableSetups,
    numberOfAvailablePanels,
    addInverterSetup,
    updateInverterSetup,
    deleteInverterSetup,
  }
})
