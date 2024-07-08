<script setup>
import InputFieldError from "@/components/InputFieldError.vue"
import UserLayout from "@/Layouts/User.vue"
import notify from "@/Plugins/Admin/notify"
import { Head, useForm } from "@inertiajs/vue3"
import SpinnerBtn from "@/components/Admin/SpinnerBtn.vue"
import PageHeader from "@/Layouts/Admin/PageHeader.vue"
defineOptions({ layout: UserLayout })

const form = useForm({
  subject: "",
  message: "",
})

const submit = () => {
  form.post(route("user.supports.store"), {
    onSuccess: () => {
      notify.success("Updated Successfully")
    },
  })
}
</script>

<template>
  <Head :title="trans('Create Ticket')" />
  <main class="container flex-grow p-4 sm:p-6">
    <div class="space-y-6">
      <PageHeader />
      <h2 class="main-title">{{ trans("Create Ticket") }}</h2>

      <div class="flex justify-center">
        <div class="card card-body w-[700px]">
          <form @submit.prevent="submit">
            <div class="mb-5">
              <label class="mb-2 label" for="">{{ trans("Subject") }}*</label>
              <input
                type="text"
                class="input"
                placeholder="Subject"
                v-model="form.subject"
              />
              <InputFieldError :message="form.errors.subject" />
            </div>

            <div class="mb-5">
              <label class="mb-2 label" for="">{{ trans("Message") }}*</label>
              <textarea
                required
                v-model="form.message"
                class="textarea"
                placeholder="Write message...."
              ></textarea>
              <InputFieldError :message="form.errors.message" />
            </div>
            <div class="button-group d-inline-flex align-items-center mt-30">
              <SpinnerBtn
                type="submit"
                classes="btn btn-primary"
                :processing="form.processing"
                btn-text="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
