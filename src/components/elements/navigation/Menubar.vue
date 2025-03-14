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
            <RouterLink to="/">Home</RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            :class="[
              navigationMenuTriggerStyle(),
              route.path === '/about' ? 'font-extrabold ' : '',
            ]"
          >
            <RouterLink to="/about">About</RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </div>
    </NavigationMenuList>
  </NavigationMenu>
</template>
