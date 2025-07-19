<template>
  <div class="fullscreen flex flex-center">
    <div class="flex flex-col items-center">
      <div class="text-body1 text-center">{{ message }}</div>
      <q-btn
        flat
        label="Reintentar"
        @click="$emit('retry')"
        data-testid="retry-button"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string | null;
}>();

defineEmits(['retry']);
</script>
