<script setup>
defineProps(['links'])
</script>

<template>
  <div v-if="links.length > 3">
    <div class="mt-3 paginate-container">
      <template v-for="(link, key) in links">
        <div
          v-if="link.url === null"
          :key="key"
          class="border border-gray-200 paginate-link paginate-link-null dark:border-gray-600"
          v-html="link.label"
        ></div>
        <Link
          v-else
          :key="`link-${key}`"
          class="border border-gray-300 paginate-link paginate-link-active dark:border-gray-700"
          :class="{ 'paginate-link-active-bg': link.active }"
          :href="link.url"
        >
          <span v-html="link.label"></span>
        </Link>
      </template>
    </div>
  </div>
</template>
