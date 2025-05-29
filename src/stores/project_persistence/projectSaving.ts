import { defineStore } from 'pinia'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { computed, ref } from 'vue'
import { AxiosError } from 'axios'
import { useInputConsumptionStore } from '@/stores/inputConsumption.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'

export const useProjectSavingStore = defineStore('project_saving', () => {
  const projectInfoStore = useProjectInfoStore()
  const inputConsumptionStore = useInputConsumptionStore()
  const solarArraysStore = useSolarArraysStore()

  const saving = ref(false);

  const error = ref(false);

  const errorDetails = ref<AxiosError>();

  const isNewProject = computed (() => {
    return !projectInfoStore.projectInfo.id
  })

  const saveProject = async () => {
    saving.value = true
    error.value = false
    errorDetails.value = undefined
    try {
      await projectInfoStore.saveProjectInfo()
      await inputConsumptionStore.saveConsumptionInfo()
      await solarArraysStore.saveSolarArraysInfo()
    } catch (savingError) {
      error.value = true
      errorDetails.value = savingError as AxiosError
    } finally {
      saving.value = false
    }
  }

  return { saveProject, isNewProject, saving, error, errorDetails }
})
