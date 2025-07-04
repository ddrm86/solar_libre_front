<template>
<div id="map"></div>
</template>

<script setup lang="ts">
/**
 * MapSearch.vue
 *
 * This Vue component displays an interactive map with a search bar for addresses using Leaflet and
 * leaflet-geosearch.
 * Users can search for locations, drag the marker, and select a location, which emits the selected
 * coordinates and address.
 * The map zoom level is stored in the mapSearchStore so it does not go back to the default value
 * every time the component is mounted.
 *
 * Usage:
 * <MapSearch :mapHeight="'400px'" :initView="[latitude, longitude]" @locationSelected="handler" />
 */
import 'leaflet/dist/leaflet.css'
import "leaflet-geosearch/assets/css/leaflet.css";

import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

import { type ILocation } from '@/models/project_info/location.ts'
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMapSearchStore } from '@/stores/project_info/mapSearch.ts'

const { t } = useI18n()
const mapSearchStore = useMapSearchStore()

const { mapHeight = '500px', initView } =
  defineProps<{ mapHeight?: string, initView: [number, number] }>()

const emit = defineEmits(['locationSelected'])

onMounted(() => {
  const map = L.map('map');

  // https://cescobaz.com/2023/06/14/setup-leaflet-with-svelte-and-vite/
  L.Icon.Default.prototype.options.iconUrl = markerIconUrl;
  L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
  L.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
  L.Icon.Default.imagePath = ""; // necessary to avoid Leaflet adds some prefix to image path

  const provider = new OpenStreetMapProvider();
  // @ts-expect-error('Base on sample code from
  // https://github.com/smeijer/leaflet-geosearch/tree/main?tab=readme-ov-file#using-with-react-leaflet')
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    marker: {
      draggable: true,
    },
    searchLabel: t('search_label'),
  });
  map.addControl(searchControl);

  map.setView(initView, mapSearchStore.zoom);
  const marker = L.marker(initView, { draggable: true }).addTo(map);

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
    } as ILocation);
  })

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  map.on('geosearch/marker/dragend', (result: any) => {
    emit('locationSelected', {
      latitude: result.location.lat,
      longitude: result.location.lng,
      address: t('unknown_address'),
    } as ILocation);
  })

  map.on('zoomend', () => {
    mapSearchStore.zoom = map.getZoom();
  });

  marker.on('dragend', () => {
    emit('locationSelected', {
      latitude: marker.getLatLng().lat,
      longitude: marker.getLatLng().lng,
      address: t('unknown_address'),
    } as ILocation);
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
    "unknown_address": "Unknown address",
    "search_label": "Enter address"
  },
  "es": {
    "unknown_address": "Dirección desconocida",
    "search_label": "Introduzca la dirección"
  }
}
</i18n>
