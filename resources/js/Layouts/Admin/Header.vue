<script setup>
import sharedComposable from "@/composables/sharedComposable"
import { onMounted, ref } from "vue"
import themeSwitcher from "@/Plugins/Admin/themeSwitcher"
import { computed } from "vue"
import trans from '@/composables/transComposable'
import { usePage } from "@inertiajs/vue3"
const { authUser, logout } = sharedComposable()

onMounted(() => {
  themeSwitcher.init()
  modal.value = createModal(document.getElementById("search-modal"))
})

// notification
const notifications = usePage().props.notifications ?? []
const unreadNotifications = computed(() => {
  return notifications.filter((item) => item.seen == 0).length ?? 0
})

const maskAsRead = (item) => {
  axios.post(route("admin.notifications.read", item.id)).then((res) => {
    item.seen = 1
  })
}

// search modal
const modal = ref({})
const search = ref("")
const menuGroups = [
  {
    title: "General",
    pages: [
      {
        text: "Dashboard",
        uri: route("admin.dashboard"),
      },
      {
        text: "Orders",
        uri: route("admin.order.index"),
      },
      {
        text: "Projects",
        uri: route("admin.projects.index"),
      },

      {
        text: "Project Category",
        uri: route("admin.project-categories.index"),
      },
      {
        text: "Return Transactions",
        uri: route("admin.return-transaction"),
      },
      {
        text: "Invests",
        uri: route("admin.invest.index"),
      },
      {
        text: "Payment Gateways",
        uri: route("admin.gateways.index"),
      },
      {
        text: "Payout Methods",
        uri: route("admin.payout-methods.index"),
      },
      {
        text: "Payouts",
        uri: route("admin.payouts.index"),
      },
      {
        text: "Cron Jobs",
        uri: "/admin/cron-job",
      },
      {
        text: "Help & Support",
        uri: route("admin.support.index"),
      },

      {
        text: "Notifications",
        uri: route("admin.notification.index"),
      },
      {
        text: "Deposit Logs",
        uri: route("admin.deposit-logs.index"),
      },
      {
        text: "Posts",
        uri: route("admin.blog-posts.index"),
      },
      {
        text: "Categories",
        uri: route("admin.blog-categories.index"),
      },
      {
        text: "Tags",
        uri: route("admin.blog-tags.index"),
      },
      {
        text: "Faq's",
        uri: route("admin.faq.index"),
      },
      {
        text: "Features",
        uri: route("admin.features.index"),
      },
      {
        text: "Testimonials",
        uri: route("admin.testimonials.index"),
      },
      {
        text: "Partners",
        uri: route("admin.partner.index"),
      },
      {
        text: "Investors",
        uri: route("admin.investors.index"),
      },
      {
        text: "Events",
        uri: route("admin.events.index"),
      },
      {
        text: "Event Orders",
        uri: route("admin.event-orders.index"),
      },
      {
        text: "Referral History",
        uri: route("admin.refer-histories"),
      },
      {
        text: "Commission History",
        uri: route("admin.commission-histories"),
      },
      {
        text: "Team",
        uri: route("admin.team.index"),
      },
      {
        text: "Language",
        uri: route("admin.language.index"),
      },
      {
        text: "Menu",
        uri: route("admin.menu.index"),
      },

      {
        text: "Custom Pages",
        uri: route("admin.page.index"),
      },
      {
        text: "Seo Settings",
        uri: route("admin.seo.index"),
      },

      {
        text: "Create Method",
        uri: route("admin.kyc-methods.create"),
      },
      {
        text: "All Methods",
        uri: route("admin.kyc-methods.index"),
      },
      {
        text: "KYC Requests",
        uri: route("admin.kyc-requests.index"),
      },

      {
        text: "Page Settings",
        uri: route("admin.page-settings.index"),
      },
      {
        text: "Admin",
        uri: route("admin.admin.index"),
      },
      {
        text: "Roles",
        uri: route("admin.role.index"),
      },
      {
        text: "App Setting",
        uri: route("admin.developer-settings.show", "app-settings"),
      },
      {
        text: "SMTP Setting",
        uri: route("admin.developer-settings.show", "mail-settings"),
      },
      {
        text: "Storage Setting",
        uri: route("admin.developer-settings.show", "storage-settings"),
      },
      {
        text: "Profile Settings",
        uri: route("admin.profile.setting"),
      },
    ],
  },
]
const filteredMenuItems = computed(() => {
  return (
    menuGroups
      .map((item) => {
        return {
          ...item,
          // Search the pages array for pages that start with the search string
          pages: item.pages
            .filter((page) =>
              page.text?.toLowerCase().startsWith(search.value?.toLowerCase())
            )
            .map((item) => {
              item.text = trans(item.text)
              return item
            }),
        }
      })
      // Filter out items that have no pages
      .filter((item) => item.pages.length > 0)
  )
})
</script>

<template>
  <!-- Top nav -->
  <header class="header">
    <div class="flex items-center justify-between container-fluid">
      <!-- Sidebar Toggle & Search Starts -->
      <div class="flex items-center space-x-6">
        <button class="sidebar-toggle">
          <span class="flex space-x-4">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              ></path>
            </svg>
          </span>
        </button>

        <!-- Mobile Search Starts -->
        <div class="sm:hidden">
          <button
            type="button"
            @click="modal.show()"
            class="flex items-center justify-center transition-colors duration-150 rounded-full text-slate-500 hover:text-primary-500 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <i width="22" height="22" data-feather="search"></i>
          </button>
        </div>
        <!-- Mobile Search Ends -->

        <!-- Searchbar Start -->
        <button
          type="button"
          @click="modal.show()"
          class="items-center hidden h-10 px-3 overflow-hidden shadow-sm group w-72 rounded-primary bg-slate-100 dark:border-transparent dark:bg-slate-700 sm:flex"
        >
          <i class="text-slate-400" width="1em" height="1em" data-feather="search"></i>
          <span class="ml-2 text-sm text-slate-400">Search</span>
        </button>
        <!-- Searchbar Ends -->
      </div>
      <!-- Sidebar Toggle & Search Ends -->

      <!-- Header Options Starts -->

      <div class="flex items-center">
        <!-- Language Dropdown Starts -->
        <div class="dropdown" data-strategy="absolute">
          <div class="px-3 dropdown-toggle">
            <button
              type="button"
              class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"
            >

              <span class="hidden font-medium md:block">
                {{ $page.props?.languages[$page.props?.locale] }}</span
              >
              <span class="inline-block font-medium md:hidden">
                {{ $page.props?.locale?.toUpperCase() }}</span
              >
            </button>
          </div>

          <div class="w-40 mt-3 dropdown-content">
            <ul class="dropdown-list">
              <li
                v-for="(language, key) in $page.props.languages"
                :key="key"
                class="dropdown-list-item"
              >
                <Link
                  as="button"
                  :href="route('set-locale', key)"
                  method="patch"
                  class="dropdown-btn"
                >
                
                  <span class="">{{ language }}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <!-- Language Dropdown Ends -->

        <!-- Dark Mood Toggle Starts -->
        <div class="dropdown" data-strategy="absolute" id="theme-switcher-dropdown">
          <button
            class="px-3 dropdown-toggle text-slate-500 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500"
            type="button"
          >

            <i class="hidden dark:block" width="24" height="24" data-feather="moon"
              >Dark</i
            >
            <i class="block dark:hidden" width="24" height="24" data-feather="sun"
              >Light</i
            >
          </button>

          <div class="mt-3 dropdown-content w-36">
            <ul class="dropdown-list">
              <li class="dropdown-list-item">
                <button type="buttton" class="dropdown-btn" data-theme-mode="light">
                  <i width="16" height="16" data-feather="sun"></i>
                  <span>Light</span>
                </button>
              </li>

              <li class="dropdown-list-item">
                <button type="buttton" class="dropdown-btn" data-theme-mode="dark">
                  <i width="16" height="16" data-feather="moon"></i>
                  <span>Dark</span>
                </button>
              </li>

              <li class="dropdown-list-item">
                <button type="buttton" class="dropdown-btn" data-theme-mode="system">
                  <i width="16" height="16" data-feather="monitor"></i>
                  <span>System</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- Dark Mood Toggle Ends -->

        <!-- Notification Dropdown Starts -->
        <div class="dropdown -mt-0.5" data-strategy="absolute">
          <div class="px-3 dropdown-toggle">
            <button
              class="relative flex items-center justify-center mt-1 transition-colors duration-150 rounded-full text-slate-500 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500"
            >
              <i width="24" height="24" data-feather="bell"></i>
              <span
                v-if="unreadNotifications"
                class="absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[11px] text-slate-200"
              >
                {{ unreadNotifications }}
              </span>
            </button>
          </div>

          <div
            class="dropdown-content mt-3 w-[17.5rem] divide-y dark:divide-slate-700 sm:w-80"
          >
            <div class="flex items-center justify-between px-4 py-4">
              <h6 class="text-slate-800 dark:text-slate-300">
                {{ trans("Notifications") }}
              </h6>
              <button
                class="text-xs font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300"
                v-if="notifications.length"
              >
                {{ trans("Clear All") }}
              </button>
            </div>

            <div class="w-full h-80" data-simplebar>
              <ul>
                <template v-if="notifications.length">
                  <li
                    v-for="(item, index) in notifications"
                    :key="index"
                    @click="maskAsRead(item)"
                    class="flex gap-4 px-4 py-3 transition-colors duration-150 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-700"
                  >
                    <div
                      class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-blue-500 bg-blue-100 rounded-full"
                    >
                      <i class="bx bx-user-voice" width="20" height="20"></i>
                    </div>

                    <a :href="item.url ?? '#'">
                      <h6 class="text-sm font-normal">{{ item.title }}</h6>
                      <p class="text-xs text-slate-400" :title="item.comment">
                        {{ item.comment_short }}
                      </p>
                      <p class="flex items-center gap-1 mt-1 text-xs text-slate-400">
                        <i data-feather="clock" width="1em" height="1em"></i>
                        <span>{{ item.created_at_human_date }}</span>
                      </p>
                    </a>
                  </li>
                </template>
                <li v-else class="mt-5 text-center">{{ trans("no notifications") }}</li>
              </ul>
            </div>

            <div class="px-4 py-2" v-if="notifications.length > 5">
              <Link
                :href="route('admin.notification.index')"
                class="w-full btn btn-primary-plain btn-sm"
              >
                <span>{{ trans("View More") }}</span>
                <i data-feather="arrow-right" width="1rem" height="1rem"></i>
              </Link>
            </div>
          </div>
        </div>
        <!-- Notification Dropdown Ends -->

        <!-- Profile Dropdown Starts -->
        <div class="dropdown" data-strategy="absolute">
          <div class="pl-3 dropdown-toggle">
            <button class="group relative flex items-center gap-x-1.5" type="button">
              <div class="avatar avatar-circle avatar-indicator avatar-indicator-online">
                <img
                  class="avatar-img group-focus-within:ring group-focus-within:ring-primary-500"
                  v-lazy="
                    authUser.avatar == null
                      ? `https://ui-avatars.com/api/?name=${authUser.name}`
                      : `${authUser.avatar}`
                  "
                  :alt="authUser.name"
                />
              </div>
            </button>
          </div>

          <div class="w-56 mt-1 divide-y dropdown-content dark:divide-slate-600">
            <div class="px-4 py-3">
              <p class="text-sm">
                Welcome <strong>{{ authUser.name }}</strong
                >!
              </p>
              <p class="text-sm font-medium truncate">({{ authUser.email }})</p>
            </div>
            <div class="py-1">
              <Link :href="route('admin.profile.setting')" class="dropdown-link">
                <i width="18" height="18" data-feather="user" class="text-slate-500"></i>
                <span>Profile</span>
              </Link>
              <Link :href="route('admin.support.index')" class="dropdown-link">
                <i
                  width="18"
                  height="18"
                  data-feather="help-circle"
                  class="text-slate-500"
                ></i>
                <span>Support</span>
              </Link>
              <Link :href="route('clear-cache')" class="dropdown-link">
                <i
                  width="18"
                  height="18"
                  data-feather="database"
                  class="text-slate-500"
                ></i>
                <span>Clear Cache</span>
              </Link>
            </div>
            <div class="py-1">
              <form method="POST" action="#">
                <button type="button" @click="logout()" class="dropdown-btn">
                  <i
                    width="18"
                    height="18"
                    data-feather="log-out"
                    class="text-slate-500"
                  ></i>
                  <span>{{ trans('Sign out') }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- Profile Dropdown Ends -->
      </div>
      <!-- Header Options Ends -->
    </div>
  </header>
  <!-- Header -->

  <!-- Search Modal Start -->
  <div class="modal" id="search-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="px-4 modal-header sm:px-6">
          <div class="flex items-center group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search text-slate-500 group-focus-within:text-slate-600 dark:text-slate-400 dark:group-focus-within:text-slate-300"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
              type="text"
              v-model="search"
              class="w-full text-sm bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 focus:ring-0 dark:text-slate-200"
              placeholder="Search"
            /><button
              class="rounded-primary bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              data-dismiss="modal"
            >
              {{ trans('ESC') }}
            </button>
          </div>
        </div>
        <div class="modal-body max-h-[600px] px-4 py-6 sm:px-6" data-simplebar="init">
          <div class="-mt-[12px] space-y-4">
            <div v-for="(group, index) in filteredMenuItems" :key="index" class="">
              <h6>{{ group.title }}</h6>
              <ul class="mt-2 space-y-2">
                <li v-for="(page, index) in group.pages" :key="index" class="">
                  <Link
                    @click="modal.hide()"
                    :href="page.uri || '#'"
                    class="flex items-center gap-2 px-4 py-2 text-sm shadow-sm rounded-primary bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
                  >
                   
                    <span>{{ page.text }}</span>
                    <i class="ml-auto ti ti-chevron-right text-slate-500"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"></div>
  </div>
  <!-- Search Modal Ends -->
</template>
