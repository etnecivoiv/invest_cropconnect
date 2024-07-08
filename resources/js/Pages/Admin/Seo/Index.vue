<template>
  <main class="container flex-grow p-4 sm:p-6">
    <Head title="SEO Settings" />
    <PageHeader />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="w-3/12">{{ trans('Page') }}</th>
              <th colspan="1">{{ trans('Meta Title') }}</th>
              <th>
                <p class="text-right">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="seo in posts" :key="seo">
              <td>
                {{ seo.key }}
              </td>
              <td>
                {{ seo.content.site_name }}
              </td>

              <td class="flex justify-end">
                <Link :href="route('admin.seo.edit', seo.id)" class="btn btn-primary btn-sm"
                  ><i class="fas fa-edit"></i
                ></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
import { Head, Link } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
const props = defineProps(['segments', 'buttons', 'posts'])
</script>
