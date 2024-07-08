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
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })

const { formatCurrency } = sharedComposable()

const props = defineProps([
  'returnTransactions',
  'total',
  'totalProfited',
  'totalLoss',
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
    value: props.totalProfited,
    title: trans('Total Profited'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalLoss,
    title: trans('Total Loss'),
    iconClass: 'ti ti-thumb-up'
  }
]

const filterOptions = [
  {
    label: 'User name',
    value: 'name'
  }
]
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
              <th>{{ trans('Project') }}</th>
              <th>{{ trans('Duration') }}</th>
              <th>{{ trans('User') }}</th>
              <th>{{ trans('Amount') }}</th>
              <th>{{ trans('Type') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Created At') }}</th>
            </tr>
          </thead>
          <tbody v-if="returnTransactions.data != 0">
            <tr v-for="returnTransaction in returnTransactions.data" :key="returnTransaction.id">
              <td class="flex items-center">
                <img
                  v-lazy="returnTransaction?.project_duration?.project.preview"
                  class="avatar mr-2 rounded"
                />
                <p>{{ returnTransaction?.project_duration?.project.title }}</p>
              </td>

              <td>
                {{ returnTransaction?.project_duration.duration }}/{{
                  returnTransaction?.project_duration.duration_type
                }}
              </td>
              <td>
                <Link href="#">
                  {{ returnTransaction.user?.name }}
                </Link>
              </td>
              <td>{{ formatCurrency(returnTransaction.amount) }}</td>
              <td>
                <span
                  class="badge"
                  :class="returnTransaction.type == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ returnTransaction.type == 1 ? trans('Profit') : trans('Loss') }}
                </span>
              </td>

              <td class="text-left">
                <span
                  class="badge"
                  :class="returnTransaction.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ returnTransaction.status == 1 ? trans('Active') : trans('Pending') }}
                </span>
              </td>

              <td>
                {{ moment(returnTransaction.created_at).format('D-MMM-Y') }}
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Paginate :links="returnTransactions.links" />
    </div>
  </main>
</template>
