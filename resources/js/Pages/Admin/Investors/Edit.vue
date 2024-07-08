<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import trans from '@/composables/transComposable'
import { useForm } from '@inertiajs/vue3'
defineOptions({ layout: AdminLayout })
const props = defineProps(['buttons', 'segments', 'info', 'socials'])

const form = useForm({
  name: props.info.title ?? '',
  position: props.info.slug ?? '',
  profile_picture: '',
  description: props.info?.description?.value ?? '',
  status: props.info.status ? true : false,
  socials: props.socials ?? {
    facebook: null,
    twitter: null,
    linkedin: null,
    instagram: null
  },
  _method: 'patch'
})

const update = () => {
  form.post(route('admin.investors.update', props.info.id), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success(trans('Investor has been updated successfully'))
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Edit Investor Investor" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <form method="post" @submit.prevent="update" enctype="multipart/form-data">
        <div class="grid grid-cols-12">
          <div class="col-span-5">
            <strong>{{ trans('Edit investor member') }}</strong>
            <p>
              {{ trans('Edit your investor details and necessary information from here') }}
            </p>
          </div>
          <div class="col-span-7">
            <!-- Alerts -->
            <div class="card">
              <div class="card-body">
                <div class="mb-2">
                  <label>{{ trans('Name') }}</label>
                  <input type="text" v-model="form.name" required class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Position') }}</label>
                  <input type="text" v-model="form.position" required class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Profile Picture') }}</label>
                  <input
                    @input="(e) => (form.profile_picture = e.target.files[0])"
                    type="file"
                    accept="image/*"
                    class="input"
                  />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Profile Description') }}</label>
                  <textarea
                    class="textarea h-200"
                    maxlength="1000"
                    required
                    v-model="form.description"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label>{{ trans('Facebook profile link') }}</label>
                  <input type="url" v-model="form.socials.facebook" class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Twitter profile link') }}</label>
                  <input type="url" v-model="form.socials.twitter" class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Linkedin profile link') }}</label>
                  <input type="url" v-model="form.socials.linkedin" class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Instagram profile link') }}</label>
                  <input type="url" v-model="form.socials.instagram" class="input" />
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

                <div class="mt-2">
                  <SpinnerBtn :btn-text="trans('Save Changes')" :processing="form.processing" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
