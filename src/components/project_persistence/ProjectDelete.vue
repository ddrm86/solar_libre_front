<template>
  <div>
    <Button
      :label="t('button.delete_project')"
      icon="pi pi-trash"
      severity="danger"
      @click="showDeleteDialog"
    />
    <Dialog v-model:visible="deleteDialogVisible" :header="t('dialog.confirm_header')" :modal="true">
      <div class="flex flex-col justify-center">
        <div class="flex items-center pb-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span>{{ t('dialog.confirm_delete') }}</span>
        </div>
        <div class="flex items-center max-w-64 bg-slate-100 rounded shadow mx-auto">
          <small class="truncate ...">
            {{ projectName }}
          </small>
        </div>
      </div>
      <template #footer>
        <Button
          :label="t('button.no')"
          icon="pi pi-times"
          text
          autofocus
          @click="deleteDialogVisible = false"
        />
        <Button
          :label="t('button.yes')"
          icon="pi pi-check"
          severity="danger"
          :loading="deleting"
          @click="deleteProject"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * ProjectDelete.vue
 *
 * This Vue component renders a button to delete the current project.
 * When clicked, it opens a confirmation dialog warning the user about the deletion.
 * If the user confirms, it sends a request to delete the project and shows a toast notification
 * indicating success or error.
 *
 * Usage:
 * <ProjectDelete :projectId="id" :projectName="name" @project-deleted="handler" />
 */
import { ref, defineEmits } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['project-deleted'])

const deleteDialogVisible = ref(false)
const deleting = ref(false)
const toast = useToast()
const { t } = useI18n()

const showDeleteDialog = () => {
  deleteDialogVisible.value = true
}

const deleteProject = async () => {
  deleting.value = true
  try {
    await axios.delete(`/project_info/${props.projectId}`)
    toast.add({
      severity: 'success',
      summary: t('messages.success'),
      detail: t('messages.project_deleted'),
      life: 3000,
    })
    emit('project-deleted', props.projectId)
    deleteDialogVisible.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('messages.error'),
      detail: `t('messages.deleting_project_error') ${error}`,
    })
  } finally {
    deleting.value = false
  }
}
</script>

<i18n>
{
  "en": {
    "button": {
      "delete_project": "Delete Project",
      "no": "No",
      "yes": "Yes"
    },
    "dialog": {
      "confirm_header": "Confirm",
      "confirm_delete": "Are you sure you want to delete this project?️"
    },
    "messages": {
      "success": "Success",
      "error": "Error",
      "project_deleted": "Project deleted successfully.",
      "deleting_project_error": "Error deleting the project."
    }
  },
  "es": {
    "button": {
      "delete_project": "Eliminar proyecto",
      "no": "No",
      "yes": "Sí"
    },
    "dialog": {
      "confirm_header": "Confirmar",
      "confirm_delete": "¿Estás seguro de que deseas eliminar este proyecto?️"
    },
    "messages": {
      "success": "Éxito",
      "error": "Error",
      "project_deleted": "Proyecto eliminado exitosamente.",
      "deleting_project_error": "Error eliminando el proyecto."
    }
  }
}
</i18n>
