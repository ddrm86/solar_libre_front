<template>
  <Button
    :label="t('pvgis_button.consult_pvgis')"
    :loading="solarArraysStore.arrays[arrayIdx].pvgisData?.fetching"
    :disabled="!isValidRequest"
    :badge="badgeText"
    :badgeSeverity="badgeSeverity"
    icon="pi pi-search"
    @click="solarArraysStore.arrays[arrayIdx].fetchPvgisData(projectInfoStore.projectInfo)"
  />
</template>

<script setup lang="ts">
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const solarArraysStore = useSolarArraysStore()
const projectInfoStore = useProjectInfoStore()

const { arrayIdx } = defineProps<{ arrayIdx: number }>()

const isValidRequest = computed(() => {
  return (
    projectInfoStore.projectInfo.location.latitude !== 0.0 &&
    projectInfoStore.projectInfo.location.longitude !== 0.0 &&
    Object.keys(solarArraysStore.arrays[arrayIdx].array.panel).length !== 0 &&
    solarArraysStore.arrays[arrayIdx].array.panelNumber > 0
  )
})

const badgeText = computed(() => {
  if (!isValidRequest.value) {
    return t('pvgis_button.missing_data')
  } else if (solarArraysStore.arrays[arrayIdx].pvgisData?.error) {
    return t('pvgis_button.error')
  } else if (solarArraysStore.arrays[arrayIdx].pvgisData?.fetching) {
    return t('pvgis_button.fetching')
  } else if (solarArraysStore.arrays[arrayIdx].isDirty) {
    return t('pvgis_button.needs_update')
  } else if (!solarArraysStore.arrays[arrayIdx].isDirty && !solarArraysStore.arrays[arrayIdx].pvgisData?.error) {
    return t('pvgis_button.updated')
  } else {
    return ''
  }
})

const badgeSeverity = computed(() => {
  if (!isValidRequest.value) {
    return 'secondary'
  } else if (solarArraysStore.arrays[arrayIdx].pvgisData?.error) {
    return 'danger'
  } else if (solarArraysStore.arrays[arrayIdx].pvgisData?.fetching) {
    return 'secondary'
  } else if (solarArraysStore.arrays[arrayIdx].isDirty) {
    return 'contrast'
  } else if (!solarArraysStore.arrays[arrayIdx].isDirty && !solarArraysStore.arrays[arrayIdx].pvgisData?.error) {
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
