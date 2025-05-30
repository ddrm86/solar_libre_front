import { defineStore } from 'pinia'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { useInputConsumptionStore } from '@/stores/inputConsumption.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { usePanelsStore } from '@/stores/inventory/panels.ts'
import { useMonophaseInvertersStore } from '@/stores/inventory/monophaseInverters.ts'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'

export const useProjectLoadingStore = defineStore('project_loading', () => {
  const panelsStore = usePanelsStore()
  const monophaseInvertersStore = useMonophaseInvertersStore()
  const projectInfoStore = useProjectInfoStore()
  const inputConsumptionStore = useInputConsumptionStore()
  const solarArraysStore = useSolarArraysStore()
  const invertersSetupStore = useInvertersSetupStore()

  const loading = ref(false)

  const loadedProjectId = ref<string | null>(null)

  const error = ref(false)

  const errorDetails = ref<AxiosError>()

  const loadProject = async (projectId: string) => {
    loading.value = true
    error.value = false
    errorDetails.value = undefined
    try {
      Promise.all([panelsStore.fetchPanels(), monophaseInvertersStore.fetchMonophaseInverters()]).then(async () => {
        await projectInfoStore.loadProjectInfo(projectId).then(async () => {
          loadedProjectId.value = projectId
          await inputConsumptionStore.loadConsumptionInfo()
          await solarArraysStore.loadSolarArraysInfo()
          await invertersSetupStore.loadInvertersInfo()
        })
      })
    } catch (loadingError) {
      error.value = true
      errorDetails.value = loadingError as AxiosError
    } finally {
      loading.value = false
    }
  }

  return { loadProject, loadedProjectId, loading, error, errorDetails }
})
