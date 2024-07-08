<script setup>
import ValidationErrors from "@/components/Admin/ValidationErrors.vue";
import Seo from "@/components/Seo.vue";
</script>

<template>
  <Seo />
  <ValidationErrors />
  <slot></slot>
</template>


