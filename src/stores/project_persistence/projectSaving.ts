/**
 * projectSaving.ts
 *
 * This file defines a Pinia store for managing the saving process
 * of a project within the application. The store coordinates saving
 * of project information, input consumption, solar arrays, inverters,
 * and economic balance data.
 *
 * The store maintains reactive state for the saving status,
 * error flag, and error details. It determines if the project
 * is new based on the presence of an identifier in the project info.
 *
 * Methods are provided to save all relevant project data in sequence,
 * handling asynchronous operations and updating the saving and error
 * states as needed. When saving a new project, the store refreshes
 * the project list after completion.
 */

import { defineStore } from 'pinia'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { computed, ref } from 'vue'
import { AxiosError } from 'axios'
import { useInputConsumptionStore } from '@/stores/inputConsumption.ts'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'
import { useEconomicBalanceStore } from '@/stores/economicBalance.ts'
import { useProjectListStore } from '@/stores/project_persistence/projectList.ts'

export const useProjectSavingStore = defineStore('project_saving', () => {
  const projectInfoStore = useProjectInfoStore()
  const projectListStore = useProjectListStore()
  const inputConsumptionStore = useInputConsumptionStore()
  const solarArraysStore = useSolarArraysStore()
  const invertersSetupStore = useInvertersSetupStore()
  const economicBalanceStore = useEconomicBalanceStore()

  const saving = ref(false)

  const error = ref(false)

  const errorDetails = ref<AxiosError>()

  const isNewProject = computed(() => {
    return !projectInfoStore.projectInfo.id
  })

  const saveProject = async () => {
    const savingNewProject = isNewProject.value
    saving.value = true
    error.value = false
    errorDetails.value = undefined
    try {
      await projectInfoStore.saveProjectInfo()
      await inputConsumptionStore.saveConsumptionInfo()
      await solarArraysStore.saveSolarArraysInfo()
      await invertersSetupStore.saveInvertersInfo()
      await economicBalanceStore.saveCostsInfo()
    } catch (savingError) {
      error.value = true
      errorDetails.value = savingError as AxiosError
    } finally {
      saving.value = false
      if (savingNewProject) {
        await projectListStore.fetchProjects()
      }
    }
  }

  return { saveProject, isNewProject, saving, error, errorDetails }
})
