<template>
  <Card>
    <template #title>
      <div class="flex gap-4 items-center pb-4">
        <h2 class="text-lg font-semibold">{{ t('savings.title') }}</h2>
        <Message v-if="solarArraysStore.isDirty" icon="pi pi-exclamation-triangle" severity="warn">
          {{ t('savings.outdated_pvgis') }}
        </Message>
      </div>
    </template>
    <template #content>
      <div class="flex gap-4 items-center">
        <label for="compensationPerKwh" class="block font-medium mb-2">
          {{ t('savings.compensationPerKwh') }}
        </label>
        <InputNumber
          id="compensationPerKwh"
          mode="decimal"
          showButtons
          :step="0.01"
          :maxFractionDigits="2"
          :minFractionDigits="2"
          :min="0"
          suffix="€/kWh"
          v-model="economicBalanceStore.energyCosts.compensationPerKwh"
        />
      </div>
      <div class="pt-4">
        <CostSavingsChart />
      </div>
    </template>
    <template #footer>
      <p class="text-xs mt-1 text-slate-500">
        {{ t('savings.disclaimer') }}
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
/**
 * CostSavings.vue
 *
 * This Vue component displays a card for configuring and visualizing cost savings related to
 * energy compensation for surplus production.
 * It allows the user to set the compensation per kWh and shows a warning if the PVGIS production
 * data is outdated.
 *
 * Usage:
 * <CostSavings />
 */
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance'
import CostSavingsChart from '@/components/economic_balance/CostSavingsChart.vue'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()
const solarArraysStore = useSolarArraysStore()
</script>

<i18n>
{
  "en": {
    "savings": {
      "title": "Savings",
      "compensationPerKwh": "Compensation for surplus",
      "disclaimer": "Depending on the contracted rate, it is possible that surpluses exceeding the monthly consumption will not be compensated.",
      "outdated_pvgis": "The PVGIS production data is outdated with respect to the current installation."
    }
  },
  "es": {
    "savings": {
      "title": "Ahorros",
      "compensationPerKwh": "Compensación por excedentes",
      "disclaimer": "Dependiendo de la tarifa contratada, es posible que no se compensen los excedentes que superen el gasto mensual realizado.",
      "outdated_pvgis": "Los datos de producción PVGIS están desactualizados respecto a la instalación actual"
    }
  }
}
</i18n>
