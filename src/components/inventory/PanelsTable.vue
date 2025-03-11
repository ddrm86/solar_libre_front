<template>
  <div v-if="!fechingError">
    <Toolbar>
      <template #start>
        <Button :label="t('button.new')" icon="pi pi-plus" @click="openNew" />
      </template>
    </Toolbar>

    <DataTable :value="panelsStore.availablePanels" dataKey="id" :loading="panelsStore.fetching">
      <Column field="model" :header="t('panel.model')"></Column>
      <Column field="nominal_power" :header="t('panel.nominal_power')"></Column>
      <Column field="vmpp" :header="t('panel.vmpp')"></Column>
      <Column field="impp" :header="t('panel.impp')"></Column>
      <Column field="voc" :header="t('panel.voc')"></Column>
      <Column field="isc" :header="t('panel.isc')"></Column>
      <Column field="length" :header="t('panel.length')"></Column>
      <Column field="width" :header="t('panel.width')"></Column>
      <Column field="reference" :header="t('panel.reference')"></Column>
      <Column field="description" :header="t('panel.description')"></Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editPanel(slotProps.data)"/>
        </template>
      </Column>
    </DataTable>
  </div>
  <div v-else>
    <h2 class="text-xl font-bold">{{ t('messages.fetching_error') }}</h2>
    <small class="text-red-500">{{ panelsStore.errorDetails }}</small>
  </div>

  <Dialog v-model:visible="panelDialog" :header="t('dialog.header')" :modal="true">
    <div>
      <IftaLabel>
        <InputText
          id="model"
          v-model="selectedPanel.model"
          required="true"
          autofocus
          :invalid="submitted && !selectedPanel.model"
        />
        <label for="model">{{ t('panel.model') }}</label>
        <small v-if="submitted && !selectedPanel.model" class="text-red-500"
          >El modelo es requerido.</small
        >
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="nominal_power"
          v-model="selectedPanel.nominal_power"
          required="true"
          :invalid="submitted && !selectedPanel.nominal_power"
          :min="0"
        />
        <label for="nominal_power">{{ t('panel.nominal_power') }}</label>
        <small v-if="submitted && !selectedPanel.nominal_power" class="text-red-500"
          >La potencia nominal es requerida.</small
        >
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="vmpp"
          v-model="selectedPanel.vmpp"
          required="true"
          :invalid="submitted && !selectedPanel.vmpp"
          :minFractionDigits="2" :maxFractionDigits="2" :min="0"
        />
        <label for="vmpp">{{ t('panel.vmpp') }}</label>
        <small v-if="submitted && !selectedPanel.vmpp" class="text-red-500"
          >Vmpp es requerido.</small
        >
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="impp"
          v-model="selectedPanel.impp"
          required="true"
          :invalid="submitted && !selectedPanel.impp"
          :minFractionDigits="2" :maxFractionDigits="2" :min="0"
        />
        <label for="impp">{{ t('panel.impp') }}</label>
        <small v-if="submitted && !selectedPanel.impp" class="text-red-500"
          >Impp es requerido.</small
        >
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="voc"
          v-model="selectedPanel.voc"
          required="true"
          :invalid="submitted && !selectedPanel.voc"
          :minFractionDigits="2" :maxFractionDigits="2" :min="0"
        />
        <label for="voc">{{ t('panel.voc') }}</label>
        <small v-if="submitted && !selectedPanel.voc" class="text-red-500">Voc es requerido.</small>
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="isc"
          v-model="selectedPanel.isc"
          required="true"
          :invalid="submitted && !selectedPanel.isc"
          :minFractionDigits="2" :maxFractionDigits="2" :min="0"
        />
        <label for="isc">{{ t('panel.isc') }}</label>
        <small v-if="submitted && !selectedPanel.isc" class="text-red-500">Isc es requerido.</small>
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="length"
          v-model="selectedPanel.length"
          required="true"
          :invalid="submitted && !selectedPanel.length"
          :minFractionDigits="0" :maxFractionDigits="2" :min="0"
        />
        <label for="length">{{ t('panel.length') }}</label>
        <small v-if="submitted && !selectedPanel.length" class="text-red-500"
          >El largo es requerido.</small
        >
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputNumber
          id="width"
          v-model="selectedPanel.width"
          required="true"
          :invalid="submitted && !selectedPanel.width"
          :minFractionDigits="0" :maxFractionDigits="2" :min="0"
        />
        <label for="width">{{ t('panel.width') }}</label>
        <small v-if="submitted && !selectedPanel.width" class="text-red-500"
          >El ancho es requerido.</small
        >
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <InputText id="reference" v-model="selectedPanel.reference" />
        <label for="reference">{{ t('panel.reference') }}</label>
      </IftaLabel>
    </div>
    <div>
      <IftaLabel>
        <Textarea
          id="description"
          v-model="selectedPanel.description"
          rows="3"
          cols="20"
          fluid
        />
        <label for="description">{{ t('panel.description') }}</label>
      </IftaLabel>
    </div>

    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Guardar" :loading="savingPanel" icon="pi pi-check" @click="savePanel" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { usePanelsStore, type Panel } from '@/stores/panels.ts'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {useToast} from 'primevue/usetoast';

const { t } = useI18n()
const toast = useToast();
const panelsStore = usePanelsStore()

const fechingError = ref(false);
const selectedPanel = ref({} as Panel)
const panelDialog = ref(false)
const submitted = ref(false)
const savingPanel = ref(false)

onMounted(() => {
  panelsStore.fetchPanels().then(() => {
    fechingError.value = panelsStore.error;
  })
})

const openNew = () => {
  selectedPanel.value = {} as Panel
  submitted.value = false
  panelDialog.value = true
}

const hideDialog = () => {
  panelDialog.value = false
  submitted.value = false
}

const savePanel = () => {
  submitted.value = true;

  if (selectedPanel.value.model?.trim()) {
    const editing = selectedPanel.value.id;
    savingPanel.value = true;
    if (editing) {
      saveChanges();
    } else {
      saveNew();
    }
    savingPanel.value = false;
  }

  function saveNew() {
    panelsStore.addPanel(selectedPanel.value)
      .then(() => {
        if (panelsStore.error) {
          toast.add({ severity: 'error', summary: t('messages.error'),
            detail: t('messages.adding_panel_error') + panelsStore.errorDetails, life: 3000 });
        } else {
          toast.add({ severity: 'success', summary: t('messages.success'),
            detail: t('messages.panel_added'), life: 3000 });
        }
      });
    selectedPanel.value = {} as Panel;
    panelDialog.value = false;
  }

  function saveChanges() {
    panelsStore.editPanel(selectedPanel.value)
      .then(() => {
        if (panelsStore.error) {
          toast.add({ severity: 'error', summary: t('messages.error'),
            detail: t('messages.editing_panel_error') + panelsStore.errorDetails, life: 3000 });
        } else {
          toast.add({ severity: 'success', summary: t('messages.success'),
            detail: t('messages.panel_edited'), life: 3000 });
        }
      });
    selectedPanel.value = {} as Panel;
    panelDialog.value = false;
  }
}

const editPanel = (panel: Panel) => {
  selectedPanel.value = { ...panel };
  panelDialog.value = true;
};
</script>

<i18n>
{
  "en": {
    "panel": {
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
      "header": "Panel details"
    },
    "button": {
      "new": "New"
    },
    "messages": {
      "success": "Success",
      "error": "Error",
      "fetching_error": "There was an error fetching the data from the database. Please try again later.",
      "panel_added": "Panel added",
      "adding_panel_error": "Error adding the panel: ",
      "editing_panel_error": "Error editing the panel: ",
      "panel_edited": "Panel edited"
    }
  },
  "es": {
    "panel": {
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
      "header": "Detalles del panel"
    },
    "button": {
      "new": "Nuevo"
    },
    "messages": {
      "success": "Éxito",
      "error": "Error",
      "fetching_error": "Hubo un error al obtener los datos de la base de datos. Por favor, inténtelo de nuevo más tarde.",
      "panel_added": "Panel añadido",
      "adding_panel_error": "Error añadiendo el panel: ",
      "editing_panel_error": "Error editando el panel: ",
      "panel_edited": "Panel editado"
    }
  }
}
</i18n>
