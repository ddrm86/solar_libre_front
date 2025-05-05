<template>
  <div>
    <div class="pb-2"> <!-- TODO: añadir Inversor $idx + 1 -->
      <span class="pe-2">{{ t('inverter_setup.inverter') }}</span>
      <IftaLabel>
        <Select
          id="solarArray"
          v-model="selectedInverter"
          :options="inverterOptions"
          optionLabel="getInverterLabel"
          placeholder="Select an inverter"
          @change="onInverterChange"
        />
        <label for="solarArray">{{ t('string_setup.select_array') }}</label>
      </IftaLabel>
    </div>
    <Button
      icon="pi pi-plus"
      :label="t('inverter_setup.add_mppt')"
      @click="addMpptSetup"
    />
    <div v-for="(mpptSetup, index) in inverterSetup.setup" :key="index" class="pt-4">
      <MpptSetup
        :idx="index"
        :available-setups="availableSetups"
        :currentSetup="mpptSetup"
        @updateMppt="onMpptChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MpptSetup from '@/components/inverters_setup/MpptSetup.vue'
import { CInverterSetup, type IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { CMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'
import type { ISolarArray } from '@/models/solar_arrays/solarArray.ts'

const { t } = useI18n()

const props = defineProps<{
  idx: number
  availableSetups: [{  // TODO iniciar al montar
    array: ISolarArray
    maxPanels: number
  }]
  inventory: IMonophaseInverter[]
}>()

const emit = defineEmits<{
  updateInverterSetup:  [IInverterSetup, idx: number]
}>()

const selectedInverter = ref<IMonophaseInverter | null>(null)
const inverterSetup = ref(new CInverterSetup())

const inverterOptions = computed(() => props.inventory)

const onInverterChange = () => {
  if (selectedInverter.value) {
    inverterSetup.value.inverter = selectedInverter.value
    emit('updateInverterSetup', inverterSetup.value, props.idx)
  }
}

// TODO no son infinitos, cada inversor tiene un máximo de mppts. (idea: indicar restantes en botón añadir)
const addMpptSetup = () => {
  inverterSetup.value.setup.push(new CMpptSetup([]))
  emit('updateInverterSetup', inverterSetup.value, props.idx)
}

const onMpptChange = (updatedMppt: CMpptSetup, idx: number) => {
  inverterSetup.value.setup[idx] = updatedMppt
  emit('updateInverterSetup', inverterSetup.value, props.idx)
}
</script>

<i18n>
{
  "en": {
    "inverter_setup": {
      "inverter": "Inverter",
      "add_mppt": "Add MPPT"
    }
  },
  "es": {
    "inverter_setup": {
      "inverter": "Inversor",
      "add_mppt": "Añadir MPPT"
    }
  }
}
</i18n>
