<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div class="mx-auto text-center">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-start">
            Races data
          </h3>

          <div class="text-end">
            <router-link to="/races/create">
              <button
                class="btn btn-success rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                Add
              </button>
            </router-link>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-8 text-gray-500">
          Loading...
        </div>

        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No. </p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Circuit name</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Race date</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total laps</p>
              </th>
              <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

            <tr v-if="races.length === 0">
              <td colspan="5" class="p-4 text-center text-gray-500">
                No data
              </td>
            </tr>

            <tr v-for="(race, index) in races" 
            :key="race.id" 
            class="border-b hover:bg-gray-50">
              <td class="px-5 py-3 text-left w-1/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ index + 1 }}.
                </p>
              </td>
              <td class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ race.circuit_name }}
                </p>
              </td>
              <td class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ race.race_date }}
                </p>
              </td>
              <td class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ race.total_laps }}
                </p>
              </td>
              <td class="px-5 py-3 text-left w-3/11 sm:px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <router-link :to="`/races/${race.id}/edit`">
                      <button
                        class="btn bg-yellow-600 hover:bg-yellow-700 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto">
                        Edit
                      </button>
                    </router-link>
                  </div>

                  <div>
                    <button @click="deleteRace(race.id)"
                      class="btn bg-red-600 hover:bg-red-700 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from '@/api/axios'
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";

const currentPageTitle = ref("Races");

const races = ref([])
const isLoading = ref(true)

const fetchRaces = async () => {
  try {
    const response = await apiClient.get('/races')

    races.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRaces()
})

const deleteRace = async (id) => {
  const isConfirmed = confirm('are you sure?')

  if (!isConfirmed) return

  try {
    await apiClient.delete(`/races/${id}`)

    fetchRaces()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style></style>
