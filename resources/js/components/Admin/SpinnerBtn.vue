<script setup>
import { computed } from 'vue'


const defaultClasses = computed(() => {
  return "btn btn-primary flex items-center"
})

const props = defineProps({
  processing: Boolean,
  btnText: {
    type: String,
    default: "Save"
  },
  classes: {
    type: String,
    // default: "btn btn-primary btn-one align-items-center d-flex flex items-center mt-5"
    default: '' // for adminend default btn
  },
  size: {
    type: Number,
    default: 20
  }
})
</script>

<template>
  <button type="submit" :class="classes == '' ? defaultClasses : classes" :disabled="props.processing">
    <img v-show="props.processing ?? false" src="/assets/images/ajax_loading_white.svg" :style="{ height: props.size }" />
    <span v-html="props.btnText"></span>
  </button>
</template>
