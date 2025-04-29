import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProjectInfo } from '@/models/project_info/projectInfo.ts'

export const useProjectInfoStore =
  defineStore('project_info', () => {

  const projectInfo = ref<ProjectInfo>({
    name: '',
    location:
      {
        latitude: 36.934232,
        longitude: -5.258991,
        address: ''
      }
  })

  return { projectInfo }
})
