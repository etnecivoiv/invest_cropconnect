<script setup>
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import NestedComponent from '@/Layouts/Default/Common/NestedNavMenu.vue'
const mainMenu = computed(() => {
  return (
    usePage().props.menus.filter(item => item.position === 'main-menu') || []
  )
})
</script>

<template>
  <template v-for="items in mainMenu" :key="items.id">
    <li :class="{ 'menu-item-has-children': item.children?.length > 0 }" v-for="item in JSON.parse(items.data)"
      :key="item.id">

      <a v-if="item.children?.length > 0" href="#">
        {{ item.text }}
      </a>

      <Link v-else-if="item.href" :href="item.href" :target="item.target" role="button">
      {{ item.text }}
      </Link>
      <Link v-else href="#"> {{ item.text }} </Link>
      <template v-if="item.children?.length > 0">
        <NestedComponent :children="item.children" />
      </template>
    </li>
  </template>
</template>
