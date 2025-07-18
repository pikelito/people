import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePeopleStore } from '../people.store';
import { getPeople } from '@/modules/people/services/people.service';
import type { PeopleAPIResponse } from '@/modules/people/types/person.types';

vi.mock('@/modules/people/services/people.service');

describe('People Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have a correct initial state', () => {
    const store = usePeopleStore();

    expect(store.people).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('fetchPeople action should fetch and store people successfully', async () => {
    const mockPeopleData: PeopleAPIResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [
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
      ],
    };
    vi.mocked(getPeople).mockResolvedValue(mockPeopleData);
    const store = usePeopleStore();

    await store.fetchPeople();

    expect(store.loading).toBe(false);
    expect(store.people).toEqual(mockPeopleData.results);
    expect(store.error).toBeNull();
    expect(getPeople).toHaveBeenCalledTimes(1);
  });

  it('fetchPeople action should manage loading state correctly', async () => {
    vi.mocked(getPeople).mockResolvedValue({ results: [] } as any);
    const store = usePeopleStore();

    const promise = store.fetchPeople();

    expect(store.loading).toBe(true);

    await promise;

    expect(store.loading).toBe(false);
  });

  it('fetchPeople action should handle errors and update state', async () => {
    const errorMessage = 'Ha ocurrido un error al obtener los datos';
    vi.mocked(getPeople).mockRejectedValue(new Error('Any error'));
    const store = usePeopleStore();

    await store.fetchPeople();

    expect(store.loading).toBe(false);
    expect(store.people).toEqual([]);
    expect(store.error).toBe(errorMessage);
  });
});
