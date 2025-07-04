<template>
  <Button
    :icon="'pi pi-save'"
    :loading="projectSavingStore.saving"
    :loadingIcon="'pi pi-spin pi-spinner-dotted'"
    variant="text"
    severity="secondary"
    size="large"
    @click="saveProject"
  />
</template>

<script setup lang="ts">
/**
 * ProjectSave.vue
 *
 * This Vue component renders a save button for persisting the current project.
 * When clicked, it triggers the save operation via the projectSavingStore.
 * After the save attempt, it displays a toast notification indicating success or error.
 *
 * Usage:
 * <ProjectSave />
 */
import { useProjectSavingStore } from '@/stores/project_persistence/projectSaving.ts'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const { t } = useI18n()

const projectSavingStore = useProjectSavingStore()

const saveProject = () => {
  projectSavingStore.saveProject().then(() => {
    if (projectSavingStore.error) {
      toast.add({
        severity: 'error',
        summary: t('messages.saving_project_error'),
        detail: `${t('messages.saving_project_error_detail')} ${projectSavingStore.errorDetails}`,
      })
    } else {
      toast.add({
        severity: 'success',
        summary: t('messages.saving_project_success'),
        detail: t('messages.saving_project_success_detail'),
        life: 3000,
      })
    }
  })
}
</script>

<i18n>
{
  "en": {
    "messages": {
      "saving_project_error": "Error saving the project",
      "saving_project_error_detail": "Could not save the project: ",
      "saving_project_success": "Project saved successfully",
      "saving_project_success_detail": "The project has been saved successfully."
    }
  },
  "es": {
    "messages": {
      "saving_project_error": "Error salvando el proyecto",
      "saving_project_error_detail": "No se pudo guardar el proyecto: ",
      "saving_project_success": "Proyecto guardado exitosamente",
      "saving_project_success_detail": "El proyecto se ha guardado exitosamente."
    }
  }
}
</i18n>
