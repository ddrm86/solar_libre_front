<template>
  <div>
    <span>{{ t('mppt_setup.mppt') }} {{ idx + 1 }}</span>
    <Button
      icon="pi pi-plus"
      :label="t('mppt_setup.add_string')"
      @click="addStringSetup"
    />
    <Panel
      :header="t('mppt_setup.strings')"
      toggleable
    >
      <div v-for="(stringSetup, index) in stringSetups.strings" :key="index" class="mb-3">
        <StringSetup
          :idx="index"
          :availableSetups="availableSetups"
        />
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CStringSetup } from '@/models/inverters_setup/stringSetup.ts'
import StringSetup from '@/components/inverters_setup/StringSetup.vue'
import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'
import { type IMpptSetup, CMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import { onMounted, ref } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  idx: number
  currentSetup?: IMpptSetup
  availableSetups: [{
    array: ISolarArray
    maxPanels: number
  }]
}>()

const stringSetups = ref<IMpptSetup>(new CMpptSetup([]))

onMounted(() => {
  if (props.currentSetup) {
    stringSetups.value = props.currentSetup
  }
})

const addStringSetup = () => {
  stringSetups.value.strings.push(new CStringSetup())
}

</script>

<i18n>
{
  "en": {
    "mppt_setup": {
      "mppt": "MPPT",
      "add_string": "Add String",
      "strings": "Strings"
    }
  },
  "es": {
    "mppt_setup": {
      "mppt": "MPPT",
      "add_string": "Añadir string",
      "strings": "Strings"
    }
  }
}
</i18n>
