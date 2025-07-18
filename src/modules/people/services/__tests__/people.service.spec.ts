import { describe, it, expect, vi, beforeEach } from 'vitest';
import http from '@/shared/services/http';
import { getPeople, getPersonById } from '../people.service';

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
});
