<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <div class="mx-auto text-center">
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-start">
          Create car
        </h3>

        <form @submit.prevent="handleSubmit" >
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Model name
            </label>
            <input type="text" 
            v-model="form.model_name"
            class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
            placeholder="Insert model name here..." required/>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Chassis code
            </label>
            <input type="text" 
            v-model="form.chassis_code"
            class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
            placeholder="Insert chassis code here..." required/>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
            <label class="lg:col-span-1 mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">
              Engine status
            </label>
            <input type="number" 
            v-model="form.engine_status"
            class="lg:col-span-2 dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
            placeholder="Insert engine status here..." required/>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <router-link to="/cars" class="text-start">
              <button
                class="btn bg-red-600 hover:bg-red-700 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white sm:w-auto">
                Back
              </button>
            </router-link>
  
            <div class="text-end">
              <button type="submit"
                :disabled="isSubmitting"
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
import { ref, reactive } from "vue";
import apiClient from '@/api/axios'
import { useRouter } from "vue-router";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";

const currentPageTitle = ref("Cars");

const router = useRouter()
const isSubmitting = ref(false)

const form = reactive({
  model_name: '',
  chassis_code: '',
  engine_status: '100' 
})

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    await apiClient.post('/cars', form)

    router.push('/cars')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style></style>
