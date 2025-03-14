<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import { Icon } from "@iconify/vue";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
</script>

<template>
  <Card>
    <Table class="">
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead class="text-right"></TableHead>
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
  </Card>
</template>
