<script setup>
defineProps({
  PageName: {
    default: 'default'
  }
})
</script>
<template>
  <div
    class="breadcrumbs section-padding bg-[url('../images/all-img/bred.png')] bg-cover bg-center bg-no-repeat"
  >
    <div class="container text-center">
      <h2>{{ trans(PageName) }}</h2>
      <nav>
        <ol class="flex items-center justify-center space-x-3">
          <li class="breadcrumb-item">
            <Link href="/">{{ trans('Home') }} </Link>
          </li>
          <li class="breadcrumb-item">-</li>
          <li class="text-primary">{{ trans(PageName) }}</li>
        </ol>
      </nav>
    </div>
  </div>
</template>
