<template>
  <Menubar :model="items" class="main-menubar">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const items = ref([
  {
    label: t('home'),
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: t('project_info'),
    icon: 'pi pi-map-marker',
    route: '/project_info'
  },
  {
    label: t('consumption'),
    icon: 'pi pi pi-gauge',
    route: '/consumption'
  },
  {
    label: t('solar_arrays'),
    icon: 'pi pi-table',
    route: '/solar_arrays'
  },
  {
    label: t('inverters_setup'),
    icon: 'pi pi-bolt',
    route: '/inverters_setup'
  },
  {
    label: t('economic_balance'),
    icon: 'pi pi-wallet',
    route: '/economic_balance'
  },
  {
    label: t('inventory'),
    icon: 'pi pi-warehouse',
    items: [
      {
        label: t('panels'),
        icon: 'pi pi-sun',
        route: '/inventory/panels'
      },
      {
        label: t('monophase_inverters'),
        icon: 'pi pi-bolt',
        route: '/inventory/monophase_inverters'
      }
    ]
  }
])
</script>

<style scoped>
.main-menubar {
  --p-menubar-background: var(--color-stone-50);
}
</style>

<i18n>
{
  "en": {
    "home": "Home",
    "project_info": "Project info",
    "consumption": "Consumption",
    "solar_arrays": "Solar arrays",
    "inventory": "Inventory",
    "inverters_setup": "Inverters setup",
    "economic_balance": "Economic balance",
    "panels": "Solar panels",
    "monophase_inverters": "Monophase inverters"
  },
  "es": {
    "home": "Inicio",
    "project_info": "Información del proyecto",
    "consumption": "Consumo",
    "solar_arrays": "Matrices solares",
    "inventory": "Inventario",
    "inverters_setup": "Configuración de inversores",
    "economic_balance": "Balance económico",
    "panels": "Paneles solares",
    "monophase_inverters": "Inversores monofásicos"
  }
}
</i18n>
