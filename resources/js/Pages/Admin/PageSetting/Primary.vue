<script setup>
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import { useOptionUpdateStore } from '@/Store/Admin/optionUpdate'
import { onBeforeMount } from 'vue'
const props = defineProps(['data'])
const form = useOptionUpdateStore()

onBeforeMount(() => {
  let properties = ['about_section', 'why_choose', 'achievement']
  properties.forEach(key => (props.data[key] = props.data[key] || {}))

  if (!props.data.about_section?.features?.length) {
    props.data.about_section.features = [
      {
        text: '',
        percent: ''
      }
    ]
  }
  if (!props.data.why_choose?.features?.length) {
    props.data.why_choose.features = [
      {
        icon: '',
        title: '',
        text: ''
      }
    ]
  }
  if (!props.data.achievement?.counters?.length) {
    props.data.achievement.counters = [
      {
        icon: '',
        counter: '',
        text: 'test'
      }
    ]
  }
})

const defaultFeature = {
  text: '',
  color: '#ff0000',
  percent: ''
}

const addFeatureItem = () => {
  props.data.about_section.features.push({ ...defaultFeature })
}

const removeFeatureItem = index => {
  props.data.about_section.features.splice(index, 1)
}

const defaultWCFeature = {
  icon: '',
  title: '',
  text: ''
}

const addWCFeatureItem = () => {
  props.data.why_choose.features.push({ ...defaultWCFeature })
}

const removeWCFeatureItem = index => {
  props.data.why_choose.features.splice(index, 1)
}

const defaultAchievement = {
  icon: '',
  counter: '',
  text: ''
}

const addAchievementItem = () => {
  props.data.achievement.counters.push({ ...defaultAchievement })
}

const removeAchievementItem = index => {
  props.data.achievement.counters.splice(index, 1)
}
</script>

<template>
  <form @submit.prevent="form.submit('primary_data', data)">
    <h6>{{ trans('Primary Settings') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <div class="mb-2">
        <label>{{ trans('Site Logo (Deep)') }}</label>
        <input
          type="file"
          accept="image/*"
          @input="e => (data.deep_logo = e.target.files[0])"
          class="input"
        />
      </div>
      <div class="mb-2">
        <label>{{ trans('Site Logo (light)') }}</label>
        <input
          type="file"
          @input="e => (data.logo = e.target.files[0])"
          accept="image/*"
          class="input"
        />
      </div>
      <div class="mb-2">
        <label>{{ trans('Favicon') }}</label>
        <input
          type="file"
          accept="image/*"
          @input="e => (data.favicon = e.target.files[0])"
          class="input"
        />
      </div>

      <div class="mb-2">
        <label>{{ trans('Copyright text') }}</label>
        <input type="text" class="input" v-model="data.copyright_text" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Contact Email') }}</label>
        <input type="text" class="input" v-model="data.contact_email" />
      </div>
      <div class="mb-2">
        <label>{{ trans('Contact Phone') }}</label>
        <input type="text" class="input" v-model="data.contact_phone" />
      </div>
      <div class="mb-2">
        <label>{{ trans('Address') }}</label>
        <input type="text" class="input" v-model="data.address" />
      </div>
    </div>

    <h6>{{ trans('About Section Card') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <div class="mb-2">
        <label>{{ trans('Top title') }}</label>
        <input
          type="text"
          class="input"
          v-model="data.about_section.top_title"
        />
      </div>

      <div class="mb-2">
        <label>{{ trans('Title') }}</label>
        <input type="text" class="input" v-model="data.about_section.title" />
        <i>{{ trans('use {text} to highlight') }}</i>
      </div>

      <div class="mb-2">
        <label>{{ trans('Text content') }}</label>
        <input type="text" class="input" v-model="data.about_section.text" />
      </div>

      <div class="mb-2">
        <label class="mr-2">{{ trans('Category list') }}</label>

        <div
          class="flex items-center p-2 mb-2 border gap-x-2"
          v-for="(item, index) in data.about_section.features"
          :key="index"
        >
          <span
            class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full"
            >{{ index + 1 }}</span
          >
          <div class="flex items-center flex-grow gap-1">
            <input type="color" v-model="item.color" class="mx-2" />
            <input
              type="text"
              class="input"
              placeholder="title"
              v-model="item.text"
            />
            <input
              type="text"
              class="input"
              placeholder="percentage"
              v-model="item.percent"
            />
          </div>
          <button
            type="button"
            @click="removeFeatureItem(index)"
            class="btn btn-danger"
          >
            X
          </button>
        </div>
        <button type="button" @click="addFeatureItem" class="btn btn-primary">
          +
        </button>
      </div>

      <div class="mb-2">
        <label>{{ trans('Left image') }}</label>
        <input
          type="file"
          accept="image/*"
          class="input"
          @input="e => (data.about_section.image = e.target.files[0])"
        />
      </div>
    </div>

    <h6>{{ trans('Why Choose Section') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <div class="mb-2">
        <label>{{ trans('Top title') }}</label>
        <input type="text" class="input" v-model="data.why_choose.top_title" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Title') }}</label>
        <input type="text" class="input" v-model="data.why_choose.title" />
        <i>{{ trans('use {text} to highlight') }}</i>
      </div>

      <div class="mb-2">
        <label>{{ trans('Text content') }}</label>
        <input type="text" class="input" v-model="data.why_choose.text" />
      </div>

      <div class="mb-2">
        <label class="mr-2">{{ trans('Feature list (Icon, Text)') }}</label>

        <div
          class="flex items-center p-2 mb-2 border gap-x-2"
          v-for="(item, index) in data.why_choose.features"
          :key="index"
        >
          <span
            class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full"
            >{{ index + 1 }}</span
          >
          <div class="flex items-center flex-grow gap-1">
            <input
              type="file"
              class="input"
              placeholder="icon"
              @change="e => (item.icon = e.target.files[0])"
            />
            <input
              type="text"
              class="input"
              placeholder="text content"
              v-model="item.text"
            />
          </div>
          <button
            type="button"
            @click="removeWCFeatureItem(index)"
            class="btn btn-danger"
          >
            X
          </button>
        </div>
        <button type="button" @click="addWCFeatureItem" class="btn btn-primary">
          +
        </button>
      </div>

      <div class="mb-2">
        <label>{{ trans('Right image') }}</label>
        <input
          type="file"
          accept="image/*"
          class="input"
          @input="e => (data.why_choose.image = e.target.files[0])"
        />
      </div>
    </div>

    <h6>{{ trans('Achievement Section') }}</h6>
    <div
      class="p-3 mt-2 mb-10 bg-opacity-50 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-500"
    >
      <div class="mb-2">
        <label>{{ trans('Top title') }}</label>
        <input type="text" class="input" v-model="data.achievement.top_title" />
      </div>

      <div class="mb-2">
        <label>{{ trans('Title') }}</label>
        <input type="text" class="input" v-model="data.achievement.title" />
        <i>{{ trans('use {text} to highlight') }}</i>
      </div>

      <div class="mb-2">
        <label class="mr-2">{{
          trans('Counters (Icon, Counter, Bottom Text)')
        }}</label>

        <div
          class="flex items-center p-2 mb-2 border gap-x-2"
          v-for="(item, index) in data.achievement.counters"
          :key="index"
        >
          <span
            class="p-2 py-1 text-center text-white bg-indigo-600 rounded-full"
            >{{ index + 1 }}</span
          >
          <div class="flex items-center flex-grow gap-1">
            <input
              type="file"
              class="input"
              placeholder="icon"
              @change="e => (item.icon = e.target.files[0])"
            />
            <input
              type="text"
              class="input"
              placeholder="counter"
              v-model="item.counter"
            />
            <input
              type="text"
              class="input"
              placeholder="bottom text"
              v-model="item.text"
            />
          </div>
          <button
            type="button"
            @click="removeAchievementItem(index)"
            class="btn btn-danger"
          >
            X
          </button>
        </div>
        <button
          type="button"
          @click="addAchievementItem"
          class="btn btn-primary"
        >
          +
        </button>
      </div>

      <div class="mb-2">
        <label>{{ trans('Video Background Image') }}</label>
        <input
          type="file"
          accept="image/*"
          class="input"
          @input="e => (data.achievement.video_bg_img = e.target.files[0])"
        />
      </div>

      <div class="mb-2">
        <label>{{ trans('Video Link') }}</label>
        <input type="text" class="input" v-model="data.achievement.video_url" />
        <i
          >{{ trans('url must be like') }}:
          https://www.youtube.com/embed/{VIDEO_ID}</i
        >
      </div>
    </div>

    <div class="mb-2">
      <SpinnerBtn
        :processing="form.processing"
        :btn-text="trans('Save Changes')"
      />
    </div>
  </form>
</template>
