<script setup>
import { Head, Link } from "@inertiajs/vue3";
import UserLayout from "@/Layouts/User.vue";
import moment from "moment";
defineOptions({ layout: UserLayout });

const { kyc } = defineProps(["kyc"]);
</script>

<template>
  <Head title="KYC verification | User Panel" />

  <main class="container flex-grow p-4 sm:p-6">
    <div class="card">
      <div class="card-body">
        <h2 class="main-title">{{ trans("KYC verification") }}</h2>
        <div class="flex justify-between mt-3 mb-5">
          <p>
            <strong>{{ trans("Status") }} : </strong>
            <span v-if="kyc.status == 0" class="badge badge-warning">
              {{ trans("Pending") }}</span
            >
            <span v-if="kyc.status == 1" class="badge badge-primary">
              {{ trans("Approved") }}</span
            >
            <span v-if="kyc.status == 2" class="badge badge-danger">
              {{ trans("Rejected") }}</span
            >
            <span v-if="kyc.status == 3" class="badge badge-dark">
              {{ trans("Re-Submitted") }}</span
            >
          </p>

          <p>
            <strong> {{ trans("Submitted At") }}:</strong>
            {{ moment(kyc.created_at).format("DD MMM, YYYY") }}
          </p>
          <p v-if="kyc.status == 2">
            <strong> {{ trans("Rejected At") }}:</strong>
            {{ moment(kyc.rejected_at).format("DD MMM, YYYY") }}
          </p>
        </div>

        <table class="table border table-hover">
          <thead>
            <tr class="bg-light">
              <th>{{ trans("Requirements") }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="border-top">
            <tr v-for="item in kyc.data" :key="item">
              <th>{{ item.label }}</th>
              <td>
                <p v-if="item.type != 'file'">{{ item.value }}</p>
                <a v-else target="_blank" :href="item.value" class="btn btn-success">{{
                  trans("View")
                }}</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-5 text-center">
          <Link :href="route('user.kyc.index', kyc.id)" class="btn btn-primary">
            {{ trans("Back to list") }}
          </Link>

          <Link
            v-if="kyc.status == 2"
            :href="route('user.kyc.resubmit', kyc.id)"
            class="btn btn-dark"
          >
            <i class="fas fa-redo"></i>
            {{ trans("Resubmit") }}
          </Link>
        </div>
      </div>
    </div>
  </main>
</template>
