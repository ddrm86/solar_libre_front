<template>
  <div>
    <h2>{{ t('solar_array.title') }}</h2>
    <Fluid>
      <div class="pb-2">
        <IftaLabel>
          <Select
            id="panel"
            v-model="solarArrayStore.solarArray.panel"
            :options="panelsStore.panels"
            :optionLabel="getPanelLabel"
            :placeholder="t('solar_array.select_panel')"
          />
          <label for="panel">{{ t('solar_array.panel') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="panelNumber"
            v-model="solarArrayStore.solarArray.panelNumber"
            :min="1"
          />
          <label for="panelNumber">{{ t('solar_array.panelNumber') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="loss"
            v-model="solarArrayStore.solarArray.loss"
            :defaultValue="14"
            :min="0"
            :max="100"
            :suffix="'%'"
          />
          <label for="loss">{{ t('solar_array.loss') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="angle"
            v-model="solarArrayStore.solarArray.angle"
            :defaultValue="35"
            :min="0"
            :max="90"
            :suffix="'°'"
          />
          <label for="angle">{{ t('solar_array.angle') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="azimuth"
            v-model="solarArrayStore.solarArray.azimuth"
            :min="-90"
            :max="90"
            :suffix="'°'"
          />
          <label for="azimuth">{{ t('solar_array.azimuth') }}</label>
        </IftaLabel>
      </div>
    </Fluid>
    <Button
      :label="t('solar_array.consult_pvgis')"
      :loading="solarArrayStore.pvgisData?.fetching"
      :disabled="!isValidRequest"
      :badge="badgeText"
      :badgeSeverity="badgeSeverity"
      icon="pi pi-search"
      @click="solarArrayStore.fetchPvgisData"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSolarArrayStore } from '@/stores/solarArray.ts'
import { usePanelsStore } from '@/stores/panels.ts'
import { computed, onMounted, ref } from 'vue'
import type { Panel } from '@/models/panel.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'

const { t } = useI18n()
const projectInfoStore = useProjectInfoStore()
const solarArrayStore = useSolarArrayStore()
const panelsStore = usePanelsStore()

const panelFetchingError = ref(false)

const getPanelLabel = (panel: Panel) => panel.maker + ' ' + panel.model

onMounted(() => {
  panelsStore.fetchPanels().then(() => {
    panelFetchingError.value = panelsStore.error
  })
})

const isValidRequest = computed(() => {
  return (
    projectInfoStore.projectInfo.location.latitude !== 0.0 &&
    projectInfoStore.projectInfo.location.longitude !== 0.0 &&
    Object.keys(solarArrayStore.solarArray.panel).length !== 0 &&
    solarArrayStore.solarArray.panelNumber > 0
  )
})

const badgeText = computed(() => {
  if (!isValidRequest.value) {
    return t('pvgis_button.missing_data')
  } else if (solarArrayStore.pvgisData?.error) {
    return t('pvgis_button.error')
  } else if (solarArrayStore.pvgisData?.fetching) {
    return t('pvgis_button.fetching')
  } else if (solarArrayStore.isDirty) {
    return t('pvgis_button.needs_update')
  } else if (!solarArrayStore.isDirty && !solarArrayStore.pvgisData?.error) {
    return t('pvgis_button.updated')
  } else {
    return ''
  }
})

const badgeSeverity = computed(() => {
  if (solarArrayStore.pvgisData?.error) {
    return 'danger'
  } else if (solarArrayStore.pvgisData?.fetching) {
    return 'secondary'
  } else if (solarArrayStore.isDirty) {
    return 'contrast'
  } else if (!solarArrayStore.isDirty && !solarArrayStore.pvgisData?.error) {
    return 'success'
  } else {
    return 'secondary'
  }
})
</script>

<i18n>
{
  "en": {
    "pvgis_button": {
      "missing_data": "Missing data",
      "needs_update": "Needs update",
      "updated": "Updated",
      "error": "Error performing query",
      "fetching": "Querying"
    },
    "solar_array": {
      "title": "Solar array configuration",
      "panel": "Panel",
      "panelNumber": "Number of panels",
      "loss": "Loss (%)",
      "angle": "Tilt angle (°)",
      "azimuth": "Azimuth (°)",
      "consult_pvgis": "Consult PVGIS Data",
      "select_panel": "Select a panel model"
    }
  },
  "es": {
    "pvgis_button": {
      "missing_data": "Faltan datos",
      "needs_update": "Necesita actualización",
      "updated": "Actualizado",
      "error": "Error al consultar",
      "fetching": "Consultando"
    },
    "solar_array": {
      "title": "Configuración de la matriz solar",
      "panel": "Panel",
      "panelNumber": "Número de paneles",
      "loss": "Pérdidas (%)",
      "angle": "Ángulo de inclinación (°)",
      "azimuth": "Azimut (°)",
      "consult_pvgis": "Consultar Datos PVGIS",
      "select_panel": "Selecciona un modelo de panel"
    }
  }
}
</i18n>
