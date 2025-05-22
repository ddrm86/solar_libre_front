<template>
  <Card>
    <template #title>
      <h2 class="text-lg font-semibold pb-4">{{ t('savings.title') }}</h2>
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
          :maxFractionDigits = "2"
          :minFractionDigits = "2"
          :min = "0"
          suffix="€/kWh"
          v-model="economicBalanceStore.energyCosts.compensationPerKwh"
        />
      </div>
      <div>
        <CostSavingsChart />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance'
import CostSavingsChart from '@/components/economic_balance/CostSavingsChart.vue'

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()
</script>

<i18n>
{
  "en": {
    "savings": {
      "title": "Savings",
      "compensationPerKwh": "Compensation for surplus"
    }
  },
  "es": {
    "savings": {
      "title": "Ahorros",
      "compensationPerKwh": "Compensación por excedentes"
    }
  }
}
</i18n>
