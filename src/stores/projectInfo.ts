import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProjectInfo } from '@/models/project_info/projectInfo.ts'

export const useProjectInfoStore =
  defineStore('project_info', () => {

  const projectInfo = ref<ProjectInfo>({
    name: '',
    location:
      {
        latitude: 0.0,
        longitude: 0.0,
        address: ''
      }
  })

  return { projectInfo }
})
