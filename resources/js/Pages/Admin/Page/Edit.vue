<template>
  <main class="container p-4 sm:p-6">
    <PageHeader title="Edit Page" :segments="segments" :buttons="buttons" />

    <form method="post" @submit.prevent="editPage">
      <!-- Alerts -->
      <div class="card">
        <div class="card-body space-y-5">
          <div>
            <label class="label label-required mb-1">{{ trans('Page Title') }}</label>
            <input type="text" name="title" v-model="info.title" required class="input" />
          </div>
          <div>
            <label class="label label-required mb-1">{{ trans('Page Description') }}</label>

            <cke tag-name="textarea" :editor="ClassicEditor" v-model="info.description.value" />
          </div>

          <div class="mb-2">
            <label class="label label-required mb-1">{{ trans('SEO Meta Title') }}</label>
            <input
              v-model="seoMeta.meta_title"
              type="text"
              name="meta_title"
              required
              class="input"
            />
          </div>
          <div class="mb-2 mt-2">
            <label class="label label-required mb-1">{{ trans('SEO Meta Description') }}</label>
            <textarea
              v-model="seoMeta.meta_description"
              name="meta_description"
              required
              class="textarea"
            ></textarea>
          </div>
          <div class="mb-2 mt-3">
            <label class="label label-required mb-1">{{ trans('SEO Meta Tags') }}</label>
            <input
              v-model="seoMeta.meta_tags"
              type="text"
              name="meta_tags"
              required
              class="input"
            />
          </div>
          <div class="flex items-center gap-1.5">
            <input v-model="info.status" class="checkbox" type="checkbox" name="basic-checkbox" />
            <label for="checked" class="label text-lg font-semibold">{{
              trans('Make it publish?')
            }}</label>
          </div>

          <SpinnerBtn :processing="isPoroccessing" :btnText="trans('Save Changes')" />
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { router } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import ckeEditor from '@/Plugins/Admin/ckeEditor'
const { cke, ClassicEditor } = ckeEditor()
defineOptions({ layout: AdminLayout })

const props = defineProps(['buttons', 'segments', 'info', 'seo'])

const isPoroccessing = ref(false)

const seoMeta = ref({
  meta_title: '',
  meta_description: '',
  meta_tags: ''
})

onMounted(() => {
  seoMeta.value.meta_title = props.seo.title
  seoMeta.value.meta_description = props.seo.description
  seoMeta.value.meta_tags = props.seo.tags
})

const editPage = () => {
  const data = { ...seoMeta.value, ...props.info }
  isPoroccessing.value = true
  router.patch(route('admin.page.update', props.info.id), data, {
    onSuccess: () => {
      isPoroccessing.value = false
      notify.success(trans('Page has been updated successfully'))
    }
  })
}
</script>
