<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/Admin.vue'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import trans from '@/composables/transComposable'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import Overview from '@/components/Admin/OverviewGrid.vue'
import sharedComposable from '@/composables/sharedComposable'
const { formatCurrency } = sharedComposable()

defineOptions({ layout: AdminLayout })

const props = defineProps([
  'histories',
  'totalTransactions',
  'totalActiveTransactions',
  'inActiveTransactions',
  'buttons',
  'segments',
  'request'
])

const stats = [
  {
    value: props.totalTransactions,
    title: trans('Total Transactions'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.totalActiveTransactions,
    title: trans('Active Transactions'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalInActiveTransactions,
    title: trans('Inactive Transactions'),
    iconClass: 'ti ti-thumb-up'
  }
]

const filterableItems = ['tnx']
const filterForm = useForm({
  keyword: '',
  search_in: filterableItems[0]
})

const form = useForm({
  amount: ''
})
const filterFormSubmit = () => {
  filterForm.get(window.location.href)
}
</script>

<template>
  <Head title="Transaction Histories" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Deposit Histories" :segments="segments" :buttons="buttons" />

    <Overview :items="gatewayStats" grid="3" />

    <div class="table-responsive whitespace-nowrap rounded-primary">
      <div class="mb-3 flex items-center justify-end gap-x-2">
        <div class="dropdown" data-placement="bottom-end">
          <div class="dropdown-toggle">
            <button type="button" class="btn bg-white font-medium shadow-sm dark:bg-slate-800">
              <i class="w-4" data-feather="filter"></i>
              <span>{{ trans('Filter') }}</span>
              <i class="w-4" data-feather="chevron-down"></i>
            </button>
          </div>

          <div class="dropdown-content w-72 !overflow-visible">
            <form @submit.prevent="filterFormSubmit">
              <ul class="dropdown-list space-y-4 p-4">
                <li class="dropdown-list-item">
                  <h2 class="my-1 text-sm font-medium">
                    {{ trans('Status') }}
                  </h2>
                  <div class="mb-2">
                    <input
                      type="text"
                      v-model="filterForm.keyword"
                      class="input"
                      placeholder="keyword"
                    />
                  </div>
                </li>
                <li>
                  <select class="input" v-model="filterForm.search_in">
                    <option v-for="opt in filterableItems" :value="opt" :key="opt">
                      {{ opt }}
                    </option>
                  </select>
                </li>
                <li class="dropdown-list-item">
                  <button type="submit" class="btn btn-primary w-full">
                    {{ trans('Search') }}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>{{ trans('Invoice No') }}</th>
            <th>{{ trans('User') }}</th>
            <th>{{ trans('Gateway') }}</th>
            <th>{{ trans('Trx') }}</th>
            <th>{{ trans('Amount') }}</th>
            <th>{{ trans('Status') }}</th>
            <th>{{ trans('Created At') }}</th>
            <th>
              <div class="text-end">
                {{ trans('Action') }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="histories.total">
          <tr v-for="history in histories.data" :key="history.id">
            <td>
              <Link href="route('admin.deposit-logs.show', history.id)">
                {{ history.invoice_no }}
              </Link>
            </td>
            <td>
              <Link :href="`users/${history.user?.id}`">{{ history.user?.name }}</Link>
            </td>

            <td><img v-lazy="history.gateway?.logo" alt="" class="h-4" /></td>
            <td>{{ history.payment_id }}</td>
            <td>{{ formatCurrency(history.amount) }}</td>
            <td class="text-left">
              <span class="badge" :class="history.status == 1 ? 'badge-success' : 'badge-danger'">
                {{ history.status == 0 ? trans('Declined') : '' }}
                {{ history.status == 1 ? trans('Active') : '' }}
                {{ history.status == 2 ? trans('Pending') : '' }}
              </span>
            </td>
            <td>
              {{ moment(history.created_at).format('D-MMM-Y') }}
            </td>
            <td>
              <div class="text-end">
                <Link
                  :href="route('admin.deposit-logs.show', history.id)"
                  class="btn btn-sm btn-primary"
                  >{{ trans('Details') }}</Link
                >
              </div>
            </td>
          </tr>
        </tbody>
        <NoDataFound v-else for-table="true" />
      </table>

      <Paginate :links="histories.links" />
    </div>
  </main>
</template>
