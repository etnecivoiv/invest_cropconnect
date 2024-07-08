<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
defineOptions({ layout: AdminLayout })
const props = defineProps(['payout', 'usermethod', 'segments', 'buttons'])
import { modal } from '@/composables/modalComposable'
const { formatCurrency } = sharedComposable()
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader
      :title="trans('Payout - ' + payout.invoice_no)"
      :segments="segments"
      :buttons="buttons"
    />
    <div class="card">
      <div class="card-body space-y-12">
        <div>
          <h4>{{ trans('Payout method info') }}</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>{{ trans('Name') }}</th>
                  <th>{{ trans('Charge') }}</th>
                  <th>{{ trans('Charge Type') }}</th>
                  <th>{{ trans('Delay') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ payout.method.name || '' }}</td>
                  <td>
                    {{
                      payout.method.percent_charge > 0
                        ? payout.method.percent_charge
                        : payout.method.fixed_charge
                    }}
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="payout.method.percent_charge > 0 ? 'badge-primary' : 'badge-warning'"
                    >
                      {{ payout.method.percent_charge > 0 ? trans('Percentage') : trans('Fixed') }}
                    </span>
                  </td>
                  <td>{{ payout.method.delay || '' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 class="mb-3">{{ trans('Payout info') }}</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>{{ trans('Amount') }}</th>
                  <th>{{ trans('User') }}</th>
                  <th>{{ trans('Email') }}</th>
                  <th>{{ trans('Charge') }}</th>
                  <th>{{ trans('Status') }}</th>
                  <th>{{ trans('Created At') }}</th>
                  <th>
                    <p class="text-end">
                      {{ trans('Action') }}
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ payout.amount + payout.currency }}</td>
                  <td>{{ payout.user.name || '' }}</td>
                  <td>{{ payout.user.email || '' }}</td>
                  <td>{{ payout.charge + payout.currency }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="
                        payout.status == 'pending'
                          ? 'badge-warning'
                          : payout.status == 'failed'
                          ? 'badge-danger'
                          : 'badge-success'
                      "
                    >
                      {{ payout.status }}
                    </span>
                  </td>
                  <td>{{ payout.created_at_date }}</td>
                  <td class="text-right">
                    <div class="flex justify-end">
                      <div class="dropdown" data-placement="bottom-start">
                        <div class="dropdown-toggle">
                          <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                        </div>
                        <div class="dropdown-content">
                          <ul class="dropdown-list">
                            <li class="dropdown-list-item">
                              <button
                                class="dropdown-link"
                                @click="
                                  modal.init(route('admin.payouts.update', payout.id), {
                                    method: 'put',
                                    data: { status: 'completed' }
                                  })
                                "
                              >
                                <i class="h-5 text-slate-400" data-feather="check-circle"></i>
                                {{ trans('Approve') }}
                              </button>
                            </li>
                            <li class="dropdown-list-item">
                              <button
                                class="dropdown-link"
                                @click="
                                  modal.init(route('admin.payouts.update', payout.id), {
                                    method: 'put',
                                    data: { status: 'failed' }
                                  })
                                "
                              >
                                <i class="h-5 text-slate-400" data-feather="x"></i>
                                {{ trans('Reject') }}
                              </button>
                            </li>

                            <li class="dropdown-list-item">
                              <button
                                class="dropdown-link"
                                @click="
                                  modal.init(route('admin.payouts.update', payout.id), {
                                    method: 'put',
                                    data: {
                                      status: 'failed',
                                      paymentStatus: 'return'
                                    }
                                  })
                                "
                              >
                                <i class="h-5 text-slate-400" data-feather="rotate-ccw"></i>
                                {{ trans('Reject & revert balance') }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>
                  {{ trans('Current Balance') }}
                </th>
                <td class="text-end">
                  {{ formatCurrency(payout.user.wallet || 0) }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(meta, index) in JSON.parse(payout.meta)" :key="index">
                <th>
                  {{ index }}
                  <h4></h4>
                </th>
                <td>
                  {{ meta }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
