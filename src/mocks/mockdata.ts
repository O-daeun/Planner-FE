import { LifeGoalResponse, TenYearGoalResponse } from '@/types/goal';

// 수정 가능한 mockLifeGoal
export let mockLifeGoal: LifeGoalResponse | null = {
  id: '1',
  title: '프로그래밍 마스터하기',
  description: 'React, TypeScript, Node.js를 완벽하게 익히기',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

// 인생 목표 수정 함수
export const updateMockLifeGoal = (
  updates: Partial<Omit<LifeGoalResponse, 'updatedAt'>>
) => {
  if (mockLifeGoal) {
    mockLifeGoal = {
      ...mockLifeGoal,
      ...updates,
      updatedAt: new Date(),
    };
  }
};

// 10년 목표 mock 데이터
export const mockTenYearGoals: TenYearGoalResponse[] = [
  {
    id: 'ten-year-1',
    title: '20대: 프로그래밍 기초 다지기',
    description: 'React, TypeScript, Node.js를 완벽하게 익히고 실무 경험 쌓기',
    ageGroup: 20,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'ten-year-2',
    title: '30대: 기술 리더십 발휘하기',
    description: '팀을 이끌고 프로젝트를 성공적으로 완수하는 리더가 되기',
    ageGroup: 30,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
];
