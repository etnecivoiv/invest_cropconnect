<script setup>
import InputFieldError from '@/components/InputFieldError.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { Head, useForm } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import { onMounted } from 'vue'
defineOptions({ layout: DefaultLayout })

const form = useForm({
  password: ''
})
onMounted(() => window.scrollTo(0, 300))
const submit = () => {
  form.post(route('password.confirm'), {
    onFinish: () => form.reset()
  })
}
</script>

<template>
  <Head title="Confirm Password" />
  <Breadcrumbs PageName="Confirm Password" />
  <div class="container my-20">
    <div class="grid grid-cols-12 gap-[30px]">
      <div class="col-span-12 lg:col-span-6 xl:col-span-5">
        <div class="mini-title">{{ trans('Confirm Password') }}</div>
        <h4 class="column-title">
          {{ trans('Confirm') }}
          <span class="shape-bg"> {{ trans('Password') }}</span>
        </h4>
        <div>
          {{
            trans(
              'This is a secure area of the application. Please confirm your password before continuing.'
            )
          }}
        </div>
        <ul class="list-item space-y-6 pt-8">
          <li class="flex">
            <div class="mr-6 flex-none">
              <div class="">
                <img src="/assets/images/svg/mail.svg" alt="" class="" />
              </div>
            </div>
            <div class="flex-1">
              <h4 class="mb-1 text-lg lg:text-xl">{{ trans('Email-Us') }} :</h4>
              <div>{{ $page.props.primaryData?.contact_email }}</div>
            </div>
          </li>
          <li class="flex">
            <div class="mr-6 flex-none">
              <div class="">
                <img src="/assets/images/svg/call.svg" alt="" class="" />
              </div>
            </div>
            <div class="flex-1">
              <h4 class="mb-1 text-lg lg:text-xl">{{ trans('Call Us') }}:</h4>
              <div>{{ $page.props.primaryData?.contact_phone }}</div>
            </div>
          </li>
          <li class="flex">
            <div class="mr-6 flex-none">
              <div class="">
                <img src="/assets/images/svg/map.svg" alt="" class="" />
              </div>
            </div>
            <div class="flex-1">
              <h4 class="mb-1 text-lg lg:text-xl">{{ trans('Office') }} :</h4>
              <div>{{ $page.props.primaryData?.address }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-span-12 lg:col-span-6 xl:col-span-7">
        <form
          @submit.prevent="submit"
          class="shadow-box7 mt-10 space-y-4 rounded-md border border-gray-100 bg-white p-8"
        >
          <div>
            <label>{{ trans('Password') }} *</label>
            <input
              type="password"
              required
              v-model="form.password"
              class="from-control"
              placeholder="Enter Password"
            />
            <InputFieldError :message="form.errors.password" />
          </div>
          <button type="submit" :disabled="form.processing" class="btn btn-primary mt-8 w-full">
            {{ trans('Confirm') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
