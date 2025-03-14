<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref, watch } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const props = defineProps(["date"]);
const emits = defineEmits(["update:date"]);

const value = ref<DateValue>();
const items = [
  { value: 0, label: "Today" },
  { value: 1, label: "Tomorrow" },
  { value: 7, label: "In a week" },
  { value: 3 * 30, label: "In 3 months" },
  { value: 6 * 30, label: "In 6 months" },
  { value: 365, label: "In 1 year" },
  { value: 2 * 365, label: "In 2 years" },
  { value: 3 * 365, label: "In 3 years" },
];

watch(value, (newValue) => {
  emits("update:date", newValue?.toDate(getLocalTimeZone()));
});
</script>

<template>
  <Popover class="w-full">
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-full">
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ props.date ? df.format(props.date) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Select
        @update:model-value="
          (v) => {
            if (!v) return;
            value = today(getLocalTimeZone()).add({ days: Number(v) });
          }
        "
        class="w-full"
      >
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select timespan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="item in items"
            :key="item.value"
            :value="item.value.toString()"
          >
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
