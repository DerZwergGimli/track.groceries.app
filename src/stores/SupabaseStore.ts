import { defineStore } from "pinia";

import { createClient } from "@supabase/supabase-js";
import type { SB_Item } from "@/stores/supabase/sb_item.ts";
import { sb_create } from "@/stores/supabase/sb_action_create.ts";
import { sb_delete } from "@/stores/supabase/sb_action_delete.ts";
import type { SB_Group } from "@/stores/supabase/sb_group.ts";
import type { SB_Tag } from "@/stores/supabase/sb_tag.ts";
import { sb_fetchAll } from "@/stores/supabase/sb_action_fetchAll.ts";
import { sb_update } from "@/stores/supabase/sb_action_update.ts";

const supabaseUrl = "https://ldgejbqndhdvsyeqwfme.supabase.co";
const supabaseKey = import.meta.env.VITE_SUBABASE_API_KEY;

export const useSupabaseStore = defineStore("SpabaseStore", {
  state: () => ({
    loading: false,
    supabase: createClient(supabaseUrl, supabaseKey),
    user_id: "",
    user_email: "",
    items: [] as SB_Item[],
    groups: [] as SB_Group[],
    tags: [] as SB_Tag[],
  }),

  actions: {
    async loadUser() {
      const user = await this.supabase.auth.getUser();
      this.user_id = user.data.user?.id ?? "none";
      this.user_email = user.data.user?.email ?? "none";
    },

    //Create
    async createItem(item: SB_Item): Promise<string> {
      item.user_id = this.user_id;
      return await sb_create(this.supabase, "items", item);
    },
    async createGroup(group: SB_Group): Promise<string> {
      group.user_id = this.user_id;
      return await sb_create(this.supabase, "groups", group);
    },
    async createTag(tag: SB_Tag): Promise<string> {
      tag.user_id = this.user_id;
      return await sb_create(this.supabase, "tags", tag);
    },

    //Update
    async updateGroup(newGroup: SB_Group, id?: number) {
      if (!id) return false;
      return await sb_update(this.supabase, "groups", id, newGroup);
    },
    async updateTag(newTag: SB_Tag, id?: number) {
      if (!id) return false;
      return await sb_update(this.supabase, "tags", id, newTag);
    },
    async updateItem(newItem: SB_Item, id?: number) {
      if (!id) return false;
      return await sb_update(this.supabase, "items", id, newItem);
    },

    //Delete
    async deleteItem(id?: number) {
      if (!id) return false;
      await sb_delete(this.supabase, "items", id);
      await this.fetchItems();
      return true;
    },
    async deleteTag(id?: number) {
      if (!id) return false;
      await sb_delete(this.supabase, "tags", id);
      await this.fetchTags();
      return true;
    },
    async deleteGroup(id?: number) {
      if (!id) return false;
      await sb_delete(this.supabase, "groups", id);
      await this.fetchGroups();
      return true;
    },

    //Fetch
    async fetchItems() {
      this.loading = true;
      this.items = (await sb_fetchAll(this.supabase, "items")).sort(
        (a: any, b: any) => a.name.localeCompare(b.name),
      );
      this.loading = false;
    },
    async fetchGroups() {
      this.loading = true;
      this.groups = (await sb_fetchAll(this.supabase, "groups")).sort(
        (a: any, b: any) => a.name.localeCompare(b.name),
      );
      this.loading = false;
    },
    async fetchTags() {
      this.loading = true;
      this.tags = (await sb_fetchAll(this.supabase, "tags")).sort(
        (a: any, b: any) => a.name.localeCompare(b.name),
      );
      this.loading = false;
    },
  },
});
