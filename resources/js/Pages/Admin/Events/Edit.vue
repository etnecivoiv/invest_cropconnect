<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import notify from '@/Plugins/Admin/notify'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import InputFieldError from '@/components/InputFieldError.vue'
import trans from '@/composables/transComposable'
import moment from 'moment'
defineOptions({ layout: AdminLayout })

const props = defineProps(['buttons', 'segments', 'eventData'])

const sampleGuest = {
  name: '',
  designation: '',
  preview: ''
}

const form = useForm({
  title: props.eventData.title,
  body: props.eventData.body,
  preview: null,
  start_at: props.eventData?.start_at_time?.datetime,
  location: props.eventData.location,
  email: props.eventData.email,
  phone: props.eventData.phone,
  total_seat: props.eventData.total_seat,
  seat_prefix: props.eventData.seat_prefix,
  seat_limit: props.eventData.seat_limit,
  is_free: props.eventData.is_free,
  is_active: props.eventData.is_active ? 'true' : 'false',
  fee_amount: props.eventData.fee_amount,
  guests: props.eventData.guests,
  _method: 'put'
})

const addGuest = () => {
  form.guests.push({ ...sampleGuest })
}

const removeGuest = (index) => {
  form.guests.splice(index, 1)
}

const createEvent = () => {
  form.post(route('admin.events.update', props.eventData), {
    onSuccess: () => {
      notify.success(trans('Event has been updated successfully'))
    }
  })
}
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Create an Event" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="card mx-auto w-8/12">
        <div class="card-body">
          <form @submit.prevent="createEvent" class="grid grid-cols-2 gap-2">
            <div class="mb-2">
              <label>{{ trans('Title') }}</label>
              <input v-model="form.title" type="text" class="input" />
              <InputFieldError :message="form.errors.title" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Preview') }}</label>
              <input
                @input="(e) => (form.preview = e.target.files[0])"
                type="file"
                accept="image/*"
                class="input"
              />
              <InputFieldError :message="form.errors.preview" />
            </div>

            <div class="col-span-full mb-2">
              <label>{{ trans('Body') }}</label>
              <textarea v-model="form.body" class="input h-200" maxlength="1000"></textarea>
              <InputFieldError :message="form.errors.body" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Event Start') }}</label>
              <input type="datetime-local" v-model="form.start_at" class="input" />
              <InputFieldError :message="form.errors.start_at" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Location') }}</label>
              <input type="text" v-model="form.location" class="input" />
              <InputFieldError :message="form.errors.location" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Email') }}</label>
              <input type="email" v-model="form.email" class="input" />
              <InputFieldError :message="form.errors.email" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Phone') }}</label>
              <input type="text" v-model="form.phone" class="input" />
              <InputFieldError :message="form.errors.phone" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Total Seat') }}</label>
              <input type="number" v-model="form.total_seat" class="input" />
              <InputFieldError :message="form.errors.total_seat" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Seat Prefix') }}</label>
              <input type="text" v-model="form.seat_prefix" class="input" />
              <InputFieldError :message="form.errors.seat_prefix" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Seat Book Limit(Per user)') }}</label>
              <input type="number" v-model="form.seat_limit" class="input" />
              <InputFieldError :message="form.errors.seat_limit" />
            </div>

            <div class="mb-2">
              <label>{{ trans('Event Type') }}</label>
              <select class="select" v-model="form.is_free">
                <option value="1">{{ trans('Free') }}</option>
                <option value="0">{{ trans('Premium') }}</option>
              </select>
              <InputFieldError :message="form.errors.is_free" />
            </div>

            <div class="mb-2" v-if="form.is_free == 0">
              <label>{{ trans('Fee Amount') }}</label>
              <input type="number" v-model="form.fee_amount" class="input" />
              <InputFieldError :message="form.errors.fee_amount" />
            </div>

            <div class="col-span-full mb-2">
              <div class="mb-2 flex items-center justify-between">
                <label for="">{{ trans('Guests') }}</label>
                <button @click="addGuest" class="btn btn-primary" type="button">
                  {{ trans('Add') }}
                </button>
              </div>
              <div v-for="(guest, index) in form.guests">
                <div class="mb-2 flex gap-2" :key="index">
                  <input type="text" v-model="guest.name" class="input" placeholder="name" />
                  <input
                    type="text"
                    v-model="guest.designation"
                    class="input"
                    placeholder="designation"
                  />
                  <input
                    @input="(e) => (guest.preview = e.target.files[0])"
                    type="file"
                    accept="image/*"
                    class="input"
                  />
                  <button @click="removeGuest(index)" type="button" class="btn btn-outline-danger">
                    X
                  </button>
                </div>
                <div class="mb-3">
                  <InputFieldError :message="form.errors['guests.' + index + '.title']" />
                  <InputFieldError :message="form.errors['guests.' + index + '.designation']" />
                  <InputFieldError :message="form.errors['guests.' + index + '.preview']" />
                </div>
              </div>
            </div>

            <div class="col-span-full mb-2">
              <label for="toggle-status" class="toggle toggle-sm">
                <input
                  v-model="form.is_active"
                  class="toggle-input peer sr-only"
                  id="toggle-status"
                  type="checkbox"
                />
                <div class="toggle-body"></div>
                <span class="label label-md">{{ trans('Make it publish?') }}</span>
              </label>
            </div>

            <div class="col-span-full text-end">
              <SpinnerBtn :processing="form.processing" :btn-text="trans('Update Event')" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
