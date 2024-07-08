<script setup>
import sharedComposable from '@/composables/sharedComposable'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import Alert from '@/components/Admin/Alert.vue'
import AdminLayout from '@/Layouts/Admin.vue'
import VueApexCharts from 'vue3-apexcharts'
import { router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import moment from 'moment'
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'totalInvest',
  'totalProfit',
  'totalDeposits',
  'totalRefers',
  'profitOverview',
  'recentDeposits',
  'recentInvests',
  'depositOverview',
  'totalUsers',
  'totalProjects',
  'totalCommissions',
  'totalLosses',
  'recentEvents',
  'pieChartData',
  'request'
])
const { formatCurrency, textExcerpt, pickBy } = sharedComposable()

const primaryOverview = computed(() => {
  return [
    {
      title: 'Total Project',
      value: props.totalProjects,
      icon: 'bx bx-memory-card',
      classes: 'bg-yellow-500 text-yellow-500'
    },
    {
      title: 'Total Invest',
      value: props.totalInvest,
      icon: 'bx bx-box',
      classes: 'bg-primary-500 text-primary-500'
    },
    {
      title: 'Total Profit',
      value: props.totalProfit,
      icon: 'bx bx-dollar-circle',
      classes: 'text-success-500 bg-success-500'
    },
    {
      title: 'Total Deposits',
      value: props.totalDeposits,
      icon: 'bx bxs-receipt',
      classes: 'text-warning-500 bg-warning-500'
    },
    {
      title: 'Total Refers',
      value: props.totalRefers,
      icon: 'bx bx-group',
      classes: 'text-info-500 bg-info-500'
    },
    {
      title: 'Total Loss',
      value: props.totalLosses,
      icon: 'bx bx-dollar',
      classes: 'text-red-500 bg-red-500'
    },
    {
      title: 'Total Users',
      value: props.totalUsers,
      icon: 'bx bx-user',
      classes: 'text-info-500 bg-info-500'
    },
    {
      title: 'Total Commissions',
      value: props.totalCommissions,
      icon: 'bx bx-money-withdraw',
      classes: 'text-blue-500 bg-blue-500'
    }
  ]
})

const filterForm = ref({
  returns: props.request?.returns || '',
  deposit: props.request?.deposit || '',
  pie: props.request?.deposit || ''
})

const filter = () => {
  router.get(route('admin.dashboard'), pickBy(filterForm.value), {
    preserveState: true,
    replace: true
  })
}
const profitChart = computed(() => {
  return {
    series: [
      {
        name: 'Profits',
        data: props.profitOverview.map((item) => item.profits.toFixed(2))
      },
      {
        name: 'Losses',
        data: props.profitOverview.map((item) => item.losses.toFixed(2))
      }
    ],
    chartOptions: {
      colors: ['#69ae84', '#E32A3A'],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'string',
        categories: props.profitOverview.map((item) => item.date)
      }
    }
  }
})
const depositChart = computed(() => {
  return {
    series: [
      {
        name: 'Deposits',
        data: props.depositOverview.map((item) => item.deposit.toFixed(2))
      }
    ],
    chartOptions: {
      colors: ['#69ae84'],
      chart: {
        height: 360,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'string',
        categories: props.depositOverview.map((item) => item.date)
      }
    }
  }
})
const detailsChart = computed(() => {
  return {
    series: [
      props.pieChartData['invest'],
      props.pieChartData['deposits'],
      props.pieChartData['commissions']
    ],
    chartOptions: {
      chart: {
        type: 'donut'
      },
      height: 160,
      labels: ['Invest', 'Deposits', 'Commissions'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }
})
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :title="trans('Dashboard')" />

    <div class="space-y-6">
      <!-- Overview Section Start -->
      <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <!-- Product Views  -->
        <template v-for="(item, index) in primaryOverview" :key="index">
          <div class="card">
            <div class="card-body flex items-center gap-4">
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-opacity-20"
                :class="item.classes"
              >
                <i class="text-3xl" :class="item.icon"></i>
              </div>
              <div class="flex flex-1 flex-col gap-1">
                <p class="text-sm tracking-wide text-slate-500">{{ item.title }}</p>
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <h4>{{ item.value }}</h4>
                </div>
              </div>
            </div>
          </div>
        </template>
      </section>
      <!-- Overview Section End -->

      <!-- Sales Chart  -->
      <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="card order-2 col-span-1 md:col-span-2 xl:order-3">
          <div class="card-body gap-4">
            <div class="flex flex-wrap justify-between gap-2">
              <h6>{{ trans('Overview Of Investment Returns') }}</h6>
              <select
                v-model="filterForm.returns"
                @change="filter"
                class="select select-xl w-full md:w-40"
              >
                <option value="" selected>{{ trans('Filter By') }}</option>
                <option
                  class="capitalize"
                  :value="item"
                  v-for="item in ['day', 'week', 'month', 'year']"
                  :key="item"
                  :selected="filterForm.returns === item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="min-h-min">
              <VueApexCharts
                type="area"
                height="350"
                :options="profitChart.chartOptions"
                :series="profitChart.series"
              />
            </div>
          </div>
        </div>
        <div class="order-4 col-span-full space-y-6 xl:col-span-1">
          <div class="card">
            <div class="card-body gap-4">
              <div class="flex flex-wrap justify-between gap-2">
                <h6>{{ trans('User Deposits') }}</h6>
                <select
                  v-model="filterForm.deposit"
                  @change="filter"
                  class="select select-xl w-full md:w-40"
                >
                  <option value="" selected>{{ trans('Filter By') }}</option>
                  <option
                    class="capitalize"
                    :value="item"
                    v-for="item in ['day', 'week', 'month', 'year']"
                    :key="item"
                    :selected="filterForm.deposit === item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="min-h-min">
                <VueApexCharts
                  type="area"
                  height="360"
                  :options="depositChart.chartOptions"
                  :series="depositChart.series"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Store Analytics, Recent Deposits Section End  -->

      <!-- events, pie chart Section start  -->
      <section class="grid grid-cols-1 place-items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="card col-span-1 md:col-span-2">
          <div class="card-body space-y-2">
            <h6>{{ trans('Recent Events') }}</h6>

            <div
              v-if="recentEvents?.length > 0"
              class="table-responsive whitespace-nowrap rounded-primary"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Name') }}</th>
                    <th>{{ trans('Date') }}</th>
                    <th>{{ trans('Location') }}</th>
                    <th>{{ trans('Total Seat') }}</th>
                    <th>{{ trans('Status') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in recentEvents" :key="event.id">
                    <td class="flex items-center">
                      <a
                        target="_blank"
                        :href="route('events.show', event.slug)"
                        class="flex items-center gap-2"
                      >
                        <img v-lazy="event.preview" class="avatar mr-1 rounded" />
                        {{ textExcerpt(event.title, 20) }}
                        <span v-if="event.is_free" class="badge badge-success">
                          ( {{ trans('Free') }})
                        </span>
                        <span v-else class="badge badge-primary">
                          ({{ trans('Fee:') }} {{ formatCurrency(event.fee_amount) }})
                        </span>
                      </a>
                    </td>
                    <td>{{ moment(event.start_at).format('DD MMM, Y') }}</td>
                    <td>{{ textExcerpt(event.location, 20) }}</td>
                    <td>{{ event.total_seat }}</td>

                    <td class="text-right">
                      <span
                        class="badge"
                        :class="event.is_active == 1 ? 'badge-success' : 'badge-danger'"
                      >
                        {{ event.is_active == 1 ? trans('Active') : trans('Draft') }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Alert v-else text="Nothing found..." />
          </div>
        </div>

        <div class="card col-span-full xl:col-span-1">
          <div class="card-body space-y-2">
            <div class="flex flex-wrap justify-between gap-2">
              <h6>{{ trans('Invest') }}, {{ trans('Deposits') }}, {{ trans('Commissions') }}</h6>
              <select
                v-model="filterForm.pie"
                @change="filter"
                class="select select-xl w-full md:w-40"
              >
                <option value="" selected>{{ trans('Filter By') }}</option>
                <option
                  class="capitalize"
                  :value="item"
                  v-for="item in ['week', 'month', 'year']"
                  :key="item"
                  :selected="filterForm.pie === item"
                >
                  {{ item }}
                </option>
              </select>
            </div>

            <VueApexCharts
              height="160"
              type="donut"
              :options="detailsChart.chartOptions"
              :series="detailsChart.series"
            />
          </div>
        </div>
      </section>
      <!-- Invests, Deposits Section start  -->
      <section class="grid grid-cols-1 place-items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="card col-span-1 md:col-span-2">
          <div class="card-body space-y-2">
            <h6>{{ trans('Recent Invests') }}</h6>

            <div
              v-if="recentInvests?.length > 0"
              class="table-responsive whitespace-nowrap rounded-primary"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Invoice') }}</th>
                    <th>{{ trans('Project') }}</th>
                    <th>{{ trans('Duration') }}</th>
                    <th>{{ trans('Amount') }}</th>
                    <th>{{ trans('QTY') }}</th>
                    <th>{{ trans('Status') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="investment in recentInvests" :key="investment.id">
                    <td>
                      {{ investment?.invoice_no }}
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
                  </tr>
                </tbody>
              </table>
            </div>
            <Alert v-else text="Nothing found..." />
          </div>
        </div>

        <div class="card col-span-1">
          <div class="card-body space-y-2">
            <h6>{{ trans('Recent Deposits') }}</h6>

            <div
              v-if="recentDeposits?.length > 0"
              class="table-responsive whitespace-nowrap rounded-primary"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Invoice No') }}</th>
                    <th>{{ trans('Trx') }}</th>
                    <th>{{ trans('Amount') }}</th>
                    <th>{{ trans('Status') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="history in recentDeposits" :key="history.id">
                    <td>
                      {{ history.invoice_no }}
                    </td>
                    <td>{{ history.payment_id }}</td>
                    <td>{{ formatCurrency(history.amount) }}</td>
                    <td class="text-left">
                      <span
                        class="badge"
                        :class="history.status == 1 ? 'badge-success' : 'badge-danger'"
                      >
                        {{ history.status == 1 ? trans('Active') : trans('Draft') }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Alert v-else text="Nothing found..." />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
