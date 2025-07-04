<template>
  <div>
    <Chart
      ref="consumptionChart"
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="w-full h-100 2xl:h-full"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * InputConsumptionChart.vue
 *
 * This Vue component displays a line and bar chart of annual energy consumption data.
 * It visualizes monthly consumption values for peak, flat, and valley periods, as well as
 * estimated consumption during PV hours.
 * The chart data and appearance are dynamically generated from the inputConsumptionStore.
 * After rendering, the chart image is updated and stored for the PDF report.
 *
 * Usage:
 * <InputConsumptionChart />
 */
import { computed, ref } from 'vue'
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
    t('months.december'),
  ]

  const consumptions = inputConsumptionStore.consumption.consumptionsPerMonth
  const pvConsumptions = inputConsumptionStore.pvConsumptionsPerMonth

  return {
    labels: months,
    datasets: [
      {
        label: t('energy_consumption.peak'),
        data: consumptions.map((c) => c.peak),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-500'),
        tension: 0.4,
      },
      {
        label: t('energy_consumption.flat'),
        data: consumptions.map((c) => c.flat),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-yellow-500'),
        tension: 0.4,
      },
      {
        label: t('energy_consumption.valley'),
        data: consumptions.map((c) => c.valley),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-green-500'),
        tension: 0.4,
      },
      {
        label: t('energy_consumption.pv_peak'),
        data: pvConsumptions.map((c) => c.peak),
        backgroundColor: documentStyle.getPropertyValue('--p-red-200'),
        type: 'bar',
      },
      {
        label: t('energy_consumption.pv_flat'),
        data: pvConsumptions.map((c) => c.flat),
        backgroundColor: documentStyle.getPropertyValue('--p-yellow-200'),
        type: 'bar',
      },
      {
        label: t('energy_consumption.pv_valley'),
        data: pvConsumptions.map((c) => c.valley),
        backgroundColor: documentStyle.getPropertyValue('--p-green-200'),
        type: 'bar',
      },
    ],
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
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
    animation: {
      onComplete: () => {
        updateChartImage()
      },
    },
  }
})

const consumptionChart = ref()

const updateChartImage = () => {
  if (consumptionChart.value)  {
    inputConsumptionStore.consumptionChartImage = consumptionChart.value.getChart().toBase64Image()
  }
}
</script>

<i18n>
{
  "en": {
    "energy_consumption": {
      "title": "ANNUAL ENERGY CONSUMPTION [kWh]",
      "peak": "Peak",
      "flat": "Flat",
      "valley": "Valley",
      "pv_peak": "Peak during PV hours",
      "pv_flat": "Flat during PV hours",
      "pv_valley": "Valley during PV hours"
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
      "valley": "Valle",
      "pv_peak": "Punta en horas FV",
      "pv_flat": "Llano en horas FV",
      "pv_valley": "Valle en horas FV"
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
