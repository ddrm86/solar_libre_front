<template>
  <div>
    <h2 class="text-lg font-semibold pb-4">{{ t('energy_costs.title') }}</h2>
    <div class="md:grid grid-cols-2 gap-x-16 gap-y-2">
      <div>
        <div class="grid grid-cols-2 gap-2 items-center pt-2">
          <label for="iva">{{ t('energy_costs.iva') }}</label>
          <InputNumber
            id="iva"
            :model-value="energyCosts.iva * 100"
            mode="decimal"
            :maxFractionDigits="2"
            :min="0"
            suffix="%"
            @update:model-value="(value) => (energyCosts.iva = value / 100)"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 items-center pt-2">
          <label for="electricTax">{{ t('energy_costs.electricTax') }}</label>
          <InputNumber
            id="electricTax"
            :model-value="energyCosts.electricTax * 100"
            mode="decimal"
            :min="0"
            :maxFractionDigits="6"
            suffix="%"
            @update:model-value="(value) => (energyCosts.electricTax = value / 100)"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 items-center pt-2">
          <label for="totalAnnualCost">{{ t('energy_costs.totalAnnualCost') }}</label>
          <InputNumber
            id="totalAnnualCost"
            v-model="energyCosts.totalAnnualCost"
            mode="decimal"
            minFractionDigits="2"
            maxFractionDigits="2"
            suffix="€"
          />
        </div>
      </div>
      <div>
        <div class="grid grid-cols-2 gap-2 items-center pt-2">
          <label for="peakKwhCost">{{ t('energy_costs.peakKwhCost') }}</label>
          <InputNumber
            id="peakKwhCost"
            v-model="energyCosts.peakKwhCost"
            mode="decimal"
            minFractionDigits="6"
            maxFractionDigits="6"
            suffix="€/kWh"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 items-center pt-2">
          <label for="flatKwhCost">{{ t('energy_costs.flatKwhCost') }}</label>
          <InputNumber
            id="flatKwhCost"
            v-model="energyCosts.flatKwhCost"
            mode="decimal"
            minFractionDigits="6"
            maxFractionDigits="6"
            suffix="€/kWh"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 items-center pt-2">
          <label for="valleyKwhCost">{{ t('energy_costs.valleyKwhCost') }}</label>
          <InputNumber
            id="valleyKwhCost"
            v-model="energyCosts.valleyKwhCost"
            mode="decimal"
            minFractionDigits="6"
            maxFractionDigits="6"
            suffix="€/kWh"
          />
        </div>
      </div>
    </div>

    <h3 class="font-semibold pt-4 pb-4">{{ t('energy_costs.costs_summary') }}</h3>
    <div>
      <div class="flex gap-2">
        <label for="peakCost">{{ t('energy_costs.peak') }}</label>
        <p id="peakCost">{{ energyCostByTimeBand.peak.toFixed(2) }}€ / {{ energyCostByTimeBand.peakWithTaxes.toFixed(2) }}€</p>
      </div>
      <div class="flex gap-2">
        <label for="flatCost">{{ t('energy_costs.flat') }}</label>
        <p id="flatCost">{{ energyCostByTimeBand.flat.toFixed(2) }}€ / {{ energyCostByTimeBand.flatWithTaxes.toFixed(2) }}€</p>
      </div>
      <div class="flex gap-2">
        <label for="valleyCost">{{ t('energy_costs.valley') }}</label>
        <p id="valleyCost">{{ energyCostByTimeBand.valley.toFixed(2) }}€ / {{ energyCostByTimeBand.valleyWithTaxes.toFixed(2) }}€</p>
      </div>
      <div class="flex gap-2">
        <label for="totalCost">{{ t('energy_costs.total') }}</label>
        <p id="totalCost">{{ energyCostTotal.withoutTaxes.toFixed(2) }}€ / {{ energyCostTotal.withTaxes.toFixed(2) }}€</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEconomicBalanceStore } from '@/stores/economicBalance'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()

const energyCosts = economicBalanceStore.energyCosts
const energyCostByTimeBand = economicBalanceStore.energyCostByTimeBand
const energyCostTotal = economicBalanceStore.energyCostTotal
</script>

<i18n>
{
  "en": {
    "energy_costs": {
      "title": "Energy costs",
      "iva": "VAT",
      "electricTax": "Electric tax",
      "peakKwhCost": "Peak kWh cost",
      "flatKwhCost": "Flat kWh cost",
      "valleyKwhCost": "Valley kWh cost",
      "totalAnnualCost": "Total annual cost",
      "costs_summary": "Costs summary",
      "peak": "Peak",
      "flat": "Flat",
      "valley": "Valley",
      "total": "Total"
    }
  },
  "es": {
    "energy_costs": {
      "title": "Costes energéticos",
      "iva": "IVA",
      "electricTax": "Impuesto eléctrico",
      "peakKwhCost": "Coste por kWh punta",
      "flatKwhCost": "Coste por kWh llano",
      "valleyKwhCost": "Coste por kWh valle",
      "totalAnnualCost": "Coste anual total",
      "costs_summary": "Resumen de costes",
      "peak": "Punta",
      "flat": "Llano",
      "valley": "Valle",
      "total": "Total"
    }
  }
}
</i18n>
