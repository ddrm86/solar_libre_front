<template>
  <SelectButton v-model="locale" :options="availableLocales"/>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n({
  useScope: 'global',
})
</script>
