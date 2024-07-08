<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, useForm } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'

import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'

defineOptions({ layout: AdminLayout })

const { deleteRow, formatCurrency } = sharedComposable()

const props = defineProps([
  'project',
  'returnSchedules',
  'total',
  'totalActive',
  'totalInactive',
  'buttons',
  'segments'
])

const stats = [
  {
    value: props.total,
    title: trans('Total Schedule'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.totalActive,
    title: trans('Executed Schedule'),
    iconClass: 'ti ti-thumb-up'
  },
  {
    value: props.totalInactive,
    title: trans('Pending Schedule'),
    iconClass: 'ti ti-thumb-down'
  }
]
</script>
<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Project Return Schedule" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Project') }}</th>
              <th>{{ trans('Return value') }}</th>
              <th>{{ trans('Profit type') }}</th>
              <th>{{ trans('Return type') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Attachment') }}</th>
              <th>{{ trans('Return date') }}</th>
              <th>{{ trans('Created At') }}</th>
              <th>{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody v-if="returnSchedules.total">
            <tr v-for="item in returnSchedules.data" :key="item.id">
              <td class="flex items-center">
                <img v-lazy="project?.preview" class="avatar mr-3 rounded" />
                <p>
                  {{ project?.title }}
                  {{
                    `(${item.project_duration.duration} / ${item.project_duration.duration_type})`
                  }}
                </p>
              </td>

              <td>
                <div class="text-center">
                  <template v-if="item.return_type == 'fixed'">
                    {{ formatCurrency(item.amount) }}
                  </template>
                  <template v-else-if="item.return_type == 'percent'">
                    {{ item.amount }}%
                  </template>
                </div>
              </td>
              <td>
                <span
                  class="badge"
                  :class="[item.profit_type == 'profit' ? 'badge-success' : 'badge-danger']"
                  >{{ item.profit_type }}</span
                >
              </td>
              <td>
                <span class="badge badge-primary">{{ item.return_type }}</span>
              </td>

              <td class="text-left">
                <span class="badge" :class="item.status == 1 ? 'badge-success' : 'badge-warning'">
                  {{ item.status == 1 ? trans('Executed') : trans('Pending') }}
                </span>
              </td>
              <td>
                <a
                  v-if="item.attachment"
                  class="badge badge-primary px-2 py-1"
                  :href="item.attachment"
                >
                  {{ trans('View') }}
                </a>
                <template v-else>{{ trans('None') }}</template>
              </td>
              <td>{{ moment(item.return_date).format('DD-MMM-Y') }}</td>
              <td>
                {{ moment(item.created_at).format('DD-MMM-Y') }}
              </td>
              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="dropdown-content w-40">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <Link
                            :href="
                              route('admin.return-schedules.edit', {
                                project: project.id,
                                return_schedule: item.id
                              })
                            "
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans('Edit') }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            class="dropdown-link"
                            @click="
                              deleteRow(
                                route('admin.return-schedules.destroy', {
                                  project: project.id,
                                  return_schedule: item.id
                                }),
                                trans('Category has been deleted successfully')
                              )
                            "
                          >
                            <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                            <span>{{ trans('Delete') }}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Paginate :links="returnSchedules.links" />
    </div>
  </main>
</template>
