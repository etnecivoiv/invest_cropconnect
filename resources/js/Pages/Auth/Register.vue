<script setup>
import { useForm } from "@inertiajs/vue3"
import InputFieldError from "@/components/InputFieldError.vue"
import Breadcrumbs from "@/components/Breadcrumbs.vue"
import { computed, onMounted } from "vue"
import DefaultLayout from "@/Layouts/Default.vue"
import SpinnerBtn from "@/components/Admin/SpinnerBtn.vue"


defineProps(['googleClient','facebookClient'])
defineOptions({ layout: DefaultLayout })
onMounted(() => window.scrollTo(0, 300))

const form = useForm({
  plan_id: null,
  role: "user",
  name: "",
  email: "",
  password: "",
  terms: false,
})

const submit = () => {
  form.post(route("register"), {
    onFinish: () => form.reset("password"),
  })
}
</script>

<template>
  <Seo :metaData="seo" />
  <Breadcrumbs PageName="Register" />
  <div class="container my-20">
    <div class="grid grid-cols-12 gap-[30px]">
      <div class="col-span-12 lg:col-span-6 xl:col-span-5">
        <div class="mini-title">{{ trans("Register") }}</div>
        <h4 class="column-title">
          {{ trans("Register") }}
          <span class="shape-bg"> {{ trans("Now") }}</span>
        </h4>
        <div>
          {{ trans("Already have an account?") }}
          <Link class="text-gray-950" href="/login">{{ trans("Sign In") }}</Link>
        </div>
        <ul class="pt-8 space-y-6 list-item">
          <li class="flex">
            <div class="flex-none mr-6">
              <div class="">
                <img src="/assets/images/svg/mail.svg" alt="" class="" />
              </div>
            </div>
            <div class="flex-1">
              <h4 class="mb-1 text-lg lg:text-xl">{{ trans("Email-Us") }} :</h4>
              <div>{{ $page.props.primaryData?.contact_email }}</div>
            </div>
          </li>
          <li class="flex">
            <div class="flex-none mr-6">
              <div class="">
                <img src="/assets/images/svg/call.svg" alt="" class="" />
              </div>
            </div>
            <div class="flex-1">
              <h4 class="mb-1 text-lg lg:text-xl">{{ trans("Call Us") }}:</h4>
              <div>{{ $page.props.primaryData?.contact_phone }}</div>
            </div>
          </li>
          <li class="flex">
            <div class="flex-none mr-6">
              <div class="">
                <img src="/assets/images/svg/map.svg" alt="" class="" />
              </div>
            </div>
            <div class="flex-1">
              <h4 class="mb-1 text-lg lg:text-xl">{{ trans("Office") }} :</h4>
              <div>{{ $page.props.primaryData?.address }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-span-12 lg:col-span-6 xl:col-span-7">
        <form
          @submit.prevent="submit"
          class="p-8 mt-10 space-y-4 bg-white border border-gray-100 rounded-md shadow-box7"
        >
          <div>
            <label>{{ trans("Full Name") }} </label>
            <input
              type="text"
              required
              v-model="form.name"
              class="from-control"
              placeholder="Name"
            />
            <InputFieldError :message="form.errors.name" />
          </div>
          <div>
            <label>{{ trans("Email") }} *</label>
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
              <label>{{ trans("Password") }} *</label>
              <Link :href="route('password.request')" class="text-sm">{{
                trans("Forgot Password?")
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
              :btn-text="trans('Register')"
              classes="btn btn-primary flex gap-1"
            />

            <Link :href="route('login')" class="text-primary">{{
              trans("Already have Account?")
            }}</Link>
          </div>

          <div class="grid grid-cols-2 gap-1 pt-5">
            <a
              v-if="googleClient"
              href="/auth/google"
              class="flex items-center justify-center p-2 border border-gray-100 rounded-md shadow hover:bg-gray-100"
            >
              <img v-lazy="'/assets/images/icon/google.png'" alt="image" />
              <span class="ps-2">{{ trans("Signup with Google") }}</span>
            </a>

            <a
              href="/auth/facebook"
              v-if="facebookClient"
              class="flex items-center justify-center p-2 border border-gray-100 rounded-md shadow hover:bg-gray-100"
            >
              <img v-lazy="'/assets/images/icon/facebook.png'" alt="image" />
              <span class="ps-2">{{ trans("Signup with Facebook") }}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
