<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { Icon } from "@iconify/vue";
import { Input } from "@/components/ui/input";
</script>

<template>
  <Table>
    <TableCaption>A list of your groups.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="text-right"> Action</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="group in useSupabaseStore().groups" :key="group.id">
        <TableCell class="font-medium">
          <Input
            @change="useSupabaseStore().updateGroup(group, group.id)"
            type="text"
            v-model="group.name"
          />
        </TableCell>
        <TableCell
          ><Input
            @change="useSupabaseStore().updateGroup(group, group.id)"
            type="text"
            v-model="group.description"
        /></TableCell>
        <TableCell class="text-right">
          <Button
            variant="outline"
            @click.prevent="useSupabaseStore().deleteGroup(group.id)"
          >
            <Icon
              icon="solar:trash-bin-minimalistic-outline"
              width="24"
              height="24"
            />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
