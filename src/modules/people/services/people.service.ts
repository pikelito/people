import http from '@/shared/services/http';
import type { PeopleAPIResponse, Person } from '../types/person.types';

const PEOPLE_ENDPOINT = '/people';

export const getPeople = async (): Promise<PeopleAPIResponse> => {
  const response = await http.get<Person[]>(PEOPLE_ENDPOINT);
  return {
    results: response.data,
    total: response.data?.length || 0,
  };
};

export const getPersonById = async (id: string): Promise<Person> => {
  const response = await http.get<Person>(`${PEOPLE_ENDPOINT}/${id}`);
  return response.data;
};

export const getResourceByUrl = async <T>(url: string): Promise<T> => {
  const response = await http.get<T>(url);
  return response.data;
};
