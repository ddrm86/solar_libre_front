<template>
  <div>
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="w-full h-100"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInputConsumptionStore } from '@/stores/inputConsumption'
import { useEconomicBalanceStore } from '@/stores/economicBalance'
import { useSolarArraysStore } from '@/stores/solarArrays'

const { t } = useI18n()
const inputConsumptionStore = useInputConsumptionStore()
const economicBalanceStore = useEconomicBalanceStore()
const solarArraysStore = useSolarArraysStore()

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

  const totalConsumptionPerMonth = inputConsumptionStore.totalConsumptionPerMonth
  const totalPvConsumptionPerMonth = inputConsumptionStore.totalPvConsumptionPerMonth
  const pvgisProductionPerMonth = solarArraysStore.pvgisProductionPerMonth
  const averageKwhCost = economicBalanceStore.averageKwhCost.withTaxes
  const compensationPerKwh = economicBalanceStore.energyCosts.compensationPerKwh

  const savingsWithoutCompensation = pvgisProductionPerMonth.map((production, index) => {
    return Math.min(production, totalPvConsumptionPerMonth[index]) * averageKwhCost
  })

  const surplus = pvgisProductionPerMonth.map((production, index) => {
    return Math.max(0, production - totalPvConsumptionPerMonth[index]) * compensationPerKwh
  })

  const monthlyCosts = totalConsumptionPerMonth.map((consumption) => {
    return consumption * averageKwhCost
  })

  return {
    labels: months,
    datasets: [
      {
        label: t('cost_savings.expenses'),
        data: monthlyCosts,
        type: 'line',
        borderColor: documentStyle.getPropertyValue('--p-red-500'),
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: t('cost_savings.savings_without_compensation'),
        data: savingsWithoutCompensation,
        backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
        stack: 'savings'
      },
      {
        label: t('cost_savings.surplus'),
        data: surplus,
        backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
        stack: 'savings'
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
        stacked: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        stacked: true,
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
    "cost_savings": {
      "expenses": "Monthly Expenses",
      "savings_without_compensation": "Savings without Compensation",
      "surplus": "Surplus compensation"
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
    "cost_savings": {
      "expenses": "Gastos Mensuales",
      "savings_without_compensation": "Ahorros sin Compensación",
      "surplus": "Compensación de excedentes"
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
