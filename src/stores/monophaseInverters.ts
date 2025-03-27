import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosError } from 'axios'
import type { MonophaseInverter } from '@/models/monophaseInverter.ts'

export const useMonophaseInvertersStore =
  defineStore('monophase_inverters', () => {

  const monophaseInverters = ref<MonophaseInverter[]>([])
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

  const addMonophaseInverter = async (inverter: MonophaseInverter) => {
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

  const editMonophaseInverter = async (inverter: MonophaseInverter) => {
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
