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
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { useI18n } from "vue-i18n";
import { useProjectInfoReport } from '@/models/report/projectInfoReport.ts'
import { computed } from 'vue'
import { useConsumptionReport } from '@/models/report/consumptionReport.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const { t } = useI18n();

const { projectInfoReportContent } = useProjectInfoReport()
const { consumptionReportContent } = useConsumptionReport()

const pdfDefinition = computed<TDocumentDefinitions>(() => ({
  content: [
    {
      text: `${t("report.title")}\n\n`,
      style: "header",
    },
    ...projectInfoReportContent.value,
    '\n\n',
    ...consumptionReportContent.value,
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
  pdfMake.createPdf(pdfDefinition.value).open();
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
    }
  }
}
</i18n>
