<template>
  <Button
    icon="pi pi-plus"
    :label="t('inverters.add_inverter')"
    @click="invertersStore.addInverterSetup()"
  />
  Inversores añadidos: {{ invertersStore.inverters.length }}
  <MpptSetup :idx="0" :available-setups="availableStringSetups"></MpptSetup>
  String actual: {{currentPanelNumber}} x {{currentArray?.array.panel.maker}}
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { computed, ref } from 'vue'
import { type ISolarArray } from '@/models/solar_arrays/solarArray.ts'
import { type IStringSetup } from '@/models/inverters_setup/stringSetup.ts'
import MpptSetup from '@/components/inverters_setup/MpptSetup.vue'

const { t } = useI18n()
const invertersStore = useInvertersSetupStore()
const solarArraysStore = useSolarArraysStore()

const solarArrays = ref<ISolarArray[]>(solarArraysStore.arrays)
const availableStringSetups = computed(() =>
  solarArrays.value.map((array) => ({
    array: array,
    maxPanels: array.array.panelNumber,
  })) as [{ array: ISolarArray; maxPanels: number; }],
)

const currentArray = ref<ISolarArray | null>(null)
const currentPanelNumber = ref<number>(0)

const onStringChange = (stringSetup: IStringSetup) => {
  if (stringSetup.panelNumber && stringSetup.solarArray) {
    currentArray.value = stringSetup.solarArray
    currentPanelNumber.value = stringSetup.panelNumber
  } else {
    currentArray.value = null
    currentPanelNumber.value = 0
  }
}
</script>

<i18n>
{
  "en": {
    "inverters": {
      "add_inverter": "Add inverter"
    }
  },
  "es": {
    "inverters": {
      "add_inverter": "Añadir inversor"
    }
  }
}
</i18n>
