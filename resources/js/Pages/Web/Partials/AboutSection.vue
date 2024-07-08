<script setup>
import { usePage } from '@inertiajs/vue3';
const about_section = usePage().props.primaryData?.about_section ?? {}

const getParsedText = (text, className = "shape-bg") => {
  if (text && text.length) {
    return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`)
  }
  return text
}
</script>

<template>
  <div class="about-area section-padding">
    <div class="container">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-6 xl:col-span-7">
          <img
            v-lazy="about_section.image"
            alt=""
            class="block w-full"
          />
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-5">
          <div class="mini-title">{{ about_section?.top_title }}</div>
          <h4 class="column-title">
            <div v-html="getParsedText(about_section?.title ?? '')" />
          </h4>
          <div class="mb-8">
            {{ about_section?.text }}
          </div>
          <div class="space-y-8">
            <div
              class="progressbar-group"
              v-for="(feature, index) in about_section?.features ?? []"
            >
              <div class="flex justify-between" :data-width="`${feature.percent}%`">
                <span class="block mb-2 font-semibold text-black">{{
                  feature.text
                }}</span>
                <span class="block mb-2 font-semibold text-black"
                  >{{ feature.percent }}%</span
                >
              </div>
              <div
                class="relative h-[6px] overflow-hidden rounded-[2px] bg-black bg-opacity-10"
              >
                <div
                  class="ani absolute left-0 top-1/2 block h-[6px] -translate-y-1/2"
                  :data-progress="feature.percent"
                  :style="{
                    backgroundColor: feature.color ?? '#ff0000',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
