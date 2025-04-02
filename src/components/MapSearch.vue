<template>
<div id="map"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import "leaflet-geosearch/assets/css/leaflet.css";

import { type Location } from '@/models/location.ts'
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { mapHeight = '500px' } = defineProps<{ mapHeight?: string }>()

const emit = defineEmits(['locationSelected'])

onMounted(() => {
  const map = L.map('map');

  const provider = new OpenStreetMapProvider();
  // @ts-expect-error('Base on sample code from
  // https://github.com/smeijer/leaflet-geosearch/tree/main?tab=readme-ov-file#using-with-react-leaflet')
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    marker: {
      icon: new L.Icon.Default(),
      draggable: true,
    },
  });
  map.addControl(searchControl);

  map.setView([36.934232, -5.258991], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  map.on('geosearch/showlocation', (result: any) => {
    emit('locationSelected', {
      latitude: result.location.y,
      longitude: result.location.x,
      address: result.location.label,
    } as Location);
  })

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  map.on('geosearch/marker/dragend', (result: any) => {
    emit('locationSelected', {
      latitude: result.location.lat,
      longitude: result.location.lng,
      address: t('unknown_address'),
    } as Location);
  })
});

</script>

<style scoped>
#map {
  height: v-bind('mapHeight');
}
</style>

<i18n>
{
  "en": {
    "unknown_address": "Unknown address"
  },
  "es": {
    "unknown_address": "Dirección desconocida"
  }
}
</i18n>
