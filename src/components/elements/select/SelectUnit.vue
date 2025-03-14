<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref, watch } from "vue";

const units = [
  { unit: "unit", label: "unit" },
  { unit: "g", label: "gram" },
  { unit: "kg", label: "kilogram" },
  { unit: "portion", label: "portion" },
  { unit: "box", label: "box" },
];

const emits = defineEmits(["update:selected"]);

let selected = ref();
watch(
  () => selected.value,
  (newValue) => {
    emits("update:selected", newValue.unit);
  },
);
</script>

<template>
  <Select v-model="selected">
    <SelectTrigger>
      <SelectValue :placeholder="selected || 'Select a Unit'"></SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Unit:</SelectLabel>
        <SelectItem :value="unit" v-for="unit in units" :key="unit.unit">
          {{ unit.label }} ({{ unit.unit }})
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped></style>
