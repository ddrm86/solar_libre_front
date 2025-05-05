<template>
  <div class="flex items-center gap-4">
    <span>{{ t('string_setup.string') }} {{ idx + 1}}</span>
    <IftaLabel>
      <Select
        id="solarArray"
        v-model="selectedArray"
        :options="availableArrays"
        :optionLabel="getArrayLabel"
        :placeholder="t('string_setup.select_array')"
        @change="onSelectedArrayChange"
      />
      <label for="solarArray">{{ t('string_setup.select_array') }}</label>
    </IftaLabel>
    <IftaLabel>
      <InputNumber
        id="panelCount"
        showButtons
        v-model="panelCount"
        :min="1"
        :max="maxPanelsForSelectedArray"
        :placeholder="t('string_setup.panel_count')"
        @value-change="onPanelCountChange"
      />
      <label for="panelCount">{{ t('string_setup.panel_count') }}</label>
    </IftaLabel>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'
import { type IStringSetup, CStringSetup } from '@/models/inverters_setup/stringSetup.ts'

const { t } = useI18n()

const props = defineProps<{
  idx: number
  availableSetups: [{
    array: ISolarArray
    maxPanels: number
  }]
  currentSetup?: IStringSetup
}>()

const emit = defineEmits<{
  updateString: [ IStringSetup, idx: number ]
}>()

const availableArrays = computed(() => props.availableSetups.map(setup => setup.array))
const maxPanelsForSelectedArray = computed(() => selectedArray.value ?
  props.availableSetups.find(setup => setup.array === selectedArray.value)?.maxPanels || 0 : 0)


const selectedArray = ref<ISolarArray | null>(null)
const panelCount = ref<number>(0)

const getArrayLabel = (array: ISolarArray) =>
  `${array.array.panelNumber} x ${array.array.panel.maker} ${array.array.panel.model} 🧭${array.array.azimuth}º`

onMounted(() => {
  if (props.currentSetup?.solarArray && props.currentSetup?.panelNumber) {
    selectedArray.value = props.currentSetup.solarArray
    panelCount.value = props.currentSetup.panelNumber
  }
})

const onSelectedArrayChange = () => {
  panelCount.value = 1
  emitChanges()
}

const onPanelCountChange = () => {
  emitChanges()
}

const emitChanges = () => {
  if (selectedArray.value) {
    emit('updateString', CStringSetup.of(selectedArray.value, panelCount.value), props.idx)
  }
}
</script>

<i18n>
{
  "en": {
    "string_setup": {
      "string": "String",
      "select_array": "Select array",
      "panel_count": "Number of panels"
    }
  },
  "es": {
    "string_setup": {
      "string": "String",
      "select_array": "Seleccionar matriz",
      "panel_count": "Número de paneles"
    }
  }
}
</i18n>
