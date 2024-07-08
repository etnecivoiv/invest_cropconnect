<script setup>
import UserLayout from '@/Layouts/User.vue'
import moment from 'moment'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
defineOptions({ layout: UserLayout })
const props = defineProps([
  'order',
  'investment',
  'project',
  'invoice_data',
  'segments',
  'buttons',
  'meta'
])
const { formatCurrency } = sharedComposable()
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Invoice details" :segments="segments" :buttons="buttons" />

    <!-- Invoice Details Starts -->
    <div class="card">
      <div class="card-body space-y-6">
        <!-- Invoice Header Starts -->
        <div class="flex flex-col justify-between space-y-4 p-1 md:flex-row">
          <div class="flex items-center justify-center md:justify-start">
            <!-- Logo Starts -->
            <div class="flex h-16 w-full items-center gap-4 pr-4">
              <img
                v-lazy="$page.props.primaryData.deep_logo"
                alt="logo"
                class="block h-[45px] dark:hidden"
              />
              <img
                v-lazy="$page.props.primaryData.logo"
                alt="logo"
                class="hidden h-[45px] dark:block"
              />
            </div>
            <!-- Logo Ends -->
          </div>
          <div class="flex flex-col items-start justify-center md:items-end">
            <h4>Invoice #{{ order.invoice_no }}</h4>
            <p class="my-0 py-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans('Order Date') }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{ moment(order.created_at).format('DD-MM-YYYY') }}
              </span>
            </p>

            <p class="my-0 py-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans('Status') }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{
                  order.status == 2 ? 'pending' : order.status == 1 ? 'approved' : 'declined'
                }}</span
              >
            </p>
          </div>
        </div>
        <!-- Invoice Header Ends -->

        <!-- Invoice Info Starts -->
        <div class="flex flex-col justify-between space-y-6 p-1 md:flex-row md:space-y-0">
          <div
            class="flex w-full flex-col items-start justify-center md:mb-0 md:w-2/3 md:justify-center"
          >
            <p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p>
            <h6 class="my-1">{{ invoice_data.company_name }}</h6>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ invoice_data.address }}
            </p>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ invoice_data.city }}
            </p>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ invoice_data.post_code }}
            </p>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ invoice_data.country }}
            </p>
          </div>

          <div class="flex w-full flex-col items-start justify-center md:w-1/3 md:items-end">
            <p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p>
            <h6 class="my-1">{{ order.user.name }}</h6>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ order.user.address }}
            </p>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ order.user.email }}
            </p>
            <p class="whitespace-nowrap text-sm font-normal text-slate-600 dark:text-slate-300">
              {{ order.user.phone }}
            </p>
          </div>
        </div>
        <!-- Invoice Info Ends -->

        <!-- Product Table Starts -->
        <div class="w-full overflow-auto p-1">
          <div class="min-w-[38rem]">
            <div
              class="table-responsive whitespace-nowrap rounded-primary border border-slate-200 dark:border-slate-600"
            >
              <table class="table-striped table-hover table-md table">
                <tbody>
                  <tr>
                    <td class="col-9">{{ trans('Project Name') }}</td>
                    <td class="col-3 text-right">{{ trans('Unit Price') }}</td>
                  </tr>
                  <tr>
                    <td>
                      <a :href="`/projects/${project?.slug}`" target="_blank">
                        <img
                          class="mr-2 inline w-12 rounded"
                          v-lazy="project?.preview"
                          alt="preview"
                        />
                        {{ project?.title }}
                      </a>
                    </td>
                    <td class="text-right">
                      {{ formatCurrency(project.invest_amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- project durations -->
            <h5 class="my-3">{{ trans('Booking Details') }}</h5>
            <div
              class="table-responsive whitespace-nowrap rounded-primary border border-slate-200 dark:border-slate-600"
            >
              <table class="table-striped table-hover table-md table">
                <tbody>
                  <tr>
                    <td>
                      {{ trans('Total Unit') }}
                    </td>
                    <td>
                      {{ trans('Per Unit') }}
                    </td>
                    <td>
                      {{ trans('Subtotal') }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      {{ investment.qty }}
                    </td>
                    <td class="text-center">
                      {{ formatCurrency(project.invest_amount) }}
                    </td>

                    <td class="text-end">
                      {{ formatCurrency(project.invest_amount * investment.qty) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 flex items-stretch justify-between">
              <div class="w-2/5">
                <p class="my-2 py-0 text-sm font-semibold">
                  {{ trans('Payment Method') }}:
                  <span class="font-normal"> {{ order.gateway?.name ?? '' }}</span>
                </p>
                <p class="my-2 py-0 text-sm font-semibold">
                  {{ trans('Payment Id') }}:
                  <span class="font-normal">{{ order.payment_id }}</span>
                </p>
                <div class="">
                  <template v-if="meta != null">
                    <div class="font-semibold">{{ trans('Payment Info:') }}</div>
                    <br />
                    <p class="section-lead">{{ meta.comment }}</p>
                    <p class="section-lead">
                      <a target="_blank" :href="meta.screenshot">{{ trans('Attachment') }}</a>
                    </p>
                  </template>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm text-slate-400 dark:text-slate-300">{{ trans('Subtotal') }}:</p>

                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.amount) }}
                  </p>
                </div>
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm text-slate-400 dark:text-slate-300">{{ trans('Tax') }}:</p>

                  <p class="text-right text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.tax || 0) }}
                  </p>
                </div>

                <hr class="mb-1 mt-5 border-slate-200 dark:border-slate-600" />
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm text-slate-400">{{ trans('Total') }}:</p>
                  <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.amount + order.tax || 0) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Product Table Ends -->

        <p class="py-2 text-center text-sm">{{ trans('Thanks for your Business') }}</p>
      </div>
    </div>
    <!-- Invoice Details Ends -->
  </main>
</template>
