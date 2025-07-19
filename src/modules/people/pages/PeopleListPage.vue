<template>
  <q-card>
    <BaseHeader title="Listado de personas" />
    <BaseLoading v-if="loading" />
    <BaseError :message="error" v-else-if="error" @retry="fetchPeople" />
    <PeopleTable
      v-else
      :people="people || []"
      :loading="loading"
      @view-details="viewDetails"
    />
  </q-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePeople } from '../composables/usePeople';
import { Person } from '../types/person.types';
import { useRouter } from 'vue-router';
import BaseHeader from '@/shared/components/base/BaseHeader.vue';
import BaseLoading from '@/shared/components/base/BaseLoading.vue';
import BaseError from '@/shared/components/base/BaseError.vue';
import PeopleTable from '../components/PeopleTable.vue';

const { people, loading, error, fetchPeople } = usePeople();
const router = useRouter();

const viewDetails = (person: Person): void => {
  const id = person.url.split('/').pop();
  if (id) {
    router.push(`/people/${id}`);
  }
};

onMounted(() => {
  if (people.value.length === 0) {
    fetchPeople();
  }
});
</script>
