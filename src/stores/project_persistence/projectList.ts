import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import type { IProjectInfo } from '@/models/project_info/projectInfo.ts'

export const useProjectListStore = defineStore('project_list', () => {
  const projects = ref<IProjectInfo[]>([])
  const availableProjects = computed(() => projects.value.filter((project) => !project.deleted))
  const fetching = ref(false)
  const error = ref(false)
  const errorDetails = ref<AxiosError | null>(null)

  const fetchProjects = async () => {
    fetching.value = true
    return axios
      .get('/project_info/')
      .then((response) => {
        projects.value = response.data.map(
          (project: {
            name: string
            latitude: number
            longitude: number
            address: string
            deleted: boolean
            id: string
          }) => ({
            id: project.id,
            name: project.name,
            location: {
              latitude: project.latitude,
              longitude: project.longitude,
              address: project.address,
            },
            deleted: project.deleted,
          }),
        )
        error.value = false
      })
      .catch((errorResponse) => {
        error.value = true
        errorDetails.value = errorResponse
      })
      .finally(() => {
        fetching.value = false
      })
  }

  return { projects, availableProjects, fetching, error, errorDetails, fetchProjects }
})
