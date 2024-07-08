<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import ckeEditor from '@/Plugins/Admin/ckeEditor'
const { cke, ClassicEditor } = ckeEditor()
import { ref } from 'vue'
import InputFieldError from '@/components/InputFieldError.vue'

defineOptions({ layout: AdminLayout })
const props = defineProps(['segments', 'buttons', 'categories'])

const newDurationItem = {
  duration: '',
  duration_type: 'Days',
  max_profit_return: '',
  min_profit_return: '',
  loss_min_range: '',
  loss_max_range: '',
  return_type: 'fixed'
}

const newFaqItem = {
  qns: '',
  ans: ''
}

const form = useForm({
  category_id: '',
  title: '',
  preview: '',
  cover_image: '',
  total_units: '',
  min_return: '',
  invest_amount: '',
  expire_date: '',
  address: '',
  durations: [{ ...newDurationItem }],

  // seo
  seo_title: '',
  seo_image: '',
  seo_description: '',
  seo_tags: '',

  // info
  short_description: '',
  main_description: '',
  faqs: [
    {
      qns: '',
      ans: ''
    }
  ],

  accept_new_investor: true,
  status: true
})

const addDuration = () => {
  form.durations.push({ ...newDurationItem })
}

const removeDuration = (index) => {
  if (form.durations.length > 1) {
    form.durations.splice(index, 1)
  }
}

const addFaq = () => {
  form.faqs.push({ ...newFaqItem })
}

const removeFaq = (index) => {
  // if (form.faqs.length > 1) {
  form.faqs.splice(index, 1)
  // }
}

const submit = () => {
  form.post(route('admin.projects.store'), {
    onSuccess: () => {
      notify.success('Project has been added successfully')
      form.reset()
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Add New Project" :segments="segments" :buttons="buttons" />

    <div class="space-y-6">
      <div class="flex">
        <div class="card mx-auto">
          <div class="card-body">
            <form @submit.prevent="submit">
              <h4 class="mb-2">{{ trans('Project Information') }}</h4>

              <div class="">
                <label>{{ trans('Project Title') }}</label>
                <input
                  v-model="form.title"
                  type="text"
                  class="input"
                  placeholder="enter project title (max 255 character)"
                />
                <InputFieldError :message="form.errors.title" />
              </div>

              <div class="mb-2 mt-2">
                <label>{{ trans('Short Description') }}</label>
                <textarea
                  v-model="form.short_description"
                  class="textarea"
                  maxlength="500"
                ></textarea>
                <InputFieldError :message="form.errors['short_description']" />
              </div>
              <div class="mb-2 mt-3">
                <label>{{ trans('Main Description') }}</label>

                <cke tag-name="textarea" :editor="ClassicEditor" v-model="form.main_description" />
                <InputFieldError :message="form.errors['short_description']" />
              </div>

              <div class="mb-2 grid grid-cols-2 space-x-2">
                <div class="">
                  <label>{{ trans('Preview Image') }}</label>
                  <input
                    type="file"
                    @change="($event) => (form.preview = $event.target.files[0])"
                    class="input"
                    accept="image/*"
                  />
                  <InputFieldError :message="form.errors.preview" />
                </div>

                <div class="">
                  <label>{{ trans('Cover Image') }}</label>
                  <input
                    type="file"
                    @change="($event) => (form.cover_image = $event.target.files[0])"
                    class="input"
                    accept="image/*"
                  />
                  <InputFieldError :message="form.errors.cover_image" />
                </div>
              </div>

              <div class="grid grid-cols-4 space-x-2">
                <div class="mb-2">
                  <label>{{ trans('Project Category') }}</label>
                  <select class="select" v-model="form.category_id">
                    <option value="">SELECT</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.title }}
                    </option>
                  </select>
                  <InputFieldError :message="form.errors.category_id" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Total Units') }}</label>
                  <input v-model="form.total_units" type="number" class="input" placeholder="100" />
                  <InputFieldError :message="form.errors.total_units" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Invest Amount') }}</label>
                  <input
                    v-model="form.invest_amount"
                    type="number"
                    step="any"
                    class="input"
                    placeholder="1000"
                  />
                  <InputFieldError :message="form.errors.invest_amount" />
                </div>

                <div class="mb-2">
                  <label>{{ trans('Expire Date') }}</label>
                  <input v-model="form.expire_date" type="date" class="input" />
                  <InputFieldError :message="form.errors.expire_date" />
                </div>
              </div>

              <div class="mb-2">
                <label>{{ trans('Address') }}</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="input"
                  placeholder="enter address or location here"
                />
                <InputFieldError :message="form.errors.address" />
              </div>

              <div class="mb-2 mt-10 flex items-center justify-between">
                <h4>{{ trans('Investments Calculations') }}</h4>
                <button type="button" class="btn btn-primary" @click="addDuration()">+</button>
              </div>

              <div class="grid grid-cols-7">
                <label>{{ trans('Duration') }}</label>
                <label>{{ trans('Duration Type') }}</label>
                <label>{{ trans('Profit return') }}</label>
                <label>{{ trans('Min profit return') }}</label>
                <label>{{ trans('Max profit return') }}</label>
                <label>{{ trans('Min loss range') }}</label>
                <label>{{ trans('Max loss range') }}</label>
              </div>

              <div v-for="(item, index) in form.durations" :key="index">
                <div class="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    step="any"
                    v-model="item.duration"
                    class="input"
                    placeholder="30"
                  />
                  <select v-model="item.duration_type" class="select">
                    <option value="Days">{{ trans('Days') }}</option>
                    <option value="Week">{{ trans('Week') }}</option>
                    <option value="Month">{{ trans('Month') }}</option>
                    <option value="Years">{{ trans('Years') }}</option>
                  </select>
                  <select class="select" v-model="item.return_type">
                    <option value="fixed">{{ trans('Fixed') }}</option>
                    <option value="percent">{{ trans('Percent') }}</option>
                  </select>
                  <input
                    type="number"
                    step="any"
                    v-model="item.min_profit_return"
                    class="input"
                    placeholder="100"
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="item.max_profit_return"
                    class="input"
                    placeholder="500"
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="item.loss_min_range"
                    class="input"
                    placeholder="200"
                  />
                  <input
                    type="number"
                    step="any"
                    v-model="item.loss_max_range"
                    class="input"
                    placeholder="300"
                  />
                  <button type="button" class="btn btn-danger" @click="removeDuration(index)">
                    x
                  </button>
                </div>
                <InputFieldError :message="form.errors['durations.' + index + '.duration']" />
                <InputFieldError :message="form.errors['durations.' + index + '.duration_type']" />
                <InputFieldError :message="form.errors['durations.' + index + '.return_type']" />
                <InputFieldError
                  :message="form.errors['durations.' + index + '.min_profit_return']"
                />
                <InputFieldError
                  :message="form.errors['durations.' + index + '.max_profit_return']"
                />
                <InputFieldError :message="form.errors['durations.' + index + '.loss_min_range']" />
                <InputFieldError :message="form.errors['durations.' + index + '.loss_max_range']" />
              </div>

              <div class="mt-10 flex items-center justify-between">
                <h4>{{ trans("Faq's") }}</h4>
                <button type="button" class="btn btn-primary" @click="addFaq()">+</button>
              </div>

              <div v-for="(item, index) in form.faqs" :key="index">
                <div class="mt-2 flex items-center gap-2">
                  <input type="text" v-model="item.qns" class="input" placeholder="question" />
                  <input type="text" v-model="item.ans" class="input" placeholder="answer" />
                  <button type="button" class="btn btn-danger" @click="removeFaq(index)">x</button>
                </div>
                <InputFieldError :message="form.errors['faqs.' + index + '.qns']" />
                <InputFieldError :message="form.errors['faqs.' + index + '.ans']" />
              </div>

              <h4 class="mb-2 mt-10">{{ trans('SEO Settings') }}</h4>
              <div class="mb-2">
                <label>{{ trans('SEO Meta Title') }}</label>
                <input v-model="form.seo_title" type="text" class="input" />
                <InputFieldError :message="form.errors['seo_title']" />
              </div>

              <div class="mb-2 mt-2">
                <label>{{ trans('SEO Meta Image') }}</label>
                <input
                  @change="($event) => (form.seo_image = $event.target.files[0])"
                  type="file"
                  class="input"
                  accept="image/*"
                />
                <InputFieldError :message="form.errors['seo_image']" />
              </div>
              <div class="mb-2 mt-2">
                <label>{{ trans('SEO Meta Description') }}</label>
                <textarea v-model="form.seo_description" class="input h-100"></textarea>
                <InputFieldError :message="form.errors['seo_description']" />
              </div>
              <div class="mb-2 mt-2">
                <label>{{ trans('SEO Meta Tags') }}</label>
                <input v-model="form.seo_tags" type="text" class="input" />
                <InputFieldError :message="form.errors['seo_tags']" />
              </div>

              <div class="mb-2 mt-3">
                <div>
                  <label for="toggle-new-investor-status" class="toggle toggle-sm">
                    <input
                      v-model="form.accept_new_investor"
                      class="toggle-input peer sr-only"
                      id="toggle-new-investor-status"
                      type="checkbox"
                    />
                    <div class="toggle-body"></div>
                    <span class="label label-md">{{ trans('Accept New Investors?') }}</span>
                  </label>
                </div>
              </div>

              <div class="mb-2 mt-3">
                <div>
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
              </div>

              <div class="mb-2 mt-3">
                <div>
                  <SpinnerBtn
                    classes="btn btn-primary"
                    :processing="form.processing"
                    :btn-text="trans('Create')"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
