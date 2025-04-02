<template>
<div class="flex flex-row gap-2">
  <div id="project-data" class="flex-1/3">
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="name"
          v-model="projectInfo.name"
          class="w-full"
        />
        <label for="name">{{ t('project_info.name') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="address"
          v-model="projectInfo.location.address"
          class="w-full"
        />
        <label for="address">{{ t('project_info.address') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="latitude"
          v-model="projectInfo.location.latitude"
          :minFractionDigits="6"
          :maxFractionDigits="13"
          class="w-full"
        />
        <label for="latitude">{{ t('project_info.latitude') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="longitude"
          v-model="projectInfo.location.longitude"
          :minFractionDigits="6"
          :maxFractionDigits="13"
          class="w-full"
        />
        <label for="longitude">{{ t('project_info.longitude') }}*</label>
      </IftaLabel>
    </div>
  </div>
  <div id="location-selection" class="flex-2/3">
    <MapSearch
      map-height="400px"
      @location-selected="(location: Location) => {
        projectInfo.location.latitude = location.latitude
        projectInfo.location.longitude = location.longitude
        projectInfo.location.address = location.address
      }"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { type ProjectInfo } from '@/models/projectInfo.ts'
import MapSearch from '@/components/MapSearch.vue'

const { t } = useI18n()
const projectInfo = ref({name: '', location: {latitude: 0.0, longitude: 0.0, address: ''}} as ProjectInfo)

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
