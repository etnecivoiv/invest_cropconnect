<script setup>
defineProps(["links"]);
</script>

<template>
  <div v-if="links.links.length > 3" class="pagination mt-14">
    <ul class="flex justify-center space-x-3">
      <li class="inline-flex">
        <Link
          :href="links.prev_page_url ?? '#'"
          v-if="links.prev_page_url"
          class="flex w-12 h-12 flex-col items-center justify-center bg-[#ECECEC] rounded font-semibold hover:bg-primary hover:text-white"
        >
          <iconify-icon
            icon="heroicons:chevron-double-left-20-solid"
            class="text-2xl"
          ></iconify-icon>
        </Link>
      </li>

      <li v-for="link in links.links.slice(1, -1)" class="inline-flex">
        <Link
          :href="link.url"
          class="flex flex-col items-center justify-center w-12 h-12 font-semibold transition-colors border rounded border-primary hover:bg-primary hover:text-white"
          :class="link.active ? 'bg-primary text-white' : 'text-primary'"
        >
          {{ link.label }}</Link
        >
      </li>

      <li class="inline-flex">
        <Link
          :href="links.next_page_url ?? '#'"
          v-if="links.next_page_url"
          class="flex w-12 h-12 flex-col items-center justify-center bg-[#ECECEC] rounded font-semibold hover:bg-primary hover:text-white"
        >
          <iconify-icon
            icon="heroicons:chevron-double-right-20-solid"
            class="text-2xl"
          ></iconify-icon>
        </Link>
      </li>
    </ul>
  </div>
</template>
