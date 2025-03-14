<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateGroup from "@/components/elements/create/CreateGroup.vue";
import CreateTag from "@/components/elements/create/CreateTag.vue";
import CreateItem from "@/components/elements/create/CreateItem.vue";
import ListTags from "@/components/elements/list/ListTags.vue";
import { onMounted } from "vue";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import ListGroups from "@/components/elements/list/ListGroups.vue";

onMounted(async () => {
  await useSupabaseStore().fetchTags();
  await useSupabaseStore().fetchGroups();
});
</script>

<template>
  <Tabs default-value="item" class="w-[400px]">
    <TabsList class="grid w-full grid-cols-3">
      <TabsTrigger value="item"> Item</TabsTrigger>
      <TabsTrigger value="group"> Group</TabsTrigger>
      <TabsTrigger value="tag"> Tag</TabsTrigger>
    </TabsList>
    <TabsContent value="item">
      <CreateItem />
    </TabsContent>
    <TabsContent value="group">
      <CreateGroup />
      <ListGroups class="mt-4" />
    </TabsContent>
    <TabsContent value="tag">
      <CreateTag />
      <ListTags class="mt-4" />
    </TabsContent>
  </Tabs>
</template>
