import { usePeopleStore } from '@/stores/people.store';
import { storeToRefs } from 'pinia';

export const usePeople = () => {
  const peopleStore = usePeopleStore();

  const { people, loading, error } = storeToRefs(peopleStore);

  const { fetchPeople } = peopleStore;

  return {
    people,
    loading,
    error,
    fetchPeople,
  };
};
