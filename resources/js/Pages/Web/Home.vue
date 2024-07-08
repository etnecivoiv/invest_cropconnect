<script setup>
import BlankLayout from '@/Layouts/Blank.vue'
import AboutSection from '@/Pages/Web/Partials/AboutSection.vue'
import AchievementSection from '@/Pages/Web/Partials/AchievementSection.vue'
import WhyChoose from '@/Pages/Web/Partials/WhyChoose.vue'
import DefaultHeader from '@/Layouts/Default/Header.vue'
import DefaultFooter from '@/Layouts/Default/Footer.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import sharedComposable from '@/composables/sharedComposable'
import moment from 'moment'
import { usePage } from '@inertiajs/vue3'
defineOptions({ layout: BlankLayout })

const { formatCurrency } = sharedComposable()
const props = defineProps(['home', 'blogs', 'categories', 'projects', 'brands','youtube_id'])

const achievement = usePage().props.primaryData?.achievement ?? {}

const { hero } = props.home ?? {
  hero: {}
}

const getParsedText = (text, className = 'text-primary') => {
  if (text && text.length) {
    return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`)
  }
  return text
}


const viewVideoSection = ref(false)

const showVideo = () => {
  viewVideoSection.value = true
  document.getElementById('overlay').style.display = 'block'
  document.getElementById('videoPopup').style.display = 'block'
  setTimeout(function () {
    document.getElementById('overlay').style.opacity = 1
    document.getElementById('videoPopup').style.opacity = 1
  }, 10)
}

const hideVideo = () => {
  document.getElementById('overlay').style.opacity = 0
  document.getElementById('videoPopup').style.opacity = 0
  setTimeout(function () {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('videoPopup').style.display = 'none'
    viewVideoSection.value = false
  }, 300)
}

onMounted(() => {
  $(document).ready(function () {
    $('.progressbar-group .ani').each(function () {
      $(this).animate(
        {
          width: $(this).attr('data-progress') + '%'
        },
        1000
      )
    })
    var dataWidth = document.querySelectorAll('[data-width]')
    dataWidth.forEach(function (item) {
      item.style.maxWidth = item.getAttribute('data-width')
    })
  })
})
</script>

<template>
  <section
    class="overflow-hidden bg-[url('../images/banner/2.png')] bg-cover bg-center bg-no-repeat xl:min-h-screen xl:pb-[130px]">
    <DefaultHeader />
    <div class="container relative">
      <div class="space-y-6 py-14 md:py-20 lg:space-y-10 lg:py-28 xl:max-w-[570px] xl:pt-[129px]">
        <div
          class="text-5xl font-bold leading-[62px] text-black md:text-6xl md:leading-[72px] lg:text-[77px] lg:leading-[106.4px]">
          <div v-html="getParsedText(hero?.title)" />
        </div>
        <div class="plain-text text-gray border-primary border-l-2 pl-4 leading-[30px]">
          {{ hero?.subtitle }}
        </div>
        <div class="flex flex-col space-y-3 pt-5 md:flex-row md:space-x-4 md:space-y-0">
          <a :href="hero?.btn_link" class="btn btn-primary w-1/2 text-center md:w-auto">{{
            hero?.btn_text
            }}</a>
          <a :href="hero?.btn_link2" class="btn btn-black w-1/2 text-center md:w-auto">{{
            hero?.btn_text2
            }}</a>
        </div>
      </div>
      <div class="imge-box absolute right-[-60px] top-1/2 mt-[60px] hidden -translate-y-1/2 xl:block">
        <img v-lazy="hero?.image" alt="" />
      </div>
    </div>
  </section>

  <!-- category start -->
  <div
    class="feature-area section-padding bg-[url('../images/all-img/section-bg-6.png')] bg-cover bg-center bg-no-repeat">
    <div class="container">
      <div class="text-center">
        <div class="mini-title">{{ trans('Project Categories') }}</div>
        <div class="column-title">
          {{ trans('Browse Top') }}
          <span class="shape-bg">{{ trans('Categories') }}</span>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-[30px] pt-10 md:grid-cols-2 lg:grid-cols-3">
        <Link v-for="item in categories" :key="item.id"
          class="hover:shadow-box hover:border-primary flex space-x-5 rounded-[8px] border-l-4 border-white bg-white p-[30px] transition-all duration-300"
          :href="route('project-categories.show', item.slug)">
        <div class="relative h-[72px] w-[72px] rounded bg-white group-hover:bg-[#FFE8E8]">
          <img v-lazy="item.preview ?? '/assets/images/icon/ct1.svg'" alt=""
            class="h-full w-full rounded object-cover" />
        </div>
        <div class="course-content">
          <h4 class="text-1xl mb-2 font-bold lg:text-2xl">{{ item.title }}</h4>
          <p>{{ item.projects_count || 'no' }} {{ trans('projects') }}</p>
        </div>
        </Link>
      </div>
      <div class="pt-[70px] text-center">
        <Link href="/projects" class="btn btn-primary">{{ trans('View Projects') }}</Link>
      </div>
    </div>
  </div>
  <!-- about area start -->

  <AboutSection />

  <!-- course section start -->
  <div class="section-padding bg-[url('../images/all-img/section-bg-7.png')] bg-cover bg-center bg-no-repeat">
    <div class="container">
      <div class="text-center">
        <div class="mini-title">{{ trans('Featured Projects') }}</div>
        <div class="column-title">
          {{ trans('Choose Unlimited') }}
          <span class="shape-bg">{{ trans('Projects') }}</span>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-[30px] pt-5 lg:pt-10 xl:grid-cols-2">
        <Link v-for="project in projects" :key="project.id"
          class="hover:border-primary hover:shadow-box6 space-y-6 rounded-[8px] border-b-4 border-transparent bg-white p-8 transition duration-150 sm:flex sm:space-x-6 sm:space-y-0"
          :href="route('projects.show', project.slug)">
        <div class="flex-none">
          <div class="relative h-[159px] rounded sm:w-[159px]">
            <img v-lazy="project.preview" alt="" class="h-full w-full rounded object-cover" />
          </div>
        </div>
        <div class="course-content flex-1">
          <div class="text-primary text-1xl mb-2 flex justify-between font-bold lg:text-2xl">
            <span class="inline-block">{{ formatCurrency(project.invest_amount) }}</span>
          </div>
          <h4 class="lg:eading-[36px] text-1xl mb-4 font-bold lg:text-2xl">
            {{ project.title }}
          </h4>
          <div class="flex space-x-6">
            <span class="flex items-center space-x-2">
              <img src="/assets/images/svg/user2.svg" alt="" />
              <span>{{ project.total_units }} {{ trans('units') }}</span>
            </span>
            <span class="flex items-center space-x-2">
              <img src="/assets/images/svg/file2.svg" alt="" />
              <span>{{ moment(project.expire_date).format('D-M-Y') }}</span>
            </span>
          </div>
        </div>
        </Link>
      </div>
      <div class="pt-10 text-center lg:pt-16">
        <Link :href="route('projects.index')" class="btn btn-primary">{{
          trans('View All Projects')
        }}</Link>
      </div>
    </div>
  </div>

  <!-- Counter section start -->

  <AchievementSection />

  <div class="popup-video">
    <div class="overlay" id="overlay" @click="hideVideo"></div>
    <div class="popup" id="videoPopup">
      <iframe :src="`https://www.youtube.com/embed/${youtube_id}`" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

  <!-- video area -->
  <div class="video-area section-padding-bottom relative z-[1]">
    <div
      class="absolute bottom-0 left-0 z-[-1] h-[60%] w-full bg-[url('../images/all-img/section-bg-7.png')] bg-cover bg-center bg-no-repeat">
    </div>
    <div class="container">
      <div class="video-wrapper mb-20 lg:mb-[150px] xl:mb-[205px]">
        <div
          class="shadow-box8 relative mx-auto h-[400px] max-w-[1112px] rounded-lg bg-white p-6 lg:h-[500px] xl:h-[652px]">
          <img @click="showVideo" v-lazy="achievement.video_bg_img" alt="" class="block h-full w-full object-cover" />
          <div
            class="absolute left-1/2 top-1/2 mx-auto flex h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            <div class="absolute inline-flex h-full w-full animate-ping rounded-full ring-2 ring-white"></div>
            <a href="javascript:void(0)" @click="showVideo"
              class="text-primary z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-3xl">
              <iconify-icon icon="bi:play-fill"></iconify-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="mb-[50px] text-center text-2xl font-medium text-black">
        <span class="shape-bg mini">{{ trans('Trusted') }}</span>
        {{ trans('By 1000+ Companies') }}
      </div>

      <ul class="flex flex-wrap items-center justify-center lg:justify-between">
        <li v-for="brand in brands" :key="brand.id"
          class="mb-6 mr-6 grayscale-[80] transition duration-150 last:mb-0 last:mr-0 hover:grayscale-0">
          <div class="cursor-pointer"><img v-lazy="brand.slug" alt="" /></div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Why choose area start -->
  <WhyChoose />

  <!-- Article  Start  -->
  <div class="section-padding">
    <div class="container">
      <div class="text-center">
        <div class="mini-title">{{ trans('Blog & Article') }}</div>
        <div class="column-title">
          {{ trans('Take A Look At The Latest') }}
          <span class="shape-bg">{{ trans('Articles') }}</span>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-[30px] pt-5 lg:pt-10 xl:grid-cols-2">
        <div v-for="blog in blogs" :key="blog.id"
          class="shadow-box7 hover:ring-primary hover:shadow-box8 group space-y-6 rounded-[8px] bg-white p-4 ring-0 transition duration-150 hover:ring-2 sm:flex sm:space-x-6 sm:space-y-0">
          <div class="flex-none">
            <div class="relative h-[182px] rounded sm:w-[200px]">
              <img v-lazy="blog.image" alt="" class="h-full w-full rounded object-cover" />
            </div>
          </div>
          <div class="course-content flex-1">
            <div class="mb-4">
              <span class="text-secondary inline-block rounded bg-[#E3F9F6] px-[10px] py-1 text-base font-medium">
                {{ blog.category }}</span>
            </div>
            <h4 class="text-1xl mb-4 font-bold lg:text-2xl lg:leading-[36px]">
              <Link :href="route('blogs.show', blog.slug)" class="group-hover:text-primary transitio duration-150">{{
              blog.title }}</Link>
            </h4>
            <div class="flex space-x-6">
              <a class="flex items-center space-x-2" href="#">
                <img src="/assets/images/svg/calender2.svg" alt="" />
                <span>{{ blog.created_at_diff }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rt-mobile-menu-overlay lg:hidden"></div>
  <DefaultFooter />
</template>
