<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import type { SB_Tag } from "@/stores/supabase/sb_tag.ts";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();
const tag = ref<SB_Tag>({
  name: "",
  description: "",
  created_at: new Date(),
  user_id: useSupabaseStore().user_id,
});

const errors = ref({
  name: "",
});

function validateForm() {
  errors.value.name = tag.value.name.trim() === "" ? "Name is required." : "";
  return !errors.value.name;
}

async function handleSubmit() {
  if (validateForm()) {
    toast({
      title: "Adding group...",
      description: await useSupabaseStore().createTag(tag.value),
    });
    await useSupabaseStore().fetchTags();
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Tag</CardTitle>
      <CardDescription>homemade, long-term, ect.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="name">Name</Label>
        <div>
          <Input id="name" v-model="tag.name" />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </p>
        </div>
      </div>
      <div class="space-y-1">
        <Label for="description">Description</Label>
        <Input id="description" v-model="tag.description" />
      </div>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button @click.prevent="handleSubmit">create new tag</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
