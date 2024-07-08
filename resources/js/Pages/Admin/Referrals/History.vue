<script setup>
import AdminLayout from "@/Layouts/Admin.vue"
import PageHeader from "@/Layouts/Admin/PageHeader.vue"
import { Link } from "@inertiajs/vue3"
import Paginate from "@/components/Paginate.vue"
import moment from "moment"
import { ref } from "vue"
import sharedComposable from "@/composables/sharedComposable"
import NoDataFound from "@/components/Admin/NoDataFound.vue"
defineOptions({ layout: AdminLayout })
const { deleteRow } = sharedComposable()
const props = defineProps(["histories", "buttons", "segments"])
</script>
<template>
  <main class="container p-4 sm:p-6">
    <PageHeader :title="trans('Referral History')" :segments="segments" :buttons="buttons" />
    <div class="space-y-6">
      <div class="table-responsive whitespace-nowrap rounded-primary">
        <table class="table">
          <thead>
            <tr>
              <th class="">{{ trans("Refer User") }}</th>
              <th class="">{{ trans("Referral User") }}</th>
              <th class="">{{ trans("Created At") }}</th>
            </tr>
          </thead>

          <tbody v-if="histories.total">
            <tr v-for="history in histories.data" :key="history.id">
              <td>
                <Link class="flex items-center gap-x-2" :href="`/admin/customers/${history.refer_user?.id}`">
                <img class="w-10 rounded-full" v-lazy="history.refer_user?.avatar == null
                  ? `https://ui-avatars.com/api/?name=${history.refer_user?.name}`
                  : `${history.refer_user?.avatar}`
                  " :alt="history.refer_user?.name" />
                {{ history.refer_user?.name }}
                </Link>
              </td>
              <td>
                <Link class="flex items-center gap-x-2" :href="`/admin/customers/${history.referral_user?.id}`">
                <img class="w-10 rounded-full" v-lazy="history.referral_user?.avatar == null
                  ? `https://ui-avatars.com/api/?name=${history.referral_user?.name}`
                  : `${history.referral_user?.avatar}`
                  " :alt="history.referral_user?.name" />
                {{ history.referral_user?.name }}
                </Link>
              </td>

              <td>
                {{ moment(history.created_at).format("DD MMM, YYYY") }}
              </td>
            </tr>
          </tbody>
          <NoDataFound v-else for-table="true" />
        </table>
        <Paginate :links="histories.links" />
      </div>
    </div>
  </main>
</template>
