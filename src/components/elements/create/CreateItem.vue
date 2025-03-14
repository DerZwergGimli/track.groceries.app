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
import type { SB_Item } from "@/stores/supabase/sb_item.ts";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { createClient } from "pexels";
import { watchDebounced } from "@vueuse/core";
import { useToast } from "@/components/ui/toast";
import DatePicker from "@/components/elements/other/DatePicker.vue";
import SelectUnit from "@/components/elements/select/SelectUnit.vue";
import SelectTag from "@/components/elements/select/SelectTag.vue";
import SelectGroup from "@/components/elements/select/SelectGroup.vue";

const item = ref<SB_Item>({
  name: "",
  description: "",
  image: "",
  unit: null,
  group: null,
  amount: 1,
  date_added: new Date(),
  date_bestTill: new Date(),
  user_id: useSupabaseStore().user_id,
});

const { toast } = useToast();

function incrementCount() {
  item.value.amount += 1;
}

function decrementCount() {
  if (item.value.amount > 0) {
    item.value.amount -= 1;
  }
}

const errors = ref({
  name: "",
  amount: "",
  unit: "",
  group: "",
});

const pexels = createClient(import.meta.env.VITE_PEXELS_API_KEY);

watchDebounced(
  item.value,
  async () => {
    if (item.value.name.length >= 3) {
      const query = item.value.name;
      pexels.photos.search({ query, per_page: 1 }).then((photos) => {
        item.value.image = photos?.photos[0].src.original;
      });
    }
  },
  { debounce: 2000, maxWait: 5000 },
);

function validateForm() {
  errors.value.name = item.value.name.trim() === "" ? "Name is required." : "";
  errors.value.amount =
    item.value.amount == 0 ? "Amount should be larger then 0." : "";
  errors.value.unit = item.value.unit == null ? "Unit must be set" : "";
  errors.value.group = item.value.group == null ? "Group must be set" : "";

  return !errors.value.name || errors.value.amount;
}

async function handleSubmit() {
  if (validateForm()) {
    toast({
      title: "Adding item",
      description: await useSupabaseStore().createItem(item.value),
    });
  }
}
</script>

<template>
  <Card class="mx-2">
    <div class="flex items-center">
      <div>
        <CardHeader>
          <CardTitle>Add Item</CardTitle>
          <CardDescription> add items to a group</CardDescription>
        </CardHeader>
      </div>
      <div class="ml-auto mr-5">
        <img width="50px" :src="item.image" class="rounded-full" />
      </div>
    </div>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="name">Name</Label>
        <div>
          <Input id="name" v-model="item.name" />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </p>
        </div>
      </div>
      <div class="space-y-1">
        <Label for="description">Description</Label>
        <Input id="description" v-model="item.description" />
      </div>
      <div class="space-y-1">
        <Label for="description">Group</Label>
        <SelectGroup @update:selected="(group_id) => (item.group = group_id)" />
        <p v-if="errors.group" class="text-red-500 text-sm">
          {{ errors.group }}
        </p>
      </div>
      <div class="space-y-1">
        <Label for="description">Tag</Label>
        <SelectTag @update:selected="(tag_id) => (item.tag = tag_id)" />
      </div>

      <div class="space-y-1">
        <Label for="count">Amount</Label>
        <div class="col-span-2 flex items-center gap-2">
          <Input
            id="count"
            v-model="item.amount"
            class="text-right"
            type="number"
          />
          <SelectUnit
            @update:selected="(unit) => (item.unit = unit)"
            class=""
          />
          <Button class="" @click.prevent="decrementCount()"> -</Button>
          <Button class="" @click.prevent="incrementCount()"> +</Button>
        </div>
        <p v-if="errors.amount" class="text-red-500 text-sm">
          {{ errors.amount }}
        </p>
        <p v-if="errors.unit" class="text-red-500 text-sm">
          {{ errors.unit }}
        </p>
      </div>

      <div class="space-y-1">
        <Label>Best till</Label>

        <DatePicker
          class="w-full"
          :date="item.date_bestTill"
          @update:date="(date) => (item.date_bestTill = date)"
        />
      </div>
    </CardContent>

    <CardFooter class="flex justify-end">
      <Button @click.prevent="handleSubmit">Add Item</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
