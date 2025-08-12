import { setupWorker } from 'msw/browser';
import { goalsHandlers } from './goalsHandlers';

export const worker = setupWorker(...goalsHandlers);
