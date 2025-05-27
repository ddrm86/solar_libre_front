import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProjectInfo } from '@/models/project_info/projectInfo.ts'
import axios from 'axios'

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

  const createProjectPayload = (projectInfo: IProjectInfo) => {
    const { name, location } = projectInfo;
    const payload: {
      name: string
      latitude: number
      longitude: number
      address: string
    } = {
      name,
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    };
    return payload;
  };

  const addProjectInfo = async () => {
    const payload = createProjectPayload(projectInfo.value);

    return axios
      .post('/project_info/', payload)
      .then((response) => {
        projectInfo.value.id = response.data.id;
      })
  };

  const updateProjectInfo = async () => {
    const payload = createProjectPayload(projectInfo.value);

    return axios
      .patch(`/project_info/${projectInfo.value.id}`, payload)
  };

  const saveProjectInfo = async () => {
    if (!projectInfo.value.id) {
      return addProjectInfo();
    } else {
      return updateProjectInfo();
    }
  }

  return { projectInfo, generateRandomProjectName, saveProjectInfo }
})
