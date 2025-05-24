<template>
  <div>
    <DataTable :value="roiData" class="p-datatable-sm">
      <Column field="year" :header="t('roi.year')" />
      <Column field="annualBill" :header="t('roi.annualBill')" />
      <Column field="maintenance" :header="t('roi.maintenance')" />
      <Column field="annualSavings" :header="t('roi.annualSavings')" />
      <Column field="annualBillWithPV" :header="t('roi.annualBillWithPV')" />
      <Column field="cumulativeSavings" :header="t('roi.cumulativeSavings')" />
      <Column field="roi" :header="t('roi.roi')" />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance'

const props = defineProps({
  includeSurplus: {
    type: Boolean,
    required: true
  }
})

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()

const roiData = computed(() => {
  const inflation = economicBalanceStore.inflation
  const initialCost = economicBalanceStore.installationCosts.initialCost
  const annualMaintenanceCost = economicBalanceStore.installationCosts.annualMaintenanceCost
  const totalAnnualCost = economicBalanceStore.energyCosts.totalAnnualCost
  const baseAnnualSavings = economicBalanceStore.annualSavings.withoutCompensation +
    (props.includeSurplus ? economicBalanceStore.annualSavings.surplus : 0)

  const data = []
  let cumulativeSavings = 0

  for (let year = 1; year <= 25; year++) {
    const annualBill = totalAnnualCost * Math.pow(1 + inflation, year - 1)
    const maintenance = annualMaintenanceCost * Math.pow(1 + inflation, year - 1)
    const annualSavings = baseAnnualSavings * Math.pow(1 + inflation, year - 1) - maintenance
    const annualBillWithPV = annualBill - annualSavings
    cumulativeSavings += annualSavings
    const roi = cumulativeSavings - initialCost

    data.push({
      year,
      annualBill: annualBill.toFixed(2),
      maintenance: maintenance.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      annualBillWithPV: annualBillWithPV.toFixed(2),
      cumulativeSavings: cumulativeSavings.toFixed(2),
      roi: roi.toFixed(2)
    })
  }

  return data
})
</script>

<i18n>
{
  "en": {
    "roi": {
      "year": "Year",
      "annualBill": "Annual Bill",
      "maintenance": "Maintenance",
      "annualSavings": "Annual Savings",
      "annualBillWithPV": "Annual Bill with PV",
      "cumulativeSavings": "Cumulative Savings",
      "roi": "ROI"
    }
  },
  "es": {
    "roi": {
      "year": "Año",
      "annualBill": "Factura Anual",
      "maintenance": "Mantenimiento",
      "annualSavings": "Ahorro Anual",
      "annualBillWithPV": "Factura anual con FV",
      "cumulativeSavings": "Ahorro Acumulado",
      "roi": "ROI"
    }
  }
}
</i18n>
