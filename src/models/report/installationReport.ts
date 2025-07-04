/**
 * installationReport.ts
 *
 * This file defines the useInstallationReport function, which generates the content for the installation
 * section of the report.
 * The function retrieves data from the solar arrays store, including total installed power and annual production.
 * For each inverter, the report specifies the maker and model, followed by the number and type of panels in each string.
 */

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'

export function useInstallationReport() {
  const solarArraysStore = useSolarArraysStore()
  const invertersSetupStore = useInvertersSetupStore()

  const { t } = useI18n()

  const installationReportContent = computed(() => {
    return [
      {
        text: `${t('installationReport.photovoltaicInstallation')}`,
        style: 'subheader',
        pageBreak: 'before',
      },
      {
        ul: [
          {
            text: `${t('installationReport.installedPower')}: ${(solarArraysStore.totalPower / 1000).toFixed(2)} kW`,
          },
          {
            text: `${t('installationReport.annualProduction')}: ${solarArraysStore.pvgisAnnualProduction.toFixed(0)} kWh`,
          },
        ],
      },
      {
        text: `\n\n${t('installationReport.components')}:`,
      },
      ...invertersSetupStore.inverters
        .filter((inverter) => inverter.inverter)
        .flatMap((inverter) => [
          {
            text: `\n${t('installationReport.inverter')} ${inverter.inverter!.maker} ${inverter.inverter!.model}`,
          },
          ...inverter.setup.flatMap((mppt) =>
            mppt.strings.map((stringSetup) => ({
              text: `- ${stringSetup.panelNumber} ${t('installationReport.panels')} ${stringSetup.solarArray?.array.panel.maker} ${stringSetup.solarArray?.array.panel.model}`,
            })),
          ),
        ]),
    ];
  });

  return {
    installationReportContent,
  }
}
