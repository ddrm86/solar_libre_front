<template>
  <Button
    icon="pi pi-file-pdf"
    variant="text"
    severity="secondary"
    size="large"
    @click="generatePdfReport"
  />
</template>

<script setup lang="ts">
/**
 * PdfReportGenerator.vue
 *
 * This Vue component renders a button to generate and open a PDF report for the current project.
 * When clicked, it compiles report sections using data from various report models and creates a
 * PDF using pdfMake.
 * The generated PDF includes project information, electricity consumption, installation details,
 * and economic balance.
 *
 * Usage:
 * <PdfReportGenerator />
 */
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { useI18n } from "vue-i18n";
import { useProjectInfoReport } from '@/models/report/projectInfoReport.ts'
import { computed } from 'vue'
import { useConsumptionReport } from '@/models/report/consumptionReport.ts'
import { useInstallationReport } from '@/models/report/installationReport.ts'
import { useEconomicBalanceReport } from '@/models/report/economicBalanceReport.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const { t } = useI18n();

const { projectInfoReportContent } = useProjectInfoReport()
const { consumptionReportContent } = useConsumptionReport()
const { installationReportContent } = useInstallationReport()
const { economicBalanceReportContent } = useEconomicBalanceReport()

const pdfDefinition = computed<TDocumentDefinitions>(() => ({
  content: [
    {
      text: `${t("report.title")}\n\n`,
      style: "header",
    },
    ...projectInfoReportContent.value,
    '\n\n',
    ...consumptionReportContent.value,
    '\n\n',
    ...installationReportContent.value,
    '\n\n',
    ...economicBalanceReportContent.value,
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
    },
    subheader: {
      fontSize: 15,
      bold: true,
      decoration: "underline",
      lineHeight: 2.0,
    },
  },
  defaultStyle: {
    lineHeight: 1.2,
  },
}));

const generatePdfReport = () => {
  // pdfMake modifies the pdfDefinition object at will, so we need to create a deep copy
  const pdfDefinitionCopy = JSON.parse(JSON.stringify(pdfDefinition.value));
  pdfMake.createPdf(pdfDefinitionCopy).open();
};
</script>

<i18n>
{
  "en": {
    "report": {
      "title": "SolarLibre Report"
    },
    "projectInfo": {
      "projectInfo": "Project information",
      "name": "Project name",
      "address": "Address",
      "location": "Location",
      "date": "Date",
      "description": "Description"
    },
    "consumptionReport": {
      "header": "Electricity Consumption",
      "annualConsumption": "Annual consumption",
      "pvHoursConsumption": "Annual consumption during photovoltaic hours"
    },
    "installationReport": {
      "photovoltaicInstallation": "Photovoltaic installation",
      "installedPower": "Installed power",
      "annualProduction": "Average annual production",
      "components": "Components",
      "inverter": "Inverter",
      "panels": "panels"
    },
    "economicBalanceReport": {
      "header": "Economic Balance",
      "savings": "Savings",
      "averageKwhCost": "Average kWh cost with taxes",
      "compensationPerKwh": "Compensation for surpluses",
      "perKwh": "per kWh",
      "investmentReturn": "Return on Investment",
      "totalInstallationCost": "Total installation cost",
      "annualMaintenanceCost": "Annual maintenance cost",
      "annualInflation": "Annual inflation",
      "annualEnergySavings": "Annual energy savings",
      "withoutSurpluses": "Without surpluses",
      "withSurpluses": "With surpluses"
    }
  },
  "es": {
    "report": {
      "title": "Informe de SolarLibre"
    },
    "projectInfo": {
      "projectInfo": "Información del proyecto",
      "name": "Nombre del proyecto",
      "address": "Dirección",
      "location": "Ubicación",
      "date": "Fecha",
      "description": "Descripción"
    },
    "consumptionReport": {
      "header": "Consumo de electricidad",
      "annualConsumption": "Consumo anual",
      "pvHoursConsumption": "Consumo anual en horas fotovoltaicas"
    },
    "installationReport": {
      "photovoltaicInstallation": "Instalación fotovoltaica",
      "installedPower": "Potencia instalada",
      "annualProduction": "Producción anual media",
      "components": "Componentes",
      "inverter": "Inversor",
      "panels": "paneles"
    },
    "economicBalanceReport": {
      "header": "Balance económico",
      "savings": "Ahorros",
      "averageKwhCost": "Precio medio del kWh con impuestos",
      "compensationPerKwh": "Compensación por excedentes",
      "perKwh": "por kWh",
      "investmentReturn": "Retorno de la inversión",
      "totalInstallationCost": "Coste total de la instalación",
      "annualMaintenanceCost": "Mantenimiento anual",
      "annualInflation": "Inflación anual",
      "annualEnergySavings": "Ahorro de energía anual",
      "withoutSurpluses": "Sin excedentes",
      "withSurpluses": "Con excedentes"
    }
  }
}
</i18n>
