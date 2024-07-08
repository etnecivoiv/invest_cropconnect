<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import trans from '@/composables/transComposable'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
import FilterForm from '@/components/Admin/FilterForm.vue'
import OverviewGrid from '@/components/Admin/OverviewGrid.vue'

defineOptions({ layout: UserLayout })
const props = defineProps(['investments', 'statsCounter'])
const { formatCurrency } = sharedComposable()

const selectOptions = [
  {
    label: 'Invoice No',
    value: 'invoice_no'
  },
  {
    label: 'Project Title',
    value: 'project_title'
  }
]

const stats = [
  {
    value: props.statsCounter.total,
    title: trans('Total'),
    iconClass: 'bx bxs-grid'
  },
  {
    value: props.statsCounter.active,
    title: trans('Active'),
    iconClass: 'ti ti-thumb-up'
  },
  {
    value: props.statsCounter.pending,
    title: trans('Pending'),
    iconClass: 'bx bx-loader-circle'
  },
  {
    value: props.statsCounter.declined,
    title: trans('Declined'),
    iconClass: 'bx bx-x'
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <div class="space-y-4">
      <PageHeader />
      <OverviewGrid :items="stats" :grid="stats.length" />
      <FilterForm :options="selectOptions" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <td>{{ trans('Invest No') }}</td>
              <th>{{ trans('Project Name') }}</th>
              <th>{{ trans('Invest Amount') }}</th>
              <th>{{ trans('Booking Units') }}</th>
              <th>{{ trans('Invest Date') }}</th>
              <!-- <th>{{ trans("Next Payment Date") }}</th> -->
              <th>{{ trans('Order Status') }}</th>
            </tr>
          </thead>
          <tbody v-if="investments.total">
            <tr v-for="invest in investments.data" :key="invest.id">
              <td>
                <Link :href="route('user.investments.show', invest)">
                  {{ invest.invoice_no }}
                </Link>
              </td>
              <td>
                <a :href="`/projects/${invest.project?.slug}`" target="_blank">
                  {{ invest.project?.title }} ({{ invest.project_duration?.duration }}
                  {{ invest.project_duration?.duration_type }})
                </a>
              </td>

              <td>{{ formatCurrency(invest.amount) }}</td>
              <td class="text-center">{{ invest.qty }}</td>
              <td>
                {{ moment(invest.created_at).format('D-MMM-Y') }}
              </td>
              <!-- <td>{{ moment(invest.next_payment_date).format("D-MMM-Y") }}</td> -->
              <td class="text-left">
                <span v-if="invest.status == 0" class="badge badge-danger">
                  {{ trans('Declined') }}
                </span>
                <span v-else-if="invest.status == 1" class="badge badge-success">
                  {{ trans('Active') }}
                </span>
                <span v-else-if="invest.status == 2" class="badge badge-primary">
                  {{ trans('Pending') }}
                </span>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>

        <Paginate :links="investments.links" />
      </div>
    </div>
  </main>
</template>
