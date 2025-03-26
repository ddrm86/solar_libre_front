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
  },
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
    "inventory": "Inventory",
    "panels": "Solar panels",
    "monophase_inverters": "Monophase Inverters"
  },
  "es": {
    "home": "Inicio",
    "inventory": "Inventario",
    "panels": "Paneles solares",
    "monophase_inverters": "Inversores Monofásicos"
  }
}
</i18n>
