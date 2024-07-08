<script setup>
import { Head } from '@inertiajs/vue3'
import UserLayout from '@/Layouts/User.vue'
import sharedComposable from '@/composables/sharedComposable'
import trans from '@/composables/transComposable'
import Overview from '@/components/Admin/OverviewGrid.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
const { authUser, formatCurrency } = sharedComposable()
const props = defineProps(['pending_amount', 'approved_amount', 'methods', 'segments', 'buttons'])
defineOptions({ layout: UserLayout })
const stats = [
  {
    value: formatCurrency(authUser.value.wallet),
    title: trans('Available Balance'),
    iconClass: 'bx bx-dollar'
  },
  {
    value: props.approved_amount,
    title: trans('Pending For Withdraw'),
    iconClass: 'bx bx-dollar-circle'
  },
  {
    value: props.approved_amount,
    title: trans('Total Withdrawal Amount'),
    iconClass: 'ti ti-thumb-up'
  }
]
</script>

<template>
  <Head :title="trans('Payout Methods')" />
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader />

    <Overview :items="stats" grid="3" />
    <div class="mx-auto mt-10 space-y-4 xl:w-8/12">
      <div
        v-for="method in props.methods"
        :key="method.id"
        class="card flex items-center justify-between p-8"
      >
        <div class="flex items-center gap-x-5">
          <img class="w-32 rounded" v-lazy="method.image" alt="" />
          <div>
            <h4>
              <Link v-if="method.usermethod != null" :href="route('user.payout.edit', method.id)">
                {{ method.name }}
              </Link>
              <a v-else href="javascript:void(0)">{{ method.name }}</a>
            </h4>
            <p class="text-sm text-gray-500">
              {{ trans('Payout Limitation: ') }}
              <span class="text-gray-950 dark:text-white">
                {{ method.min_limit + ' - ' + method.max_limit }}
                {{ method.currency_name }}
              </span>
            </p>
          </div>
        </div>
        <div class="flex gap-x-2">
          <Link
            v-if="method.usermethod"
            :href="route('user.payout.show', method.id)"
            class="btn btn-success"
          >
            <i class="bx bx-plus text-lg"></i> {{ trans('Make Payout') }}
          </Link>

          <Link :href="route('user.payout.edit', method.id)" class="btn btn-secondary">
            <i class="bx bx-cog text-lg"></i> {{ trans('Setup') }}
          </Link>
        </div>
      </div>
    </div>
  </main>
</template>
