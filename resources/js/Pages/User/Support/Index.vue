<script setup>
import UserLayout from '@/Layouts/User.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link } from '@inertiajs/vue3'
import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import moment from 'moment'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import Paginate from '@/components/Paginate.vue'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: UserLayout })

const props = defineProps([
  'segments',
  'buttons',
  'request',
  'supports',
  'pendingSupport',
  'openSupport',
  'closedSupport',
  'totalSupports',
  'type'
])

const supportStats = [
  { value: props.totalSupports, title: trans('Total Supports') },
  { value: props.pendingSupport, title: trans('Pending Supports') },
  { value: props.openSupport, title: trans('Open Supports') },
  { value: props.closedSupport, title: trans('Closed Supports') }
]

function limitedString(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength) + '...'
  }
}

const filterOptions = [
  {
    label: 'User Email',
    value: 'email'
  },
  {
    label: 'Ticket No',
    value: 'ticket'
  },
  {
    label: 'Subject',
    value: 'subject'
  }
]
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader />
    <div class="space-y-6">
      <Overview :items="supportStats" />
      <FilterForm :options="filterOptions" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Ticket No') }}</th>
              <th>{{ trans('Subject') }}</th>
              <th>
                {{ trans('Conversations') }}
              </th>
              <th>{{ trans('Status') }}</th>
              <th>{{ trans('User') }}</th>
              <th>
                {{ trans('Created At') }}
              </th>
              <th>
                {{ trans('Ticket') }}
              </th>
            </tr>
          </thead>

          <tbody v-if="supports.total">
            <tr v-for="support in supports.data" :key="support.id">
              <td class="text-center">
                {{ support.ticket_no }}
              </td>
              <td>
                <a class="text-dark" :href="'/user/supports/' + support.id">
                  {{ limitedString(support.subject, 50) }}
                </a>
              </td>
              <td class="text-center">
                {{ support.conversations_count }}
              </td>
              <td>
                <span
                  :class="
                    support.status == 2
                      ? 'badge badge-warning'
                      : support.status == 1
                      ? 'badge badge-success'
                      : 'badge badge-danger'
                  "
                >
                  {{
                    trans(support.status == 2 ? 'pending' : support.status == 1 ? 'Open' : 'Closed')
                  }}
                </span>
              </td>
              <td class="text-center">
                <a :href="'/admin/customer/' + support.user_id" class="text-dark">
                  {{ support.user?.name ?? '' }}
                </a>
              </td>
              <td class="text-center">
                {{ moment(support.created_at).format('d MMM y') }}
              </td>
              <td>
                <Link :href="'/user/supports/' + support.id" class="btn btn-primary btn-sm">
                  {{ trans('View Ticket') }}
                </Link>
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>

        <Paginate v-if="supports.data.length != 0" :links="supports.links" />
      </div>
    </div>
  </main>
</template>
