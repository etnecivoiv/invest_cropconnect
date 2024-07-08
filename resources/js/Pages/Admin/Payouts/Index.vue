<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import Overview from '@/components/Admin/OverviewGrid.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import Paginate from '@/components/Paginate.vue'
import { useForm } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })
const props = defineProps(['segments', 'buttons', 'data', 'orders', 'request'])

const filterOptions = [
  {
    label: 'Email',
    value: 'email'
  }
]

const filterForm = useForm({
  search: props.request.search,
  type: props.type || 'email'
})

const stats = [
  {
    value: props.data.total_payouts,
    title: trans('Total Payouts'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.data.total_pending,
    title: trans('Pending Payouts'),
    iconClass: 'bx bx-loader'
  },
  {
    value: props.data.total_approved,
    title: trans('Total Approved'),
    iconClass: 'ti ti-thumb-up'
  },
  {
    value: props.data.total_rejected,
    title: trans('Total Rejected'),
    iconClass: 'ti ti-thumb-down'
  }
]
const filterableItems = ['ID', 'Title']
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :title="trans('Payout Requests')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="stats" grid="4" />
      <div class="flex items-center justify-end gap-x-2">
        <FilterForm :options="filterOptions" />
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>
                {{ trans('Invoice No') }}
              </th>
              <th>
                {{ trans('Amount') }}
              </th>
              <th>
                {{ trans('Gateway') }}
              </th>
              <th>
                {{ trans('User') }}
              </th>
              <th>{{ trans('Status') }}</th>
              <th>
                {{ trans('Created At') }}
              </th>
              <th>
                <p class="text-end">{{ trans('View') }}</p>
              </th>
            </tr>
          </thead>
          <tbody class="list" v-if="data.payouts.data.length != 0">
            <tr v-for="payout in data.payouts.data" :key="payout.id">
              <td class="text-center">
                <Link :href="route('admin.payouts.show', payout.id)">
                  {{ payout.invoice_no }}
                </Link>
              </td>
              <td class="text-left">
                {{ payout.amount_with_currency }}
              </td>
              <td class="text-left">
                {{ payout.method.name || '' }}
              </td>
              <td class="text-left">
                <Link :href="route('admin.investors.show', payout.user_id)">
                  {{ payout.user.name || '' }}
                </Link>
              </td>
              <td class="text-left">
                <span
                  class="badge"
                  :class="
                    payout.status == 'pending'
                      ? 'badge-warning'
                      : payout.status == 'completed'
                      ? 'badge-success'
                      : 'badge-danger'
                  "
                >
                  {{ payout.status }}</span
                >
              </td>
              <td class="text-left">
                {{ payout.user.created_at_date }}
              </td>
              <td>
                <div class="flex justify-end">
                  <Link :href="route('admin.payouts.show', payout.id)" class="btn btn-primary">
                    {{ trans('View') }}
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Paginate :links="data.payouts.links" />
    </div>
  </main>
</template>
