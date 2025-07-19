import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePersonDetail } from '../usePersonDetail';
import { usePeopleStore } from '@/stores/people.store';
import { setActivePinia, createPinia } from 'pinia';
import { ref } from 'vue';

vi.mock('@/stores/people.store');

describe('usePersonDetail Composable', () => {
  let mockStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockStore = {
      selectedPerson: ref({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.info/api/planets/1',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.info/api/people/1',
      }),
      selectedPersonFilms: ref([]),
      selectedPersonSpecies: ref([]),
      loadingDetail: ref(false),
      errorDetail: ref(null),
      fetchPersonById: vi.fn(),
      fetchPersonFilms: vi.fn(),
      fetchPersonSpecies: vi.fn(),
    };
    vi.mocked(usePeopleStore).mockReturnValue(mockStore);
  });

  it('should expose the state from the personDetail store', () => {
    const {
      selectedPerson,
      loadingDetail,
      errorDetail,
      selectedPersonFilms,
      selectedPersonSpecies,
    } = usePersonDetail();

    expect(selectedPerson.value).toEqual(mockStore.selectedPerson.value);
    expect(loadingDetail.value).toBe(false);
    expect(errorDetail.value).toBeNull();
    expect(selectedPersonFilms.value).toEqual([]);
    expect(selectedPersonSpecies.value).toEqual([]);
  });

  it('should expose the actions from the people store', () => {
    const { fetchPersonById, fetchPersonFilms, fetchPersonSpecies } =
      usePersonDetail();

    expect(typeof fetchPersonById).toBe('function');
    expect(typeof fetchPersonFilms).toBe('function');
    expect(typeof fetchPersonSpecies).toBe('function');
  });

  it('calling fetchPersonById from the composable should call the store action', async () => {
    const { fetchPersonById } = usePersonDetail();

    await fetchPersonById('1');

    expect(mockStore.fetchPersonById).toHaveBeenCalledTimes(1);
  });

  it('calling fetchPersonFilms from the composable should call the store action', async () => {
    const { fetchPersonFilms } = usePersonDetail();

    await fetchPersonFilms(['https://swapi.info/api/films/1']);

    expect(mockStore.fetchPersonFilms).toHaveBeenCalledTimes(1);
  });

  it('calling fetchPersonSpecies from the composable should call the store action', async () => {
    const { fetchPersonSpecies } = usePersonDetail();

    await fetchPersonSpecies(['https://swapi.info/api/species/1']);

    expect(mockStore.fetchPersonSpecies).toHaveBeenCalledTimes(1);
  });
});
