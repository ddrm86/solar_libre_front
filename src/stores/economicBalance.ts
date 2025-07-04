/**
 * economicBalance.ts
 *
 * This file defines a Pinia store for managing the economic balance
 * of a project within the application. The store maintains reactive
 * state for energy costs, installation costs, inflation, and chart images.
 *
 * The store computes energy costs by time band, total energy costs,
 * and average kWh cost, both with and without taxes. It calculates
 * monthly and annual savings, including surplus compensation, based
 * on solar production and consumption data.
 *
 * Methods are provided to create a payload for saving cost information,
 * save cost data to the backend, and load cost data for a project.
 */

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
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import axios from 'axios'

export const useEconomicBalanceStore = defineStore('economic_balance', () => {
  const projectInfoStore = useProjectInfoStore()
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

  const createCostsPayload = () => {
    return {
      vat: energyCosts.value.iva,
      electric_tax: energyCosts.value.electricTax,
      peak_kwh_cost: energyCosts.value.peakKwhCost,
      flat_kwh_cost: energyCosts.value.flatKwhCost,
      valley_kwh_cost: energyCosts.value.valleyKwhCost,
      total_annual_cost: energyCosts.value.totalAnnualCost,
      compensation_per_kwh: energyCosts.value.compensationPerKwh,
      installation_cost: installationCosts.value.initialCost,
      maintenance_cost: installationCosts.value.annualMaintenanceCost,
      inflation: inflation.value,
      project_id: projectInfoStore.projectInfo.id,
    }
  }

  const saveCostsInfo = async () => {
    const payload = createCostsPayload()

    return axios
      .post(`/costs/`, payload)
      .then(() => {
      })
  }

  const loadCostsInfo = async () => {
    return axios
      .get(`/costs/${projectInfoStore.projectInfo.id}`)
      .then((response) => {
        const costs = response.data

        energyCosts.value.iva = costs.vat
        energyCosts.value.electricTax = costs.electric_tax
        energyCosts.value.peakKwhCost = costs.peak_kwh_cost
        energyCosts.value.flatKwhCost = costs.flat_kwh_cost
        energyCosts.value.valleyKwhCost = costs.valley_kwh_cost
        energyCosts.value.totalAnnualCost = costs.total_annual_cost
        energyCosts.value.compensationPerKwh = costs.compensation_per_kwh

        installationCosts.value.initialCost = costs.installation_cost
        installationCosts.value.annualMaintenanceCost = costs.maintenance_cost

        inflation.value = costs.inflation
      })
  }

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
    saveCostsInfo,
    loadCostsInfo,
  }
})
