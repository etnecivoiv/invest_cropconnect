<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import sharedComposable from '@/composables/sharedComposable'
import Paginate from '@/components/Paginate.vue'
import Overview from '@/components/Admin/OverviewGrid.vue'
import trans from '@/composables/transComposable'

defineOptions({ layout: AdminLayout })
const { textExcerpt, deleteRow } = sharedComposable()
const props = defineProps([
  'pages',
  'totalActivePosts',
  'totalInActivePosts',
  'totalPosts',
  'buttons',
  'segments'
])
const pageStats = [
  {
    value: props.totalPosts,
    title: trans('Total Page'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.totalActivePosts,
    title: trans('Active Page'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.totalInActivePosts,
    title: trans('Inactive Page'),
    iconClass: 'ti ti-thumb-up'
  }
]
</script>

<template>
  <main class="container p-4 sm:p-6">
    <PageHeader title="Custom Page" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="pageStats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="col-2">{{ trans('Title') }}</th>
              <th class="col-4">{{ trans('Url') }}</th>
              <th class="col-1">{{ trans('Status') }}</th>
              <th class="col-2">{{ trans('Created At') }}</th>
              <th class="col-1 text-right">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in pages.data" :key="page.id">
              <td class="text-left">
                {{ textExcerpt(page.title, 50) }}
              </td>
              <td class="text-left">
                <a :href="page.posturl" target="_blank">{{ textExcerpt(page.posturl, 100) }}</a>
              </td>

              <td class="text-left">
                <span class="badge" :class="page.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ page.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>
                {{ page.created_at_diff }}
              </td>

              <td>
                <div class="dropdown" data-placement="bottom-start">
                  <div class="dropdown-toggle">
                    <i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
                  </div>
                  <div class="dropdown-content w-40">
                    <ul class="dropdown-list">
                      <li class="dropdown-list-item">
                        <Link :href="route('admin.page.edit', page.id)" class="dropdown-link">
                          <i class="h-5 text-slate-400" data-feather="edit"></i>
                          <span>{{ trans('Edit') }}</span>
                        </Link>
                      </li>

                      <li class="dropdown-list-item">
                        <button
                          as="button"
                          class="dropdown-link"
                          @click="deleteRow(route('admin.page.destroy', page.id))"
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
              </td>
            </tr>
          </tbody>
        </table>
        <template v-if="pages.data.length == 0">
          <div class="mt-2 text-center">
            <div class="alert bg-gradient-primary text-white">
              <span class="text-left">{{ trans('!Opps no records found') }}</span>
            </div>
          </div>
        </template>

        <Paginate :links="pages.links" />
      </div>
    </div>
  </main>
</template>
