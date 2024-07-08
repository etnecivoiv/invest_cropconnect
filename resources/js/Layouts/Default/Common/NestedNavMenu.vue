<script setup>
import NestedComponent from '@/Layouts/Default/Common/NestedNavMenu.vue'
import { router } from '@inertiajs/vue3'
const props = defineProps({
  children: {
    type: [Array, Object]
  }
})

const closeMobileMenu = (hasChild) => {
  if (!hasChild) {
    document.querySelector('.openmobile-menu').classList.remove('active-mobile-menu');
    document.querySelector('.rt-mobile-menu-overlay').classList.remove('active');
  }
}

</script>

<template>
  <ul class="sub-menu">
    <li v-for="child in children" :key="child.id" :class="{ 'menu-item-has-children': child.children?.length > 0 }">

      <a v-if="child.children?.length > 0">
        {{ child.text }}
      </a>

      <a class="dropdown-item" v-else-if="child.target == '_top'" :href="child.href ?? '#'">
        {{ child.text }}
      </a>

      <Link v-else :href="child.href ?? '#'" :target="child.target"
        @click="closeMobileMenu(child.children?.length > 0)">
      {{ child.text }}
      </Link>

      <template v-if="child.children?.length > 0">
        <NestedComponent :children="child.children" />
      </template>
    </li>
  </ul>
</template>

<style>
.navbar .dropdown-menu:before {
  content: '';
}
</style>
