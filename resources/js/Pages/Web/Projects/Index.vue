<script setup>
import { router } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import { onMounted, ref } from 'vue'
import SingleListProject from '@/components/SingleListProject.vue'
import SingleGridProject from '@/components/SingleGridProject.vue'
import trans from '@/composables/transComposable'
import NiceSelect from '@/components/NiceSelect.vue'
import sharedComposable from '@/composables/sharedComposable'
import { reactive } from 'vue'
import WebPagination from '@/components/WebPagination.vue'
defineOptions({ layout: DefaultLayout })
const props = defineProps([
  'projects',
  'categories',
  'category',
  'request',
  'max_invest',
  'min_invest'
])
const { formatCurrency, pickBy } = sharedComposable()

const loadMore = () => {}

const filterForm = reactive({
  s: props.request?.s ?? '',
  ratings: [],
  min_invest: props.request?.min_invest ?? props.min_invest,
  max_invest: props.request?.max_invest ?? props.max_invest,
  orderBy: props.request?.orderBy || ''
})

const filter = () => {
  if (props.min_invest == filterForm.min_invest && props.max_invest == filterForm.max_invest) {
    filterForm.min_invest = null
    filterForm.max_invest = null
  }

  router.get(route('projects.index'), pickBy(filterForm), {
    preserveScroll: true,
    preserveState: true
  })
}

onMounted(() => {
  $('select').niceSelect() // 1.07 tab

  $('#tabs-nav li:first-child').addClass('active')
  $('.tab-content').hide()
  $('.tab-content:first').show() // Click function

  $('#tabs-nav li').click(function () {
    $('#tabs-nav li').removeClass('active')
    $(this).addClass('active')
    $('.tab-content').hide()
    var activeTab = $(this).find('a').attr('href')
    $(activeTab).fadeIn()
    return false
  })

  // 1.08 checkbox price
  $('#pricechnage').on('change', function () {
    $('body').toggleClass('price-toggole')
  })

  // fillteing
  $('.grids').imagesLoaded(function () {
    var $grid = $('.grids').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: 0
      }
    })
  })

  //1.09 isotop filter

  $('.filter-list').on('click', 'li', function () {
    $('.filter-list li').removeClass('active')
    $(this).addClass('active')
    var filterValue = $(this).attr('data-filter')
    $('.grids').isotope({
      filter: filterValue
    })
    $(window).trigger('resize')
  })

  tippy('.tipy-info', {
    content: 'Global content',
    trigger: 'mouseenter',
    theme: 'primary',
    animation: 'scale'
  })

  // 1.11 testimonial slider
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    //arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    prevArrow: $('.slickprev'),
    nextArrow: $('.slicknext')
  })

  $('.slider-nav').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider-for',
    dots: false,
    focusOnSelect: true
  })

  $('.slider-range').slider({
    range: true,
    min: props.min_invest,
    max: props.max_invest,
    step: 10,
    values: [filterForm.min_invest, filterForm.max_invest],
    slide: function slide(event, ui) {
      filterForm.min_invest = ui.values[0]
      filterForm.max_invest = ui.values[1]

      let min = formatCurrency(ui.values[0])
      let max = formatCurrency(ui.values[1])

      $('.amount').val(`${min} - ${max}`)
    }
  })

  $('.amount').val(
    `${formatCurrency(filterForm.min_invest)} - ${formatCurrency(filterForm.max_invest)}`
  )
})
</script>

<template>
  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ trans('Projects') }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans('Home') }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">
            <Link href="/projects">{{ trans('Projects') }}</Link>
          </li>
          <template v-if="category">
            <li class="breadcrumb-item">-</li>
            <li class="text-primary">{{ category?.title }}</li>
          </template>
        </ol>
      </nav>
    </div>
  </div>

  <div class="nav-tab-wrapper tabs section-padding-bottom pt-10">
    <div class="container">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-8">
          <div class="mb-14 flex flex-col items-center space-y-6 md:flex-row md:space-y-0">
            <div class="flex flex-1 flex-col items-center space-x-6 sm:flex-row">
              <ul id="tabs-nav" class="cata-Tbas flex space-x-4">
                <li>
                  <a
                    href="#tab1"
                    class="flex h-[60px] w-[60px] flex-col items-center justify-center"
                  >
                    <iconify-icon icon="clarity:grid-view-line"></iconify-icon>
                  </a>
                </li>
                <li>
                  <a
                    href="#tab2"
                    class="flex h-[60px] w-[60px] flex-col items-center justify-center"
                  >
                    <iconify-icon icon="ant-design:unordered-list-outlined"></iconify-icon>
                  </a>
                </li>
              </ul>
              <span class="mt-4 inline-block md:mt-0">
                {{ trans('Showing') }} {{ projects.to ?? 0 }} {{ trans('projects of') }}
                {{ projects.total }}
              </span>
            </div>
            <div class="flex-0">
              <div class="min-w-[272px]">
                <NiceSelect
                  v-model="filterForm.orderBy"
                  :options="['Latest', 'Oldest']"
                  @change="filter()"
                  placeholder="Sort By"
                />
              </div>
            </div>
          </div>
          <div id="tabs-content">
            <div id="tab1" class="tab-content">
              <div class="grid grid-cols-1 gap-[30px] md:grid-cols-2">
                <template v-for="project in projects.data" :key="project.id">
                  <SingleGridProject :project="project" />
                </template>
              </div>
              <h5 v-if="projects.total == 0" class="text-center">
                {{ trans('No projects found') }}
              </h5>
            </div>
            <div id="tab2" class="tab-content">
              <div class="grid grid-cols-1 gap-[30px]">
                <template v-for="project in projects.data" :key="project.id">
                  <SingleListProject :project="project" />
                </template>
              </div>
            </div>

            <WebPagination :links="projects" />
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="sidebarWrapper space-y-[30px]">
            <div class="wdiget widget_search">
              <form @submit.prevent="filter">
                <div
                  class="shadow-e1 relative flex items-center rounded-md bg-[#F8F8F8] py-[4px] pl-3"
                >
                  <div class="flex-1">
                    <input
                      v-model="filterForm.s"
                      type="text"
                      placeholder="Search keyword..."
                      class="border-none bg-transparent focus:ring-0"
                    />
                  </div>
                  <div class="flex-none">
                    <button class="btn btn-primary">
                      <img src="/assets/images/icon/search.svg" alt="" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="wdiget widget_catagory">
              <h4 class="widget-title">{{ trans('Categories') }}</h4>

              <ul class="list-item space-y-4">
                <li v-for="cat in categories" class="block" :key="cat.id">
                  <Link
                    :href="route('project-categories.show', cat.slug)"
                    class="hover:bg-primary flex justify-between rounded px-5 py-[17px] transition-all duration-150 hover:text-white"
                    :class="[category?.id == cat.id ? 'bg-primary text-white' : 'bg-[#F8F8F8]']"
                  >
                    <span>{{ cat.title }} ({{ cat.projects_count }})</span>
                    <span class="text-2xl">
                      <iconify-icon icon="heroicons:chevron-right-20-solid"></iconify-icon>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div class="wdiget widget_catagory">
              <h4 class="widget-title">{{ trans('Rating By') }}</h4>

              <ul class="list-item space-y-5">
                <li v-for="item in 5" :key="item" class="block">
                  <label class="form-check flex cursor-pointer space-x-3">
                    <input
                      type="checkbox"
                      v-model="filterForm.ratings"
                      class="form-check-input hidden"
                      :value="item"
                    />
                    <span class="ck-box flex flex-col items-center justify-center">
                      <img src="/assets/images/icon/white-check.svg" alt="" class="object-contain"
                    /></span>
                    <span class="form-check-label">
                      <img v-lazy="`/assets/images/svg/rating-${item}.svg`" alt="" />
                    </span>
                  </label>
                </li>
              </ul>
            </div>
            <div class="wdiget widget_catagory">
              <h4 class="widget-title">{{ trans('Price Filter') }}</h4>
              <div class="slider-range"></div>
              <div class="price_slider_amount">
                <div class="mt-6">
                  <div class="flex space-x-2 text-xl font-medium text-black">
                    <span class="flex-none"> {{ trans('Price') }}:</span>
                    <input
                      type="text"
                      name="price"
                      readonly
                      placeholder="Select Range"
                      class="amount flex-1 border-none p-0 text-xl font-medium text-black focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button @click="filter" class="btn btn-primary w-full">
                {{ trans('Filter') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
