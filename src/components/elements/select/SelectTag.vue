<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { ref, watch } from "vue";

let selected = ref();

const emits = defineEmits(["update:selected"]);

watch(
  () => selected.value,
  (newValue) => {
    emits("update:selected", newValue.id);
  },
);
</script>

<template>
  <Select v-model="selected">
    <SelectTrigger>
      <SelectValue
        :placeholder="selected?.name || 'Select a Tag'"
      ></SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          :value="tag"
          v-for="tag in useSupabaseStore().tags"
          :key="tag.id"
        >
          {{ tag.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped></style>
