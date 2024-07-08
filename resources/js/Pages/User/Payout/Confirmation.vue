<script setup>
import { Head, useForm, router } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import sharedComposable from '@/composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
const { authUser } = sharedComposable()
const props = defineProps(['method', 'wallet', 'payout_amount', 'userPayoutInfo'])

defineOptions({ layout: UserLayout })
const form = useForm({
  otp: null
})

const charge =
  props.method.charge_type == 'fixed'
    ? props.method.fixed_charge
    : (props.method.percent_charge / 100) * props.payout_amount
const payout_after_charge = props.payout_amount - charge

const validateOtp = () => {
  form.post(route('user.payout.otp.verify'), {
    onSuccess: () => {
      notify.success(
        trans('Your Payout Request Successfully Sent Our Financial Team Will Processed For It')
      )

      setTimeout(router.visit(route('user.payout.logs')), 2000)
    }
  })
}
</script>

<template>
  <Head :title="trans('Payout Confirmation')" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :segments="segments" :buttons="buttons" />
    <div class="card mx-auto w-8/12">
      <div class="card-body">
        <div v-if="wallet > 0">
          <h5 class="mb-6 flex items-center">
            <img class="mr-1 w-8" src="/assets/images/money-bag.png" height="30" alt="money" />
            {{ trans('Enter Confirmation OTP') }}
          </h5>
          <form class="mb-5" method="POST" @submit.prevent="validateOtp">
            <div class="flex gap-x-2">
              <input
                required
                :disabled="form.processing"
                type="number"
                v-model="form.otp"
                :placeholder="trans('Enter Otp')"
                class="input"
              />
              <button
                type="submit"
                class="flex w-10 items-center justify-center rounded-full bg-primary-600"
                :disabled="form.processing"
              >
                <i data-feather="arrow-right"></i>
              </button>
            </div>
            <small class="text-danger" v-if="form.errors.otp">{{ form.errors.otp }}</small>
          </form>

          <div class="alert alert-success">
            <strong>{{ trans('Hello ') + authUser.name }}</strong
            >{{ trans(', We have sent you an confirmation OTP code to your email.') }}
          </div>
        </div>

        <div class="mt-5">
          <h5 class="mb-5 flex items-center gap-x-1">
            <i data-feather="dollar-sign"></i>
            {{ trans('Payment Details') }}
          </h5>
          <div class="table-responsive whitespace-nowrap rounded-primary">
            <table class="table">
              <tbody>
                <tr>
                  <th>{{ trans('Method name') }}</th>
                  <td colspan="4">{{ method.name }}</td>
                </tr>
                <tr>
                  <th>{{ trans('Payout Amount') }}</th>
                  <td colspan="4">{{ payout_amount }}</td>
                </tr>
                <tr>
                  <th>{{ trans('Payout Charge') }}</th>
                  <td colspan="4">{{ charge }}</td>
                </tr>
                <tr>
                  <th>{{ trans('You Will Receive') }}</th>
                  <td colspan="4">{{ payout_after_charge }}</td>
                </tr>
                <tr v-for="(field, index) in userPayoutInfo" :key="index">
                  <th>{{ index }}</th>
                  <td colspan="4">{{ field }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
