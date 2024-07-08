<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import { onMounted } from "vue";
defineOptions({ layout: DefaultLayout });

const props = defineProps(["investors", "testimonials",'brands']);

onMounted(() => {
  $(document).ready(function () {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      //arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
      prevArrow: $(".slickprev"),
      nextArrow: $(".slicknext"),
    });
    $(".slider-nav").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: ".slider-for",
      dots: false,
      focusOnSelect: true,
    });
    $(".slider-range").slider({
      range: true,
      min: 1500,
      max: 10000,
      step: 100,
      values: [3000, 6000],
      slide: function slide(event, ui) {
        $(".amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $(".amount").val(
      "$" +
        $(".slider-range").slider("values", 0) +
        " - $" +
        $(".slider-range").slider("values", 1)
    ); //1.12 coundown
  });
});

const getParsedText = (text, className = "shape-bg") => {
  return text.replace(/{(.*?)}/g, `<span class="${className}">$1</span>`);
};
</script>

<template>


  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ trans("Investors") }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans("Home") }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ trans("Investors") }}</li>
        </ol>
      </nav>
    </div>
  </div>

  <!-- team start -->
  <div class="section-padding">
    <div class="container">
      <div class="text-center">
        <div class="mini-title">{{ trans("Team Member") }}</div>
        <div class="column-title">
          {{ trans("Our Expert") }}
          <span class="shape-bg">{{ trans("Investors") }}</span>
        </div>
      </div>
      <div
        class="grid grid-cols-1 pt-10 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-7"
      >
        <div
          v-for="user in investors"
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

  <!-- testtimonal start -->
  <div
    class="section-padding bg-[url('../images/all-img/section-bg-12.png')] bg-cover bg-no-repeat"
  >
    <div class="container">
      <div class="grid lg:grid-cols-2 grid-cols-1 xl:gap-[60px] gap-6">
        <div>
          <div class="slider-nav">
            <div class="single-item" v-for="testimonial in testimonials">
              <div
                class="xl:h-[593px] lg:h-[400px] h-[150px] lg:w-full w-[150px] rounded-md"
              >
                <img
                  v-lazy="testimonial.preview"
                  alt=""
                  class="object-cover w-full h-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="mini-title">{{ trans("Testimonial") }}</div>
          <h4 class="column-title">
            {{ trans("Our Valuable Investors") }}
            <span class="text-black shape-bg"> {{ trans("Feedback") }}</span>
          </h4>
          <div class="mt-10 slider-for">
            <div class="single-item" v-for="testimonial in testimonials">
              <div>
              
                <div class="mb-8">
                  {{ testimonial.comment }}
                </div>
                <div>
                  <span class="block mb-1 font-semibold text-black">{{
                    testimonial.name
                  }}</span>
                  <span class="block font-semibold text-primary">{{
                    testimonial.position
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-8 space-x-5 lg:mt-10">
            <button
              class="lg:h-[64px] lg:w-[64px] h-12 w-12 flex flex-col items-center justify-center rounded-md bg-white hover:bg-primary hover:text-white shadow-box slickprev text-3xl text-primary"
            >
              <iconify-icon icon="heroicons:arrow-left-20-solid"></iconify-icon>
            </button>
            <button
              class="lg:h-[64px] lg:w-[64px] h-12 w-12 flex flex-col items-center justify-center rounded-md bg-white hover:bg-primary hover:text-white shadow-box slickprev text-3xl text-primary"
            >
              <iconify-icon icon="heroicons:arrow-right-20-solid"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-32">
      <div class="mb-[50px] text-center text-2xl font-medium text-black">
        <span class="shape-bg mini">{{ trans("Trusted") }}</span>
        {{ trans("By 1000+ Companies") }}
      </div>

      <ul class="flex flex-wrap items-center justify-center lg:justify-between">
        <li
          v-for="brand in brands"
          class="mb-6 mr-6 grayscale-[80] transition duration-150 last:mb-0 last:mr-0 hover:grayscale-0"
        >
          <div class="cursor-pointer"><img v-lazy="brand.slug" alt="" /></div>
        </li>
      </ul>
    </div>

  </div>
</template>
