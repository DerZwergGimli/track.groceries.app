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
        :placeholder="selected?.name || 'Select a Group'"
      ></SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          :value="group"
          v-for="group in useSupabaseStore().groups"
          :key="group.id"
        >
          {{ group.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped></style>
