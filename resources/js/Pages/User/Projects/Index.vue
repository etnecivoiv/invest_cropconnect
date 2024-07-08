<script setup>
import { Head, router } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import trans from '@/composables/transComposable'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import Overview from '@/components/Admin/OverviewGrid.vue'
import { ref } from 'vue'
import sharedComposable from '@/composables/sharedComposable'
defineOptions({ layout: UserLayout })

const props = defineProps([
  'projects',
  'categories',
  'segments',
  'buttons',
  'request',
  'categories'
])
const { pickBy, formatCurrency } = sharedComposable()
const filterForm = ref({
  category: props.request.search || ''
})
const filter = (slug) => {
  filterForm.value.category = slug
  router.get(route('user.projects.index'), pickBy(filterForm.value), {
    preserveState: true,
    replace: true
  })
}
</script>

<template>
  <Head title="Projects" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Projects" :segments="segments" :buttons="buttons" />

    <div class="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-5 xl:grid-cols-8">
      <button
        @click="filter('')"
        :class="{ 'outline outline-primary-600': filterForm.category == '' }"
        type="button"
        class="card flex h-16 items-center justify-center gap-1 p-2"
      >
        <p class="text-sm">{{ trans('All') }}</p>
      </button>
      <button
        type="button"
        @click="filter(category.slug)"
        v-for="category in categories"
        class="card flex h-16 items-center justify-center gap-1 p-2"
        :class="{ 'outline outline-primary-600': filterForm.category == category.slug }"
        :key="category.id"
      >
        <img class="w-10 rounded" v-lazy="category.preview" alt="preview" />
        <p class="text-sm">{{ category.title }}</p>
      </button>
    </div>

    <div
      v-if="projects.data?.length > 0"
      class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="(project, index) in projects.data"
        :key="index"
        class="card shadow hover:shadow-lg"
      >
        <div
          class="relative h-80 overflow-hidden rounded-t-lg bg-cover bg-center"
          :style="{
            backgroundImage: `url(${project.cover_image ?? project.preview})`
          }"
        >
          <a
            target="_blank"
            :href="`/projects/${project.slug}`"
            class="flex h-full w-full flex-col justify-end font-bold"
          >
            <div class="bg-gradient-to-b from-transparent to-black/80 p-5">
              <h4 class="text-white">{{ project.title }}</h4>
              <h6 class="text-white">{{ project.address }}</h6>
            </div>
          </a>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-2 gap-8 pb-0">
            <div>
              <p>{{ trans('Profit Range') }}</p>
              <p class="font-bold">
                {{ project.min_profit_return }}% - {{ project.max_profit_return }}%
              </p>
            </div>
            <div>
              <p>{{ trans('Loss Range') }}</p>
              <p class="font-bold">{{ project.loss_min_range }}% - {{ project.loss_max_range }}%</p>
            </div>
          </div>
          <hr class="my-5 opacity-50" />
          <div class="grid grid-cols-2 gap-8 pt-0">
            <div>
              <p>{{ trans('Invest') }}</p>
              <p class="font-bold">
                {{ formatCurrency(project.invest_amount) }}/{{ trans('unit') }}
              </p>
            </div>
            <div>
              <p>{{ trans('Units') }}</p>
              <p class="font-bold">{{ project.total_units }}</p>
            </div>
            <div>
              <p>{{ trans('Return For') }}</p>
              <p class="font-bold">
                <template v-for="(duration, i) in project.duration_ranges" :key="duration">
                  {{ duration.duration }}
                  <template v-if="project.duration_ranges.length - 1 !== i">, </template>
                </template>
              </p>
            </div>
            <div>
              <p>{{ trans('Category') }}</p>
              <p class="font-bold">{{ project.category?.title }}</p>
            </div>
          </div>

          <div class="mt-6 flex gap-5">
            <a
              target="_blank"
              :href="`/projects/${project.slug}`"
              class="btn btn-primary w-full py-3"
              >{{ trans('Invest Now') }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <NoDataFound v-else />
    <Paginate :links="projects.links" />
  </main>
</template>