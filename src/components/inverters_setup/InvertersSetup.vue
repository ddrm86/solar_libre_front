<template>
  <div class="flex gap-2">
    <Button
      icon="pi pi-plus"
      :label="t('inverters.add_inverter')"
      @click="invertersSetupStore.addInverterSetup()"
    />
    <Message
      :icon="availableSetupsMessage.icon"
      :severity="availableSetupsMessage.severity"
    >
      {{ availableSetupsMessage.text }}
    </Message>
  </div>
  <div v-for="(inverterSetup, index) in invertersSetupStore.inverters" :key="inverterSetup.id" class="pt-4">
    <InverterSetup
      :idx="index"
      :inventory="monophaseInvertersStore.availableMonophaseInverters"
      :currentSetup="inverterSetup"
      @updateInverterSetup="onInverterChange"
      @deleteInverter="invertersSetupStore.deleteInverterSetup(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'
import { computed, onMounted } from 'vue'
import { useMonophaseInvertersStore } from '@/stores/inventory/monophaseInverters.ts'
import { useToast } from 'primevue/usetoast'
import InverterSetup from '@/components/inverters_setup/InverterSetup.vue'
import type { IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'

const { t } = useI18n()
const toast = useToast()

const solarArraysStore = useSolarArraysStore()
const monophaseInvertersStore = useMonophaseInvertersStore()
const invertersSetupStore = useInvertersSetupStore()

onMounted(() => {
  monophaseInvertersStore.fetchMonophaseInverters().then(() => {
    const inverterFetchingError = monophaseInvertersStore.error
    if (inverterFetchingError) {
      toast.add({
        severity: 'error',
        summary: t('toast_messages.error'),
        detail: t('toast_messages.error_fetching_inverters') + ': ' + monophaseInvertersStore.errorDetails,
      })
    }
  })
})

const availableSetupsMessage = computed(() => {
  if (solarArraysStore.arrays.length === 0 || solarArraysStore.totalNumberOfPanels === 0) {
    return {
      icon: 'pi pi-info-circle',
      severity: 'secondary',
      text: t('inverters.no_solar_panels'),
    }
  }
  if (invertersSetupStore.availableSetups.length === 0) {
    return {
      icon: 'pi pi-wave-pulse',
      severity: 'success',
      text: `${t('inverters.all_panels_connected')} (${solarArraysStore.totalNumberOfPanels})`,
    }
  }
  return {
    icon: 'pi pi-exclamation-triangle',
    severity: 'warn',
    text: `${t('inverters.missing_panels')} (${invertersSetupStore.numberOfAvailablePanels})`,
  }
})

const onInverterChange = (inverterSetup: IInverterSetup, idx: number) => {
  invertersSetupStore.updateInverterSetup(inverterSetup, idx)
}
</script>

<i18n>
{
  "en": {
    "inverters": {
      "add_inverter": "Add inverter",
      "missing_panels": "Missing panels to connect",
      "all_panels_connected": "All panels connected",
      "no_solar_panels": "No solar panels added"
    }
  },
  "es": {
    "inverters": {
      "add_inverter": "Añadir inversor",
      "missing_panels": "Faltan paneles por conectar",
      "all_panels_connected": "Todos los paneles están conectados",
      "no_solar_panels": "No se ha añadido ningún panel solar"
    }
  }
}
</i18n>
