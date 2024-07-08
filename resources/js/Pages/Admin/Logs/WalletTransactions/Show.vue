<script setup>
import { Head, router, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/Admin.vue'
import moment from 'moment'
import trans from '@/composables/transComposable'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
const { formatCurrency } = sharedComposable()

defineOptions({ layout: AdminLayout })
const props = defineProps(['history', 'segments', 'buttons', 'request'])

const updateStatus = (status) => {
  router.put(route('admin.deposit-logs.update', props.history.id), {
    status
  })
}
</script>

<template>
  <Head title="Transaction Histories" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Deposit History Details" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="card card-body mx-auto w-[600px]">
        <table class="table">
          <tbody>
            <tr>
              <th>{{ trans('Invoice No') }}</th>
              <td>{{ history.invoice_no }}</td>
            </tr>
            <tr>
              <th>{{ trans('User') }}</th>
              <td>
                <Link :href="`users/${history.user?.id}`">{{ history.user?.name }}</Link>
              </td>
            </tr>
            <tr>
              <th>{{ trans('Gateway') }}</th>
              <td>
                <img v-lazy="history.gateway?.logo" alt="" class="h-4" />
              </td>
            </tr>
            <tr>
              <th>{{ trans('Tnx') }}</th>
              <td>{{ history.payment_id }}</td>
            </tr>
            <tr>
              <th>{{ trans('Amount') }}</th>
              <td>{{ formatCurrency(history.amount) }}</td>
            </tr>
            <tr>
              <th>{{ trans('Status') }}</th>
              <td>
                <span class="badge" :class="history.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ history.status == 0 ? trans('Declined') : '' }}
                  {{ history.status == 1 ? trans('Active') : '' }}
                  {{ history.status == 2 ? trans('Pending') : '' }}
                </span>
              </td>
            </tr>
            <tr>
              <th>{{ trans('Created At') }}</th>
              <td>{{ moment(history.created_at).format('DD MMM, Y') }}</td>
            </tr>

            <template v-if="history.meta">
              <tr>
                <th>{{ trans('Attachment') }}</th>
                <td>
                  <a target="_blank" class="btn btn-primary btn-sm" :href="history.meta.screenshot"
                    >View</a
                  >
                </td>
              </tr>
              <tr>
                <th>{{ trans('Comment') }}</th>
                <td>{{ history.meta.comment }}</td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="mt-4 flex justify-center gap-3" v-if="history.status == 2">
          <button class="btn btn-success" @click="updateStatus(1)">{{ trans('Approve') }}</button>

          <button class="btn btn-danger" @click="updateStatus(0)">{{ trans('Reject') }}</button>
        </div>
      </div>
    </div>
  </main>
</template>
