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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

const { t } = useI18n();

const pdfDefinition: TDocumentDefinitions = {
  content: [
    {
      text: t("report.title"),
      style: "header",
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
    },
  },
};

const generatePdfReport = () => {
  pdfMake.createPdf(pdfDefinition).open();
};
</script>

<i18n>
{
  "en": {
    "report": {
      "title": "SolarLibre Report"
    }
  },
  "es": {
    "report": {
      "title": "Informe de SolarLibre"
    }
  }
}
</i18n>
