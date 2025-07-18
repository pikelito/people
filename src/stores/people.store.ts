import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Person } from '@/modules/people/types/person.types';
import { getPeople } from '@/modules/people/services/people.service';

export const usePeopleStore = defineStore('people', () => {
  const people = ref<Person[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchPeople = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getPeople();
      people.value = data.results;
    } catch (_e) {
      error.value = 'Ha ocurrido un error al obtener los datos';
      people.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    people,
    loading,
    error,
    fetchPeople,
  };
});
