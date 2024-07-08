<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import { Head } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'

defineOptions({ layout: DefaultLayout })
const props = defineProps(['event', 'seat_no', 'status'])
</script>

<template>
  <Head :title="event.title" />

  <section class="container mb-20 mt-5">
    <div class="text-center">
      <h3 class="text-primary">{{ trans('Congratulations !') }}</h3>
      <p>{{ trans(`Selected seats has been booked successfully`) }}</p>

      <div class="mb-5 mt-8">
        <a
          v-if="status === 1"
          :href="route('events.book.ticket', event)"
          class="btn : rounded-full bg-[#EEE8FF] py-3 hover:bg-[#9681d2] hover:text-white"
          >{{ trans('Download Ticket') }}</a
        >
        <p class="text-bold" v-else-if="status === 2">
          {{ trans('Your request is under pending please wait for admin approval') }}
        </p>
      </div>

      <div class="mt-6">
        <Link :href="route('events.show', event)" class="text-primary">{{
          trans('Back to Event')
        }}</Link>
      </div>
    </div>
  </section>
</template>
