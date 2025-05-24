<template>
  <div>
    <DataTable :value="roiData" size="small" stripedRows>
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
import { computed, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance'

const props = defineProps({
  includeSurplus: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['updateRoiData'])

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()

const roiData = computed(() => {
  const inflation = economicBalanceStore.inflation
  const initialCost = economicBalanceStore.installationCosts.initialCost
  const annualMaintenanceCost = economicBalanceStore.installationCosts.annualMaintenanceCost
  const totalAnnualCost = economicBalanceStore.energyCosts.totalAnnualCost
  const baseAnnualSavings = economicBalanceStore.annualSavings.withoutCompensation
  const surplusSavings = economicBalanceStore.annualSavings.surplus

  const data = []
  const roiWithoutSurplus = []
  const roiWithSurplus = []
  let cumulativeSavingsWithoutSurplus = 0
  let cumulativeSavingsWithSurplus = 0

  for (let year = 1; year <= 25; year++) {
    const annualBill = totalAnnualCost * Math.pow(1 + inflation, year - 1)
    const maintenance = annualMaintenanceCost * Math.pow(1 + inflation, year - 1)
    const annualSavingsWithoutSurplus = baseAnnualSavings * Math.pow(1 + inflation, year - 1) - maintenance
    const annualSavingsWithSurplus = annualSavingsWithoutSurplus + surplusSavings * Math.pow(1 + inflation, year - 1)

    cumulativeSavingsWithoutSurplus += annualSavingsWithoutSurplus
    cumulativeSavingsWithSurplus += annualSavingsWithSurplus

    const roiWithout = cumulativeSavingsWithoutSurplus - initialCost
    const roiWith = cumulativeSavingsWithSurplus - initialCost

    roiWithoutSurplus.push(roiWithout.toFixed(2))
    roiWithSurplus.push(roiWith.toFixed(2))

    data.push({
      year,
      annualBill: annualBill.toFixed(2),
      maintenance: maintenance.toFixed(2),
      annualSavings: (props.includeSurplus ? annualSavingsWithSurplus : annualSavingsWithoutSurplus).toFixed(2),
      annualBillWithPV: (annualBill - (props.includeSurplus ? annualSavingsWithSurplus : annualSavingsWithoutSurplus)).toFixed(2),
      cumulativeSavings: (props.includeSurplus ? cumulativeSavingsWithSurplus : cumulativeSavingsWithoutSurplus).toFixed(2),
      roi: (props.includeSurplus ? roiWith : roiWithout).toFixed(2)
    })
  }

  emit('updateRoiData', { roiWithoutSurplus, roiWithSurplus })

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
