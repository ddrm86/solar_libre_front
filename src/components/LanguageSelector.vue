<template>
  <SelectButton v-model="locale" :options="availableLocales"/>
</template>

<script setup lang="ts">
/**
 * LanguageSelector.vue
 *
 * This Vue component provides a toggle button for selecting the application's locale from a list
 * of available options.
 *
 * Usage:
 * <LanguageSelector />
 */

import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n({
  useScope: 'global',
})
</script>
