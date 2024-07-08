<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
import OverviewGrid from '@/components/Admin/OverviewGrid.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import Pagination from '@/components/Paginate.vue'
import trans from '@/composables/transComposable'
import { Link, router } from '@inertiajs/vue3'
import drawer from '@/Plugins/Admin/drawer'
import notify from '@/Plugins/Admin/notify'
import { onMounted, ref } from 'vue'

defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()

const props = defineProps([
  'customers',
  'totalCustomer',
  'totalActiveCustomer',
  'totalInActiveCustomer'
])

onMounted(() => {
  drawer.init()
})

const investorStats = [
  { value: props.totalCustomer, title: trans('Total Customer'), iconClass: 'ti ti-list' },
  {
    value: props.totalActiveCustomer,
    title: trans('Active Customer'),
    iconClass: 'ti ti-thumb-up'
  },
  {
    value: props.totalInActiveCustomer,
    title: trans('InActive Customer'),
    iconClass: 'ti ti-thumb-down'
  }
]

const editForm = ref({
  processing: false
})

const openEditCustomerDrawer = (customer) => {
  editForm.value = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    wallet: customer.wallet,
    email_verified_at: customer.email_verified_at ? true : false,
    kyc_verified_at: customer.kyc_verified_at ? true : false,
    status: customer.status ? true : false,
    password: '',
    _method: 'put'
  }
  drawer.of('#editCustomerDrawer').show()
}

const updateCustomer = () => {
  editForm.value.processing = true
  router.post(route('admin.customers.update', editForm.value.id), editForm.value, {
    onSuccess: () => {
      editForm.value = {}
      drawer.of('#editCustomerDrawer').hide()
      notify.success(trans('Customer has been updated successfully'))
      editForm.value.processing = false
    }
  })
}
</script>

<template>
  <main class="flex-grow p-4 sm:p-6">
    <PageHeader />
    <div class="space-y-6">
      <OverviewGrid :items="investorStats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Customer') }}</th>
              <th>{{ trans('Email') }}</th>
              <th>{{ trans('Email Verified') }}</th>
              <th>{{ trans('KYC Verified') }}</th>
              <th class="text-right">{{ trans('Status') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody v-if="customers.data.length">
            <tr v-for="customer in customers.data" :key="customer.id">
              <td>
                <Link
                  :href="route('admin.customers.show', customer.id)"
                  class="flex items-center gap-1"
                >
                  <img
                    v-lazy="
                      customer.preview == null
                        ? `https://ui-avatars.com/api/?name=${customer.name}`
                        : `${customer.preview}`
                    "
                    class="avatar mr-3 rounded-full"
                  />
                  {{ customer.name }}
                </Link>
              </td>
              <td>{{ customer.email }}</td>
              <td>
                <span v-if="customer.email_verified_at" class="badge badge-success">{{
                  trans('Verified')
                }}</span>
                <span v-else class="badge badge-danger">{{ trans('Unverified') }}</span>
              </td>
              <td>
                <span v-if="customer.kyc_verified_at" class="badge badge-success">{{
                  trans('Verified')
                }}</span>
                <span v-else class="badge badge-danger">{{ trans('Unverified') }}</span>
              </td>

              <td class="text-right">
                <span
                  class="badge"
                  :class="customer.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ customer.status == 1 ? trans('Active') : trans('Inactive') }}
                </span>
              </td>

              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link
                          :href="route('admin.customers.show', customer.id)"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="eye"></i>
                          <span>{{ trans('View') }}</span>
                        </Link>
                      </li>
                      <li class="dropdown-list-item">
                        <button
                          @click="openEditCustomerDrawer(customer ?? {})"
                          class="dropdown-link"
                        >
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </button>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          type="button"
                          class="dropdown-link"
                          @click="deleteRow(route('admin.customers.destroy', customer.id))"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans('Remove') }}></i
                          >
                          <span>{{ trans('Delete') }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
      </div>
      <Pagination :links="customers.links" />
    </div>
  </main>

  <div id="editCustomerDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateCustomer()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Customer') }}</h5>
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
          <label>{{ trans('Full Name') }}</label>
          <input v-model="editForm.name" type="text" class="input" required />
        </div>

        <div class="mb-2">
          <label>{{ trans('Email') }}</label>
          <input v-model="editForm.email" type="email" class="input" required />
        </div>

        <div class="mb-2">
          <label>{{ trans('Phone') }}</label>
          <input v-model="editForm.phone" type="text" class="input" />
        </div>

        <div class="mb-2">
          <label>{{ trans('Address') }}</label>
          <input v-model="editForm.address" type="text" class="input" />
        </div>

        <div class="mb-2">
          <label>{{ trans('Wallet balance') }}</label>
          <input v-model="editForm.wallet" type="number" class="input" />
        </div>

        <div class="mb-2">
          <label>{{ trans('Password') }}</label>
          <input v-model="editForm.password" type="text" class="input" />
        </div>

        <div class="my-2">
          <div>
            <label for="email_verified_at" class="toggle toggle-sm">
              <input
                v-model="editForm.email_verified_at"
                class="toggle-input peer sr-only"
                id="email_verified_at"
                type="checkbox"
              />
              <div class="toggle-body"></div>
              <span class="label label-md">{{ trans('Email Verified?') }}</span>
            </label>
          </div>
        </div>

        <div class="my-2">
          <div>
            <label for="kyc_verified_at" class="toggle toggle-sm">
              <input
                v-model="editForm.kyc_verified_at"
                class="toggle-input peer sr-only"
                id="kyc_verified_at"
                type="checkbox"
              />
              <div class="toggle-body"></div>
              <span class="label label-md">{{ trans('KYC Verified?') }}</span>
            </label>
          </div>
        </div>
        <div class="my-2">
          <div>
            <label for="is_active" class="toggle toggle-sm">
              <input
                v-model="editForm.status"
                class="toggle-input peer sr-only"
                id="is_active"
                type="checkbox"
              />
              <div class="toggle-body"></div>
              <span class="label label-md">{{ trans('Active?') }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-between gap-2">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            {{ trans('Close') }}
          </button>
          <SpinnerBtn
            classes="btn btn-primary w-full"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
