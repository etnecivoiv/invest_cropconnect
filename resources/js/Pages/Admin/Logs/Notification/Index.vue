<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { useForm } from '@inertiajs/vue3'
import sharedComposable from '@/composables/sharedComposable'
import Paginate from '@/components/Paginate.vue'
import trans from '@/composables/transComposable'
import moment from 'moment'
import Overview from '@/components/Admin/OverviewGrid.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import drawer from '@/Plugins/Admin/drawer'
import notify from '@/Plugins/Admin/notify'
import { onMounted } from 'vue'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })
const { textExcerpt, deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps([
  'segments',
  'buttons',
  'request',
  'allNotifications',
  'totalNotifications',
  'readNotifications',
  'unreadNotifications',
  'type'
])

const stats = [
  {
    value: props.totalNotifications,
    title: trans('Total Notifications'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.readNotifications,
    title: trans('Read Notifications'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.unreadNotifications,
    title: trans('Unread Notifications'),
    iconClass: 'ti ti-thumb-up'
  }
]

const form = useForm({
  email: '',
  title: '',
  description: '',
  url: ''
})

const createNotification = () => {
  form.post(route('admin.notification.store'), {
    onSuccess: () => {
      form.reset()
      notify.success(trans('Notification created successfully'))
      drawer.of('#addNewNotificationDrawer').hide()
    }
  })
}

const filterOptions = [
  {
    label: 'Title',
    value: 'notification'
  }
]
</script>
<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader title="Notifications" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <FilterForm :options="filterOptions" />

      <!-- Order Table Starts -->
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th>{{ trans('Title') }}</th>
              <th>{{ trans('Comment') }}</th>
              <th>{{ trans('User') }}</th>
              <th>{{ trans('Seen') }}</th>
              <th>{{ trans('Created At') }}</th>
              <th class="!text-right">{{ trans('Actions') }}</th>
            </tr>
          </thead>
          <tbody v-if="allNotifications.total">
            <tr v-for="notification in allNotifications.data" :key="notification.id">
              <td class="text-left">
                {{ textExcerpt(notification.title, 80) }}
              </td>
              <td>
                {{ textExcerpt(notification.comment, 50) }}
              </td>
              <td>
                {{ textExcerpt(notification.user.name, 15) }}
              </td>

              <td>
                <span
                  class="badge"
                  :class="notification.seen == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ notification.seen == 1 ? 'Read' : 'Unread' }}
                </span>
              </td>

              <td class="text-center">
                {{ moment(notification.created_at).format('DD-MMM-YYYY') }}
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
                          <a
                            class="dropdown-link delete-confirm"
                            href="javascript:void(0)"
                            @click="deleteRow(route('admin.notification.destroy', notification.id))"
                          >
                            <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                            <span>{{ trans('Delete') }}</span>
                          </a>
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
      <!-- Order Table Ends -->

      <!-- Order Pagination Starts -->
      <Paginate :links="allNotifications.links" />
      <!-- Order Pagination Ends -->
    </div>
  </main>

  <div id="addNewNotificationDrawer" class="drawer drawer-right">
    <form @submit.prevent="createNotification">
      <div class="drawer-header">
        <h5>{{ trans('Send Notification') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="form-group">
          <label>{{ trans('Receive Email') }}</label>
          <input v-model="form.email" type="email" name="email" class="input" required />
        </div>
        <div class="form-group">
          <label>{{ trans('Title') }}</label>
          <input
            v-model="form.title"
            type="text"
            name="title"
            class="input"
            required
            maxlength="100"
          />
        </div>
        <div class="form-group">
          <label>{{ trans('Description') }}</label>
          <textarea
            v-model="form.description"
            class="textarea"
            required
            name="description"
            maxlength="200"
          ></textarea>
        </div>
        <div class="form-group">
          <label>{{ trans('Action Link') }}</label>
          <input v-model="form.url" type="url" name="url" class="input" required maxlength="100" />
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary"
            :processing="form.processing"
            :btn-text="trans('Create Notification')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
