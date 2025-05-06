import { defineStore } from 'pinia'
import { CInverterSetup, type IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { computed, ref } from 'vue'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'

export const useInvertersSetupStore = defineStore('inverters_setup', () => {
  const solarArraysStore = useSolarArraysStore()

  const availableSetups = computed(() => {
    const solarArrays = solarArraysStore.arrays
    const panelUsage: Record<string, number> = {}

    // Contar paneles asignados en los inversores
    inverters.value.forEach(inverter => {
      inverter.setup.forEach(mppt => {
        mppt.strings.forEach(stringSetup => {
          if (stringSetup.solarArray) {
            const arrayId = stringSetup.solarArray.id
            panelUsage[arrayId] = (panelUsage[arrayId] || 0) + (stringSetup.panelNumber ?? 0)
          }
        })
      })
    })

    // Calcular paneles restantes
    return solarArrays.map(array => {
      const usedPanels = panelUsage[array.id] || 0
      const maxPanels = array.array.panelNumber - usedPanels
      return { array, maxPanels }
    }).filter(entry => entry.maxPanels > 0)
  })

  const inverters = ref<IInverterSetup[]>([])

  const addInverterSetup = () => {
    inverters.value.push(CInverterSetup.of({} as IMonophaseInverter, []))
  }

  const updateInverterSetup = (setup: IInverterSetup, index: number) => {
    inverters.value[index] = setup
  }

  const deleteInverterSetup = (index: number) => {
    inverters.value.splice(index, 1)
  }

  return { inverters, availableSetups, addInverterSetup, updateInverterSetup, deleteInverterSetup }
})
