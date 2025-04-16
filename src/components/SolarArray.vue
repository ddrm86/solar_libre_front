<template>
  <div>
    <h2>{{ t('solar_array.title') }}</h2>
    <Fluid>
      <div class="pb-2">
        <IftaLabel>
          <Select
            id="panel"
            v-model="solarArrayStore.solarArray.panel"
            filter
            :options="panelsStore.panels"
            :optionLabel="getPanelLabel"
            :placeholder="t('solar_array.select_panel')"
          />
          <label for="panel">{{ t('solar_array.panel') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2 flex">
        <IftaLabel>
          <InputNumber
            id="panelNumber"
            v-model="solarArrayStore.solarArray.panelNumber"
            :min="1"
          />
          <label for="panelNumber">{{ t('solar_array.panelNumber') }}</label>
        </IftaLabel>
        <label for="panelNumber" class="pl-2 text-xs text-gray-500 flex items-end">
          {{ getTotalPowerText }}
        </label>
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
import { computed, onMounted, ref, watch } from 'vue'
import type { Panel } from '@/models/panel.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()
const projectInfoStore = useProjectInfoStore()
const solarArrayStore = useSolarArrayStore()
const panelsStore = usePanelsStore()

const panelFetchingError = ref(false)

const getPanelLabel = (panel: Panel) => panel.maker + ' ' + panel.model
  + ' (' + panel.nominal_power + 'W)'

onMounted(() => {
  panelsStore.fetchPanels().then(() => {
    panelFetchingError.value = panelsStore.error
    if (panelFetchingError.value) {
      toast.add({
        severity: 'error',
        summary: t('toast_messages.error'),
        detail: t('toast_messages.error_fetching_panels') + ': ' + panelsStore.errorDetails,
        life: 3000,
      })
    }
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

const getTotalPowerText = computed(() => {
  const peakPowerKw = solarArrayStore.solarArray.calcPeakPowerKw()
  return isNaN(peakPowerKw) ? '' : `(${peakPowerKw} kW)`
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
  if (!isValidRequest.value) {
    return 'secondary'
  } else if (solarArrayStore.pvgisData?.error) {
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

watch (
  () => solarArrayStore.pvgisData?.error,
  (newValue) => {
    if (newValue) {
      toast.add({
        severity: 'error',
        summary: t('toast_messages.error'),
        detail: t('toast_messages.error_querying_pvgis') + ': '
          + solarArrayStore.pvgisData?.errorDetails,
        life: 3000,
      })
    }
  }
)
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
    "toast_messages": {
      "error": "Error",
      "error_fetching_panels": "Error loading the list of solar panels",
      "error_querying_pvgis": "Error querying PVGIS"
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
      "needs_update": "Actualizar",
      "updated": "Actualizado",
      "error": "Error al consultar",
      "fetching": "Consultando"
    },
    "toast_messages": {
      "error": "Error",
      "error_fetching_panels": "Error al cargar la lista de paneles solares",
      "error_querying_pvgis": "Error consultando PVGIS"
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
