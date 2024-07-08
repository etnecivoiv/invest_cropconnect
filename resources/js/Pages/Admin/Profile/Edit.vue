<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Edit Profile" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <!-- User Profile Start  -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <!-- Left Section Start  -->
        <section class="col-span-1 flex h-min w-full flex-col gap-6 lg:sticky lg:top-20">
          <!-- User Avatar & Status  -->
          <div class="card">
            <div class="card-body flex flex-col items-center">
              <div class="relative my-2 h-24 w-24 rounded-full">
                <form>
                  <img
                    v-lazy="
                      user.avatar == null
                        ? `https://ui-avatars.com/api/?name=${user.name}`
                        : `${user.avatar}`
                    "
                    alt="avatar-img"
                    id="user-image"
                    class="h-full w-full rounded-full"
                  />
                  <label
                    for="upload-avatar"
                    class="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-50 p-2 dark:bg-slate-900"
                  >
                    <span class="text-slate-600 dark:text-slate-300">
                      <i class="w-full" data-feather="camera"></i>
                    </span>

                    <input
                      @input="(e) => (user.avatar = e.target.files[0])"
                      type="file"
                      class="hidden"
                      accept="image/jpeg, image/png, image/jpg"
                      id="upload-avatar"
                    />
                  </label>
                </form>
              </div>
              <h2 class="text-[16px] font-medium text-slate-700 dark:text-slate-200">
                {{ user.name }}
              </h2>

              <div class="badge badge-soft-success my-3 inline-block px-4">
                {{ trans('Active') }}
              </div>
            </div>
          </div>
        </section>
        <!-- Left Section End  -->
        <!-- Right Section Start  -->
        <section class="col-span-1 flex w-full flex-1 flex-col gap-6 lg:col-span-3 lg:w-auto">
          <!-- Personal Details  -->
          <div class="card">
            <div class="card-body">
              <h2 class="text-[16px] font-semibold text-slate-700 dark:text-slate-300">
                {{ trans('Personal Details') }}
              </h2>
              <p class="mb-4 text-sm font-normal text-slate-400">
                {{ trans('Manage your personal information') }}
              </p>
              <form
                @submit.prevent="updateGeneral"
                enctype="multipart/form-data"
                class="flex flex-col gap-5"
              >
                <!-- Name  -->
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label class="label" for="first-name">
                    <span class="my-1 block">{{ trans('Name') }}</span>
                    <input type="text" class="input" v-model="user.name" id="first-name" />
                  </label>
                  <label class="label" for="email">
                    <span class="my-1 block">{{ trans('Email') }}</span>
                    <input type="email" class="input" v-model="user.email" id="email" />
                  </label>
                </div>
                <!-- Phone & Email  -->
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label class="label" for="phone">
                    <span class="my-1 block">{{ trans('Phone Number') }}</span>
                    <input type="tell" class="input" v-model="user.phone" id="phone" />
                  </label>
                  <label class="label" for="street-address">
                    <span class="my-1 block">{{ trans('Address (will used for invoice)') }}</span>
                    <input type="text" class="input" v-model="user.address" id="street-address" />
                  </label>
                </div>
                <!-- Button  -->
                <div class="flex items-center justify-end gap-4">
                  <button type="submit" class="btn btn-primary">
                    {{ trans('Update Profile') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <!-- Change Password  -->
          <div class="card">
            <div class="card-body">
              <h2 class="text-[16px] font-semibold text-slate-700 dark:text-slate-300">
                Change Password
              </h2>
              <p class="mb-4 text-sm font-normal text-slate-400">
                Protect your account with a strong and secure password
              </p>
              <form @submit.prevent="updatePassword" class="flex flex-col gap-5">
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label class="label" for="new-password">
                    <span class="my-1 block">{{ trans('Old Password') }}</span>
                    <input
                      type="password"
                      class="input"
                      v-model="form.oldpassword"
                      id="new-password"
                    />
                  </label>
                  <label class="label" for="new-password">
                    <span class="my-1 block">{{ trans('New Password') }}</span>
                    <input
                      type="password"
                      class="input"
                      v-model="form.password"
                      id="new-password"
                    />
                  </label>
                  <label class="label" for="confirm-password">
                    <span class="my-1 block">{{ trans('Confirm Password') }}</span>
                    <input
                      type="password"
                      class="input"
                      v-model="form.password_confirmation"
                      id="confirm-password"
                    />
                  </label>
                </div>
                <!-- Button  -->
                <div class="flex items-center justify-end gap-4">
                  <button type="submit" class="btn btn-primary">
                    {{ trans('Update Password') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <!-- Right Section End -->
      </div>
      <!-- Social Link Modal Box -->
      <div class="modal" id="social-link">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="flex items-center justify-between">
                <h6>Social Media</h6>
                <button
                  type="button"
                  class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                  data-dismiss="modal"
                >
                  <i data-feather="x" width="1.5rem" height="1.5rem"></i>
                </button>
              </div>
            </div>
            <div class="modal-body">
              <form method="post" class="-mt-1.5 flex w-full flex-col space-y-3">
                <div>
                  <label class="label" for="facebook"> Facebook </label>
                  <input type="text" class="input" value="" id="facebook" name="facebook" />
                </div>

                <div>
                  <label class="label" for="instagram"> Instragram </label>
                  <input
                    type="text"
                    class="input"
                    value="https://www.instagram.com/example"
                    name="instagram"
                    id="instagram"
                  />
                </div>

                <div>
                  <label class="label" for="twitter"> Twitter </label>
                  <input
                    type="text"
                    class="input"
                    value="https://twitter.com/example"
                    id="twitter"
                    name="twitter"
                  />
                </div>

                <div>
                  <label class="label" for="linkedin"> LinkedIn </label>
                  <input
                    type="text"
                    class="input"
                    value="https://linkedin.com/example"
                    id="linkedin"
                    name="linkedin"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <div class="flex items-center justify-end gap-4">
                <button type="cancel" class="btn btn-outline-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- User Profile End  -->
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, useForm, router } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import { createToast } from 'mosha-vue-toastify'
defineOptions({ layout: AdminLayout })

const props = defineProps(['user', 'buttons', 'segments'])
const form = useForm({
  oldpassword: null,
  password: '',
  password_confirmation: ''
})

const updatePassword = () => {
  form.put(route('admin.profile.update', 'password'), {
    onSuccess: () => {
      createToast(
        {
          title: 'Updated',
          description: 'Password Updated Successfully'
        },
        {
          transition: 'slide',
          position: 'top-right'
        }
      )
    }
  })
}
const updateGeneral = () => {
  if (!(props.user.avatar instanceof File)) {
    props.user.avatar = null
  }

  router.post(
    route('admin.profile.update', 'general'),
    {
      _method: 'put',
      user: props.user
    },
    {
      onSuccess: () => {
        createToast(
          {
            title: 'Updated',
            description: 'General Settings Updated Successfully'
          },
          {
            transition: 'slide',
            position: 'top-right'
          }
        )
      }
    }
  )
}
</script>
