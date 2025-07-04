<template>
  <div>
    <div class="grid grid-cols-2 gap-y-2 items-center">
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

    <div class="grid grid-cols-2 gap-y-2 items-center">
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

    <div class="grid grid-cols-2 gap-y-2 items-center">
      <label for="inflation" class="block font-medium mb-2">
        {{ t('roi.inflation') }}
      </label>
      <InputNumber
        id="inflation"
        :model-value="economicBalanceStore.inflation * 100"
        mode="decimal"
        showButtons
        :step="0.01"
        :maxFractionDigits="2"
        :minFractionDigits="2"
        :min="0"
        suffix="%"
        @update:model-value="(value) => (economicBalanceStore.inflation = value / 100)"
      />
    </div>

    <div class="grid grid-cols-2 gap-y-2 items-center">
      <label for="includeSurplus" class="block font-medium mb-2">
        {{ t('roi.includeSurplus') }}
      </label>
      <Checkbox id="includeSurplus" v-model="includeSurplus" binary />
    </div>

    <div class="grid grid-cols-2 gap-y-2 items-center">
      <label for="energyAnnualSavings" class="block font-medium mb-2">
        {{ t('roi.annualSavings') }}
      </label>
      <span id="energyAnnualSavings" class="font-semibold"> {{ formattedAnnualSavings }}€ </span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * RoiInput.vue
 *
 * This Vue component provides a form for entering and editing parameters related to the return
 * on investment (ROI) calculation, such as total installation cost, annual maintenance cost, and
 * annual inflation.
 * It allows the user to include or exclude surplus compensation in the calculation.
 * The component displays the calculated annual energy savings based on the provided values.
 *
 * Usage:
 * <RoiInput @updateIncludeSurplus="handler" />
 */
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEconomicBalanceStore } from '@/stores/economicBalance'

const emit = defineEmits(['updateIncludeSurplus'])

const { t } = useI18n()
const economicBalanceStore = useEconomicBalanceStore()

const includeSurplus = ref(true)

watch(includeSurplus, (value) => {
  emit('updateIncludeSurplus', value)
})

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
