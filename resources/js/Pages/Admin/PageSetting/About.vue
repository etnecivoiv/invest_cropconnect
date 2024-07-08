<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import trans from '@/composables/transComposable'
import { onBeforeMount } from 'vue'
import { useOptionUpdateStore } from '@/Store/Admin/optionUpdate'
defineOptions({ layout: AdminLayout })

const form = useOptionUpdateStore()
const props = defineProps(['data'])

onBeforeMount(() => {
  let properties = ['testimonial', 'faq']
  properties.forEach((key) => (props.data[key] = props.data[key] || {}))
})
</script>

<template>
  <form @submit.prevent="form.submit('about_page', data)">
    <h6>{{ trans('About Section') }}</h6>
    <div
      class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"
    >
      <button class="tabs-btn" data-panel-id="#primary" type="button">
        {{ trans('See in primary settings') }}
      </button>
    </div>

    <h6>{{ trans('Why Choose Section') }}</h6>
    <div
      class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"
    >
      <button class="tabs-btn" data-panel-id="#primary" type="button">
        {{ trans('See in primary settings') }}
      </button>
    </div>

    <h6>{{ trans('Achievement Section') }}</h6>
    <div
      class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"
    >
      <button class="tabs-btn" data-panel-id="#primary" type="button">
        {{ trans('See in primary settings') }}
      </button>
    </div>

    <h6>{{ trans('Testimonial Section') }}</h6>
    <div
      class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"
    >
      <div class="mb-2">
        <label>{{ trans('Top title') }}</label>
        <input type="text" class="input" v-model="data.testimonial.top_title" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Title') }}</label>
        <input type="text" class="input" v-model="data.testimonial.title" />
        <i>{{ trans('use {text} to highlight') }}</i>
      </div>

      <div class="mb-2">
        <label>{{ trans('Text Content') }}</label>
        <input type="text" class="input" v-model="data.testimonial.text" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Button Text') }}</label>
        <input type="text" class="input" v-model="data.testimonial.btn_text" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Button Link') }}</label>
        <input type="text" class="input" v-model="data.testimonial.btn_link" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Left image') }}</label>
        <input
          type="file"
          accept="image/*"
          class="input"
          @input="(e) => (data.testimonial.image = e.target.files[0])"
        />
      </div>
    </div>

    <h6>{{ trans('Faq Section') }}</h6>
    <div
      class="mb-10 mt-2 rounded border bg-slate-50 bg-opacity-50 p-3 dark:border-slate-500 dark:bg-slate-800"
    >
      <div class="mb-2">
        <label>{{ trans('Top title') }}</label>
        <input type="text" class="input" v-model="data.faq.top_title" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Title') }}</label>
        <input type="text" class="input" v-model="data.faq.title" />
        <i>{{ trans('use {text} to highlight') }}</i>
      </div>

      <div class="mb-2">
        <label>{{ trans('Right image') }}</label>
        <input
          type="file"
          accept="image/*"
          class="input"
          @input="(e) => (data.faq.image = e.target.files[0])"
        />
      </div>
    </div>

    <div class="mt-4">
      <SpinnerBtn :processing="form.processing" :btn-text="trans('Save Changes')" />
    </div>
  </form>
</template>
