<template>
  <Card>
    <template #title>
      <h3 class="text-lg font-bold mb-4">{{ t('energy_consumption.title') }}</h3>
    </template>
    <template #content>
      <div class="2xl:flex 2xl:gap-8">
        <InputConsumptionTable />
        <InputConsumptionChart class="pt-8 lg:pt-0 lg:flex-1" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
/**
 * InputConsumption.vue
 *
 * This Vue component displays the annual energy consumption by month in kilowatt-hours (kWh).
 * It contains a table for entering and viewing monthly consumption data and a chart for visualizing the data.
 * The table and chart are shown side by side on large screens.
 *
 * Usage:
 * <InputConsumption />
 */
import InputConsumptionTable from '@/components/consumption/InputConsumptionTable.vue'
import InputConsumptionChart from '@/components/consumption/InputConsumptionChart.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<i18n>
{
  "en": {
    "energy_consumption": {
      "title": "ENERGY CONSUMPTION BY MONTH [kWh]"
    }
  },
  "es": {
    "energy_consumption": {
      "title": "ENERGÍA CONSUMIDA POR MES [kWh]"
    }
  }
}
</i18n>
