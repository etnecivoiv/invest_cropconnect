<script setup>
import moment from "moment";
import sharedComposable from "@/composables/sharedComposable";
const { formatCurrency } = sharedComposable();
defineProps(["project"]);
</script>

<template>
  <Link
    class="hover:border-primary hover:shadow-box6 space-y-6 rounded-[8px] border-b-4 border-transparent bg-white p-8 transition duration-150 sm:flex sm:space-x-6 sm:space-y-0"
    :href="route('projects.show', project.slug)"
  >
    <div class="flex-none">
      <div class="relative h-[159px] rounded sm:w-[159px]">
        <img v-lazy="project.preview" alt="" class="object-cover w-full h-full rounded" />
      </div>
    </div>
    <div class="flex-1 course-content">
      <div class="flex justify-between mb-2 font-bold text-primary text-1xl lg:text-2xl">
        <span class="inline-block">{{ formatCurrency(project.invest_amount) }}</span>
        <span class="flex space-x-1">
          <template v-for="item in 5">
            <iconify-icon
              v-if="item <= parseInt(project.reviews_avg_star)"
              icon="heroicons:star-20-solid"
              class="text-tertiary"
            ></iconify-icon>

            <iconify-icon
              v-else
              icon="heroicons:star-20-solid"
              class="text-[#E6E6E6]"
            ></iconify-icon>
          </template>
        </span>
      </div>
      <h4 class="lg:eading-[36px] text-1xl mb-4 font-bold lg:text-2xl">
        {{ project.title }}
      </h4>
      <div class="mb-4">
        <span class="px-2 py-1 text-white rounded bg-secondary">{{
          project.category?.title
        }}</span>
      </div>
      <div class="flex space-x-6">
        <span class="flex items-center space-x-2">
          <img src="/assets/images/svg/user2.svg" alt="" />
          <span>{{ project.total_units }} {{ trans("units") }}</span>
        </span>
        <span class="flex items-center space-x-2">
          <img src="/assets/images/svg/file2.svg" alt="" />
          <span>{{ moment(project.expire_date).format("DD-MMM-Y") }}</span>
        </span>
      </div>
    </div>
  </Link>
</template>
