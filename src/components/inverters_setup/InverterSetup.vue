<template>
  <div>
    <div class="pb-2">
      <span>⚡ {{ t('inverter_setup.inverter') }} {{ idx + 1 }}</span>
      <div class="pt-2 flex gap-2">
        <IftaLabel>
          <Select
            id="inverter"
            filter
            v-model="selectedInverter"
            :options="inverterOptions"
            :optionLabel="getInverterLabel"
            :placeholder="t('inverter_setup.select_inverter')"
            @change="onInverterChange"
          />
          <label for="inverter">{{ t('inverter_setup.inverter') }}</label>
        </IftaLabel>
        <Button
          icon="pi pi-plus"
          :label="`${t('inverter_setup.add_mppt')} (${getNumberOfMpptsLeft} ${t('inverter_setup.remaining')})`"
          :disabled="disableAddMpptButton"
          @click="addMpptSetup"
        />
      </div>
    </div>
    <Panel
      :header="headerText"
      toggleable
      @update:collapsed="onPanelToggle"
    >
      <div v-for="(mpptSetup, index) in inverterSetup.setup" :key="mpptSetup.id" class="pt-4">
        <MpptSetup
          :idx="index"
          :currentSetup="mpptSetup"
          @updateMppt="onMpptChange"
          @deleteMppt="deleteMpptSetup"
        />
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import MpptSetup from '@/components/inverters_setup/MpptSetup.vue'
import { CInverterSetup, type IInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { CMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'

const { t } = useI18n()

const props = defineProps<{
  idx: number
  inventory: IMonophaseInverter[]
  currentSetup?: IInverterSetup
}>()

const emit = defineEmits<{
  updateInverterSetup:  [IInverterSetup, idx: number]
}>()

onMounted(() => {
  if (props.currentSetup) {
    inverterSetup.value = props.currentSetup
    if (props.currentSetup.inverter) {
      selectedInverter.value = props.currentSetup.inverter
    }
  }
})

const isCollapsed = ref(false)

const onPanelToggle = (value: boolean) => {
  isCollapsed.value = value
}

const headerText = computed(() => {
  if (!isCollapsed.value || inverterSetup.value.setup.length === 0) {
    return 'MPPTs'
  }

  return inverterSetup.value.setup
    .map((stringSetup, index) =>
      `MPPT ${index + 1} 🔌 ${stringSetup.toString()}`
    )
    .join(' || ')
})

const selectedInverter = ref<IMonophaseInverter | null>(null)
const inverterSetup = ref<IInverterSetup>(new CInverterSetup())

const inverterOptions = computed(() => props.inventory)

const getInverterLabel = (inverter: IMonophaseInverter) =>
  `${inverter.maker} ${inverter.model} (${inverter.recommended_max_input_power}W)`

const onInverterChange = () => {
  if (selectedInverter.value) {
    inverterSetup.value = new CInverterSetup()
    inverterSetup.value.inverter = selectedInverter.value
    emit('updateInverterSetup', inverterSetup.value, props.idx)
  }
}

const disableAddMpptButton = computed(() => {
  return !selectedInverter.value ||
    inverterSetup.value.setup.length >= (inverterSetup.value.inverter?.number_of_mppts ?? 0)
})

const getNumberOfMpptsLeft = computed(() => {
  return (inverterSetup.value.inverter?.number_of_mppts ?? 0) - inverterSetup.value.setup.length
})

const addMpptSetup = () => {
  inverterSetup.value.setup.push(new CMpptSetup([]))
  emit('updateInverterSetup', inverterSetup.value, props.idx)
}

const deleteMpptSetup = (idx: number) => {
  inverterSetup.value.setup.splice(idx, 1)
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
      "select_inverter": "Select an inverter",
      "add_mppt": "Add MPPT",
      "remaining": "remaining"
    }
  },
  "es": {
    "inverter_setup": {
      "inverter": "Inversor",
      "select_inverter": "Seleccionar un inversor",
      "add_mppt": "Añadir MPPT",
      "remaining": "restantes"
    }
  }
}
</i18n>
