<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, useForm } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import drawer from '@/Plugins/Admin/drawer'
import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })

const { formatCurrency } = sharedComposable()

const props = defineProps([
  'investments',
  'total',
  'totalInvested',
  'totalQty',
  'buttons',
  'segments',
  'type',
  'request'
])

const stats = [
  {
    value: props.total,
    title: trans('Total'),
    iconClass: 'bx bx-box'
  },
  {
    value: formatCurrency(props.totalInvested || 0),
    title: trans('Total Invested'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalQty,
    title: trans('Total QTY'),
    iconClass: 'ti ti-thumb-up'
  }
]

const filterOptions = [
  {
    label: 'ID',
    value: 'id'
  },
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Amount',
    value: 'amount'
  }
]

const editForm = useForm({
  id: '',
  status: ''
})
const openEditInvestDrawer = (invest) => {
  editForm.id = invest.id
  editForm.status = invest.status
  drawer.of('#editInvestDrawer').show()
}
const updateInvest = () => {
  editForm.patch(route('admin.invest.update', editForm.id), {
    onSuccess: () => {
      editForm.reset()
      drawer.of('#editInvestDrawer').hide()
      notify.success(trans('Invest has been updated successfully'))
    }
  })
}
</script>
<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Investment Projects" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <FilterForm :options="filterOptions" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Invoice') }}</th>
              <th>{{ trans('Project') }}</th>
              <th>{{ trans('Duration') }}</th>
              <th>{{ trans('User') }}</th>
              <th>{{ trans('Amount') }}</th>
              <th>{{ trans('QTY') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Created At') }}</th>
              <th>
                <p class="text-end">{{ trans('Action') }}</p>
              </th>
            </tr>
          </thead>
          <tbody v-if="investments.data != 0">
            <tr v-for="investment in investments.data" :key="investment.id">
              <td>
                <Link
                  :href="'/admin/order/' + investment.order_id"
                  class="text-sm font-medium text-primary-500 transition duration-150 ease-in-out hover:underline"
                >
                  {{ investment?.invoice_no }}
                </Link>
              </td>
              <td class="flex items-center">
                <img
                  v-lazy="investment?.project_duration?.project.preview"
                  class="avatar mr-2 rounded"
                />
                <p>{{ investment?.project_duration?.project.title }}</p>
              </td>

              <td>
                {{ investment?.project_duration.duration }}/{{
                  investment?.project_duration.duration_type
                }}
              </td>
              <td>
                <Link :href="`/admin/customers/${investments.user_id}`">
                  {{ investment.user?.name }}
                </Link>
              </td>
              <td>{{ formatCurrency(investment.amount) }}</td>
              <td>
                {{ investment.qty }}
              </td>

              <td class="text-left">
                <span
                  class="badge"
                  :class="investment.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{
                    investment.status == 0
                      ? trans('Declined')
                      : investment.status == 1
                      ? trans('Active')
                      : trans('Pending')
                  }}
                </span>
              </td>

              <td>
                {{ moment(investment.created_at).format('D-MMM-Y') }}
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
                          <button @click="openEditInvestDrawer(investment)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans('Edit') }}</span>
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
      <Paginate :links="investments.links" />
    </div>
  </main>
  <div id="editInvestDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateInvest()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Invest') }}</h5>
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
          <label>{{ trans('Status') }}</label>
          <select v-model="editForm.status" class="select" name="status">
            <option value="0">{{ trans('Declined') }}</option>
            <option value="1">{{ trans('Active') }}</option>
            <option value="2">{{ trans('Pending') }}</option>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
