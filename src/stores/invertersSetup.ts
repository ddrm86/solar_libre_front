import { defineStore } from 'pinia'
import { CInverterSetup } from '@/models/inverters_setup/inverterSetup.ts'
import { ref } from 'vue'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'

export const useInvertersSetupStore = defineStore('inverters_setup', () => {
  const inverters = ref<CInverterSetup[]>([])

  const addInverterSetup = () => {
    inverters.value.push(new CInverterSetup({} as IMonophaseInverter, []))
  }

  const deleteInverterSetup = (index: number) => {
    inverters.value.splice(index, 1)
  }

  return { inverters, addInverterSetup, deleteInverterSetup }
})
