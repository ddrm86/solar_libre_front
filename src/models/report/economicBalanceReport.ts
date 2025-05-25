import { useEconomicBalanceStore } from '@/stores/economicBalance.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useEconomicBalanceReport() {
  const economicBalanceStore = useEconomicBalanceStore()

  const { t } = useI18n()

  const economicBalanceReportContent = computed(() => {
    const averageKwhCost = economicBalanceStore.averageKwhCost.withTaxes.toFixed(6)
    const compensationPerKwh = economicBalanceStore.energyCosts.compensationPerKwh.toFixed(2)

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
      }
    ]
  })

  return {
    economicBalanceReportContent,
  }
}
