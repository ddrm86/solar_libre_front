<template>
  <div class="2xl:flex items-center">
    <div class="pe-2 w-full">
      <div class="pb-2 flex items-center justify-between gap-2">
        <div>
          <span class="pe-2">{{ t('mppt_setup.mppt') }} {{ idx + 1 }}</span>
          <Button icon="pi pi-plus" :label="t('mppt_setup.add_string')" @click="addStringSetup" />
        </div>
        <Button
          icon="pi pi-trash"
          :label="t('mppt_setup.delete_mppt')"
          severity="danger"
          outlined
          @click="deleteMppt"
        />
      </div>
      <Panel :header="headerText" toggleable @update:collapsed="onPanelToggle">
        <div
          v-for="(stringSetup, index) in mpptSetup.strings"
          :key="stringSetup.id"
          class="pt-4 flex items-center justify-between"
        >
          <StringSetup :idx="index" :currentSetup="stringSetup" @updateString="onStringChange" />
          <div class="ps-2">
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="deleteStringSetup(index)"
            />
          </div>
        </div>
      </Panel>
    </div>
    <div v-if="isSomethingConnected && props.inverter" class="pt-2 pe-2">
      <MpptInfo :mppt="mpptSetup" :inverter="props.inverter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CStringSetup } from '@/models/inverters_setup/stringSetup.ts'
import StringSetup from '@/components/inverters_setup/StringSetup.vue'
import { type IMpptSetup, CMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import { computed, onMounted, ref } from 'vue'
import MpptInfo from '@/components/inverters_setup/setup_checks/MpptInfo.vue'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'

const { t } = useI18n()

const props = defineProps<{
  idx: number
  inverter?: IMonophaseInverter
  currentSetup?: IMpptSetup
}>()

const emit = defineEmits<{
  updateMppt: [IMpptSetup, idx: number]
  deleteMppt: [idx: number]
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

  stringLabel = mpptSetup.value.toString()
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

const deleteMppt = () => {
  emit('deleteMppt', props.idx)
}

const isSomethingConnected = computed(() => {
  return mpptSetup.value.calcPeakPower() > 0
})
</script>

<i18n>
{
  "en": {
    "mppt_setup": {
      "mppt": "MPPT",
      "add_string": "Add String",
      "strings": "Strings",
      "delete_mppt": "Delete MPPT"
    }
  },
  "es": {
    "mppt_setup": {
      "mppt": "MPPT",
      "add_string": "Añadir string",
      "strings": "Strings",
      "delete_mppt": "Eliminar MPPT"
    }
  }
}
</i18n>
