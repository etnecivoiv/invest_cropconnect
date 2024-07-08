<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { Link, useForm } from '@inertiajs/vue3'
import moment from 'moment'
import trans from '@/composables/transComposable'
import sharedComposable from '@/composables/sharedComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
import drawer from '@/Plugins/Admin/drawer'
import { onMounted } from 'vue'
import notify from '@/Plugins/Admin/notify'
import NoDataFound from '@/components/Admin/NoDataFound.vue'

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

const categoryForm = useForm({
  title: '',
  status: '1',
  language: 'en'
})

const storeCategory = () => {
  categoryForm.post(route('admin.blog-categories.store'), {
    onSuccess: () => {
      categoryForm.reset()
      notify.success(trans('Category has been added successfully'))
      drawer.of('#addNewCategoryDrawer').hide()
    }
  })
}

const editForm = useForm({
  title: '',
  status: '',
  lang: '',
  _method: 'put'
})

const openEditCategoryDrawer = (category) => {
  editForm.id = category.id
  editForm.title = category.title
  editForm.status = category.status
  editForm.lang = category.lang
  drawer.of('#editCategoryDrawer').show()
}

const updateCategory = () => {
  editForm.post(route('admin.blog-categories.update', editForm.id), {
    onSuccess: () => {
      editForm.reset()
      drawer.of('#editCategoryDrawer').hide()
      notify.success(trans('Category has been updated successfully'))
    }
  })
}
</script>

<template>
  <main class="container p-4 sm:p-6">
    <PageHeader title="Categories" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <Overview :items="stats" grid="3" />

      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans('Name') }}</th>
              <th class="">{{ trans('Slug') }}</th>
              <th class="text-center">{{ trans('Language') }}</th>
              <th class="">{{ trans('Status') }}</th>
              <th class="">{{ trans('Created At') }}</th>
              <th class="flex justify-end">{{ trans('Action') }}</th>
            </tr>
          </thead>

          <tbody v-if="categories.total">
            <tr v-for="category in categories.data" :key="category.id">
              <td class="text-left">
                {{ category.title }}
              </td>
              <td class="text-left">
                {{ category.slug }}
              </td>
              <td class="text-center">
                {{ category.lang }}
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
                {{ moment(category.created_at).format('D-MMM-Y') }}
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
                          <Link
                            as="button"
                            class="dropdown-link"
                            @click="deleteRow(route('admin.blog-categories.destroy', category.id))"
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
          <input
            v-model="categoryForm.title"
            type="text"
            name="title"
            class="input"
            placeholder="enter category title"
            required
          />
        </div>
        <div class="mb-2">
          <label>{{ trans('Status') }}</label>
          <select required v-model="categoryForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('InActive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans('Language') }}</label>
          <select required v-model="categoryForm.language" class="select" name="language">
            <template v-for="(language, key) in languages" :key="key">
              <option :value="key">{{ language }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="drawer-footer">
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" data-dismiss="drawer">
            <span> {{ trans('Close') }}</span>
          </button>
          <SpinnerBtn
            classes="btn btn-primary"
            :processing="categoryForm.processing"
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

        <div class="mb-2">
          <label>{{ trans('Status') }}</label>
          <select v-model="editForm.status" class="select" name="status">
            <option value="1">{{ trans('Active') }}</option>
            <option value="0">{{ trans('InActive') }}</option>
          </select>
        </div>
        <div class="mb-2">
          <label>{{ trans('Language') }}</label>
          <select v-model="editForm.lang" class="select" name="language">
            <template v-for="(language, key) in languages" :key="key">
              <option :value="key">{{ language }}</option>
            </template>
          </select>
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
