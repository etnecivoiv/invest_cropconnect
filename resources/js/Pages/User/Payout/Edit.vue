<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import sharedComposable from '@/composables/sharedComposable'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import notify from '@/Plugins/Admin/notify'

const { authUser } = sharedComposable()
defineOptions({ layout: UserLayout })
const props = defineProps(['method', 'userPayoutInfo', 'fields', 'segments', 'buttons'])
const options = {
  responsive: true,
  maintainAspectRatio: false
}
const form = useForm({
  inputs: props.userPayoutInfo.length != 0 ? props.userPayoutInfo : {}
})

function updatePayoutInfo() {
  form.put(route('user.payout.update', props.method.id), {
    onSuccess: () => {
      notify.success('Payout Information Updated successfully')
    }
  })
}
</script>
<template>
  <Head :title="`${method.name} - Payout Method`" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :segments="segments" :buttons="buttons" />

    <div class="card mx-auto overflow-x-auto xl:w-7/12">
      <div class="card-body">
        <form method="POST" @submit.prevent="updatePayoutInfo">
          <table class="table">
            <tbody>
              <tr>
                <th>{{ trans('Method name') }}</th>
                <td>{{ method.name }}</td>
                <th>{{ trans('Currency') }}</th>
                <td>{{ method.currency_name }}</td>
              </tr>
              <tr>
                <th>{{ trans('Minimum limit') }}</th>
                <td>{{ method.min_limit }}</td>
                <th>{{ trans('Maximum limit') }}</th>
                <td>{{ method.max_limit }}</td>
              </tr>
              <tr>
                <th>{{ trans('Charge type') }}</th>
                <td>{{ method.charge_type }}</td>
                <th>{{ trans('Charge') }}</th>
                <td>
                  {{
                    method.charge_type == 'percentage'
                      ? method.percent_charge + '%'
                      : method.fixed_charge + ' ' + method.currency_name
                  }}
                </td>
              </tr>
              <tr>
                <th>{{ trans('Maximum Processing Time') }}</th>
                <td>{{ method.delay }} {{ trans('Days') }}</td>
              </tr>
              <tr>
                <td colspan="4" v-html="method.instruction"></td>
              </tr>
            </tbody>
          </table>
          <div class="mb-6">
            <div class="pt-2" v-for="(field, index) in fields" :key="index">
              <label> {{ field.label }} * </label>
              <div class="mt-3">
                <input
                  class="input"
                  v-model="form.inputs[field.label]"
                  v-if="field.type != 'textarea'"
                  :type="field.type"
                  required
                />
                <textarea
                  class="textarea"
                  v-else
                  required
                  v-model="form.inputs[field.label]"
                ></textarea>
              </div>
            </div>
          </div>
          <button :disabled="form.processing" type="submit" class="btn btn-primary">
            {{ form.processing ? trans('Processing...') : trans('Save Information') }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>