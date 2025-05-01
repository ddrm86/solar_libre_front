<template>
  <Button
    icon="pi pi-plus"
    :label="t('inverters.add_inverter')"
    @click="invertersStore.addInverterSetup()"
  />
  Inversores añadidos: {{ invertersStore.inverters.length }}
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'

const { t } = useI18n()
const invertersStore = useInvertersSetupStore()
</script>

<i18n>
{
  "en": {
    "inverters": {
      "add_inverter": "Add inverter"
    }
  },
  "es": {
    "inverters": {
      "add_inverter": "Añadir inversor"
    }
  }
}
</i18n>
