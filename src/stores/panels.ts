import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import type { Panel } from '@/models/panel.ts'

export const usePanelsStore = defineStore('panels', () => {
  const panels = ref<Panel[]>([])
  const availablePanels = computed(() =>
    panels.value.filter(panel => !panel.deleted));
  const fetching = ref(false);
  const error = ref(false);
  const errorDetails = ref<AxiosError>();

  const fetchPanels = async ()=> {
    fetching.value = true;
    return axios
      .get('/panels/')
      .then(response => {
        panels.value = response.data;
        error.value = false;
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      })
      .finally(() => {
        fetching.value = false;
      })
  }

  const addPanel = async (panel: Panel) => {
    return axios
      .post('/panels/', panel)
      .then(() => {
        error.value = false;
        fetchPanels();
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      });
  }

  const editPanel = async (panel: Panel) => {
    return axios
      .patch(`/panels/${panel.id}`, panel)
      .then(() => {
        error.value = false;
        fetchPanels();
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      });
  }

  const deletePanel = async (id: string) => {
    return axios
      .delete(`/panels/${id}`)
      .then(() => {
        error.value = false;
        fetchPanels();
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      })
  }

  return { panels, availablePanels, fetching, error, errorDetails, fetchPanels, addPanel, editPanel, deletePanel };
})
