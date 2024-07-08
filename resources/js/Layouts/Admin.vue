
<script setup>
import ToastrContainer from "@/components/ToastrContainer.vue"
import { onMounted } from "vue"
import Sidebar from "@/Layouts/Admin/Sidebar.vue"
import HeaderSection from "@/Layouts/Admin/Header.vue"
import ValidationErrors from "@/components/Admin/ValidationErrors.vue"
import Dropdown from "@/Plugins/Admin/dropdown"
import "@fortawesome/fontawesome-free/js/all"
import feather from "feather-icons"
import ResizeObserver from "resize-observer-polyfill"
import { onUpdated } from "vue"
import Modal from "@/components/Admin/Modal.vue"

onMounted(() => {
  Dropdown.init()
  feather.replace()
  window.ResizeObserver = ResizeObserver
})

onUpdated(() => {
  Dropdown.init()
  feather.replace()
})
</script>

<template>
  <div id="app">
    <ToastrContainer />
    <Modal />
    <!-- Sidebar Starts -->
    <Sidebar />
    <!-- Sidebar Ends -->

    <!-- Wrapper Starts -->
    <div class="wrapper">
      <!-- Header Starts -->
      <HeaderSection />
      <ValidationErrors />
      <!-- Header Ends -->

      <!-- Page Content Starts -->
      <div class="content">
        <!-- Main Content Starts -->
        <slot></slot>
        <!-- Main Content Ends -->
      </div>
      <!-- Page Content Ends -->
    </div>
    <!-- Wrapper Ends -->
  </div>
</template>
