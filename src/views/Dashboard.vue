<template>
  <admin-layout>
    <div class="space-y-6">
      <div v-if="isLoading" class="text-center py-8 text-gray-500">
        Loading data dashboard...
      </div>

      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        
        <StatCard title="Total Cars" :value="stats.total_cars">
          <template #icon>
            <span class="text-xl">🏎️</span>
          </template>
        </StatCard>

        <StatCard title="Components" :value="stats.total_components">
          <template #icon>
            <span class="text-xl">⚙️</span>
          </template>
        </StatCard>

        <StatCard title="Total Races" :value="stats.total_races">
          <template #icon>
            <span class="text-xl">🏁</span>
          </template>
        </StatCard>

        <StatCard title="Race Results" :value="stats.total_results">
          <template #icon>
            <span class="text-xl">🏆</span>
          </template>
        </StatCard>

      </div>

      <div class="mt-6">
        <recent-orders />
      </div>

    </div>
  </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api/axios'

import AdminLayout from '../components/layout/AdminLayout.vue'
import RecentOrders from '../components/ecommerce/RecentOrders.vue'
import StatCard from '@/components/ecommerce/StatCard.vue'

const isLoading = ref(true)
const stats = ref({
  total_cars: 0,
  total_components: 0,
  total_races: 0,
  total_results: 0
})

const fetchDashboardStats = async () => {
  try {
    const response = await apiClient.get('/')
    stats.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardStats()
})
</script>
