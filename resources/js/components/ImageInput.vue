<script setup lang="ts">
import { onMounted } from "vue"
import { ref } from "vue"

const props = defineProps(["label", "modelValue"])
const emit = defineEmits(["update:modelValue"])

const filePreviewUrl = ref<String | ArrayBuffer>("")

onMounted(() => {
  if (typeof props.modelValue === "string") {
    filePreviewUrl.value = props.modelValue
  }
})

const updateModelValue = (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    filePreviewUrl.value = reader.result
  }

  emit("update:modelValue", file)
}
</script>

<template>
  <div>
    <label v-if="label.length" class="label mb-1">{{ label }}</label>
    <div class="flex items-center gap-x-2">
      <input
        type="file"
        accept="image/*"
        class="input"
        @input="updateModelValue($event.target.files[0])"
      />
      <a
        v-if="filePreviewUrl && typeof filePreviewUrl === 'string'"
        :href="filePreviewUrl"
        target="_blank"
      >
        <img
          v-lazy="filePreviewUrl"
          @error="filePreviewUrl = '/assets/images/no-image-icon.png'"
          class="h-8"
        />
      </a>
    </div>
  </div>
</template>
