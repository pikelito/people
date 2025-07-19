<template>
  <q-list bordered separator>
    <q-item>
      <q-item-section>
        <q-item-label overline>NOMBRE</q-item-label>
        <q-item-label>{{ person.name }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label overline>GÉNERO</q-item-label>
        <q-item-label>{{ person.gender }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import type { Person } from '../types/person.types';

defineProps<{
  person: Person;
}>();
</script>
