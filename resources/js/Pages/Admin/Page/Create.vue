<template>
  <main class="container p-4 sm:p-6">
    <PageHeader title="Create Page" :segments="segments" :buttons="buttons" />

    <form method="post" @submit.prevent="createPage">
      <div class="card">
        <div class="card-body space-y-5">
          <div class="mb-2">
            <label class="label label-required mb-1">{{ trans('Page Title') }}</label>
            <input type="text" name="title" v-model="form.title" required class="input" />
          </div>
          <div class="mb-2">
            <label class="label label-required mb-1">{{ trans('Page Description') }}</label>

            <cke tag-name="textarea" :editor="ClassicEditor" v-model="form.description" />
          </div>

          <div class="mb-2">
            <label class="label label-required mb-1">{{ trans('SEO Meta Title') }}</label>
            <div class="col-lg-12">
              <input
                v-model="form.meta_title"
                type="text"
                name="meta_title"
                required
                class="input"
              />
            </div>
          </div>
          <div class="mb-2 mt-2">
            <label class="label label-required mb-1">{{ trans('SEO Meta Description') }}</label>
            <div class="col-lg-12">
              <textarea
                v-model="form.meta_description"
                name="meta_description"
                required
                class="textarea"
              ></textarea>
            </div>
          </div>
          <div class="mb-2 mt-3">
            <label class="label label-required mb-1">{{ trans('SEO Meta Tags') }}</label>
            <div class="col-lg-12">
              <input v-model="form.meta_tags" type="text" name="meta_tags" required class="input" />
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <input v-model="form.status" class="checkbox" type="checkbox" name="basic-checkbox" />
            <label for="checked" class="label text-lg font-semibold">{{
              trans('Make it publish?')
            }}</label>
          </div>
          <SpinnerBtn :processing="form.processing" :btnText="trans('Create')" />
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import ckeEditor from '@/Plugins/Admin/ckeEditor'
const { cke, ClassicEditor } = ckeEditor()

defineOptions({ layout: AdminLayout })

const props = defineProps(['buttons', 'segments'])
const form = useForm({
  title: '',
  description: '',
  meta_title: '',
  meta_description: '',
  meta_tags: '',
  status: false
})
const createPage = () => {
  form.post(route('admin.page.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Page has been added successfully'))
    }
  })
}
</script>
