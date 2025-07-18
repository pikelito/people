import http from '@/shared/services/http';
import type { PeopleAPIResponse, Person } from '../types/person.types';

const PEOPLE_ENDPOINT = '/people';

export const getPeople = async (): Promise<PeopleAPIResponse> => {
  const response = await http.get<PeopleAPIResponse>(PEOPLE_ENDPOINT);
  return response.data;
};

export const getPersonById = async (id: string): Promise<Person> => {
  const response = await http.get<Person>(`${PEOPLE_ENDPOINT}/${id}`);
  return response.data;
};
