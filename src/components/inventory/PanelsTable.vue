<script setup lang="ts">

import { usePanelsStore } from '@/stores/panels.ts'
import { onMounted } from 'vue'
const panelsStore = usePanelsStore()

onMounted(() => {
  panelsStore.fetchPanels()
});

</script>

<template>
  <div v-if="!panelsStore.error">
    <DataTable :value="panelsStore.panels" dataKey="id" :loading="panelsStore.fetching">
      <Column field="model" header="Model"></Column>
      <Column field="nominal_power" header="Nominal Power"></Column>
      <Column field="vmpp" header="Vmpp"></Column>
      <Column field="impp" header="Impp"></Column>
      <Column field="voc" header="Voc"></Column>
      <Column field="isc" header="Isc"></Column>
      <Column field="length" header="Length"></Column>
      <Column field="width" header="Width"></Column>
      <Column field="reference" header="Reference"></Column>
      <Column field="description" header="Description"></Column>
    </DataTable>
  </div>
  <div v-else>
    <h2>There was an error fetching the data from the backend. Please try again later.</h2>
    <small>{{ panelsStore.errorDetails }}</small>
  </div>
</template>
