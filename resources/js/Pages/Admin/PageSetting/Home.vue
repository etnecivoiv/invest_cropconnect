<script setup>
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'

import { useOptionUpdateStore } from '@/Store/Admin/optionUpdate'
import { onBeforeMount } from 'vue'
const props = defineProps(['data'])
const form = useOptionUpdateStore()

onBeforeMount(() => {
  let properties = ['hero']
  properties.forEach(key => (props.data[key] = props.data[key] || {}))
})
</script>

<template>
  <form @submit.prevent="form.submit('home_page', data)">
    <h6>{{ trans('Hero Banner Section') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <div class="mb-2">
        <label>{{ trans('Title') }}</label>
        <input type="text" class="input" v-model="data.hero.title" />
        <i>{{ trans('use {text} to highlight') }}</i>
      </div>

      <div class="mb-2">
        <label>{{ trans('Sub title') }}</label>
        <input type="text" class="input" v-model="data.hero.subtitle" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Button One') }}</label>
        <input type="text" class="input" v-model="data.hero.btn_text" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Button One Link') }}</label>
        <input type="text" class="input" v-model="data.hero.btn_link" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Button Two') }}</label>
        <input type="text" class="input" v-model="data.hero.btn_text2" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Button Two Link') }}</label>
        <input type="text" class="input" v-model="data.hero.btn_link2" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Right Image') }}</label>
        <input
          type="file"
          accept="image/*"
          class="input"
          @input="e => (data.hero.image = e.target.files[0])"
        />
      </div>
    </div>

    <h6>{{ trans('About Section') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <button class="tabs-btn" data-panel-id="#primary" type="button">
        {{ trans('See in primary settings') }}
      </button>
    </div>

    <h6>{{ trans('Achievement Section') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <button class="tabs-btn" data-panel-id="#primary" type="button">
        {{ trans('See in primary settings') }}
      </button>
    </div>

    <h6>{{ trans('Why Choose Section') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <button class="tabs-btn" data-panel-id="#primary" type="button">
        {{ trans('See in primary settings') }}
      </button>
    </div>

    <div class="mt-4">
      <SpinnerBtn
        :processing="form.processing"
        :btn-text="trans('Save Changes')"
      />
    </div>
  </form>
</template>
