<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
import { ref } from 'vue'

defineOptions({ layout: UserLayout })

const { kyc_methods } = defineProps(['kyc_methods'])

const selectedMethod = ref(kyc_methods[0] ? kyc_methods[0] : {})

const setSelectedMethod = (method) => {
  selectedMethod.value = method
  form.method = selectedMethod.value?.id
  form.fields = selectedMethod.value?.fields ?? []
}

const flattenObject = (obj, parentKey) => {
  let result = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const _key = parentKey ? key : key

    if (typeof value === 'object' && !(value instanceof File)) {
      result = { ...result, ...flattenObject(value, _key) }
    } else {
      result[_key] = value
    }
  })

  return result
}

const form = useForm({
  method: selectedMethod.value?.id,
  fields: selectedMethod.value?.fields ?? [],
  note: ''
})

const submit = () => {
  form.post(route('user.kyc.store'), {
    onSuccess: () => {
      notify.success(trans('KYC Document Submitted Successfully'))
    },
    onError(e) {
      Object.values(e).forEach((item) => notify.danger(item))
    }
  })
}
</script>

<template>
  <Head title="KYC verification | User Panel" />

  <main class="container flex-grow p-4 sm:p-6">
    <div class="flex items-center justify-between">
      <h2 class="main-title">{{ trans('KYC verification') }}</h2>
      <Link :href="route('user.kyc.index')" class="btn btn-primary">
        {{ trans('View my requests') }}
      </Link>
    </div>

    <div class="card mx-auto mt-12 xl:w-8/12">
      <div v-if="kyc_methods.length" class="card-body">
        <div class="flex gap-2">
          <button
            v-for="(method, index) in kyc_methods"
            :key="index"
            @click="setSelectedMethod(method)"
            type="button"
            :class="[selectedMethod.id == method.id ? 'btn-primary' : 'border']"
            class="btn"
          >
            {{ method.title }}
          </button>
        </div>

        <form class="p-3" @submit.prevent="submit()">
          <template v-for="(field, index) in form.fields" :key="field.id">
            <div v-if="field.type == 'textarea'" class="dash-input-wrapper mb-2">
              <label> {{ field.label }} </label>
              <textarea v-model="field.value" class="textarea"></textarea>
            </div>

            <div v-else-if="field.type == 'file'" class="mb-2">
              <label> {{ field.label }} </label>
              <input type="file" @change="(e) => (field.value = e.target.files[0])" class="input" />
            </div>

            <div v-else class="dash-input-wrapper mb-2">
              <label :for="`fields_${index}`">{{ field.label }}</label>
              <input
                :type="field.type"
                v-model="field.value"
                :id="`fields_${index}`"
                class="input"
              />
            </div>
          </template>

          <div class="mb-2">
            <label>{{ trans('Note') }}</label>
            <textarea v-model="form.note" rows="4" class="textarea"></textarea>
          </div>

          <SpinnerBtn :processing="form.processing" :btn-text="trans('Submit')" />
        </form>
      </div>
      <div v-else class="py-6 text-center">
        {{ trans('No remaining items to submit') }}
      </div>
    </div>
  </main>
</template>