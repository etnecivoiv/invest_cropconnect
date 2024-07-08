<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/Admin.vue'
import Pagination from '@/components/Paginate.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import OverviewGrid from '@/components/Admin/OverviewGrid.vue'
import trans from '@/composables/transComposable'
import { modal } from '@/composables/modalComposable'
import { ref } from 'vue'
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'requests',
  'all',
  'approved',
  'pending',
  'rejected',
  'reSubmitted',
  'segments',
  'buttons'
])

const orderOverviews = [
  { value: props.all, title: trans('All'), iconClass: 'bx bx-box' },
  { value: props.pending, title: trans('Pending'), iconClass: 'bx bx-dollar-circle' },
  { value: props.approved, title: trans('Approved'), iconClass: 'bx bx-dollar-circle' },
  { value: props.rejected, title: trans('Rejected'), iconClass: 'ti ti-thumb-up' },
  { value: props.reSubmitted, title: trans('reSubmitted'), iconClass: 'ti ti-message-2-cog' }
]

const filterForm = useForm({})

const massDeleteForm = useForm({})

const filterFormSubmit = () => {
  filterForm.post(window.location.href, {
    onFinish() {}
  })
}

const form = ref({
  request: '',
  ids: []
})

const reqItems = ref(props.requests)

const submit = () => {
  modal.init(route('admin.kyc-requests.destroy.mass'), 'post', form.value, {
    confirm_text: 'Are you sure want to do this action ?',
    message: '',
    accept_btn_text: 'Yes, Confirm',
    reject_btn_text: 'No, Cancel',
    success_message: 'Requests has been deleted successfully'
  })
}

const selectAll = () => {
  let isAllSelected = form.value.ids.length == reqItems.value.data.length

  if (isAllSelected) {
    form.value.ids = []
  } else {
    form.value.ids = reqItems.value.data.map((item) => item.id)
  }
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :title="trans('KYC Requests')" :segments="segments" :buttons="buttons" />

    <div class="space-y-4">
      <OverviewGrid
        :items="orderOverviews"
        class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      />

      <div class="card">
        <div class="card-header">
          <form @submit.prevent="filterFormSubmit">
            <div class="flex justify-between">
              <h4>{{ trans('KYC Requests') }}</h4>
              <div class="input-group w-72">
                <input
                  type="text"
                  name="src"
                  class="input"
                  :placeholder="trans('Search by invoice or user')"
                />
                <button type="submit" class="btn btn-primary btn-icon">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="card-body">
          <div v-if="requests.data">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ trans('Method') }}</th>
                    <th>{{ trans('User Name') }}</th>
                    <th>{{ trans('Status') }}</th>
                    <th>{{ trans('Note') }}</th>
                    <th>{{ trans('Documents') }}</th>
                    <th class="text-right">{{ trans('Action') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in requests.data" :key="item">
                    <td>{{ item.method?.title }}</td>
                    <td>
                      {{ item.user?.name }}
                    </td>
                    <td>
                      <span v-if="item.status == 0" class="badge badge-warning">{{
                        trans('Pending')
                      }}</span>
                      <span v-else-if="item.status == 1" class="badge badge-primary">{{
                        trans('Approved')
                      }}</span>
                      <span v-else-if="item.status == 2" class="badge badge-danger">{{
                        trans('Rejected')
                      }}</span>
                      <span v-else-if="item.status == 3" class="badge badge-dark">{{
                        trans('Re-Submitted')
                      }}</span>
                    </td>
                    <td>{{ item.note }}</td>
                    <td>{{ item.data.length }}</td>
                    <td class="flex gap-x-2">
                      <Link
                        class="btn btn-primary"
                        :href="route('admin.kyc-requests.show', item.id)"
                      >
                        <i class="fas fa-eye"></i>
                        {{ trans('View') }}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Pagination :links="requests.links" />
            </div>
          </div>
          <p v-else class="text-center font-bold">{{ trans('No requests available yet') }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
