import { defineStore } from 'pinia'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { ref } from 'vue'
import { AxiosError } from 'axios'

export const useProjectLoadingStore = defineStore('project_loading', () => {
  const projectInfoStore = useProjectInfoStore()

  const loading = ref(false)

  const loadedProjectId = ref<string | null>(null)

  const error = ref(false)

  const errorDetails = ref<AxiosError>()

  const loadProject = async (projectId: string) => {
    loading.value = true
    error.value = false
    errorDetails.value = undefined
    try {
      await projectInfoStore.loadProjectInfo(projectId)
      loadedProjectId.value = projectId
    } catch (loadingError) {
      error.value = true
      errorDetails.value = loadingError as AxiosError
    } finally {
      loading.value = false
    }
  }

  return { loadProject, loadedProjectId, loading, error, errorDetails }
})
