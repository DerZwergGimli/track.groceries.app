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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="tag in useSupabaseStore().tags" :key="tag.id">
          <TableCell class="font-medium">
            <Input
              type="text"
              @change="useSupabaseStore().updateTag(tag, tag.id)"
              v-model="tag.name"
            />
          </TableCell>
          <TableCell
            ><Input
              @change="useSupabaseStore().updateTag(tag, tag.id)"
              type="text"
              v-model="tag.description"
            />
          </TableCell>
          <TableCell class="text-right">
            <Button
              variant="outline"
              @click.prevent="useSupabaseStore().deleteTag(tag.id)"
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
