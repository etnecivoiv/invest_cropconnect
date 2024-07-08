<script setup>
import { onMounted } from "vue"
import tabs from "@/Plugins/Admin/tabs"
import AdminLayout from "@/Layouts/Admin.vue"
import PageHeader from "@/Layouts/Admin/PageHeader.vue"

import Primary from "@/Pages/Admin/PageSetting/Primary.vue"
import Home from "@/Pages/Admin/PageSetting/Home.vue"
import About from "@/Pages/Admin/PageSetting/About.vue"

defineOptions({ layout: AdminLayout })
onMounted(() => {
  tabs.init()
})

const props = defineProps(["primary_data", "home_page", "about_page"])
</script>

<template>
  <main class="container flex-grow p-4 sm:p-6">
    <PageHeader />

    <div class="space-y-6">
      <div class="card">
        <div class="card-body">
          <div class="tabs tabs-vertical">
            <ul class="tabs-list w-72">
              <li class="tabs-item">
                <button class="tabs-btn active" data-panel-id="#primary" type="button">
                  <span>{{ trans("Primary") }}</span>
                </button>
              </li>
              <li class="tabs-item">
                <button class="tabs-btn" data-panel-id="#home" type="button">
                  <span>{{ trans("Home Page") }}</span>
                </button>
              </li>

              <li class="tabs-item">
                <button class="tabs-btn" data-panel-id="#about" type="button">
                  <span>{{ trans("About Page") }}</span>
                </button>
              </li>
            </ul>

            <div class="tabs-content">
              <div class="tabs-panel active" id="primary">
                <Primary :data="primary_data" />
              </div>

              <div class="tabs-panel" id="home">
                <Home :data="home_page" />
              </div>

              <div class="tabs-panel" id="about">
                <About :data="about_page" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
