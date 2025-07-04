/**
 * invertersSetup.ts
 *
 * This file defines a Pinia store for managing inverter setups
 * within the application. The store maintains a reactive array
 * of inverter setups, each containing references to a monophase
 * inverter and its associated MPPT and string configurations.
 *
 * The store provides computed properties to determine available
 * solar arrays and the number of unassigned panels, ensuring
 * that panel allocation across inverters is tracked accurately.
 *
 * Methods are included to add, update, and delete inverter setups,
 * as well as to save and load inverter, MPPT, and string setup
 * information from the backend. The store also handles resetting
 * string configurations when the associated solar array's panel
 * model or panel count changes.
 */

import { defineStore } from 'pinia'
import { CInverterSetup, type IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { computed, ref, watch } from 'vue'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { CStringSetup, type IStringSetup } from '@/models/inverters_setup/stringSetup.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import axios from 'axios'
import { useMonophaseInvertersStore } from '@/stores/inventory/monophaseInverters.ts'
import { CMpptSetup, type IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'

export const useInvertersSetupStore = defineStore('inverters_setup', () => {
  const monophaseInvertersStore = useMonophaseInvertersStore()
  const projectInfoStore = useProjectInfoStore()
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

  const createStringPayload = (stringSetups: IStringSetup[], mpptSetupId: string) => {
    return stringSetups.map((stringSetup) => ({
      mppt_setup_id: mpptSetupId,
      panel_number: stringSetup.panelNumber ?? null,
      solar_array: stringSetup.solarArray?.id ?? null,
    }))
  }

  const saveStringSetups = async (mpptSetupId: string, stringSetups: IStringSetup[]) => {
    const payload = createStringPayload(stringSetups, mpptSetupId)

    return axios
      .post(`/string_setups/?mppt_setup_id=${mpptSetupId}`, payload)
      .then((response) => {
        const ids = response.data
        if (Array.isArray(ids)) {
          ids.forEach((item: { id: string }, idx: number) => {
            if (stringSetups[idx]) {
              stringSetups[idx].id = item.id
            }
          })
        }
      })
  }

  const loadStringSetups = async (mpptSetupId: string) => {
    interface IApiStringSetup {
      id: string
      solar_array: string | null
      panel_number: number | null
      mppt_setup_id: string
    }

    const solarArraysStore = useSolarArraysStore()

    return axios
      .get(`/string_setups/mppt_setup/${mpptSetupId}`)
      .then((response) => {
        const stringSetupsData = response.data
        return stringSetupsData.map((entry: IApiStringSetup) => {
          const solarArray = entry.solar_array
            ? (solarArraysStore.arrays.find((array) => array.id === entry.solar_array) ?? ({} as ISolarArray))
            : ({} as ISolarArray)

          const stringSetup = CStringSetup.of(solarArray, entry.panel_number ?? 0)
          stringSetup.id = entry.id
          return stringSetup
        })
      })
  }

  const createMpptPayload = (mpptSetups: IMpptSetup[], inverterSetupId: string) => {
    return mpptSetups.map(() => ({
      inverter_setup_id: inverterSetupId,
    }))
  }

  const saveMpptSetups = async (inverterSetupId: string, mpptSetups: IMpptSetup[]) => {
    const payload = createMpptPayload(mpptSetups, inverterSetupId)

    return axios
      .post(`/mppt_setups/?inverter_setup_id=${inverterSetupId}`, payload)
      .then(async (response) => {
        const ids = response.data
        if (Array.isArray(ids)) {
          for (const [idx, item] of ids.entries()) {
            if (mpptSetups[idx]) {
              mpptSetups[idx].id = item.id
              await saveStringSetups(item.id, mpptSetups[idx].strings)
            }
          }
        }
      })
  }

  const loadMpptSetups = async (inverterSetupId: string) => {
    interface IApiMpptSetup {
      id: string
      inverter_setup_id: string
    }

    return axios
      .get(`/mppt_setups/inverter_setup/${inverterSetupId}`)
      .then(async (response) => {
        const mpptSetupsData = response.data
        return await Promise.all(
          mpptSetupsData.map(async (entry: IApiMpptSetup) => {
            const mpptSetup = new CMpptSetup([])
            mpptSetup.id = entry.id

            mpptSetup.strings = await loadStringSetups(entry.id)
            return mpptSetup
          }),
        )
      })
  }

  const createInvertersPayload = (inverters: IInverterSetup[]) => {
    return inverters.map((inverter) => ({
      inverter: inverter.inverter?.id ?? null,
      project_id: projectInfoStore.projectInfo.id,
    }))
  }

  const saveInvertersInfo = async () => {
    const payload = createInvertersPayload(inverters.value)

    return axios
      .post(`/inverter_setups/?project_id=${projectInfoStore.projectInfo.id}`, payload)
      .then(async (response) => {
        const ids = response.data
        if (Array.isArray(ids)) {
          for (const item of ids) {
            const idx: number = ids.indexOf(item)
            if (inverters.value[idx]) {
              inverters.value[idx].id = item.id
              await saveMpptSetups(item.id, inverters.value[idx].setup)
            }
          }
        }
      })
  }

  const loadInvertersInfo = async () => {
    interface IApiInverterSetup {
      id: string
      inverter: string | null
      project_id: string
    }

    return axios
      .get(`/inverter_setups/project/${projectInfoStore.projectInfo.id}`)
      .then(async (response) => {
        const invertersData = response.data
        inverters.value = await Promise.all(
          invertersData.map(async (entry: IApiInverterSetup) => {
            const inverter = entry.inverter
              ? (monophaseInvertersStore.monophaseInverters.find((i) => i.id === entry.inverter) ??
                ({} as IMonophaseInverter))
              : ({} as IMonophaseInverter)

            const inverterSetup = CInverterSetup.of(inverter, [])
            inverterSetup.id = entry.id

            inverterSetup.setup = await loadMpptSetups(entry.id)
            return inverterSetup
          }),
        )
      })
  }

  /**
   * If the panel model in a solar array is changed or the number of panels is reduced,
   * the strings associated with that array are reset
   */
  watch(
    () =>
      solarArraysStore.arrays.map((array) => ({
        id: array.id,
        panelId: array.array.panel?.id,
        panelNumber: array.array.panelNumber,
      })),
    (newArrays, oldArrays) => {
      newArrays.forEach((newArray, index) => {
        const oldArray = oldArrays[index]

        if (oldArray) {
          if (
            newArray.panelId !== oldArray.panelId ||
            newArray.panelNumber < oldArray.panelNumber
          ) {
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
    saveInvertersInfo,
    loadInvertersInfo,
  }
})
