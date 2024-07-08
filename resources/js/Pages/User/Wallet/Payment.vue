<script setup>
import { useForm, router, Head } from '@inertiajs/vue3'
import { ref } from 'vue'

import BlankLayout from '@/Layouts/Blank.vue'
import sharedComposable from '@/composables/sharedComposable'
defineOptions({ layout: BlankLayout })
const { formatCurrency } = sharedComposable()

const props = defineProps([
  'gateways',
  'total',
  'invoice_data',
  'error',
  'minMax',
  'user',
  'logo',
  'minMaxMessage'
])

const activeGateway = ref(props.gateways[0]?.id || 0)
const alertContainer = ref(null)

const manualPayment = ref({
  image: null,
  comment: ''
})
const form = useForm({})
const submit = (gateway_id) => {
  const findGateway = props.gateways.find((gateway) => gateway.id === gateway_id)
  router.post(route('user.wallet-transactions.store'), {
    gateway_id: gateway_id,
    // plan_id: props.plan.id,
    manualPayment: findGateway.is_auto == 0 ? manualPayment.value : null
  })
}
const setActiveGateway = (id) => {
  activeGateway.value = id
}
const alertContainerHide = () => {
  alertContainer.value.style = 'display: none;'
}
</script>

<template>
  <Head :title="trans('Payment')" />

  <div class="payment-container flex h-screen items-center justify-center">
    <div class="payment-content">
      <div class="payment-header">
        <img v-lazy="$page.props?.primaryData?.deep_logo" alt="logo" class="mb-3" />
        <span class="status">
          {{ trans('Unpaid') }}
        </span>
      </div>

      <template v-if="error">
        <div ref="alertContainer" class="payment-error-alert">
          <div>
            <i class="fas fa-sad-tear"></i>
            <strong>{{ trans('!Opps ') }}</strong>
            {{ trans('Transaction failed if you make payment successfully please contact us.') }}
          </div>
          <button type="button" @click="alertContainerHide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width="28"
              height="28"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </template>

      <template v-if="minMax">
        <div ref="alertContainer" class="payment-error-alert">
          <div>
            <i class="fas fa-sad-tear"></i>
            <strong>{{ trans('!Opps ') }}</strong>
            {{ minMaxMessage }}
          </div>
          <button type="button" @click="alertContainerHide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width="28"
              height="28"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </template>

      <div class="gateways">
        <template v-for="gateway in gateways" :key="gateway.id">
          <button
            @click="setActiveGateway(gateway.id)"
            :class="{ 'payment-border': activeGateway == gateway.id }"
          >
            <div v-show="activeGateway == gateway.id">
              <svg
                class="active-gateway"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <img v-lazy="gateway.logo" />
          </button>
        </template>
      </div>
      <!-- gateways table -->
      <template v-for="gateway in gateways" :key="gateway.id">
        <div
          v-show="activeGateway === gateway.id"
          class="gateway-form"
          :id="'gateway-form' + gateway.id"
        >
          <form method="post" @submit.prevent="submit(gateway.id)" enctype="multipart/form-data">
            <table class="payment-table">
              <tr>
                <td>
                  {{ trans('Method Name: ') }}
                </td>
                <td class="text-center">
                  {{ gateway.name }}
                </td>
              </tr>
              <template v-if="gateway.currency != null">
                <tr>
                  <td>
                    {{ trans('Gateway Currency: ') }}
                  </td>
                  <td class="text-center">
                    {{ gateway.currency }}
                  </td>
                </tr>
              </template>
              <template v-if="gateway.charge != 0">
                <tr>
                  <td>
                    {{ trans('Gateway Charge: ') }}
                  </td>
                  <td class="text-center">
                    {{ formatCurrency(gateway.charge) }}
                  </td>
                </tr>
              </template>
              <tr>
                <td>
                  {{ trans('Payable Amount: ') }}
                </td>
                <td class="text-center">
                  {{ formatCurrency(total * gateway.multiply + gateway.charge) }}
                </td>
              </tr>
            </table>

            <template v-if="gateway.comment != null">
              <p class="payment-label">
                <b>{{ trans('Payment Instruction: ') }}</b>
              </p>
              <p class="payment-instruction">{{ gateway.comment }}</p>
            </template>
            <template v-if="gateway.phone_required == 1">
              <div>
                <label class="payment-label">
                  <b>{{ trans('Your phone number') }}</b>
                </label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Your phone number"
                  class="payment-input"
                  required
                  :value="user.phone"
                />
              </div>
            </template>
            <template v-if="gateway.is_auto == 0">
              <div class="payment-file-input">
                <label class="payment-label">
                  <b>{{ trans('Submit your payment proof') }}</b>
                </label>
                <input
                  @input="
                    (e) => {
                      manualPayment.image = e.target.files[0]
                    }
                  "
                  type="file"
                  name="image"
                  required
                  accept="image/*"
                />
              </div>
              <div>
                <label class="payment-label">
                  <b>{{ trans('Comment') }}</b>
                </label>
                <textarea
                  class="payment-textarea"
                  v-model="manualPayment.comment"
                  required
                  name="comment"
                  placeholder="comment"
                  maxlength="500"
                ></textarea>
              </div>
            </template>

            <button :disabled="form.processing" type="submit" class="payment-pay-btn">
              {{ trans('Pay Now') }}
            </button>
          </form>
        </div>
      </template>

      <br />

      <div class="payment-invoice">
        <div class="payment-border">
          <b>{{ trans('Invoiced To') }}</b>
          <br />
          {{ user.name }}<br />
          {{ user.address }}
        </div>
        <div class="payment-border">
          <b>{{ trans('Pay To') }}</b>
          <br />
          {{ invoice_data.company_name }} <br />
          {{ invoice_data.address }}, {{ invoice_data.city }} <br />
          {{ invoice_data.post_code }},
          {{ invoice_data.country }}
        </div>
      </div>

      <div class="text-center">
        <Link :href="route('user.wallet-transactions.index')" class="payment-cancel-btn">
          {{ trans('Cancel Payment') }}
        </Link>
      </div>
    </div>
  </div>
</template>
