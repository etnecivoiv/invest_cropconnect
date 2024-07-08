<script setup>
import sharedComposable from '@/composables/sharedComposable'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import Alert from '@/components/Admin/Alert.vue'
import UserLayout from '@/Layouts/User.vue'
import VueApexCharts from 'vue3-apexcharts'
import { router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
defineOptions({ layout: UserLayout })

const props = defineProps([
  'pieChartData',
  'totalInvest',
  'totalProfit',
  'totalDeposits',
  'totalRefers',
  'profitOverview',
  'recentDeposits',
  'recentInvests',
  'totalRefers',
  'request'
])
const { formatCurrency, textExcerpt, pickBy, authUser } = sharedComposable()

const primaryOverview = computed(() => {
  return [
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
      title: 'Wallet',
      value: formatCurrency(authUser.value.wallet),
      icon: 'bx bx-dollar',
      classes: 'text-info-500 bg-info-500'
    }
  ]
})

const filterForm = ref({
  returns: props.request?.returns || '',
  pie: props.request?.pie || ''
})

const filter = () => {
  router.get(route('user.dashboard'), pickBy(filterForm.value), {
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
        categories: props.profitOverview.map((item) => item.date)
      }
    }
  }
})

const detailsChart = computed(() => {
  return {
    series: [
      props.pieChartData['pending'],
      props.pieChartData['approved'],
      props.pieChartData['declined']
    ],
    chartOptions: {
      chart: {
        type: 'donut'
      },
      height: 140,
      labels: ['Pending', 'Approved', 'Declined'],
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
      <section class="grid grid-cols-2 place-items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="card order-2 col-span-full w-full md:col-span-2 xl:order-3">
          <div class="card-body flex h-full flex-col justify-between gap-4">
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
                height="360"
                :options="profitChart.chartOptions"
                :series="profitChart.series"
              />
            </div>
          </div>
        </div>
        <div class="order-4 col-span-full w-full space-y-6 xl:col-span-1">
          <div class="card">
            <div class="card-body">
              <div class="flex flex-wrap justify-between gap-2">
                <h6>{{ trans('Commissions') }}</h6>
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
              <div class="min-h-min">
                <VueApexCharts
                  height="140"
                  type="donut"
                  :options="detailsChart.chartOptions"
                  :series="detailsChart.series"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <!-- Header  -->
              <div class="flex w-full justify-between">
                <h6>{{ trans('Refer Details') }}</h6>
              </div>

              <!-- Performance Score Progress -->
              <div class="mt-4 flex w-full gap-1">
                <div class="h-2 w-[33%] rounded-primary bg-primary-500"></div>
                <div class="h-2 w-[33%] rounded-primary bg-info-500"></div>
                <div class="h-2 w-[33%] rounded-primary bg-success-500"></div>
              </div>
              <br />
              <div class="space-y-5">
                <!-- Excellent -->
                <div class="flex w-full justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-[14px] w-[14px] rounded-full border-2 border-primary-500"></div>
                    <p class="whitespace-nowrap text-sm font-medium">{{ trans('Signup') }}</p>
                  </div>
                  <div class="flex items-center justify-center">
                    <p
                      class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      {{ totalRefers }}
                    </p>
                  </div>
                </div>
                <!-- Very Good  -->
                <div class="flex w-full justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-[14px] w-[14px] rounded-full border-2 border-info-500"></div>
                    <p class="whitespace-nowrap text-sm font-medium">
                      {{ trans('Pending For Measurement') }}
                    </p>
                  </div>
                  <div class="flex items-center justify-center">
                    <p
                      class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      {{ formatCurrency(props.pieChartData['pending']) }}
                    </p>
                  </div>
                </div>
                <!-- Good  -->
                <div class="flex w-full justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-[14px] w-[14px] rounded-full border-2 border-success-500"></div>
                    <p class="whitespace-nowrap text-sm font-medium">
                      {{ trans('Total Earnings') }}
                    </p>
                  </div>
                  <div class="flex items-center justify-center">
                    <p
                      class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      {{ formatCurrency(props.pieChartData['approved']) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Store Analytics, Recent Deposits Section End  -->

      <!-- Invests, Deposits Section start  -->
      <section class="grid place-items-start gap-6 md:grid-cols-12">
        <div class="card md:col-span-8">
          <div class="card-body space-y-2">
            <h6>{{ trans('Recent Invests') }}</h6>

            <div
              v-if="recentInvests?.length > 0"
              class="table-responsive whitespace-nowrap rounded-primary"
            >
              <table class="table min-w-[43rem]">
                <thead>
                  <tr>
                    <th>{{ trans('Invoice No') }}</th>
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

        <div class="card md:col-span-4">
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