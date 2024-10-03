import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { mockServer } from './mockServer';

expect.extend(matchers);

beforeAll(() => {
  mockServer.listen({onUnhandledRequest: 'error'});
});

afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
