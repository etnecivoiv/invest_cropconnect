<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader :title="trans('Features')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-normal rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans('Title') }}</th>
              <th class="">{{ trans('Description') }}</th>
              <th class="text-right">{{ trans('Language') }}</th>
              <th class="!text-right">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts.data" :key="post.id">
              <td class="flex">
                <img v-lazy="post.preview.value" class="avatar rounded-circle mr-3" />
                <span> {{ textExcerpt(post.title, 30) }}</span>
              </td>
              <td class="text-left">
                {{ textExcerpt(post.excerpt.value, 50) }}
              </td>
              <td class="text-right">
                {{ post.lang }}
              </td>
              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link :href="route('admin.features.edit', post.id)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <Link
                          as="button"
                          class="dropdown-link"
                          @click="deleteRow('/admin/features/' + post.id)"
                        >
                          <i class="h-5 text-slate-400" data-feather="trash-2"
                            >{{ trans('Remove') }}></i
                          >
                          <span>{{ trans('Delete') }}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-footer py-4">
          <Paginate
            :links="posts.links"
            :currentPage="posts.current_page"
            :from="posts.from"
            :lastPage="posts.last_page"
            :lastPageUrl="posts.last_page_url"
            :nextpageurl="posts.next_page_url"
            :perPage="posts.per_page"
            :prevPageUrl="posts.prev_page_url"
            :to="posts.to"
            :total="posts.total"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Head } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import sharedComposable from '@/composables/sharedComposable'
const props = defineProps(['posts', 'segments', 'buttons'])
const { textExcerpt, deleteRow } = sharedComposable()
defineOptions({ layout: AdminLayout })
</script>
@/composables/sharedComposable
