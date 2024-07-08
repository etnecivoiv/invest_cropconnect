<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import trans from '@/composables/transComposable'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { ref, onMounted } from 'vue'
import drawer from '@/Plugins/Admin/drawer'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import sharedComposable from '@/composables/sharedComposable'
import { onBeforeUnmount } from 'vue'
import FilterForm from '@/components/Admin/FilterForm.vue'
const { formatCurrency, getQueryParams } = sharedComposable()

defineOptions({ layout: UserLayout })

const props = defineProps(['histories', 'segments', 'buttons', 'request', 'walletBalance'])

onMounted(() => {
  drawer.init()
})

const form = useForm({
  amount: ''
})

const createPayment = () => {
  form.post(route('user.wallet-transactions.payment.create'))
}

const counter = ref(0)
const targetValue = props.walletBalance
const initialIncrement = Math.round(targetValue * 0.0221)
const regularIncrement = Math.round(targetValue * 0.0341)
const initialIncrementPercentage = 0.002 // 10%

const intervalDuration = () => {
  if (targetValue < 500) {
    return 70
  } else if (targetValue > 500) {
    return 50
  }
}

const updateCounter = () => {
  if (counter.value + regularIncrement > targetValue) {
    return (counter.value = targetValue)
  }

  if (counter.value < targetValue * initialIncrementPercentage) {
    counter.value += initialIncrement
  } else if (counter.value < targetValue) {
    counter.value += regularIncrement
  }
}

const interval = setInterval(updateCounter, intervalDuration())

// Stop the interval when the component is unmounted
onBeforeUnmount(() => {
  clearInterval(interval)
})

const filterOptions = [
  {
    label: 'Tnx No',
    value: 'tnx'
  }
]
</script>

<template>
  <Head title="Transaction Histories" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Deposit Histories" :segments="segments" :buttons="buttons" />
    <div class="space-y-2">
      <div class="card mb-4 flex h-40 items-center justify-center">
        <h3>{{ trans('Wallet Balance') }}: {{ formatCurrency(counter) }}</h3>
      </div>

      <FilterForm :options="filterOptions" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Invoice No') }}</th>
              <th>{{ trans('Gateway') }}</th>
              <th>{{ trans('Trx') }}</th>
              <th>{{ trans('Amount') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Created At') }}</th>
            </tr>
          </thead>
          <tbody v-if="histories.total">
            <tr v-for="history in histories.data" :key="history.id">
              <td>{{ history.invoice_no ?? '-' }}</td>
              <td>{{ history.gateway?.name }}</td>
              <td>{{ history.payment_id }}</td>
              <td>{{ formatCurrency(history.amount) }}</td>
              <td class="text-left">
                <span class="badge" :class="history.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ history.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>{{ moment(history.created_at).format('DD-MMM-YYYY') }}</td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
        <Paginate :links="histories.links" />
      </div>
    </div>
  </main>

  <div id="makeDepositDrawer" class="drawer drawer-right">
    <form @submit.prevent="createPayment()">
      <div class="drawer-header">
        <h5>{{ trans('Make deposit') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans('Deposit Amount') }}</label>
          <input
            v-model="form.amount"
            type="text"
            class="input"
            placeholder="enter deposit amount"
            required
          />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex items-center space-x-4">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="form.processing"
            :btn-text="trans('Continue')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
