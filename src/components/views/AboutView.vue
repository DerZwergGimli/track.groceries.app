<script setup lang="ts"></script>

<template>
  <section class="container mx-auto py-10">
    <header class="mb-6 text-center">
      <h1 class="text-4xl font-bold">About Our Food Storage Tracker</h1>
      <p class="text-lg text-muted mt-4">
        Keep track of your food storage effortlessly. Organize items in your
        fridge, shelves, or pantry, create groups and tags, and monitor
        expiration dates with ease.
      </p>
    </header>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Organize Your Food</h2>
        <p class="text-muted text-base">
          Group items by categories such as fridge, shelves, or pantry. Create
          custom groups and tags to organize your food storage the way you like.
        </p>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">Track Expiration Dates</h2>
        <p class="text-muted text-base">
          Stay on top of expiration dates to reduce food waste. Easily view
          which items are about to expire.
        </p>
      </div>
    </div>
    <footer class="mt-10 text-center text-sm text-muted">
      Built for effortless food tracking.
    </footer>
  </section>
</template>

<style scoped>
.text-muted {
  color: #6b7280; /* Tailwind gray-500 */
}
</style>
