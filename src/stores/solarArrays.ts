import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { type ISolarArray, CSolarArray } from '@/models/solar_arrays/solarArray.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import axios from 'axios'
import { usePanelsStore } from '@/stores/inventory/panels.ts'
import type { IPanel } from '@/models/inventory/panel.ts'
import { CSolarArrayData } from '@/models/solar_arrays/solarArrayData.ts'

export const useSolarArraysStore = defineStore('solar_arrays', () => {
  const projectInfoStore = useProjectInfoStore()
  const panelsStore = usePanelsStore()

  const arrays = ref<ISolarArray[]>([])

  const totalNumberOfPanels = computed(() => {
    return arrays.value.reduce((total, array) => total + array.array.panelNumber, 0)
  })

  const totalPower = computed(() => {
    return arrays.value.reduce((total, array) => {
      return total + array.array.panel.nominal_power * array.array.panelNumber
    }, 0)
  })

  const isDirty = computed(() => {
    return arrays.value.some((array) => array.isDirty)
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

  const pvgisAnnualProduction = computed(() => {
    return pvgisProductionPerMonth.value.reduce(
      (total, monthlyProduction) => total + monthlyProduction,
      0,
    )
  })

  const createSolarArraysPayload = (arrays: ISolarArray[]) => {
    return arrays
      .map((array) => ({
        angle: array.array.angle,
        azimuth: array.array.azimuth,
        loss: array.array.loss,
        panel_number: array.array.panelNumber,
        is_dirty: array.isDirty,
        panel: array.array.panel?.id ?? null,
        project_id: projectInfoStore.projectInfo.id,
      }))
  }

  const saveSolarArraysInfo = async () => {
    const payload = createSolarArraysPayload(arrays.value)

    return axios
      .post(`/solar_arrays/?project_id=${projectInfoStore.projectInfo.id}`, payload)
      .then(() => {})
  }

  const loadSolarArraysInfo = async () => {
    interface IApiSolarArray {
      angle: number
      azimuth: number
      loss: number
      panel_number: number
      is_dirty: boolean
      panel: string | null
      project_id: string
      id: string
    }

    return axios
      .get(`/solar_arrays/project/${projectInfoStore.projectInfo.id}`)
      .then((response) => {
        const solarArraysData = response.data
        arrays.value = solarArraysData.map((entry: IApiSolarArray) => {
          const panel = entry.panel
            ? (panelsStore.panels.find((p) => p.id === entry.panel) ?? ({} as IPanel))
            : ({} as IPanel)
          const solarArray = new CSolarArray(
            new CSolarArrayData(panel, entry.panel_number, entry.loss, entry.angle, entry.azimuth),
          )
          solarArray.id = entry.id
          solarArray.isDirty = entry.is_dirty
          return solarArray
        })
      })
  }

  watch(
    () => projectInfoStore.projectInfo.location,
    () => {
      arrays.value.forEach((array) => {
        array.isDirty = true
      })
    },
    { deep: true },
  )

  return {
    arrays,
    totalNumberOfPanels,
    totalPower,
    isDirty,
    addSolarArray,
    deleteSolarArray,
    pvgisProductionPerMonth,
    pvgisAnnualProduction,
    saveSolarArraysInfo,
    loadSolarArraysInfo,
  }
})
