<script setup>
import { useForm } from '@inertiajs/vue3'
import InputFieldError from '@/components/InputFieldError.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { onMounted } from 'vue'
import DefaultLayout from '@/Layouts/Default.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'

defineProps(['googleClient', 'facebookClient'])
defineOptions({ layout: DefaultLayout })

onMounted(() => window.scrollTo(0, 300))

const form = useForm({
  email: '',
  password: '',
  remember: 0
})

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password')
  })
}
</script>

<template>
  <Breadcrumbs PageName="Login" />
  <div class="container my-20" ref="formContainer">
    <div class="grid grid-cols-12 gap-[30px]">
      <div class="col-span-12 lg:col-span-6 xl:col-span-5">
        <div class="mini-title">{{ trans('Login') }}</div>
        <h4 class="column-title">
          {{ trans('Hello') }},
          <span class="shape-bg"> {{ trans('Welcome Back') }}</span>
        </h4>
        <div>
          {{ trans("Don't have an account yet?") }}
          <Link class="text-gray-950" href="/register">{{ trans('Sign up') }}</Link>
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
          class="shadow-box7 mt-10 w-full space-y-4 rounded-md border border-gray-100 bg-white p-8"
        >
          <div>
            <label>{{ trans('Email') }} *</label>
            <input
              type="email"
              required
              v-model="form.email"
              class="from-control"
              placeholder="Email"
            />
            <InputFieldError :message="form.errors.email" />
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label>{{ trans('Password') }} *</label>
              <Link :href="route('password.request')" class="text-sm">{{
                trans('Forgot Password?')
              }}</Link>
            </div>
            <input
              type="password"
              required
              v-model="form.password"
              class="from-control"
              placeholder="Password"
            />
            <InputFieldError :message="form.errors.password" />
          </div>

          <div class="flex items-center justify-between">
            <SpinnerBtn
              :processing="form.processing"
              :btn-text="trans('Login')"
              classes="btn btn-primary flex gap-1"
            />

            <Link :href="route('register')" class="text-primary">{{
              trans('Register an Account?')
            }}</Link>
          </div>

          <div class="grid grid-cols-2 gap-1 pt-5">
            <a
              v-if="googleClient"
              href="/auth/google"
              class="flex items-center justify-center rounded-md border border-gray-100 p-2 shadow hover:bg-gray-100"
            >
              <img v-lazy="'/assets/images/icon/google.png'" alt="image" />
              <span class="ps-2">{{ trans('Signup with Google') }}</span>
            </a>

            <a
              href="/auth/facebook"
              v-if="facebookClient"
              class="flex items-center justify-center rounded-md border border-gray-100 p-2 shadow hover:bg-gray-100"
            >
              <img v-lazy="'/assets/images/icon/facebook.png'" alt="image" />
              <span class="ps-2">{{ trans('Signup with Facebook') }}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
