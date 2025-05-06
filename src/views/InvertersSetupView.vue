<template>
  <Button
    icon="pi pi-plus"
    :label="t('inverters.add_inverter')"
    @click="invertersSetupStore.addInverterSetup()"
  />
  Inversores añadidos: {{ invertersSetupStore.inverters.length }}
  <InverterSetup :idx="0" :available-setups="availableStringSetups" :inventory="monophaseInvertersStore.availableMonophaseInverters" class="pt-8"></InverterSetup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { computed, onMounted, ref } from 'vue'
import { type ISolarArray } from '@/models/solar_arrays/solarArray.ts'
import { CStringSetup, type IStringSetup } from '@/models/inverters_setup/stringSetup.ts'
import MpptSetup from '@/components/inverters_setup/MpptSetup.vue'
import { CMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import InverterSetup from '@/components/inverters_setup/InverterSetup.vue'
import { useMonophaseInvertersStore } from '@/stores/inventory/monophaseInverters.ts'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()

const invertersSetupStore = useInvertersSetupStore()
const monophaseInvertersStore = useMonophaseInvertersStore()
const solarArraysStore = useSolarArraysStore()

onMounted(() => {
  monophaseInvertersStore.fetchMonophaseInverters().then(() => {
    const inverterFetchingError = monophaseInvertersStore.error
    if (inverterFetchingError) {
      toast.add({
        severity: 'error',
        summary: t('toast_messages.error'),
        detail: t('toast_messages.error_fetching_inverters') + ': ' + monophaseInvertersStore.errorDetails,
        life: 3000,
      })
    }
  })
})

const solarArrays = ref<ISolarArray[]>(solarArraysStore.arrays)
const availableStringSetups = computed(() =>
  solarArrays.value.map((array) => ({
    array: array,
    maxPanels: array.array.panelNumber,
  })) as [{ array: ISolarArray; maxPanels: number; }],
)

const currentMpptSetup = computed(() => {
  const stringSetup1 = CStringSetup.of(
    solarArrays.value[0],
    1,
  )
  const stringSetup2 = CStringSetup.of(
    solarArrays.value[1],
    2,
  )
  return new CMpptSetup([stringSetup1, stringSetup2])
})

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
