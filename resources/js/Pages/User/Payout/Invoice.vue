<script setup>
import { Head } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import sharedComposable from '@/composables/sharedComposable'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
const props = defineProps(['payout', 'userPayoutInfo', 'method', 'segments', 'buttons'])
const { authUser } = sharedComposable()
defineOptions({ layout: UserLayout })
</script>

<template>
  <Head :title="`${method.name} - Payout Method`" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :segments="segments" :buttons="buttons" />
    <div class="card mx-auto w-1/2">
      <div class="card-body">
        <h5 class="mb-5 flex items-center gap-x-1">
          <i data-feather="dollar-sign"></i>
          {{ trans('Payment Details') }}
        </h5>
        <div class="table-responsive whitespace-nowrap rounded-primary">
          <table class="table">
            <tbody>
              <tr>
                <th>{{ trans('Invoice No') }}</th>
                <td colspan="4">{{ payout.invoice_no }}</td>
              </tr>
              <tr>
                <th>{{ trans('Payout Method') }}</th>
                <td colspan="4" v-if="method != null">
                  {{ method.name }}
                </td>
              </tr>
              <tr>
                <th>{{ trans('Payout Requested Amount') }}</th>
                <td colspan="4">{{ payout.amount }}</td>
              </tr>
              <tr>
                <th>{{ trans('Payout Gateway Charge') }}</th>
                <td colspan="4">{{ payout.charge }}</td>
              </tr>
              <tr>
                <th>{{ trans('Conversion Currency') }}</th>
                <td colspan="4">{{ payout.currency }}</td>
              </tr>
              <tr>
                <th>{{ trans('Processing Status') }}</th>
                <td colspan="4">{{ payout.status }}</td>
              </tr>
              <tr v-for="(field, index) in userPayoutInfo" :key="index">
                <th>{{ index }}</th>
                <td colspan="4">{{ field }}</td>
              </tr>
              <tr>
                <th>{{ trans('Requested Date') }}</th>
                <td colspan="4">{{ payout.created_at_date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
