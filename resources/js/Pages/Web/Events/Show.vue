<script setup>
import { Head } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import moment from 'moment'
import { onMounted } from 'vue'
import sharedComposable from '@/composables/sharedComposable'
import trans from '@/composables/transComposable'
const { formatCurrency, socialShare } = sharedComposable()

defineOptions({ layout: DefaultLayout })
const props = defineProps(['event', 'isBooked', 'isExpired'])
onMounted(() => {
  if (document.getElementById('timer')) {
    var countDownDate = new Date(props.event.start_at).getTime() // Update the count down every 1 second

    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime() // Find the distance between now and the count down date

      var distance = countDownDate - now // Time calculations for days, hours, minutes and seconds

      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000) // Display the result in the element with id="demo"

      document.getElementById('timer').innerHTML =
        "<div class='text-[44px] font-bold'>" +
        days +
        "<div class='mt-2 text-lg font-medium capitalize '>days</div></div>" +
        "<div class='text-[44px] font-bold'>" +
        hours +
        "<div class='mt-2 text-lg font-medium capitalize'>hours</div></div>" +
        "<div class='text-[44px] font-bold'>" +
        minutes +
        "<div class='mt-2 text-lg font-medium capitalize'>minutes</div></div>" +
        "<div class='text-[44px] font-bold'>" +
        seconds +
        "<div class='mt-2 text-lg font-medium capitalize'>seconds</div></div>" // If the count down is finished, write some text

      if (distance < 0) {
        clearInterval(x)
        document.getElementById('timer').innerHTML = trans('This is event was closed')
      }
    }, 1000)
  }
})
</script>

<template>
  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ event.title }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans('Home') }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ event.title }}</li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="nav-tab-wrapper tabs section-padding">
    <div class="container">
      <img v-lazy="event.preview" alt="" class="mb-6 block w-full lg:mb-10" />
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-secondary mb-10 rounded-md p-10 text-white">
            <div
              id="timer"
              class="justify-between space-y-4 text-center md:flex md:space-y-0"
            ></div>
          </div>

          <h3>{{ event.title }}</h3>
          <div class="my-4 lg:my-6" v-html="event.body"></div>

          <div class="mt-10 flex justify-between border-y border-[#ECECEC] py-4 md:mt-12">
            <div class="font-semibold text-black">{{ trans('Share') }}</div>
            <ul class="flex items-center space-x-3 lg:justify-end">
              <li v-for="media in ['facebook', 'twitter', 'instagram', 'pinterest']" :key="media">
                <a target="_blank" :href="socialShare(media)" class="flex h-10 w-10">
                  <img v-lazy="`/assets/images/icon/${media}.svg`" :alt="media + ' icon'" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="relative col-span-12 lg:col-span-4 lg:-mt-20">
          <div class="sidebarWrapper mx-auto max-w-[90%] space-y-[30px]">
            <div class="wdiget custom-text space-y-5">
              <h4 class="widget-title">{{ trans('Event Details') }}</h4>
              <ul class="list space-y-6">
                <li class="flex space-x-3">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/svg/circle-clock.svg" alt="" />
                    <div>{{ event?.start_at_time?.time }}</div>
                  </div>
                </li>

                <li class="flex space-x-3">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/svg/circle-c.svg" alt="" />
                    <div>{{ moment(event.start_at).format('MMM DD, Y') }}</div>
                  </div>
                </li>

                <li class="flex space-x-3">
                  <div class="flex flex-1 space-x-3">
                    <span
                      class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="16"
                        height="16"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                        class=""
                      >
                        <g>
                          <path
                            d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z"
                            fill="#30bead"
                            opacity="1"
                            data-original="#000000"
                            class=""
                          ></path>
                          <path
                            d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z"
                            fill="#30bead"
                            opacity="1"
                            data-original="#000000"
                            class=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <div>{{ event.location }}</div>
                  </div>
                </li>

                <li class="flex space-x-3">
                  <div class="flex flex-1 space-x-3">
                    <span
                      class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="16"
                        height="16"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                        class=""
                      >
                        <g>
                          <path
                            d="M467 76H45C20.137 76 0 96.262 0 121v270c0 24.885 20.285 45 45 45h422c24.655 0 45-20.03 45-45V121c0-24.694-20.057-45-45-45zm-6.302 30L287.82 277.967c-8.5 8.5-19.8 13.18-31.82 13.18s-23.32-4.681-31.848-13.208L51.302 106h409.396zM30 384.894V127.125L159.638 256.08 30 384.894zM51.321 406l129.587-128.763 22.059 21.943c14.166 14.166 33 21.967 53.033 21.967s38.867-7.801 53.005-21.939l22.087-21.971L460.679 406H51.321zM482 384.894 352.362 256.08 482 127.125v257.769z"
                            fill="#30bead"
                            opacity="1"
                            data-original="#000000"
                            class=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <div>{{ event.email }}</div>
                  </div>
                </li>

                <li class="flex space-x-3">
                  <div class="flex flex-1 space-x-3">
                    <span
                      class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="16"
                        height="16"
                        x="0"
                        y="0"
                        viewBox="0 0 473.806 473.806"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                        class=""
                      >
                        <g>
                          <path
                            d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zM256.056 112.706c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zM473.256 209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z"
                            fill="#30bead"
                            opacity="1"
                            data-original="#000000"
                            class=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <div>{{ event.phone }}</div>
                  </div>
                </li>

                <li class="flex space-x-3" v-if="!event.is_free">
                  <div class="flex flex-1 space-x-3">
                    <span
                      class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e8f6f4]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="16"
                        height="16"
                        x="0"
                        y="0"
                        viewBox="0 0 511.995 511.995"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                        class=""
                      >
                        <g>
                          <path
                            d="M278.622 224.006V110.243a151.685 151.685 0 0 1 66.901 29.087 23.943 23.943 0 0 0 13.251 4.201c15.222 0 27.633-12.249 27.794-27.471a24.674 24.674 0 0 0-7.11-17.452 170.544 170.544 0 0 0-101.159-40.722V19.749c0-10.892-8.823-19.715-19.715-19.715-.226-.032-.453-.032-.679-.032-11.053-.162-20.167 8.662-20.329 19.747v36.844c-72.718 5.171-122.166 50.095-122.166 109.885 0 73.364 62.376 93.726 122.166 109.885V405.64c-31.544-4.234-61.277-17.323-85.646-37.813-4.589-3.652-10.278-5.688-16.16-5.817-14.899 1.034-26.372 13.509-26.179 28.441a24.674 24.674 0 0 0 7.11 17.452 190.344 190.344 0 0 0 121.197 48.802v35.551c0 .226.032.453.032.679.517 11.053 9.922 19.585 20.975 19.036 10.892 0 19.715-8.823 19.715-19.715v-36.197c88.231-5.817 123.782-59.467 123.782-116.349.002-76.274-63.989-99.544-123.78-115.704zM237.9 213.664c-35.228-10.342-62.699-21.007-62.699-51.064s24.886-51.711 62.699-54.619v105.683zm40.722 192.622V288.645c36.521 10.342 64.961 24.239 64.638 58.174 0 24.563-16.806 53.65-64.638 59.467z"
                            fill="#30bead"
                            opacity="1"
                            data-original="#000000"
                            class=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <div>
                      {{ trans('Fee: ') }}
                      <strong>{{ formatCurrency(event.fee_amount) }}</strong>
                    </div>
                  </div>
                </li>
              </ul>
              <button v-if="isExpired" class="text-lg" disabled></button>

              <Link
                v-else
                :href="route('events.book', event.slug)"
                class="btn btn-primary btn-md text-lg"
                >{{ trans('Book A Seat') }}</Link
              >
            </div>

            <div class="wdiget">
              <h4 class="widget-title">{{ trans('Special Guests') }}</h4>
              <ul class="list space-y-6">
                <li
                  v-for="guest in event.guests"
                  class="flex space-x-4 border-[#ECECEC]"
                  :key="guest.name"
                >
                  <div class="flex-none">
                    <div class="h-20 w-20 rounded-full">
                      <img
                        v-lazy="guest.preview"
                        alt=""
                        class="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="mb-1 font-bold capitalize text-black">
                      {{ guest.name }}
                    </div>
                    <span class="text-primary font-semibold">{{ guest.designation }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
