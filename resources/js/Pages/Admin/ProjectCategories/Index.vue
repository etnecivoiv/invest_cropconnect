<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, useForm, router } from '@inertiajs/vue3'
import moment from 'moment'
import { ref } from 'vue'
import trans from '@/composables/transComposable'
import sharedComposable from '@/composables/sharedComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import drawer from '@/Plugins/Admin/drawer'
import { onMounted } from 'vue'
import notify from '@/Plugins/Admin/notify'
import NoDataFound from '@/components/Admin/NoDataFound.vue'
import FilterForm from '@/components/Admin/FilterForm.vue'

defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()

onMounted(() => {
  drawer.init()
})

const props = defineProps([
  'categories',
  'totalCategories',
  'activeCategories',
  'inActiveCategories',
  'languages',
  'buttons',
  'segments'
])

const stats = [
  {
    value: props.totalCategories,
    title: trans('Total Categories'),
    iconClass: 'bx bx-box'
  },
  {
    value: props.activeCategories,
    title: trans('Active Categories'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.inActiveCategories,
    title: trans('Inactive Categories'),
    iconClass: 'ti ti-thumb-up'
  }
]

const form = useForm({
  title: '',
  preview: '',
  status: true,
  description: ''
})

const storeCategory = () => {
  form.post(route('admin.project-categories.store'), {
    onSuccess: () => {
      form.reset()
      drawer.of('#addNewCategoryDrawer').hide()
      notify.success(trans('Category has been added successfully'))
    }
  })
}

const editForm = ref({})

const openEditCategoryDrawer = (category) => {
  editForm.value = {
    id: category.id,
    title: category.title,
    preview: '',
    status: category.status ? 'true' : 'false',
    description: category.meta?.value ?? '',
    _method: 'put'
  }
  drawer.of('#editCategoryDrawer').show()
}

const updateCategory = () => {
  editForm.value.processing = true
  router.post(route('admin.project-categories.update', editForm.value.id), editForm.value, {
    onSuccess: () => {
      editForm.value = {}
      notify.success(trans('Category has been updated successfully'))
      drawer.of('#editCategoryDrawer').hide()
    },
    onFinish: () => (editForm.value.processing = false)
  })
}

const filterOptions = [
  {
    label: 'Category Title',
    value: 'title'
  }
]
</script>
<template>
  <main class="container p-4 sm:p-6">
    <PageHeader title="Categories" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <FilterForm :options="filterOptions" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans('Preview') }}</th>
              <th class="">{{ trans('Name') }}</th>
              <th class="">{{ trans('Slug') }}</th>
              <th class="">{{ trans('Status') }}</th>
              <th class="">{{ trans('Created At') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>

          <tbody v-if="categories.total">
            <tr v-for="category in categories.data" :key="category.id">
              <td class="text-left">
                <a :href="`/projects/categories/` + category.slug" target="_blank">
                  <img v-lazy="category.preview" class="w-16" />
                </a>
              </td>
              <td class="text-left">
                <a :href="`/projects/categories/` + category.slug" target="_blank">{{
                  category.title
                }}</a>
              </td>
              <td class="text-left">
                {{ category.slug }}
              </td>
              <td class="text-left">
                <span
                  class="badge"
                  :class="category.status == 1 ? 'badge-success' : 'badge-danger'"
                >
                  {{ category.status == 1 ? trans('Active') : trans('Draft') }}
                </span>
              </td>
              <td>
                {{ moment(category.created_at).format('DD MMM, YYYY') }}
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
                          <button @click="openEditCategoryDrawer(category)" class="dropdown-link">
                            <i class="h-5 text-slate-400" data-feather="edit"></i>
                            <span>{{ trans('Edit') }}</span>
                          </button>
                        </li>

                        <li class="dropdown-list-item">
                          <button
                            class="dropdown-link"
                            @click="deleteRow('/admin/project-categories/' + category.id)"
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
      </div>
    </div>
  </main>

  <div id="addNewCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="storeCategory()">
      <div class="drawer-header">
        <h5>{{ trans('Add New Category') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans('Title') }}</label>
          <input v-model="form.title" type="text" name="title" class="input" required />
        </div>
        <div class="">
          <label>{{ trans('Category Preview') }}</label>
          <input
            type="file"
            @change="($event) => (form.preview = $event.target.files[0])"
            class="input"
            accept="image/*"
          />
        </div>

        <div class="mb-2 mt-2">
          <label>{{ trans('Short Description') }}</label>
          <textarea v-model="form.description" class="textarea" maxlength="500"></textarea>
        </div>

        <div class="mb-2 mt-3">
          <div>
            <label for="toggle-status" class="toggle toggle-sm">
              <input
                v-model="form.status"
                class="toggle-input peer sr-only"
                id="toggle-status"
                type="checkbox"
              />
              <div class="toggle-body"></div>
              <span class="label label-md">{{ trans('Make it publish?') }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex items-center space-x-4">
          <button type="button" class="btn btn-secondary w-full" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="w-full btn btn-primary"
            :processing="form.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>

  <div id="editCategoryDrawer" class="drawer drawer-right">
    <form @submit.prevent="updateCategory()">
      <div class="drawer-header">
        <h5>{{ trans('Edit Category') }}</h5>
        <button
          type="button"
          class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
          data-dismiss="drawer"
        >
          <i data-feather="x" width="1.5rem" height="1.5rem"></i>
        </button>
      </div>
      <div class="drawer-body">
        <div class="mb-2">
          <label>{{ trans('Title') }}</label>
          <input v-model="editForm.title" type="text" name="title" class="input" required />
        </div>
        <div class="">
          <label>{{ trans('Category Preview') }}</label>
          <input
            type="file"
            @change="($event) => (editForm.preview = $event.target.files[0])"
            class="input"
            accept="image/*"
          />
        </div>

        <div class="mb-2 mt-2">
          <label>{{ trans('Short Description') }}</label>
          <textarea v-model="editForm.description" class="textarea" maxlength="500"></textarea>
        </div>

        <div class="mb-2 mt-3">
          <div>
            <label for="toggle-update-status" class="toggle toggle-sm">
              <input
                v-model="editForm.status"
                class="toggle-input peer sr-only"
                id="toggle-update-status"
                type="checkbox"
              />
              <div class="toggle-body"></div>
              <span class="label label-md">{{ trans('Make it publish?') }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary"
            :processing="editForm.processing"
            :btn-text="trans('Save Changes')"
          />
        </div>
      </div>
    </form>
  </div>
</template>
