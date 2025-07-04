<template>
  <h1 class="text-emerald-500 font-bold text-2xl pb-4">{{ t('quick_start.welcome') }}</h1>
  <h2 class="text-emerald-600 font-semibold text-xl pb-2">{{ t('quick_start.guide_title') }}</h2>
  <ol class="list-decimal list-inside">
    <li class="pb-1.5">{{ t('quick_start.step1') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step2') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step3') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step4') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step5') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step6') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step7') }}</li>
    <li class="pb-1.5">{{ t('quick_start.step8') }}</li>
  </ol>
</template>

<script setup lang="ts">
/**
 * QuickStartGuide.vue
 *
 * This Vue component displays a quick start guide for new users,
 * outlining the main steps to begin working with the SolarLibre application.
 * It presents a welcome message, a guide title, and an ordered list
 * of instructions covering inventory setup, project loading, project
 * information, consumption entry, solar array configuration, inverter
 * setup, economic balance, and saving or reporting.
 *
 * Usage:
 * <QuickStartGuide />
 */

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<i18n>
{
  "en": {
    "quick_start": {
      "welcome": "Welcome to SolarLibre",
      "guide_title": "Quick Start Guide",
      "step1": "Add your solar panels and inverters to the inventory if you haven't done so yet.",
      "step2": "Load a project from the list to continue working on it, or do nothing to start a new project.",
      "step3": "In Project Information, choose a more readable name for your project and select the installation address using the map search. You can drag the marker to refine the exact position.",
      "step4": "In Consumption, indicate for each month and each price period (peak, flat, and valley) the household electricity consumption.",
      "step5": "In Solar Arrays, add arrays or sets of solar panels. You must specify the panel model from your inventory, the number of panels in the set, and the tilt and orientation or azimuth characteristics. You can adjust the default loss value. Don't forget to check the production data in PVGIS for each defined set.",
      "step6": "In Inverter Configuration, add one or more inverter models from your inventory to connect the panels. For each inverter, you can add as many MPPTs as the model has. For each MPPT, you can specify an unlimited number of series connections or strings.",
      "step7": "In Economic Balance, indicate the energy and photovoltaic installation costs. It is important that the costs and consumption data are as accurate as possible to obtain realistic economic estimates.",
      "step8": "At any time, you can save the project data or generate a report using the menu buttons."
    }
  },
  "es": {
    "quick_start": {
      "welcome": "Bienvenido a SolarLibre",
      "guide_title": "Guía rápida",
      "step1": "Añade tus paneles solares e inversores al inventario si aún no lo has hecho.",
      "step2": "Carga un proyecto de la lista para continuar trabajando en el mismo, o no hagas nada para empezar con un proyecto nuevo.",
      "step3": "En Información del proyecto, elige un nombre más legible para tu proyecto y escoge la dirección de la instalación usando la búsqueda del mapa. Puedes arrastrar el marcador para afinar mejor la posición exacta.",
      "step4": "En Consumo, indica para cada mes y cada tramo de precio (punta, llano y valle) el consumo de electricidad del hogar.",
      "step5": "En Matrices solares, añade matrices o conjuntos de paneles solares. Debes indicar el modelo de panel de entre los de tu inventario, el número de paneles del conjunto, y las características de inclinación y orientación o azimut. Puedes modificar la pérdida establecida por defecto. No te olvides de consultar los datos de producción en PVGIS por cada conjunto que definas.",
      "step6": "En Configuración de inversores, debes añadir uno o más modelos de inversor de tu inventario para conectar los paneles. Para cada inversor se pueden añadir tantos MPPTs como los que tenga el modelo. Para cada MPPT se puede especificar un número indeterminado de conexiones en serie o strings.",
      "step7": "En Balance económico, indica los costes de la energía y de la instalación fotovoltaica. Es importante que los costes y los datos de consumo sean lo más preciso posible para obtener estimaciones económicas realistas.",
      "step8": "En cualquier momento, puedes salvar los datos del proyecto o generar un informe usando los botones del menú."
    }
  }
}
</i18n>
