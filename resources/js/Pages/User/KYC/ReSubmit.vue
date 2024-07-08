<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import UserLayout from "@/Layouts/User.vue";
import sharedComposable from "@/composables/sharedComposable";
import SpinnerBtn from "@/components/Admin/SpinnerBtn.vue";
defineOptions({ layout: UserLayout });

const { authUser } = sharedComposable();
const { kyc } = defineProps(["kyc"]);

let form = useForm({
  fields: kyc.fields,
  note: kyc.note,
});

const submit = () => {
  form.post(route("user.kyc.resubmit", kyc), {
    onSuccess: (visit) => {
      notify.success("KYC Document Submitted Successfully");
    },
    onError(e) {
      notify.danger(Object.values(e)[0] ?? "");
    },
  });
};
</script>

<template>
  <Head title="Re-Submit KYC verification | User Panel" />

  <main class="container p-4 sm:p-6">
    <div class="w-8/12 mx-auto card">
      <div class="card-body">
        <h4 class="card-title">{{ trans("Re-Submit KYC") }}</h4>
       
        <form class="p-3" @submit.prevent="submit()">
          <template v-for="(field, index) in form.fields" :key="field.id">
            <div v-if="field.type == 'textarea'" class="mb-2">
              <label> {{ field.label }} </label>
              <textarea v-model="field.value" class="input"></textarea>
            </div>

            <div v-else-if="field.type == 'file'" class="mb-2">
              <label> {{ field.label }} </label>
              <input
                type="file"
                @change="(e) => (field.value = e.target.files[0])"
                class="input"
                required
              />
            </div>

            <div v-else class="mb-2">
              <label :for="`fields_${index}`">{{ field.label }}</label>
              <input
                :type="field.type"
                v-model="field.value"
                :id="`fields_${index}`"
                class="input"
                required
              />
            </div>
          </template>

          <div class="mb-2">
            <label>{{ trans("Note") }}</label>
            <textarea v-model="form.note" rows="4" class="input"></textarea>
          </div>

          <SpinnerBtn
            type="submit"
            classes="btn btn-primary mt-5"
            :processing="form.processing"
            :btn-text="trans('Submit')"
          />
        </form>
      </div>
    </div>
  </main>
</template>
