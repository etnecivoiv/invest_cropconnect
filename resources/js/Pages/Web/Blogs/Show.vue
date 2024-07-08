<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import moment from "moment";
import Sidebar from "@/Pages/Web/Blogs/Inc/Sidebar.vue";
import sharedComposable from "@/composables/sharedComposable";
const { textExcerpt, socialShare } = sharedComposable();

defineOptions({ layout: DefaultLayout });
const props = defineProps([
  "blog",
  "categories",
  "tags",
  "recent_blogs",
  "category",
  "request",
  "prevPost",
  "nextPost",
]);
</script>

<template>
  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ blog.title }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans("Home") }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ trans("Blog") }}</li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="nav-tab-wrapper tabs section-padding">
    <div class="container">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-[#F8F8F8] rounded-md">
            <img v-lazy="blog.image" alt="" class="mb-10 rounded-t-md" />
            <div class="px-10 pb-10">
              <div class="flex flex-wrap mt-6 mb-6 space-x-5 xl:space-x-10">
                <a class="flex items-center space-x-2" href="#">
                  <img src="/assets/images/svg/calender.svg" alt="" />
                  <span>{{ moment(blog.created_at).format("MMM DD, YYYY") }}</span>
                </a>
              </div>
              <h3>
                {{ blog.title }}
              </h3>
              <div v-html="blog.content" class="text-justify"></div>
              <div class="grid grid-cols-1 gap-5 mt-8 xl:grid-cols-2 md:mt-14">
                <ul class="flex items-center space-x-3">
                  <li class="font-semibold text-black">{{ trans("Tags") }}:</li>
                  <li v-for="tag in blog.tags">
                    <Link
                      :href="route('blog-tags.show', tag.slug)"
                      class="px-3 py-1 bg-white rounded hover:text-primary"
                    >
                      {{ tag.title }}
                    </Link>
                  </li>
                </ul>
                <ul class="flex items-center space-x-3 xl:justify-end">
                  <li class="font-semibold text-black">{{ trans("Share On") }}:</li>
                  <li v-for="media in ['facebook', 'twitter', 'pinterest', 'instagram']">
                    <a target="_blank" :href="socialShare(media)" class="flex w-10 h-10">
                      <img
                        v-lazy="`/assets/images/icon/${media}.svg`"
                        :alt="media + ' icon'"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <!-- related post  -->
              <div class="grid xl:grid-cols-2 grid-cols-1 gap-[30px] md:mt-14 mt-8">
                <Link
                  v-if="prevPost"
                  class="flex p-5 space-x-4 bg-white rounded shadow-box7"
                  :href="route('blogs.show', prevPost.slug)"
                >
                  <div class="flex-none">
                    <div class="w-20 h-20 rounded">
                      <img
                        v-lazy="prevPost.image"
                        alt=""
                        class="object-cover w-full h-full rounded"
                      />
                    </div>
                  </div>
                  <div class="flex-1">
                    <span class="mb-1 text-base text-primary">{{
                      trans("Prev Post")
                    }}</span>
                    <div class="mb-1 font-semibold text-black">
                      {{ textExcerpt(prevPost.title, 35) }}
                    </div>
                  </div>
                </Link>
                <!-- end single -->
                <Link
                  v-if="nextPost"
                  class="flex flex-row-reverse p-5 bg-white rounded shadow-box7"
                  :href="route('blogs.show', nextPost.slug)"
                >
                  <div class="flex-none">
                    <div class="w-20 h-20 ml-4 rounded">
                      <img
                        v-lazy="nextPost.image"
                        alt=""
                        class="object-cover w-full h-full rounded"
                      />
                    </div>
                  </div>
                  <div class="flex-1 text-right">
                    <span class="mb-1 text-base text-primary">{{
                      trans("Next Post")
                    }}</span>
                    <div class="mb-1 font-semibold text-black">
                      {{ textExcerpt(nextPost.title, 25) }}
                    </div>
                  </div>
                </Link>
                <!-- end single -->
              </div>
            </div>
          </div>
        </div>

        <Sidebar
          :categories="categories"
          :tags="tags"
          :request="request"
          :recent_blogs="recent_blogs"
        />
      </div>
    </div>
  </div>
</template>
