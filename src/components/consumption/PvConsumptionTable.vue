<template>
  <Card>
    <template #title>
    <h3 class="text-lg font-bold">{{ t('pvConsumptionTable.title') }}</h3>
    </template>
    <template #content>
    <DataTable :value="tableData" stripedRows>
      <Column field="month" :header="t('pvConsumptionTable.month')" />
      <Column field="peak" :header="t('pvConsumptionTable.peak')" :footer="`${t('pvConsumptionTable.totalPeak')}: ${totalPeak.toFixed(2)}`" />
      <Column field="flat" :header="t('pvConsumptionTable.flat')" :footer="`${t('pvConsumptionTable.totalFlat')}: ${totalFlat.toFixed(2)}`" />
      <Column field="valley" :header="t('pvConsumptionTable.valley')" :footer="`${t('pvConsumptionTable.totalValley')}: ${totalValley.toFixed(2)}`"/>
    </DataTable>
    </template>
    <template #footer>
      <h4 class="text-lg font-bold">
        {{ t('pvConsumptionTable.annualConsumption') }}:
        {{ (totalPeak + totalFlat + totalValley).toFixed(2) }}
      </h4>
      <p class="text-xs mt-1 text-slate-500">
        {{ t('pvConsumptionTable.disclaimer') }}
      </p>
      <p class="text-xs mt-1 text-slate-500">
        <a href="https://sunrisesunset.io/" target="_blank" rel="noopener">
          {{ t('pvConsumptionTable.poweredBy') }}
        </a>
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInputConsumptionStore } from '@/stores/inputConsumption'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const inputConsumptionStore = useInputConsumptionStore()

const tableData = computed(() => {
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
  return inputConsumptionStore.pvConsumptionsPerMonth.map((data, index) => ({
    month: months[index],
    peak: data.peak.toFixed(2),
    flat: data.flat.toFixed(2),
    valley: data.valley.toFixed(2),
  }))
})

const totalPeak = computed(() =>
  inputConsumptionStore.pvConsumptionsPerMonth.reduce((sum, data) => sum + data.peak, 0),
)
const totalFlat = computed(() =>
  inputConsumptionStore.pvConsumptionsPerMonth.reduce((sum, data) => sum + data.flat, 0),
)
const totalValley = computed(() =>
  inputConsumptionStore.pvConsumptionsPerMonth.reduce((sum, data) => sum + data.valley, 0),
)
</script>

<i18n>
{
  "en": {
    "pvConsumptionTable": {
      "title": "ENERGY CONSUMED PER MONTH [kWh] during photovoltaic production hours",
      "description": "Monthly consumption during photovoltaic production hours",
      "month": "Month",
      "peak": "Peak",
      "flat": "Flat",
      "valley": "Valley",
      "totalPeak": "Total Peak",
      "totalFlat": "Total Flat",
      "totalValley": "Total Valley",
      "annualConsumption": "ANNUAL CONSUMPTION [kWh/year] during photovoltaic production hours",
      "disclaimer": "Based on the average consumption distribution profile for a residential customer in Spain, calculated from: https://www.boe.es/eli/es/res/2024/12/23/(5)",
      "poweredBy": "Powered by SunriseSunset.io"
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
    "pvConsumptionTable": {
      "title": "ENERGÍA CONSUMIDA POR MES [kWh] en horas de producción fotovoltaica",
      "description": "Consumo mensual en horas de producción fotovoltaica",
      "month": "Mes",
      "peak": "Punta",
      "flat": "Llano",
      "valley": "Valle",
      "totalPeak": "Total Punta",
      "totalFlat": "Total Llano",
      "totalValley": "Total Valle",
      "annualConsumption": "CONSUMO ANUAL [kWh/año] en horas de producción fotovoltaica",
      "disclaimer": "Basado en el perfil de reparto de consumo medio para un cliente residencial en España, calculado a partir de: https://www.boe.es/eli/es/res/2024/12/23/(5)",
      "poweredBy": "Con tecnología de SunriseSunset.io"
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
