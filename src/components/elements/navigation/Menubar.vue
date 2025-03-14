<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <NavigationMenu class="">
    <NavigationMenuList class="flex justify-between">
      <div class="flex space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            :class="[
              navigationMenuTriggerStyle(),
              route.path === '/' ? 'font-extrabold ' : '',
            ]"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            :class="[
              navigationMenuTriggerStyle(),
              route.path === '/about' ? 'font-extrabold ' : '',
            ]"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </div>
    </NavigationMenuList>
  </NavigationMenu>
</template>
