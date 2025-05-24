<template>
  <div>
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="w-full h-100"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    }
  }
})
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
