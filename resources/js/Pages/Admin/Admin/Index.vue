<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import Alert from '@/components/Admin/Alert.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Head, Link } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import sharedComposable from '@/composables/sharedComposable'
const props = defineProps(['segments', 'buttons', 'users'])
const { deleteRow } = sharedComposable()

defineOptions({ layout: AdminLayout })
</script>

<template>
  <main class="container p-4 sm:p-6">
    <Head title="Sub Admins" />
    <PageHeader :title="trans('Sub Admins')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Name') }}</th>
              <th>{{ trans('Email') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Role') }}</th>
              <th class="text-right">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in users" :key="row.id">
              <td>
                {{ row.name }}
              </td>
              <td>
                {{ row.email }}
              </td>
              <td>
                <span :class="row.status == 1 ? 'badge badge-success' : 'badge badge-danger'">
                  {{ row.status == 1 ? trans('Active') : trans('Deactive') }}
                </span>
              </td>
              <td>
                <span class="badge badge-primary" v-for="r in row.roles">{{ r.name }}</span>
              </td>
              <td class="flex gap-3">
                <Link :href="route('admin.admin.edit', row.id)" class="btn btn-primary">
                  {{ trans('Edit') }}</Link
                >
                <a
                  href="javascript:void(0)"
                  @click="deleteRow(route('admin.admin.destroy', row.id))"
                  class="btn btn-danger delete-confirm"
                  >{{ trans('Delete') }}</a
                >
              </td>
            </tr>
          </tbody>
        </table>

        <Alert
          v-if="users.length == 0"
          type="info"
          :text="trans('Opps you have not created any plan....')"
        />
      </div>
    </div>
  </main>
</template>
