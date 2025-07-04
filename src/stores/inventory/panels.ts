/**
 * panels.ts
 *
 * This file defines a Pinia store for managing solar panels within
 * the application. The store maintains a list of all panels and
 * provides a computed property to filter out panels marked as deleted,
 * exposing only available panels.
 *
 * The store tracks the fetching state, error status, and error details
 * for asynchronous operations. It includes methods to fetch the list
 * of panels from the backend, add a new panel, edit an existing panel,
 * and delete a panel by its identifier.
 *
 * Each method updates the store's state based on the result of the
 * corresponding HTTP request, ensuring that the panel list remains
 * current and error information is available for handling in the UI.
 */

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import type { IPanel } from '@/models/inventory/panel.ts'

export const usePanelsStore =
  defineStore('panels', () => {

  const panels = ref<IPanel[]>([])
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

  const addPanel = async (panel: IPanel) => {
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

  const editPanel = async (panel: IPanel) => {
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

  return { panels, availablePanels, fetching, error, errorDetails, fetchPanels, addPanel, editPanel,
    deletePanel };
})
