<script setup>
import sharedComposable from "@/composables/sharedComposable";
import { useForm } from "@inertiajs/vue3";
const { textExcerpt } = sharedComposable();

const props = defineProps(["categories", "tags", "recent_blogs", "request", "category"]);

const form = useForm({
  s: props.request?.s ?? "",
});

const filter = () => {
  form.get(route("blogs.index"));
};
</script>

<template>
  <div class="col-span-12 lg:col-span-4">
    <div class="sidebarWrapper space-y-[30px]">
      <div class="wdiget widget_search">
        <form @submit.prevent="filter">
          <div
            class="bg-[#F8F8F8] flex rounded-md shadow-e1 items-center py-[4px] pl-3 relative"
          >
            <div class="flex-1">
              <input
                type="text"
                v-model="form.s"
                placeholder="Search keyword..."
                class="bg-transparent border-none focus:ring-0"
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
        <h4 class="widget-title">{{ trans("Categories") }}</h4>

        <ul class="space-y-4 list-item">
          <li class="block" v-for="cat in categories">
            <Link
              :href="route('blog-categories.show', cat.slug)"
              class="flex justify-between bg-[#F8F8F8] py-[17px] px-5 rounded hover:bg-primary hover:text-white transition-all duration-150"
              :class="[category?.id == cat.id ? 'bg-primary text-white' : 'bg-[#F8F8F8]']"
            >
              <span>{{ cat.title }} ({{ cat.blogs_count }})</span>
              <span class="text-2xl">
                <iconify-icon icon="heroicons:chevron-right-20-solid"></iconify-icon>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div class="wdiget widget-recent-post">
        <h4 class="widget-title">{{ trans("Recent Blogs") }}</h4>
        <ul class="list">
          <li
            v-for="blog in recent_blogs"
            class="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b"
          >
            <div class="flex-none">
              <div class="w-20 h-20 rounded">
                <Link
                :href="route('blogs.show', blog.slug)"
               
                >
                <img
                  v-lazy="blog.preview.value"
                  alt=""
                  class="object-cover w-full h-full rounded"
                />
              </Link>
              </div>
            </div>
            <div class="flex-1">
              <div class="mb-1 font-semibold text-black">
                <Link
                :href="route('blogs.show', blog.slug)"
               
                >
                {{ textExcerpt(blog.title, 35) }}
              </Link>
              </div>
              <Link
                :href="route('blogs.show', blog.slug)"
                class="font-semibold text-secondary"
                >{{ trans("Read More") }}</Link
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="wdiget">
        <h4 class="widget-title">{{ trans("Popular Tags") }}</h4>
        <ul class="flex flex-wrap">
          <li v-for="tag in tags" class="mb-2 mr-2">
            <Link
              :href="route('blog-tags.show', tag.slug)"
              class="px-3 py-1 text-base transition-all duration-150 rounded hover:bg-primary hover:text-white"
              :class="[category?.id == tag.id ? 'bg-primary text-white' : 'bg-[#F8F8F8]']"
            >
              {{ tag.title }}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
