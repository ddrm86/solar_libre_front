<template>
  <Card>
    <template #title>
      <div class="flex gap-4 items-center pb-4">
        <h2 class="text-lg font-semibold">{{ t('roi.title') }}</h2>
      </div>
    </template>
    <template #content>
      <RoiInput />
      <RoiTable />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RoiInput from '@/components/economic_balance/RoiInput.vue'
import RoiTable from '@/components/economic_balance/RoiTable.vue'

const { t } = useI18n()
</script>

<i18n>
{
  "en": {
    "roi": {
      "title": "Return on Investment"
    }
  },
  "es": {
    "roi": {
      "title": "Retorno de la inversión"
    }
  }
}
</i18n>
