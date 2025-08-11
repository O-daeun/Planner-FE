import { http, HttpResponse } from 'msw';
import { mockLifeGoal } from './mockdata';

// API 핸들러들
export const goalshandlers = [
  // 목표 관련 API
  http.get('/goals/life', () => {
    return HttpResponse.json(mockLifeGoal);
  }),
  http.post('/goals/life', () => {
    return HttpResponse.json(mockLifeGoal);
  }),
  http.patch('/goals/life', () => {
    return HttpResponse.json(mockLifeGoal);
  }),
  http.delete('/goals/life', () => {
    return HttpResponse.json(mockLifeGoal);
  }),
];
