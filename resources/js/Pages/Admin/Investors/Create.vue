<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import trans from '@/composables/transComposable'
defineOptions({ layout: AdminLayout })

const props = defineProps(['buttons', 'segments'])
const form = useForm({
  name: '',
  position: '',
  profile_picture: '',
  description: '',
  status: false,
  socials: {
    facebook: null,
    twitter: null,
    linkedin: null,
    instagram: null
  }
})
const createInvestor = () => {
  form.post(route('admin.investors.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Investor has been added successfully'))
    }
  })
}
</script>
<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Create Investor Investor" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <form method="post" @submit.prevent="createInvestor" enctype="multipart/form-data">
        <div class="grid grid-cols-12">
          <div class="col-span-5">
            <strong>{{ trans('Create a investor investor') }}</strong>
            <p>
              {{ trans('Add your investor investor details and necessary information from here') }}
            </p>
          </div>
          <div class="card-wrapper col-span-7">
            <div class="card">
              <div class="card-body">
                <div class="mb-2">
                  <label>{{ trans('Name') }}</label>
                  <input v-model="form.name" type="text" name="name" required class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Position') }}</label>
                  <input
                    v-model="form.position"
                    type="text"
                    name="position"
                    required
                    class="input"
                  />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Profile Picture') }}</label>
                  <input
                    @input="(e) => (form.profile_picture = e.target.files[0])"
                    type="file"
                    accept="image/*"
                    name="profile_picture"
                    required
                    class="input"
                  />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Profile Description') }}</label>
                  <textarea
                    v-model="form.description"
                    class="input h-200"
                    name="about"
                    maxlength="1000"
                    required
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label>{{ trans('Facebook profile link') }}</label>
                  <input
                    v-model="form.socials.facebook"
                    type="url"
                    name="socials[facebook]"
                    class="input"
                  />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Twitter profile link') }}</label>
                  <input
                    v-model="form.socials.twitter"
                    type="url"
                    name="socials[twitter]"
                    class="input"
                  />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Linkedin profile link') }}</label>
                  <input
                    v-model="form.socials.linkedin"
                    type="url"
                    name="socials[linkedin]"
                    class="input"
                  />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Instagram profile link') }}</label>
                  <input
                    v-model="form.socials.instagram"
                    type="url"
                    name="socials[instagram]"
                    class="input"
                  />
                </div>
                <div class="mb-2">
                  <label for="toggle-status" class="toggle toggle-sm">
                    <input
                      v-model="form.status"
                      class="toggle-input peer sr-only"
                      id="toggle-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Make it publish?') }}</span>
                  </label>
                </div>

                <div class="from-group row mt-3">
                  <div class="col-lg-12">
                    <SpinnerBtn :processing="form.processing" :btn-text="trans('Save Changes')" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
