<script setup>
import { useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/Admin.vue'
import Pagination from '@/components/Paginate.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
import { modal } from '@/composables/modalComposable'

defineOptions({ layout: AdminLayout })
defineProps(['kycRequest', 'segments', 'buttons'])

const submitForm = (route, request, status) => {
  let data = {
    request: request,
    status: status
  }

  modal.init(route, {
    method: 'post',
    data,
    options: {
      confirm_text: 'Are you sure want to do this action ?',
      message: '',
      accept_btn_text: 'Yes, Confirm',
      reject_btn_text: 'No, Cancel'
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :title="trans('KYC Requests details')" :segments="segments" :buttons="buttons" />

    <div class="space-y-4">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-8">
              <table class="table-striped table">
                <tbody>
                  <tr>
                    <th>{{ trans('Name') }}</th>
                    <td>
                      {{ kycRequest.user?.name }}
                    </td>
                  </tr>
                  <tr>
                    <th>{{ trans('Email') }}</th>
                    <td>{{ kycRequest.user?.email }}</td>
                  </tr>
                  <tr>
                    <th>{{ trans('Phone') }}</th>
                    <td>{{ kycRequest.user?.phone }}</td>
                  </tr>
                  <tr>
                    <th>{{ trans('KYC Verified At') }}</th>
                    <td>
                      <div v-if="kycRequest.user?.kyc_verified_at">
                        {{ kycRequest.user?.kyc_verified_at }}
                      </div>
                      <div v-else>
                        <div class="badge badge-danger mb-4">{{ trans('Not yet verified!') }}</div>
                        <br />

                        <button
                          v-if="kycRequest.status == 0"
                          class="btn btn-secondary"
                          @click="
                            submitForm(
                              route('admin.kyc-requests.store'),
                              kycRequest.id,
                              'approve_all'
                            )
                          "
                        >
                          {{ trans('Approve with profile') }}
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ trans('Current Status') }}</th>
                    <td>
                      <span v-if="kycRequest.status == 0" class="badge badge-warning">
                        {{ trans('Pending') }}</span
                      >
                      <span v-else-if="kycRequest.status == 1" class="badge badge-primary">
                        {{ trans('Approved') }}</span
                      >
                      <span v-else-if="kycRequest.status == 2" class="badge badge-danger">
                        {{ trans('Rejected') }}</span
                      >
                      <span v-else-if="kycRequest.status == 3" class="badge badge-dark">
                        {{ trans('Re-Submitted') }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <th>{{ trans('Submitted At') }}</th>
                    <td>{{ kycRequest.created_at_date }}</td>
                  </tr>

                  <tr v-if="kycRequest.status == 2">
                    <th>{{ trans('Rejected At') }}</th>
                    <td>{{ kycRequest.rejected_at }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr class="mb-10" />

          <table class="mt-3 table">
            <thead>
              <tr>
                <td colspan="2">
                  <h4 class="rounded-md bg-gray-300 py-2 text-center dark:bg-gray-700">
                    {{ trans('Submissions') }}
                  </h4>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in kycRequest.data" :key="item">
                <th>{{ item.label }}</th>
                <td>
                  <a
                    target="_blank"
                    class="btn btn-success"
                    :href="item.value"
                    v-if="item.type == 'file'"
                    >{{ trans('View') }}</a
                  >
                  <p v-else>{{ item.value }}</p>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-5 flex justify-start gap-3">
            <template v-if="kycRequest.status !== 1">
              <button
                class="btn btn-primary"
                @click="submitForm(route('admin.kyc-requests.store'), kycRequest.id, 'approve')"
              >
                <i class="fas fa-check-circle"></i>
                {{ trans('Approve documents') }}
              </button>

              <button
                class="btn btn-secondary"
                @click="submitForm(route('admin.kyc-requests.store'), kycRequest.id, 'approve_all')"
              >
                <i class="fas fa-check-circle"></i>
                {{ trans('Approve with profile') }}
              </button>

              <button
                class="btn btn-danger"
                @click="submitForm(route('admin.kyc-requests.store'), kycRequest.id, 'reject')"
              >
                <i class="fas fa-times-circle"></i>
                {{ trans('Reject') }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
