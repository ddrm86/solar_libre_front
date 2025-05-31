import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProjectInfo } from '@/models/project_info/projectInfo.ts'
import axios from 'axios'
import { useMapSearchStore } from '@/stores/project_info/mapSearch.ts'

export const useProjectInfoStore = defineStore('project_info', () => {
  const mapSearchStore = useMapSearchStore()

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
    deleted: false,
  })

  const createProjectPayload = (projectInfo: IProjectInfo) => {
    const { name, location } = projectInfo;
    const payload: {
      name: string
      latitude: number
      longitude: number
      address: string
      map_zoom: number
    } = {
      name,
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
      map_zoom: mapSearchStore.zoom
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

  const loadProjectInfo = async (projectId: string) => {
    return axios
      .get(`/project_info/${projectId}`)
      .then((response) => {
        const project = response.data;
        projectInfo.value = {
          id: project.id,
          name: project.name,
          location: {
            latitude: project.latitude,
            longitude: project.longitude,
            address: project.address,
          },
          deleted: project.deleted,
        };
        mapSearchStore.zoom = project.map_zoom
      });
  }

  return { projectInfo, generateRandomProjectName, saveProjectInfo, loadProjectInfo }
})
