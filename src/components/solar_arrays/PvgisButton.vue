<template>
  <Button
    :label="t('pvgis_button.consult_pvgis')"
    :loading="solarArrayStore.pvgisData?.fetching"
    :disabled="!isValidRequest"
    :badge="badgeText"
    :badgeSeverity="badgeSeverity"
    icon="pi pi-search"
    @click="solarArrayStore.fetchPvgisData"
  />
</template>

<script setup lang="ts">
import { useSolarArrayStore } from '@/stores/solarArray.ts'
import { useProjectInfoStore } from '@/stores/projectInfo.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const solarArrayStore = useSolarArrayStore()
const projectInfoStore = useProjectInfoStore()

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

</script>

<i18n>
{
  "en": {
    "pvgis_button": {
      "consult_pvgis": "Consult PVGIS Data",
      "missing_data": "Missing data",
      "needs_update": "Needs update",
      "updated": "Updated",
      "error": "Error performing query",
      "fetching": "Querying"
    }
  },
  "es": {
    "pvgis_button": {
      "consult_pvgis": "Consultar Datos PVGIS",
      "missing_data": "Faltan datos",
      "needs_update": "Actualizar",
      "updated": "Actualizado",
      "error": "Error al consultar",
      "fetching": "Consultando"
    }
  }
}
</i18n>
