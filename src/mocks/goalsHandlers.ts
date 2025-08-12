import { TenYearGoalResponse } from '@/types/goal';
import { http, HttpResponse } from 'msw';
import { mockLifeGoal, mockTenYearGoals, updateMockLifeGoal } from './mockdata';

export const goalsHandlers = [
  // 인생 목표 조회
  http.get('/api/goals/life', () => {
    return HttpResponse.json(mockLifeGoal);
  }),

  // 인생 목표 생성
  http.post('/api/goals/life', async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      description: string;
    };

    // 실제 mockLifeGoal 데이터 수정
    updateMockLifeGoal({
      title: body.title,
      description: body.description,
    });

    return HttpResponse.json(mockLifeGoal);
  }),

  // 인생 목표 수정
  http.put('/api/goals/life', async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      description: string;
    };

    // 실제 mockLifeGoal 데이터 수정
    updateMockLifeGoal({
      title: body.title,
      description: body.description,
    });

    return HttpResponse.json(mockLifeGoal);
  }),

  // 인생 목표 삭제
  http.delete('/api/goals/life', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 10년 목표 목록 조회
  http.get('/api/goals/ten-year', () => {
    return HttpResponse.json(mockTenYearGoals);
  }),

  // 10년 목표 생성
  http.post('/api/goals/ten-year', async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      description: string;
      ageGroup: number;
    };
    const newGoal: TenYearGoalResponse = {
      id: `ten-year-${Date.now()}`,
      title: body.title,
      description: body.description,
      ageGroup: body.ageGroup,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTenYearGoals.push(newGoal);
    return HttpResponse.json(newGoal);
  }),

  // 10년 목표 수정
  http.put('/api/goals/ten-year/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as {
      title: string;
      description: string;
      ageGroup: number;
    };
    const goalIndex = mockTenYearGoals.findIndex(goal => goal.id === id);

    if (goalIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockTenYearGoals[goalIndex] = {
      ...mockTenYearGoals[goalIndex],
      title: body.title,
      description: body.description,
      ageGroup: body.ageGroup,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(mockTenYearGoals[goalIndex]);
  }),

  // 10년 목표 삭제
  http.delete('/api/goals/ten-year/:id', ({ params }) => {
    const { id } = params;
    const goalIndex = mockTenYearGoals.findIndex(goal => goal.id === id);

    if (goalIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockTenYearGoals.splice(goalIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
