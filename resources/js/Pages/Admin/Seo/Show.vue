<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader />
    <div class="space-y-6">
      <form @submit.prevent="update" enctype="multipart/form-data">
        <div class="grid grid-cols-12">
          <div class="lg:col-span-5">
            <strong>{{ trans('Edit page seo settings') }}</strong>
            <p>{{ trans('Edit page seo and necessary information from here') }}</p>
          </div>
          <div class="lg:col-span-7">
            <!-- Alerts -->
            <div class="card">
              <div class="card-header">
                <h3 class="mb-0">{{ trans('Edit Settings') }}</h3>
              </div>
              <div class="card-body">
                <div class="mb-2">
                  <label>{{ trans('Meta Title') }}</label>
                  <input type="text" v-model="form.site_name" required="" class="input" />
                </div>
                <div class="mb-2">
                  <label>{{ trans('Meta Description') }}</label>
                  <textarea
                    v-model="form.matadescription"
                    required=""
                    class="summernote input h-200"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label>{{ trans('Meta Tags') }}</label>
                  <input type="text" v-model="form.matatag" required="" class="input" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Twitter Site Title') }}</label>
                  <input type="text" v-model="form.twitter_site_title" required="" class="input" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Meta Image') }}</label>
                  <input
                    @input="(e) => (form.preview = e.target.files[0])"
                    type="file"
                    accept="image/*"
                    class="input"
                  />
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

<script>
import AdminLayout from '@/Layouts/Admin.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import notify from '@/Plugins/Admin/notify'
export default {
  layout: AdminLayout
}
</script>

<script setup>
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Head, useForm, router } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import { createToast } from 'mosha-vue-toastify'
const props = defineProps(['id', 'seo'])

const form = useForm({
  _method: 'put',
  site_name: props.seo?.site_name,
  matatag: props.seo?.matatag,
  matadescription: props.seo?.matadescription,
  twitter_site_title: props.seo?.twitter_site_title,
  preview: null
})

const update = () => {
  form.post(route('admin.seo.update', props.id))
}
</script>
