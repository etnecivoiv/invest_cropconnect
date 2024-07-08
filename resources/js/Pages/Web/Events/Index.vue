<script setup>
import { Head, router, useForm } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import moment from 'moment'
import NiceSelect from '@/components/NiceSelect.vue'
import WebPagination from '@/components/WebPagination.vue'

defineOptions({ layout: DefaultLayout })
defineProps(['events'])

const filterForm = useForm({
  order_by: 'Latest'
})

const filter = () => {
  filterForm.get(route('events.index'), {
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
      <h2>{{ trans('Events') }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans('Home') }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ trans('Events') }}</li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="nav-tab-wrapper tabs section-padding">
    <div class="container">
      <div class="flex items-center mb-14" v-if="events.data.length > 0">
        <div class="flex items-center flex-1 space-x-6">
          <span>
            {{ trans('Showing') }} {{ events.to }} {{ trans('events of') }}
            {{ events.total }}
          </span>
        </div>
        <div class="flex-0">
          <div class="min-w-[272px]">
            <NiceSelect
              v-model="filterForm.order_by"
              :options="['new', 'old']"
              @change="filter()"
              placeholder="Sort By"
            />
          </div>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
        <template v-if="events.data.length > 0">
          <div
            v-for="event in events.data"
            class="bg-white shadow-box5 rounded-[8px] transition duration-100 hover:shadow-box3"
          >
            <div class="course-thumb h-[297px] rounded-t-[8px] relative">
              <Link :href="route('events.show', event.slug)">
                <img
                  v-lazy="event.preview"
                  alt=""
                  class="w-full h-full object-cover rounded-t-[8px]"
                />
              </Link>
            </div>
            <div class="p-8 course-content">
              <h4 class="mb-5 text-xl font-bold">
                <Link
                  :href="route('events.show', event.slug)"
                  class="transition duration-150 hover:text-primary"
                >
                  {{ event.title }}
                </Link>
              </h4>
              <ul class="mb-6 space-y-3 list">
                <li class="flex space-x-2">
                  <span class="text-lg text-secondary">
                    <iconify-icon icon="heroicons:calendar-days"></iconify-icon>
                  </span>
                  <span>{{
                    moment(event.start_at).format('ddd, MMM D, Y | ') +
                    event.start_at_time.time
                  }}</span>
                </li>
                <li class="flex space-x-2">
                  <span class="text-lg text-secondary">
                    <iconify-icon icon="heroicons:map-pin"></iconify-icon>
                  </span>
                  <span>{{ event.location }}</span>
                </li>
              </ul>
              <Link
                :href="route('events.show', event.slug)"
                class="btn px-8 py-[11px] bg-black text-white hover:bg-primary"
                >{{ trans('View Details') }}</Link
              >
            </div>
          </div>
        </template>
        <!-- no data found -->
        <div
          v-else
          class="bg-white col-span-3 text-center rounded-[8px] transition duration-100"
        >
          <div class="p-8 course-content">
            <h4 class="mb-5 text-xl font-bold">
              {{ trans('No events found') }}
            </h4>
          </div>
        </div>
      </div>
      <!-- <Pagination /> -->
      <WebPagination :links="events" />
    </div>
  </div>
</template>
