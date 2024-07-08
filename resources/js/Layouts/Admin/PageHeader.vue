<script setup>
import { Head, usePage } from "@inertiajs/vue3"
const props = defineProps(["title", "buttons", "segments"])
const pageHeader = usePage().props.pageHeader ?? {}

const title = props.title ?? pageHeader.title ?? ""
const buttons = props.buttons ?? pageHeader.buttons ?? []
const segments = props.segments ?? pageHeader.segments ?? []
</script>

<template>
  <Head :title="title" />

  <div class="flex flex-col justify-between mb-4 gap-y-1 sm:flex-row sm:gap-y-0">
    <ol class="breadcrumb">
      <template v-if="segments.length">
        <li
          v-for="segment in segments"
          :key="segment.index"
          class="capitalize breadcrumb-item"
        >
          {{ segment }}
        </li>
      </template>
    </ol>
    <template v-if="segments.length">
      <div class="text-right">
        <template v-for="button in buttons" :key="button.index">
          <Link
            v-if="button.url != '#'"
            :href="button.url || '#'"
            class="mx-2 btn btn-sm btn-primary"
          >
            <div v-html="button.name"></div>
          </Link>
          <button
            v-else
            @click="(e) => e.preventDefault()"
            data-toggle="drawer"
            :data-target="button.target"
            class="mx-2 text-center btn btn-sm btn-primary"
          >
            <div v-html="button.name"></div>
          </button>
        </template>
      </div>
    </template>
  </div>
</template>
