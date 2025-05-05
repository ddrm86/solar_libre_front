<template>
  <div>
    <span>{{ t('mppt_setup.mppt') }} {{ idx + 1 }}</span>
    <Button
      icon="pi pi-plus"
      :label="t('mppt_setup.add_string')"
      @click="addStringSetup"
    />
    <Panel
      :header="headerText"
      toggleable
      @update:collapsed="onPanelToggle"
    >
      <div v-for="(stringSetup, index) in mpptSetup.strings" :key="index" class="pt-4 flex items-center justify-between">
        <StringSetup
          :idx="index"
          :availableSetups="availableSetups"
          :currentSetup="stringSetup"
          @updateString="onStringChange"
        />
        <Button
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
          @click="deleteStringSetup(index)"
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
import { computed, onMounted, ref } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  idx: number
  availableSetups: [{
    array: ISolarArray
    maxPanels: number
  }]
  currentSetup?: IMpptSetup
}>()

const emit = defineEmits<{
  updateMppt: [IMpptSetup, idx: number]
}>()

const mpptSetup = ref<IMpptSetup>(new CMpptSetup([]))

const isCollapsed = ref(false)

onMounted(() => {
  if (props.currentSetup) {
    mpptSetup.value = props.currentSetup
  }
})

const onPanelToggle = (value: boolean) => {
  isCollapsed.value = value
}

const headerText = computed(() => {
  let stringLabel = `${t('mppt_setup.strings')}`
  const stringCount = mpptSetup.value.strings.length

  if (!isCollapsed.value || stringCount === 0) {
    return stringLabel
  }

  stringLabel = stringLabel + ' ➡️ ' + mpptSetup.value.strings
    .filter(string => string.solarArray)
    .map(string =>
      `${string.panelNumber} x ${string.solarArray?.array.panel.maker} ${string.solarArray?.array.panel.maker} 🧭${string.solarArray?.array.azimuth}º`
  ).join(' | ')
  return `${stringLabel}`
})

const onStringChange = (stringSetup: CStringSetup, idx: number) => {
  mpptSetup.value.strings[idx] = stringSetup
  emit('updateMppt', mpptSetup.value, props.idx)
}

const addStringSetup = () => {
  mpptSetup.value.strings.push(new CStringSetup())
  emit('updateMppt', mpptSetup.value, props.idx)
}

const deleteStringSetup = (idx: number) => {
  mpptSetup.value.strings.splice(idx, 1)
  emit('updateMppt', mpptSetup.value, props.idx)
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
