import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
  Film,
  Person,
  Species,
} from '@/modules/people/types/person.types';
import {
  getPeople,
  getPersonById,
  getResourceByUrl,
} from '@/modules/people/services/people.service';

export const usePeopleStore = defineStore('people', () => {
  const people = ref<Person[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const selectedPerson = ref<Person | null>(null);
  const selectedPersonFilms = ref<Film[]>([]);
  const selectedPersonSpecies = ref<Species[]>([]);
  const loadingDetail = ref<boolean>(false);
  const errorDetail = ref<string | null>(null);

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

  const fetchPersonById = async (id: string) => {
    loadingDetail.value = true;
    errorDetail.value = null;
    try {
      selectedPerson.value = await getPersonById(id);
    } catch (_e) {
      errorDetail.value = 'Ha ocurrido un error al obtener el detalle';
      selectedPerson.value = null;
    } finally {
      loadingDetail.value = false;
    }
  };

  const fetchPersonFilms = async (films: string[]) => {
    loadingDetail.value = true;
    errorDetail.value = null;
    try {
      const filmsData = await Promise.all(
        films.map((film) => getResourceByUrl<Film>(film))
      );
      selectedPersonFilms.value = filmsData;
    } catch (_e) {
      errorDetail.value = 'Ha ocurrido un error al obtener los films';
      selectedPersonFilms.value = [];
    } finally {
      loadingDetail.value = false;
    }
  };

  const fetchPersonSpecies = async (species: string[]) => {
    loadingDetail.value = true;
    errorDetail.value = null;
    try {
      const speciesData = await Promise.all(
        species.map((specie) => getResourceByUrl<Species>(specie))
      );
      selectedPersonSpecies.value = speciesData;
    } catch (_e) {
      errorDetail.value = 'Ha ocurrido un error al obtener las especies';
      selectedPersonSpecies.value = [];
    } finally {
      loadingDetail.value = false;
    }
  };

  return {
    people,
    loading,
    error,
    fetchPeople,
    selectedPerson,
    loadingDetail,
    errorDetail,
    fetchPersonById,
    selectedPersonFilms,
    selectedPersonSpecies,
    fetchPersonFilms,
    fetchPersonSpecies,
  };
});
