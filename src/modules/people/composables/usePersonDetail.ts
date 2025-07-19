import { usePeopleStore } from '@/stores/people.store';
import { storeToRefs } from 'pinia';

export const usePersonDetail = () => {
  const peopleStore = usePeopleStore();
  const {
    selectedPerson,
    loadingDetail,
    errorDetail,
    selectedPersonFilms,
    selectedPersonSpecies,
  } = storeToRefs(peopleStore);

  const { fetchPersonById, fetchPersonFilms, fetchPersonSpecies } = peopleStore;

  return {
    selectedPerson,
    loadingDetail,
    errorDetail,
    selectedPersonFilms,
    selectedPersonSpecies,
    fetchPersonById,
    fetchPersonFilms,
    fetchPersonSpecies,
  };
};
