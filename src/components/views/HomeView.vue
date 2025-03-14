<script setup lang="ts">
import { onMounted } from "vue";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import GroupsWithItems from "@/components/elements/list/GroupsWithItems.vue";

onMounted(async () => {
  await update();
});

async function update() {
  await useSupabaseStore().fetchGroups();
  await useSupabaseStore().fetchItems();
  await useSupabaseStore().fetchTags();
}
</script>

<template>
  <GroupsWithItems />
</template>
