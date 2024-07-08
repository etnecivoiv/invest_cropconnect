<script setup>
import DefaultLayout from "@/Layouts/Default.vue"
import Breadcrumbs from "@/components/Breadcrumbs.vue"
import { ref, onMounted } from "vue"
import { router, useForm } from "@inertiajs/vue3"
import sharedComposable from "@/composables/sharedComposable"
import moment from "moment"
import notify from "@/Plugins/Admin/notify"
import InputFieldError from "@/components/InputFieldError.vue"
import NiceSelect from "@/components/NiceSelect.vue"
import SpinnerBtn from "@/components/Admin/SpinnerBtn.vue"

defineOptions({ layout: DefaultLayout })
const props = defineProps([
  "project",
  "profitReturn",
  "availableUnits",
  "canReview",
  "percentageByStar",
  "relatedProjects",
])

const { formatCurrency, socialShare, authUser } = sharedComposable()
const unitQuantity = ref(1)
const selectedDurations = ref([props.project?.durations[0]?.id])
const reviews = ref([])
const reviewPageNumber = ref(1)
const loadMoreReviews = ref(true)
const investByWallet = ref(false)

const setDurations = (id) => {
  const index = selectedDurations.value.indexOf(id)

  if (index !== -1) {
    selectedDurations.value.splice(index, 1)
  } else {
    selectedDurations.value.push(id)
  }
  if (selectedDurations.value.length < 1) {
    unitQuantity.value = 1
  }
}
const unitIncrement = () => {
  if (props.availableUnits > unitQuantity.value) {
    unitQuantity.value++
  }
}
const unitDecrement = () => {
  if (unitQuantity.value > 1) {
    unitQuantity.value--
  }
}
const calculatePercentage = (value, percentage) => {
  return (percentage / 100) * value
}

const calculateProfitReturn = (id, profit, isFixed = true) => {
  const quantity = selectedDurations.value.includes(id) ? unitQuantity.value : 1
  return formatCurrency(
    isFixed ? profit :
      calculatePercentage(props.project.invest_amount, profit) * quantity
  )
}

const loading = ref(false)

const submit = () => {
  if (props.alreadyInvested) {
    return
  }
  loading.value = true
  router.post(
    route("payment.store"),
    {
      unit_price: props.project.invest_amount,
      project: props.project.id,
      qty: unitQuantity.value,
      durations: selectedDurations.value,
      by_wallet: investByWallet.value,
    },
    {
      preserveScroll: true,
    }
  )
  loading.value = false
}
const reviewForm = useForm({
  star: null,
  comment: "",
  project_id: props.project.id,
})
const reviewStore = () => {
  reviewForm.post(route("review.store"), {
    preserveScroll: true,
    onSuccess: () => {
      reviewForm.reset()
      notify.success("Reviewed successfully")
    },
  })
}
const getReviews = () => {
  axios
    .get(
      route("api-project.reviews", {
        id: props.project.id,
      })
    )
    .then((res) => {
      reviews.value = res.data.data
      if (res.data.current_page === res.data.last_page) {
        return (loadMoreReviews.value = false)
      }
    })
}
const getMoreReviews = () => {
  reviewPageNumber.value++
  axios
    .get(
      route("api-project.reviews", {
        id: props.project.id,
        page: reviewPageNumber.value,
      })
    )
    .then((res) => {
      reviews.value.push(...res.data.data)
      if (res.data.current_page === res.data.last_page) {
        return (loadMoreReviews.value = false)
      }
    })
}

onMounted(() => {
  $("#tabs-nav li:first-child").addClass("active")
  $(".tab-content").hide()
  $(".tab-content:first").show() // Click function

  setTimeout(() => {
    getReviews()
  }, 1000)

  $(".accrodain-button").on("click", function () {
    var element = $(this).parent("li")

    if (element.hasClass("open")) {
      element.removeClass("open")
      element.find("li").removeClass("open")
      element.find(".content").slideUp(200)
    } else {
      element.addClass("open")
      element.children(".content").slideDown(200)
      element.siblings("li").children(".content").slideUp()
      element.siblings("li").removeClass("open")
      element.siblings("li").find("li").removeClass("open")
      element.siblings("li").find(".content").slideUp()
    }
  })
})
const investmentTabBtn = ref()
const showInvestmentTab = () => {
  investmentTabBtn.value.click()
  investmentTabBtn.value.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "start",
  })
}
</script>

<template>
  <Breadcrumbs :PageName="project.title" />
  <div class="nav-tab-wrapper tabs section-padding">
    <div class="container">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-8">
          <div class="single-course-details">
            <div class="course-main-thumb mb-10 h-[350px] xl:h-[470px]">
              <img v-lazy="project.cover_image ?? project.preview" alt="cover_image"
                class="block object-cover w-full h-full rounded-md" />
            </div>
            <div class="mb-6">
              <span class="px-3 py-1 text-lg font-semibold text-white rounded bg-secondary">{{ project.category?.title
                }}</span>
            </div>
            <h2>{{ project.title }}</h2>

            <div class="mt-12 nav-tab-wrapper">
              <ul id="tabs-nav" class="mb-8 course-tab">
                <li>
                  <a href="#tab1"> {{ trans("Summary") }} </a>
                </li>
                <li>
                  <a ref="investmentTabBtn" href="#tab2"> {{ trans("Invest") }} </a>
                </li>
                <li>
                  <a href="#tab3"> {{ trans("About") }} </a>
                </li>
                <li>
                  <a href="#tab4"> {{ trans("Review") }} </a>
                </li>
                <li>
                  <a href="#tab5"> {{ trans("Faq") }} </a>
                </li>
              </ul>
              <div id="tabs-content">
                <div id="tab1" class="tab-content">
                  <div>
                    <h3 class="text-2xl">{{ trans("Summary") }}</h3>
                    <div class="grid grid-cols-2 gap-5 p-4 font-semibold rounded shadow-md">
                      <div class="">
                        <p class="text-sm">{{ trans("Return") }}</p>
                        <p class="text-red-400">
                          {{
                            profitReturn?.min?.is_fixed
                              ? formatCurrency(profitReturn?.min?.value || 0)
                              : `${profitReturn?.min?.value || 0}%`
                          }}
                          -
                          {{
                            profitReturn?.max?.is_fixed
                              ? formatCurrency(profitReturn?.max?.value || 0)
                              : `${profitReturn?.max?.value || 0}%`
                          }}
                        </p>
                      </div>
                      <div class="">
                        <p class="text-sm">{{ trans('Return Type') }}</p>
                        <p class="text-red-400">
                          {{ project.category?.title }}
                        </p>
                      </div>
                      <div class="">
                        <p class="text-sm">{{ trans('Durations') }}</p>
                        <p class="text-red-400">
                          <template v-for="(duration, i) in project.durations" :key="duration.id">
                            {{ duration.duration }}/{{ duration.duration_type }}
                            <template v-if="project.durations.length - 1 !== i">,
                            </template>
                          </template>
                        </p>
                      </div>
                      <div class="">
                        <p class="text-sm">{{ trans('Location') }}</p>
                        <p class="text-red-400">
                          {{ project.address }}
                        </p>
                      </div>
                      <div class="">
                        <p class="text-sm">{{ trans('Total Return') }}</p>
                        <p class="text-red-400">
                          {{
                            formatCurrency(
                              calculatePercentage(
                                project.invest_amount,
                                profitReturn?.min?.value ?? 0
                              )
                            )
                          }}
                          -
                          {{
                            formatCurrency(
                              calculatePercentage(
                                project.invest_amount,
                                profitReturn?.max?.value ?? 0
                              )
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tab2" class="tab-content">
                  <template v-if="availableUnits">
                    <div class="space-y-5" v-if="project.accept_new_investor">
                      <h3 class="text-2xl">Invest</h3>
                      <div class="grid grid-cols-4 text-sm gap-x-3">
                        <label class="font-bold text-black">{{ trans('Duration') }}</label>
                        <label class="font-bold text-black">{{ trans('ROI') }}</label>
                        <label class="font-bold text-black">{{ trans('Loss Range') }}</label>
                        <label class="font-bold text-black">{{ trans('Net Profit') }}</label>
                        <div class="my-4 space-y-1 col-span-full">
                          <template v-for="duration in project.durations" :key="duration.id">
                            <div @click="setDurations(duration.id)"
                              class="grid grid-cols-4 p-3 bg-gray-100 rounded cursor-pointer gap-x-3 text-start" :class="{
                                'bg-red-300 text-white': selectedDurations.includes(
                                  duration.id
                                ),
                              }">
                              <div class="flex items-center gap-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                  stroke-width="1.5" stroke="currentColor" :class="selectedDurations.includes(duration.id)
                                      ? 'visible'
                                      : 'invisible'
                                    " width="20" height="20">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>

                                <span>
                                  {{ duration.duration }}/{{
                                    duration.duration_type
                                  }}</span>
                              </div>
                              <p>
                                {{
                                  `${duration.return_type == "fixed"
                                    ? formatCurrency(duration.min_profit_return)
                                    : duration.min_profit_return + "%"
                                  }`
                                }}
                                -
                                {{
                                  `${duration.return_type == "fixed"
                                    ? formatCurrency(duration.max_profit_return)
                                    : duration.max_profit_return + "%"
                                  }`
                                }}
                              </p>
                              <p>
                                {{
                                  `${duration.return_type == "fixed"
                                    ? formatCurrency(duration.loss_min_range)
                                    : duration.loss_min_range + "%"
                                  }`
                                }}
                                -
                                {{
                                  `${duration.return_type == "fixed"
                                    ? formatCurrency(duration.loss_max_range)
                                    : duration.loss_max_range + "%"
                                  }`
                                }}
                              </p>
                              <p>
                                {{
                                  calculateProfitReturn(
                                    duration.id,
                                    duration.min_profit_return,
                                    duration.return_type == "fixed"
                                  )
                                }}
                                -
                                {{
                                  calculateProfitReturn(
                                    duration.id,
                                    duration.max_profit_return
                                  )
                                }}
                              </p>
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="grid items-center grid-cols-2">
                        <div class="col-span-1" v-if="authUser">
                          <label for="investByWallet" class="flex items-center gap-2">
                            <input type="checkbox" class="p-2 text-red-600 rounded bg-red-paste border-primary"
                              v-model="investByWallet" id="investByWallet" />
                            {{ trans("Invest by wallet") }} ({{
                              formatCurrency(authUser.wallet)
                            }})
                          </label>
                        </div>

                        <div class="flex justify-between w-full">
                          <span class="ml-1 text-lg font-semibold">{{ trans('Total') }}:</span>
                          <span class="ml-1 text-lg">{{ selectedDurations.length * unitQuantity }} {{ trans('units')
                            }}</span>

                          <span class="col-span-3 mr-10 text-end">
                            {{
                              formatCurrency(
                                project.invest_amount *
                                unitQuantity *
                                selectedDurations.length
                              )
                            }}
                          </span>
                        </div>
                      </div>
                      <p v-if="$page.props.errors['not_enough_balance']" class="text-red-500">
                        {{ $page.props.errors["not_enough_balance"] }}
                      </p>

                      <div class="flex items-center gap-5">
                        <div class="flex justify-center w-full btn btn-primary disabled:cursor-not-allowed"
                          v-if="availableUnits == 0">
                          {{ trans("All units are booked") }}
                        </div>
                        <div class="flex items-center gap-3" v-if="availableUnits > 0">
                          <button :disabled="selectedDurations.length < 1 || unitQuantity === 1" @click="unitDecrement"
                            class="px-4 py-2 text-white bg-red-400 rounded-md disabled:cursor-not-allowed">
                            -
                          </button>
                          <span>{{ unitQuantity }}</span>
                          <button :disabled="selectedDurations.length < 1" @click="unitIncrement"
                            class="px-4 py-2 text-white bg-red-400 rounded-md disabled:cursor-not-allowed">
                            +
                          </button>
                        </div>

                        <SpinnerBtn type="button" v-if="availableUnits > 0" @click="submit" :processing="loading"
                          :disabled="selectedDurations.length < 1" :btn-text="trans('Book Now')"
                          classes="w-full justify-center flex btn btn-primary disabled:cursor-not-allowed" />
                        <button type="button" v-else disabled
                          class="w-full text-center bg-opacity-50 btn btn-primary disabled:cursor-not-allowed">
                          {{ trans(' Stook Out') }}
                        </button>
                      </div>
                    </div>
                    <p v-else-if="availableUnits" class="text-red-600">
                      {{ trans("Currently we are not accept new investments.") }}
                    </p>
                  </template>

                  <p v-else class="text-red-600">
                    {{ trans("All the units has been booked") }}
                  </p>
                </div>
                <div id="tab3" class="tab-content">
                  <div class="rounded-md bg-[#F8F8F8] p-8">
                    <div v-html="project.metas.find((p) => p.key == 'main_description').value
                      "></div>
                  </div>
                </div>
                <div id="tab4" class="tab-content">
                  <div>
                    <template v-if="canReview">
                      <form @submit.prevent="reviewStore"
                        class="w-full p-8 mt-10 space-y-4 bg-white border border-gray-100 rounded-md shadow-box7">
                        <h5 class="text-gray-500">{{ trans("Write a review") }}</h5>
                        <NiceSelect extended-label="Star" v-model="reviewForm.star" :options="[1, 2, 3, 4, 5]"
                          placeholder="Select Star" />
                        <div>
                          <label>{{ trans("Review") }}</label>
                          <textarea type="text" required v-model="reviewForm.comment" class="from-control"
                            placeholder="Type Your Review" />
                          <InputFieldError :message="reviewForm.errors.comment" />
                        </div>

                        <button type="submit" :disabled="reviewForm.processing" class="mt-8 btn btn-primary">
                          {{ trans("Submit") }}
                        </button>
                      </form>
                    </template>
                    <div class="grid grid-cols-12 gap-5">
                      <div class="col-span-12 md:col-span-8">
                        <div v-for="item in [5, 4, 3, 2, 1]" :key="item"
                          class="flex items-center mb-5 space-x-4 last:mb-0">
                          <div class="flex-none">
                            <div class="flex space-x-1 text-xl">
                              <iconify-icon v-for="i in 5" :key="i" icon="heroicons:star-20-solid" :class="i < item + 1 ? 'text-tertiary' : ' text-[#E6E6E6]'
                                " />
                            </div>
                          </div>
                          <div class="flex-1">
                            <div class="flex items-center space-x-4 progressbar-group">
                              <div class="relative h-[6px] flex-1 overflow-hidden rounded-[2px] bg-black bg-opacity-10">
                                <div class="ani bg-secondary absolute left-0 top-1/2 block h-[6px] -translate-y-1/2"
                                  :style="{ width: `${percentageByStar[item]}%` }" />
                              </div>
                              <div class="flex-none w-8">
                                <span class="block mb-2 font-semibold">
                                  {{ percentageByStar[item] }}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-span-12 md:col-span-4">
                        <div
                          class="shadow-box7 flex min-h-[219px] flex-col items-center justify-center space-y-3 rounded bg-white p-6">
                          <h2>
                            {{
                              project.reviews_avg_star
                                ? parseFloat(project.reviews_avg_star).toFixed(1)
                                : 0
                            }}
                          </h2>
                          <div class="flex space-x-3">
                            <iconify-icon v-for="star in Math.round(project.reviews_avg_star)" :key="star"
                              icon="heroicons:star-20-solid" class="text-tertiary" />
                          </div>
                          <span class="block">({{ project.reviews_count }} {{ trans('Review') }})</span>
                        </div>
                      </div>
                    </div>
                    <!-- review comments -->
                    <div class="mt-8">
                      <h4 class="text-xl font-bold text-black">{{ trans('Reviews') }}</h4>
                      <ul class="mt-6 space-y-5 list" v-if="reviews?.length > 0">
                        <li class="flex space-x-5" v-for="review in reviews" :key="review.id">
                          <div class="flex-none">
                            <div class="w-16 h-16 rounded-full">
                              <img v-lazy="review.user.avatar == null
                                  ? `https://ui-avatars.com/api/?name=${review.user.name}`
                                  : `${review.user.avatar}`
                                " alt="avatar" class="object-cover w-full h-full rounded-full" />
                            </div>
                          </div>
                          <div class="flex-1">
                            <div class="flex mb-2 space-x-3">
                              <iconify-icon v-for="i in review.star" :key="i" icon="heroicons:star-20-solid"
                                class="text-tertiary" />
                            </div>
                            <p>
                              {{ review.comment }}
                            </p>
                            <div class="mt-2 author">
                              <span class="block text-lg font-bold text-black">
                                {{ review.user.name }}
                              </span>
                              <span class="block text-sm">
                                {{ moment(review.created_at).format("MMM DD, YYYY") }}
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <template v-else>
                        <h5 class="mt-5 text-center">{{ trans("No Reviews") }}</h5>
                      </template>

                      <div v-if="loadMoreReviews && reviews.length > 1" class="text-center pt-14">
                        <button @click.prevent="getMoreReviews" type="button"
                          class="btn btn-primary inline-flex items-center space-x-[10px]">
                          <span>{{ trans('Load More') }} </span>
                          <span class="relative top-1">
                            <iconify-icon icon="ion:reload-outline"></iconify-icon>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tab5" class="tab-content">
                  <div>
                    <ul class="list accrodains">
                      <li v-for="item in project.faqs" class="mb-2 border border-gray-200" :key="item.id">
                        <button type="button" class="accrodain-button">
                          <span>{{ item.qns }}</span>
                          <span class="icon-pm"></span>
                        </button>
                        <div class="hidden content">
                          {{ item.ans }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="sidebarWrapper space-y-[30px]">
            <div class="space-y-5 wdiget custom-text">
              <a class="relative block h-[220px] rounded" href="#">
                <img v-lazy="project.preview" alt="" class="block object-cover w-full h-full rounded" />
              </a>
              <h3>{{ formatCurrency(project.invest_amount) }}/{{ trans('unit') }}</h3>
              <button @click="showInvestmentTab" class="w-full text-center btn btn-primary">
                {{ trans(' Book Now') }}
              </button>
              <ul class="list">
                <li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/icon/file2.svg" alt="" />
                    <div class="font-semibold text-black">{{ trans('Total Unit') }}</div>
                  </div>
                  <div class="flex-none">{{ project.total_units }}</div>
                </li>

                <li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/icon/clock.svg" alt="" />
                    <div class="font-semibold text-black">{{ trans('Expire Date') }}</div>
                  </div>
                  <div class="flex-none">
                    {{ moment(project.expire_date).format("D MMM, YYYY") }}
                  </div>
                </li>

                <li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/icon/star.svg" alt="" />
                    <div class="font-semibold text-black">{{ trans('Available Units') }}</div>
                  </div>
                  <div class="flex-none">{{ availableUnits }}</div>
                </li>

                <li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/icon/target.svg" alt="" />
                    <div class="font-semibold text-black">{{ trans('Return Type') }}</div>
                  </div>
                  <div class="flex-none">{{ project.category?.title }}</div>
                </li>

                <li class="past:mb-0 mb-4 flex space-x-3 border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0">
                  <div class="flex flex-1 space-x-3">
                    <img src="/assets/images/icon/web.svg" alt="" />
                    <div class="font-semibold text-black">{{ trans("Address") }}</div>
                  </div>
                  <div class="flex-none">{{ project.address }}</div>
                </li>
              </ul>
              <ul class="flex items-center pt-3 space-x-4">
                <li class="font-semibold text-black">{{ trans("Share On") }}:</li>
                <li v-for="media in ['facebook', 'twitter', 'instagram', 'pinterest']" :key="media">
                  <a target="_blank" :href="socialShare(media)" class="flex w-10 h-10">
                    <img v-lazy="`/assets/images/icon/${media}.svg`" :alt="media + ' icon'" />
                  </a>
                </li>
              </ul>
            </div>

            <div class="wdiget" v-if="relatedProjects.length">
              <h4 class="widget-title">{{ trans("Related Projects") }}</h4>
              <ul class="list">
                <li v-for="project in relatedProjects" :key="project.id"
                  class="mb-6 flex space-x-4 border-b border-[#ECECEC] pb-6 last:mb-0 last:border-0 last:pb-0">
                  <div class="flex-none">
                    <div class="w-20 h-20 rounded">
                      <img v-lazy="project.preview" alt="" class="object-cover w-full h-full rounded" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex mb-2 space-x-3">
                      <template v-for="item in 5" :key="item">
                        <iconify-icon v-if="item <= parseInt(project.reviews_avg_star)" icon="heroicons:star-20-solid"
                          class="text-tertiary"></iconify-icon>

                        <iconify-icon v-else icon="heroicons:star-20-solid" class="text-[#E6E6E6]"></iconify-icon>
                      </template>
                    </div>
                    <div class="mb-1 font-semibold text-black">
                      {{ project.title }}
                    </div>
                    <span class="font-semibold text-secondary">{{
                      formatCurrency(project.invest_amount)
                      }}</span>
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
