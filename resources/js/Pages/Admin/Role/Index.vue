<template>
  <main class="container p-4 sm:p-6">
    <PageHeader :title="trans('Admin Roles')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th width="10%">{{ trans("Name") }}</th>
              <th width="80%">{{ trans("Permissions") }}</th>
              <th width="10%" class="text-right">
                {{ trans("Action") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td>
                {{ role.name }}
              </td>
              <td>
                <span class="badge badge-primary mr-1 mb-2" v-for="perm in role.permissions" :key="perm.name">
                  {{ perm.name }}
                </span>
              </td>
              <td>
                <div class="hover">
                  <a href="javascript:void(0)" @click="
                    deleteRow(route('admin.role.destroy', role.id))
                    " class="btn btn-danger">{{ trans("Delete") }}</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center mt-2" v-if="roles.length == 0">
        <Alert v-if="roles.length == 0" type="info" :text="trans('Opps no records found')" />
          
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from "@/Layouts/Admin.vue"
import PageHeader from "@/Layouts/Admin/PageHeader.vue"
import sharedComposable from "@/composables/sharedComposable"
import Alert from "@/components/Admin/Alert.vue"
const props = defineProps(['segments', 'buttons', 'roles'])

defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()

</script>@/composables/sharedComposable