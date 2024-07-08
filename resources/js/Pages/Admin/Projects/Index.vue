<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, useForm } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import Paginate from '@/components/Paginate.vue'
import moment from 'moment'

import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()

const props = defineProps([
  'projects',
  'totalProjects',
  'activeProjects',
  'inActiveProjects',
  'buttons',
  'segments',
  'type'
])

const stats = [
  {
    value: props.totalProjects,
    title: trans('Total Projects'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.activeProjects,
    title: trans('Active Projects'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.inActiveProjects,
    title: trans('Inactive Projects'),
    iconClass: 'ti ti-thumb-up'
  }
]

const filterOptions = [
  {
    label: 'Project Title',
    value: 'title'
  },
  {
    label: 'Status',
    value: 'status',
    options: [
      {
        label: 'Active',
        value: 1
      },
      {
        label: 'Inactive',
        value: 0
      }
    ]
  }
]
</script>
<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader />

    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <FilterForm :options="filterOptions" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Project') }}</th>
              <th>{{ trans('Category') }}</th>
              <th>{{ trans('Address') }}</th>
              <th>{{ trans('Units') }}</th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('Expire') }}</th>
              <th>{{ trans('Created At') }}</th>
              <th class="!text-end">{{ trans('Action') }}</th>
            </tr>
          </thead>
          <tbody v-if="projects.data != 0">
            <tr v-for="project in projects.data" :key="project.id">
              <td>
                <a
                  target="_blank"
                  class="flex items-center"
                  :href="route('projects.show', project.slug)"
                >
                  <img v-lazy="project.preview" class="avatar rounded-square mr-3" />
                  <p>{{ project.title }}</p>
                </a>
              </td>

              <td>{{ project.category?.title }}</td>
              <td>{{ project.address }}</td>
              <td>{{ project.total_units }}</td>

              <td class="text-left">
                <span class="badge" :class="project.status == 1 ? 'badge-success' : 'badge-danger'">
                  {{ project.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>{{ moment(project.expire_date).format('D-MMM-Y') }}</td>
              <td>
                {{ moment(project.created_at).format('D-MMM-Y') }}
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
                            :href="route('admin.projects.edit', project.id)"
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
                                route('admin.projects.destroy', project.id),
                                trans('Category has been deleted successfully')
                              )
                            "
                          >
                            <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                            <span>{{ trans('Delete') }}</span>
                          </button>
                        </li>

                        <li class="dropdown-list-item">
                          <Link
                            :href="route('admin.return-schedules.index', project.id)"
                            class="dropdown-link"
                          >
                            <i class="h-5 text-slate-400" data-feather="arrow-down-right"></i>
                            <span>{{ trans('Schedules') }}</span>
                          </Link>
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
      </div>
      <Paginate :links="projects.links" />
    </div>
  </main>
</template>
