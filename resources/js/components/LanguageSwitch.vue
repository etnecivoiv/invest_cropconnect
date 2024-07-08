<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const selectContainer = ref(null)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const outsideClick = (event) => {
  if (isOpen.value && !selectContainer.value.contains(event.target)) {
    isOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div class="border nice-select" :class="{ open: isOpen }">
    <div class="current me-2" @click.stop="toggleDropdown">
      {{ $page.props.languages[$page.props.locale] }}
    </div>

    <ul class="list" ref="selectContainer">
      <li
        class="option"
        :class="{
          'selected focus': key === $page.props.locale
        }"
        v-for="(language, key) in $page.props.languages"
        :key="key"
      >
        <Link as="button" :href="route('set-locale', key)" method="patch" class="w-full dropdown-btn text-start">
          {{ trans(language) }}
        </Link>
      </li>
    </ul>
  </div>
</template>
