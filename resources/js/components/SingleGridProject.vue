<script setup>
import moment from "moment";
import sharedComposable from "@/composables/sharedComposable";
const { formatCurrency } = sharedComposable();
defineProps(["project"]);
</script>

<template>
  <Link
    class="bg-white shadow-box2 rounded-[8px] transition duration-100 hover:shadow-sm"
    :href="route('projects.show', project.slug)"
  >
    <div class="course-thumb h-[248px] rounded-t-[8px] relative">
      <img
        v-lazy="project.preview"
        alt=""
        class="w-full h-full object-cover rounded-t-[8px]"
      />
      <span
        class="absolute px-3 py-1 text-lg font-semibold text-white rounded bg-secondary left-6 top-6"
        >{{ project.category?.title }}</span
      >
    </div>
    <div class="p-8 course-content">
      <div class="mb-3 text-2xl font-bold text-secondary">
        {{ formatCurrency(project.invest_amount) }}
      </div>
      <h4 class="mb-3 text-xl font-bold">{{ project.title }}</h4>
      <div class="flex flex-wrap justify-between space-y-1 xl:space-y-0">
        <span class="flex items-center space-x-2">
          <img src="/assets/images/svg/user2.svg" alt="" />
          <span>{{ project.total_units }} {{ trans("units") }}</span>
        </span>
        <span class="flex items-center space-x-2">
          <img src="/assets/images/svg/file2.svg" alt="" />
          <span>{{ moment(project.expire_date).format("D-M-Y") }}</span>
        </span>
      </div>
    </div>
  </Link>
</template>
