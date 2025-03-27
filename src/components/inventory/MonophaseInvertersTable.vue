<template>
  <div v-if="!fetchingError">
    <Card>
      <template #title>
        {{ t('labels.title') }}
        <Divider />
      </template>
      <template #content>
        <DataTable
          :value="monophaseInvertersStore.availableMonophaseInverters"
          :loading="monophaseInvertersStore.fetching"
          dataKey="id"
          stripedRows
          sortField="model"
          :sortOrder="1"
          v-model:filters="filters"
          :globalFilterFields="['model', 'description']"
          filterDisplay="row"
        >
          <template #header>
            <div class="flex justify-between">
              <div>
                <Button :label="t('button.new')" icon="pi pi-plus" @click="openNew" />
              </div>
              <div>
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText
                    v-model="filters['global'].value"
                    :placeholder="t('labels.keyword_search')"
                  />
                </IconField>
              </div>
            </div>
          </template>
          <Column field="maker" :header="t('monophaseInverter.maker')" sortable></Column>
          <Column field="model" :header="t('monophaseInverter.model')" sortable></Column>
          <Column field="recommended_max_input_power" :header="t('monophaseInverter.recommended_max_input_power')" sortable></Column>
          <Column field="nominal_output_power" :header="t('monophaseInverter.nominal_output_power')" sortable></Column>
          <Column field="max_input_voltage" :header="t('monophaseInverter.max_input_voltage')" sortable></Column>
          <Column field="startup_voltage" :header="t('monophaseInverter.startup_voltage')" sortable></Column>
          <Column field="min_mppt_operating_voltage" :header="t('monophaseInverter.min_mppt_operating_voltage')" sortable></Column>
          <Column field="max_mppt_operating_voltage" :header="t('monophaseInverter.max_mppt_operating_voltage')" sortable></Column>
          <Column field="max_input_current_per_mppt" :header="t('monophaseInverter.max_input_current_per_mppt')" sortable></Column>
          <Column field="max_short_circuit_current" :header="t('monophaseInverter.max_short_circuit_current')" sortable></Column>
          <Column field="number_of_mppts" :header="t('monophaseInverter.number_of_mppts')" sortable></Column>
          <Column field="max_inputs_per_mppt" :header="t('monophaseInverter.max_inputs_per_mppt')" sortable></Column>
          <Column field="max_output_current" :header="t('monophaseInverter.max_output_current')" sortable></Column>
          <Column field="reference" :header="t('monophaseInverter.reference')" sortable></Column>
          <Column field="description" :header="t('monophaseInverter.description')" sortable></Column>
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editMonophaseInverter(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteMonophaseInverter(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <div v-else>
    <h2 class="text-xl font-bold">{{ t('messages.fetching_error') }}</h2>
    <small class="text-red-500">{{ monophaseInvertersStore.errorDetails }}</small>
  </div>

  <Dialog v-model:visible="monophaseInverterDialog" :header="t('dialog.header')" :modal="true">
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="maker"
          v-model="selectedMonophaseInverter.maker"
          required="true"
          autofocus
          :invalid="submitted && !selectedMonophaseInverter.maker"
        />
        <label for="maker">{{ t('monophaseInverter.maker') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="model"
          v-model="selectedMonophaseInverter.model"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.model"
        />
        <label for="model">{{ t('monophaseInverter.model') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="recommended_max_input_power"
          v-model="selectedMonophaseInverter.recommended_max_input_power"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.recommended_max_input_power"
          :min="0"
        />
        <label for="recommended_max_input_power">{{ t('monophaseInverter.recommended_max_input_power') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="nominal_output_power"
          v-model="selectedMonophaseInverter.nominal_output_power"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.nominal_output_power"
          :min="0"
        />
        <label for="nominal_output_power">{{ t('monophaseInverter.nominal_output_power') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="max_input_voltage"
          v-model="selectedMonophaseInverter.max_input_voltage"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.max_input_voltage"
          :min="0"
        />
        <label for="max_input_voltage">{{ t('monophaseInverter.max_input_voltage') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="startup_voltage"
          v-model="selectedMonophaseInverter.startup_voltage"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.startup_voltage"
          :min="0"
        />
        <label for="startup_voltage">{{ t('monophaseInverter.startup_voltage') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="min_mppt_operating_voltage"
          v-model="selectedMonophaseInverter.min_mppt_operating_voltage"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.min_mppt_operating_voltage"
          :min="0"
        />
        <label for="min_mppt_operating_voltage">{{ t('monophaseInverter.min_mppt_operating_voltage') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="max_mppt_operating_voltage"
          v-model="selectedMonophaseInverter.max_mppt_operating_voltage"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.max_mppt_operating_voltage"
          :min="0"
        />
        <label for="max_mppt_operating_voltage">{{ t('monophaseInverter.max_mppt_operating_voltage') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="max_input_current_per_mppt"
          v-model="selectedMonophaseInverter.max_input_current_per_mppt"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.max_input_current_per_mppt"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="max_input_current_per_mppt">{{ t('monophaseInverter.max_input_current_per_mppt') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="max_short_circuit_current"
          v-model="selectedMonophaseInverter.max_short_circuit_current"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.max_short_circuit_current"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="max_short_circuit_current">{{ t('monophaseInverter.max_short_circuit_current') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="number_of_mppts"
          v-model="selectedMonophaseInverter.number_of_mppts"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.number_of_mppts"
          :min="0"
        />
        <label for="number_of_mppts">{{ t('monophaseInverter.number_of_mppts') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="max_inputs_per_mppt"
          v-model="selectedMonophaseInverter.max_inputs_per_mppt"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.max_inputs_per_mppt"
          :min="0"
        />
        <label for="max_inputs_per_mppt">{{ t('monophaseInverter.max_inputs_per_mppt') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="max_output_current"
          v-model="selectedMonophaseInverter.max_output_current"
          required="true"
          :invalid="submitted && !selectedMonophaseInverter.max_output_current"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="max_output_current">{{ t('monophaseInverter.max_output_current') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputText id="reference" v-model="selectedMonophaseInverter.reference" />
        <label for="reference">{{ t('monophaseInverter.reference') }}</label>
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <Textarea id="description" v-model="selectedMonophaseInverter.description" rows="3" cols="20" fluid />
        <label for="description">{{ t('monophaseInverter.description') }}</label>
      </IftaLabel>
    </div>

    <div v-if="submitted && !validateMonophaseInverter(selectedMonophaseInverter)">
      <small class="text-red-500">{{ t('messages.required_fields') }}.</small>
    </div>

    <template #footer>
      <Button :label="t('button.cancel')" icon="pi pi-times" text @click="hideDialog" />
      <Button :label="t('button.save')" :loading="savingMonophaseInverter" icon="pi pi-check" @click="saveMonophaseInverter" />
    </template>
  </Dialog>

  <Dialog v-model:visible="deleteMonophaseInverterDialog" :header="t('dialog.confirm_header')" :modal="true">
    <div class="flex flex-col justify-center">
      <div class="flex items-center pb-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span>{{ t('dialog.confirm_delete') }}</span>
      </div>
      <div class="flex items-center max-w-64 bg-slate-100 rounded shadow mx-auto">
        <small class="truncate ..."
        >{{ selectedMonophaseInverter.model }} - {{ selectedMonophaseInverter.description }}</small
        >
      </div>
    </div>
    <template #footer>
      <Button
        :label="t('button.no')"
        icon="pi pi-times"
        text
        autofocus
        @click="deleteMonophaseInverterDialog = false"
      />
      <Button
        :label="t('button.yes')"
        icon="pi pi-check"
        severity="danger"
        :loading="deletingMonophaseInverter"
        @click="deleteMonophaseInverter"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useMonophaseInvertersStore } from '@/stores/monophaseInverters.ts'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { FilterMatchMode } from '@primevue/core/api'
import { type MonophaseInverter, validateMonophaseInverter } from '@/models/monophaseInverter.ts'

const { t } = useI18n()
const toast = useToast()
const monophaseInvertersStore = useMonophaseInvertersStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const fetchingError = ref(false)
const selectedMonophaseInverter = ref({} as MonophaseInverter)
const monophaseInverterDialog = ref(false)
const deleteMonophaseInverterDialog = ref(false)
const submitted = ref(false)
const savingMonophaseInverter = ref(false)
const deletingMonophaseInverter = ref(false)

onMounted(() => {
  monophaseInvertersStore.fetchMonophaseInverters().then(() => {
    fetchingError.value = monophaseInvertersStore.error
  })
})

const openNew = () => {
  selectedMonophaseInverter.value = {} as MonophaseInverter
  submitted.value = false
  monophaseInverterDialog.value = true
}

const hideDialog = () => {
  monophaseInverterDialog.value = false
  submitted.value = false
}

const saveMonophaseInverter = () => {
  submitted.value = true

  if (validateMonophaseInverter(selectedMonophaseInverter.value)) {
    const editing = selectedMonophaseInverter.value.id
    savingMonophaseInverter.value = true
    if (editing) {
      saveChanges()
    } else {
      saveNew()
    }
    savingMonophaseInverter.value = false
  }

  function saveNew() {
    monophaseInvertersStore.addMonophaseInverter(selectedMonophaseInverter.value).then(() => {
      if (monophaseInvertersStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: t('messages.adding_monophaseInverter_error') + monophaseInvertersStore.errorDetails,
          life: 3000,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.success'),
          detail: t('messages.monophaseInverter_added'),
          life: 3000,
        })
      }
    })
    selectedMonophaseInverter.value = {} as MonophaseInverter
    monophaseInverterDialog.value = false
  }

  function saveChanges() {
    monophaseInvertersStore.editMonophaseInverter(selectedMonophaseInverter.value).then(() => {
      if (monophaseInvertersStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: t('messages.editing_monophaseInverter_error') + monophaseInvertersStore.errorDetails,
          life: 3000,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.success'),
          detail: t('messages.monophaseInverter_edited'),
          life: 3000,
        })
      }
    })
    selectedMonophaseInverter.value = {} as MonophaseInverter
    monophaseInverterDialog.value = false
  }
}

const editMonophaseInverter = (monophaseInverter: MonophaseInverter) => {
  selectedMonophaseInverter.value = { ...monophaseInverter }
  monophaseInverterDialog.value = true
}

const confirmDeleteMonophaseInverter = (monophaseInverter: MonophaseInverter) => {
  selectedMonophaseInverter.value = monophaseInverter
  deleteMonophaseInverterDialog.value = true
}

const deleteMonophaseInverter = () => {
  const monophaseInverter_id = selectedMonophaseInverter.value?.id
  if (!monophaseInverter_id) {
    throw new Error('Selected monophaseInverter has no id.')
  }
  deletingMonophaseInverter.value = true
  monophaseInvertersStore
    .deleteMonophaseInverter(monophaseInverter_id)
    .then(() => {
      if (monophaseInvertersStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: t('messages.deleting_monophaseInverter_error') + monophaseInvertersStore.errorDetails,
          life: 3000,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.success'),
          detail: t('messages.monophaseInverter_deleted'),
          life: 3000,
        })
      }
    })
    .finally(() => {
      selectedMonophaseInverter.value = {} as MonophaseInverter
      deleteMonophaseInverterDialog.value = false
      deletingMonophaseInverter.value = false
    })
}
</script>

<i18n>
{
  "en": {
    "monophaseInverter": {
      "maker": "Maker",
      "model": "Model",
      "recommended_max_input_power": "Recommended Max Input Power",
      "nominal_output_power": "Nominal Output Power",
      "max_input_voltage": "Max Input Voltage",
      "startup_voltage": "Startup Voltage",
      "min_mppt_operating_voltage": "Min MPPT Operating Voltage",
      "max_mppt_operating_voltage": "Max MPPT Operating Voltage",
      "max_input_current_per_mppt": "Max Input Current per MPPT",
      "max_short_circuit_current": "Max Short Circuit Current",
      "number_of_mppts": "Number of MPPTs",
      "max_inputs_per_mppt": "Max Inputs per MPPT",
      "max_output_current": "Max Output Current",
      "reference": "Reference",
      "description": "Description"
    },
    "dialog": {
      "header": "Monophase Inverter details",
      "confirm_header": "Confirm",
      "confirm_delete": "Are you sure you want to delete this monophase inverter?️"
    },
    "button": {
      "new": "New",
      "no": "No",
      "yes": "Yes",
      "save": "Save",
      "cancel": "Cancel"
    },
    "messages": {
      "success": "Success",
      "error": "Error",
      "fetching_error": "There was an error fetching the data from the database. Please try again later.",
      "monophaseInverter_added": "Monophase Inverter added",
      "adding_monophaseInverter_error": "Error adding the monophase inverter: ",
      "editing_monophaseInverter_error": "Error editing the monophase inverter: ",
      "monophaseInverter_edited": "Monophase Inverter edited",
      "deleting_monophaseInverter_error": "Error deleting the monophase inverter: ",
      "monophaseInverter_deleted": "Monophase Inverter deleted",
      "required_fields": "There are required fields left blank"
    },
    "labels": {
      "title": "Monophase Inverters",
      "keyword_search": "Search"
    }
  },
  "es": {
    "monophaseInverter": {
      "maker": "Fabricante",
      "model": "Modelo",
      "recommended_max_input_power": "Potencia Máxima Recomendada de Entrada",
      "nominal_output_power": "Potencia Nominal de Salida",
      "max_input_voltage": "Voltaje Máximo de Entrada",
      "startup_voltage": "Voltaje de Arranque",
      "min_mppt_operating_voltage": "Voltaje Mínimo de Operación MPPT",
      "max_mppt_operating_voltage": "Voltaje Máximo de Operación MPPT",
      "max_input_current_per_mppt": "Corriente Máxima de Entrada por MPPT",
      "max_short_circuit_current": "Corriente Máxima de Cortocircuito",
      "number_of_mppts": "Número de MPPTs",
      "max_inputs_per_mppt": "Entradas Máximas por MPPT",
      "max_output_current": "Corriente Máxima de Salida",
      "reference": "Referencia",
      "description": "Descripción"
    },
    "dialog": {
      "header": "Detalles del Inversor Monofásico",
      "confirm_header": "Confirmar",
      "confirm_delete": "¿Estás seguro de que deseas eliminar este inversor monofásico?️"
    },
    "button": {
      "new": "Nuevo",
      "no": "No",
      "yes": "Sí",
      "save": "Guardar",
      "cancel": "Cancelar"
    },
    "messages": {
      "success": "Éxito",
      "error": "Error",
      "fetching_error": "Hubo un error al obtener los datos de la base de datos. Por favor, inténtelo de nuevo más tarde.",
      "monophaseInverter_added": "Inversor Monofásico añadido",
      "adding_monophaseInverter_error": "Error añadiendo el inversor monofásico: ",
      "editing_monophaseInverter_error": "Error editando el inversor monofásico: ",
      "monophaseInverter_edited": "Inversor Monofásico editado",
      "deleting_monophaseInverter_error": "Error eliminando el inversor monofásico: ",
      "monophaseInverter_deleted": "Inversor Monofásico eliminado",
      "required_fields": "Hay campos obligatorios sin rellenar"
    },
    "labels": {
      "title": "Inversores Monofásicos",
      "keyword_search": "Buscar"
    }
  }
}
</i18n>
