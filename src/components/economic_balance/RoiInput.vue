<template>
  <div>
    <div class="flex gap-4 items-center">
      <label for="initialCost" class="block font-medium mb-2">
        {{ t('roi.initialCost') }}
      </label>
      <InputNumber
        id="initialCost"
        mode="decimal"
        showButtons
        :step="100"
        :maxFractionDigits="2"
        :minFractionDigits="2"
        :min="0"
        suffix="€"
        v-model="economicBalanceStore.installationCosts.initialCost"
      />
    </div>

    <div class="flex gap-4 items-center">
      <label for="annualMaintenanceCost" class="block font-medium mb-2">
        {{ t('roi.annualMaintenanceCost') }}
      </label>
      <InputNumber
        id="annualMaintenanceCost"
        mode="decimal"
        showButtons
        :step="10"
        :maxFractionDigits="2"
        :minFractionDigits="2"
        :min="0"
        suffix="€"
        v-model="economicBalanceStore.installationCosts.annualMaintenanceCost"
      />
    </div>

    <div class="flex gap-4 items-center">
      <label for="inflation" class="block font-medium mb-2">
        {{ t('roi.inflation') }}
      </label>
      <InputNumber
        id="inflation"
        mode="decimal"
        showButtons
        :step="0.01"
        :maxFractionDigits="2"
        :minFractionDigits="2"
        :min="0"
        suffix="%"
        v-model="economicBalanceStore.inflation"
      />
    </div>

    <div class="flex gap-4 items-center">
      <label for="includeSurplus" class="block font-medium mb-2">
        {{ t('roi.includeSurplus') }}
      </label>
      <Checkbox
        id="includeSurplus"
        v-model="includeSurplus"
        binary
      />
    </div>

    <div class="flex gap-4 items-center">
      <label for="energyAnnualSavings" class="block font-medium mb-2">
        {{ t('roi.annualSavings') }}
      </label>
      <span id="energyAnnualSavings" class="font-semibold">
        {{ formattedAnnualSavings }}€
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance'

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()

const includeSurplus = ref(true)

const formattedAnnualSavings = computed(() => {
  const savings = economicBalanceStore.annualSavings.withoutCompensation
  const surplus = includeSurplus.value ? economicBalanceStore.annualSavings.surplus : 0
  return (savings + surplus).toFixed(2)
})
</script>

<i18n>
{
  "en": {
    "roi": {
      "initialCost": "Total installation cost",
      "annualMaintenanceCost": "Annual maintenance cost",
      "inflation": "Annual inflation",
      "includeSurplus": "Include surplus compensation",
      "annualSavings": "Annual energy savings"
    }
  },
  "es": {
    "roi": {
      "initialCost": "Coste total de la instalación",
      "annualMaintenanceCost": "Mantenimiento anual",
      "inflation": "Inflación anual",
      "includeSurplus": "Incluir compensación de excedentes",
      "annualSavings": "Ahorro de energía anual"
    }
  }
}
</i18n>
