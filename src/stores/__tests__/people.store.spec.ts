import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePeopleStore } from '../people.store';
import {
  getPeople,
  getPersonById,
  getResourceByUrl,
} from '@/modules/people/services/people.service';
import type {
  PeopleAPIResponse,
  Person,
  Film,
  Species,
} from '@/modules/people/types/person.types';

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
    expect(store.selectedPerson).toBeNull();
    expect(store.loadingDetail).toBe(false);
    expect(store.errorDetail).toBeNull();
  });

  describe('fetchPeople action', () => {
    it('should fetch and store people successfully', async () => {
      const mockPeopleData: PeopleAPIResponse = {
        total: 1,
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

    it('should manage loading state correctly', async () => {
      vi.mocked(getPeople).mockResolvedValue({ results: [] } as any);
      const store = usePeopleStore();

      const promise = store.fetchPeople();

      expect(store.loading).toBe(true);

      await promise;

      expect(store.loading).toBe(false);
    });

    it('should handle errors and update state', async () => {
      const errorMessage = 'Ha ocurrido un error al obtener los datos';
      vi.mocked(getPeople).mockRejectedValue(new Error('Any error'));
      const store = usePeopleStore();

      await store.fetchPeople();

      expect(store.loading).toBe(false);
      expect(store.people).toEqual([]);
      expect(store.error).toBe(errorMessage);
    });
  });

  describe('fetchPersonById action', () => {
    const personId = '1';
    const mockPerson: Person = {
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
    };

    it('should fetch and store a single person successfully', async () => {
      vi.mocked(getPersonById).mockResolvedValue(mockPerson);
      const store = usePeopleStore();

      await store.fetchPersonById(personId);

      expect(store.loadingDetail).toBe(false);
      expect(store.selectedPerson).toEqual(mockPerson);
      expect(store.errorDetail).toBeNull();
      expect(getPersonById).toHaveBeenCalledWith(personId);
    });

    it('should handle loading state correctly', async () => {
      vi.mocked(getPersonById).mockResolvedValue(mockPerson);
      const store = usePeopleStore();

      const promise = store.fetchPersonById(personId);

      expect(store.loadingDetail).toBe(true);

      await promise;

      expect(store.loadingDetail).toBe(false);
    });

    it('should handle errors and update state', async () => {
      const errorMessage = 'Ha ocurrido un error al obtener el detalle';
      vi.mocked(getPersonById).mockRejectedValue(new Error('Any error'));
      const store = usePeopleStore();

      await store.fetchPersonById(personId);

      expect(store.loadingDetail).toBe(false);
      expect(store.selectedPerson).toBeNull();
      expect(store.errorDetail).toBe(errorMessage);
    });

    describe('fetchPersonFilms action', () => {
      it('should fetch and store films successfully', async () => {
        const mockFilmsUrls = ['https://swapi.info/api/films/1'];
        const mockFilmsData: Film[] = [
          {
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl: 'It is a period of civil war.',
            director: 'George Lucas',
            producer: 'Gary Kurtz',
            release_date: '1977-05-25',
          },
        ];
        vi.mocked(getResourceByUrl).mockResolvedValue(mockFilmsData[0]);
        const store = usePeopleStore();

        await store.fetchPersonFilms(mockFilmsUrls);

        expect(store.loadingDetail).toBe(false);
        expect(store.selectedPersonFilms).toEqual(mockFilmsData);
      });
    });

    describe('fetchPersonSpecies action', () => {
      it('should fetch and store species successfully', async () => {
        const mockSpeciesUrls = ['https://swapi.info/api/species/1'];
        const mockSpeciesData: Species[] = [
          {
            name: 'Human',
            classification: 'mammal',
            designation: 'sentient',
            average_height: '180',
            skin_colors: 'caucasian, black, asian, hispanic',
            hair_colors: 'blonde, brown, black, red',
            eye_colors: 'brown, blue, green, hazel, grey, amber',
          },
        ];
        vi.mocked(getResourceByUrl).mockResolvedValue(mockSpeciesData[0]);
        const store = usePeopleStore();

        await store.fetchPersonSpecies(mockSpeciesUrls);

        expect(store.loadingDetail).toBe(false);
        expect(store.selectedPersonSpecies).toEqual(mockSpeciesData);
      });
    });
  });
});
