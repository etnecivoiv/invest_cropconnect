<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'

import InputFieldError from '@/components/InputFieldError.vue'

defineOptions({ layout: AdminLayout })
const props = defineProps(['segments', 'buttons', 'project', 'durations'])

const form = useForm({
  project_id: props.project.id,
  project_duration_id: props.durations?.[0]?.id ?? '',
  return_type: 'fixed',
  profit_type: 'profit',
  amount: '',
  attachment: '',
  return_date: ''
})

const submit = () => {
  form.post(route('admin.return-schedules.store', props.project.id), {
    onSuccess: () => {
      notify.success('Project has been added successfully')
      form.reset()
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader
      title="Add New Return Schedule to a project"
      :segments="segments"
      :buttons="buttons"
    />

    <div class="space-y-6">
      <div class="card ml-auto w-[600px]">
        <div class="card-body">
          <form @submit.prevent="submit">
            <div class="mb-2">
              <label>{{ trans('Project Durations') }}</label>
              <select class="select" v-model="form.project_duration_id">
                <option v-for="item in durations" :value="item.id" :key="item.id">
                  {{ `${project.title} (${item.duration} ${item.duration_type})` }}
                </option>
              </select>
              <InputFieldError :message="form.errors.project_duration_id" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Return type') }}</label>
              <select class="select" v-model="form.return_type">
                <option value="fixed">{{ trans('Fixed') }}</option>
                <option value="percent">{{ trans('Percent') }}</option>
              </select>
              <InputFieldError :message="form.errors.return_type" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Profit type') }}</label>
              <select class="select" v-model="form.profit_type">
                <option value="profit">{{ trans('Profit') }}</option>
                <option value="loss">{{ trans('Loss') }}</option>
              </select>
              <InputFieldError :message="form.errors.profit_type" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Amount') }}</label>
              <input
                v-model="form.amount"
                type="number"
                step="any"
                class="input"
                placeholder="1500"
              />
              <InputFieldError :message="form.errors.amount" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Return Date') }}</label>
              <input v-model="form.return_date" type="date" class="input" />
              <InputFieldError :message="form.errors.return_date" />
            </div>

            <div class="">
              <label>{{ trans('Attachment') }}</label>
              <input
                type="file"
                @change="($event) => (form.attachment = $event.target.files[0])"
                class="input"
                accept="image/*"
              />
              <InputFieldError :message="form.errors.attachment" />
            </div>

            <div class="mt-3 mb-2">
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
  </main>
</template>
