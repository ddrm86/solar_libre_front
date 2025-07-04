<template>
  <Card>
    <template #title>
      <span>{{ t('mppt_info.title') }}</span>
    </template>
    <template #content>
      <div class="grid grid-cols-2 gap-2 items-center">
        <div>
          <span>{{ t('mppt_info.connected_power', { power: connectedPower.toFixed(0) }) }}</span>
        </div>
        <div>
          <Message
            :severity="connectedPowerMessage.severity"
            :icon="connectedPowerMessage.icon"
            size="small"
          >
            {{ connectedPowerMessage.text }}
          </Message>
        </div>
        <div>
          <span>{{ t('mppt_info.voltage_at_max_power', { voltage: voltageAtMaxPower.toFixed(2) }) }}</span>
        </div>
        <div>
          <Message
            :severity="voltageAtMaxPowerMessage.severity"
            :icon="voltageAtMaxPowerMessage.icon"
            size="small"
          >
            {{ voltageAtMaxPowerMessage.text }}
          </Message>
        </div>
        <div>
          <span>{{ t('mppt_info.current_at_max_power', { current: currentAtMaxPower.toFixed(2) }) }}</span>
        </div>
        <div>
          <Message
            :severity="currentAtMaxPowerMessage.severity"
            :icon="currentAtMaxPowerMessage.icon"
            size="small"
          >
            {{ currentAtMaxPowerMessage.text }}
          </Message>
        </div>
        <div>
          <span>{{ t('mppt_info.open_circuit_voltage', { voltage: openCircuitVoltage.toFixed(2) }) }}</span>
        </div>
        <div>
          <Message
            :severity="openCircuitVoltageMessage.severity"
            :icon="openCircuitVoltageMessage.icon"
            size="small"
          >
            {{ openCircuitVoltageMessage.text }}
          </Message>
        </div>
        <div>
          <span>{{ t('mppt_info.short_circuit_current', { current: shortCircuitCurrent.toFixed(2) }) }}</span>
        </div>
        <div>
          <Message
            :severity="shortCircuitCurrentMessage.severity"
            :icon="shortCircuitCurrentMessage.icon"
            size="small"
          >
            {{ shortCircuitCurrentMessage.text }}
          </Message>
        </div>
        <div v-if="parallelStringsMessage" class="col-span-2">
          <Message
            :severity="parallelStringsMessage.severity"
            :icon="parallelStringsMessage.icon"
            size="small"
          >
            {{ parallelStringsMessage.text }}
          </Message>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
/**
 * MpptInfo.vue
 *
 * This Vue component displays detailed information and validation messages for an MPPT
 * (Maximum Power Point Tracker) configuration.
 * It shows calculated values such as connected power, voltage at max power, current at max power,
 * open circuit voltage, and short circuit current.
 * For each value, a message indicates if it is within the recommended range or if it exceeds
 * inverter specifications.
 * If the number of strings exceeds the MPPT input limit, an informational message is shown.
 *
 * Usage:
 * <MpptInfo :mppt="mpptSetup" :inverter="inverter" />
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IMpptSetup } from '@/models/inverters_setup/mpptSetup.ts'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'

const { t } = useI18n()

const props = defineProps<{
  mppt: IMpptSetup
  inverter: IMonophaseInverter
}>()

const connectedPower = computed(() => props.mppt.calcPeakPower())
const voltageAtMaxPower = computed(() => props.mppt.calcPeakVoltage())
const currentAtMaxPower = computed(() => props.mppt.calcPeakCurrent())
const openCircuitVoltage = computed(() => props.mppt.calcOpenCircuitVoltage())
const shortCircuitCurrent = computed(() => props.mppt.calcShortCircuitCurrent())

const connectedPowerMessage = computed(() => {
  if (connectedPower.value > props.inverter.recommended_max_input_power) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('mppt_info.excess_power', {
        power: connectedPower.value.toFixed(0),
        maxPower: props.inverter.recommended_max_input_power,
      }),
    }
  }
  return { severity: 'success', icon: 'pi pi-check', text: t('mppt_info.correct') }
})

const voltageAtMaxPowerMessage = computed(() => {
  if (voltageAtMaxPower.value > props.inverter.max_input_voltage) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('mppt_info.excess_voltage', {
        voltage: voltageAtMaxPower.value.toFixed(2),
        maxVoltage: props.inverter.max_input_voltage,
      }),
    }
  } else if (voltageAtMaxPower.value > props.inverter.max_mppt_operating_voltage) {
    return {
      severity: 'info',
      icon: 'pi pi-info-circle',
      text: t('mppt_info.over_voltage', {
        voltage: voltageAtMaxPower.value.toFixed(2),
        maxMpptVoltage: props.inverter.max_mppt_operating_voltage,
      }),
    }
  }
  return { severity: 'success', icon: 'pi pi-check', text: t('mppt_info.correct') }
})

const currentAtMaxPowerMessage = computed(() => {
  if (currentAtMaxPower.value > props.inverter.max_input_current_per_mppt) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('mppt_info.excess_current', {
        current: currentAtMaxPower.value.toFixed(2),
        maxCurrent: props.inverter.max_input_current_per_mppt,
      }),
    }
  }
  return { severity: 'success', icon: 'pi pi-check', text: t('mppt_info.correct') }
})

const openCircuitVoltageMessage = computed(() => {
  if (openCircuitVoltage.value > props.inverter.max_input_voltage) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('mppt_info.excess_open_voltage', {
        voltage: openCircuitVoltage.value.toFixed(2),
        maxVoltage: props.inverter.max_input_voltage,
      }),
    }
  }
  return { severity: 'success', icon: 'pi pi-check', text: t('mppt_info.correct') }
})

const shortCircuitCurrentMessage = computed(() => {
  if (shortCircuitCurrent.value > props.inverter.max_short_circuit_current_per_mppt) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('mppt_info.excess_short_current', {
        current: shortCircuitCurrent.value.toFixed(2),
        maxShortCurrent: props.inverter.max_short_circuit_current_per_mppt,
      }),
    }
  }
  return { severity: 'success', icon: 'pi pi-check', text: t('mppt_info.correct') }
})

const parallelStringsMessage = computed(() => {
  const numberOfStrings = props.mppt.strings.length
  if (numberOfStrings > props.inverter.max_inputs_per_mppt) {
    return {
      severity: 'info',
      icon: 'pi pi-info-circle',
      text: t('mppt_info.parallel_strings', {
        strings: numberOfStrings,
        maxInputs: props.inverter.max_inputs_per_mppt,
      }),
    }
  }
  return null
})
</script>

<i18n>
{
  "en": {
    "mppt_info": {
      "title": "MPPT Information",
      "connected_power": "Connected power: {power}W",
      "voltage_at_max_power": "Voltage at max power: {voltage}V",
      "current_at_max_power": "Current at max power: {current}A",
      "open_circuit_voltage": "Open circuit voltage: {voltage}V",
      "short_circuit_current": "Short circuit current: {current}A",
      "excess_power": "Excess connected power ({power}W > {maxPower}W)",
      "over_voltage": "Correct, but exceeds MPPT operating voltage ({voltage}V > {maxMpptVoltage}V)",
      "excess_voltage": "Excess input voltage ({voltage}V > {maxVoltage}V)",
      "excess_current": "Excess input current ({current}A > {maxCurrent}A)",
      "excess_open_voltage": "Excess open circuit voltage ({voltage}V > {maxVoltage}V)",
      "excess_short_current": "Excess short circuit current ({current}A > {maxShortCurrent}A)",
      "parallel_strings": "Parallel connection must be external to the MPPT ({strings} strings > {maxInputs} inputs available)",
      "correct": "Correct"
    }
  },
  "es": {
    "mppt_info": {
      "title": "Información del MPPT",
      "connected_power": "Potencia conectada: {power}W",
      "voltage_at_max_power": "Tensión en máxima potencia: {voltage}V",
      "current_at_max_power": "Intensidad en máxima potencia: {current}A",
      "open_circuit_voltage": "Voltaje en circuito abierto: {voltage}V",
      "short_circuit_current": "Intensidad por cortocircuito: {current}A",
      "excess_power": "Exceso de potencia conectada ({power}W > {maxPower}W)",
      "over_voltage": "Correcto, pero supera el voltaje de trabajo del MPPT ({voltage}V > {maxMpptVoltage}V)",
      "excess_voltage": "Exceso de voltaje de entrada ({voltage}V > {maxVoltage}V)",
      "excess_current": "Exceso de intensidad de entrada ({current}A > {maxCurrent}A)",
      "excess_open_voltage": "Exceso de voltaje en circuito abierto ({voltage}V > {maxVoltage}V)",
      "excess_short_current": "Exceso de intensidad por cortocircuito ({current}A > {maxShortCurrent}A)",
      "parallel_strings": "La conexión en paralelo se deberá hacer fuera del MPPT ({strings} strings > {maxInputs} entradas disponibles)",
      "correct": "Correcto"
    }
  }
}
</i18n>
