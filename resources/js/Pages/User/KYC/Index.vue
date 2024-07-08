<script setup>
import { Head, Link } from "@inertiajs/vue3";
import NoDataFound from "@/components/Admin/NoDataFound.vue";
import UserLayout from "@/Layouts/User.vue";
import sharedComposable from "@/composables/sharedComposable";
const { KYCDocuments } = defineProps(["KYCDocuments"]);
const { authUser } = sharedComposable();
defineOptions({ layout: UserLayout });
</script>

<template>
  <Head title="KYC Requests | User Panel" />

  <main class="container p-4 sm:p-6">
    <h4 class="text-center" v-if="authUser.kyc_verified_at">
      <span class="badge badge-success">
        {{ trans("Congratulations, You are verified now") }}
      </span>
    </h4>

    <div v-else class="alert alert-info">
      <p>{{ trans("Profile verification is not completed") }}</p>
      <Link class="btn btn-primary" :href="route('user.kyc.create')">{{
        trans("Verify KYC")
      }}</Link>
    </div>

    <div class="mt-3 card">
      <div class="card-body">
        <h2 class="card-title">{{ trans("KYC verification") }}</h2>
        <div class=" table-responsive">
          <table class="table job-alert-table">
            <thead class="border-0">
              <tr>
                <th>{{ trans("Method") }}</th>
                <th>{{ trans("Status") }}</th>
                <th>{{ trans("Note") }}</th>
                <th>{{ trans("Documents") }}</th>
                <th>{{ trans("Action") }}</th>
              </tr>
            </thead>
            <tbody class="border-top-0" v-if="KYCDocuments.total">
              <tr v-for="(document, index) in KYCDocuments.data" :key="index">
                <td>{{ document.method.title ?? null }}</td>
                <td>
                  <span v-if="document.status == 0" class="badge badge-warning">
                    {{ trans("Pending") }}</span
                  >
                  <span v-else-if="document.status == 1" class="badge badge-primary">
                    {{ trans("Approved") }}</span
                  >
                  <span v-else-if="document.status == 2" class="badge badge-danger">
                    {{ trans("Rejected") }}</span
                  >
                  <span v-else-if="document.status == 3" class="badge badge-dark">
                    {{ trans("Re-Submitted") }}</span
                  >
                </td>
                <td>{{ document.note }}</td>
                <td>{{ document.data?.length ?? 0 }}</td>
                <td class="text-end">
                  <Link
                    v-if="document.status == 2"
                    class="py-2 btn btn-dark me-4"
                    :href="route('user.kyc.resubmit', document.id)"
                  >
                    {{ trans("Re Submit") }}
                  </Link>

                  <Link class="btn btn-primary" :href="route('user.kyc.show', document.id)">
                    <i class="fas fa-eye"></i>
                  </Link>
                </td>
              </tr>
              <tr></tr>
            </tbody>
            <NoDataFound v-else for-table="true" />
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
