<template>
  <Card>
    <template #title>
      <h2 class="text-lg font-semibold pb-4">{{ t('energy_costs.title') }}</h2>
    </template>
    <template #content>
      <div class="md:grid grid-cols-2 gap-x-16 gap-y-2">
        <div>
          <div class="grid grid-cols-2 gap-2 items-center pt-2">
            <label for="iva">{{ t('energy_costs.iva') }}</label>
            <InputNumber
              id="iva"
              :model-value="economicBalanceStore.energyCosts.iva * 100"
              mode="decimal"
              :maxFractionDigits="2"
              :min="0"
              suffix="%"
              @update:model-value="(value) => (economicBalanceStore.energyCosts.iva = value / 100)"
            />
          </div>
          <div class="grid grid-cols-2 gap-2 items-center pt-2">
            <label for="electricTax">{{ t('energy_costs.electricTax') }}</label>
            <InputNumber
              id="electricTax"
              :model-value="economicBalanceStore.energyCosts.electricTax * 100"
              mode="decimal"
              :min="0"
              :maxFractionDigits="6"
              suffix="%"
              @update:model-value="
                (value) => (economicBalanceStore.energyCosts.electricTax = value / 100)
              "
            />
          </div>
          <div class="grid grid-cols-2 gap-2 items-center pt-2">
            <label for="totalAnnualCost">{{ t('energy_costs.totalAnnualCost') }}</label>
            <InputNumber
              id="totalAnnualCost"
              v-model="economicBalanceStore.energyCosts.totalAnnualCost"
              mode="decimal"
              :minFractionDigits="2"
              :maxFractionDigits="2"
              suffix="€"
            />
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-2 items-center pt-2">
            <label for="peakKwhCost">{{ t('energy_costs.peakKwhCost') }}</label>
            <InputNumber
              id="peakKwhCost"
              data-testid="peakKwhCost"
              v-model="economicBalanceStore.energyCosts.peakKwhCost"
              mode="decimal"
              :minFractionDigits="6"
              :maxFractionDigits="6"
              suffix="€/kWh"
            />
          </div>
          <div class="grid grid-cols-2 gap-2 items-center pt-2">
            <label for="flatKwhCost">{{ t('energy_costs.flatKwhCost') }}</label>
            <InputNumber
              id="flatKwhCost"
              data-testid="flatKwhCost"
              v-model="economicBalanceStore.energyCosts.flatKwhCost"
              mode="decimal"
              :minFractionDigits="6"
              :maxFractionDigits="6"
              suffix="€/kWh"
            />
          </div>
          <div class="grid grid-cols-2 gap-2 items-center pt-2">
            <label for="valleyKwhCost">{{ t('energy_costs.valleyKwhCost') }}</label>
            <InputNumber
              id="valleyKwhCost"
              data-testid="valleyKwhCost"
              v-model="economicBalanceStore.energyCosts.valleyKwhCost"
              mode="decimal"
              :minFractionDigits="6"
              :maxFractionDigits="6"
              suffix="€/kWh"
            />
          </div>
        </div>
      </div>

      <h3 class="font-semibold pt-8 pb-2">{{ t('energy_costs.costs_summary') }}</h3>
      <div class="grid grid-cols-3 gap-2 items-center">
        <div></div>
        <div class="font-semibold text-center">{{ t('energy_costs.withoutTaxes') }}</div>
        <div class="font-semibold text-center">{{ t('energy_costs.withTaxes') }}</div>

        <div class="font-semibold">{{ t('energy_costs.peak') }}</div>
        <div class="text-center">
          {{ economicBalanceStore.energyCostByTimeBand.peak.toFixed(2) }}€
        </div>
        <div class="text-center">
          {{ economicBalanceStore.energyCostByTimeBand.peakWithTaxes.toFixed(2) }}€
        </div>

        <div class="font-semibold">{{ t('energy_costs.flat') }}</div>
        <div class="text-center">
          {{ economicBalanceStore.energyCostByTimeBand.flat.toFixed(2) }}€
        </div>
        <div class="text-center">
          {{ economicBalanceStore.energyCostByTimeBand.flatWithTaxes.toFixed(2) }}€
        </div>

        <div class="font-semibold">{{ t('energy_costs.valley') }}</div>
        <div class="text-center">
          {{ economicBalanceStore.energyCostByTimeBand.valley.toFixed(2) }}€
        </div>
        <div class="text-center">
          {{ economicBalanceStore.energyCostByTimeBand.valleyWithTaxes.toFixed(2) }}€
        </div>

        <div class="col-span-full">
          <Divider />
        </div>

        <div class="font-bold">{{ t('energy_costs.total') }}</div>
        <div class="font-medium text-center">
          {{ economicBalanceStore.energyCostTotal.withoutTaxes.toFixed(2) }}€
        </div>
        <div class="font-medium text-center">
          {{ economicBalanceStore.energyCostTotal.withTaxes.toFixed(2) }}€
        </div>

        <div class="font-bold">{{ t('energy_costs.averageKwhCost') }}</div>
        <div class="font-medium text-center">
          {{ economicBalanceStore.averageKwhCost.withoutTaxes.toFixed(6) }}€
        </div>
        <div class="font-medium text-center">
          {{ economicBalanceStore.averageKwhCost.withTaxes.toFixed(6) }}€
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
/**
 * EnergyCosts.vue
 *
 * This Vue component displays a form for entering and editing energy cost parameters, such as
 * VAT, electric tax, total annual cost, and kWh costs for different time bands (peak, flat, valley).
 * It also shows a summary table with calculated energy costs, both with and without taxes,
 * for each time band and totals.
 *
 * Usage:
 * <EnergyCosts />
 */
import { useEconomicBalanceStore } from '@/stores/economicBalance'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()
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
      "averageKwhCost": "Average kWh cost",
      "totalAnnualCost": "Total annual cost of invoices",
      "costs_summary": "Costs summary",
      "withoutTaxes": "Without taxes",
      "withTaxes": "With taxes",
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
      "averageKwhCost": "Coste medio por kWh",
      "totalAnnualCost": "Coste anual total de las facturas",
      "costs_summary": "Resumen de costes",
      "withoutTaxes": "Sin impuestos",
      "withTaxes": "Con impuestos",
      "peak": "Punta",
      "flat": "Llano",
      "valley": "Valle",
      "total": "Total"
    }
  }
}
</i18n>
