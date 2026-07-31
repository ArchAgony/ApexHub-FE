<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div class="mx-auto text-center">
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-start">
          Edit result
        </h3>

        <form @submit.prevent="handleUpdate">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Circuit name
            </label>
            <select v-model="form.race_id"
              class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              required>
              <option value="" disabled>Insert circuit name here...</option>
              <option v-for="race in races" :key="race.id" :value="race.id">
                {{ race.circuit_name }} ({{ race.total_laps }})
              </option>
            </select>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Driver name
            </label>
            <input type="text" v-model="form.driver_name"
              class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Insert driver name here..." required />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Finish position
            </label>
            <input type="number" v-model="form.finish_position"
              class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Insert finish position here..." required />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div class="text-start">
              <router-link to="/results">
                <button
                  class="btn bg-red-600 hover:bg-red-700 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto">
                  Back
                </button>
              </router-link>
            </div>

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

const currentPageTitle = ref("Results");

const route = useRoute()
const router = useRouter()

const resultId = route.params.id

const isSubmitting = ref(false)
const isLoading = ref(false)

const races = ref([])

const form = reactive({
  race_id: '',
  driver_name: '',
  finish_position: '',
})

const fetchData = async () => {
  try {
    isLoading.value = true
    const [racesResponse, resultsResponse] = await Promise.all([
      apiClient.get('/races'),
      apiClient.get(`/results/${resultId}`)
    ])

    races.value = racesResponse.data.data

    const data = resultsResponse.data.data

    form.race_id = data.race_id
    form.driver_name = data.driver_name
    form.finish_position = data.finish_position
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const handleUpdate = async () => {
  isSubmitting.value = true

  try {
    await apiClient.put(`/results/${resultId}`, form)

    router.push('/results')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style></style>
