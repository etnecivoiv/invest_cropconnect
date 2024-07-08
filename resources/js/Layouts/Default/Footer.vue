<script setup>
import { useForm, usePage } from '@inertiajs/vue3'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import footerComposable from '@/composables/footerComposable'
const headerFooter = usePage().props.headerFooter

const { footerRight, footerLeft, year, socials, NEWSLETTER_API } = footerComposable()

const subscribeForm = useForm({
  email: ''
})

const subscribe = () => {
  if (!subscribeForm.email) {
    subscribeForm.email.focus()

    return
  }

  subscribeForm.post(route('newsletter.subscribe'), {
    preserveScroll: true
  })
}
</script>

<template>
  <footer
    class="bg-black bg-[url('../images/all-img/footer-bg-1.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="section-padding container">
      <div class="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        <div class="single-footer">
          <div class="lg:max-w-[270px]">
            <Link href="/" class="mb-10 block max-w-[150px]">
              <img v-lazy="$page.props?.primaryData?.logo" alt="" />
            </Link>
            <p>{{ headerFooter?.footer?.description }}</p>
            <ul class="flex space-x-4 pt-8">
              <li v-for="(social, key) in socials" :key="key">
                <a
                  v-if="social"
                  :href="social"
                  target="_blank"
                  class="hover:bg-primary flex h-12 w-12 flex-col items-center justify-center rounded bg-white bg-opacity-[0.08] text-2xl text-white transition hover:text-white"
                >
                  <iconify-icon :icon="`bxl:${key}`"></iconify-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="single-footer">
          <div class="flex space-x-[80px]">
            <div class="flex-1 lg:flex-none">
              <h4 class="mb-8 text-2xl font-bold text-white">
                {{ footerLeft?.name ? footerLeft.name : trans('Links') }}
              </h4>
              <ul class="list-item space-y-5" v-if="footerLeft && footerLeft?.data">
                <li v-for="item in JSON.parse(footerLeft?.data)" :key="item.id">
                  <Link v-if="item.href" :href="item.href" :target="item.target">
                    {{ item.text }}
                  </Link>
                </li>
              </ul>
            </div>
            <div class="flex-1 lg:flex-none">
              <h4 class="mb-8 text-2xl font-bold text-white">
                {{ footerRight?.name ? footerRight.name : 'Legal' }}
              </h4>
              <ul class="list-item space-y-5" v-if="footerRight && footerRight?.data">
                <li v-for="item in JSON.parse(footerRight?.data)" :key="item.id">
                  <Link v-if="item.href" :href="item.href" :target="item.target">
                    {{ item.text }}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="single-footer col-span lg:col-span-1"
          v-if="NEWSLETTER_API || Object.entries($page.props.languages)?.length > 1"
        >
          <template v-if="NEWSLETTER_API">
            <h4 class="mb-8 text-2xl font-bold text-white">
              {{ trans('Newsletter') }}
            </h4>
            <div class="mb-8">
              {{ trans('Subscribe for our newsletter') }}
            </div>
            <form @submit.prevent="subscribe">
              <div
                class="shadow-e1 mb-4 flex items-center rounded-md bg-white py-[10px] pl-6 pr-[10px]"
              >
                <div class="flex-none">
                  <span class="">
                    <img src="assets/images/icon/mail.svg" alt="" />
                  </span>
                </div>
                <div class="flex-1">
                  <input
                    type="email"
                    v-model="subscribeForm.email"
                    :placeholder="trans('Enter your mail')"
                    class="border-none focus:ring-0"
                    required
                  />
                </div>
              </div>
              <small class="text-red-600">{{ subscribeForm.errors.email }}</small>
              <button type="submit" class="btn btn-primary block w-full text-center">
                {{ trans('Subscribe Now') }}
              </button>
            </form>
          </template>

          <template v-if="Object.entries($page.props.languages)?.length > 1">
            <h4 class="footer-title fs-6 mb-2 mt-2">{{ trans('Language') }}</h4>
            <LanguageSwitch />
          </template>
        </div>
      </div>
    </div>
    <div
      class="container border-t border-white border-opacity-[0.1] py-8 text-center text-base"
      v-html="$page.props.primaryData?.copyright_text"
    ></div>
  </footer>
</template>
