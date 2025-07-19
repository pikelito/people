<template>
  <q-item>
    <q-item-section>
      <q-item-label overline>{{ title }}</q-item-label>
      <q-item-label v-for="(item, index) in items" :key="index">
        {{ item[displayKey] }}
      </q-item-label>
      <q-item-label v-if="!items || items.length === 0" caption>
        N/A
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  items: Array<Record<string, any>>;
  displayKey: string;
}>();
</script>
