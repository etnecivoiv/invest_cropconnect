<script setup>
import { Head } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
defineOptions({ layout: DefaultLayout })
defineProps(['info','faqs','about'])
import { onMounted } from 'vue'
const getParsedText = (text, className = 'shape-bg') => {
  if (text && text.length) {
    return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`)
  }
  return text
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
</script>

<template>
    <Head :title="info.title" />

    <div class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat">
        <div class="container text-center">
            <h2>{{ info.title }}</h2>
            <nav>
                <ol class="flex items-center justify-center space-x-3">
                    <li class="breadcrumb-item">
                        <Link href="/">{{ trans('Home') }} </Link>
                    </li>
                    <li class="breadcrumb-item">-</li>
                    <li class="text-primary">{{ info.title }}</li>
                </ol>
            </nav>
        </div>
    </div>

    <section class="container my-10">

        <div v-html="info.description?.value">
        </div>
        <br>
    </section>
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
