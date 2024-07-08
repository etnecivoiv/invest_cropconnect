<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
// import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
import InputFieldError from '@/components/InputFieldError.vue'
import ImageInput from '@/components/ImageInput.vue'
import UserLayout from '@/Layouts/User.vue'
import notify from '@/Plugins/Admin/notify'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
const { authUser } = sharedComposable()
defineOptions({ layout: UserLayout })

const props = defineProps(['user'])

const form = useForm({
  name: props.user.name,
  email: props.user.email,
  phone: props.user.phone,
  avatar: props.user.avatar,
  current_password: '',
  _method: 'PUT'
})

const submit = () => {
  let uri = route('user.account-settings.update')
  form.post(uri, {
    onFinished: () => {
      form.current_password = ''
    }
  })
}
</script>

<template>
  <Head :title="trans('Account Settings')" />
  <main class="container flex-grow p-4 sm:p-6">
    <div class="space-y-6">
      <PageHeader />
      <div class="flex justify-center">
        <div class="card w-[600px] p-5">
          <h4 class="mb-4">{{ trans('Edit Profile') }}</h4>
          <form @submit.prevent="submit" method="post">
            <div class="mb-4">
              <ImageInput v-model="form.avatar" label="Profile Image" />
            </div>
            <div class="mb-4">
              <label>{{ trans('Full Name') }}</label>
              <input class="input" type="text" v-model="form.name" placeholder="Zubayer" />
              <InputFieldError :message="form.errors.name" />
            </div>
            <div class="mb-4" v-if="authUser.provider_id == null">
              <label>{{ trans('Email') }}</label>
              <input
                class="input"
                type="email"
                v-model="form.email"
                placeholder="zubayerhasan@gmal.com"
              />
              <InputFieldError :message="form.errors.email" />
            </div>
            <div class="mb-4">
              <label>{{ trans('Phone Number') }}</label>
              <input class="input" type="tel" v-model="form.phone" placeholder="+810 989 989 989" />
              <InputFieldError :message="form.errors.phone" />
            </div>
            <div class="mb-4" v-if="authUser.provider_id === null">
              <label>{{ trans('Current Password') }}</label>
              <input
                class="input"
                type="password"
                v-model="form.current_password"
                placeholder="enter your current password"
              />

              <InputFieldError :message="form.errors.current_password" />

              <div
                class="info-text d-sm-flex align-items-center justify-content-between mt-5"
                v-if="authUser.provider_id === null"
              >
                <p class="">
                  {{ trans('Want to change the password?') }}
                  <Link :href="route('user.change-password')" class="font-medium text-blue-800">
                    {{ trans('Click here') }}</Link
                  >
                </p>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              {{ trans('Update Information') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
