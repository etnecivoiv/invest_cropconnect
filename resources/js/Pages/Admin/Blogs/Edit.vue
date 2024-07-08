<template>
  <main class="container p-4 sm:p-6">
    <PageHeader title="Edit a blog" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <div class="max-w-6xl mx-auto">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="infoUpdate">
              <div class="mb-2">
                <label class="label">{{ trans('Blog Title') }}</label>
                <input type="text" name="title" required v-model="editForm.title" class="input" />
              </div>

              <div class="mt-2 mb-2">
                <label class="label">{{ trans('Blog Image (Preview)') }}</label>
                <input
                  type="file"
                  @change="(e) => (editForm.preview = e.target.files[0])"
                  class="input"
                  name="preview"
                  accept="image/*"
                />
              </div>
              <div class="mt-3 mb-2">
                <label class="label">{{ trans('Short Description') }}</label>
                <textarea
                  name="short_description"
                  required
                  class="textarea"
                  v-model="editForm.short_description"
                  maxlength="500"
                ></textarea>
              </div>
              <div class="mt-3 mb-2">
                <label class="label">{{ trans('Main Description') }}</label>
                <div class="">
                  <cke
                    tag-name="textarea"
                    :editor="ClassicEditor"
                    v-model="editForm.main_description"
                  />
                </div>
              </div>
              <div class="mb-2 ma-top-3" >
                <label class="label">{{ trans('Select Language') }}</label>
                <select v-model="editForm.language" name="language" class="select">
                  <template v-for="(language, languagesKey) in languages" :key="language">
                    <option :value="languagesKey" :selected="languagesKey == info.lang">
                      {{ language }}
                    </option>
                  </template>
                </select>
              </div>
              <div class="mt-2 mb-2">
                <label class="label">{{ trans('Select Category') }}</label>
                <Multiselect
                  class="multiselect-dark"
                  v-model="editForm.categories"
                  label="title"
                  valueProp="id"
                  mode="tags"
                  :options="categories"
                  :searchable="true"
                  placeholder="Select Category"
                />
              </div>
              <div class="mt-2 mb-2">
                <label class="label">{{ trans('Select Tags') }}</label>
                <div class="">
                  <Multiselect
                    class="multiselect-dark"
                    v-model="editForm.tags"
                    label="title"
                    valueProp="id"
                    mode="tags"
                    :options="tags"
                    :searchable="true"
                    placeholder="Select Tags"
                  />
                </div>
              </div>
              <hr />
              <div class="mt-3 mb-2">
                <label class="label">{{ trans('SEO Meta Title') }}</label>
                <input
                  type="text"
                  name="meta_title"
                  required
                  v-model="editForm.meta_title"
                  class="input"
                />
              </div>
              <div class="mt-2 mb-2">
                <label class="label">{{ trans('SEO Meta Image') }}</label>
                <input
                  type="file"
                  @input="(e) => (editForm.meta_image = e.target.files[0])"
                  class="input"
                  name="meta_image"
                  accept="image/*"
                />
              </div>
              <div class="mt-2 mb-2">
                <label class="label">{{ trans('SEO Meta Description') }}</label>
                <textarea
                  name="meta_description"
                  required
                  class="textarea"
                  v-model="editForm.meta_description"
                ></textarea>
              </div>
              <div class="mt-2 mb-2">
                <label class="label">{{ trans('SEO Meta Tags') }}</label>
                <input
                  type="text"
                  name="meta_tags"
                  required
                  class="input"
                  v-model="editForm.meta_tags"
                />
              </div>
              <div class="mt-3 mb-2">
               

                <div>
                  <label for="toggle-status" class="toggle toggle-sm">
                    <input
                      v-model="editForm.status"
                      class="sr-only toggle-input peer"
                      id="toggle-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Make it publish?') }}</span>
                  </label>
                </div>
              </div>
              <div class="mt-3 mb-2">
                <div class="">
                  <SpinnerBtn
                    classes="btn btn-primary"
                    :processing="editForm.processing"
                    :btn-text="trans('Save Changes')"
                  />
                </div>
              </div>
              <ValidationErrors />
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm, router } from '@inertiajs/vue3'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Multiselect from '@vueform/multiselect'
import ValidationErrors from '@/components/Admin/ValidationErrors.vue'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ref } from 'vue'
const cke = CKEditor.component
ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      '|',
      'mediaEmbed',
      '|',
      'undo',
      'redo'
    ]
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  language: 'en'
}
defineOptions({ layout: AdminLayout })

const props = defineProps([
  'info',
  'tags',
  'categories',
  'cats',
  'seo',
  'languages',
  'buttons',
  'segments',
  'tagsArr'
])

const editForm = ref({
  title: props.info.title,
  short_description: props.info.short_description?.value,
  main_description: props.info.long_description?.value,
  categories: props.cats,
  tags: props.tagsArr,
  preview: '',
  meta_title: props.seo?.title,
  meta_description: props.seo?.description,
  meta_tags: props.seo?.tags,
  language: props.info?.lang,
  featured: props.info?.featured,
  status: props.info?.status
})

const infoUpdate = () => {
  router.post(
    route('admin.blog-posts.update', props.info.id),
    { blog: editForm.value, _method: 'PUT' },
    {
      onSuccess: () => {
        notify.success(trans('Blog has been deleted successfully'))
      }
    }
  )
}
</script>
