import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProjectInfo } from '@/models/project_info/projectInfo.ts'

export const useProjectInfoStore = defineStore('project_info', () => {
  const generateRandomProjectName = () => {
    return `P-${crypto.randomUUID()}`
  }

  const projectInfo = ref<IProjectInfo>({
    name: generateRandomProjectName(),
    location: {
      latitude: 36.934232,
      longitude: -5.258991,
      address: '',
    },
  })

  return { projectInfo, generateRandomProjectName }
})
