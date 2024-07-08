<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import sharedComposable from '@/composables/sharedComposable'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
const { authUser } = sharedComposable()
defineOptions({ layout: UserLayout })
const props = defineProps(['method', 'userPayoutInfo', 'wallet'])

const form = useForm({
  amount: props.wallet
})

function sendOtp() {
  if (form.amount > props.wallet) {
    notify.danger(trans('You cant sent payout request greater then ') + props.wallet)
    return false
  } else if (form.amount < props.method.min_limit) {
    notify.danger(trans('You cant sent payout request less then ') + props.method.min_limit)
    return false
  } else if (form.amount > props.method.max_limit) {
    notify.danger(
      trans('You cant sent payout request greater then ') +
        props.method.min_limit +
        ' using this method'
    )
    return false
  }

  form.post(route('user.payout.otp', props.method.id), {
    onSuccess: () => {
      notify.danger(trans('a confirmation otp has sent to your email'))
    }
  })
}
</script>
<template>
  <Head :title="`${method.name} - Payout Method`" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader />
    <div class="card mx-auto xl:w-9/12">
      <div class="card-body">
        <div v-if="wallet > 0">
          <h5 class="mb-6 flex items-center">
            <img class="mr-1 w-8" src="/assets/images/money-bag.png" height="30" alt="money" />
            {{ trans('Enter Amount') }}
          </h5>
          <form method="POST" @submit.prevent="sendOtp">
            <div class="flex gap-x-2">
              <input
                class="input"
                :disabled="form.processing"
                type="number"
                v-model="form.amount"
                :max="authUser.wallet"
                step="any"
                :placeholder="trans('Enter Amount')"
              />
              <button
                :disabled="form.processing"
                type="submit"
                class="flex w-10 items-center justify-center rounded-full bg-primary-600"
              >
                <i data-feather="arrow-right"></i>
              </button>
            </div>
            <small class="text-danger" v-if="form.errors.amount" :disabled="form.processing">{{
              form.errors.amount
            }}</small>
          </form>
        </div>
        <div class="my-8 flex items-center gap-x-4" v-if="wallet < method.min_limit">
          <img class="w-16" src="/assets/images/sorry.png" alt="" />
          <div>
            <h4>
              {{ trans('I am sorry') }}
            </h4>
            <p>
              {{ trans("You don't have enough balance for use this payout method.") }}
            </p>
          </div>
        </div>

        <div>
          <h3 class="my-8 flex items-start gap-x-4">
            <img class="w-32" v-lazy="method.image" height="30" alt="" />
            {{ trans('Payout method information') }}
          </h3>
          <div class="table-responsive whitespace-nowrap rounded-primary">
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
                  <td colspan="4">{{ method.delay }} {{ trans('Days') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
