import '@testing-library/jest-dom';
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

config.global.stubs = {
  transition: false,
  'router-link': false,
};

vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});
