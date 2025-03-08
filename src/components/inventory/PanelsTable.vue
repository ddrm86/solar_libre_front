<script setup lang="ts">

import { usePanelsStore } from '@/stores/panels.ts'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const panelsStore = usePanelsStore()

onMounted(() => {
  panelsStore.fetchPanels()
});

</script>

<template>
  <div v-if="!panelsStore.error">
    <DataTable :value="panelsStore.panels" dataKey="id" :loading="panelsStore.fetching">
      <Column field="model" :header="t('model')"></Column>
      <Column field="nominal_power" :header="t('nominal_power')"></Column>
      <Column field="vmpp" :header="t('vmpp')"></Column>
      <Column field="impp" :header="t('impp')"></Column>
      <Column field="voc" :header="t('voc')"></Column>
      <Column field="isc" :header="t('isc')"></Column>
      <Column field="length" :header="t('length')"></Column>
      <Column field="width" :header="t('width')"></Column>
      <Column field="reference" :header="t('reference')"></Column>
      <Column field="description" :header="t('description')"></Column>
    </DataTable>
  </div>
  <div v-else>
    <h2 class="text-xl font-bold">{{ t('error_message') }}</h2>
    <small class="text-red-500">{{ panelsStore.errorDetails }}</small>
  </div>
</template>

<i18n>
{
  "en": {
    "model": "Model",
    "nominal_power": "Nominal Power",
    "vmpp": "Vmpp",
    "impp": "Impp",
    "voc": "Voc",
    "isc": "Isc",
    "length": "Length",
    "width": "Width",
    "reference": "Reference",
    "description": "Description",
    "error_message": "There was an error fetching the data from the database. Please try again later."
  },
  "es": {
    "model": "Modelo",
    "nominal_power": "Potencia Nominal",
    "vmpp": "Vmpp",
    "impp": "Impp",
    "voc": "Voc",
    "isc": "Isc",
    "length": "Largo",
    "width": "Ancho",
    "reference": "Referencia",
    "description": "Descripción",
    "error_message": "Hubo un error al obtener los datos de la base de datos. Por favor, inténtelo de nuevo más tarde."
  }
}
</i18n>
