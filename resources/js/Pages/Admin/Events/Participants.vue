<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import Pagination from '@/components/Paginate.vue'
import trans from '@/composables/transComposable'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import sharedComposable from '@/composables/sharedComposable'
defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()

const props = defineProps(['buttons', 'segments', 'event', 'participants'])
</script>
<template>
  <main class="flex-grow p-4 sm:p-6">
    <PageHeader title="Events" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('User') }}</th>
              <th>{{ trans('Seat No') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody v-if="participants.total">
            <tr v-for="participant in participants.data" :key="participant.id">
              <td class="flex items-center gap-1">
                <img
                  v-lazy="
                    participant?.avatar == null
                      ? `https://ui-avatars.com/api/?name=${participant?.name}`
                      : `${participant?.avatar}`
                  "
                  class="avatar rounded-square mr-3"
                />

                {{ participant.name }}
              </td>
              <td>{{ participant.pivot.seat_no }}</td>
              <td>
                <div class="flex justify-end gap-2">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteRow(route('admin.participants.destroy', { event, participant }))"
                  >
                    {{ trans('Delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Pagination :links="participants.links" />
    </div>
  </main>
</template>
