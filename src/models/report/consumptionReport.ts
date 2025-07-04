/**
 * consumptionReport.ts
 *
 * This file defines the useConsumptionReport composable function, which is responsible for generating
 * the content of the consumption section of the report.
 * The function imports and utilizes the input consumption store to access relevant consumption data,
 * such as total annual consumption and photovoltaic (PV) hours consumption.
 * Additionally, the report includes a chart image representing the consumption data,
 * with a specified width for display purposes.
 */

import { useInputConsumptionStore } from '@/stores/inputConsumption.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useConsumptionReport() {
  const inputConsumptionStore = useInputConsumptionStore()

  const { t } = useI18n()

  const consumptionReportContent = computed(() => {
    const annualConsumption = inputConsumptionStore.totalConsumption
    const pvHoursConsumption = inputConsumptionStore.totalPvConsumption
    const pvPercentage = ((pvHoursConsumption / annualConsumption) * 100).toFixed(0)

    return [
      {
        text: `${t('consumptionReport.header')}`,
        style: 'subheader',
      },
      {
        ul: [
          {
            text: `${t('consumptionReport.annualConsumption')}: ${annualConsumption} kWh`,
          },
          {
            text: `${t('consumptionReport.pvHoursConsumption')}: ${pvHoursConsumption.toFixed(0)} kWh (${pvPercentage}%)\n\n`,
          },
        ],
      },
      {
        image: inputConsumptionStore.consumptionChartImage,
        width: 500,
      }
    ]
  })

  return {
    consumptionReportContent,
  }
}
