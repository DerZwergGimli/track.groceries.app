<script setup lang="ts">
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "vue-router";
import { useSupabaseStore } from "@/stores/SupabaseStore.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isSignUp = ref(false); // State for toggling between login and signup

const isLoading = ref(false);
const isDialogOpen = ref(false); // State to manage dialog visibility
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const { error } = await useSupabaseStore().supabase.auth.signInWithPassword(
      {
        email: email.value,
        password: password.value,
      },
    );
    if (error) {
      errorMessage.value = error.message;
    } else {
      router.push("/");
    }
  } catch (err) {
    errorMessage.value = "An unexpected error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
  await useSupabaseStore().loadUser();
};

const handleSignup = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const { error } = await useSupabaseStore().supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      errorMessage.value = error.message;
    } else {
      router.push("/");
    }
  } catch (err) {
    errorMessage.value = "An unexpected error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const button_text = computed(() => {
  return useSupabaseStore().user_email.length
    ? useSupabaseStore().user_email
    : "Login";
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="">
        {{ button_text }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader class="mt-5">
        <Tabs default-value="login">
          <TabsList class="w-full">
            <TabsTrigger class="flex-1" value="login">Login</TabsTrigger>
            <TabsTrigger class="flex-1" value="signup">Register</TabsTrigger>
          </TabsList>

          <CardContent class="my-3">
            <div>
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div>
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <p v-if="errorMessage" class="text-sm text-red-500">
              {{ errorMessage }}
            </p>
          </CardContent>

          <TabsContent value="login">
            <CardFooter>
              <Button
                :disabled="isLoading"
                @click="handleLogin()"
                class="w-full"
              >
                {{ isLoading ? "Loading..." : "Login" }}
              </Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="signup">
            <CardFooter>
              <Button
                :disabled="isLoading"
                @click="handleSignup()"
                class="w-full"
              >
                {{ isLoading ? "Loading..." : "Register" }}
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
