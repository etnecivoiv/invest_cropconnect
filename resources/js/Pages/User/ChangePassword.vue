<script setup>
import InputFieldError from '@/components/InputFieldError.vue'
import { Head, useForm } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
defineOptions({ layout: UserLayout })

const form = useForm({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const submit = () => {
  form.put(route('user.update-password'), {
    onSuccess: () => {
      notify.success(trans('Password has been updated successfully'))
    }
  })
}
</script>

<template>
  <Head :title="trans('Change Password')" />
  <main class="container flex-grow p-4 sm:p-6">
    <div class="space-y-6">
      <div class="card mx-auto w-[600px] p-3">
        <div class="card-body">
          <h4 class="mb-4">{{ trans('Change Password') }}</h4>
          <form @submit.prevent="submit">
            <div class="row">
              <div class="col-12">
                <label for=""> {{ trans('Old Password') }} *</label>
                <input type="password" class="input" v-model="form.current_password" />
                <InputFieldError :message="form.errors.current_password" />
              </div>
              <div class="col-12">
                <label for=""> {{ trans('New Password') }} *</label>
                <input type="password" class="input" v-model="form.new_password" />
                <InputFieldError :message="form.errors.new_password" />
              </div>
              <div class="col-12">
                <label for="">{{ trans('Confirm Password') }} *</label>
                <input type="password" class="input" v-model="form.new_password_confirmation" />
                <InputFieldError :message="form.errors.new_password_confirmation" />
              </div>
            </div>

            <div class="mt-5">
              <button type="submit" class="btn btn-primary">
                {{ trans('Change password') }}
              </button>
            </div>
          </form>

          <div class="mt-4">
            <Link href="/user/account-settings">{{ trans('Back to Account Settings') }}</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
