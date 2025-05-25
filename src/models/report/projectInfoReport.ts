import { useProjectInfoStore } from '@/stores/project_info/projectInfo.ts'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useProjectInfoReport() {
  const projectInfoStore = useProjectInfoStore()

  const { t } = useI18n()

  const projectInfoReportContent = computed(() => {
    return [
      {
        text: `${t('projectInfo.projectInfo')}`,
        style: 'subheader',
      },
      {
        ul: [
          {
            text: `${t('projectInfo.name')}: ${projectInfoStore.projectInfo.name}`,
          },
          {
            text: `${t('projectInfo.address')}: ${projectInfoStore.projectInfo.location.address}`,
          },
          {
            text: `${t('projectInfo.location')}: Lat ${projectInfoStore.projectInfo.location.latitude} | Long ${projectInfoStore.projectInfo.location.longitude}`,
          },
        ],
      },
    ]
  })

  return {
    projectInfoReportContent,
  }
}
