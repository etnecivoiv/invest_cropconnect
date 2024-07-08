<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, router, useForm } from '@inertiajs/vue3'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import sharedComposable from '@/composables/sharedComposable'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
import OverviewGrid from '@/components/Admin/OverviewGrid.vue'
import drawer from '@/Plugins/Admin/drawer'
import { onMounted } from 'vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import { modal } from '@/composables/modalComposable'
defineOptions({ layout: AdminLayout })
const { formatCurrency } = sharedComposable()
const props = defineProps([
  'commissions',
  'affiliate_commission_percent',
  'buttons',
  'segments',
  'total',
  'totalPending',
  'totalApproved',
  'totalDeclined'
])

onMounted(() => {
  drawer.init()
})

const stats = [
  { value: props.total, title: trans('Total '), iconClass: 'bx bx-box' },
  {
    value: props.totalPending,
    title: trans('Pending '),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalApproved,
    title: trans('Approved'),
    iconClass: 'ti ti-thumb-up'
  },
  {
    value: props.totalDeclined,
    title: trans('Declined '),
    iconClass: 'ti ti-message-2-cog'
  }
]

const updateCommission = (id, action) => {
  modal.initCallback(() => {
    router.put(
      route('admin.commission-histories.update', id),
      { action },
      {
        onSuccess: () => {
          notify.success(trans('Record updated successfully'))
        }
      }
    )
  })
}

const commissionForm = useForm({
  affiliate_commission_percent: props.affiliate_commission_percent
})

function updateOption(form, key, drawerId) {
  form.put(route('admin.option.update', key), {
    onSuccess: () => {
      notify.success('Option Updated successfully')
      drawer.of(drawerId).hide()
    }
  })
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <PageHeader :title="trans('Referral History')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <OverviewGrid :items="stats" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans('User') }}</th>
              <th class="">{{ trans('Order') }}</th>
              <th class="">{{ trans('Project') }}</th>
              <th class="">{{ trans('Amount') }}</th>
              <th class="">{{ trans('Created At') }}</th>
              <th class="">{{ trans('Action') }}</th>
            </tr>
          </thead>

          <tbody v-if="commissions.total">
            <tr v-for="item in commissions.data" :key="item.id">
              <td class="flex items-center gap-x-2">
                <img
                  class="w-10 rounded-full"
                  v-lazy="
                    item.user?.avatar == null
                      ? `https://ui-avatars.com/api/?name=${item.user?.name}`
                      : `${item.user?.avatar}`
                  "
                  :alt="item.user?.name"
                />
                {{ item.user?.name }}
              </td>
              <td class="text-left">
                <Link :href="`/admin/order/${item.order_id}`">
                  {{ item.order?.invoice_no }}
                </Link>
              </td>
              <td class="text-left">
                <a target="_blank" :href="`/projects/${item.order?.project?.slug}`">
                  {{ item.order?.project?.title }}
                </a>
              </td>
              <td>{{ formatCurrency(item.commission_amount) }}</td>
              <td>
                {{ moment(item.created_at).format('DD MMM, YYYY') }}
              </td>
              <td>
                <div class="flex gap-1" v-if="item.status == 0">
                  <button @click="updateCommission(item.id, 1)" class="btn btn-primary">
                    {{ trans('Approve') }}
                  </button>
                  <button @click="updateCommission(item.id, 2)" class="btn btn-danger">
                    {{ trans('Reject') }}
                  </button>
                </div>
                <div v-if="item.status != 0">
                  <button class="btn btn-success" v-if="item.status == 1" disabled>
                    {{ trans('Approved') }}
                  </button>
                  <button class="btn btn-danger" v-else disabled>
                    {{ trans('Rejected') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>

        <Paginate :links="commissions.links" />
      </div>
    </div>

    <div id="commissionSettingDrawer" class="drawer drawer-right">
      <form
        method="POST"
        @submit.prevent="
          updateOption(commissionForm, 'affiliate_commission_percent', '#commissionSettingDrawer')
        "
      >
        <div class="drawer-header">
          <h5>{{ trans('Tax Settings') }}</h5>
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
            <label>{{ trans('Affiliate Commission For Per Investment (%)') }}</label>
            <input
              type="number"
              step="any"
              v-model="commissionForm.affiliate_commission_percent"
              class="input"
              required
            />
          </div>
        </div>
        <div class="drawer-footer">
          <div class="flex justify-end gap-2">
            <button type="button" class="btn btn-secondary" data-dismiss="drawer">
              <span> {{ trans('Close') }}</span>
            </button>
            <SpinnerBtn
              classes="btn btn-primary"
              :processing="commissionForm.processing"
              :btn-text="trans('Save Changes')"
            />
          </div>
        </div>
      </form>
      <div class="drawer-backdrop"></div>
    </div>
  </main>
</template>
