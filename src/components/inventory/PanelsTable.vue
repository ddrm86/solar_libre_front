<template>
  <div v-if="!fetchingError">
    <Card>
      <template #title>
        {{ t('labels.title') }}
        <Divider />
      </template>
      <template #content>
        <DataTable
          :value="panelsStore.availablePanels"
          :loading="panelsStore.fetching"
          dataKey="id"
          stripedRows
          scrollable
          scrollHeight="flex"
          sortField="maker"
          :sortOrder="1"
          v-model:filters="filters"
          :globalFilterFields="['maker', 'model', 'description']"
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
          <Column
            field="maker"
            :header="t('panel.maker')"
            :sortable="true"
            :frozen="true"
            alignFrozen="left"
          ></Column>
          <Column
            field="model"
            :header="t('panel.model')"
            :sortable="true"
            :frozen="true"
            alignFrozen="left"
          ></Column>
          <Column
            field="nominal_power"
            :header="t('panel.nominal_power')"
            :sortable="true"
          ></Column>
          <Column field="vmpp" :header="t('panel.vmpp')" :sortable="true"></Column>
          <Column field="impp" :header="t('panel.impp')" :sortable="true"></Column>
          <Column field="voc" :header="t('panel.voc')" :sortable="true"></Column>
          <Column field="isc" :header="t('panel.isc')" :sortable="true"></Column>
          <Column field="length" :header="t('panel.length')" :sortable="true"></Column>
          <Column field="width" :header="t('panel.width')" :sortable="true"></Column>
          <Column field="reference" :header="t('panel.reference')" :sortable="true"></Column>
          <Column field="description" :header="t('panel.description')" :sortable="true"></Column>
          <Column :exportable="false" :frozen="true" alignFrozen="right">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editPanel(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeletePanel(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <div v-else>
    <h2 class="text-xl font-bold">{{ t('messages.fetching_error') }}</h2>
    <small class="text-red-500">{{ panelsStore.errorDetails }}</small>
  </div>

  <Dialog v-model:visible="panelDialog" :header="t('dialog.header')" :modal="true">
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="maker"
          v-model="selectedPanel.maker"
          required="true"
          autofocus
          :invalid="submitted && !selectedPanel.maker"
        />
        <label for="maker">{{ t('panel.maker') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputText
          id="model"
          v-model="selectedPanel.model"
          required="true"
          :invalid="submitted && !selectedPanel.model"
        />
        <label for="model">{{ t('panel.model') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="nominal_power"
          v-model="selectedPanel.nominal_power"
          required="true"
          :invalid="submitted && !selectedPanel.nominal_power"
          :min="0"
        />
        <label for="nominal_power">{{ t('panel.nominal_power') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="vmpp"
          v-model="selectedPanel.vmpp"
          required="true"
          :invalid="submitted && !selectedPanel.vmpp"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="vmpp">{{ t('panel.vmpp') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="impp"
          v-model="selectedPanel.impp"
          required="true"
          :invalid="submitted && !selectedPanel.impp"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="impp">{{ t('panel.impp') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="voc"
          v-model="selectedPanel.voc"
          required="true"
          :invalid="submitted && !selectedPanel.voc"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="voc">{{ t('panel.voc') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="isc"
          v-model="selectedPanel.isc"
          required="true"
          :invalid="submitted && !selectedPanel.isc"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="isc">{{ t('panel.isc') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="length"
          v-model="selectedPanel.length"
          required="true"
          :invalid="submitted && !selectedPanel.length"
          :minFractionDigits="0"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="length">{{ t('panel.length') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputNumber
          id="width"
          v-model="selectedPanel.width"
          required="true"
          :invalid="submitted && !selectedPanel.width"
          :minFractionDigits="0"
          :maxFractionDigits="2"
          :min="0"
        />
        <label for="width">{{ t('panel.width') }}*</label>
      </IftaLabel>
    </div>
    <div class="pb-2">
      <IftaLabel>
        <InputText id="reference" v-model="selectedPanel.reference" />
        <label for="reference">{{ t('panel.reference') }}</label>
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <Textarea id="description" v-model="selectedPanel.description" rows="3" cols="20" fluid />
        <label for="description">{{ t('panel.description') }}</label>
      </IftaLabel>
    </div>

    <div v-if="submitted && !validatePanel(selectedPanel)">
      <small class="text-red-500">{{ t('messages.required_fields') }}.</small>
    </div>

    <template #footer>
      <Button :label="t('button.cancel')" icon="pi pi-times" text @click="hideDialog" />
      <Button
        :label="t('button.save')"
        :loading="savingPanel"
        icon="pi pi-check"
        @click="savePanel"
      />
    </template>
  </Dialog>

  <Dialog v-model:visible="deletePanelDialog" :header="t('dialog.confirm_header')" :modal="true">
    <div class="flex flex-col justify-center">
      <div class="flex items-center pb-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span>{{ t('dialog.confirm_delete') }}</span>
      </div>
      <div class="flex items-center max-w-64 bg-slate-100 rounded shadow mx-auto">
        <small class="truncate ...">
          {{ selectedPanel.maker }} {{ selectedPanel.model }} - {{ selectedPanel.description }}
        </small>
      </div>
    </div>
    <template #footer>
      <Button
        :label="t('button.no')"
        icon="pi pi-times"
        text
        autofocus
        @click="deletePanelDialog = false"
      />
      <Button
        :label="t('button.yes')"
        icon="pi pi-check"
        severity="danger"
        :loading="deletingPanel"
        @click="deletePanel"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { usePanelsStore } from '@/stores/inventory/panels.ts'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { FilterMatchMode } from '@primevue/core/api'
import { type IPanel, validatePanel } from '@/models/inventory/panel.ts'

const { t } = useI18n()
const toast = useToast()
const panelsStore = usePanelsStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const fetchingError = ref(false)
const selectedPanel = ref({} as IPanel)
const panelDialog = ref(false)
const deletePanelDialog = ref(false)
const submitted = ref(false)
const savingPanel = ref(false)
const deletingPanel = ref(false)

onMounted(() => {
  panelsStore.fetchPanels().then(() => {
    fetchingError.value = panelsStore.error
  })
})

const openNew = () => {
  selectedPanel.value = {} as IPanel
  submitted.value = false
  panelDialog.value = true
}

const hideDialog = () => {
  panelDialog.value = false
  submitted.value = false
}

const savePanel = () => {
  submitted.value = true

  if (validatePanel(selectedPanel.value)) {
    const editing = selectedPanel.value.id
    savingPanel.value = true
    if (editing) {
      saveChanges()
    } else {
      saveNew()
    }
    savingPanel.value = false
  }

  function saveNew() {
    panelsStore.addPanel(selectedPanel.value).then(() => {
      if (panelsStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: t('messages.adding_panel_error') + panelsStore.errorDetails,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.success'),
          detail: t('messages.panel_added'),
          life: 3000,
        })
      }
    })
    selectedPanel.value = {} as IPanel
    panelDialog.value = false
  }

  function saveChanges() {
    panelsStore.editPanel(selectedPanel.value).then(() => {
      if (panelsStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: t('messages.editing_panel_error') + panelsStore.errorDetails,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.success'),
          detail: t('messages.panel_edited'),
          life: 3000,
        })
      }
    })
    selectedPanel.value = {} as IPanel
    panelDialog.value = false
  }
}

const editPanel = (panel: IPanel) => {
  selectedPanel.value = { ...panel }
  panelDialog.value = true
}

const confirmDeletePanel = (panel: IPanel) => {
  selectedPanel.value = panel
  deletePanelDialog.value = true
}

const deletePanel = () => {
  const panel_id = selectedPanel.value?.id
  if (!panel_id) {
    throw new Error('Selected panel has no id.')
  }
  deletingPanel.value = true
  panelsStore
    .deletePanel(panel_id)
    .then(() => {
      if (panelsStore.error) {
        toast.add({
          severity: 'error',
          summary: t('messages.error'),
          detail: t('messages.deleting_panel_error') + panelsStore.errorDetails,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('messages.success'),
          detail: t('messages.panel_deleted'),
          life: 3000,
        })
      }
    })
    .finally(() => {
      selectedPanel.value = {} as IPanel
      deletePanelDialog.value = false
      deletingPanel.value = false
    })
}
</script>

<i18n>
{
  "en": {
    "panel": {
      "maker": "Maker",
      "model": "Model",
      "nominal_power": "Nominal Power",
      "vmpp": "Vmpp",
      "impp": "Impp",
      "voc": "Voc",
      "isc": "Isc",
      "length": "Length",
      "width": "Width",
      "reference": "Reference",
      "description": "Description"
    },
    "dialog": {
      "header": "Panel details",
      "confirm_header": "Confirm",
      "confirm_delete": "Are you sure you want to delete this panel?️"
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
      "panel_added": "Panel added",
      "adding_panel_error": "Error adding the panel: ",
      "editing_panel_error": "Error editing the panel: ",
      "panel_edited": "Panel edited",
      "deleting_panel_error": "Error deleting the panel: ",
      "panel_deleted": "Panel deleted",
      "required_field": "There are required fields left blank"
    },
    "labels": {
      "title": "Solar panels",
      "keyword_search": "Search"
    }
  },
  "es": {
    "panel": {
      "maker": "Fabricante",
      "model": "Modelo",
      "nominal_power": "Potencia Nominal",
      "vmpp": "Vmpp",
      "impp": "Impp",
      "voc": "Voc",
      "isc": "Isc",
      "length": "Largo",
      "width": "Ancho",
      "reference": "Referencia",
      "description": "Descripción"
    },
    "dialog": {
      "header": "Detalles del panel",
      "confirm_header": "Confirmar",
      "confirm_delete": "¿Estás seguro de que deseas eliminar este panel?️"
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
      "panel_added": "Panel añadido",
      "adding_panel_error": "Error añadiendo el panel: ",
      "editing_panel_error": "Error editando el panel: ",
      "panel_edited": "Panel editado",
      "deleting_panel_error": "Error eliminando el panel: ",
      "panel_deleted": "Panel eliminado",
      "required_fields": "Hay campos obligatorios sin rellenar"
    },
    "labels": {
      "title": "Paneles solares",
      "keyword_search": "Buscar"
    }
  }
}
</i18n>
