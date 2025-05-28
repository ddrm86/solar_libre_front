<template>
  <div class="flex items-center gap-4">
    <IftaLabel>
      <Select
        id="project"
        filter
        v-model="selectedProject"
        :options="projectOptions"
        :optionLabel="'label'"
        :placeholder="t('project_selection.select_project')"
      />
      <label for="project">{{ t('project_selection.project') }}</label>
    </IftaLabel>
    <Button
      :icon="icon"
      :label="t('project_selection.load_project')"
      :disabled="projectLoadingStore.loading || !selectedProject"
      @click="loadSelectedProject"
    />
  </div>
</template>

<script setup lang="ts">
import { useProjectListStore } from '@/stores/project_persistence/projectList.ts'
import { useProjectLoadingStore } from '@/stores/project_persistence/projectLoading.ts'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const { t } = useI18n()

const projectListStore = useProjectListStore()
const projectLoadingStore = useProjectLoadingStore()

const selectedProject = ref<{ label: string, value: string } | null>(null)

const projectOptions = computed(() =>
  projectListStore.availableProjects.map((project) => {
    let address = ''
    if (project.location.address) {
      const truncatedAddress = project.location.address.substring(0, 40)
      address = ` (${truncatedAddress}${project.location.address.length > 40 ? '...' : ''})`
    }
    return {
      label: project.name + address,
      value: project.id,
    }
  }),
)

const icon = computed(() => {
  return projectLoadingStore.loading ? 'pi pi-spin pi-spinner-dotted' : 'pi pi-upload'
})

const loadSelectedProject = async () => {
  if (selectedProject.value) {
    projectLoadingStore.loadProject(selectedProject.value.value).then(() => {
      if (projectLoadingStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.loading_project_error'),
          detail: `${t('messages.loading_project_error_detail')} ${projectLoadingStore.errorDetails}`,
          life: 5000,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.loading_project_success'),
          detail: `${t('messages.loading_project_success_detail')} ${selectedProject.value?.label ?? ''}`,
          life: 5000,
        })
      }
    })
  }
}
</script>

<i18n>
{
  "en": {
    "project_selection": {
      "select_project": "Select a project",
      "project": "Project",
      "load_project": "Load project"
    },
    "messages": {
      "loading_project_error": "Error loading the project",
      "loading_project_error_detail": "Could not load the project: ",
      "loading_project_success": "Project loaded successfully",
      "loading_project_success_detail": "Loaded project: "
    }
  },
  "es": {
    "project_selection": {
      "select_project": "Selecciona un proyecto",
      "project": "Proyecto",
      "load_project": "Cargar proyecto"
    },
    "messages": {
      "loading_project_error": "Error cargando el proyecto",
      "loading_project_error_detail": "No se pudo cargar el proyecto: ",
      "loading_project_success": "Proyecto cargado exitosamente",
      "loading_project_success_detail": "Proyecto cargado: "
    }
  }
}
</i18n>
