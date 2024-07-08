<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import Pagination from '@/components/Paginate.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import sharedComposable from '@/composables/sharedComposable'
import { onMounted } from 'vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'

defineOptions({ layout: AdminLayout })

const { formatCurrency } = sharedComposable()

const props = defineProps([
  'segments',
  'buttons',
  'orders',
  'request',
  'totalOrders',
  'totalPendingOrders',
  'totalCompleteOrders',
  'totalDeclinedOrders',
  'type',
  'invoice',
  'currency',
  'affiliate_commission_percent'
])
const orderOverviews = [
  { value: props.totalOrders, title: trans('Total Orders'), iconClass: 'bx bx-box' },
  {
    value: props.totalPendingOrders,
    title: trans('Pending Orders'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalCompleteOrders,
    title: trans('Completed Orders'),
    iconClass: 'ti ti-thumb-up'
  },
  {
    value: props.totalDeclinedOrders,
    title: trans('Declined Orders'),
    iconClass: 'ti ti-message-2-cog'
  }
]

const filterData = useForm({
  search: props.request.search,
  type: props.type
})
</script>

<template>
  <!-- Main Content Starts -->
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :title="trans('Event Order List')" :segments="segments" :buttons="buttons" />

    <div class="space-y-4">
      <Overview :items="orderOverviews" />
      <div class="flex items-center justify-end gap-x-2">
        <div class="dropdown" data-placement="bottom-end">
          <div class="dropdown-toggle">
            <button type="button" class="btn bg-white font-medium shadow-sm dark:bg-slate-800">
              <i class="w-4" data-feather="filter"></i>
              <span>{{ trans('Filter') }}</span>
              <i class="w-4" data-feather="chevron-down"></i>
            </button>
          </div>

          <div class="dropdown-content w-72 !overflow-visible">
            <form @submit.prevent="filterData.get('/admin/order')">
              <ul class="dropdown-list space-y-4 p-4">
                <li class="dropdown-list-item">
                  <h2 class="my-1 text-sm font-medium">{{ trans('Status') }}</h2>
                  <div class="mb-2">
                    <input
                      type="text"
                      name="search"
                      v-model="filterData.search"
                      class="input"
                      placeholder="Search......"
                    />
                  </div>
                </li>
                <li class="dropdown-list-item">
                  <div class="mb-2">
                    <select class="select" name="type" v-model="filterData.type">
                      <option value="email">{{ trans('User Email') }}</option>
                      <option value="invoice_no">{{ trans('Invoice No') }}</option>
                    </select>
                  </div>
                </li>

                <li class="dropdown-list-item">
                  <button type="submit" class="btn btn-primary w-full">
                    {{ trans('Filter') }}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Order No') }}</th>
              <th>{{ trans('Event') }}</th>
              <th>{{ trans('User') }}</th>
              <th>{{ trans('Payment Mode') }}</th>
              <th>{{ trans('Amount') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Created At') }}</th>
              <th class="!text-right">{{ trans('Actions') }}</th>
            </tr>
          </thead>
          <tbody v-if="orders.total">
            <tr v-for="order in orders.data" :key="order.id">
              <td>
                <Link
                  :href="'/admin/event-orders/' + order.id"
                  class="text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
                >
                  {{ order.invoice_no }}
                </Link>
              </td>
              <td>
                <a target="_blank" :href="route('events.show', order.event)">{{
                  order.event.title
                }}</a>
              </td>
              <td>
                <a v-if="order.user" :href="`/admin/users/${order.user?.id}`">
                  <strong> {{ order.user?.name }}</strong>
                  <br />
                  {{ order.user?.email }}
                </a>
              </td>
              <td>{{ order.gateway?.name ?? 'Free' }}</td>
              <td>{{ formatCurrency(order.amount) }}</td>
              <td>
                <div class="badge badge-soft-primary capitalize">
                  {{
                    trans(
                      order.status == 2 ? 'pending' : order.status == 1 ? 'approved' : 'declined'
                    )
                  }}
                </div>
              </td>
              <td class="text-center">
                {{ order.created_at_diff }}
              </td>
              <td>
                <div class="flex justify-center">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="dropdown-content w-40">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <Link :href="'/admin/event-orders/' + order.id" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="external-link"></i>
                            <span>{{ trans('View') }}</span>
                          </Link>
                        </li>
                        <li class="dropdown-list-item">
                          <a
                            :href="route('admin.event-orders.ticket-download', order.id)"
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="download"></i>
                            {{ trans('Download Ticket') }}
                          </a>
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

      <Pagination :links="orders.links" />
    </div>
  </main>
  <!-- Main Content Ends -->
</template>
