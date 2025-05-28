<template>
  <IftaLabel>
    <Select
      id="project"
      filter
      v-model="selectedProject"
      :options="projectOptions"
      :optionLabel="'label'"
      :placeholder="t('project_selection.select_project')"
      @change="onProjectChange"
    />
    <label for="project">{{ t('project_selection.project') }}</label>
  </IftaLabel>
</template>

<script setup lang="ts">
import { useProjectListStore } from '@/stores/project_persistence/projectList.ts'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projectListStore = useProjectListStore()
const selectedProject = ref(null)

const projectOptions = computed(() =>
  projectListStore.availableProjects.map((project) => {
  let address = '';
  if (project.location.address) {
    const truncatedAddress = project.location.address.substring(0, 40);
    address = ` (${truncatedAddress}${project.location.address.length > 40 ? '...' : ''})`;
  }
  return {
    label: project.name + address,
    value: project.id,
  };
  })
);

const onProjectChange = () => {
  console.log('Selected project:', selectedProject.value)
}
</script>

<i18n>
{
  "en": {
    "project_selection": {
      "select_project": "Select a project",
      "project": "Project"
    }
  },
  "es": {
    "project_selection": {
      "select_project": "Selecciona un proyecto",
      "project": "Proyecto"
    }
  }
}
</i18n>
