import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CEnergyCosts, type IEnergyCosts } from '@/models/economic_balance/energyCosts'
import { useInputConsumptionStore } from '@/stores/inputConsumption'

export const useEconomicBalanceStore = defineStore('economic_balance', () => {
  const energyCosts = ref<IEnergyCosts>(new CEnergyCosts())
  const inputConsumptionStore = useInputConsumptionStore()

  const energyCostByTimeBand = computed(() => {
    const { peak, flat, valley } = inputConsumptionStore.consumptionByTimeBand
    const taxMultiplier = (1 + energyCosts.value.iva) * (1 + energyCosts.value.electricTax)
    return {
      peak: peak * energyCosts.value.peakKwhCost,
      flat: flat * energyCosts.value.flatKwhCost,
      valley: valley * energyCosts.value.valleyKwhCost,
      peakWithTaxes: peak * energyCosts.value.peakKwhCost * taxMultiplier,
      flatWithTaxes: flat * energyCosts.value.flatKwhCost * taxMultiplier,
      valleyWithTaxes: valley * energyCosts.value.valleyKwhCost * taxMultiplier,
    }
  })

  const energyCostTotal = computed(() => {
    return {
      withoutTaxes:
        energyCostByTimeBand.value.peak +
        energyCostByTimeBand.value.flat +
        energyCostByTimeBand.value.valley,
      withTaxes:
        energyCostByTimeBand.value.peakWithTaxes +
        energyCostByTimeBand.value.flatWithTaxes +
        energyCostByTimeBand.value.valleyWithTaxes,
    }
  })

  return { energyCosts, energyCostByTimeBand, energyCostTotal }
})
