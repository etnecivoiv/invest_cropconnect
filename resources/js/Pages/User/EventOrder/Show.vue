<script setup>
import UserLayout from '@/Layouts/User.vue'
import moment from "moment";
import PageHeader from "@/Layouts/Admin/PageHeader.vue";
import sharedComposable from "@/composables/sharedComposable";
defineOptions({ layout: UserLayout });
const props = defineProps([
  "order",
  "event",
  "invoice_data",
  "segments",
  "buttons",
  "meta",
]);
const { formatCurrency } = sharedComposable();
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Invoice details" :segments="segments" :buttons="buttons" />

    <!-- Invoice Details Starts -->
    <div class="card">
      <div class="space-y-6 card-body">
        <!-- Invoice Header Starts -->
        <div class="flex flex-col justify-between p-1 space-y-4 md:flex-row">
          <div class="flex items-center justify-center md:justify-start">
            <!-- Logo Starts -->
            <div class="flex items-center w-full h-16 gap-4 pr-4">
              <img v-lazy="$page.props.primaryData.deep_logo" alt="logo" class="block h-[45px] dark:hidden" />
              <img v-lazy="$page.props.primaryData.logo" alt="logo" class="hidden h-[45px] dark:block" />
            </div>
            <!-- Logo Ends -->
          </div>
          <div class="flex flex-col items-start justify-center md:items-end">
            <h4>Invoice #{{ order.invoice_no }}</h4>
            <p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans("Order Date") }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{ moment(order.created_at).format("DD-MM-YYYY") }}
              </span>
            </p>



            <p class="py-0 my-0 text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ trans("Status") }}:
              <span class="font-normal text-slate-600 dark:text-slate-300">
                {{
                  order.status == 2
                    ? "pending"
                    : order.status == 1
                      ? "approved"
                      : "declined"
                }}</span>
            </p>
          </div>
        </div>
        <!-- Invoice Header Ends -->

        <!-- Invoice Info Starts -->
        <div class="flex flex-col justify-between p-1 space-y-6 md:flex-row md:space-y-0">
          <div class="flex flex-col items-start justify-center w-full md:mb-0 md:w-2/3 md:justify-center">
            <p class="text-xs font-medium uppercase text-slate-400">BILLED FROM</p>
            <h6 class="my-1">{{ invoice_data.company_name }}</h6>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.address }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.city }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.post_code }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ invoice_data.country }}
            </p>
          </div>

          <div class="flex flex-col items-start justify-center w-full md:w-1/3 md:items-end">
            <p class="text-xs font-medium uppercase text-slate-400">BILLED TO</p>
            <h6 class="my-1">{{ order.user.name }}</h6>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ order.user.address }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ order.user.email }}
            </p>
            <p class="text-sm font-normal whitespace-nowrap text-slate-600 dark:text-slate-300">
              {{ order.user.phone }}
            </p>
          </div>
        </div>
        <!-- Invoice Info Ends -->

        <!-- Product Table Starts -->
        <div class="w-full p-1 overflow-auto">
          <div class="min-w-[38rem]">
            <div
              class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600">
              <table class="table table-striped table-hover table-md">
                <tbody>
                  <tr>
                    <td class="col-9">{{ trans("Project Name") }}</td>
                    <td class="col-3">
                      <div class="text-right">
                        {{ trans("Unit Price") }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img class="inline w-12 mr-2 rounded" v-lazy="order.event.preview" alt="preview" />
                      {{ order.event.title }}
                    </td>
                    <td>
                      <div class="text-right">
                        {{ formatCurrency(order.event.fee_amount) }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- project durations -->
            <h5 class="my-3">Booking Details</h5>
            <div
              class="border table-responsive whitespace-nowrap rounded-primary border-slate-200 dark:border-slate-600">
              <table class="table table-striped table-hover table-md">
                <tbody>
                  <tr>
                    <td>
                      {{ trans("Total Seat") }}
                    </td>
                    <td>
                      {{ trans("Fee Per Seat") }}
                    </td>
                    <td>
                      <div class="text-end">
                        {{ trans("Subtotal") }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      {{ order.qty }}
                    </td>
                    <td class="text-center">
                      {{ formatCurrency(event.fee_amount) }}
                    </td>

                    <td>
                      <div class="text-end">
                        {{ formatCurrency(event.fee_amount * order.qty) }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-stretch justify-between mt-4">
              <div class="w-3/5">
                <p class="py-0 my-2 text-sm font-semibold">
                  {{ trans("Payment Method") }}:
                  <span class="font-normal"> {{ order.gateway?.name ?? 'Free' }}</span>
                </p>

                <template v-if="order.gateway?.name">
                  <p class="py-0 my-2 text-sm font-semibold">
                    {{ trans("Payment Id") }}:
                    <span class="font-normal">{{ order.payment_id }}</span>
                  </p>
                  <div class="">
                    <template v-if="meta != null">
                      <div class="font-semibold">{{ trans("Payment Info:") }}</div>
                      <br />
                      <p class="section-lead">{{ meta.comment }}</p>
                      <p class="section-lead">
                        <a target="_blank" :href="meta.screenshot">{{
                          trans("Attachment")
                          }}</a>
                      </p>
                    </template>
                  </div>
                </template>

              </div>

              <div class="space-y-3 min-w-[272px]">
                <div class="flex items-center gap-x-2">
                  <p class="w-full text-sm text-right text-slate-400 dark:text-slate-300">
                    {{ trans("Subtotal") }}:
                  </p>

                  <p class="w-full text-sm font-semibold text-right text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.amount) }}
                  </p>
                </div>
                <div class="flex items-center gap-x-2">
                  <p class="w-full text-sm text-right text-slate-400 dark:text-slate-300">
                    {{ trans("Tax") }}:
                  </p>

                  <p class="w-full text-sm font-semibold text-right text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.tax || 0) }}
                  </p>
                </div>

                <hr class="mt-5 mb-1 border-slate-200 dark:border-slate-600" />
                <div class="flex items-center justify-end gap-x-2 text-end">
                  <p class="w-1/2 text-sm text-slate-400">{{ trans("Total") }}:</p>
                  <p class="w-1/2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {{ formatCurrency(order.amount + order.tax || 0) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Product Table Ends -->

        <p class="py-2 text-sm text-center">{{ trans("Thanks for your Business") }}</p>
      </div>
    </div>
    <!-- Invoice Details Ends -->
  </main>
</template>
