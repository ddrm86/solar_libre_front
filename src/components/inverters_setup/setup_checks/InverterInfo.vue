<template>
  <Card>
    <template #title>
      <span>{{ t('inverter_info.title') }}</span>
    </template>
    <template #content>
      <div class="grid grid-cols-2 gap-2 items-center">
        <div>
          <span>{{ t('inverter_info.connected_power', { peakPower, usagePercentage }) }}</span>
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
          <span>{{ t('inverter_info.input_voltage', { inputVoltage }) }}</span>
        </div>
        <div>
          <Message
            :severity="inputVoltageMessage.severity"
            :icon="inputVoltageMessage.icon"
            size="small"
          >
            {{ inputVoltageMessage.text }}
          </Message>
        </div>
        <div>
          <span class="pe-2">{{ t('inverter_info.startup_voltage', { startupVoltage }) }}</span>
        </div>
        <div>
          <Message
            :severity="startupVoltageMessage.severity"
            :icon="startupVoltageMessage.icon"
            size="small"
          >
            {{ startupVoltageMessage.text }}
          </Message>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup'

const { t } = useI18n()

const props = defineProps<{
  idx: number
}>()

const invertersSetupStore = useInvertersSetupStore()
const inverter = computed(() => invertersSetupStore.inverters[props.idx])

const peakPower = computed(() => inverter.value.calcPeakPower())
const usagePercentage = computed(() =>
  Number((inverter.value.calcInverterUsage() * 100).toFixed(0)),
)
const inputVoltage = computed(() => Number(inverter.value.calcPeakVoltage().toFixed(2)))
const startupVoltage = computed(() => Number(inverter.value.calcStartupVoltage().toFixed(2)))

const connectedPowerMessage = computed(() => {
  const usage = inverter.value.calcInverterUsage()
  const recommendedPower = inverter.value.inverter?.recommended_max_input_power ?? 0
  const nominalPower = inverter.value.inverter?.nominal_output_power ?? 0

  if (peakPower.value > recommendedPower) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('inverter_info.excess_power', { peakPower: peakPower.value, recommendedPower }),
    }
  } else if (peakPower.value > nominalPower) {
    return {
      severity: 'info',
      icon: 'pi pi-info-circle',
      text: t('inverter_info.overproduction', { peakPower: peakPower.value, nominalPower }),
    }
  } else if (usage < 0.75) {
    return {
      severity: 'info',
      icon: 'pi pi-info-circle',
      text: t('inverter_info.underutilized'),
    }
  } else {
    return {
      severity: 'success',
      icon: 'pi pi-check',
      text: t('inverter_info.correct'),
    }
  }
})

const inputVoltageMessage = computed(() => {
  const maxVoltage = inverter.value.inverter?.max_input_voltage ?? 0

  if (inputVoltage.value > maxVoltage) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('inverter_info.excess_voltage', { inputVoltage: inputVoltage.value, maxVoltage }),
    }
  } else {
    return {
      severity: 'success',
      icon: 'pi pi-check',
      text: t('inverter_info.correct'),
    }
  }
})

const startupVoltageMessage = computed(() => {
  const minVoltage = inverter.value.inverter?.startup_voltage ?? 0

  if (startupVoltage.value < minVoltage) {
    return {
      severity: 'warn',
      icon: 'pi pi-exclamation-triangle',
      text: t('inverter_info.low_voltage', { startupVoltage: startupVoltage.value, minVoltage }),
    }
  } else {
    return {
      severity: 'success',
      icon: 'pi pi-check',
      text: t('inverter_info.correct'),
    }
  }
})
</script>

<i18n>
{
  "en": {
    "inverter_info": {
      "title": "Inverter Information",
      "connected_power": "Connected power: {peakPower}W ({usagePercentage}%)",
      "input_voltage": "Input voltage: {inputVoltage}V",
      "startup_voltage": "Startup voltage: {startupVoltage}V",
      "excess_power": "Excess connected power ({peakPower}W > {recommendedPower}W)",
      "overproduction": "Correct, but production exceeds output ({peakPower}W > {nominalPower}W)",
      "underutilized": "Correct, but the inverter is underutilized",
      "correct": "Correct",
      "excess_voltage": "Excess input voltage ({inputVoltage}V > {maxVoltage}V)",
      "low_voltage": "Input voltage too low ({startupVoltage}V < {minVoltage}V)"
    }
  },
  "es": {
    "inverter_info": {
      "title": "Información del inversor",
      "connected_power": "Potencia conectada: {peakPower}W ({usagePercentage}%)",
      "input_voltage": "Tensión de entrada: {inputVoltage}V",
      "startup_voltage": "Tensión de arranque: {startupVoltage}V",
      "excess_power": "Exceso de potencia conectada ({peakPower}W > {recommendedPower}W)",
      "overproduction": "Correcto, pero la producción es mayor que la salida ({peakPower}W > {nominalPower}W)",
      "underutilized": "Correcto, pero el inversor está infrautilizado",
      "correct": "Correcto",
      "excess_voltage": "Exceso de voltaje de entrada ({inputVoltage}V > {maxVoltage}V)",
      "low_voltage": "No se llega al voltaje de entrada mínimo ({startupVoltage}V < {minVoltage}V)"
    }
  }
}
</i18n>
