import { expect } from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);