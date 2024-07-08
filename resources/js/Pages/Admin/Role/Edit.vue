<template>
  <main class="container p-4 sm:p-6">
    <Head title="Edit Admin Role" />
    <PageHeader :title="trans('Edit Admin Role')" :segments="segments" :buttons="buttons" />
  </main>
</template>

<script>
import AdminLayout from '@/Layouts/Admin.vue'
export default {
  layout: AdminLayout
}
</script>

<script setup>
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Head } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
const props = defineProps(['segments', 'buttons'])
</script>
