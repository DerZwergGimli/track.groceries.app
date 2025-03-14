<script setup lang="ts">
import "./index.css";
import { useColorMode } from "@vueuse/core";
import { Separator } from "@/components/ui/separator";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { onMounted } from "vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Navbar from "@/components/elements/other/Navbar.vue";

useSupabaseStore();

useColorMode().value = "dark";
onMounted(async () => {
  await useSupabaseStore().loadUser();
});
</script>

<template>
  <Toaster />

  <div class="min-h-screen flex flex-col">
    <Navbar class="" />
    <Separator class="" />

    <div class="flex justify-center items-center flex-grow">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
