<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import OverviewGrid from '@/components/Admin/OverviewGrid.vue'
import Pagination from '@/components/Paginate.vue'
import trans from '@/composables/transComposable'
import { Link } from '@inertiajs/vue3'
import moment from 'moment'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import sharedComposable from '@/composables/sharedComposable'
const { formatCurrency } = sharedComposable()

defineOptions({ layout: AdminLayout })
const { textExcerpt, deleteRow } = sharedComposable()

const props = defineProps([
  'buttons',
  'segments',
  'events',
  'totalEvents',
  'totalActiveEvents',
  'totalInActiveEvents'
])

const stats = [
  { value: props.totalEvents, title: trans('Total Events'), iconClass: 'bx bx-box' },
  {
    value: props.totalActiveEvents,
    title: trans('Active Events'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalInActiveEvents,
    title: trans('Expired Events'),
    iconClass: 'ti ti-thumb-up'
  }
]
</script>
<template>
  <main class="flex-grow p-4 sm:p-6">
    <PageHeader title="Events" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <OverviewGrid :items="stats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Name') }}</th>
              <th>{{ trans('Start Time') }}</th>
              <th>{{ trans('Location') }}</th>
              <th>{{ trans('Total Seat') }}</th>
              <th>{{ trans('Booked Seat') }}</th>
              <th>{{ trans('Available Seat') }}</th>
              <th>{{ trans('Status') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody v-if="events.total">
            <tr v-for="event in events.data" :key="event.id">
              <td class="flex items-center gap-1">
                <a
                  target="_blank"
                  :href="route('events.show', event.slug)"
                  class="flex items-center gap-1"
                >
                  <img v-lazy="event.preview" class="avatar rounded-square mr-3" />
                  {{ textExcerpt(event.title, 50) }}
                  <span v-if="event.is_free" class="badge badge-success">
                    ( {{ trans('Free') }})
                  </span>
                  <span v-else class="badge badge-primary">
                    ({{ trans('Fee:') }} {{ formatCurrency(event.fee_amount) }})
                  </span>
                </a>
              </td>
              <td>{{ event.start_at_time.formatted }}</td>
              <td>{{ textExcerpt(event.location, 50) }}</td>
              <td>{{ event.total_seat }}</td>
              <td>{{ event.users_count }}</td>
              <td>{{ event.total_seat - event.users_count }}</td>

              <td class="text-right">
                <span
                  class="badge"
                  :class="event.is_active == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ event.is_active == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>

              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link :href="route('admin.events.edit', event)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          type="button"
                          class="dropdown-link"
                          @click="deleteRow(route('admin.events.destroy', event))"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans('Remove') }}></i
                          >
                          <span>{{ trans('Delete') }}</span>
                        </button>
                      </li>

                      <li class="dropdown-list-item">
                        <Link
                          :href="route('admin.participants.index', event)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="users"></i>
                          <span>{{ trans('Participants') }}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Pagination :links="events.links" />
    </div>
  </main>
</template>
