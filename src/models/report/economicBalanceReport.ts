/**
 * economicBalanceReport.ts
 *
 * This file defines the useEconomicBalanceReport function, which generates the content for the
 * economic balance section of the report.
 * It retrieves data from the economic balance store, including average kWh cost, compensation per kWh,
 * installation costs, annual maintenance cost, inflation, and annual savings.
 *
 * Additionally, the report includes a chart image representing return of investment data.
 */

import { useEconomicBalanceStore } from '@/stores/economicBalance.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useEconomicBalanceReport() {
  const economicBalanceStore = useEconomicBalanceStore()

  const { t } = useI18n()

  const economicBalanceReportContent = computed(() => {
    const averageKwhCost = economicBalanceStore.averageKwhCost.withTaxes.toFixed(6)
    const compensationPerKwh = economicBalanceStore.energyCosts.compensationPerKwh.toFixed(2)
    const initialCost = economicBalanceStore.installationCosts.initialCost.toFixed(2)
    const annualMaintenanceCost =
      economicBalanceStore.installationCosts.annualMaintenanceCost.toFixed(2)
    const inflation = (economicBalanceStore.inflation * 100).toFixed(2)
    const annualSavingsWithoutCompensation =
      economicBalanceStore.annualSavings.withoutCompensation.toFixed(2)
    const annualSavingsWithCompensation = (
      economicBalanceStore.annualSavings.withoutCompensation +
      economicBalanceStore.annualSavings.surplus
    ).toFixed(2)

    return [
      {
        text: `${t('economicBalanceReport.header')}`,
        style: 'subheader',
        pageBreak: 'before',
      },
      {
        text: `\n${t('economicBalanceReport.savings')}`,
        bold: true,
      },
      {
        ul: [
          {
            text: `${t('economicBalanceReport.averageKwhCost')}: ${averageKwhCost}€`,
          },
          {
            text: `${t('economicBalanceReport.compensationPerKwh')}: ${compensationPerKwh}€ ${t('economicBalanceReport.perKwh')}\n\n`,
          },
        ],
      },
      {
        image: economicBalanceStore.savingsChartImage,
        width: 500,
      },
      {
        text: `\n${t('economicBalanceReport.investmentReturn')}`,
        bold: true,
      },
      {
        ul: [
          {
            text: `${t('economicBalanceReport.totalInstallationCost')}: ${initialCost}€`,
          },
          {
            text: `${t('economicBalanceReport.annualMaintenanceCost')}: ${annualMaintenanceCost}€`,
          },
          {
            text: `${t('economicBalanceReport.annualInflation')}: ${inflation}%`,
          },
          {
            text: `${t('economicBalanceReport.annualEnergySavings')}: ${t('economicBalanceReport.withoutSurpluses')}: ${annualSavingsWithoutCompensation}€ ${t('economicBalanceReport.withSurpluses')}: ${annualSavingsWithCompensation}€\n\n`,
          },
        ],
      },
      {
        image: economicBalanceStore.roiChartImage,
        width: 500,
      },
    ]
  })

  return {
    economicBalanceReportContent,
  }
}
