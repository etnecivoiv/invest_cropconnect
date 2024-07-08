<script setup>
import DefaultLayout from '@/Layouts/Default.vue'
import AboutSection from '@/Pages/Web/Partials/AboutSection.vue'
import AchievementSection from '@/Pages/Web/Partials/AchievementSection.vue'
import { onMounted } from 'vue'
import WhyChoose from './Partials/WhyChoose.vue';
defineOptions({ layout: DefaultLayout })

const { about } = defineProps(['about', 'primary', 'faqs', 'teamMembers'])

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

    $('.accrodain-button').on('click', function () {
      var element = $(this).parent('li')

      if (element.hasClass('open')) {
        element.removeClass('open')
        element.find('li').removeClass('open')
        element.find('.content').slideUp(200)
      } else {
        element.addClass('open')
        element.children('.content').slideDown(200)
        element.siblings('li').children('.content').slideUp()
        element.siblings('li').removeClass('open')
        element.siblings('li').find('li').removeClass('open')
        element.siblings('li').find('.content').slideUp()
      }
    })
  })
})

const getParsedText = (text, className = 'shape-bg') => {
  if (text && text.length) {
    return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`)
  }
  return text
}
</script>

<template>

  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ trans('About Us') }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans('Home') }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ trans('About Us') }}</li>
        </ol>
      </nav>
    </div>
  </div>

  <AboutSection />

  <!-- Feture section start -->
  <WhyChoose />

  <!-- Couter section start -->
  <AchievementSection />
  <!-- Feture section start -->

  <!-- testtimonal start -->
  <div
    class="section-padding bg-[url('../images/all-img/section-bg-16.png')] bg-cover bg-no-repeat"
  >
    <div class="container">
      <div class="grid grid-cols-12 gap-6 lg:gap-10">
        <div class="col-span-12 xl:col-span-7 lg:col-span-6">
          <img v-lazy="about.testimonial?.image" alt="" draggable="false" />
        </div>
        <div
          class="flex flex-col justify-center col-span-12 xl:col-span-5 lg:col-span-6"
        >
          <div class="mini-title">{{ about.testimonial?.top_title }}</div>
          <h4 class="column-title">
            {{ about.testimonial?.title }}
          </h4>
          <div>
            {{ about.testimonial?.text }}
          </div>
          <div class="mt-12">
            <a :href="about.testimonial?.btn_link" class="btn btn-primary">{{
              about.testimonial?.btn_text
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Team start -->
  <div class="section-padding">
    <div class="container">
      <div class="text-center">
        <div class="mini-title">{{ trans('Team Member') }}</div>
        <div class="column-title">
          {{ trans('Our Expert') }}
          <span class="shape-bg">{{ trans('Team') }}</span>
        </div>
      </div>
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] pt-10"
      >
        <div
          v-for="user in teamMembers"
          class="bg-white shadow-box3 rounded-[8px] transition-all duration-100 pt-10 pb-[28px] px-6 text-center hover:shadow-box4 border-t-4 border-transparent hover:border-secondary"
        >
          <div class="w-[170px] h-[170px] rounded-full relative mx-auto mb-8">
            <img
              v-lazy="user.preview"
              alt=""
              class="object-cover w-full h-full rounded-full"
            />
          </div>
          <div class="course-content">
            <h4 class="mb-1 font-bold lg:text-2xl text-1xl">{{ user.name }}</h4>
            <div>{{ user.position }}</div>
            <ul class="flex justify-center pt-6 space-x-4">
              <li>
                <a
                  :href="user.socials?.facebook"
                  class="flex flex-col items-center justify-center w-10 h-10 text-2xl transition rounded bg-red-paste text-primary hover:bg-primary hover:text-white"
                >
                  <iconify-icon icon="bxl:facebook"></iconify-icon>
                </a>
              </li>
              <li>
                <a
                  :href="user.socials?.twitter"
                  class="flex flex-col items-center justify-center w-10 h-10 text-2xl transition rounded bg-green-paste text-secondary hover:bg-secondary hover:text-white"
                >
                  <iconify-icon icon="bxl:twitter"></iconify-icon>
                </a>
              </li>
              <li>
                <a
                  :href="user.socials?.linkedin"
                  class="h-10 w-10 rounded bg-[#EEE8FF] text-#8861DB flex flex-col justify-center items-center text-2xl transition hover:bg-[#8861DB] hover:text-white"
                >
                  <iconify-icon icon="bxl:linkedin"></iconify-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- accrodain start -->
  <div
    class="section-padding bg-white bg-[url('../images/all-img/section-bg-15.png')] bg-bottom bg-cover bg-no-repeat"
  >
    <div class="container">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
        <div>
          <div class="mini-title">{{ about.faq?.top_title }}</div>
          <div
            class="column-title"
            v-html="getParsedText(about.faq?.top_title ?? '')"
          ></div>
          <ul class="list accrodains space-y-[30px] lg:max-w-[470px]">
            <li v-for="item in faqs">
              <button type="button" class="accrodain-button">
                <span>{{ item.title }}</span>
                <span class="icon-pm"></span>
              </button>
              <div class="hidden content">
                {{ item.text }}
              </div>
            </li>
          </ul>
        </div>
        <div>
          <img v-lazy="about?.faq?.image" alt="" class="mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
