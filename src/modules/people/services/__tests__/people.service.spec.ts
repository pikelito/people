import { describe, it, expect, vi, beforeEach } from 'vitest';
import http from '@/shared/services/http';
import { getPeople, getPersonById, getResourceByUrl } from '../people.service';

vi.mock('@/shared/services/http');

describe('People Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getPeople endpoint should be called', async () => {
    vi.mocked(http.get).mockResolvedValue({ data: {} });

    await getPeople();

    expect(http.get).toHaveBeenCalledWith('/people');
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('getPersonById endpoint should be called', async () => {
    const personId = '1';
    vi.mocked(http.get).mockResolvedValue({ data: {} });

    await getPersonById(personId);

    expect(http.get).toHaveBeenCalledWith(`/people/${personId}`);
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('getResourceByUrl should be called with the full URL', async () => {
    const resourceUrl = 'https://swapi.dev/api/films/1/';
    vi.mocked(http.get).mockResolvedValue({ data: {} });

    await getResourceByUrl(resourceUrl);

    expect(http.get).toHaveBeenCalledWith(resourceUrl);
    expect(http.get).toHaveBeenCalledTimes(1);
  });
});
