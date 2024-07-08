<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import OverviewGrid from '@/components/Admin/OverviewGrid.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import Pagination from '@/components/Paginate.vue'
import trans from '@/composables/transComposable'
import moment from 'moment'
import sharedComposable from '@/composables/SharedComposable'

const { formatCurrency } = sharedComposable()

defineOptions({ layout: AdminLayout })

const props = defineProps(['customer', 'orders', 'eventOrders'])

const stats = [
  {
    value: props.orders.total + props.eventOrders.total,
    title: trans('Total Orders'),
    iconClass: 'bx bx-cart'
  },
  {
    value: props.eventOrders.total,
    title: trans(' Total Event Booked'),
    iconClass: 'bx bx-book'
  },
  {
    value: 0,
    title: trans('Total Invest Amount'),
    iconClass: 'bx bx-dollar'
  },
  {
    value: formatCurrency(props.customer.wallet),
    title: trans('Wallet Balance'),
    iconClass: 'bx bx-dollar'
  }
]
</script>

<template>
  <main class="flex-grow p-4 sm:p-6">
    <PageHeader />
    <OverviewGrid :items="stats" grid="4" />
    <br />
    <div class="card">
      <div class="card-body">
        <div class="grid grid-cols-4">
          <div class="col-span-1 h-full">
            <div class="flex h-full items-center justify-center">
              <img
                v-lazy="
                  customer.preview == null
                    ? `https://ui-avatars.com/api/?name=${customer.name}`
                    : `${customer.preview}`
                "
                class="mr-3 h-32 rounded-full"
              />
            </div>
          </div>
          <div class="col-span-3">
            <div class="table-responsive whitespace-nowrap rounded-primary">
              <table class="table">
                <tbody>
                  <tr>
                    <th>{{ trans('ID') }}</th>
                    <td>{{ customer.name }}</td>
                    <th>{{ trans('Name') }}</th>
                    <td>{{ customer.name }}</td>
                  </tr>
                  <tr>
                    <th>{{ trans('Username') }}</th>
                    <td>{{ customer.username }}</td>
                    <th>{{ trans('Email') }}</th>
                    <td>{{ customer.email }}</td>
                  </tr>
                  <tr>
                    <th>{{ trans('Phone') }}</th>
                    <td>{{ customer.phone ?? 'NA' }}</td>
                    <th>{{ trans('Uplink') }}</th>
                    <td>
                      <Link
                        v-if="customer.uplink_id"
                        :href="route('admin.customers.show', customer.uplink_id)"
                      >
                        {{ customer.uplink.name }}
                      </Link>
                      <span v-else>NA</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ trans('Status') }}</th>
                    <td>
                      <span
                        class="badge"
                        :class="customer.status == 1 ? 'badge-success' : 'badge-danger'"
                      >
                        {{ customer.status == 1 ? trans('Active') : trans('Inactive') }}
                      </span>
                    </td>
                    <th>{{ trans('Email verified at') }}</th>
                    <td>
                      {{
                        customer.email_verified_at
                          ? moment(customer.email_verified_at).format('ddd DD, MMM, Y | hh:mm A')
                          : 'NA'
                      }}
                    </td>
                  </tr>
                  <tr>
                    <th>{{ trans('KYC verified at') }}</th>
                    <td>
                      {{
                        customer.kyc_verified_at
                          ? moment(customer.kyc_verified_at).format('ddd DD, MMM, Y | hh:mm A')
                          : 'NA'
                      }}
                    </td>
                    <th>{{ trans('Registered At') }}</th>
                    <td>
                      {{
                        customer.created_at
                          ? moment(customer.created_at).format('ddd DD, MMM, Y | hh:mm A')
                          : 'NA'
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5">
      <h4 class="m-2">{{ trans('Orders') }}</h4>
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="w-[5%] uppercase">{{ trans('Order No') }}</th>
              <th class="w-[15%] uppercase">{{ trans('Project Name') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Payment Mode') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Amount') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Status') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Created At') }}</th>
            </tr>
          </thead>
          <tbody v-if="orders.total">
            <tr v-for="order in orders.data" :key="order.id">
              <td>
                <Link
                  :href="'/admin/order/' + order.id"
                  class="text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
                >
                  {{ order.invoice_no }}
                </Link>
              </td>
              <td>{{ order.project.title }}</td>
              <td>{{ order.gateway?.name ?? 'NA' }}</td>
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
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Pagination :links="orders.links" />
    </div>

    <div class="my-5">
      <h4 class="m-2">{{ trans('Event Orders') }}</h4>
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="w-[5%] uppercase">{{ trans('Order No') }}</th>
              <th class="w-[15%] uppercase">{{ trans('Event') }}</th>

              <th class="w-[10%] uppercase">{{ trans('Payment Mode') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Amount') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Status') }}</th>
              <th class="w-[10%] uppercase">{{ trans('Created At') }}</th>
            </tr>
          </thead>
          <tbody v-if="eventOrders.total">
            <tr v-for="order in eventOrders.data" :key="order.id">
              <td>
                <Link
                  :href="'/admin/event-orders/' + order.id"
                  class="text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
                >
                  {{ order.invoice_no }}
                </Link>
              </td>
              <td>
                <a target="_blank" :href="route('events.show', order.event.slug)">{{
                  order.event.title
                }}</a>
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
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Pagination :links="eventOrders.links" />
    </div>
  </main>
</template>
