<script setup lang="ts">
import LoginComponent from "@/components/elements/other/LoginComponent.vue";
import Menubar from "@/components/elements/navigation/Menubar.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <nav class="">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <Icon icon="tabler:book-filled" width="52" height="52" />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >FoodShelf</span
        >
      </a>
      <div>
        <Menubar />
      </div>
      <LoginComponent />
    </div>
  </nav>
</template>

<style scoped></style>
