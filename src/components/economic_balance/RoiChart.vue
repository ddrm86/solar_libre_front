<template>
  <div>
    <Chart
      ref="roiChart"
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="w-full h-100"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * RoiChart.vue
 *
 * This Vue component displays a line chart visualizing the return on investment (ROI) over 25 years.
 * It compares ROI with and without surplus compensation, using data provided via props.
 * The chart updates automatically when the data changes and saves a base64 image of the chart in
 * the store for the PDF reports.
 *
 * Usage:
 * <RoiChart :roiWithoutSurplus="array1" :roiWithSurplus="array2" />
 */
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance.ts'

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()

const props = defineProps({
  roiWithoutSurplus: {
    type: Array,
    required: true
  },
  roiWithSurplus: {
    type: Array,
    required: true
  }
})

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: Array.from({ length: 25 }, (_, i) => t('roi.year', { year: i + 1 })),
    datasets: [
      {
        label: t('roi.withoutSurplus'),
        data: props.roiWithoutSurplus,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-green-500'),
        tension: 0.4
      },
      {
        label: t('roi.withSurplus'),
        data: props.roiWithSurplus,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-blue-500'),
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
          color: (ctx: { tick: { value: number } }) => (ctx.tick.value === 0 ? 'red' : surfaceBorder),
          lineWidth: (ctx: { tick: { value: number } }) => (ctx.tick.value === 0 ? 2 : 1)
        }
      }
    },
    animation: {
      onComplete: () => {
        updateChartImage()
      },
    },
  }
})

const roiChart = ref()

const updateChartImage = () => {
  if (roiChart.value) {
    economicBalanceStore.roiChartImage = roiChart.value.getChart().toBase64Image()
  }
}
</script>

<i18n>
{
  "en": {
    "roi": {
      "year": "Year {year}",
      "withoutSurplus": "ROI without surplus",
      "withSurplus": "ROI with surplus"
    }
  },
  "es": {
    "roi": {
      "year": "Año {year}",
      "withoutSurplus": "ROI sin excedentes",
      "withSurplus": "ROI con excedentes"
    }
  }
}
</i18n>
