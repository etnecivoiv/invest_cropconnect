<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'

import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })

const blogsStats = [
  {
    value: props.totalPosts,
    title: trans('Total Posts'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.totalActivePosts,
    title: trans('Total Active Posts'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalInActivePosts,
    title: trans('Total Inactive Posts'),
    iconClass: 'ti ti-thumb-up'
  }
]

const { textExcerpt, deleteRow } = sharedComposable()
const props = defineProps([
  'posts',
  'totalPosts',
  'totalActivePosts',
  'totalInActivePosts',
  'buttons',
  'segments',
  'type',
  'request'
])

const filterOptions = [
  {
    label: 'Title',
    value: 'title'
  }
]
</script>
<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Create a blog post" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <!-- Overview Section Start -->
      <Overview :items="blogsStats" grid="3" />
      <!-- Overview Section End -->

      <FilterForm :options="filterOptions" />

      <!-- Customer Table Starts -->
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="col-3">{{ trans('Title') }}</th>

              <th class="col-1">{{ trans('Status') }}</th>
              <th class="col-2">{{ trans('Created At') }}</th>
              <th class="col-1">
                <div class="text-right">{{ trans('Action') }}</div>
              </th>
            </tr>
          </thead>
          <tbody v-if="posts.data != 0">
            <tr v-for="blog in posts.data" :key="blog.id">
              <td class="flex">
                <img v-lazy="blog.preview.value" class="avatar rounded-square mr-3" />
                <p>{{ textExcerpt(blog.title, 80) }}</p>
              </td>

              <td class="text-left">
                <span class="badge" :class="blog.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ blog.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>
                {{ moment(blog.created_at).format('D-MMM-Y') }}
              </td>
              <td>
                <div class="flex justify-end">
                  <div class="dropdown" data-placement="bottom-start">
                    <div class="dropdown-toggle">
                      <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                    </div>
                    <div class="dropdown-content w-40">
                      <ul class="dropdown-list">
                        <li class="dropdown-list-item">
                          <Link
                            :href="route('admin.blog-posts.edit', blog.id)"
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans('Edit') }}</span>
                          </Link>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            class="dropdown-link"
                            @click="
                              deleteRow(
                                route('admin.blog-posts.destroy', blog.id),
                                trans('Blog has been deleted successfully')
                              )
                            "
                          >
                            <i class="h-5 text-slate-400" data-feather="trash-2"
                              >{{ trans('Remove') }}></i
                            >
                            <span>{{ trans('Delete') }}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>

        <Paginate v-if="posts.data.length != 0" :links="posts.links" />
      </div>
      <!-- Customer Table Ends -->
    </div>
  </main>
</template>
