<template>
  <Button
    icon="pi pi-plus"
    :label="t('inverters.add_inverter')"
    @click="invertersSetupStore.addInverterSetup()"
  />
  <div v-for="(inverterSetup, index) in invertersSetupStore.inverters" :key="inverterSetup.id" class="pt-4">
    <InverterSetup
      :idx="index"
      :inventory="monophaseInvertersStore.availableMonophaseInverters"
      :currentSetup="inverterSetup"
      @updateInverterSetup="onInverterChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'
import { onMounted } from 'vue'
import { useMonophaseInvertersStore } from '@/stores/inventory/monophaseInverters.ts'
import { useToast } from 'primevue/usetoast'
import InverterSetup from '@/components/inverters_setup/InverterSetup.vue'
import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'
import type { IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'

const { t } = useI18n()
const toast = useToast()

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
        life: 3000,
      })
    }
  })
})

const onInverterChange = (inverterSetup: IInverterSetup, idx: number) => {
  invertersSetupStore.updateInverterSetup(inverterSetup, idx)
}
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
