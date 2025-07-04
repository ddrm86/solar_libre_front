/**
 * monophaseInverters.ts
 *
 * This file defines a Pinia store for managing monophase inverters
 * within the application. The store maintains a list of all monophase
 * inverters and provides a computed property to filter out those
 * marked as deleted, exposing only available inverters.
 *
 * The store tracks the fetching state, error status, and error details
 * for asynchronous operations. It includes methods to fetch the list
 * of inverters from the backend, add a new inverter, edit an existing
 * inverter, and delete an inverter by its identifier.
 *
 * Each method updates the store's state based on the result of the
 * corresponding HTTP request, ensuring that the inverter list remains
 * current and error information is available for handling in the UI.
 */

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosError } from 'axios'
import type { IMonophaseInverter } from '@/models/inventory/monophaseInverter.ts'

export const useMonophaseInvertersStore =
  defineStore('monophase_inverters', () => {

  const monophaseInverters = ref<IMonophaseInverter[]>([])
  const availableMonophaseInverters = computed(() =>
    monophaseInverters.value.filter(inverter => !inverter.deleted));
  const fetching = ref(false);
  const error = ref(false);
  const errorDetails = ref<AxiosError>();

  const fetchMonophaseInverters = async () => {
    fetching.value = true;
    return axios
      .get('/monophase_inverters/')
      .then(response => {
        monophaseInverters.value = response.data;
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

  const addMonophaseInverter = async (inverter: IMonophaseInverter) => {
    return axios
      .post('/monophase_inverters/', inverter)
      .then(() => {
        error.value = false;
        fetchMonophaseInverters();
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      });
  }

  const editMonophaseInverter = async (inverter: IMonophaseInverter) => {
    return axios
      .patch(`/monophase_inverters/${inverter.id}`, inverter)
      .then(() => {
        error.value = false;
        fetchMonophaseInverters();
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      });
  }

  const deleteMonophaseInverter = async (id: string) => {
    return axios
      .delete(`/monophase_inverters/${id}`)
      .then(() => {
        error.value = false;
        fetchMonophaseInverters();
      })
      .catch((errorResponse) => {
        error.value = true;
        errorDetails.value = errorResponse;
      })
  }

  return { monophaseInverters, availableMonophaseInverters, fetching, error, errorDetails,
    fetchMonophaseInverters, addMonophaseInverter, editMonophaseInverter, deleteMonophaseInverter };
})
