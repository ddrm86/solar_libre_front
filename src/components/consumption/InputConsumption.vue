<template>
  <div class="card">
    <h3 class="text-lg font-bold mb-4">{{ t('energy_consumption.title') }}</h3>
    <div class="grid grid-cols-4 gap-4 items-center">
      <!-- Encabezados -->
      <div class="font-bold">{{ t('energy_consumption.month') }}</div>
      <div class="font-bold text-center">{{ t('energy_consumption.peak') }}</div>
      <div class="font-bold text-center">{{ t('energy_consumption.flat') }}</div>
      <div class="font-bold text-center">{{ t('energy_consumption.valley') }}</div>

      <!-- Filas de datos -->
      <template v-for="(month, index) in months" :key="index">
        <div>{{ month }}</div>
        <div>
          <InputNumber
            :model-value="consumption.consumptionsPerMonth[index].peak"
            :min="0"
            mode="decimal"
            class="w-full"
            @update:model-value="(value) => setConsumption(index, 'peak', value)"
          />
        </div>
        <div>
          <InputNumber
            :model-value="consumption.consumptionsPerMonth[index].flat"
            :min="0"
            mode="decimal"
            class="w-full"
            @update:model-value="(value) => setConsumption(index, 'flat', value)"
          />
        </div>
        <div>
          <InputNumber
            :model-value="consumption.consumptionsPerMonth[index].valley"
            :min="0"
            mode="decimal"
            class="w-full"
            @update:model-value="(value) => setConsumption(index, 'valley', value)"
          />
        </div>
      </template>
    </div>

    <!-- Totales -->
    <div class="mt-6">
      <h4 class="text-lg font-bold">{{ t('energy_consumption.totals') }}</h4>
      <p>{{ t('energy_consumption.total_peak') }}: {{ totals.peak }}</p>
      <p>{{ t('energy_consumption.total_flat') }}: {{ totals.flat }}</p>
      <p>{{ t('energy_consumption.total_valley') }}: {{ totals.valley }}</p>
      <h4 class="text-lg font-bold mt-4">{{ t('energy_consumption.annual_consumption') }}: {{ totalConsumption }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInputConsumptionStore } from '@/stores/inputConsumption'
import { useI18n } from 'vue-i18n'
import type { IConsumptionByTimeBand } from '@/models/consumption/inputConsumption.ts'

const { t } = useI18n()
const inputConsumptionStore = useInputConsumptionStore()

const months = [
  t('months.january'),
  t('months.february'),
  t('months.march'),
  t('months.april'),
  t('months.may'),
  t('months.june'),
  t('months.july'),
  t('months.august'),
  t('months.september'),
  t('months.october'),
  t('months.november'),
  t('months.december')
]

const consumption = inputConsumptionStore.consumption
const totals = computed(() => inputConsumptionStore.consumptionByTimeBand)
const totalConsumption = computed(() => inputConsumptionStore.totalConsumption)

const setConsumption = (
  monthIndex: number,
  timeBand: keyof IConsumptionByTimeBand,
  value: number
) => {
  inputConsumptionStore.consumption.setConsumptionByMonthAndTimeBand(monthIndex, timeBand, value)
}
</script>

<i18n>
{
  "en": {
    "energy_consumption": {
      "title": "ENERGY CONSUMPTION BY PERIOD [kWh]",
      "month": "Month",
      "peak": "Peak",
      "flat": "Flat",
      "valley": "Valley",
      "totals": "Totals",
      "total_peak": "Total Peak",
      "total_flat": "Total Flat",
      "total_valley": "Total Valley",
      "annual_consumption": "ANNUAL CONSUMPTION [kWh/year]"
    },
    "months": {
      "january": "January",
      "february": "February",
      "march": "March",
      "april": "April",
      "may": "May",
      "june": "June",
      "july": "July",
      "august": "August",
      "september": "September",
      "october": "October",
      "november": "November",
      "december": "December"
    }
  },
  "es": {
    "energy_consumption": {
      "title": "ENERGÍA CONSUMIDA POR PERIODO [kWh]",
      "month": "Mes",
      "peak": "Punta",
      "flat": "Llano",
      "valley": "Valle",
      "totals": "Totales",
      "total_peak": "Total Punta",
      "total_flat": "Total Llano",
      "total_valley": "Total Valle",
      "annual_consumption": "CONSUMO ANUAL [kWh/año]"
    },
    "months": {
      "january": "Enero",
      "february": "Febrero",
      "march": "Marzo",
      "april": "Abril",
      "may": "Mayo",
      "june": "Junio",
      "july": "Julio",
      "august": "Agosto",
      "september": "Septiembre",
      "october": "Octubre",
      "november": "Noviembre",
      "december": "Diciembre"
    }
  }
}
</i18n>
