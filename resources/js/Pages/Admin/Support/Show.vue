<template>
  <main class="container flex-grow p-4 sm:pr-4">
    <PageHeader title="Support" :segments="segments" :buttons="buttons" />
    <div class="space-y-6 h-fit">
      <div class="h-full">
        <div class="relative mx-auto bg-white shadow rounded-primary dark:bg-slate-800 2xl:w-8/12">
          <div
            class="flex items-center justify-between p-4 border-b rounded-t-primary border-b-slate-200 dark:border-b-slate-600"
          >
            <div class="flex items-center justify-start gap-x-3">
              <button
                id="chat-btn-show-sidebar"
                class="text-slate-500 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300 xl:hidden"
              >
                <i width="20" height="20" data-feather="menu"></i>
              </button>
              <div class="avatar avatar-circle avatar-indicator avatar-indicator-online">
                <img
                  class="avatar-img"
                  v-lazy="
                    support.user?.avatar
                      ? support.user?.avatar
                      : `https://ui-avatars.com/api/?name=${support.user?.name}`
                  "
                  alt="profile-img"
                />
              </div>

              <div>
                <h6
                  class="text-sm font-medium whitespace-nowrap text-slate-700 dark:text-slate-100"
                >
                  {{ support.user?.name }}
                </h6>
                <p class="text-sm font-normal whitespace-normal text-slate-500 dark:text-slate-400">
                  {{ trans('Subject :') }} {{ support.subject ?? '' }}
                </p>
              </div>
            </div>
            <!-- Avatar and Menu Button End -->
          </div>

          <div
            class="relative max-h-[calc(100vh-18rem)] overflow-auto px-4 pb-28 md:max-h-[calc(100vh-17rem)]"
            data-simplebar
          >
            <ul class="space-y-3">
              <!-- Friend Chat -->
              <li
                class="mt-5 group"
                :class="reply.is_admin != 0 ? 'pr' : ''"
                v-for="reply in support.conversations"
                :key="reply.id"
              >
                <div class="flex gap-x-3 group-[.pr]:flex-row-reverse">
                  <div class="avatar avatar-circle avatar-sm shrink-0">
                    <img
                      class="avatar-img"
                      v-lazy="
                        reply.user.avatar
                          ? reply.user.avatar
                          : `https://ui-avatars.com/api/?name=${reply.user.name}`
                      "
                      onerror="this.src = '/images/avatar1.png'"
                      alt="profile-img"
                    />
                  </div>
                  <div class="flex max-w-sm flex-col items-start gap-y-2 group-[.pr]:items-end">
                    <p
                      class="rounded-primary rounded-tl-none bg-slate-100 p-2 text-sm text-slate-600 group-[.pr]:rounded-tl-primary group-[.pr]:rounded-tr-none group-[.pr]:bg-primary-500 group-[.pr]:text-slate-100 dark:bg-slate-700 dark:text-slate-300"
                    >
                      {{ reply.comment }}
                    </p>
                    <span class="text-xs font-normal text-slate-400">
                      {{ moment(reply.created_at).format('D MMM, YYYY') }}</span
                    >
                  </div>
                </div>
              </li>
            </ul>
            <!-- For Div: Scroll To Bottom  -->
            <div id="chat-scroll-view"></div>
          </div>

          <div
            class="absolute bottom-[-0.5px] left-0 right-0 z-10 rounded-b-primary bg-white py-4 dark:bg-slate-800"
          >
            <form
              @submit.prevent="updateSupport"
              class="mx-4 flex h-[4.5rem] items-center rounded-primary border border-slate-200 shadow dark:border-slate-600"
            >
              <input
                v-model="form.message"
                class="w-full h-full px-4 text-sm bg-transparent border-transparent text-slate-700 placeholder:text-slate-500 focus:border-transparent focus:ring-0 dark:text-slate-300 dark:placeholder:text-slate-400"
                type="text"
                placeholder="Type your message here"
              />
              <div class="flex items-center justify-end px-4 gap-x-4">
                <select class="select w-[120px]" name="status" v-model="form.status">
                  <option value="1">
                    {{ trans('Open') }}
                  </option>
                  <option value="2">
                    {{ trans('Pending') }}
                  </option>
                  <option value="0">
                    {{ trans('Closed') }}
                  </option>
                </select>

                <button type="submit" :disabled="form.processing" class="btn btn-sm btn-primary">
                  <i width="18" height="18" data-feather="send"></i>
                  <span class="hidden md:inline-block">{{ trans('Send') }}</span>
                </button>
              </div>
            </form>
          </div>
          <!-- Chat Wrapper Footer Ends -->
        </div>

        <div
          id="chat-overlay"
          class="absolute inset-0 z-10 hidden w-full h-full transition-colors duration-300 ease-in-out bg-black bg-opacity-0 xl:hidden"
        ></div>
        <!-- Email Overlay Ends -->
      </div>
    </div>
  </main>
</template>

<script setup>
import AdminLayout from '@/Layouts/Admin.vue'
import PageHeader from '@/Layouts/Admin/PageHeader.vue'
import { router } from '@inertiajs/vue3'
import moment from 'moment'
import { ref } from 'vue'
import notify from '@/Plugins/Admin/notify'

defineOptions({ layout: AdminLayout })

const props = defineProps(['segments', 'buttons', 'support'])

const form = ref({
  message: '',
  status: props.support.status
})

const updateSupport = () => {
  router.patch(
    route('admin.support.update', props.support.id),
    {
      status: form.value.status,
      message: form.value.message
    },
    {
      onSuccess: () => {
        form.value.message = ''
        notify.success('Submitted successfully')
      }
    }
  )
}
</script>
