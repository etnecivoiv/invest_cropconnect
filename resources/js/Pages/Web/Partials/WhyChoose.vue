<script setup>
import { usePage } from "@inertiajs/vue3"
const why_choose = usePage().props.primaryData?.why_choose ?? {}
const getParsedText = (text, className = "text-primary") => {
  if (text && text.length) {
    return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`)
  }
  return text
}
</script>

<template>
  <div
    class="about-area section-padding bg-[url('../images/all-img/section-bg-8.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container">
      <div class="grid-cols-12 space-y-6 lg:grid lg:gap-10 lg:space-y-0">
        <div class="col-span-12 lg:col-span-6 xl:col-span-5">
          <div class="mini-title">{{ why_choose.top_title }}</div>
          <h4
            class="column-title"
            v-html="getParsedText(why_choose.title, 'shape-bg')"
          ></h4>
          <div class="mb-8">
            {{ why_choose.text }}
          </div>
          <div>
            <div class="grid grid-cols-1 gap-[30px] md:block lg:grid-cols-2">
              <div
                v-for="item in why_choose.features"
                :key="item.id"
                class="p-6 bg-white rounded shadow-box7"
              >
                <div>
                  <img v-lazy="item.icon" alt="" />
                </div>
                <div class="mt-3 font-semibold leading-[27px] text-black">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-7">
          <img v-lazy="why_choose.image" alt="" class="block object-contain w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
