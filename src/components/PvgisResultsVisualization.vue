<template>
  <div>
    <h2>{{ t('pvgis_results.title') }}</h2>
    <div v-if="pvgisData">
      <!-- Tabla de producción mensual -->
      <DataTable size="small" :value="monthlyProduction" class="p-mb-4">
        <Column field="month" :header="t('pvgis_results.month')"></Column>
        <Column field="E_m" :header="t('pvgis_results.E_m')"></Column>
      </DataTable>

      <!-- Tabla de datos proporcionados -->
      <h3>{{ t('pvgis_results.provided_data') }}</h3>
      <DataTable :value="providedData" class="p-mb-4">
        <Column field="label" :header="t('pvgis_results.label')"></Column>
          <Column field="value" :header="t('pvgis_results.value')"></Column>
      </DataTable>

      <!-- Tabla de resultados de la simulación -->
      <h3>{{ t('pvgis_results.simulation_results') }}</h3>
      <DataTable :value="simulationResults" class="p-mb-4">
          <Column field="label" :header="t('pvgis_results.label')"></Column>
          <Column field="value" :header="t('pvgis_results.value')"></Column>
      </DataTable>

      <!-- Tabla de cambios en la producción -->
      <h3>{{ t('pvgis_results.production_changes') }}</h3>
      <DataTable :value="productionChanges">
          <Column field="label" :header="t('pvgis_results.label')"></Column>
          <Column field="value" :header="t('pvgis_results.value')"></Column>
      </DataTable>
    </div>
    <div v-else>
      <p>{{ t('pvgis_results.no_data') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSolarArrayStore } from '@/stores/solarArray.ts'

const { t } = useI18n()
const solarArrayStore = useSolarArrayStore()

const pvgisData = computed(() => solarArrayStore.pvgisData?.response || null)

const monthlyProduction = computed(() =>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  pvgisData.value?.monthly.map((item: any) => ({
    month: t(`months.${item.month}`),
    E_m: item.E_m.toFixed(2),
  })) || []
)

const providedData = computed(() => [
  { label: t('pvgis_results.database'), value: pvgisData.value?.database },
])

const simulationResults = computed(() => [
  { label: t('pvgis_results.annual_production'), value: `${pvgisData.value?.totals.E_y} kWh` },
  { label: t('pvgis_results.monthly_production'), value: `${pvgisData.value?.totals.E_m.toFixed(2)} kWh` },
  { label: t('pvgis_results.annual_irradiation'), value: `${pvgisData.value?.totals.Hi_y} kWh/m²` },
  { label: t('pvgis_results.monthly_irradiation'), value: `${pvgisData.value?.totals.Hi_m.toFixed(2)} kWh/m²` },
])

const productionChanges = computed(() => [
  { label: t('pvgis_results.incidence_angle'), value: `${pvgisData.value?.totals.l_aoi.toFixed(2)} %` },
  { label: t('pvgis_results.spectral_effects'), value: `${pvgisData.value?.totals.l_spec.toFixed(2)} %` },
  { label: t('pvgis_results.temperature_effects'), value: `${pvgisData.value?.totals.l_tg.toFixed(2)} %` },
  { label: t('pvgis_results.total_losses'), value: `${pvgisData.value?.totals.l_total.toFixed(2)} %` },
])
</script>

<i18n>
{
  "en": {
    "pvgis_results": {
      "title": "PVGIS Results",
      "month": "Month",
      "E_m": "E_m",
      "provided_data": "Provided Data",
      "simulation_results": "Simulation Results",
      "production_changes": "Production Changes",
      "label": "Label",
      "value": "Value",
      "database": "Database",
      "installed_power": "Installed PV [kWp]",
      "system_losses": "System Losses [%]",
      "annual_production": "Annual PV Production [kWh]",
      "monthly_production": "Monthly PV Production [kWh]",
      "annual_irradiation": "Annual Irradiation [kWh/m²]",
      "monthly_irradiation": "Monthly Irradiation [kWh/m²]",
      "annual_variation": "Annual Variation [kWh]",
      "incidence_angle": "Incidence Angle [%]",
      "spectral_effects": "Spectral Effects [%]",
      "temperature_effects": "Temperature and Low Irradiance [%]",
      "total_losses": "Total Losses [%]",
      "no_data": "No data available"
    },
    "months": {
      "January": "January",
      "February": "February",
      "March": "March",
      "April": "April",
      "May": "May",
      "June": "June",
      "July": "July",
      "August": "August",
      "September": "September",
      "October": "October",
      "November": "November",
      "December": "December"
    }
  },
  "es": {
    "pvgis_results": {
      "title": "Resultados PVGIS",
      "month": "Mes",
      "E_m": "E_m",
      "provided_data": "Datos Proporcionados",
      "simulation_results": "Resultados de la Simulación",
      "production_changes": "Cambios en la Producción",
      "label": "Etiqueta",
      "value": "Valor",
      "database": "Base de datos",
      "installed_power": "FV instalada [kWp]",
      "system_losses": "Pérdidas del sistema [%]",
      "annual_production": "Producción anual media FV [kWh]",
      "monthly_production": "Producción mensual media FV [kWh]",
      "annual_irradiation": "Irradiación anual [kWh/m²]",
      "monthly_irradiation": "Irradiación mensual [kWh/m²]",
      "annual_variation": "Variación interanual [kWh]",
      "incidence_angle": "Ángulo de incidencia [%]",
      "spectral_effects": "Efectos espectrales [%]",
      "temperature_effects": "Temperatura y baja irradiancia [%]",
      "total_losses": "Pérdidas totales [%]",
      "no_data": "No hay datos disponibles"
    },
    "months": {
      "January": "Enero",
      "February": "Febrero",
      "March": "Marzo",
      "April": "Abril",
      "May": "Mayo",
      "June": "Junio",
      "July": "Julio",
      "August": "Agosto",
      "September": "Septiembre",
      "October": "Octubre",
      "November": "Noviembre",
      "December": "Diciembre"
    }
  }
}
</i18n>
