<template>
  <p>
    Ver consola
  </p>
</template>

<script setup lang="ts">
  import { Pvgis, type PvgisRequest } from '@/models/pvgis.ts'

  const pvgis_request: PvgisRequest = {
    latitude: 45.7128,
    longitude: 5.0060,
    peakPower: 2,
    angle: 30,
    loss: 14,
    azimuth: 3,
  }

  const pvgis = new Pvgis(pvgis_request);
  pvgis.fetch();
  console.log(pvgis);
</script>
