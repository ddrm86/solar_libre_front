<template>
  <Card>
    <template #content>
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="h-[30rem]"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInputConsumptionStore } from '@/stores/inputConsumption'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const inputConsumptionStore = useInputConsumptionStore()

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)
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

  const consumptions = inputConsumptionStore.consumption.consumptionsPerMonth

  return {
    labels: months,
    datasets: [
      {
        label: t('energy_consumption.peak'),
        data: consumptions.map((c) => c.peak),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-500'),
        tension: 0.4
      },
      {
        label: t('energy_consumption.flat'),
        data: consumptions.map((c) => c.flat),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-yellow-500'),
        tension: 0.4
      },
      {
        label: t('energy_consumption.valley'),
        data: consumptions.map((c) => c.valley),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-green-500'),
        tension: 0.4
      }
    ]
  }
})

const chartOptions = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  }
})
</script>

<i18n>
{
  "en": {
    "energy_consumption": {
      "title": "ANNUAL ENERGY CONSUMPTION [kWh]",
      "peak": "Peak",
      "flat": "Flat",
      "valley": "Valley"
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
      "title": "ENERGÍA CONSUMIDA ANUALMENTE [kWh]",
      "peak": "Punta",
      "flat": "Llano",
      "valley": "Valle"
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
