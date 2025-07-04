<template>
  <div>
    <Button
      :label="t('button.new_project')"
      icon="pi pi-file"
      severity="warn"
      @click="showNewProjectDialog"
    />
    <Dialog v-model:visible="newProjectDialogVisible" :header="t('dialog.confirm_header')" :modal="true">
      <div class="flex flex-col justify-center">
        <div class="flex items-center pb-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span>{{ t('dialog.confirm_new_project') }}</span>
        </div>
        <div class="flex items-center max-w-64 bg-slate-100 rounded shadow mx-auto">
          <small class="truncate ...">
            {{ props.currentProjectName }}
          </small>
        </div>
      </div>
      <template #footer>
        <Button
          :label="t('button.no')"
          icon="pi pi-times"
          text
          autofocus
          @click="newProjectDialogVisible = false"
        />
        <Button
          :label="t('button.yes')"
          icon="pi pi-check"
          severity="warn"
          @click="createNewProject"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * ProjectCreateNew.vue
 *
 * This Vue component renders a button to create a new project.
 * When clicked, it opens a confirmation dialog warning the user that unsaved changes will be lost.
 * If the user confirms, the page reloads to start a new project session.
 *
 * Usage:
 * <ProjectCreateNew :currentProjectName="projectName" />
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  currentProjectName: {
    type: String,
    required: true,
  },
})

const newProjectDialogVisible = ref(false)
const { t } = useI18n()

const showNewProjectDialog = () => {
  newProjectDialogVisible.value = true
}

const createNewProject = () => {
  location.reload()
}
</script>

<i18n>
{
  "en": {
    "button": {
      "new_project": "New Project",
      "no": "No",
      "yes": "Yes"
    },
    "dialog": {
      "confirm_header": "Confirm",
      "confirm_new_project": "Are you sure you want to create a new project? Unsaved changes in the current project will be lost:"
    }
  },
  "es": {
    "button": {
      "new_project": "Nuevo proyecto",
      "no": "No",
      "yes": "Sí"
    },
    "dialog": {
      "confirm_header": "Confirmar",
      "confirm_new_project": "¿Estás seguro de que deseas crear un nuevo proyecto? Los cambios no guardados en el proyecto actual se perderán:"
    }
  }
}
</i18n>
