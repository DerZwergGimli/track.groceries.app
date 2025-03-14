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
import type { SB_Group } from "@/stores/supabase/sb_group.ts";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();
const group = ref<SB_Group>({
  name: "",
  description: "",
  created_at: new Date(),
  user_id: useSupabaseStore().user_id,
});

const errors = ref({
  name: "",
});

function validateForm() {
  errors.value.name = group.value.name.trim() === "" ? "Name is required." : "";
  return !errors.value.name;
}

async function handleSubmit() {
  if (validateForm()) {
    toast({
      title: "Adding group...",
      description: await useSupabaseStore().createGroup(group.value),
    });
    useSupabaseStore().fetchGroups();
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Group</CardTitle>
      <CardDescription> fridge, storage, etc.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="name">Name</Label>
        <div>
          <Input id="name" v-model="group.name" />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </p>
        </div>
      </div>
      <div class="space-y-1">
        <Label for="description">Description</Label>
        <Input id="description" v-model="group.description" />
      </div>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button @click.prevent="handleSubmit">create new group</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
