<script setup>
import { useForm, usePage } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import notify from '@/Plugins/Admin/notify'
import trans from '@/composables/transComposable'
import InputError from '@/components/InputError.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'

defineOptions({ layout: DefaultLayout })

const primaryData = usePage().props.primaryData

const form = useForm({
  email: '',
  name: '',
  subject: '',
  message: ''
})

const submit = () => {
  form.post(route('contact'), {
    preserveScroll: true,
    preserveState: true
  })
}
</script>

<template>
  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ trans('Contact Us') }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans('Home') }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ trans('Contact Us') }}</li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="nav-tab-wrapper tabs section-padding">
    <div class="container">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-6 xl:col-span-5">
          <div class="mini-title">{{ trans('Contact Us') }}</div>
          <h4 class="column-title">
            {{ trans('Get In Touch') }}
            <span class="shape-bg"> {{ trans('Today') }}</span>
          </h4>
          <div>
            {{
              trans(
                'There are many variations of passages of Lorem Ipsum available, but the majority have suffered.'
              )
            }}
          </div>
          <ul class="list-item space-y-6 pt-8">
            <li class="flex">
              <div class="mr-6 flex-none">
                <div class="">
                  <img src="/assets/images/svg/mail.svg" alt="" class="" />
                </div>
              </div>
              <div class="flex-1">
                <h4 class="mb-1 text-lg lg:text-xl">{{ trans('Email-Us') }} :</h4>
                <div>{{ primaryData.contact_email }}</div>
              </div>
            </li>
            <li class="flex">
              <div class="mr-6 flex-none">
                <div class="">
                  <img src="/assets/images/svg/call.svg" alt="" class="" />
                </div>
              </div>
              <div class="flex-1">
                <h4 class="mb-1 text-lg lg:text-xl">{{ trans('Call Us') }}:</h4>
                <div>{{ primaryData.contact_phone }}</div>
              </div>
            </li>
            <li class="flex">
              <div class="mr-6 flex-none">
                <div class="">
                  <img src="/assets/images/svg/map.svg" alt="" class="" />
                </div>
              </div>
              <div class="flex-1">
                <h4 class="mb-1 text-lg lg:text-xl">{{ trans('Office') }} :</h4>
                <div>{{ primaryData.address }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-7">
          <div class="shadow-box7 rounded-md bg-white p-8">
            <form @submit.prevent="submit">
              <div class="mt-6 grid grid-cols-1 gap-[30px] md:grid-cols-2">
                <div>
                  <input type="text" v-model="form.name" class="from-control" placeholder="Name*" />
                  <InputError :message="form.errors.name" />
                </div>
                <div>
                  <input
                    type="email"
                    v-model="form.email"
                    class="from-control"
                    placeholder="Email*"
                  />
                  <InputError :message="form.errors.email" />
                </div>
                <div class="col-span-full">
                  <input
                    type="text"
                    v-model="form.subject"
                    class="from-control"
                    placeholder="Subject"
                  />
                  <InputError :message="form.errors.subject" />
                </div>
                <div class="col-span-1 md:col-span-2">
                  <textarea
                    v-model="form.message"
                    class="from-control"
                    placeholder="Your Message*"
                    rows="5"
                  ></textarea>
                  <InputError :message="form.errors.message" />
                </div>
              </div>
              <SpinnerBtn
                :processing="form.processing"
                :btn-text="trans('Send Message')"
                classes="btn btn-primary flex gap-1 mt-[30px]"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
