<template>
  <q-table :rows="people" :columns="columns" row-key="name" :loading="loading">
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          color="primary"
          icon="visibility"
          size="sm"
          flat
          dense
          @click="emit('view-details', props.row)"
          :data-testid="`view-details-${props.row.name}`"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { Person } from '../types/person.types';
import type { QTableProps } from 'quasar';

defineProps<{
  people: Person[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'view-details', person: Person): void;
}>();

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'birth_year',
    align: 'left',
    label: 'Año de Nacimiento',
    field: 'birth_year',
    sortable: true,
  },
  {
    name: 'gender',
    align: 'left',
    label: 'Género',
    field: 'gender',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center',
    field: 'actions',
  },
];
</script>
