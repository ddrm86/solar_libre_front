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
const generatePdfReport = () => {
  alert('PDF report generation is not implemented yet.')
}
</script>
