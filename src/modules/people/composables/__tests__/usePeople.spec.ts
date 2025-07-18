import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePeopleStore } from '@/stores/people.store';
import { usePeople } from '../usePeople';
import { setActivePinia, createPinia } from 'pinia';
import { ref } from 'vue';

vi.mock('@/stores/people.store');

describe('usePeople Composable', () => {
  let mockStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());

    mockStore = {
      people: ref([
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.info/api/planets/1',
          films: [
            'https://swapi.info/api/films/1',
            'https://swapi.info/api/films/2',
            'https://swapi.info/api/films/3',
            'https://swapi.info/api/films/6',
          ],
          species: [],
          vehicles: [
            'https://swapi.info/api/vehicles/14',
            'https://swapi.info/api/vehicles/30',
          ],
          starships: [
            'https://swapi.info/api/starships/12',
            'https://swapi.info/api/starships/22',
          ],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.info/api/people/1',
        },
      ]),
      loading: ref(false),
      error: ref(null),
      fetchPeople: vi.fn(),
    };
    vi.mocked(usePeopleStore).mockReturnValue(mockStore);
  });

  it('should expose the state from the people store', () => {
    const { people, loading, error } = usePeople();

    expect(people.value).toEqual(mockStore.people.value);
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should expose the actions from the people store', () => {
    const { fetchPeople } = usePeople();

    expect(typeof fetchPeople).toBe('function');
  });

  it('calling fetchPeople from the composable should call the store action', async () => {
    const { fetchPeople } = usePeople();

    await fetchPeople();

    expect(mockStore.fetchPeople).toHaveBeenCalledTimes(1);
  });
});
