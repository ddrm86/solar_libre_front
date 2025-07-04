<template>
  <div class="lg:flex items-center gap-4">
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
    <div class="flex items-center gap-2 pt-4 lg:pt-0">
      <Button
        :icon="'pi pi-upload'"
        :loading="projectLoadingStore.loading"
        :loadingIcon="'pi pi-spin pi-spinner-dotted'"
        :disabled="!selectedProject"
        :label="t('project_selection.load_project')"
        @click="loadSelectedProject"
      />
      <ProjectDelete
        v-if="selectedProject"
        :project-name="selectedProject.label"
        :project-id="selectedProject.value"
        @project-deleted="refreshProjects"
      />
      <ProjectCreateNew
        v-if="!projectSavingStore.isNewProject"
        :current-project-name="selectedProject ? selectedProject.label : ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ProjectSelection.vue
 *
 * This Vue component displays a selector for saved projects and allows the user to load, delete,
 * or create a new project.
 * When a project is selected and the load button is clicked, it attempts to load the selected project
 * and shows a notification indicating the result.
 * It also allows deleting the selected project or creating a new one, displaying the corresponding
 * dialogs and notifications.
 *
 * Usage:
 * <ProjectSelection />
 */
import { useProjectListStore } from '@/stores/project_persistence/projectList.ts'
import { useProjectLoadingStore } from '@/stores/project_persistence/projectLoading.ts'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useProjectSavingStore } from '@/stores/project_persistence/projectSaving.ts'
import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import ProjectDelete from '@/components/project_persistence/ProjectDelete.vue'
import ProjectCreateNew from '@/components/project_persistence/ProjectCreateNew.vue'

const toast = useToast()
const { t } = useI18n()

const projectListStore = useProjectListStore()
const projectLoadingStore = useProjectLoadingStore()
const projectSavingStore = useProjectSavingStore()
const projecInfoStore = useProjectInfoStore()

onMounted(() => {
  refreshProjects()
})

function refreshProjects() {
  projectListStore.fetchProjects().then(() => {
    if (projectListStore.error) {
      toast.add({
        severity: 'error',
        summary: t('messages.loading_projects_error'),
        detail: `${t('messages.loading_projects_error_detail')} ${projectListStore.errorDetails ?? ''}`,
      })
    } else if (!projectSavingStore.isNewProject && projecInfoStore.projectInfo.id) {
      const current = projecInfoStore.projectInfo
      let addressLabel = ''
      if (current.location.address) {
        const truncatedAddress = current.location.address.substring(0, 40)
        addressLabel = ` (${truncatedAddress}${current.location.address.length > 40 ? '...' : ''})`
      }
      selectedProject.value = {
        label: current.name + addressLabel,
        value: current.id ?? '',
      }
    }
  })
}

const selectedProject = ref<{ label: string; value: string } | null>(null)

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

const loadSelectedProject = async () => {
  if (selectedProject.value) {
    projectLoadingStore.loadProject(selectedProject.value.value).then(() => {
      if (projectLoadingStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.loading_project_error'),
          detail: `${t('messages.loading_project_error_detail')} ${projectLoadingStore.errorDetails}`,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.loading_project_success'),
          detail: `${t('messages.loading_project_success_detail')} ${selectedProject.value?.label ?? ''}`,
          life: 3000,
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
      "loading_projects_error": "Error loading saved project lists",
      "loading_projects_error_detail": "Could not load projects: ",
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
      "loading_projects_error": "No se pudo cargar la lista de proyectos guardados",
      "loading_projects_error_detail": "No se pudieron cargar los proyectos: ",
      "loading_project_success": "Proyecto cargado exitosamente",
      "loading_project_success_detail": "Proyecto cargado: "
    }
  }
}
</i18n>
