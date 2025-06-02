<template>
  <div class="md:flex flex-row gap-2">
    <div id="location-selection" class="flex-2/3">
      <MapSearch
        map-height="400px"
        :init-view="[
          projectInfoStore.projectInfo.location.latitude,
          projectInfoStore.projectInfo.location.longitude,
        ]"
        @location-selected="
          (location: ILocation) => {
            projectInfoStore.projectInfo.location.latitude = location.latitude
            projectInfoStore.projectInfo.location.longitude = location.longitude
            projectInfoStore.projectInfo.location.address = location.address
          }
        "
      />
    </div>
    <div id="project-data" class="flex-1/3 max-md:pt-4">
      <Fluid>
        <div class="pb-2">
          <IftaLabel>
            <InputText id="name" v-model="projectInfoStore.projectInfo.name" @blur="validateName" />
            <label for="name">{{ t('project_info.name') }}*</label>
          </IftaLabel>
        </div>
        <div class="pb-2">
          <IftaLabel>
            <Textarea
              id="address"
              v-model="projectInfoStore.projectInfo.location.address"
              rows="3"
            />
            <label for="address">{{ t('project_info.address') }}</label>
          </IftaLabel>
        </div>
        <div class="pb-2">
          <IftaLabel>
            <InputNumber
              id="latitude"
              v-model="projectInfoStore.projectInfo.location.latitude"
              :minFractionDigits="6"
              :maxFractionDigits="13"
              disabled
            />
            <label for="latitude">{{ t('project_info.latitude') }}</label>
          </IftaLabel>
        </div>
        <div class="pb-2">
          <IftaLabel>
            <InputNumber
              id="longitude"
              v-model="projectInfoStore.projectInfo.location.longitude"
              :minFractionDigits="6"
              :maxFractionDigits="13"
              disabled
            />
            <label for="longitude">{{ t('project_info.longitude') }}</label>
          </IftaLabel>
        </div>
      </Fluid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MapSearch from '@/components/project_info/MapSearch.vue'
import { type ILocation } from '@/models/project_info/location.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()
const projectInfoStore = useProjectInfoStore()

const validateName = () => {
  if (!projectInfoStore.projectInfo.name) {
    projectInfoStore.projectInfo.name = projectInfoStore.generateRandomProjectName()
  } else {
    isProjectNameDuplicated(projectInfoStore.projectInfo.name).then((isDuplicated) => {
      if (isDuplicated) {
        projectInfoStore.projectInfo.name += '-' + crypto.randomUUID().slice(-4)
        toast.add({
          severity: 'warn',
          summary: t('messages.project_name_duplicated_summary'),
          detail: t('messages.project_name_duplicated_detail'),
          life: 3000,
        })
      }
    })
  }
}

const isProjectNameDuplicated = async (name: string): Promise<boolean> => {
  return axios
    .get('/project_info/search/', {
      params: { name },
    })
    .then((response) => {
      if (!response.data.found) {
        return false
      } else if (!projectInfoStore.projectInfo.id) {
        return true
      } else if (projectInfoStore.projectInfo.id !== response.data.project_info.id) {
        return true
      }
      return false
    })
    .catch((error) => {
      toast.add({
        severity: 'error',
        summary: t('messages.error'),
        detail: `${t('messages.fetching_error')} ${error.message}`,
      })
      return false
    })
}
</script>

<i18n>
{
  "en": {
    "project_info": {
      "name": "Project name",
      "address": "Address",
      "latitude": "Latitude",
      "longitude": "Longitude"
    },
    "messages": {
      "project_name_duplicated_summary": "Project name duplicated",
      "project_name_duplicated_detail": "A project with this name already exists. A new name has been generated.",
      "error": "Error checking name",
      "fetching_error": "There was an error fetching the data from the database. Please try again later."
    }
  },
  "es": {
    "project_info": {
      "name": "Nombre del proyecto",
      "address": "Dirección",
      "latitude": "Latitud",
      "longitude": "Longitud"
    },
    "messages": {
      "project_name_duplicated_summary": "Nombre del proyecto duplicado",
      "project_name_duplicated_detail": "Ya existe un proyecto con este nombre. Se ha generado un nuevo nombre.",
      "error": "Error al verificar el nombre",
      "fetching_error": "Hubo un error al obtener los datos de la base de datos. Por favor, inténtelo de nuevo más tarde."
    }
  }
}
</i18n>
