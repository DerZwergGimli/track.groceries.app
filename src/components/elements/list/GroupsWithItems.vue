<script setup lang="ts">
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateFormatter } from "@internationalized/date";
import type { SB_Item } from "@/stores/supabase/sb_item.ts";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { Badge } from "@/components/ui/badge";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const router = useRouter();
</script>

<template>
  <div v-if="useSupabaseStore().loading">Loading...</div>
  <div v-else>
    <div v-if="useSupabaseStore().groups.length == 0">
      <Button @click="router.push('/add')">
        <Icon icon="material-symbols-light:add" width="24" height="24" />
      </Button>
    </div>
    <div
      v-for="group in useSupabaseStore().groups"
      :key="group.id"
      class="mt-10"
    >
      <div class="flex items-center">
        <div class="w-full">
          <h1 class="text-xl font-bold flex-1">{{ group.name }}</h1>
          <h1 class="text-sm mt-1 font-thin flex-1">{{ group.description }}</h1>
        </div>
        <div class="flex gap-2">
          <Button @click="router.push('/add')">
            <Icon icon="material-symbols-light:add" width="24" height="24" />
          </Button>
        </div>
      </div>
      <Separator class="my-3" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
        <div
          v-for="item in useSupabaseStore().items.filter(
            (i: SB_Item) => i.group == group.id,
          )"
          :key="item.id"
          class="p-5 w-52 border rounded shadow relative"
        >
          <div class="flex justify-between">
            <h2 class="text-lg font-semibold">
              {{ item.name }}
            </h2>
            <Badge
              variant="outline"
              v-if="useSupabaseStore().tags.find((t) => t.id == item.tag)"
            >
              {{ useSupabaseStore().tags.find((t) => t.id == item.tag)?.name }}
            </Badge>
          </div>
          <p class="text-sm font-thin h-10">{{ item.description ?? " " }}</p>
          <img
            :src="item.image"
            alt="image"
            class="w-full h-32 object-cover mb-2 rounded"
          />
          <p class="text-xs flex justify-between">
            <span class="text-gray-500">created</span>
            <span>
              {{ df.format(Date.parse(item.date_added as any) as any) }}</span
            >
          </p>
          <p class="text-xs flex justify-between">
            <span class="text-gray-500">best till</span>
            <span>{{
              df.format(Date.parse(item.date_bestTill as any) as any)
            }}</span>
          </p>
          <div class="mt-2 flex gap-2 items-center">
            <template v-if="item.amount > 0">
              <Button
                class="px-4"
                @click="
                  () => {
                    item.amount = Math.max(0, item.amount - 1);
                    useSupabaseStore().updateItem(item, item.id);
                  }
                "
              >
                -
              </Button>
              <Input
                type="text"
                @change="useSupabaseStore().updateItem(item, item.id)"
                v-model.number="item.amount"
                class="flex-1 text-center"
              />
              <Button
                class="px-4"
                @click="
                  () => {
                    {
                      item.amount = item.amount + 1;
                      useSupabaseStore().updateItem(item, item.id);
                    }
                  }
                "
              >
                +
              </Button>
            </template>
            <template v-else>
              <div class="w-full flex justify-between">
                <Button
                  @click="
                    () => {
                      {
                        item.amount = item.amount + 1;
                        useSupabaseStore().updateItem(item, item.id);
                      }
                    }
                  "
                >
                  Cancel
                </Button>
                <Button
                  class=""
                  variant="destructive"
                  @click="useSupabaseStore().deleteItem(item.id)"
                >
                  Delete
                </Button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
