<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import ckeEditor from '@/Plugins/Admin/ckeEditor'
import notify from '@/Plugins/Admin/notify'
import { ref } from 'vue'

defineOptions({ layout: AdminLayout })
const { cke, ClassicEditor } = ckeEditor()
const props = defineProps(['segments', 'buttons'])

const inputs = ref([
  {
    type: '',
    label: ''
  }
])
const form = useForm({
  name: '',
  currency_name: '',
  delay: '',
  min_limit: '',
  max_limit: '',
  fixed_charge: '',
  charge_type: '',
  percent_charge: '',
  image: '',
  instruction: '',
  status: 1,
  inputs: []
})
const newFields = () => {
  if (inputs.value.length >= 10) {
    notify.danger('10 Max, Limit Reached')
    return
  }
  const fields = {
    type: '',
    label: ''
  }
  inputs.value.push(fields)
}

const deleteFields = (targetIndex) => {
  if (inputs.value.length <= 1) {
    notify.danger('1 Min, Limit Reached')
    return
  }
  inputs.value = inputs.value.filter((_, index) => index !== targetIndex)
}
const createMethod = () => {
  form.inputs = inputs.value
  form.post(route('admin.payout-methods.store'), {
    onSuccess: () => {
      notify.success('Method Created successfully')
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="New Payout Method" :segments="segments" :buttons="buttons" />
    <div class="card mx-auto max-w-3xl">
      <form
        class="card-body space-y-3"
        method="post"
        @submit.prevent="createMethod"
        enctype="multipart/form-data"
      >
        <div>
          <label>{{ trans('Method Name') }}</label>
          <input
            type="text"
            class="input"
            :placeholder="trans('Method Name')"
            required
            name="name"
            v-model="form.name"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="currency_id">{{ trans('Enter Currency Name') }}</label>
            <input
              type="text"
              class="input"
              name="currency"
              required
              v-model="form.currency_name"
            />
          </div>

          <div>
            <label>{{ trans('Delay (Processing Days)') }}</label>
            <input
              type="number"
              class="input"
              name="delay"
              :placeholder="trans('Delay')"
              v-model="form.delay"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label>{{ trans('Minimum Amount') }}</label>
            <input
              v-model="form.min_limit"
              type="number"
              class="input"
              :placeholder="trans('Minimum Amount')"
              required
              name="min_limit"
            />
          </div>

          <div>
            <label>{{ trans('Maximum Amount') }}</label>
            <input
              v-model="form.max_limit"
              type="number"
              class="input"
              :placeholder="trans('Maximum Amount')"
              required
              name="max_limit"
            />
          </div>
        </div>
        <!--- Transaction Charge Fixed --->

        <div>
          <label>{{ trans('Charge Type') }}</label>
          <select class="select" v-model="form.charge_type">
            <option value="" disabled>
              {{ trans('Select charge type') }}
            </option>
            <option value="fixed">{{ trans('Fixed') }}</option>
            <option value="percentage">{{ trans('Percentage') }}</option>
          </select>
        </div>
        <div v-if="form.charge_type === 'fixed'">
          <label>{{ trans('Enter Amount For Fixed Charge') }}</label>
          <input
            v-model="form.fixed_charge"
            type="number"
            class="input"
            name="fixed_charge"
            placeholder="Fixed Amount"
            step="any"
          />
        </div>
        <div v-if="form.charge_type === 'percentage'">
          <label>{{ trans('Enter Percentage Amount') }}</label>
          <input
            step="any"
            v-model="form.percent_charge"
            type="number"
            class="input"
            name="percent_charge"
          />
        </div>

        <div>
          <label>{{ trans('Gateway Image') }}</label>
          <input
            type="file"
            class="input"
            required
            name="image"
            @input="(e) => (form.image = e.target.files[0])"
          />
        </div>

        <div>
          <label>{{ trans('Instruction') }}</label>

          <cke tag-name="textarea" :editor="ClassicEditor" v-model="form.instruction" />
        </div>

        <!-- dynamic fields -->
        <div class="space-y-3">
          <div class="grid grid-cols-12">
            <div class="col-span-5">
              <label>{{ trans('Label') }}</label>
            </div>
            <div class="col-span-6">
              <label>{{ trans('Input Type') }}</label>
            </div>
            <button type="button" @click="newFields" class="btn btn-primary py-3">
              <i class="fas fa-plus-circle"></i>
            </button>
            <div class="col-span-1"></div>
          </div>
          <template v-for="(input, i) in inputs" :key="i">
            <div class="grid grid-cols-12 gap-3">
              <div class="col-span-5">
                <input
                  type="text"
                  data-key="0"
                  class="input"
                  placeholder="Label here"
                  v-model="input.label"
                />
              </div>
              <div class="col-span-6">
                <select v-model="input.type" class="select">
                  <option value="text">
                    {{ trans('Text') }}
                  </option>
                  <option value="number">
                    {{ trans('Number') }}
                  </option>
                  <option value="textarea">
                    {{ trans('Textarea') }}
                  </option>
                  <option value="email">
                    {{ trans('Email') }}
                  </option>
                </select>
              </div>
              <div class="col-span-1">
                <button
                  type="button"
                  @click="deleteFields(i)"
                  class="btn btn-danger py-3"
                  title="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </template>
        </div>
        <div>
          <label>{{ trans('Status') }}</label>
          <select v-model="form.status" name="status" class="select">
            <option value="1">
              {{ trans('Active') }}
            </option>
            <option value="0">
              {{ trans('Inactive') }}
            </option>
          </select>
        </div>
        <SpinnerBtn
          classes="btn btn-primary"
          :processing="form.processing"
          :btn-text="trans('Save')"
        />
      </form>
    </div>
  </main>
</template>
