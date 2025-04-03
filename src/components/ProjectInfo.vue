<template>
<div class="flex flex-row gap-2">
  <div id="location-selection" class="flex-2/3">
    <MapSearch
      map-height="400px"
      @location-selected="(location: Location) => {
        projectInfoStore.projectInfo.location.latitude = location.latitude
        projectInfoStore.projectInfo.location.longitude = location.longitude
        projectInfoStore.projectInfo.location.address = location.address
      }"
    />
  </div>
  <div id="project-data" class="flex-1/3">
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="name"
          v-model="projectInfoStore.projectInfo.name"
          class="w-full"
        />
        <label for="name">{{ t('project_info.name') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <Textarea
          id="address"
          v-model="projectInfoStore.projectInfo.location.address"
          rows="3"
          class="w-full"
          disabled
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
          class="w-full"
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
          class="w-full"
          disabled
        />
        <label for="longitude">{{ t('project_info.longitude') }}</label>
      </IftaLabel>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MapSearch from '@/components/MapSearch.vue'
import { type Location } from '@/models/location.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'

const { t } = useI18n()
const projectInfoStore = useProjectInfoStore()

</script>

<i18n>
{
  "en": {
    "project_info": {
      "name": "Project name",
      "address": "Address",
      "latitude": "Latitude",
      "longitude": "Longitude"
    }
  },
  "es": {
    "project_info": {
      "name": "Nombre del proyecto",
      "address": "Dirección",
      "latitude": "Latitud",
      "longitude": "Longitud"
    }
  }
}
</i18n>
