<script setup>
import { Head } from "@inertiajs/vue3";
import DefaultLayout from "@/Layouts/Default.vue";
import Sidebar from "@/Pages/Web/Blogs/Inc/Sidebar.vue";
import moment from "moment";
import WebPagination from "@/components/WebPagination.vue";
defineOptions({ layout: DefaultLayout });
const props = defineProps([
  "blogs",
  "categories",
  "tags",
  "recent_blogs",
  "category",
  "request",
]);
</script>

<template>

  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ trans("Blogs") }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans("Home") }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">
            <Link href="/blogs">{{ trans("Blogs") }}</Link>
          </li>
          <template v-if="category">
            <li class="breadcrumb-item">-</li>
            <li class="text-primary">{{ category?.title }}</li>
          </template>
        </ol>
      </nav>
    </div>
  </div>

  <div class="nav-tab-wrapper tabs section-padding">
    <div class="container">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="col-span-12 lg:col-span-8">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
            <div
              v-for="post in blogs.data"
              class="bg-white shadow-box12 rounded-[8px] transition duration-100 hover:shadow-box13"
            >
              <div class="course-thumb h-[260px] rounded-t-[8px] relative">
                <Link
                    :href="route('blogs.show', post.slug)"
                    
                  >
                <img
                  v-lazy="post.image"
                  alt=""
                  class="w-full h-full object-cover rounded-t-[8px]"
                />
                <span
                  class="absolute px-3 py-1 text-lg font-semibold text-white rounded bg-secondary left-6 top-6"
                  >{{ post.category_name }}</span
                >
              </Link>
              </div>
              <div class="p-8 course-content">
                <div class="flex mb-5 space-x-5 lg:space-x-10">
                  
                  <Link
                    class="flex items-center space-x-2"
                    :href="route('blogs.show', post.slug)"
                  >
                    <img src="/assets/images/svg/calender.svg" alt="" />
                    <span>{{ moment(post.created_at).format("MMM DD, YYYY") }}</span>
                  </Link>
                </div>
                <h4 class="mb-5 text-xl font-bold">
                  <Link
                    :href="route('blogs.show', post.slug)"
                    class="transition duration-150 hover:text-primary"
                  >
                    {{ post.title }}
                  </Link>
                </h4>
                <Link
                  :href="route('blogs.show', post.slug)"
                  class="font-semibold text-black transition duration-150 hover:underline"
                >
                  {{ trans("Read More") }}
                </Link>
              </div>
            </div>
          </div>
          <WebPagination :links="blogs" />
          <h3 v-if="!blogs.total" class="text-center">{{ trans("No blogs found") }}</h3>
        </div>
        <Sidebar
          :categories="categories"
          :category="category ?? {}"
          :tags="tags"
          :request="request"
          :recent_blogs="recent_blogs"
        />
      </div>
    </div>
  </div>
</template>
