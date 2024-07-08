<script setup>
import { onMounted } from 'vue'
import { useForm, usePage } from '@inertiajs/vue3'
import NavMenu from '@/Layouts/Default/Common/NavMenu.vue'
import sharedComposable from '@/composables/sharedComposable'

const { authUser, getQueryParams } = sharedComposable()
const headerFooter = usePage().props.headerFooter
const socials = usePage().props.primaryData['socials']
const request = getQueryParams()

const form = useForm({
  s: request.s || ''
})

onMounted(() => {
  document.querySelector('.menu-click').addEventListener('click', function (event) {
    document.querySelector('.openmobile-menu').classList.toggle('active-mobile-menu')
    document.querySelector('.rt-mobile-menu-overlay').classList.add('active')
    event.preventDefault()
  })

  document
    .querySelector('.rt-mobile-menu-close, .rt-mobile-menu-overlay')
    .addEventListener('click', function (event) {
      document.querySelector('.openmobile-menu').classList.remove('active-mobile-menu')
      document.querySelector('.rt-mobile-menu-overlay').classList.remove('active')
      event.preventDefault()
    })
})

const searchProject = () => {
  form.get(route('projects.index'))
}
</script>

<template>
  <!-- <header class="site-header">
    <div class="bg-primary hidden py-3 text-white md:block">
      <div class="container">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ul
            class="flex justify-center divide-x divide-white divide-opacity-25 text-base lg:justify-start"
          >
            <li class="mr-4">{{ headerFooter?.header?.top_text }}</li>
            <li class="pl-4">
              <a href="mailto:info@cropconnect.ph">{{ headerFooter?.header?.top_text2 }}</a>
            </li>
          </ul>
          <ul
            class="flex items-center justify-center divide-x divide-white divide-opacity-25 text-base lg:justify-end"
          >
            <li class="px-2">{{ trans('Follow Us On') }}:</li>

            <li v-for="(social, key) in socials" :key="key">
              <a v-if="social" :href="social" target="_blank" class="px-2 text-lg">
                <iconify-icon :icon="`bxl:${key}`"></iconify-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-header header-normal2 rt-sticky top-0 z-[999] w-full py-8">
      <div class="container">
        <div class="flex items-center justify-between">
          <Link href="/" class="h-16 w-32 flex-none md:w-52">
            <img
              class="h-full w-full object-contain"
              v-lazy="$page.props.primaryData.deep_logo"
              alt=""
            />
          </Link>
          <div class="flex flex-1 items-center">
            <div class="main-menu relative flex-1">
              <ul class="menu-active-classes">
                <NavMenu />
              </ul>
              <div class="hidden lg:block">
                <div class="border-gray modal-search h-[46px] rounded-md border">
                  <input
                    v-model="form.s"
                    @keyup.enter="searchProject"
                    type="text"
                    class="block h-full w-full rounded-md border-none ring-0 focus:outline-none focus:ring-0"
                    placeholder="Search.."
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-none space-x-[18px]">
              <div>
                <button
                  type="button"
                  class="modal-trigger flex h-10 w-10 flex-col items-center justify-center rounded bg-white md:h-[56px] md:w-[56px]"
                >
                  <img src="/assets/images/svg/search.svg" alt="" />
                </button>
              </div>
              <div class="block lg:hidden">
                <button
                  type="button"
                  class="menu-click flex h-10 w-10 flex-col items-center justify-center rounded bg-white text-3xl md:h-[56px] md:w-[56px]"
                >
                  <iconify-icon icon="cil:hamburger-menu" rotate="180deg"></iconify-icon>
                </button>
              </div>
              <div class="hidden lg:block">
                <template v-if="authUser">
                  <a
                    :href="
                      authUser.role == 'admin' ? route('admin.dashboard') : route('user.dashboard')
                    "
                    class="btn bg-black px-8 py-[15px] text-white"
                    >{{ trans('Dashboard') }}</a
                  >
                </template>
                <Link
                  v-else
                  :href="route('login')"
                  class="btn bg-black px-8 py-[15px] text-white"
                  >{{ authUser ? trans('Dashboard') : trans('Login') }}</Link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container">
    <div class="block lg:hidden">
      <div class="border-gray modal-search h-[46px] rounded-md border">
        <input
          type="text"
          v-model="form.s"
          @keyup.enter="searchProject"
          class="block h-full w-full rounded-md border-none ring-0 focus:outline-none focus:ring-0"
          placeholder="Search.."
        />
      </div>
    </div>
  </div>
  <div
    class="openmobile-menu shadow-box2 fixed top-0 z-[999] flex h-screen w-[320px] flex-col overflow-y-auto bg-white pb-6 pt-10 lg:hidden"
  >
    <div class="flex flex-none justify-between px-6">
      <Link href="/" class="brand-logo mr-10 max-w-[120px] flex-none">
        <img v-lazy="$page.props.primaryData.deep_logo" alt="" />
      </Link>
      <span class="rt-mobile-menu-close cursor-pointer text-3xl text-black">
        <iconify-icon icon="fe:close"></iconify-icon>
      </span>
    </div>
    <div class="mobile-menu mt-6 flex-1">
      <ul class="menu-active-classes">
        <NavMenu />
      </ul>
    </div>
    <div class="flex-none pb-4">
      <div class="mb-2 text-center font-semibold text-black">
        {{ trans('Follow Us') }}
      </div>
      <ul class="flex justify-center space-x-4">
        <li v-for="(social, key) in socials" :key="key">
          <a v-if="social" :href="social" target="_blank" class="px-2 text-lg">
            <iconify-icon :icon="`bxl:${key}`"></iconify-icon>
          </a>
        </li>
      </ul>
    </div>
  </div> -->
</template>
