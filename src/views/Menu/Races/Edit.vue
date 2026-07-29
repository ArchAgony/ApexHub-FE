<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div class="mx-auto text-center">
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-start">
          Edit race
        </h3>

        <div v-if="isLoading" class="text-center py-8 text-gray-500">
          Loading...
        </div>

        <form v-else @submit.prevent="handleUpdate">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Circuit name
            </label>
            <input type="text" v-model="form.circuit_name"
              class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Insert circuit name here..." required />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Race date
            </label>
            <input type="date" v-model="form.race_date"
              class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Insert race date here..." required />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Total laps
            </label>
            <input type="number" v-model="form.total_laps"
              class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Insert total laps here..." required />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <router-link to="/races" class="text-start">
              <button
                class="btn bg-red-600 hover:bg-red-700 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto">
                Back
              </button>
            </router-link>

            <div class="text-end">
              <button type="submit" :disabled="isSubmitting"
                class="btn btn-success rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                {{ isSubmitting ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import apiClient from '@/api/axios'
import { useRouter, useRoute } from "vue-router";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";

const currentPageTitle = ref("Races");

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)     
const isSubmitting = ref(false)

const raceId = route.params.id

const form = reactive({
  circuit_name: '',
  race_date: '',
  total_laps: ''
})

const fetchRaceDetail = async () => {
  isLoading.value = true

  try {
    const response = await apiClient.get(`/races/${raceId}`)
    const data = response.data.data

    form.circuit_name = data.circuit_name
    form.race_date = data.race_date
    form.total_laps = data.total_laps
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchRaceDetail()
})

const handleUpdate = async () => {
  isSubmitting.value = true

  try {
    await apiClient.put(`/races/${raceId}`, form)

    router.push('/races')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style></style>
