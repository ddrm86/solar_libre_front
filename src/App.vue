<script setup lang="ts">
import { RouterView } from 'vue-router'
import axios from "axios";
import 'primeicons/primeicons.css'
import MainMenu from '@/components/MainMenu.vue'

const apiBaseUrl = import.meta.env.VITE_SOLAR_LIBRE_API_BASE_URL;
const apiPort = import.meta.env.VITE_SOLAR_LIBRE_API_PORT;
axios.defaults.baseURL = `${apiBaseUrl}:${apiPort}`;
axios.defaults.timeout = 2000;
</script>

<template>
  <Toast />
  <header>
    <div class="p-4">
      <nav>
        <MainMenu />
      </nav>
    </div>
  </header>
  <main>
    <div class="w-screen p-4">
      <RouterView />
    </div>
  </main>
</template>
