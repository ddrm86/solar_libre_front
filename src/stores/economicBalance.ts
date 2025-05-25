import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CEnergyCosts, type IEnergyCosts } from '@/models/economic_balance/energyCosts'
import { useInputConsumptionStore } from '@/stores/inputConsumption'
import {
  CInstallationCosts,
  type IInstallationCosts,
} from '@/models/economic_balance/installationCosts.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { chartPlaceholderPicture } from '@/models/report/chartPlaceholderPicture.ts'

export const useEconomicBalanceStore = defineStore('economic_balance', () => {
  const solarArraysStore = useSolarArraysStore()
  const inputConsumptionStore = useInputConsumptionStore()

  const energyCosts = ref<IEnergyCosts>(new CEnergyCosts())
  const installationCosts = ref<IInstallationCosts>(new CInstallationCosts())
  const inflation = ref<number>(0.02)

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

  const averageKwhCost = computed(() => {
    return {
      withoutTaxes:
        inputConsumptionStore.totalConsumption === 0
          ? 0
          : energyCostTotal.value.withoutTaxes / inputConsumptionStore.totalConsumption,
      withTaxes:
        inputConsumptionStore.totalConsumption === 0
          ? 0
          : energyCostTotal.value.withTaxes / inputConsumptionStore.totalConsumption,
    }
  })

  const savingsWithoutCompensation = computed(() => {
    return solarArraysStore.pvgisProductionPerMonth.map((production, index) => {
      return Math.min(production, inputConsumptionStore.totalPvConsumptionPerMonth[index]) * averageKwhCost.value.withTaxes
    })
  })

  const surplus = computed(() => {
    return solarArraysStore.pvgisProductionPerMonth.map((production, index) => {
      return Math.max(0, production - inputConsumptionStore.totalPvConsumptionPerMonth[index]) * energyCosts.value.compensationPerKwh
    })
  })

  const monthlyCosts = computed(() => {
    return inputConsumptionStore.totalConsumptionPerMonth.map((consumption) => {
      return consumption * averageKwhCost.value.withTaxes
    })
  })

  const annualSavings = computed(() => {
    return {
      withoutCompensation: savingsWithoutCompensation.value.reduce((total, saving) => total + saving, 0),
      surplus: surplus.value.reduce((total, surplusValue) => total + surplusValue, 0),
    }
  })

  const savingsChartImage = ref(chartPlaceholderPicture)

  const roiChartImage = ref(chartPlaceholderPicture)

  return {
    energyCosts,
    energyCostByTimeBand,
    energyCostTotal,
    averageKwhCost,
    installationCosts,
    inflation,
    savingsWithoutCompensation,
    surplus,
    monthlyCosts,
    annualSavings,
    savingsChartImage,
    roiChartImage,
  }
})
