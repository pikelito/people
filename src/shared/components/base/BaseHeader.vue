<template>
  <q-item>
    <q-item-section>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
