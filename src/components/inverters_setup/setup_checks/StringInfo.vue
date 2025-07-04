<template>
  <div>
    <Button
      icon="pi pi-info-circle"
      :disabled="disabled"
      variant="text"
      @click="toggle"
      aria-haspopup="true"
    />
    <Popover ref="op">
      <div class="grid grid-cols-2 gap-2 justify-between text-right">
        <span>{{ t('string_info.peak_power') }}</span>
        <span>{{ stringSetup.calcPeakPower().toFixed(0) }}W</span>
        <span>{{ t('string_info.vmpp') }}</span>
        <span>{{ stringSetup.calcPeakVoltage().toFixed(2) }}V</span>
        <span>{{ t('string_info.impp') }}</span>
        <span>{{ stringSetup.calcPeakCurrent().toFixed(2) }}A</span>
        <span>{{ t('string_info.voc') }}</span>
        <span>{{ stringSetup.calcOpenCircuitVoltage().toFixed(2) }}V</span>
        <span>{{ t('string_info.isc') }}</span>
        <span>{{ stringSetup.calcShortCircuitCurrent().toFixed(2) }}A</span>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
/**
 * StringInfo.vue
 *
 * This Vue component displays a button that, when clicked, shows a popover with detailed
 * information about the selected string configuration.
 * The popover presents calculated values such as nominal power, Vmpp, Impp, Voc, and Isc for the string.
 * The button can be disabled based on the provided prop.
 *
 * Usage:
 * <StringInfo :stringSetup="stringSetup" :disabled="isDisabled" />
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IStringSetup } from '@/models/inverters_setup/stringSetup.ts'

const { t } = useI18n()
const op = ref()

const toggle = (event: Event) => {
  op.value.toggle(event);
}

defineProps<{
  stringSetup: IStringSetup
  disabled: boolean
}>()
</script>

<i18n>
{
  "en": {
    "string_info": {
      "peak_power": "Nominal power",
      "vmpp": "Vmpp",
      "impp": "Impp",
      "voc": "Voc",
      "isc": "Isc"
    }
  },
  "es": {
    "string_info": {
      "peak_power": "Potencia nominal",
      "vmpp": "Vmpp",
      "impp": "Impp",
      "voc": "Voc",
      "isc": "Isc"
    }
  }
}
</i18n>
