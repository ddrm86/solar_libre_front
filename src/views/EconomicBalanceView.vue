<template>
  <EnergyCosts />
  <div class="pt-4">
    <CostSavings />
  </div>
  <div class="pt-4">
    <ReturnOfInvestment />
  </div>
</template>

<script setup lang="ts">
import EnergyCosts from '@/components/economic_balance/EnergyCosts.vue'
import CostSavings from '@/components/economic_balance/CostSavings.vue'
import ReturnOfInvestment from '@/components/economic_balance/ReturnOfInvestment.vue'
</script>
