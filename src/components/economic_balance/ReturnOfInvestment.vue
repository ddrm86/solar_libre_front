<template>
  <Card>
    <template #title>
      <div class="flex gap-4 items-center pb-4">
        <h2 class="text-lg font-semibold">{{ t('roi.title') }}</h2>
      </div>
    </template>
    <template #content>
      <RoiInput @updateIncludeSurplus="(value) => (includeSurplus = value)" />
      <div class="2xl:flex 2xl:gap-8">
        <RoiTable :includeSurplus="includeSurplus" @updateRoiData="updateRoiData" />
        <RoiChart
          v-if="roiWithoutSurplus.length && roiWithSurplus.length"
          :roiWithoutSurplus="roiWithoutSurplus"
          :roiWithSurplus="roiWithSurplus"
          class="pt-8 lg:pt-0 lg:flex-1"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RoiInput from '@/components/economic_balance/RoiInput.vue'
import RoiTable from '@/components/economic_balance/RoiTable.vue'
import RoiChart from '@/components/economic_balance/RoiChart.vue'
import { ref } from 'vue'

const { t } = useI18n()
const includeSurplus = ref(true)
const roiWithoutSurplus = ref<number[]>([])
const roiWithSurplus = ref<number[]>([])

function updateRoiData({
  roiWithoutSurplus: withoutSurplus,
  roiWithSurplus: withSurplus,
}: {
  roiWithoutSurplus: number[]
  roiWithSurplus: number[]
}) {
  roiWithoutSurplus.value = withoutSurplus
  roiWithSurplus.value = withSurplus
}
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
