<script setup>
import { usePage } from '@inertiajs/vue3';

const achievement = usePage().props.primaryData?.achievement ?? {}

const getParsedText = (text, className = "shape-bg") => {
  if (text && text.length) {
    return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`)
  }
  return text
}
</script>

<template>
  <div class="section-padding">
    <div class="container">
      <div class="text-center">
        <div class="mini-title">{{ achievement.top_title }}</div>
        <div class="column-title" v-html="getParsedText(achievement.title)"></div>
      </div>

      <div class="grid grid-cols-1 gap-[30px] pt-10 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="item in achievement.counters ?? []"
          class="shadow-box7 relative my-4 rounded-[8px] bg-white px-[50px] pb-8 pt-[64px] text-center"
        >
          <img
            v-lazy="item.icon ?? '/assets/images/icon/counter-1.svg'"
            alt=""
            class="absolute -translate-x-1/2 -top-10 left-1/2"
          />
          <h4 class="mb-1 text-[44px] font-bold leading-[66px] text-black">
            <span class="counter"> {{ item.counter }} </span>
          </h4>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
