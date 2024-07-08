<script setup>
import { Head } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import UserLayout from '@/Layouts/User.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'
import sharedComposable from '@/composables/sharedComposable'
defineOptions({ layout: UserLayout })
const props = defineProps(['referLink', 'totalRefers', 'commissions', 'totalCommissions'])
const { formatCurrency, copyToClipboard, socialShare } = sharedComposable()
</script>

<template>
  <Head :title="trans('Affiliate Program')" />
  <main class="container flex-grow p-4 sm:p-6">
    <div class="space-y-6">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div class="card p-4">
          <div class="mb-6 mt-4 grid grid-cols-2 gap-20 p-3">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-sm dark:text-slate-200">{{ trans('COMMISSIONS') }}</p>

                <p class="text-sm tracking-wide text-slate-500">
                  {{ formatCurrency(totalCommissions) }}
                </p>
              </div>
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 bg-opacity-20 text-primary-500"
              >
                <i class="bx bx-dollar bx-sm"></i>
              </div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-sm dark:text-slate-200">{{ trans('SIGNUP') }}</p>

                <p class="text-sm tracking-wide text-slate-500">{{ totalRefers }}</p>
              </div>
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 bg-opacity-20 text-primary-500"
              >
                <i class="bx bxs-user-plus bx-sm"></i>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <h4>{{ trans('Want to get more credits?') }}</h4>
            <p class="text-sm opacity-50">
              {{ trans('Refer your friends and earn more rewards') }}
            </p>
          </div>

          <div class="mb-5">
            <div class="flex items-center rounded-md border border-gray-500 p-1">
              <i class="bx bxs-share-alt bx-sm rounded bg-gray-400 px-1 pb-0.5 pt-1 text-white"></i>
              <input type="text" :value="referLink" class="input border-0" id="myInput" readonly />
              <button class="btn btn-soft-primary" @click="copyToClipboard(referLink)">
                {{ trans('Copy') }}
              </button>
            </div>
            <i class="text-sm">{{ trans('Copy this url and share with others') }}</i>
          </div>

          <div class="grid grid-cols-2 items-center gap-y-1 text-sm text-white">
            <a
              class="resp-sharing-button__link"
              :href="socialShare('facebook', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on Facebook"
            >
              <div
                class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path
                    d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
                    fill="currentColor"
                  />
                </svg>

                <p class="w-full text-center">{{ trans('Share on Facebook') }}</p>
              </div>
            </a>

            <!-- Sharing button Twitter -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('twitter', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on Twitter"
            >
              <div
                class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path
                    d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m12.71 6.33c.48-.4 1.04-.88 1.29-1.41c-.41.21-.9.34-1.44.41c.5-.36.91-.83 1.12-1.47c-.52.28-1.05.52-1.71.64c-1.55-1.87-5.26-.35-4.6 2.45c-2.61-.16-4.2-1.34-5.52-2.79c-.75 1.22-.1 3.07.79 3.58c-.46-.03-.81-.17-1.14-.33c.04 1.54.89 2.28 2.08 2.68c-.36.07-.76.09-1.14.03c.37 1.07 1.14 1.74 2.46 1.88c-.9.76-2.56 1.29-3.9 1.08c1.15.73 2.46 1.31 4.28 1.23c4.41-.2 7.36-3.36 7.43-7.98z"
                    fill="currentColor"
                  />
                </svg>

                <p class="w-full text-center">{{ trans('Share on Twitter') }}</p>
              </div>
            </a>

            <!-- Sharingbutton Tumblr -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('tumblr', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on Tumblr"
            >
              <div
                class="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                  <mask id="ipSTumblr0">
                    <g fill="none">
                      <path
                        fill="#fff"
                        stroke="#fff"
                        stroke-width="4"
                        d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"
                      />
                      <path
                        fill="#000"
                        d="M15 22v-5h5v-3l6-2v5h5v5h-5v7s0 1.5 2 2s5-1 5-1l-2 6h-5c-3.5 0-6-3.5-6-6v-8h-5Z"
                      />
                    </g>
                  </mask>
                  <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSTumblr0)" />
                </svg>

                <p class="w-full text-center">{{ trans('Share on Tumblr') }}</p>
              </div>
            </a>

            <!-- Sharing button E-Mail -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('email', referLink)"
              target="_self"
              rel="noopener"
              aria-label="Share by E-Mail"
            >
              <div
                class="resp-sharing-button resp-sharing-button--email resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.313t.1-.412q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037Z"
                  />
                </svg>

                <p class="w-full text-center">{{ trans('Share on E') }}-Mail</p>
              </div>
            </a>

            <!-- Sharing button Pinterest -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('pinterest', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on Pinterest"
            >
              <div
                class="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path
                    d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9.29c.4-.67.9-1.62 1.1-2.36l.66-2.3c.31.61 1.23 1.11 2.17 1.11c2.95 0 5-2.67 5-6c0-3.17-2.58-5.56-5.92-5.56c-4.16 0-6.33 2.78-6.33 5.83c0 1.42.72 3.17 1.94 3.73c.17.11.28.05.28-.11l.28-1.06c.03-.14.03-.22-.06-.28c-.44-.55-.72-1.39-.72-2.22c0-2.14 1.61-4.17 4.34-4.17c2.39 0 4.05 1.58 4.05 3.89c0 2.61-1.33 4.45-3.05 4.45c-.98 0-1.64-.84-1.48-1.78c.28-1.14.84-2.34.84-3.17c0-.78-.39-1.39-1.23-1.39c-.94 0-1.77 1-1.77 2.34c0 .88.27 1.44.27 1.44l-1.11 4.78c-.16.83-.08 2.08 0 2.83H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                    fill="currentColor"
                  />
                </svg>

                <p class="w-full text-center">{{ trans('Share on Pinterest') }}</p>
              </div>
            </a>

            <!-- Sharingbutton LinkedIn -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('linkedin', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on LinkedIn"
            >
              <div
                class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--large flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32Zm-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43Zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"
                  />
                </svg>
                <p class="w-full text-center">{{ trans('Share on LinkedIn') }}</p>
              </div>
            </a>

            <!-- Sharing button WhatsApp -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('whatsapp', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on WhatsApp"
            >
              <div
                class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.99 6.547a10.59 10.59 0 0 0-.103-1.282a4.312 4.312 0 0 0-.363-1.09A3.853 3.853 0 0 0 19.83 2.48a4.299 4.299 0 0 0-1.083-.362a10.523 10.523 0 0 0-1.292-.105c-.183-.007-.42-.01-.53-.01L7.077 2c-.11 0-.347.003-.53.01a10.565 10.565 0 0 0-1.282.103a4.312 4.312 0 0 0-1.09.363A3.854 3.854 0 0 0 2.48 4.17a4.303 4.303 0 0 0-.362 1.083a10.545 10.545 0 0 0-.106 1.292c-.006.183-.01.42-.01.53L2 16.923c0 .11.003.347.01.53a10.565 10.565 0 0 0 .103 1.282a4.313 4.313 0 0 0 .363 1.09A3.854 3.854 0 0 0 4.17 21.52a4.305 4.305 0 0 0 1.083.362a10.52 10.52 0 0 0 1.292.105c.183.007.42.01.53.01l9.848.002c.11 0 .347-.003.53-.01a10.578 10.578 0 0 0 1.282-.103a4.316 4.316 0 0 0 1.09-.363a3.854 3.854 0 0 0 1.696-1.694a4.301 4.301 0 0 0 .362-1.083a10.533 10.533 0 0 0 .106-1.292c.006-.183.01-.42.01-.53L22 7.077c0-.11-.003-.347-.01-.53Zm-9.773 12.41h-.003a7.126 7.126 0 0 1-3.407-.868l-3.78.991l1.012-3.693a7.13 7.13 0 1 1 6.178 3.57Z"
                  />
                  <path
                    fill="currentColor"
                    d="M12.22 5.901a5.927 5.927 0 0 0-5.023 9.076l.141.224l-.599 2.186l2.243-.588l.216.128a5.918 5.918 0 0 0 3.016.826h.003A5.926 5.926 0 0 0 12.219 5.9Zm3.484 8.47a1.834 1.834 0 0 1-1.202.847a2.443 2.443 0 0 1-1.122-.07a10.276 10.276 0 0 1-1.015-.376a7.94 7.94 0 0 1-3.043-2.689a3.463 3.463 0 0 1-.728-1.842a1.997 1.997 0 0 1 .624-1.485a.655.655 0 0 1 .475-.223c.118 0 .237 0 .341.006c.11.005.256-.042.4.306c.15.356.506 1.233.55 1.322a.328.328 0 0 1 .015.312a1.216 1.216 0 0 1-.178.297c-.09.104-.187.232-.267.312c-.09.089-.182.185-.079.363a5.366 5.366 0 0 0 .991 1.234a4.863 4.863 0 0 0 1.433.884c.178.09.282.074.386-.045s.445-.52.564-.698s.237-.148.4-.089s1.04.49 1.218.58s.297.133.341.207a1.488 1.488 0 0 1-.104.847Z"
                  />
                </svg>

                <p class="w-full text-center">{{ trans('Share on WhatsApp') }}</p>
              </div>
            </a>

            <!-- Sharing button Telegram -->
            <a
              class="resp-sharing-button__link"
              :href="socialShare('telegram', referLink)"
              target="_blank"
              rel="noopener"
              aria-label="Share on Telegram"
            >
              <div
                class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--large flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01c-.378.15-.577.298-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294c.26.006.549-.1.868-.32c2.179-1.471 3.304-2.214 3.374-2.23c.05-.012.12-.026.166.016c.047.041.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817c-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088c.327.216.589.393.85.571c.284.194.568.387.936.629c.093.06.183.125.27.187c.331.236.63.448.997.414c.214-.02.435-.22.547-.82c.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315a.337.337 0 0 0-.114-.217a.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"
                  />
                </svg>
                <p class="w-full text-center">{{ trans('Share on Telegram') }}</p>
              </div>
            </a>
          </div>
        </div>
        <div class="p-5">
          <div
            class="mb-4 flex max-w-max items-center gap-1 border-b-2 border-primary-600 px-4 pb-2"
          >
            <i class="bx bx-award bx-sm text-primary-500"></i>
            <p class="font-semibold">{{ trans('Commissions') }}</p>
          </div>
          <div class="flex flex-col gap-y-5" v-if="commissions.data.length > 0">
            <div
              class="card flex items-center justify-between p-4"
              v-for="commission in commissions.data"
              :key="commission.id"
            >
              <div class="flex items-center gap-5">
                <div class="rounded bg-gray-700/50 p-4">
                  <i class="bx bx-dollar-circle bx-md"></i>
                </div>
                <div class="">
                  <p class="text-xl font-semibold">
                    {{ formatCurrency(commission.commission_amount) }}
                  </p>
                  <p class="text-xs opacity-50">
                    {{ moment(commission.created_at).format('DD MMM, YYYY') }}
                  </p>
                </div>
              </div>
              <span
                class="badge"
                :class="commission.status == 1 ? 'badge-success' : 'badge-danger'"
              >
                {{ commission.status == 1 ? trans('Approved') : trans('Rejected') }}
              </span>
            </div>
          </div>
          <NoDataFound v-else />
          <Paginate :links="commissions.links" />
        </div>
      </div>
    </div>
  </main>
</template>


