<script setup>
const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  classes: String,
  size: {
    type: Number,
    default: 30
  }
})
</script>

<template>
  <p
    v-show="message?.length"
    class="text-danger mb-0 mt-1 text-sm text-red-500 lh-14"
    :class="classes"
  >
    {{ message.replace(/[.,]/g, ' ') }}
  </p>
</template>
