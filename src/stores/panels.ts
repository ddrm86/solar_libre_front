import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

export interface Panel {
  id?: string;
  model: string;
  nominal_power: number;
  vmpp: number;
  impp: number;
  voc: number;
  isc: number;
  length: number;
  width: number;
  reference?: string;
  description?: string;
}

export const usePanelsStore = defineStore('panels', () => {
  const panels = ref<Panel[]>([])
  const fetching = ref(false);
  const error = ref(false);
  const errorDetails = ref<AxiosError>();

  const fetchPanels = ()=> {
    fetching.value = true;
    axios
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

  return { panels, fetching, error, errorDetails, fetchPanels }
})
