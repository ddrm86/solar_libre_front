<template>
  <Button :icon="icon" variant="text" severity="secondary" size="large" @click="saveProject" />
</template>

<script setup lang="ts">
import { useProjectSavingStore } from '@/stores/project_persistence/projectSaving.ts'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const { t } = useI18n()

const projectSavingStore = useProjectSavingStore()

const saved = ref(false)

const icon = computed(() => {
  return projectSavingStore.saving ? 'pi pi-spin pi-spinner-dotted' : 'pi pi-save'
})

const saveProject = () => {
  projectSavingStore.saveProject().then(() => {
    if (projectSavingStore.error) {
      toast.add({
        severity: 'error',
        summary: t('messages.saving_project_error'),
        detail: `${t('messages.saving_project_error_detail')} ${projectSavingStore.errorDetails}`,
        life: 5000,
      })
    } else {
      saved.value = true
    }
  })
}
</script>

<i18n>
{
  "en": {
    "messages": {
      "saving_project_error": "Error saving the project",
      "saving_project_error_detail": "Could not save the project: "
    }
  },
  "es": {
    "messages": {
      "saving_project_error": "Error salvando el proyecto",
      "saving_project_error_detail": "No se pudo guardar el proyecto: "
    }
  }
}
</i18n>
